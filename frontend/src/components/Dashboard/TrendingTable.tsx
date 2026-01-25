import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Video {
    id: string
    videoId?: string
    title: string
    thumbnail: string
    category: string
    views: string
    likes: string
    comments: string
    engagement: number
}

interface TrendingTableProps {
    videos: Video[]
    onVideoClick?: (video: { id: string; title: string }) => void
}

const ITEMS_PER_PAGE = 20

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

        return pages
    }

    return (
        <div className="space-y-4">
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-gray-200 hover:bg-transparent">
                            <TableHead className="text-gray-600">Video</TableHead>
                            <TableHead className="text-gray-600">Category</TableHead>
                            <TableHead className="text-gray-600 text-right">Views</TableHead>
                            <TableHead className="text-gray-600 text-right">Likes</TableHead>
                            <TableHead className="text-gray-600 text-right">Comments</TableHead>
                            <TableHead className="text-gray-600 text-right">Engagement</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="wait">
                            {currentVideos.map((video, index) => (
                                <motion.tr
                                    key={`${currentPage}-${video.id}`}
                                    className="border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => onVideoClick?.({ id: video.videoId || video.id, title: video.title })}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2, delay: index * 0.03 }}
                                >
                                    <TableCell className="flex items-center gap-3 py-4">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-16 h-12 rounded-lg object-cover"
                                        />
                                        <span className="text-gray-900 font-medium line-clamp-2 max-w-md">
                                            {video.title}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getCategoryColor(video.category)}>
                                            {video.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-gray-700">{video.views}</TableCell>
                                    <TableCell className="text-right text-gray-700">{video.likes}</TableCell>
                                    <TableCell className="text-right text-gray-700">{video.comments}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                                                    style={{ width: `${Math.min(video.engagement / 10, 100)}%` }}
                                                />
                                            </div>
                                            <span className="text-gray-700 text-sm w-12">{video.engagement}K</span>
                                        </div>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
                <AnimatePresence mode="wait">
                    {currentVideos.map((video, index) => (
                        <motion.div
                            key={`${currentPage}-${video.id}`}
                            className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => onVideoClick?.({ id: video.videoId || video.id, title: video.title })}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                        >
                            <div className="flex gap-3 mb-3">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-32 h-20 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                                        {video.title}
                                    </h3>
                                    <Badge className={`${getCategoryColor(video.category)} text-xs`}>
                                        {video.category}
                                    </Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 text-center pt-3 border-t border-gray-100">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Views</div>
                                    <div className="text-sm font-semibold text-gray-900">{video.views}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Likes</div>
                                    <div className="text-sm font-semibold text-gray-900">{video.likes}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Comments</div>
                                    <div className="text-sm font-semibold text-gray-900">{video.comments}</div>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Engagement</span>
                                    <span className="text-sm font-semibold text-gray-900">{video.engagement}K</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                                    <div
                                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                                        style={{ width: `${Math.min(video.engagement / 10, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                    <div className="text-sm text-gray-600 text-center sm:text-left">
                        Showing {startIndex + 1}-{Math.min(endIndex, videos.length)} of {videos.length} videos
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="h-4 w-4 sm:mr-1" />
                            <span className="hidden sm:inline">Previous</span>
                        </Button>

                        <div className="hidden md:flex items-center gap-1">
                            {getPageNumbers().map((page, index) => (
                                page === '...' ? (
                                    <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                                        ...
                                    </span>
                                ) : (
                                    <Button
                                        key={page}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(page as number)}
                                        className={`min-w-[2.5rem] ${currentPage === page
                                            ? 'bg-teal-500 text-white border-transparent hover:bg-teal-600'
                                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        {page}
                                    </Button>
                                )
                            ))}
                        </div>

                        {/* Mobile page indicator */}
                        <div className="md:hidden px-3 py-1 bg-white border border-gray-200 rounded text-sm text-gray-700">
                            {currentPage} / {totalPages}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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
    )
}

export default TrendingTable
