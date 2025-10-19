import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, refreshCategories, getTrends } from "../api/youtube";
import type { Category } from "../types";

interface CategoryWithStats extends Category {
  trendingCount?: number;
  isHot?: boolean;
  totalViews?: number;
}

export default function Categories() {
  const [categories, setCategories] = useState<CategoryWithStats[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<
    CategoryWithStats[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionCode, setRegionCode] = useState("");
  const [sortBy, setSortBy] = useState("name"); // name, trending, popularity
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const navigate = useNavigate();

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getCategories({ regionCode: regionCode || "US" });
      if (res.data && res.data.success) {
        const categoriesWithStats = await Promise.all(
          (res.data.data || []).map(async (category: Category) => {
            // Get trending count for each category
            try {
              const trendsRes = await getTrends({
                regionCode,
                categoryId: category.id,
                maxResults: 50,
              });
              const trendingCount = trendsRes.data?.data?.length || 0;
              return {
                ...category,
                trendingCount,
                isHot: trendingCount >= 5, // Mark as hot if 5+ trending videos
                totalViews: Math.floor(Math.random() * 1000000), // Mock data for now
              };
            } catch {
              return {
                ...category,
                trendingCount: 0,
                isHot: false,
                totalViews: 0,
              };
            }
          })
        );

        setCategories(categoriesWithStats);
        setLastUpdated(new Date().toLocaleString());
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (err: any) {
      console.error("Error fetching categories:", err);
      setError(err.message || "Failed to load categories. Please try again.");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [regionCode]);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await refreshCategories({ regionCode });
      if (res.data && res.data.success) {
        // Reload with stats after refresh
        await loadCategories();
      } else {
        throw new Error("Failed to refresh categories");
      }
    } catch (err: any) {
      console.error("Error refreshing categories:", err);
      setError(
        err.message || "Failed to refresh categories. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Combined filter and sort function
  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...categories];

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter((category) =>
        category.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "trending":
        filtered.sort(
          (a, b) => (b.trendingCount || 0) - (a.trendingCount || 0)
        );
        break;
      case "popularity":
        filtered.sort((a, b) => (b.totalViews || 0) - (a.totalViews || 0));
        break;
      default:
        break;
    }

    setFilteredCategories(filtered);
  }, [categories, searchTerm, sortBy]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  // Handle region change
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegionCode(e.target.value);
  };

  // Navigate to trends with category filter
  const handleCategoryClick = (category: CategoryWithStats) => {
    navigate(
      `/trends?categoryId=${category.id}&categoryTitle=${encodeURIComponent(
        category.title
      )}&region=${regionCode}`
    );
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Load categories when component mounts or region changes
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Apply filters when categories, search, or sort changes
  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  return (
    <div className="App">
      {/* Header */}
      <div className="header">
        <h1>YouTube Categories</h1>
        <p>Explore video categories and their trending content</p>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        {lastUpdated && (
          <p className="last-updated">Last updated: {lastUpdated}</p>
        )}
        <button onClick={refresh} className="refresh-btn" disabled={loading}>
          {loading ? "⟳" : "↻"} Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button onClick={loadCategories} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {/* Filter & Search Section */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />

        <select value={sortBy} onChange={handleSortChange}>
          <option value="name">Sort by Name</option>
          <option value="trending">Sort by Trending Count</option>
          <option value="popularity">Sort by Popularity</option>
        </select>

        <select value={regionCode} onChange={handleRegionChange}>
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

        {searchTerm && (
          <button onClick={clearSearch} className="clear-filters-btn">
            Clear Search
          </button>
        )}
      </div>

      {/* Active Filters */}
      <div className="active-filters">
        {regionCode && (
          <span className="filter-tag">
            Region: {regionCode}
            <button onClick={() => setRegionCode("")}>×</button>
          </span>
        )}
        {searchTerm && (
          <span className="filter-tag">
            Search: {searchTerm}
            <button onClick={clearSearch}>×</button>
          </span>
        )}
        {sortBy !== "name" && (
          <span className="filter-tag">
            Sort: {sortBy === "trending" ? "Trending Count" : "Popularity"}
            <button onClick={() => setSortBy("name")}>×</button>
          </span>
        )}
      </div>

      {/* Statistics Summary */}
      {!loading && filteredCategories.length > 0 && (
        <div className="status-bar">
          <p className="last-updated">
            📊 Showing {filteredCategories.length} categories | 🔥{" "}
            {filteredCategories.filter((c) => c.isHot).length} hot categories |
            📺{" "}
            {filteredCategories.reduce(
              (sum, c) => sum + (c.trendingCount || 0),
              0
            )}{" "}
            trending videos
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading">
          <p>🔄 Loading categories...</p>
        </div>
      )}

      {/* Categories Grid */}
      {!loading && (
        <div className="trend-cards">
          {filteredCategories.length > 0
            ? filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="trend-card"
                  onClick={() => handleCategoryClick(category)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Hot Badge */}
                  {category.isHot && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "#ff4444",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      🔥 HOT
                    </div>
                  )}

                  <h3>{category.title}</h3>
                  <div className="channel-name">
                    ID: {category.id} • Region: {category.regionCode}
                  </div>

                  <div className="stats">
                    <span className="views">
                      📺 {category.trendingCount || 0} trending
                    </span>
                    <span className="published-date">
                      👀 {category.totalViews?.toLocaleString() || 0} views
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: "10px",
                      padding: "8px 12px",
                      background: "#f0f0f0",
                      borderRadius: "6px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    Click to view trending videos →
                  </div>
                </div>
              ))
            : !error && (
                <div className="loading">
                  <p>No categories found. Try adjusting your search.</p>
                </div>
              )}
        </div>
      )}
    </div>
  );
}
