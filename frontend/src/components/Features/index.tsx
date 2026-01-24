import { motion } from 'framer-motion'

function Features() {
    const features = [
        {
            image: '/images/feature_regional_analysis.png',
            title: 'Cross-Regional Analysis',
            description: 'Compare trending videos across 8 countries including US, UK, India, Japan, Canada, Australia, Germany, and France.'
        },
        {
            image: '/images/feature_category_insights.png',
            title: 'Category Insights',
            description: 'Analyze trends by category - Gaming, Music, Entertainment, Education, and more.'
        },
        {
            image: '/images/feature_realtime_updates.png',
            title: 'Real-Time Updates',
            description: 'Get fresh trending data with intelligent caching and manual refresh options.'
        },
        {
            image: '/images/feature_engagement_scoring.png',
            title: 'Engagement Metrics',
            description: 'View detailed engagement metrics including views, likes, and comments for each trending video.'
        },
        {
            image: '/images/feature_topic_extraction.png',
            title: 'Keyword Search',
            description: 'Search for trending videos by specific keywords or topics to find relevant content.'
        },
        {
            image: '/images/feature_trend_duration.png',
            title: 'Smart Data Caching',
            description: 'Fast data access with intelligent caching that refreshes hourly for optimal performance.'
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <section id="features" className="relative py-24 bg-gray-50 z-10">
            <div className="container mx-auto px-8 max-w-7xl">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Powerful features for content creators
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to understand YouTube trends and grow your channel
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                            variants={cardVariants}
                            whileHover={{
                                y: -12,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="mb-6 rounded-xl overflow-hidden">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Features
