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
                    <a
                        href="/dashboard"
                        className="px-6 py-2.5 bg-yellow-400 text-gray-900 font-semibold text-sm rounded-full transition-all hover:bg-yellow-300 hover:shadow-lg"
                    >
                        Try Dashboard
                    </a>
                </div>
            </div>
        </motion.header>
    )
}

export default Header
