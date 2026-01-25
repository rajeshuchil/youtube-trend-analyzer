import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  TrendingUp,
  Grid3x3,
  Search,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">YT</span>
          </div>
          <h1 className="text-base font-bold text-gray-900 tracking-tight">
            trendscope
          </h1>
        </a>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="md:hidden fixed inset-0 bg-black/50 z-40 top-[57px]"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="md:hidden fixed left-0 top-[57px] bottom-0 w-64 bg-white border-r border-gray-200 z-50 flex flex-col"
            >
              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      end={item.id === "overview"}
                      onClick={closeMobileMenu}
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
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200">
                <a
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors no-underline"
                  onClick={closeMobileMenu}
                >
                  ← Back to Home
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="w-64 h-screen bg-white border-r border-gray-200 flex-col hidden md:flex">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <a href="/" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-base">YT</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                trendscope
              </h1>
            </div>
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
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
