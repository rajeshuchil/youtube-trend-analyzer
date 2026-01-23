import styles from './HowItWorks.module.css'

function HowItWorks() {
    const steps = [
        {
            number: 1,
            image: '/images/step_select_region.png',
            title: 'Select Your Region',
            description: 'Choose from 8+ countries to analyze trending videos in your target market.'
        },
        {
            number: 2,
            image: '/images/step_analyze_trends.png',
            title: 'Analyze Trends',
            description: 'View engagement scores, trending duration, and category insights in real-time.'
        },
        {
            number: 3,
            image: '/images/step_create_content.png',
            title: 'Create Better Content',
            description: 'Use AI-powered topic extraction to create content your audience will love.'
        }
    ]

    return (
        <section className={`${styles['how-it-works']} section-light`}>
            <div className="container">
                <div className={styles['how-header']}>
                    <h2 className={styles['how-title']}>How it works</h2>
                    <p className={styles['how-subtitle']}>
                        Get started in three simple steps and start creating trending content today
                    </p>
                </div>

                <div className={styles['steps-container']}>
                    {steps.map((step) => (
                        <div key={step.number} className={styles.step}>
                            <div className={styles['step-number']}>{step.number}</div>
                            <div className={styles['step-image']}>
                                <img src={step.image} alt={step.title} />
                            </div>
                            <h3 className={styles['step-title']}>{step.title}</h3>
                            <p className={styles['step-description']}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
