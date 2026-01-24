import { Home, TrendingUp, Grid3x3, Search, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

interface SidebarProps {
    activeItem?: string
}

function Sidebar({ activeItem = 'overview' }: SidebarProps) {
    const navItems = [
        { id: 'overview', label: 'Overview', icon: Home },
        { id: 'trending', label: 'Trending Videos', icon: TrendingUp },
        { id: 'categories', label: 'Categories', icon: Grid3x3 },
        { id: 'search', label: 'Search', icon: Search },
        { id: 'settings', label: 'Settings', icon: Settings },
    ]

    return (
        <aside className="w-64 h-screen bg-gray-900 border-r border-white/10 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                        <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            YouTube Trends
                        </h1>
                        <p className="text-xs text-gray-500">Analytics</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeItem === item.id

                    return (
                        <motion.button
                            key={item.id}
                            className={`
                                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                                transition-all duration-200
                                ${isActive
                                    ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }
                            `}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{item.label}</span>
                        </motion.button>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                <a
                    href="/"
                    className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
                >
                    ← Back to Home
                </a>
            </div>
        </aside>
    )
}

export default Sidebar
