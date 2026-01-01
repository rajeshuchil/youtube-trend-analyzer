import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCategories, refreshCategories } from "../api/youtube";
import { parseApiError } from "../api/errorHandler";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { RefreshCw, X, TrendingUp } from "lucide-react";
import { cardEntrance } from "@/lib/animations";
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
  const [sortBy, setSortBy] = useState("name");
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
        const categoriesWithStats = (res.data.data || []).map(
          (category: Category) => ({
            ...category,
            trendingCount: category.trendingCount || 0,
            isHot: (category.trendingCount || 0) >= 5,
            totalViews: 0,
          })
        );

        setCategories(categoriesWithStats);
        setLastUpdated(new Date().toLocaleString());
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (err) {
      const error = parseApiError(err);
      console.error("[Categories] Error fetching categories:", error);
      setError(error.message);
      if (categories.length === 0) {
        setCategories([]);
      }
    } finally {
      setLoading(false);
    }
  }, [regionCode, categories.length]);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await refreshCategories({ regionCode });
      if (res.data && res.data.success) {
        await loadCategories();
      } else {
        throw new Error("Failed to refresh categories");
      }
    } catch (err) {
      const error = parseApiError(err);
      console.error("[Categories] Error refreshing categories:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...categories];

    if (searchTerm.trim()) {
      filtered = filtered.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegionCode(e.target.value);
  };

  const handleCategoryClick = (category: CategoryWithStats) => {
    navigate(
      `/trends?categoryId=${category.id}&categoryTitle=${encodeURIComponent(
        category.name
      )}&region=${regionCode}`
    );
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#0a0a0a] py-8">
        {/* Header Section */}
        <div className="px-8 mb-8">
          <h1 className="text-white text-4xl font-bold mb-2">Categories</h1>
          <p className="text-[#9ca3af] text-lg">
            Explore video categories and their trending content
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center mt-6">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder:text-[#9ca3af] focus:border-[#f5c518] focus:outline-none focus:ring-1 focus:ring-[#f5c518]"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:border-[#f5c518] focus:outline-none focus:ring-1 focus:ring-[#f5c518]"
            >
              <option value="name">Sort by Name</option>
              <option value="trending">Sort by Trending Count</option>
              <option value="popularity">Sort by Popularity</option>
            </select>

            {/* Region */}
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

            {/* Clear Search */}
            {searchTerm && (
              <Button
                variant="ghost"
                onClick={clearSearch}
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
          <div className="flex items-center gap-4 text-[#9ca3af] text-sm mt-4">
            <span>📊 {filteredCategories.length} categories</span>
            <span>•</span>
            <span>🔥 {filteredCategories.filter((c) => c.isHot).length} hot</span>
            <span>•</span>
            <span>
              📺{" "}
              {filteredCategories.reduce(
                (sum, c) => sum + (c.trendingCount || 0),
                0
              )}{" "}
              trending videos
            </span>
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
                onClick={loadCategories}
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
            <div className="text-white text-xl">Loading categories...</div>
          </div>
        )}

        {/* Categories Grid */}
        {!loading && (
          <div className="px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    variants={cardEntrance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleCategoryClick(category)}
                    className="relative bg-[#1a1a1a] rounded-lg p-6 cursor-pointer border border-[#2a2a2a] hover:border-[#f5c518] transition-all group"
                  >
                    {/* Hot Badge */}
                    {category.isHot && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        HOT
                      </div>
                    )}

                    {/* Category Name */}
                    <h3 className="text-white text-xl font-bold mb-2 group-hover:text-[#f5c518] transition-colors">
                      {category.name}
                    </h3>

                    {/* Category Info */}
                    <div className="text-[#9ca3af] text-sm mb-4">
                      ID: {category.id} • {category.regionCode}
                    </div>

                    {/* Stats */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-[#9ca3af]">📺</span>
                        <span className="text-white">
                          {category.trendingCount || 0} trending
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-[#9ca3af]">👀</span>
                        <span className="text-white">
                          {category.totalViews?.toLocaleString() || 0} views
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-4 pt-4 border-t border-[#2a2a2a] text-center text-sm text-[#9ca3af] group-hover:text-[#f5c518] transition-colors">
                      Click to view trending videos →
                    </div>
                  </motion.div>
                ))
              ) : (
                !error && (
                  <div className="col-span-full flex items-center justify-center h-96">
                    <p className="text-[#9ca3af] text-lg">
                      No categories found. Try adjusting your search.
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
