import { motion } from 'framer-motion'

function Header() {
    return (
        <motion.header
            className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Left: Logo + Navigation */}
                    <div className="flex items-center gap-12">
                        {/* Logo */}
                        <a
                            href="/"
                            className="flex items-center gap-2.5 text-white no-underline font-bold text-xl transition-opacity hover:opacity-80"
                        >
                            <span className="text-2xl">📊</span>
                            <span className="bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent">
                                YouTube Trends
                            </span>
                        </a>

                        {/* Navigation Links */}
                        <nav className="hidden lg:flex items-center gap-8">
                            <a
                                href="#features"
                                className="text-gray-300 no-underline text-sm font-medium transition-all hover:text-white"
                            >
                                Features
                            </a>
                            <a
                                href="#how-it-works"
                                className="text-gray-300 no-underline text-sm font-medium transition-all hover:text-white"
                            >
                                How It Works
                            </a>
                            <a
                                href="#use-cases"
                                className="text-gray-300 no-underline text-sm font-medium transition-all hover:text-white"
                            >
                                Use Cases
                            </a>
                        </nav>
                    </div>

                    {/* Right: CTA Button */}
                    <motion.a
                        href="/dashboard"
                        className="relative px-6 py-2.5 bg-yellow-400 text-gray-900 font-semibold text-sm rounded-full transition-all overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            boxShadow: '0 0 15px rgba(250, 204, 21, 0.4)'
                        }}
                    >
                        <span className="relative z-10">Try Dashboard</span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                        />
                    </motion.a>
                </div>
            </div>
        </motion.header>
    )
}

export default Header
