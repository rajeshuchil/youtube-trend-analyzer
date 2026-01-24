import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Video, Eye, TrendingUp } from 'lucide-react'

interface CategoryCardProps {
    name: string
    videoCount: number
    totalViews: string
    color: string
    icon?: string
}

function CategoryCard({ name, videoCount, totalViews, color }: CategoryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.2 }}
        >
            <Card className="bg-gray-900/50 border-white/10 hover:border-purple-500/30 transition-all cursor-pointer">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-white">{name}</CardTitle>
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                        />
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
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default CategoryCard
