"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  animate,
  type Variants,
} from "motion/react";
import {
  TrendingUp,
  Users,
  Dumbbell,
  Star,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  id: string;
  icon: LucideIcon;
  targetNumber: number;
  decimals?: number;
  prefix: string;
  suffix: string;
  label: string;
  sublabel: string;
  accentColor: string;
}

const stats: StatItem[] = [
  {
    id: "revenue",
    icon: TrendingUp,
    targetNumber: 50,
    prefix: "₹",
    suffix: "L+",
    label: "Revenue Generated",
    sublabel: "Trusted by fitness enthusiasts across India",
    accentColor: "#00f0ff",
  },
  {
    id: "members",
    icon: Users,
    targetNumber: 10,
    prefix: "",
    suffix: "K+",
    label: "Active Members",
    sublabel: "Growing fitness community nationwide",
    accentColor: "#ff006e",
  },
  {
    id: "programs",
    icon: Dumbbell,
    targetNumber: 150,
    prefix: "",
    suffix: "+",
    label: "Training Programs",
    sublabel: "HIIT, Powerlifting, Yoga & Recovery",
    accentColor: "#00f0ff",
  },
  {
    id: "rating",
    icon: Star,
    targetNumber: 4.9,
    decimals: 1,
    prefix: "",
    suffix: "★",
    label: "App Rating",
    sublabel: "From 12,000+ verified app reviews",
    accentColor: "#ffd700",
  },
];

interface AnimatedNumberProps {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function AnimatedNumber({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2.2,
}: AnimatedNumberProps) {
  const [val, setVal] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setVal(latest);
      },
    });

    return () => controls.stop();
  }, [isInView, to, duration]);

  const formatted =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.floor(val).toLocaleString("en-IN");

  return (
    <span ref={ref} className="tabular-nums font-price tracking-tight">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface StatsCounterProps {
  className?: string;
}

export default function StatsCounter({ className }: StatsCounterProps) {
  return (
    <section
      className={cn(
        "relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] overflow-hidden",
        className
      )}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Responsive: 2x2 grid on mobile, 4 columns on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.25 },
                }}
                className={cn(
                  "relative group rounded-2xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300",
                  // Glassmorphism card style with gradient border effect
                  "bg-[#1a1a2e]/60 backdrop-blur-xl border border-[rgba(255,255,255,0.08)]",
                  "hover:border-[rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
                )}
              >
                {/* Subtle internal gradient glow */}
                <div
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                  style={{ background: stat.accentColor }}
                />

                {/* Top: Icon */}
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div
                    className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${stat.accentColor}15`,
                      border: `1px solid ${stat.accentColor}30`,
                      boxShadow: `0 0 15px ${stat.accentColor}18`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{ color: stat.accentColor }}
                    />
                  </div>

                  {/* Micro indicator badge */}
                  <span
                    className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ background: stat.accentColor }}
                  />
                </div>

                {/* Middle: Big Animated Number */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#f0f0f5] mb-2 sm:mb-3">
                  <AnimatedNumber
                    to={stat.targetNumber}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>

                {/* Bottom: Label & Description */}
                <div>
                  <div className="text-sm sm:text-base font-semibold text-[#f0f0f5] mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-[#8888a0] line-clamp-2 leading-relaxed">
                    {stat.sublabel}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
