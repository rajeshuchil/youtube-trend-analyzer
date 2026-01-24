import { motion } from 'framer-motion'

function Hero() {
    return (
        <section
            className="sticky top-0 min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 to-black z-0"
        >
            <div className="container mx-auto px-8 py-16 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Hero Content */}
                    <motion.div
                        className="max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            The ultimate <br />
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent relative z-10">
                                    YouTube trend
                                </span>
                                {/* Hand-drawn underline */}
                                <svg
                                    className="absolute -bottom-2 w-full left-0 h-4 -z-0 text-indigo-500 opacity-60"
                                    viewBox="0 0 200 9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2.00021 7.00003C54.8967 1.63228 128.526 -3.02008 197.971 5.92225" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
                                </svg>
                            </span> <br />
                            analyzer
                        </motion.h1>
                        <motion.p
                            className="text-lg text-gray-400 leading-relaxed mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Whether you're starting out or scaling up, YouTube Trend Analyzer gives you the
                            insights and data to grow faster and create content your audience truly loves.
                        </motion.p>
                        <div className="flex gap-4">
                            <motion.a
                                href="/dashboard"
                                className="inline-block px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full transition-all hover:bg-yellow-300 hover:shadow-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Try Dashboard
                            </motion.a>
                            <motion.a
                                href="#features"
                                className="inline-block px-8 py-4 bg-transparent border-2 border-indigo-500 text-white font-bold rounded-full transition-all hover:bg-indigo-500/10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Explore Features
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="relative z-10 animate-float">
                            <img
                                src="/images/hero_dashboard_preview.png"
                                alt="YouTube Trend Analyzer Dashboard"
                                className="w-full rounded-2xl shadow-2xl shadow-indigo-500/30 border border-gray-800"
                            />
                        </div>

                        {/* Casual Floating Elements */}
                        <motion.div
                            className="absolute -left-12 top-20 bg-gray-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl z-20 flex items-center gap-4 hidden md:flex"
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-2xl">
                                🔥
                            </div>
                            <div>
                                <div className="text-white font-bold">Trending #1</div>
                                <div className="text-gray-400 text-xs">Global Gaming</div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="absolute -right-8 bottom-12 bg-white p-4 rounded-xl shadow-2xl z-20 hidden md:block"
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-gray-900 font-bold text-sm">Engagement</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">+127% 🚀</div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Hero
