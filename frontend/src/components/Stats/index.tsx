import styles from './Stats.module.css'

function Stats() {
    const stats = [
        {
            icon: '👁️',
            number: '79',
            suffix: '%',
            label: 'more',
            sublabel: 'views per video'
        },
        {
            icon: '⚡',
            number: '10',
            suffix: 'x',
            label: 'faster',
            sublabel: 'than manual methods'
        },
        {
            icon: '📈',
            number: '32',
            suffix: '%',
            label: 'more',
            sublabel: 'subscribers growth'
        },
        {
            icon: '✨',
            number: '10',
            suffix: 'M+',
            label: 'users',
            sublabel: 'creators like you'
        }
    ]

    return (
        <section className={`${styles.stats} section-light`}>
            <div className="container">
                <div className={styles['stats-header']}>
                    <p className={styles['stats-subtitle']}>Built to help creators grow faster</p>
                    <h2 className={styles['stats-title']}>YouTube Trend Analyzer users see real results</h2>
                </div>

                <div className={styles['stats-grid']}>
                    {stats.map((stat, index) => (
                        <div key={index} className={`${styles['stat-card']} card`}>
                            <div className={styles['stat-icon']}>{stat.icon}</div>
                            <div className={styles['stat-number']}>
                                {stat.number}
                                <span className={styles['stat-suffix']}>{stat.suffix}</span>
                            </div>
                            <div className={styles['stat-label']}>{stat.label}</div>
                            <div className={styles['stat-sublabel']}>{stat.sublabel}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Stats
