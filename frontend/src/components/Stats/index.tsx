import { motion } from 'framer-motion'
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
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
        <section className={`${styles.stats} section-light`}>
            <div className="container">
                <motion.div
                    className={styles['stats-header']}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className={styles['stats-subtitle']}>Powerful data at your fingertips</p>
                    <h2 className={styles['stats-title']}>Real features, real data</h2>
                </motion.div>

                <motion.div
                    className={styles['stats-grid']}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className={`${styles['stat-card']} card`}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className={styles['stat-icon']}>{stat.icon}</div>
                            <div className={styles['stat-number']}>
                                {stat.number}
                                <span className={styles['stat-suffix']}>{stat.suffix}</span>
                            </div>
                            <div className={styles['stat-label']}>{stat.label}</div>
                            <div className={styles['stat-sublabel']}>{stat.sublabel}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Stats
