import { motion } from 'framer-motion'

function Hero() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Section - Light Pastel Green Background */}
            <section className="flex-1 bg-[#E8F5E9] flex items-center py-20 px-8 min-h-[70vh]">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Text Content */}
                        <motion.div
                            className="max-w-2xl"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-relaxed text-gray-900">
                                <span className="inline-block bg-yellow-300 px-2 py-1 rounded">
                                    One smart link
                                </span>
                                {' '}for every trending video,{' '}
                                <span className="inline-block bg-orange-300 px-2 py-1 rounded">
                                    category
                                </span>
                                {' '}and{' '}
                                <span className="inline-block bg-blue-300 px-2 py-1 rounded">
                                    region
                                </span>
                                {' '}your audience will ever need.
                            </h1>
                        </motion.div>

                        {/* Right: Abstract Illustration */}
                        <motion.div
                            className="relative flex items-center justify-center"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <svg
                                width="500"
                                height="500"
                                viewBox="0 0 500 500"
                                className="w-full h-auto max-w-lg"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Abstract head/body shape - simplified, light green */}
                                <path
                                    d="M250 80 Q180 120 180 220 Q180 280 210 320 Q250 360 290 320 Q320 280 320 220 Q320 120 250 80 Z"
                                    fill="#C8E6C9"
                                    stroke="#A5D6A7"
                                    strokeWidth="2"
                                />
                                
                                {/* Eye - single black dot on right side */}
                                <circle cx="320" cy="200" r="10" fill="#1a1a1a" />
                                
                                {/* Hand-like outline extending downwards */}
                                <path
                                    d="M290 320 Q250 380 200 400 Q160 410 150 400 Q140 390 150 380 Q160 370 180 375 Q200 380 220 375"
                                    stroke="#A5D6A7"
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                
                                {/* Small white circle being held */}
                                <circle cx="150" cy="400" r="30" fill="white" stroke="#A5D6A7" strokeWidth="2" />
                                
                                {/* Yellow rectangular plank */}
                                <rect x="100" y="430" width="120" height="12" fill="#FFD54F" rx="2" />
                                
                                {/* Small light blue triangle (supporting right side) */}
                                <path
                                    d="M220 442 L235 430 L235 442 Z"
                                    fill="#90CAF9"
                                />
                                
                                {/* Small orange square (supporting left side) */}
                                <rect x="70" y="425" width="30" height="30" fill="#FFB74D" rx="2" />
                            </svg>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bottom Section - Light Beige Background */}
            <section className="bg-[#FAF9F6] py-16 px-8 border-t border-gray-100">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Left: Logo */}
                        <div className="flex items-center gap-3">
                            {/* Stylized asterisk/star symbol - four lines radiating from center */}
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <line x1="14" y1="2" x2="14" y2="12" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
                                <line x1="14" y1="16" x2="14" y2="26" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
                                <line x1="2" y1="14" x2="12" y2="14" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
                                <line x1="16" y1="14" x2="26" y2="14" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
                            </svg>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                                YouTube
                                <span className="relative inline-block ml-1">
                                    Trends
                                    <span className="absolute -top-1 -right-1 text-xs font-normal">©</span>
                                </span>
                            </h2>
                        </div>

                        {/* Right: Tagline */}
                        <div className="text-right">
                            <p className="text-xl md:text-2xl font-normal text-gray-900 leading-tight">
                                Effortless Trend
                            </p>
                            <p className="text-xl md:text-2xl font-normal text-gray-900 leading-tight">
                                Analysis
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero
