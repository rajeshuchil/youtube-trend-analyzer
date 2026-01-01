import { Badge } from "@/components/ui/badge";

interface RatingBadgeProps {
    views: number;
    likes?: number;
    comments?: number;
}

/**
 * Calculate engagement score based on views, likes, and comments
 * Returns a score from 0-10
 */
function calculateEngagementScore(
    views: number,
    likes: number = 0,
    comments: number = 0
): number {
    // Normalize metrics (simple algorithm)
    const likeRatio = views > 0 ? (likes / views) * 100 : 0;
    const commentRatio = views > 0 ? (comments / views) * 100 : 0;

    // Weight: views (40%), likes (40%), comments (20%)
    const score = Math.min(
        10,
        (Math.log10(views) / 10) * 4 +
        (likeRatio * 0.4) +
        (commentRatio * 0.2)
    );

    return Math.max(0, Math.min(10, score));
}

/**
 * Get badge color based on score
 */
function getBadgeVariant(score: number): "default" | "secondary" | "destructive" {
    if (score >= 7) return "default"; // High engagement - green
    if (score >= 4) return "secondary"; // Medium engagement - yellow
    return "destructive"; // Low engagement - red
}

export function RatingBadge({ views, likes, comments }: RatingBadgeProps) {
    const score = calculateEngagementScore(views, likes, comments);
    const variant = getBadgeVariant(score);

    return (
        <Badge
            variant={variant}
            className="bg-[#f5c518] text-black font-bold px-2 py-1 text-xs"
        >
            {score.toFixed(1)}
        </Badge>
    );
}
