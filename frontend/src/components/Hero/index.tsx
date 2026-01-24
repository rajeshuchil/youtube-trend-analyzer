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
                            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                                YouTube trend
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
                        className="relative animate-float"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <img
                            src="/images/hero_dashboard_preview.png"
                            alt="YouTube Trend Analyzer Dashboard"
                            className="w-full rounded-2xl shadow-2xl shadow-indigo-500/30"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Hero
