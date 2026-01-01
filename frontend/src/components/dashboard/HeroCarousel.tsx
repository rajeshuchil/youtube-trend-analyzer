import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingBadge } from "./RatingBadge";
import { slideIn } from "@/lib/animations";
import type { Trend } from "@/types";

interface HeroCarouselProps {
    trends: Trend[];
    autoRotateInterval?: number; // in milliseconds
}

export function HeroCarousel({
    trends,
    autoRotateInterval = 5000,
}: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-rotate slides
    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, autoRotateInterval);

        return () => clearInterval(timer);
    }, [currentIndex, autoRotateInterval]);

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            const next = prev + newDirection;
            if (next >= trends.length) return 0;
            if (next < 0) return trends.length - 1;
            return next;
        });
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    if (!trends || trends.length === 0) {
        return null;
    }

    const currentTrend = trends[currentIndex];

    // Null check for currentTrend
    if (!currentTrend) {
        return null;
    }

    // Format view count
    const formatViews = (views: number): string => {
        if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
        if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
        return views.toString();
    };

    return (
        <section className="relative h-[70vh] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideIn}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                >
                    {/* Background Image with Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]">
                        {/* Placeholder for background image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex items-end pb-20 px-12">
                        <div className="max-w-2xl space-y-4">
                            {/* Rating Badge */}
                            <div className="flex items-center gap-3">
                                <RatingBadge
                                    views={currentTrend.metrics.views}
                                    likes={currentTrend.metrics.likes}
                                    comments={currentTrend.metrics.comments}
                                />
                                <span className="text-[#9ca3af] text-sm">
                                    {formatViews(currentTrend.metrics.views)} views
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-white text-5xl font-bold leading-tight line-clamp-2">
                                {currentTrend.title}
                            </h1>

                            {/* Category */}
                            <p className="text-[#9ca3af] text-lg capitalize">
                                {currentTrend.category}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    size="lg"
                                    className="bg-white text-black hover:bg-white/90 font-semibold"
                                    onClick={() => window.open(currentTrend.url, "_blank")}
                                >
                                    <Play className="h-5 w-5 mr-2" fill="black" />
                                    Watch Now
                                </Button>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="bg-white/20 text-white hover:bg-white/30 font-semibold backdrop-blur-sm"
                                >
                                    <Info className="h-5 w-5 mr-2" />
                                    More Info
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {trends.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1 rounded-full transition-all ${index === currentIndex
                            ? "w-8 bg-[#f5c518]"
                            : "w-1 bg-white/50 hover:bg-white/80"
                            }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Keyboard Navigation Hint */}
            <div className="absolute top-4 right-4 text-[#9ca3af] text-xs">
                Use ← → to navigate
            </div>
        </section>
    );
}
