function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16">
            <div className="container mx-auto px-8 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            YouTube Trend Analyzer
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Empowering creators with data-driven insights to grow their YouTube channels faster.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                                    How It Works
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#blog" className="text-gray-400 hover:text-white transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#careers" className="text-gray-400 hover:text-white transition-colors">
                                    Careers
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                aria-label="Twitter"
                                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-indigo-600 transition-colors"
                            >
                                𝕏
                            </a>
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-indigo-600 transition-colors"
                            >
                                in
                            </a>
                            <a
                                href="#"
                                aria-label="YouTube"
                                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                            >
                                ▶
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-gray-800 text-center text-gray-500">
                    <p>&copy; 2024 YouTube Trend Analyzer. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
