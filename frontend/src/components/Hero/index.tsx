import { motion } from "framer-motion";

const floatLeft = {
  y: [0, -20, 0],
  rotate: [0, -3, 0],
};

const floatRight = {
  y: [0, -15, 0],
  rotate: [0, 2, 0],
};

function Hero() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Section - Light Mint Green Background with Confetti Pattern */}
      <section className="relative flex-1 flex items-center justify-center py-16 px-8 min-h-[65vh] overflow-hidden">
        {/* Background Image - Confetti Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/images/download (1).jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8E6C9]/70 via-[#A5D6A7]/60 to-[#81C784]/50" />

        {/* Left Floating Image */}
        <motion.img
          src="/images/Screenshot from 2026-01-25 03-19-52.png"
          alt="YouTube Analytics"
          className="absolute left-4 top-1/4 w-[28rem] h-auto rounded-xl shadow-2xl hidden lg:block z-10"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, ...floatLeft }}
          transition={{
            opacity: { duration: 0.8 },
            x: { duration: 0.8 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Right Floating Image */}
        <motion.img
          src="/images/Screenshot from 2026-01-25 03-29-00.png"
          alt="Trending Videos"
          className="absolute right-4 top-1/3 w-96 h-auto rounded-xl shadow-2xl hidden lg:block z-10"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0, ...floatRight }}
          transition={{
            opacity: { duration: 0.8, delay: 0.2 },
            x: { duration: 0.8, delay: 0.2 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            rotate: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            },
          }}
        />

        {/* Floating Decorative Elements */}
        <motion.span
          className="absolute left-1/4 top-20 h-4 w-4 rounded-full bg-yellow-400 opacity-70"
          animate={{ y: [-10, 10, -10], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute right-1/4 top-32 h-3 w-3 rounded-full bg-blue-400 opacity-60"
          animate={{ y: [-8, 12, -8], opacity: [0.4, 0.7, 0.4] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.span
          className="absolute left-1/3 bottom-32 h-5 w-5 rounded-full bg-orange-400 opacity-50"
          animate={{ y: [-12, 8, -12], opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <div className="container mx-auto max-w-6xl relative z-20">
          <div className="flex items-center justify-center">
            {/* Center: Text Content */}
            <motion.div
              className="text-center max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
                Discover What's{" "}
                <span className="inline-block bg-yellow-300 px-4 py-2 rounded-lg">
                  Trending
                </span>
                <br />
                on YouTube{" "}
                <span className="inline-block bg-orange-400 px-4 py-2 rounded-lg text-white">
                  Right Now
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8">
                Track viral videos across{" "}
                <span className="font-semibold text-blue-600">regions</span> and{" "}
                <span className="font-semibold text-purple-600">
                  categories
                </span>
                <br />
                Get real-time insights to stay ahead of the curve
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="#features"
                  className="px-8 py-4 bg-yellow-300 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-yellow-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Features
                </motion.a>
                <motion.a
                  href="/dashboard"
                  className="px-8 py-4 bg-orange-400 text-white font-semibold rounded-full shadow-lg hover:bg-orange-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Trends Now
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Section - White Background with Logo */}
    </div>
  );
}

export default Hero;
