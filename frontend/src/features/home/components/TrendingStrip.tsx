import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { createCardRevealAnimation } from "../../../animations/scrollAnimations";
import { TrendCardSkeleton } from "../../../components/SkeletonLoaders";
import type { Trend } from "../../../types";

interface TrendingStripProps {
    trends: Trend[];
    isLoading: boolean;
}

export function TrendingStrip({ trends, isLoading }: TrendingStripProps) {
    const trendingStripRef = useRef<HTMLElement>(null);

    /**
     * Trending cards reveal animation
     * Cards fade in on scroll using extracted animation function
     */
    useLayoutEffect(() => {
        if (!isLoading && trendingStripRef.current) {
            const ctx = createCardRevealAnimation(
                trendingStripRef,
                ".trending-card",
                {
                    y: 60,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );

            return () => ctx.revert();
        }
    }, [isLoading]);

    return (
        <section ref={trendingStripRef} className="trending-asmodee">
            <div className="trending-asmodee-inner">
                <div className="trending-cards-grid">
                    {isLoading ? (
                        <>
                            <TrendCardSkeleton />
                            <TrendCardSkeleton />
                            <TrendCardSkeleton />
                            <TrendCardSkeleton />
                        </>
                    ) : (
                        trends.map((trend, index) => (
                            <Link
                                key={trend.topicId || index}
                                to={`/trends?topic=${encodeURIComponent(trend.title)}`}
                                className="trending-asmodee-card trending-card"
                            >
                                <div className="trending-asmodee-card-inner">
                                    <div className="trending-asmodee-header">
                                        <span className="trending-asmodee-tag">trending</span>
                                        <span className="trending-asmodee-category">
                                            {trend.category || "general"}
                                        </span>
                                        <div className="trending-asmodee-arrow">→</div>
                                    </div>

                                    <h3 className="trending-asmodee-title">{trend.title}</h3>

                                    <div className="trending-asmodee-meta">
                                        <span className="trending-asmodee-views">
                                            {trend.metrics?.views?.toLocaleString() || "N/A"} views
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
