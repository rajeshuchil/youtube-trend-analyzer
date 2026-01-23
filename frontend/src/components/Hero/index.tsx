import styles from './Hero.module.css'

function Hero() {
    return (
        <section className={`${styles.hero} section-dark`}>
            <div className={`container ${styles['hero-container']}`}>
                <div className={styles['hero-content']}>
                    <h1 className={styles['hero-title']}>
                        The ultimate <br />
                        <span className="text-gradient">YouTube trend</span> <br />
                        analyzer
                    </h1>
                    <p className={styles['hero-subtitle']}>
                        Whether you're starting out or scaling up, YouTube Trend Analyzer gives you the
                        insights and data to grow faster and create content your audience truly loves.
                    </p>
                    <a href="#features" className="btn btn-primary">
                        Explore Features
                    </a>
                </div>
                <div className={styles['hero-image']}>
                    <img
                        src="/images/hero_dashboard_preview.png"
                        alt="YouTube Trend Analyzer Dashboard"
                    />
                </div>
            </div>

            <div className={styles['hero-badge']}>
                <div className={styles['badge-stars']}>⭐⭐⭐⭐⭐</div>
                <div className={styles['badge-text']}>Trusted by the world's greatest Creators</div>
                <div className={styles['badge-count']}>10M+ creators</div>
            </div>
        </section>
    )
}

export default Hero
