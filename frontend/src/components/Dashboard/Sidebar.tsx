import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import {
  Home,
  TrendingUp,
  Grid3x3,
  Search,
  Settings,
  ArrowLeft,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const x = useMotionValue(0);

  // On desktop (md and above), sidebar should always be visible
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        x.set(0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [x]);

  const navItems = [
    { id: "overview", label: "Overview", icon: Home, path: "/dashboard" },
    {
      id: "trending",
      label: "Trending Videos",
      icon: TrendingUp,
      path: "/dashboard/trending",
    },
    {
      id: "categories",
      label: "Categories",
      icon: Grid3x3,
      path: "/dashboard/categories",
    },
    { id: "search", label: "Search", icon: Search, path: "/dashboard/search" },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: window.innerWidth >= 768 ? 0 : isOpen ? 0 : "-100%",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-64 h-screen bg-white border-r border-gray-200 flex-col flex z-50 fixed md:sticky top-0 left-0"
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 md:hidden"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <a href="/" className="flex items-center gap-3 no-underline">
            <img
              src="/images/trendscope-icon.svg"
              alt="TrendScope"
              className="w-10 h-10 flex-shrink-0"
            />
            <h1
              className="text-lg font-bold text-gray-900 tracking-tight m-0 p-0"
              style={{ lineHeight: "2.5rem" }}
            >
              TrendScope
            </h1>
          </a>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.id === "overview"}
                onClick={onClose}
                className={({ isActive }: { isActive: boolean }) => `
                                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                                transition-all duration-200 no-underline
                                ${
                                  isActive
                                    ? "bg-orange-50 border-l-4 border-orange-500 text-orange-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }
                            `}
              >
                <motion.div
                  className="w-full flex items-center gap-3"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              </NavLink>
            );
          })}
        </nav>
        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <a
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </a>
        </div>
      </motion.aside>
    </>
  );
}

export default Sidebar;
