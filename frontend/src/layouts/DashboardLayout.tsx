import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/navigation/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { pageTransition } from "@/lib/animations";

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    // Fixed margin for sidebar (220px expanded)
    const mainMarginLeft = "220px";

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <motion.main
                style={{ marginLeft: mainMarginLeft }}
                className="transition-all duration-300"
            >
                <ScrollArea className="h-screen">
                    <AnimatePresence mode="wait">
                        <motion.div
                            variants={pageTransition}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="min-h-screen"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </ScrollArea>
            </motion.main>
        </div>
    );
}
