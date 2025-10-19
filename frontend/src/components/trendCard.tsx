import type { Trend } from "../types";

interface Props {
  trend: Trend;
}

export default function TrendCard({ trend }: Props) {
  return (
    <div className="card">
      <h3>{trend.title}</h3>
      <a href={trend.url} target="_blank" rel="noreferrer">
        Watch video
      </a>
      <p>Views: {trend.metrics?.views ?? 0}</p>
      <p>Likes: {trend.metrics?.likes ?? 0}</p>
      <p>Comments: {trend.metrics?.comments ?? 0}</p>
      <small>Region: {trend.regionCode}</small>
    </div>
  );
}
