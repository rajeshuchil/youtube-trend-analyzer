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
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Filter Section - Matching Categories UI */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          alignItems: "center",
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          placeholder="Search trends..."
          value={keyword}
          onChange={handleSearchChange}
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            flex: 1,
            minWidth: "200px",
          }}
        />

        <select
          value={categoryId}
          onChange={handleCategoryChange}
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            minWidth: "150px",
          }}
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
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            minWidth: "150px",
          }}
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
          <button
            onClick={clearFilters}
            style={{
              padding: "8px 16px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Clear All
          </button>
        )}

        <button
          onClick={refresh}
          disabled={loading}
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "⟳ Loading..." : "↻ Refresh"}
        </button>
      </div>

      {/* Stats Bar - Similar to Categories */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
          fontSize: "14px",
          color: "#6c757d",
        }}
      >
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

      {/* Trends Grid - Matching Categories Card Layout */}
      {!loading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredTrends.length > 0
            ? filteredTrends.map((trend, index) => (
                <div
                  key={trend.topicId || index}
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    border: "1px solid #e9ecef",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(0,0,0,0.15)";
                    e.currentTarget.style.borderColor = "#28a745";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.1)";
                    e.currentTarget.style.borderColor = "#e9ecef";
                  }}
                  onClick={() => trend.url && window.open(trend.url, "_blank")}
                >
                  {/* Trend Ranking Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      backgroundColor: "#28a745",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    #{index + 1}
                  </div>

                  {/* Trend Title */}
                  <h3
                    style={{
                      margin: "0 0 10px 0",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#333",
                      lineHeight: "1.4",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      paddingRight: "60px",
                    }}
                  >
                    {trend.title}
                  </h3>

                  {/* Category Info */}
                  <p
                    style={{
                      margin: "0 0 15px 0",
                      fontSize: "14px",
                      color: "#6c757d",
                      fontWeight: "500",
                    }}
                  >
                    Category: {trend.category || "General"}
                  </p>

                  {/* Trend Stats */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12px",
                      color: "#6c757d",
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <span>
                        👀 {trend.metrics?.views?.toLocaleString() || "N/A"}{" "}
                        views
                      </span>
                      <span>
                        👍 {trend.metrics?.likes?.toLocaleString() || "N/A"}
                      </span>
                    </div>
                    <span>📅 {trend.timestamp || "Recent"}</span>
                  </div>

                  {/* Click to View */}
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "4px",
                      textAlign: "center",
                      fontSize: "12px",
                      color: "#6c757d",
                      border: "1px dashed #dee2e6",
                    }}
                  >
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
