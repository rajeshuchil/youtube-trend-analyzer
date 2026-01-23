import styles from './Features.module.css'

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

    return (
        <section id="features" className={`${styles.features} section-light`}>
            <div className="container">
                <div className={styles['features-header']}>
                    <h2 className={styles['features-title']}>Powerful features for content creators</h2>
                    <p className={styles['features-subtitle']}>
                        Everything you need to understand YouTube trends and grow your channel
                    </p>
                </div>

                <div className={styles['features-grid']}>
                    {features.map((feature, index) => (
                        <div key={index} className={`${styles['feature-card']} card`}>
                            <div className={styles['feature-image']}>
                                <img src={feature.image} alt={feature.title} />
                            </div>
                            <h3 className={styles['feature-title']}>{feature.title}</h3>
                            <p className={styles['feature-description']}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
