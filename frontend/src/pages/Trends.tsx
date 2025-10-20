import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { Trend, Category } from "../types";
import { getTrends, refreshTrends, getCategories } from "../api/youtube";

export default function Trends() {
  const [searchParams] = useSearchParams();

  const [trends, setTrends] = useState<Trend[]>([]);
  const [filteredTrends, setFilteredTrends] = useState<Trend[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [keyword, setkeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [regionCode, setRegionCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

  const loadTrends = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getTrends({
        regionCode: regionCode || "US",
        maxResults: 20,
        keyword,
        categoryId,
      });

      if (res.data && res.data.success) {
        setTrends(res.data.data || []);
        setFilteredTrends(res.data.data || []);
        setLastUpdated(new Date().toLocaleString());
      } else {
        throw new Error("Failed to fetch trends");
      }
    } catch (err: any) {
      console.error("Error fetching trends:", err);
      setError(err.message || "Failed to load trends. Please try again.");
      setTrends([]);
      setFilteredTrends([]);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await refreshTrends({
        regionCode: regionCode || "US",
        maxResults: 20,
        keyword,
        categoryId,
      });

      if (res.data && res.data.success) {
        setTrends(res.data.data || []);
        setFilteredTrends(res.data.data || []);
        setLastUpdated(new Date().toLocaleString());
      } else {
        throw new Error("Failed to refresh trends");
      }
    } catch (err: any) {
      console.error("Error refreshing trends:", err);
      setError(err.message || "Failed to refresh trends. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await getCategories({ regionCode: regionCode || "US" });
      if (res.data && res.data.success) {
        setCategories(res.data.data || []);
      }
    } catch (err: any) {
      console.error("Error fetching categories:", err);
      // Don't show error for categories, just use empty array
    }
  };

  // Debounced search functionality
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setkeyword(value);

    // Clear existing timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set new timeout for debounced search
    const newTimeout = setTimeout(() => {
      filterTrends(value, categoryId);
    }, 300);

    setDebounceTimeout(newTimeout);
  };

  // Filter trends based on keyword and category
  const filterTrends = useCallback(
    (searchKeyword: string, selectedCategory: string) => {
      let filtered = [...trends];

      // Filter by keyword
      if (searchKeyword.trim()) {
        filtered = filtered.filter(
          (trend) =>
            trend.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            trend.url?.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      // Filter by category (this would be applied during API call, but kept for consistency)
      if (selectedCategory) {
        filtered = filtered.filter(
          (trend) => trend.category === selectedCategory
        );
      }

      setFilteredTrends(filtered);
    },
    [trends]
  );

  // Clear all filters
  const clearFilters = () => {
    setkeyword("");
    setCategoryId("");
    setRegionCode("");
    setFilteredTrends(trends);
  };

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategoryId(value);
    filterTrends(keyword, value);
  };

  // Handle region change and reload data
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRegionCode(value);
    // Reload categories and trends for new region
    setTimeout(() => {
      loadCategories();
      loadTrends();
    }, 100);
  };

  // Initialize from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get("categoryId");
    const regionParam = searchParams.get("region");

    if (categoryParam) {
      setCategoryId(categoryParam);
    }
    if (regionParam) {
      setRegionCode(regionParam);
    }
  }, [searchParams]);

  useEffect(() => {
    loadTrends();
    loadCategories();
  }, []);

  // Update filtered trends when trends change
  useEffect(() => {
    setFilteredTrends(trends);
  }, [trends]);

  return (
    <div className="App">
      {/* Filter Section - Using responsive CSS classes */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search trends..."
          value={keyword}
          onChange={handleSearchChange}
          className="search-input"
        />

        <select
          value={categoryId}
          onChange={handleCategoryChange}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <select
          value={regionCode}
          onChange={handleRegionChange}
          className="filter-select"
        >
          <option value="">All Regions</option>
          <option value="US">United States</option>
          <option value="IN">India</option>
          <option value="GB">United Kingdom</option>
          <option value="JP">Japan</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
        </select>

        {(keyword || categoryId || regionCode) && (
          <button onClick={clearFilters} className="btn-secondary">
            Clear All
          </button>
        )}

        <button
          onClick={refresh}
          disabled={loading}
          className="btn-primary"
          style={{ opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "⟳ Loading..." : "↻ Refresh"}
        </button>
      </div>

      {/* Stats Bar - Using CSS classes */}
      <div className="status-bar">
        <span>📊 Showing {filteredTrends.length} trends</span>
        {categoryId && (
          <>
            <span>|</span>
            <span>
              🔥{" "}
              {categories.find((c) => c.id === categoryId)?.title ||
                "Selected Category"}
            </span>
          </>
        )}
        {regionCode && (
          <>
            <span>|</span>
            <span>🌍 {regionCode}</span>
          </>
        )}
        <div style={{ marginLeft: "auto" }}>
          {lastUpdated && <span>Last updated: {lastUpdated}</span>}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            color: "#721c24",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <p>⚠️ {error}</p>
          <button
            onClick={loadTrends}
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              width: "40px",
              height: "40px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #28a745",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginBottom: "15px",
            }}
          ></div>
          <p style={{ color: "#6c757d", margin: 0 }}>
            Loading trending videos...
          </p>
        </div>
      )}

      {/* Trends Grid - Using responsive CSS classes */}
      {!loading && (
        <div className="trend-cards">
          {filteredTrends.length > 0
            ? filteredTrends.map((trend, index) => (
                <div
                  key={trend.topicId || index}
                  className="trend-card"
                  onClick={() => trend.url && window.open(trend.url, "_blank")}
                >
                  {/* Trend Ranking Badge */}
                  <div className="trend-badge">
                    #{index + 1}
                  </div>

                  {/* Trend Title */}
                  <h3 className="trend-title">
                    {trend.title}
                  </h3>

                  {/* Category Info */}
                  <p className="trend-category">
                    Category: {trend.category || "General"}
                  </p>

                  {/* Trend Stats */}
                  <div className="trend-stats">
                    <div className="trend-metrics">
                      <span className="views">
                        👀 {trend.metrics?.views?.toLocaleString() || "N/A"} views
                      </span>
                      <span className="likes">
                        👍 {trend.metrics?.likes?.toLocaleString() || "N/A"}
                      </span>
                    </div>
                    <span className="published-date">📅 {trend.timestamp || "Recent"}</span>
                  </div>

                  {/* Click to View */}
                  <div className="trend-action">
                    Click to view on YouTube →
                  </div>
                </div>
              ))
            : !error && (
                <div
                  style={{
                    gridColumn: "1 / -1",
                    textAlign: "center",
                    padding: "40px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <p style={{ color: "#6c757d", margin: 0 }}>
                    No trends found. Try adjusting your filters.
                  </p>
                </div>
              )}
        </div>
      )}
    </div>
  );
}
