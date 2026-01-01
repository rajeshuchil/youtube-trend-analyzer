import { useState, useEffect } from "react";
import { getTrends } from "@/api/youtube";
import { parseApiError } from "@/api/errorHandler";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { HeroCarousel } from "@/components/dashboard/HeroCarousel";
import { HorizontalRow } from "@/components/dashboard/HorizontalRow";
import { VideoCard } from "@/components/dashboard/VideoCard";
import { ContinueWatching } from "@/components/dashboard/ContinueWatching";
import { SearchBar } from "@/components/common/SearchBar";
import type { Trend } from "@/types";

export default function Dashboard() {
    const [trends, setTrends] = useState<Trend[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load trends on mount
    useEffect(() => {
        const loadTrends = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await getTrends({ regionCode: "US", maxResults: 20 });

                if (res.data && res.data.success) {
                    setTrends(res.data.data || []);
                } else {
                    throw new Error("Failed to fetch trends");
                }
            } catch (err) {
                const error = parseApiError(err);
                console.error("[Dashboard] Error fetching trends:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadTrends();
    }, []); // Only run once on mount

    // Memoized data slices
    const heroTrends = trends.slice(0, 5);
    const trendingNow = trends.slice(0, 10);
    const continueWatchingData = trends.slice(10, 16);

    // Group trends by category
    const trendsByCategory = trends.reduce((acc, trend) => {
        const category = trend.category || "General";
        if (!acc[category]) acc[category] = [];
        acc[category].push(trend);
        return acc;
    }, {} as Record<string, Trend[]>);

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-[#0a0a0a]">
                {/* Hero Carousel */}
                {!loading && heroTrends.length > 0 && (
                    <HeroCarousel trends={heroTrends} />
                )}

                {/* Search Bar Section */}
                <div className="px-8 py-6">
                    <SearchBar />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mx-8 mb-6 p-4 bg-red-900/20 border border-red-900/50 rounded-lg">
                        <p className="text-red-400 text-center">⚠️ {error}</p>
                    </div>
                )}

                {/* Trending Now */}
                {!loading && trendingNow.length > 0 && (
                    <HorizontalRow title="Trending Now">
                        {trendingNow.map((trend, index) => (
                            <VideoCard
                                key={trend.topicId}
                                trend={trend}
                                index={index}
                                onClick={() => window.open(trend.url, "_blank")}
                            />
                        ))}
                    </HorizontalRow>
                )}

                {/* Continue Watching */}
                {!loading && continueWatchingData.length > 0 && (
                    <ContinueWatching trends={continueWatchingData} />
                )}

                {/* Trends by Category */}
                {!loading &&
                    Object.entries(trendsByCategory).map(([category, categoryTrends]) => (
                        <HorizontalRow key={category} title={`${category} Trending`}>
                            {categoryTrends.slice(0, 10).map((trend, index) => (
                                <VideoCard
                                    key={trend.topicId}
                                    trend={trend}
                                    index={index}
                                    onClick={() => window.open(trend.url, "_blank")}
                                />
                            ))}
                        </HorizontalRow>
                    ))}

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center h-96">
                        <div className="text-white text-xl">Loading trending content...</div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
