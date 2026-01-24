import { motion } from 'framer-motion'

function Header() {
    return (
        <motion.header
            className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-8 py-4 flex items-center justify-between max-w-7xl">
                {/* Logo */}
                <a href="/" className="flex items-center gap-3 text-white no-underline font-bold text-xl transition-opacity hover:opacity-80">
                    <span className="text-2xl">📊</span>
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                        YouTube Trends
                    </span>
                </a>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <a
                        href="#features"
                        className="text-gray-400 no-underline text-sm font-medium transition-colors hover:text-white relative group"
                    >
                        Features
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
                    </a>
                    <a
                        href="#how-it-works"
                        className="text-gray-400 no-underline text-sm font-medium transition-colors hover:text-white relative group"
                    >
                        How It Works
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
                    </a>
                    <a
                        href="#use-cases"
                        className="text-gray-400 no-underline text-sm font-medium transition-colors hover:text-white relative group"
                    >
                        Use Cases
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
                    </a>
                    <a
                        href="/dashboard"
                        className="text-gray-400 no-underline text-sm font-medium transition-colors hover:text-white relative group"
                    >
                        Dashboard
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
                    </a>
                </nav>

                {/* CTA Button */}
                <div className="flex items-center gap-4">
                    <a
                        href="/dashboard"
                        className="px-6 py-2.5 bg-yellow-400 text-gray-900 font-semibold rounded-lg transition-all hover:bg-yellow-300 hover:scale-105 hover:shadow-lg"
                    >
                        Try Dashboard
                    </a>
                </div>
            </div>
        </motion.header>
    )
}

export default Header
