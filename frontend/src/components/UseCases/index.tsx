import styles from './UseCases.module.css'

function UseCases() {
    const useCases = [
        {
            image: '/images/usecase_content_creators.png',
            title: 'Content Creators',
            description: 'Discover what\'s trending in your niche and create videos that resonate with your audience.',
            benefits: [
                'Identify trending topics before they peak',
                'Analyze competitor performance',
                'Optimize video timing and categories'
            ]
        },
        {
            image: '/images/usecase_marketing_teams.png',
            title: 'Marketing Teams',
            description: 'Track brand mentions and trending topics to inform your content strategy and campaigns.',
            benefits: [
                'Monitor brand sentiment across regions',
                'Identify influencer opportunities',
                'Track campaign performance metrics'
            ]
        }
    ]

    return (
        <section className={`${styles['use-cases']} section-light`}>
            <div className="container">
                <div className={styles['use-cases-header']}>
                    <h2 className={styles['use-cases-title']}>Built for creators and marketers</h2>
                    <p className={styles['use-cases-subtitle']}>
                        Whether you're a solo creator or part of a marketing team, we've got you covered
                    </p>
                </div>

                <div className={styles['use-cases-grid']}>
                    {useCases.map((useCase, index) => (
                        <div key={index} className={`${styles['use-case-card']} card`}>
                            <div className={styles['use-case-image']}>
                                <img src={useCase.image} alt={useCase.title} />
                            </div>
                            <div className={styles['use-case-content']}>
                                <h3 className={styles['use-case-title']}>{useCase.title}</h3>
                                <p className={styles['use-case-description']}>{useCase.description}</p>
                                <ul className={styles['use-case-benefits']}>
                                    {useCase.benefits.map((benefit, i) => (
                                        <li key={i}>
                                            <span className={styles['benefit-icon']}>✓</span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default UseCases
