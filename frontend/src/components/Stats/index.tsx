import { motion } from 'framer-motion'

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
        <section className="relative py-24 bg-white z-10">
            <div className="container mx-auto px-8 max-w-7xl">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-indigo-600 font-semibold mb-2 uppercase tracking-wide text-sm">
                        Powerful data at your fingertips
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Real features, real data
                    </h2>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100"
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className="text-5xl mb-4">{stat.icon}</div>
                            <div className="text-5xl font-bold text-gray-900 mb-2">
                                {stat.number}
                                <span className="text-3xl text-indigo-600">{stat.suffix}</span>
                            </div>
                            <div className="text-lg font-semibold text-gray-700 mb-1 capitalize">
                                {stat.label}
                            </div>
                            <div className="text-sm text-gray-500">
                                {stat.sublabel}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Stats
