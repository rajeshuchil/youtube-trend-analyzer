import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Video {
  id: string;
  videoId?: string;
  title: string;
  thumbnail: string;
  category: string;
  views: string;
  likes: string;
  comments: string;
  engagement: number;
}

interface TrendingTableProps {
  videos: Video[];
  onVideoClick?: (video: { id: string; title: string }) => void;
}

const ITEMS_PER_PAGE = 20;

function TrendingTable({ videos, onVideoClick }: TrendingTableProps) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(videos.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentVideos = videos.slice(startIndex, endIndex)

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Gaming': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            'Music': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
            'Entertainment': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
            'Education': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
            'News & Politics': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
            'Sports': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
            'Film & Animation': 'bg-amber-500/20 text-amber-600 border-amber-500/30',
            'Science & Technology': 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30',
            'Comedy': 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
            'People & Blogs': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
            'Howto & Style': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
        }
        return colors[category] || 'bg-gray-500/20 text-gray-700 border-gray-500/30'
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push('...')
                pages.push(currentPage - 1)
                pages.push(currentPage)
                pages.push(currentPage + 1)
                pages.push('...')
                pages.push(totalPages)
            }
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200 hover:bg-transparent">
              <TableHead className="text-gray-600">Video</TableHead>
              <TableHead className="text-gray-600 hidden md:table-cell">
                Category
              </TableHead>
              <TableHead className="text-gray-600 text-right">Views</TableHead>
              <TableHead className="text-gray-600 text-right hidden sm:table-cell">
                Likes
              </TableHead>
              <TableHead className="text-gray-600 text-right hidden lg:table-cell">
                Comments
              </TableHead>
              <TableHead className="text-gray-600 text-right hidden sm:table-cell">
                Engagement
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="wait">
              {currentVideos.map((video, index) => (
                <motion.tr
                  key={`${currentPage}-${video.id}`}
                  className="border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() =>
                    onVideoClick?.({
                      id: video.videoId || video.id,
                      title: video.title,
                    })
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-12 h-9 md:w-16 md:h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <span className="text-gray-900 font-medium line-clamp-2 text-sm md:text-base max-w-[200px] md:max-w-md">
                        {video.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className={getCategoryColor(video.category)}>
                      {video.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-gray-700 text-sm md:text-base">
                    {video.views}
                  </TableCell>
                  <TableCell className="text-right text-gray-700 text-sm md:text-base hidden sm:table-cell">
                    {video.likes}
                  </TableCell>
                  <TableCell className="text-right text-gray-700 text-sm md:text-base hidden lg:table-cell">
                    {video.comments}
                  </TableCell>
                  <TableCell className="text-right hidden sm:table-cell">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 md:w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                          style={{
                            width: `${Math.min(video.engagement / 10, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-gray-700 text-sm w-10 md:w-12">
                        {video.engagement}K
                      </span>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <div className="text-sm text-gray-600 text-center sm:text-left">
            Showing {startIndex + 1}-{Math.min(endIndex, videos.length)} of{" "}
            {videos.length} videos
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <div className="hidden md:flex items-center gap-1">
              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <Button
                    key={page}
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(page as number)}
                    className={`min-w-[2.5rem] ${
                      currentPage === page
                        ? "bg-teal-500 text-white border-transparent hover:bg-teal-600"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {page}
                  </Button>
                ),
              )}
            </div>

            {/* Mobile page indicator */}
            <div className="md:hidden px-3 py-1 bg-white border border-gray-200 rounded text-sm text-gray-700">
              {currentPage} / {totalPages}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4 sm:ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrendingTable;
