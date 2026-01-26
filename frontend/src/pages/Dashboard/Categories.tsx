import { useState, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTrends } from "../../hooks/useTrends";
import CategoryCard from "../../components/Dashboard/CategoryCard";
import RegionFilter from "../../components/Dashboard/RegionFilter";
import VideoPlayerModal from "../../components/Dashboard/VideoPlayerModal";
import { Skeleton } from "../../components/ui/skeleton";
import { Menu } from "lucide-react";

// Helper function to format large numbers
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

interface OutletContext {
  openSidebar: () => void;
}

function Categories() {
  const navigate = useNavigate();
  const { openSidebar } = useOutletContext<OutletContext>();
  const [selectedRegion, setSelectedRegion] = useState(() => {
    return localStorage.getItem("preferredRegion") || "US";
  });
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const { data, isLoading, error } = useTrends(selectedRegion);

  // Process category data
  const categoryStats = useMemo(() => {
    if (!data?.data) return [];

    const categoryNames: Record<string, string> = {
      "1": "Film & Animation",
      "10": "Music",
      "17": "Sports",
      "20": "Gaming",
      "22": "People & Blogs",
      "23": "Comedy",
      "24": "Entertainment",
      "25": "News & Politics",
      "27": "Education",
      "28": "Science & Technology",
    };

    const categoryColors: Record<string, string> = {
      Gaming: "#A855F7",
      Music: "#8B5CF6",
      Entertainment: "#06B6D4",
      Education: "#14B8A6",
      "News & Politics": "#F97316",
      Sports: "#EC4899",
      "Film & Animation": "#F59E0B",
      "Science & Technology": "#14B8A6",
      Comedy: "#D946EF",
      "People & Blogs": "#A855F7",
    };

    // Aggregate by category with top videos
    const categoryMap: Record<
      string,
      {
        count: number;
        totalViews: number;
        videos: Array<{
          id: string;
          videoId: string;
          title: string;
          thumbnail: string;
          views: number;
          likes: number;
          comments: number;
        }>;
      }
    > = {};

    data.data.forEach((video) => {
      const catName = categoryNames[video.category] || "Other";
      const videoId =
        video.topicId || video.url.split("v=")[1]?.split("&")[0] || "default";
      if (!categoryMap[catName]) {
        categoryMap[catName] = { count: 0, totalViews: 0, videos: [] };
      }
      categoryMap[catName].count++;
      categoryMap[catName].totalViews += video.metrics.views;
      categoryMap[catName].videos.push({
        id: video.topicId,
        videoId: videoId,
        title: video.title,
        thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        views: video.metrics.views,
        likes: video.metrics.likes,
        comments: video.metrics.comments,
      });
    });

    // Convert to array and sort by video count
    return Object.entries(categoryMap)
      .map(([name, stats]) => {
        // Sort videos by views and get top 3
        const topVideos = stats.videos
          .sort((a, b) => b.views - a.views)
          .slice(0, 3);

        return {
          name,
          videoCount: stats.count,
          totalViews: formatNumber(stats.totalViews),
          totalViewsRaw: stats.totalViews,
          color: categoryColors[name] || "#6B7280",
          topVideos,
        };
      })
      .sort((a, b) => b.videoCount - a.videoCount);
  }, [data]);

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-12 w-64 mb-8 bg-gray-800" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48 bg-gray-800" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Error Loading Categories
            </h2>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={openSidebar}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Categories
              </h1>
            </div>
            <RegionFilter value={selectedRegion} onChange={setSelectedRegion} />
          </div>
          <p className="text-sm md:text-base text-gray-600">
            Analyze performance across {categoryStats.length} content categories
            in {selectedRegion}
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryStats.map((category) => (
            <CategoryCard
              key={category.name}
              {...category}
              onClick={() => {
                // Navigate to Trending Videos page with category filter
                navigate(
                  `/dashboard/trending?category=${encodeURIComponent(category.name)}`,
                );
              }}
              onVideoClick={(videoId, title) => {
                setSelectedVideo({ id: videoId, title });
              }}
            />
          ))}
        </div>

        {/* Video Player Modal */}
        <VideoPlayerModal
          videoId={selectedVideo?.id || ""}
          title={selectedVideo?.title || ""}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-gray-600 text-sm mb-2">
              Most Popular Category
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {categoryStats[0]?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {categoryStats[0]?.videoCount || 0} videos
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-gray-600 text-sm mb-2">Total Categories</h3>
            <p className="text-2xl font-bold text-gray-900">
              {categoryStats.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Active categories</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-gray-600 text-sm mb-2">Top Category Views</h3>
            <p className="text-2xl font-bold text-gray-900">
              {categoryStats[0]?.totalViews || "0"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {categoryStats[0]?.name || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
