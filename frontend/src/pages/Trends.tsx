import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { Trend, Category } from "../types";
import { getTrends, refreshTrends, getCategories } from "../api/youtube";
import { parseApiError } from "../api/errorHandler";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { HorizontalRow } from "@/components/dashboard/HorizontalRow";
import { VideoCard } from "@/components/dashboard/VideoCard";
import { Button } from "@/components/ui/button";
import { RefreshCw, X } from "lucide-react";

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
    } catch (err) {
      const error = parseApiError(err);
      console.error("[Trends] Error fetching trends:", error);
      setError(error.message);
      if (trends.length === 0) {
        setTrends([]);
        setFilteredTrends([]);
      }
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
    } catch (err) {
      const error = parseApiError(err);
      console.error("[Trends] Error refreshing trends:", error);
      setError(error.message);
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
    } catch (err) {
      const error = parseApiError(err);
      console.error("[Trends] Error fetching categories:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setkeyword(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      filterTrends(value, categoryId);
    }, 300);

    setDebounceTimeout(newTimeout as unknown as number);
  };

  const filterTrends = useCallback(
    (searchKeyword: string, selectedCategory: string) => {
      let filtered = [...trends];

      if (searchKeyword.trim()) {
        filtered = filtered.filter(
          (trend) =>
            trend.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            trend.url?.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter(
          (trend) => trend.category === selectedCategory
        );
      }

      setFilteredTrends(filtered);
    },
    [trends]
  );

  const clearFilters = () => {
    setkeyword("");
    setCategoryId("");
    setRegionCode("");
    setFilteredTrends(trends);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategoryId(value);
    filterTrends(keyword, value);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRegionCode(value);
    setTimeout(() => {
      loadCategories();
      loadTrends();
    }, 100);
  };

  useEffect(() => {
    const categoryParam = searchParams.get("categoryId");
    const regionParam = searchParams.get("region");

    if (categoryParam) {
      setCategoryId(categoryParam);
    }
    if (regionParam) {
      setRegionCode(regionParam);
    }

    loadTrends();
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredTrends(trends);
  }, [trends]);

  // Group trends by category for horizontal rows
  const trendsByCategory = filteredTrends.reduce((acc, trend) => {
    const category = trend.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(trend);
    return acc;
  }, {} as Record<string, Trend[]>);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#0a0a0a] py-8">
        {/* Header Section */}
        <div className="px-8 mb-8">
          <h1 className="text-white text-4xl font-bold mb-6">Trending Videos</h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center mb-6">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                placeholder="Search trends..."
                value={keyword}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder:text-[#9ca3af] focus:border-[#f5c518] focus:outline-none focus:ring-1 focus:ring-[#f5c518]"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryId}
              onChange={handleCategoryChange}
              className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:border-[#f5c518] focus:outline-none focus:ring-1 focus:ring-[#f5c518]"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Region Filter */}
            <select
              value={regionCode}
              onChange={handleRegionChange}
              className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:border-[#f5c518] focus:outline-none focus:ring-1 focus:ring-[#f5c518]"
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

            {/* Clear Filters */}
            {(keyword || categoryId || regionCode) && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-white hover:bg-white/10"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}

            {/* Refresh Button */}
            <Button
              variant="secondary"
              onClick={refresh}
              disabled={loading}
              className="bg-[#f5c518] text-black hover:bg-[#f5c518]/90 font-semibold"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-4 text-[#9ca3af] text-sm">
            <span>📊 {filteredTrends.length} trends</span>
            {categoryId && (
              <>
                <span>•</span>
                <span>
                  🔥 {categories.find((c) => c.id === categoryId)?.name || "Selected Category"}
                </span>
              </>
            )}
            {regionCode && (
              <>
                <span>•</span>
                <span>🌍 {regionCode}</span>
              </>
            )}
            {lastUpdated && (
              <span className="ml-auto">Last updated: {lastUpdated}</span>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-8 mb-6 p-4 bg-red-900/20 border border-red-900/50 rounded-lg">
            <p className="text-red-400 text-center">⚠️ {error}</p>
            <div className="flex justify-center mt-3">
              <Button
                variant="destructive"
                onClick={loadTrends}
                className="bg-red-600 hover:bg-red-700"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-96">
            <div className="text-white text-xl">Loading trending videos...</div>
          </div>
        )}

        {/* Trends by Category */}
        {!loading && Object.keys(trendsByCategory).length > 0 ? (
          Object.entries(trendsByCategory).map(([category, categoryTrends]) => (
            <HorizontalRow key={category} title={`${category} Trending`}>
              {categoryTrends.map((trend, index) => (
                <VideoCard
                  key={trend.topicId}
                  trend={trend}
                  index={index}
                  onClick={() => window.open(trend.url, "_blank")}
                />
              ))}
            </HorizontalRow>
          ))
        ) : (
          !loading &&
          !error && (
            <div className="flex items-center justify-center h-96">
              <p className="text-[#9ca3af] text-lg">
                No trends found. Try adjusting your filters.
              </p>
            </div>
          )
        )}
      </div>
    </DashboardLayout>
  );
}
