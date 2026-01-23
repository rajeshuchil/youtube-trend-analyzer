import styles from './CTA.module.css'

function CTA() {
    return (
        <section className={`${styles.cta} section-dark`}>
            <div className={`container ${styles['cta-container']}`}>
                <h2 className={styles['cta-title']}>
                    Ready to grow your <span className="text-gradient">YouTube channel</span>?
                </h2>
                <p className={styles['cta-subtitle']}>
                    Join 10M+ creators who are using YouTube Trend Analyzer to create better content
                </p>
                <a href="#features" className={`btn btn-primary ${styles['btn-large']}`}>
                    Get Started Free
                </a>
            </div>
        </section>
    )
}

export default CTA
