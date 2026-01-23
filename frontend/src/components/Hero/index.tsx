import { motion } from 'framer-motion'
import styles from './Hero.module.css'

function Hero() {
    return (
        <section className={`${styles.hero} section-dark`}>
            <div className={`container ${styles['hero-container']}`}>
                <motion.div
                    className={styles['hero-content']}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h1
                        className={styles['hero-title']}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        The ultimate <br />
                        <span className="text-gradient">YouTube trend</span> <br />
                        analyzer
                    </motion.h1>
                    <motion.p
                        className={styles['hero-subtitle']}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Whether you're starting out or scaling up, YouTube Trend Analyzer gives you the
                        insights and data to grow faster and create content your audience truly loves.
                    </motion.p>
                    <motion.a
                        href="#features"
                        className="btn btn-primary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Explore Features
                    </motion.a>
                </motion.div>
                <motion.div
                    className={styles['hero-image']}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <img
                        src="/images/hero_dashboard_preview.png"
                        alt="YouTube Trend Analyzer Dashboard"
                    />
                </motion.div>
            </div>

            <motion.div
                className={styles['hero-badge']}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                <div className={styles['badge-stars']}>⭐⭐⭐⭐⭐</div>
                <div className={styles['badge-text']}>Trusted by content creators worldwide</div>
                <div className={styles['badge-count']}>Join thousands of creators</div>
            </motion.div>
        </section>
    )
}

export default Hero
