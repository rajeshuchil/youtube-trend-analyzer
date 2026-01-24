import { motion } from 'framer-motion'

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
        <section id="use-cases" className="py-24 bg-gray-50">
            <div className="container mx-auto px-8 max-w-7xl">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Built for creators and marketers
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Whether you're a solo creator or part of a marketing team, we've got you covered
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {useCases.map((useCase, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="h-64 overflow-hidden">
                                <img
                                    src={useCase.image}
                                    alt={useCase.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    {useCase.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {useCase.description}
                                </p>
                                <ul className="space-y-3">
                                    {useCase.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">
                                                ✓
                                            </span>
                                            <span className="text-gray-700">
                                                {benefit}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default UseCases
