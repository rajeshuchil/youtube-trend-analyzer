#!/usr/bin/env node
/**
 * Static trending-data snapshot generator.
 *
 * Fetches trending videos for every supported region from the production
 * backend API (cache-first endpoint, NOT the force-refresh endpoint) and
 * writes one JSON snapshot per region into frontend/public/data/.
 *
 * The snapshots keep the exact backend response shape (TrendsResponse) and
 * add a small `meta` block so a future consumer can tell region, generation
 * time and last YouTube fetch time apart.
 *
 * Usage:
 *   node scripts/fetch-trending.mjs            # fetch + write all regions
 *   node scripts/fetch-trending.mjs US IN      # fetch only the given regions
 *   node scripts/fetch-trending.mjs --check    # validate existing snapshots only
 *
 * Environment:
 *   API_BASE_URL   Backend base URL (default: production Render service)
 *   SNAPSHOTS_DIR  Output directory (default: frontend/public/data)
 *
 * Exit codes: 0 = all requested regions succeeded, 1 = at least one failed.
 * A region failure never overwrites a previously valid snapshot file.
 */

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SUPPORTED_REGIONS } from "../backend/constants.js";

const API_BASE_URL = (
  process.env.API_BASE_URL || "https://youtube-trend-analyzer-ry6z.onrender.com"
).replace(/\/+$/, "");

const DATA_DIR =
  process.env.SNAPSHOTS_DIR ||
  fileURLToPath(new URL("../frontend/public/data", import.meta.url));

// Request `maxResults=50&limit=50`: the backend pagination default is 10 and
// the validator (backend/middleware/validator.js) caps both params at 50.
const REQUEST_PATH = "/api/youtube/trends";
const QUERY_PARAMS = "maxResults=50&limit=50&sortBy=views";

// Render free tier cold starts can take ~40-60s, so allow a generous timeout.
const REQUEST_TIMEOUT_MS = 90_000;
const MAX_ATTEMPTS = 2; // One retry for transient network / 5xx / 429 errors
const RETRY_DELAY_MS = 5_000;
const INTER_REGION_DELAY_MS = 500; // Be polite to the backend rate limiter

// Guards against snapshotting mock/empty responses (e.g. missing API key on
// the backend returns a single mock video, quota errors return 500s).
const MIN_VIDEOS = 10;
const MAX_VIDEOS = 50;

const log = (message) => console.log(`[fetch-trending] ${message}`);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch a URL as JSON with a hard timeout. Throws an Error with a `status`
 * property for HTTP failures so callers can decide whether to retry.
 */
async function fetchJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "TrendScope-Snapshot-Bot/1.0 (GitHub Actions)",
      },
    });

    const text = await response.text();
    let body = null;
    try {
      body = JSON.parse(text);
    } catch {
      body = null;
    }

    if (!response.ok) {
      const detail =
        (body && typeof body.message === "string" && body.message) ||
        text.slice(0, 200) ||
        response.statusText;
      const error = new Error(`HTTP ${response.status}: ${detail}`);
      error.status = response.status;
      throw error;
    }

    if (body === null || typeof body !== "object") {
      throw new Error("Response body was not valid JSON");
    }

    return body;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        `Request timed out after ${REQUEST_TIMEOUT_MS / 1000}s (backend may be cold-starting)`,
      );
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

const isRetryable = (error) => {
  if (!error.status) return true; // Network failure or timeout (fetch TypeError)
  return error.status === 429 || error.status >= 500;
};

async function fetchRegionSnapshot(region) {
  const url = `${API_BASE_URL}${REQUEST_PATH}?regionCode=${region}&${QUERY_PARAMS}`;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await fetchJson(url);
    } catch (error) {
      const willRetry = attempt < MAX_ATTEMPTS && isRetryable(error);
      log(
        `  ${region}: attempt ${attempt}/${MAX_ATTEMPTS} failed — ${error.message}${willRetry ? " (retrying)" : ""}`,
      );
      if (!willRetry) throw error;
      await sleep(RETRY_DELAY_MS);
    }
  }
}

/**
 * Validate the backend payload before it is allowed anywhere near disk.
 * Returns an array of problems (empty array = valid).
 */
function validatePayload(payload, region) {
  const problems = [];

  if (!payload || typeof payload !== "object") {
    return ["payload is not an object"];
  }
  if (payload.success !== true) {
    problems.push(`success=${payload.success} (expected true)`);
  }
  if (!Array.isArray(payload.data)) {
    problems.push("`data` is not an array");
    return problems;
  }

  const count = payload.data.length;
  if (count < MIN_VIDEOS) {
    problems.push(`only ${count} videos (minimum ${MIN_VIDEOS}) — possible mock/empty response`);
  }
  if (count > MAX_VIDEOS) {
    problems.push(`${count} videos (maximum ${MAX_VIDEOS})`);
  }

  payload.data.forEach((video, index) => {
    if (!video || typeof video !== "object") {
      problems.push(`data[${index}] is not an object`);
      return;
    }
    if (typeof video.topicId !== "string" || video.topicId.length === 0) {
      problems.push(`data[${index}].topicId is missing`);
    }
    if (typeof video.title !== "string" || video.title.length === 0) {
      problems.push(`data[${index}].title is missing`);
    }
    if (
      !video.metrics ||
      typeof video.metrics.views !== "number" ||
      typeof video.metrics.likes !== "number" ||
      typeof video.metrics.comments !== "number"
    ) {
      problems.push(`data[${index}].metrics is missing or incomplete`);
    }
    if (video.regionCode !== region) {
      problems.push(
        `data[${index}].regionCode=${video.regionCode} (expected ${region})`,
      );
    }
  });

  return problems;
}

