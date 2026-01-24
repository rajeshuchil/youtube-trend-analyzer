import { motion } from 'framer-motion'
import { Play, Eye, ThumbsUp, MessageCircle } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

interface VideoCardProps {
    id: string
    title: string
    thumbnail: string
    category: string
    views: string
    likes: string
    comments: string
    engagement: number
    onClick?: () => void
}

function VideoCard({ title, thumbnail, category, views, likes, comments, onClick }: VideoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
        >
            <Card className="bg-white border border-gray-200 overflow-hidden hover:border-teal-300 transition-all">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-200 group cursor-pointer" onClick={onClick}>
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/320x180/f5f5f5/999999?text=No+Thumbnail'
                        }}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center">
                            <Play className="w-8 h-8 text-white ml-1" fill="white" />
                        </div>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 text-xs font-medium bg-teal-500 text-white rounded">
                            {category}
                        </span>
                    </div>
                </div>

                <CardContent className="p-4">
                    {/* Title */}
                    <h3 className="text-gray-900 font-semibold mb-3 line-clamp-2 hover:text-teal-600 transition-colors cursor-pointer">
                        {title}
                    </h3>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{comments}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default VideoCard
