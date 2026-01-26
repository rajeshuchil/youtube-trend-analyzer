import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { Globe2, Zap, TrendingUp, Clock } from "lucide-react";

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  number: number;
  suffix: string;
  label: string;
  sublabel: string;
}

function Stats() {
  const stats: StatItem[] = [
    {
      icon: Globe2,
      number: 8,
      suffix: "",
      label: "Countries",
      sublabel: "Regional coverage",
    },
    {
      icon: Zap,
      number: 1,
      suffix: "hr",
      label: "Cache",
      sublabel: "Fresh data updates",
    },
    {
      icon: TrendingUp,
      number: 50,
      suffix: "+",
      label: "Videos",
      sublabel: "Per trending query",
    },
    {
      icon: Clock,
      number: 24,
      suffix: "/7",
      label: "Access",
      sublabel: "Always available",
    },
  ];

  return (
    <section className="relative py-24 bg-white">
      <div className="container mx-auto px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-emerald-600 font-semibold mb-2 uppercase tracking-wide text-sm">
            Powerful data at your fingertips
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Real features, real data
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  stat: StatItem;
  index: number;
}

function StatCard({ stat, index }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated && numberRef.current) {
      setHasAnimated(true);

      // Skip animation for Cache stat (index 1) - show immediately
      if (index === 1) {
        if (numberRef.current) {
          numberRef.current.textContent = stat.number.toString();
        }
        return;
      }

      // GSAP counter animation for other stats
      const target = { value: 0 };

      gsap.to(target, {
        value: stat.number,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          if (numberRef.current) {
            // Round to integer for clean display
            const currentValue = Math.round(target.value);
            numberRef.current.textContent = currentValue.toString();
          }
        },
      });
    }
  }, [isInView, hasAnimated, stat.number, index]);

  const Icon = stat.icon;

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-white rounded-2xl p-8 text-center border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-50/0 to-blue-50/0 group-hover:from-emerald-50/50 group-hover:to-blue-50/30 transition-all duration-300 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-emerald-100 to-blue-100 group-hover:from-emerald-200 group-hover:to-blue-200 transition-all duration-300">
          <Icon className="w-7 h-7 text-emerald-700 group-hover:text-emerald-800 transition-colors duration-300" />
        </div>

        {/* Number with counter animation */}
        <div className="mb-3">
          <span
            ref={numberRef}
            className="text-5xl md:text-6xl font-bold text-gray-900 tabular-nums"
          >
            0
          </span>
          {/* Suffix appears immediately (not animated) */}
          {stat.suffix && (
            <motion.span
              className="text-3xl md:text-4xl font-bold text-gray-700 ml-1"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.2 }}
            >
              {stat.suffix}
            </motion.span>
          )}
        </div>

        {/* Label */}
        <div className="text-lg font-semibold text-gray-800 mb-1">
          {stat.label}
        </div>

        {/* Sublabel */}
        <div className="text-sm text-gray-500">{stat.sublabel}</div>
      </div>

      {/* Hover shadow effect */}
      <div className="absolute inset-0 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

export default Stats;
