/**
 * Skeleton loading components for graceful progressive rendering
 */

export function TrendCardSkeleton() {
  return (
    <div className="featured-card skeleton-loading">
      <div className="featured-rank skeleton-circle"></div>
      <div className="featured-content">
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-text skeleton-meta"></div>
        <div className="featured-stats">
          <div className="skeleton-text skeleton-stat"></div>
          <div className="skeleton-text skeleton-stat"></div>
        </div>
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="category-preview-card skeleton-loading">
      <div className="skeleton-text skeleton-category-title"></div>
      <div className="skeleton-text skeleton-category-link"></div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="stat-item skeleton-loading">
      <div className="skeleton-text skeleton-stat-number"></div>
      <div className="skeleton-text skeleton-stat-label"></div>
    </div>
  );
}
