import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

// Premium easing curve
const premiumEase = [0.16, 1, 0.3, 1] as const;

function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect scroll for navbar height reduction
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Smooth background blur increase on scroll
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(12px)", "blur(16px)"],
  );

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-gray-700 transition-all duration-300 bg-gray-900/95"
      style={{
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        animate={{
          height: isScrolled ? "64px" : "80px",
        }}
        transition={{
          duration: 0.3,
          ease: premiumEase,
        }}
      >
        <div className="flex items-center justify-between h-full">
          {/* Left: Logo + Navigation */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-12">
            {/* Logo with subtle hover effect */}
            <motion.a
              href="/"
              className="flex items-center gap-2 text-white no-underline"
              whileHover={{ opacity: 0.85 }}
              transition={{ duration: 0.2 }}
            >
              <motion.img
                src="/images/trendscope-icon.svg"
                alt="TrendScope"
                className="w-8 h-8 sm:w-10 sm:h-10"
                animate={{
                  scale: isScrolled ? 0.9 : 1,
                }}
                transition={{ duration: 0.3, ease: premiumEase }}
              />
              <span className="text-white font-bold tracking-tight text-base sm:text-lg lg:text-2xl">
                TrendScope
              </span>
            </motion.a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <motion.a
                href="#features"
                className="text-gray-300 no-underline text-sm font-medium relative"
                whileHover={{ color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                Features
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-white origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: premiumEase }}
                />
              </motion.a>
              <motion.a
                href="#how-it-works"
                className="text-gray-300 no-underline text-sm font-medium relative"
                whileHover={{ color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                How It Works
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-white origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: premiumEase }}
                />
              </motion.a>
              <motion.a
                href="#use-cases"
                className="text-gray-300 no-underline text-sm font-medium relative"
                whileHover={{ color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                Use Cases
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-white origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: premiumEase }}
                />
              </motion.a>
            </nav>
          </div>

          {/* Right: CTA Button + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* CTA Button */}
            <motion.a
              href="/dashboard"
              className="relative px-3 py-1.5 sm:px-6 sm:py-2.5 bg-yellow-400 text-gray-900 font-semibold text-xs sm:text-sm rounded-full overflow-hidden"
              whileHover={{
                y: -2,
                boxShadow: "0 8px 25px -5px rgba(250, 204, 21, 0.5)",
                transition: { duration: 0.2, ease: premiumEase },
              }}
              whileTap={{
                scale: 0.97,
                transition: { duration: 0.1 },
              }}
              style={{
                boxShadow: "0 0 15px rgba(250, 204, 21, 0.3)",
              }}
            >
              <span className="relative z-10">Dashboard</span>
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: premiumEase }}
        className="lg:hidden overflow-hidden bg-gray-900"
      >
        <nav className="px-4 py-4 space-y-4">
          <a
            href="#features"
            className="block text-gray-300 hover:text-white text-base font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="block text-gray-300 hover:text-white text-base font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#use-cases"
            className="block text-gray-300 hover:text-white text-base font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Use Cases
          </a>
        </nav>
      </motion.div>
    </motion.header>
  );
}

export default Header;
