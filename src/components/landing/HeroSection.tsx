"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  animate,
  type Variants,
} from "motion/react";
import {
  ArrowRight,
  Sparkles,
  Users,
  Award,
  ShieldCheck,
  Clock,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  sceneSlot?: ReactNode;
  children?: ReactNode;
  onExplorePlans?: () => void;
  onLearnMore?: () => void;
  className?: string;
}

// Kinetic word animation variant
const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: 0.15 + i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Animated counter component for stats
interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({
  to,
  prefix = "",
  suffix = "",
  duration = 2.2,
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setValue(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, to, duration]);

  return (
    <span ref={ref} className="font-price font-bold tabular-nums">
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const statsData = [
  {
    icon: Users,
    value: 10000,
    prefix: "",
    suffix: "+",
    label: "Members",
    color: "#00f0ff",
  },
  {
    icon: Award,
    value: 50,
    prefix: "",
    suffix: "+",
    label: "Expert Trainers",
    color: "#ff006e",
  },
  {
    icon: ShieldCheck,
    value: 98,
    prefix: "",
    suffix: "%",
    label: "Satisfaction Rate",
    color: "#ffd700",
  },
  {
    icon: Clock,
    value: 24,
    prefix: "",
    suffix: "/7",
    label: "Support",
    color: "#00f0ff",
  },
];

export default function HeroSection({
  sceneSlot,
  children,
  onExplorePlans,
  onLearnMore,
  className,
}: HeroSectionProps) {
  const headlinePart1 = "Transform Your Body.";
  const headlinePart2 = "Elevate Your Life.";

  return (
    <section
      className={cn(
        "relative min-h-screen flex flex-col justify-between pt-28 pb-12 sm:pt-36 sm:pb-16 overflow-hidden bg-[#0a0a0f]",
        className
      )}
    >
      {/* 3D Scene Background Slot / Ambient Lighting Container */}
      <div
        id="hero-3d-container"
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        {/* Render injected 3D canvas if provided */}
        {sceneSlot || children}

        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-[550px] h-[450px] bg-[#ff006e]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#ffd700]/5 rounded-full blur-[160px] pointer-events-none" />

        {/* Subtle grid mesh overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_60%,transparent_100%)] pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center items-center text-center">
        {/* Top Badge: India's Most Advanced Fitness Platform */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 sm:mb-8"
        >
          <div className="relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1a1a2e]/70 backdrop-blur-xl border border-[rgba(0,240,255,0.3)] shadow-[0_0_20px_rgba(0,240,255,0.15)] group hover:border-[rgba(0,240,255,0.6)] transition-all duration-300">
            {/* Pulsing indicator */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]" />
            </span>

            <span className="text-xs sm:text-sm font-medium tracking-wide text-[#f0f0f5]">
              ⚡ India&apos;s Most Advanced Fitness Platform
            </span>

            <Sparkles className="w-3.5 h-3.5 text-[#ffd700] animate-pulse" />
          </div>
        </motion.div>

        {/* Kinetic Animated Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.08] mb-6 sm:mb-8">
          <span className="inline-block">
            {headlinePart1.split(" ").map((word, i) => (
              <motion.span
                key={`h1-${word}-${i}`}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-[0.3em] text-[#f0f0f5] drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <br className="hidden sm:inline" />
          <span className="inline-block mt-1 sm:mt-2">
            {headlinePart2.split(" ").map((word, i) => (
              <motion.span
                key={`h2-${word}-${i}`}
                custom={i + 3}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-[0.3em] bg-gradient-to-r from-[#00f0ff] via-[#d946ef] to-[#ff006e] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,240,255,0.35)]"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subheadline with staggered fade-in */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#8888a0] text-base sm:text-xl md:text-2xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal"
        >
          Premium fitness subscriptions with flexible plans, smart billing, and a
          training experience designed for champions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA: Explore Plans (gradient cyan→magenta) */}
          {onExplorePlans ? (
            <button
              onClick={onExplorePlans}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-[#0a0a0f] bg-gradient-to-r from-[#00f0ff] via-[#00d0ff] to-[#ff006e] shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_45px_rgba(255,0,110,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Explore Plans</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          ) : (
            <Link
              href="/#plans"
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-[#0a0a0f] bg-gradient-to-r from-[#00f0ff] via-[#00d0ff] to-[#ff006e] shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_45px_rgba(255,0,110,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Explore Plans</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}

          {/* Secondary CTA: Learn More (Ghost/Outline) */}
          {onLearnMore ? (
            <button
              onClick={onLearnMore}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-medium text-[#f0f0f5] bg-white/[0.03] backdrop-blur-md border border-[rgba(255,255,255,0.12)] hover:border-[#00f0ff]/60 hover:text-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-current opacity-80" />
              <span>Learn More</span>
            </button>
          ) : (
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-medium text-[#f0f0f5] bg-white/[0.03] backdrop-blur-md border border-[rgba(255,255,255,0.12)] hover:border-[#00f0ff]/60 hover:text-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-current opacity-80" />
              <span>Learn More</span>
            </Link>
          )}
        </motion.div>
      </div>

      {/* Bottom Stats Row with Motion Count-Up */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 sm:mt-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-5 rounded-2xl bg-[#1a1a2e]/50 backdrop-blur-2xl border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {statsData.map((stat, idx) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col sm:flex-row items-center sm:items-center gap-2.5 sm:gap-3.5 p-3 rounded-xl transition-colors duration-300 hover:bg-white/[0.02]",
                idx !== statsData.length - 1 &&
                  "sm:border-r sm:border-[rgba(255,255,255,0.06)]"
              )}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `${stat.color}15`,
                  boxShadow: `0 0 15px ${stat.color}20`,
                }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div className="text-center sm:text-left">
                <div className="text-lg sm:text-2xl font-heading font-bold text-[#f0f0f5] tracking-tight">
                  <AnimatedCounter
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-xs sm:text-sm text-[#8888a0] font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
