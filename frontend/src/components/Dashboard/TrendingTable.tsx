import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Video {
    id: string
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
}

const ITEMS_PER_PAGE = 20

function TrendingTable({ videos }: TrendingTableProps) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(videos.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentVideos = videos.slice(startIndex, endIndex)

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Gaming': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
            'Music': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
            'Entertainment': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
            'Education': 'bg-green-500/20 text-green-300 border-green-500/30',
            'News': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        }
        return colors[category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
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
            <div className="bg-gray-900/50 rounded-xl border border-white/10 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-gray-400">Video</TableHead>
                            <TableHead className="text-gray-400">Category</TableHead>
                            <TableHead className="text-gray-400 text-right">Views</TableHead>
                            <TableHead className="text-gray-400 text-right">Likes</TableHead>
                            <TableHead className="text-gray-400 text-right">Comments</TableHead>
                            <TableHead className="text-gray-400 text-right">Engagement</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="wait">
                            {currentVideos.map((video, index) => (
                                <motion.tr
                                    key={`${currentPage}-${video.id}`}
                                    className="border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
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
                                        <span className="text-white font-medium line-clamp-2 max-w-md">
                                            {video.title}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getCategoryColor(video.category)}>
                                            {video.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-gray-300">{video.views}</TableCell>
                                    <TableCell className="text-right text-gray-300">{video.likes}</TableCell>
                                    <TableCell className="text-right text-gray-300">{video.comments}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                                                    style={{ width: `${Math.min(video.engagement / 10, 100)}%` }}
                                                />
                                            </div>
                                            <span className="text-gray-300 text-sm w-12">{video.engagement}K</span>
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
                <div className="flex items-center justify-between px-2">
                    <div className="text-sm text-gray-400">
                        Showing {startIndex + 1}-{Math.min(endIndex, videos.length)} of {videos.length} videos
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="bg-gray-900/50 border-white/10 text-gray-300 hover:bg-white/5 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                        </Button>

                        <div className="flex items-center gap-1">
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
                                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent hover:from-purple-600 hover:to-blue-600'
                                                : 'bg-gray-900/50 border-white/10 text-gray-300 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        {page}
                                    </Button>
                                )
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="bg-gray-900/50 border-white/10 text-gray-300 hover:bg-white/5 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TrendingTable
