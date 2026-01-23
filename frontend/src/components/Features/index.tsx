import styles from './Features.module.css'

function Features() {
    const features = [
        {
            image: '/images/feature_engagement_scoring.png',
            title: 'Engagement Scoring',
            description: 'Calculate video engagement scores based on views, likes, and comments to identify top-performing content.'
        },
        {
            image: '/images/feature_regional_analysis.png',
            title: 'Cross-Regional Analysis',
            description: 'Compare trending videos across 8+ countries including US, UK, India, Japan, and more.'
        },
        {
            image: '/images/feature_trend_duration.png',
            title: 'Trend Duration Tracking',
            description: 'Monitor how long videos stay trending with timeline visualization and performance tracking.'
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
            image: '/images/feature_topic_extraction.png',
            title: 'AI Topic Extraction',
            description: 'Discover trending topics and keywords with AI-powered content analysis.'
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
