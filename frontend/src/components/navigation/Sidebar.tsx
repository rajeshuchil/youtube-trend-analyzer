import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Home,
    TrendingUp,
    Grid3x3,
    Search,
    Moon,
    Sun,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { navItemHover, sidebarCollapse } from "@/lib/animations";

interface NavItem {
    label: string;
    icon: React.ElementType;
    path: string;
}

const navItems: NavItem[] = [
    { label: "Dashboard", icon: Home, path: "/dashboard" },
    { label: "Trending", icon: TrendingUp, path: "/trends" },
    { label: "Categories", icon: Grid3x3, path: "/categories" },
    { label: "Search", icon: Search, path: "/search" },
];

export function Sidebar() {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle("dark");
    };

    return (
        <TooltipProvider delayDuration={0}>
            <motion.aside
                variants={sidebarCollapse}
                animate={isCollapsed ? "collapsed" : "expanded"}
                className="fixed left-0 top-0 h-screen bg-[#141414] border-r border-[#2a2a2a] flex flex-col z-50"
            >
                {/* Logo / Brand */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-[#2a2a2a]">
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col"
                        >
                            <span className="text-white font-bold text-lg">Trend</span>
                            <span className="text-[#9ca3af] text-xs">Analyzer</span>
                        </motion.div>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleCollapse}
                        className="text-[#9ca3af] hover:text-white hover:bg-white/10"
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-5 w-5" />
                        ) : (
                            <ChevronLeft className="h-5 w-5" />
                        )}
                    </Button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 py-4 overflow-y-auto">
                    <ul className="space-y-1 px-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            const navButton = (
                                <Link to={item.path} className="block">
                                    <motion.div
                                        variants={navItemHover}
                                        initial="rest"
                                        whileHover="hover"
                                        animate={isActive ? "active" : "rest"}
                                        className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-colors duration-150
                      ${isActive
                                                ? "bg-white/15 text-white border-l-4 border-[#f5c518]"
                                                : "text-[#9ca3af] hover:text-white hover:bg-white/10"
                                            }
                    `}
                                    >
                                        <Icon className="h-5 w-5 shrink-0" />
                                        {!isCollapsed && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="text-sm font-medium"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </motion.div>
                                </Link>
                            );

                            if (isCollapsed) {
                                return (
                                    <li key={item.path}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>{navButton}</TooltipTrigger>
                                            <TooltipContent side="right">
                                                <p>{item.label}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </li>
                                );
                            }

                            return <li key={item.path}>{navButton}</li>;
                        })}
                    </ul>
                </nav>

                {/* Dark Mode Toggle */}
                <div className="p-4 border-t border-[#2a2a2a]">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size={isCollapsed ? "icon" : "default"}
                                onClick={toggleDarkMode}
                                className="w-full text-[#9ca3af] hover:text-white hover:bg-white/10"
                            >
                                {isDarkMode ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                                {!isCollapsed && (
                                    <span className="ml-3">
                                        {isDarkMode ? "Light Mode" : "Dark Mode"}
                                    </span>
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>{isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </motion.aside>
        </TooltipProvider>
    );
}