/** Latest per-item fetchedAt, which is when the backend last got this from YouTube. */
function latestFetchedAt(videos) {
  const stamps = videos
    .map((video) => video.fetchedAt)
    .filter((value) => typeof value === "string" && !Number.isNaN(Date.parse(value)))
    .sort();
  return stamps.length > 0 ? stamps[stamps.length - 1] : null;
}

/** Write via a temp file + rename so a crash can never leave a truncated snapshot. */
async function writeSnapshot(region, payload) {
  await mkdir(DATA_DIR, { recursive: true });

  const snapshot = {
    ...payload,
    meta: {
      region,
      generatedAt: new Date().toISOString(),
      fetchedAt: latestFetchedAt(payload.data),
      videoCount: payload.data.length,
      cached: payload.cached === true,
      source: "render-backend",
    },
  };

  const target = path.join(DATA_DIR, `trends-${region}.json`);
  const temp = `${target}.tmp`;
  await writeFile(temp, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  await rename(temp, target);
  return target;
}

async function generateSnapshots(regions) {
  const results = [];

  for (const region of regions) {
    log(`Fetching ${region} from ${API_BASE_URL}${REQUEST_PATH} ...`);
    try {
      const payload = await fetchRegionSnapshot(region);
      const problems = validatePayload(payload, region);

      if (problems.length > 0) {
        log(`  ${region}: INVALID response — ${problems.slice(0, 3).join("; ")}${problems.length > 3 ? ` (+${problems.length - 3} more)` : ""}`);
        log(`  ${region}: keeping previous snapshot (if any), no file written.`);
        results.push({ region, ok: false, reason: "invalid payload" });
      } else {
        const file = await writeSnapshot(region, payload);
        const meta = {
          cached: payload.cached === true,
          videos: payload.data.length,
          count: payload.count,
        };
        log(
          `  ${region}: OK — ${meta.videos} videos (${meta.cached ? "served from backend cache" : "freshly fetched"}${meta.count !== meta.videos ? `, count=${meta.count}` : ""}) -> ${path.relative(process.cwd(), file)}`,
        );
        results.push({ region, ok: true, videos: meta.videos });
      }
    } catch (error) {
      log(`  ${region}: FAILED — ${error.message}`);
      log(`  ${region}: keeping previous snapshot (if any), no file written.`);
      results.push({ region, ok: false, reason: error.message });
    }

    if (region !== regions[regions.length - 1]) {
      await sleep(INTER_REGION_DELAY_MS);
    }
  }

  return results;
}

async function checkSnapshots(regions) {
  const results = [];

  for (const region of regions) {
    const file = path.join(DATA_DIR, `trends-${region}.json`);

    if (!existsSync(file)) {
      log(`${region}: MISSING — ${path.relative(process.cwd(), file)} does not exist`);
      results.push({ region, ok: false, reason: "missing file" });
      continue;
    }

    try {
      const raw = await readFile(file, "utf8");
      const snapshot = JSON.parse(raw);
      const problems = validatePayload(snapshot, region);

      if (snapshot.meta?.region !== region) {
        problems.push(`meta.region=${snapshot.meta?.region} (expected ${region})`);
      }
      if (problems.length > 0) {
        log(`${region}: INVALID — ${problems.slice(0, 3).join("; ")}`);
        results.push({ region, ok: false, reason: "invalid snapshot" });
      } else {
        log(
          `${region}: OK — ${snapshot.data.length} videos, generated ${snapshot.meta.generatedAt}`,
        );
        results.push({ region, ok: true });
      }
    } catch (error) {
      log(`${region}: INVALID — cannot parse file (${error.message})`);
      results.push({ region, ok: false, reason: error.message });
    }
  }

  return results;
}

function printSummary(results) {
  const succeeded = results.filter((result) => result.ok);
  const failed = results.filter((result) => !result.ok);

  log("──────── Summary ────────");
  for (const result of succeeded) {
    log(`  ✓ ${result.region}${result.videos !== undefined ? ` (${result.videos} videos)` : ""}`);
  }
  for (const result of failed) {
    log(`  ✗ ${result.region}: ${result.reason}`);
  }
  log(`${succeeded.length}/${results.length} regions succeeded.`);

  return failed.length === 0;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log("Usage: node scripts/fetch-trending.mjs [--check] [REGION ...]");
    process.exit(0);
  }

  const isCheckMode = args.includes("--check");
  const requestedRegions = args.filter((arg) => !arg.startsWith("--"));

  if (requestedRegions.length > 0) {
    const invalid = requestedRegions.filter(
      (region) => !SUPPORTED_REGIONS.includes(region),
    );
    if (invalid.length > 0) {
      log(
        `Unknown region(s): ${invalid.join(", ")}. Supported: ${SUPPORTED_REGIONS.join(", ")}`,
      );
      process.exit(1);
    }
  }

  const regions =
    requestedRegions.length > 0 ? requestedRegions : [...SUPPORTED_REGIONS];

  log(
    isCheckMode
      ? `Checking existing snapshots in ${DATA_DIR} for: ${regions.join(", ")}`
      : `Generating snapshots for ${regions.length} region(s): ${regions.join(", ")}`,
  );

  const results = isCheckMode
    ? await checkSnapshots(regions)
    : await generateSnapshots(regions);

  const allOk = printSummary(results);
  process.exit(allOk ? 0 : 1);
}

main().catch((error) => {
  log(`Unexpected error: ${error.message}`);
  process.exit(1);
});
