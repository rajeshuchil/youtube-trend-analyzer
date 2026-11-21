import { AlertTriangle, RefreshCw } from "lucide-react";

interface StaleDataBannerProps {
  /** ISO timestamp of the data currently shown, if one is honestly available. */
  timestamp?: string | null;
  onRetry: () => void;
  isRetrying: boolean;
}

/** Human-readable age of the displayed data, e.g. "12 min ago". */
function formatAge(iso: string): string {
  const ageMs = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(ageMs)) return "";

  const minutes = Math.floor(ageMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h ago`;

  const days = Math.floor(hours / 24);
  return `${days} d ago`;
}

/**
 * Subtle notice shown when the latest live fetch failed but usable data
 * (snapshot or cached live response) is still being displayed. Keeps the
 * dashboard browsable instead of replacing it with an error screen.
 */
function StaleDataBanner({ timestamp, onRetry, isRetrying }: StaleDataBannerProps) {
  const age = timestamp ? formatAge(timestamp) : "";

  return (
    <div
      role="status"
      className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg"
    >
      <div className="flex items-center gap-2 text-amber-800 text-sm">
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        <span>
          Couldn&apos;t refresh live trends. Showing the latest available data.
          {age && <span className="text-amber-600"> ({age})</span>}
        </span>
      </div>
      <button
        onClick={onRetry}
        disabled={isRetrying}
        className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm font-medium text-amber-800 bg-white border border-amber-300 rounded-md hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? "animate-spin" : ""}`} />
        {isRetrying ? "Retrying…" : "Retry"}
      </button>
    </div>
  );
}

export default StaleDataBanner;
