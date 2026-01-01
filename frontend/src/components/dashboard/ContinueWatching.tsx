import { HorizontalRow } from "./HorizontalRow";
import { VideoCard } from "./VideoCard";
import type { Trend } from "@/types";

interface ContinueWatchingProps {
    trends: Trend[];
}

export function ContinueWatching({ trends }: ContinueWatchingProps) {
    if (!trends || trends.length === 0) {
        return null;
    }

    return (
        <HorizontalRow title="Continue Watching">
            {trends.map((trend, index) => (
                <div key={trend.topicId} className="relative">
                    <VideoCard
                        trend={trend}
                        index={index}
                        onClick={() => window.open(trend.url, "_blank")}
                    />
                    {/* Progress Bar (mock data) */}
                    <div className="absolute bottom-14 left-0 right-0 h-1 bg-[#2a2a2a] mx-3">
                        <div
                            className="h-full bg-[#f5c518]"
                            style={{ width: `${Math.random() * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </HorizontalRow>
    );
}
