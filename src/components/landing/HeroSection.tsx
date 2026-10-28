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
    label: "Active Members",
    color: "#10b981",
  },
  {
    icon: Award,
    value: 50,
    prefix: "",
    suffix: "+",
    label: "Expert Coaches",
    color: "#10b981",
  },
  {
    icon: ShieldCheck,
    value: 98,
    prefix: "",
    suffix: "%",
    label: "Satisfaction Rate",
    color: "#10b981",
  },
  {
    icon: Clock,
    value: 24,
    prefix: "",
    suffix: "/7",
    label: "Metro Clubs Access",
    color: "#10b981",
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
        "relative min-h-screen flex flex-col justify-between pt-28 pb-12 sm:pt-36 sm:pb-16 overflow-hidden bg-[#09090b]",
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

        {/* Ambient atmospheric glow - refined single emerald accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Subtle grid mesh overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_60%,transparent_100%)] pointer-events-none" />
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
          <div className="relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 shadow-sm group hover:border-zinc-700 transition-all duration-300">
            {/* Pulsing indicator */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>

            <span className="text-xs font-medium tracking-wide text-zinc-300">
              India&apos;s Premier Athletic Subscription Architecture
            </span>
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
                className="inline-block mr-[0.3em] text-zinc-100 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <br className="hidden sm:inline" />
          <span className="inline-block mt-1 sm:mt-2 text-emerald-400">
            {headlinePart2.split(" ").map((word, i) => (
              <motion.span
                key={`h2-${word}-${i}`}
                custom={i + 3}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-[0.3em] drop-shadow-[0_2px_15px_rgba(16,185,129,0.2)]"
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
          className="text-zinc-400 text-sm sm:text-lg md:text-xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal"
        >
          High-performance fitness subscriptions with intelligent installment billing,
          guaranteed price-lock snapshots, and state-of-the-art training facilities.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          {/* Primary CTA: Explore Plans */}
          {onExplorePlans ? (
            <button
              onClick={onExplorePlans}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-zinc-950 bg-emerald-500 hover:bg-emerald-400 transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Memberships</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              href="/#plans"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-zinc-950 bg-emerald-500 hover:bg-emerald-400 transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Memberships</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {/* Secondary CTA: Learn More */}
          {onLearnMore ? (
            <button
              onClick={onLearnMore}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition-all duration-200"
            >
              <span>Our Facilities & Mission</span>
            </button>
          ) : (
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition-all duration-200"
            >
              <span>Our Facilities & Mission</span>
            </Link>
          )}
        </motion.div>
      </div>

      {/* Bottom Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 sm:mt-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 shadow-lg">
          {statsData.map((stat, idx) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col sm:flex-row items-center gap-3 p-3 rounded-xl transition-colors hover:bg-zinc-800/40",
                idx !== statsData.length - 1 && "sm:border-r sm:border-zinc-800/60"
              )}
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <stat.icon className="w-4 h-4" />
              </div>
              <div className="text-center sm:text-left">
                <div className="text-base sm:text-xl font-heading font-bold text-zinc-100 tracking-tight">
                  <AnimatedCounter
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-xs text-zinc-400 font-medium">
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
