import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Video, Eye, TrendingUp, ChevronDown, ThumbsUp, Play } from 'lucide-react'

interface TopVideo {
    id: string
    videoId: string
    title: string
    thumbnail: string
    views: number
    likes: number
    comments: number
}

interface CategoryCardProps {
    name: string
    videoCount: number
    totalViews: string
    totalViewsRaw: number
    color: string
    topVideos?: TopVideo[]
    onClick?: () => void
    onVideoClick?: (videoId: string, title: string) => void
}

function CategoryCard({
    name,
    videoCount,
    totalViews,
    totalViewsRaw,
    color,
    topVideos = [],
    onClick,
    onVideoClick
}: CategoryCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    // Calculate average metrics
    const avgViews = videoCount > 0 ? Math.round(totalViewsRaw / videoCount) : 0
    const avgLikes = topVideos.length > 0
        ? Math.round(topVideos.reduce((sum, v) => sum + v.likes, 0) / topVideos.length)
        : 0
    const avgComments = topVideos.length > 0
        ? Math.round(topVideos.reduce((sum, v) => sum + v.comments, 0) / topVideos.length)
        : 0
    const engagementRate = avgViews > 0
        ? ((avgLikes + avgComments) / avgViews * 100).toFixed(2)
        : '0.00'

    const formatNumber = (num: number): string => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
        return num.toString()
    }

    const handleCardClick = () => {
        if (!isExpanded && onClick) {
            onClick()
        }
    }

    const handleExpandClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsExpanded(!isExpanded)
    }

    const handleVideoClick = (e: React.MouseEvent, videoId: string, title: string) => {
        e.stopPropagation()
        if (onVideoClick) {
            onVideoClick(videoId, title)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: isExpanded ? 1 : 1.02, y: isExpanded ? 0 : -4 }}
            transition={{ duration: 0.2 }}
        >
            <Card className="bg-gray-900/50 border-white/10 hover:border-purple-500/30 transition-all cursor-pointer">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle
                            className="text-lg text-white hover:text-purple-400 transition-colors"
                            onClick={handleCardClick}
                        >
                            {name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                            {topVideos.length > 0 && (
                                <motion.button
                                    onClick={handleExpandClick}
                                    className="p-1 hover:bg-white/10 rounded transition-colors"
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </motion.button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {/* Video Count */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Video className="w-4 h-4" />
                                <span className="text-sm">Videos</span>
                            </div>
                            <span className="text-white font-semibold">{videoCount}</span>
                        </div>

                        {/* Total Views */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Eye className="w-4 h-4" />
                                <span className="text-sm">Views</span>
                            </div>
                            <span className="text-white font-semibold">{totalViews}</span>
                        </div>

                        {/* Performance Bar */}
                        <div className="pt-2">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-400">Performance</span>
                            </div>
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        background: `linear-gradient(90deg, ${color}40, ${color})`
                                    }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((videoCount / 5) * 100, 100)}%` }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                />
                            </div>
                        </div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 border-t border-white/10 space-y-4">
                                        {/* Average Metrics */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-gray-800/50 rounded p-2">
                                                <div className="text-xs text-gray-400 mb-1">Avg Views</div>
                                                <div className="text-sm font-semibold text-white">{formatNumber(avgViews)}</div>
                                            </div>
                                            <div className="bg-gray-800/50 rounded p-2">
                                                <div className="text-xs text-gray-400 mb-1">Engagement</div>
                                                <div className="text-sm font-semibold text-white">{engagementRate}%</div>
                                            </div>
                                        </div>

                                        {/* Top Videos */}
                                        {topVideos.length > 0 && (
                                            <div>
                                                <h4 className="text-xs font-semibold text-gray-400 mb-2">Top Videos</h4>
                                                <div className="space-y-2">
                                                    {topVideos.slice(0, 3).map((video, index) => (
                                                        <motion.div
                                                            key={video.id}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className="flex gap-2 group cursor-pointer hover:bg-white/5 rounded p-1 transition-colors"
                                                            onClick={(e) => handleVideoClick(e, video.videoId, video.title)}
                                                        >
                                                            {/* Thumbnail */}
                                                            <div className="relative w-20 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-800">
                                                                <img
                                                                    src={video.thumbnail}
                                                                    alt={video.title}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.currentTarget.src = 'https://via.placeholder.com/80x48/1a1a1a/666666?text=Video'
                                                                    }}
                                                                />
                                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                    <Play className="w-4 h-4 text-white" fill="white" />
                                                                </div>
                                                            </div>

                                                            {/* Video Info */}
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs text-white line-clamp-2 mb-1 group-hover:text-purple-400 transition-colors">
                                                                    {video.title}
                                                                </p>
                                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                    <span className="flex items-center gap-1">
                                                                        <Eye className="w-3 h-3" />
                                                                        {formatNumber(video.views)}
                                                                    </span>
                                                                    <span className="flex items-center gap-1">
                                                                        <ThumbsUp className="w-3 h-3" />
                                                                        {formatNumber(video.likes)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default CategoryCard
