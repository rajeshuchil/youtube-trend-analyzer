import { motion } from 'framer-motion'

function CTA() {
    return (
        <section className="py-24 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden z-10">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-600/10"></div>

            <div className="container mx-auto px-8 max-w-4xl relative z-10">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Ready to grow your{' '}
                        <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            YouTube channel
                        </span>
                        ?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Explore real-time YouTube trends and analytics with this interactive demo
                    </p>
                    <motion.a
                        href="/dashboard"
                        className="inline-block px-10 py-5 bg-yellow-400 text-gray-900 font-bold text-lg rounded-full transition-all hover:bg-yellow-300 hover:shadow-2xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Try Dashboard
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}

export default CTA
