import { useRef } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { staggerChildren } from "@/lib/animations";

interface HorizontalRowProps {
    title: string;
    children: ReactNode;
    showArrows?: boolean;
}

export function HorizontalRow({
    title,
    children,
    showArrows = true,
}: HorizontalRowProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 600; // Scroll by ~2 cards
            const newScrollLeft =
                scrollRef.current.scrollLeft +
                (direction === "right" ? scrollAmount : -scrollAmount);

            scrollRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="py-8 px-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-2xl font-bold">{title}</h2>

                {showArrows && (
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => scroll("left")}
                            className="text-white hover:bg-white/10"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => scroll("right")}
                            className="text-white hover:bg-white/10"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Horizontal Scroll Container */}
            <div className="relative group">
                <ScrollArea className="w-full">
                    <motion.div
                        ref={scrollRef}
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                        className="flex gap-4 pb-4"
                        style={{
                            scrollSnapType: "x mandatory",
                        }}
                    >
                        {children}
                    </motion.div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>

                {/* Gradient Overlays for visual effect */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </section>
    );
}
