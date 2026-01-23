import { motion } from "framer-motion";
import { Play, TrendingUp } from "lucide-react";
import { scaleOnHover, glowOnHover, cardEntrance } from "@/lib/animations";
import { RatingBadge } from "./RatingBadge";
import { calculateEngagementScore, formatNumber, calculateTrendDuration } from "@/utils/analytics";
import type { Trend } from "@/types";

interface VideoCardProps {
    trend: Trend;
    onClick?: () => void;
    index?: number;
}

export function VideoCard({ trend, onClick, index = 0 }: VideoCardProps) {
    // Calculate engagement metrics
    const engagementScore = calculateEngagementScore(trend);
    const trendDuration = calculateTrendDuration(trend.fetchedAt || new Date());

    return (
        <motion.div
            variants={cardEntrance}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            whileHover="hover"
            className="group relative cursor-pointer flex-shrink-0 w-[280px]"
            onClick={onClick}
            tabIndex={0}
            role="button"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick?.();
                }
            }}
        >
            {/* Thumbnail Container */}
            <motion.div
                variants={scaleOnHover}
                className="relative aspect-video rounded-lg overflow-hidden bg-[#1a1a1a]"
            >
                {/* Placeholder for thumbnail - in real app, use actual thumbnail */}
                <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
                    <Play className="h-12 w-12 text-white/30" />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Play className="h-16 w-16 text-white" fill="white" />
                </div>

                {/* Engagement Score Badge */}
                <div className="absolute top-2 left-2 bg-[#f5c518]/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-black" />
                    <span className="text-black text-xs font-bold">{engagementScore.toFixed(1)}</span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-2 right-2">
                    <RatingBadge
                        views={trend.metrics.views}
                        likes={trend.metrics.likes}
                        comments={trend.metrics.comments}
                    />
                </div>

                {/* Trending Duration */}
                <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
                    <span className="text-white text-xs">Trending: {trendDuration}</span>
                </div>
            </motion.div>

            {/* Card Info */}
            <motion.div
                variants={glowOnHover}
                className="mt-3 space-y-1"
            >
                <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-[#f5c518] transition-colors">
                    {trend.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
                    <span>{formatNumber(trend.metrics.views)} views</span>
                    <span>•</span>
                    <span className="capitalize">{trend.category}</span>
                </div>
            </motion.div>

            {/* Focus Ring */}
            <div className="absolute inset-0 rounded-lg ring-2 ring-[#f5c518] ring-offset-2 ring-offset-[#0a0a0a] opacity-0 focus-within:opacity-100 pointer-events-none" />
        </motion.div>
    );
}
