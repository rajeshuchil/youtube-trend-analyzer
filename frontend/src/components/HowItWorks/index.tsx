import { motion } from 'framer-motion'

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
        <section id="how-it-works" className="py-24 bg-white">
            <div className="container mx-auto px-8 max-w-7xl">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        How it works
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get started in three simple steps and start creating trending content today
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            className="text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="relative mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                                    {step.number}
                                </div>
                                <div className="rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
