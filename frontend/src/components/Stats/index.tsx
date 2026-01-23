import styles from './Stats.module.css'

function Stats() {
    const stats = [
        {
            icon: '🌍',
            number: '8',
            suffix: '',
            label: 'countries',
            sublabel: 'regional coverage'
        },
        {
            icon: '⚡',
            number: '1',
            suffix: 'hr',
            label: 'cache',
            sublabel: 'fresh data updates'
        },
        {
            icon: '📊',
            number: '50',
            suffix: '+',
            label: 'videos',
            sublabel: 'per trending query'
        },
        {
            icon: '🎯',
            number: '24',
            suffix: '/7',
            label: 'access',
            sublabel: 'always available'
        }
    ]

    return (
        <section className={`${styles.stats} section-light`}>
            <div className="container">
                <div className={styles['stats-header']}>
                    <p className={styles['stats-subtitle']}>Powerful data at your fingertips</p>
                    <h2 className={styles['stats-title']}>Real features, real data</h2>
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
