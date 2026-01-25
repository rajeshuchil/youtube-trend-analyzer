import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Particles from "../Particles";

// Premium easing curve used by Stripe and Linear
const premiumEase = [0.16, 1, 0.3, 1] as const;

// Page load animation orchestration - elements animate in sequence
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Sequential reveal with minimal delay
      delayChildren: 0.2,
    },
  },
};

// Masked text reveal - creates expensive fade-up blur effect
const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: premiumEase,
    },
  },
};

// Highlight background - animates before text for layered effect
const highlightBgVariants: Variants = {
  hidden: {
    scaleX: 0,
    transformOrigin: "left",
  },
  visible: {
    scaleX: 1.01, // Subtle 1% overshoot for polish
    transition: {
      duration: 0.7,
      ease: premiumEase,
    },
  },
};

// Highlight text - reveals after background with slight delay
const highlightTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.15, // Text follows background animation
      ease: premiumEase,
    },
  },
};

// Subheading - calmer entrance after headline
const subheadingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

// CTA button group - staged reveal
const ctaContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const ctaButtonVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

// Illustration fade-in with slight movement
const illustrationVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: premiumEase,
    },
  },
};

// Subtle ambient orb movement - minimal and calming
const ambientOrbVariants: Variants = {
  animate: {
    y: [-8, 8, -8],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

function Hero() {
  const { scrollY } = useScroll();

  // Parallax effect on illustrations - very subtle depth
  const leftImageY = useTransform(scrollY, [0, 500], [0, -50]);
  const rightImageY = useTransform(scrollY, [0, 500], [0, -30]);

  console.log("Hero component is rendering"); // Debug log

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center py-16 px-8 min-h-[65vh] overflow-hidden bg-gradient-to-br from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7]">
        {/* WebGL Particle Background */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleCount={600}
            particleSpread={10}
            speed={0.2}
            particleColors={[
              "#2E7D32",
              "#43A047",
              "#66BB6A",
              "#FFD700",
              "#FFA000",
              "#FF6F00",
            ]}
            moveParticlesOnHover={true}
            particleHoverFactor={1.5}
            alphaParticles={false}
            particleBaseSize={200}
            sizeRandomness={2}
            cameraDistance={12}
            disableRotation={false}
            pixelRatio={Math.min(window.devicePixelRatio, 2)}
            className="opacity-90"
          />
        </div>

        {/* Subtle gradient overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8E6C9]/20 via-transparent to-[#81C784]/15 z-[1]" />

        {/* Left Floating Illustration - top left position */}
        <motion.img
          src="/images/Screenshot from 2026-01-25 03-19-52.png"
          alt="YouTube Analytics"
          className="absolute left-20 top-24 w-80 h-auto rounded-2xl shadow-2xl hidden lg:block z-10 transform -rotate-3"
          style={{ y: leftImageY }}
          variants={illustrationVariants}
          initial="hidden"
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0],
          }}
          transition={{
            opacity: { duration: 1, ease: premiumEase, delay: 0.6 },
            scale: { duration: 1, ease: premiumEase, delay: 0.6 },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
        />

        {/* Right Floating Illustration - bottom right position */}
        <motion.img
          src="/images/Screenshot from 2026-01-25 03-29-00.png"
          alt="Trending Videos"
          className="absolute right-12 bottom-24 w-96 h-auto rounded-2xl shadow-2xl hidden lg:block z-10 transform rotate-2"
          style={{ y: rightImageY }}
          variants={illustrationVariants}
          initial="hidden"
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 1, ease: premiumEase, delay: 0.8 },
            scale: { duration: 1, ease: premiumEase, delay: 0.8 },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
          }}
        />

        {/* Ambient decorative orbs - very subtle presence */}
        <motion.span
          className="absolute left-1/4 top-20 h-3 w-3 rounded-full bg-yellow-400/40 blur-[2px] z-[2]"
          variants={ambientOrbVariants}
          animate="animate"
        />
        <motion.span
          className="absolute right-1/4 top-32 h-2 w-2 rounded-full bg-blue-400/30 blur-[2px] z-[2]"
          variants={ambientOrbVariants}
          animate="animate"
          transition={{
            delay: 2,
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.span
          className="absolute left-1/3 bottom-32 h-3 w-3 rounded-full bg-orange-400/35 blur-[2px] z-[2]"
          variants={ambientOrbVariants}
          animate="animate"
          transition={{
            delay: 1,
            duration: 8.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto max-w-6xl relative z-20">
          <motion.div
            className="flex items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Hero Content */}
            <div className="text-center max-w-3xl">
              {/* Headline with masked text reveal */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
                <motion.span
                  className="inline-block"
                  variants={textRevealVariants}
                >
                  Discover What's{" "}
                </motion.span>

                {/* Animated highlight - "Trending" */}
                <span className="relative inline-block">
                  <motion.span
                    className="absolute inset-0 bg-yellow-300 rounded-lg -m-1 px-4 py-2"
                    variants={highlightBgVariants}
                  />
                  <motion.span
                    className="relative inline-block px-4 py-2"
                    variants={highlightTextVariants}
                  >
                    Trending
                  </motion.span>
                </span>

                <br />

                <motion.span
                  className="inline-block"
                  variants={textRevealVariants}
                >
                  on YouTube{" "}
                </motion.span>

                {/* Animated highlight - "Right Now" */}
                <span className="relative inline-block">
                  <motion.span
                    className="absolute inset-0 bg-orange-400 rounded-lg -m-1 px-4 py-2"
                    variants={highlightBgVariants}
                  />
                  <motion.span
                    className="relative inline-block px-4 py-2 text-white"
                    variants={highlightTextVariants}
                  >
                    Right Now
                  </motion.span>
                </span>
              </h1>

              {/* Subheading */}
              <motion.p
                className="text-xl md:text-2xl text-gray-700 mb-8"
                variants={subheadingVariants}
              >
                Track viral videos across{" "}
                <span className="font-semibold text-blue-600">regions</span> and{" "}
                <span className="font-semibold text-purple-600">
                  categories
                </span>
                <br />
                Get real-time insights to stay ahead of the curve
              </motion.p>

              {/* CTA Buttons with micro-interactions */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                variants={ctaContainerVariants}
              >
                <motion.a
                  href="#features"
                  className="px-8 py-4 bg-yellow-300 text-gray-900 font-semibold rounded-full shadow-lg"
                  variants={ctaButtonVariants}
                  whileHover={{
                    y: -3,
                    boxShadow: "0 10px 30px -5px rgba(234, 179, 8, 0.4)",
                    transition: { duration: 0.2, ease: premiumEase },
                  }}
                  whileTap={{
                    scale: 0.97,
                    transition: { duration: 0.1 },
                  }}
                >
                  Explore Features
                </motion.a>
                <motion.a
                  href="/dashboard"
                  className="px-8 py-4 bg-orange-400 text-white font-semibold rounded-full shadow-lg"
                  variants={ctaButtonVariants}
                  whileHover={{
                    y: -3,
                    boxShadow: "0 10px 30px -5px rgba(251, 146, 60, 0.4)",
                    transition: { duration: 0.2, ease: premiumEase },
                  }}
                  whileTap={{
                    scale: 0.97,
                    transition: { duration: 0.1 },
                  }}
                >
                  View Trends Now
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
