import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { motion } from 'framer-motion'

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

function TrendingTable({ videos }: TrendingTableProps) {
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

    return (
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
                    {videos.map((video, index) => (
                        <motion.tr
                            key={video.id}
                            className="border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
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
                </TableBody>
            </Table>
        </div>
    )
}

export default TrendingTable
