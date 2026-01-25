import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTrends } from "../../hooks/useTrends";
import VideoCard from "../../components/Dashboard/VideoCard";
import VideoPlayerModal from "../../components/Dashboard/VideoPlayerModal";
import FilterBar from "../../components/Dashboard/FilterBar";
import { Skeleton } from "../../components/ui/skeleton";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Helper function to format large numbers
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)} M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)} K`;
  }
  return num.toString();
}

function TrendingVideos() {
  const [searchParams] = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState("US");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("views");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const itemsPerPage = 12;

  // Apply category filter from URL if present
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const { data, isLoading, error } = useTrends(selectedRegion);

  // Transform and filter data
  const processedVideos = useMemo(() => {
    if (!data?.data) return [];

    const categoryNames: Record<string, string> = {
      "1": "Film & Animation",
      "10": "Music",
      "17": "Sports",
      "20": "Gaming",
      "24": "Entertainment",
      "25": "News & Politics",
      "27": "Education",
      "28": "Science & Technology",
    };

    let videos = data.data
      .filter((video, index, self) =>
        // Deduplicate by topicId to prevent duplicate entries
        index === self.findIndex((v) => v.topicId === video.topicId)
      )
      .map((video) => {
        const categoryName = categoryNames[video.category] || "Other";
        const videoId =
          video.topicId || video.url.split("v=")[1]?.split("&")[0] || "default";
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

        return {
          id: video.topicId,
          videoId: videoId,
          title: video.title,
          thumbnail: thumbnailUrl,
          category: categoryName,
          categoryId: video.category,
          views: formatNumber(video.metrics.views),
          likes: formatNumber(video.metrics.likes),
          comments: formatNumber(video.metrics.comments),
          engagement: video.metrics.likes + video.metrics.comments,
          viewsRaw: video.metrics.views,
          likesRaw: video.metrics.likes,
          commentsRaw: video.metrics.comments,
        };
      });

    // Filter by category
    if (selectedCategory !== "all") {
      videos = videos.filter((v) => v.categoryId === selectedCategory);
    }

    // Sort
    videos.sort((a, b) => {
      switch (sortBy) {
        case "views":
          return b.viewsRaw - a.viewsRaw;
        case "likes":
          return b.likesRaw - a.likesRaw;
        case "comments":
          return b.commentsRaw - a.commentsRaw;
        case "recent":
          return 0; // Keep original order
        default:
          return 0;
      }
    });

    return videos;
  }, [data, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(processedVideos.length / itemsPerPage);
  const paginatedVideos = processedVideos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, selectedRegion]);

  if (isLoading) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-8 md:h-12 w-48 md:w-64 mb-6 md:mb-8 bg-gray-800" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-80 bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 md:p-6 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-red-400 mb-2">
              Error Loading Videos
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Responsive */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
            Trending Videos
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Explore {processedVideos.length} trending videos from{" "}
            {selectedRegion}
          </p>
        </div>

        {/* Filters */}
        <FilterBar
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Video Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {paginatedVideos.map((video) => (
            <VideoCard
              key={video.id}
              {...video}
              onClick={() =>
                setSelectedVideo({ id: video.videoId, title: video.title })
              }
            />
          ))}
        </div>

        {/* Pagination - Responsive */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            <Button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              variant="outline"
              className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl shadow-sm text-sm"
            >
              <ChevronLeft className="w-4 h-4 md:mr-2" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            <span className="text-sm md:text-base text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
              className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl shadow-sm text-sm"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4 md:ml-2" />
            </Button>
          </div>
        )}

        {/* Video Player Modal */}
        <VideoPlayerModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoId={selectedVideo?.id || ""}
          title={selectedVideo?.title || ""}
        />
      </div>
    </div>
  );
}

export default TrendingVideos;
