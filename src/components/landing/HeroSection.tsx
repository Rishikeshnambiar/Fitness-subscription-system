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
  RotateCcw,
  CheckCircle2,
  Activity,
  Layers,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import HeroSceneWrapper from "@/components/three/HeroSceneWrapper";
import type { EquipmentType } from "@/components/three/FloatingEquipment";

interface HeroSectionProps {
  onExplorePlans?: () => void;
  className?: string;
}

// Kinetic word animation variant
const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: "blur(6px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      delay: 0.1 + i * 0.08,
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
  duration = 2.0,
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
    <span ref={ref} className="font-mono font-bold tabular-nums">
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const equipmentSpecs: Record<EquipmentType, { name: string; weight: string; metallurgy: string; knurl: string; tolerance: string }> = {
  dumbbell: {
    name: "Olympic Hex Dumbbell",
    weight: "24.0 KG (Calibrated)",
    metallurgy: "316 Stainless Steel & Urethane",
    knurl: "1.2mm Volcano Diamond",
    tolerance: "±10g Competition Standard",
  },
  kettlebell: {
    name: "Competition Kettlebell",
    weight: "32.0 KG (Eleiko Spec)",
    metallurgy: "Cast Iron Sphere & Steel Horn",
    knurl: "Milled Raw Steel 35mm",
    tolerance: "±15g Olympic Standard",
  },
  plate: {
    name: "Calibrated Bumper Plate",
    weight: "20.0 KG (450mm IWF)",
    metallurgy: "Chrome Hub & Vulcanized Rubber",
    knurl: "50.4mm Center Bore",
    tolerance: "±5g Certified Accuracy",
  },
};

export default function HeroSection({
  onExplorePlans,
  className,
}: HeroSectionProps) {
  const [activeEquipment, setActiveEquipment] = useState<EquipmentType>("dumbbell");
  const headlinePart1 = "PRECISION TRAINING.";
  const headlinePart2 = "UNCOMPROMISING LIVING.";

  const currentSpec = equipmentSpecs[activeEquipment];

  return (
    <section
      className={cn(
        "relative min-h-screen flex flex-col justify-between pt-24 pb-12 sm:pt-28 sm:pb-16 overflow-hidden bg-zinc-950 text-zinc-100 border-b border-zinc-900",
        className
      )}
    >
      {/* Top Live Athletic Telemetry Strip */}
      <div className="w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-200 font-semibold">HYPERGYM PROTOCOL // 2026</span>
            <span className="text-zinc-600">|</span>
            <span className="hidden sm:inline">12 METRO CLUBS OPERATIONAL</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span className="hidden md:inline">CONTRAST THERAPY: 3°C / 90°C</span>
            <span className="text-zinc-600 hidden md:inline">|</span>
            <span>GSTIN: <span className="text-zinc-300">27AAWCA1536C1ZP</span></span>
            <span className="text-zinc-600">|</span>
            <span className="text-emerald-400 font-medium">SYSTEM HEALTH: 100%</span>
          </div>
        </div>
      </div>

      {/* Main Dual-Column Hero Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center my-auto py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Editorial Architecture & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Mission Pill */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>AGARKARMEDIA ATHLETIC DIVISION // ZERO LOCK-IN</span>
            </motion.div>

            {/* Kinetic Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight leading-[1.06] text-zinc-100">
              <span className="block">
                {headlinePart1.split(" ").map((word, i) => (
                  <motion.span
                    key={`h1-${word}-${i}`}
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block mt-1 sm:mt-2 text-emerald-400">
                {headlinePart2.split(" ").map((word, i) => (
                  <motion.span
                    key={`h2-${word}-${i}`}
                    custom={i + 2}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Subtitle with High-Value Product Messaging */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl"
            >
              India&apos;s luxury conditioning infrastructure. Engineered with flexible 50% milestone installment billing, immutable GST snapshot tax protection, and 24/7 keyless access across all metropolitan clubs.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="/#plans"
                className="py-3 px-6 rounded-xl text-xs font-semibold text-zinc-950 bg-emerald-500 hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-sm hover:scale-[1.02]"
              >
                <span>Select Membership Tier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#plans"
                className="py-3 px-5 rounded-xl text-xs font-medium text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 transition-all flex items-center gap-2"
              >
                <span>Unit Economics & ROI</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </Link>
            </motion.div>

            {/* Micro-Metrics Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-800/80 text-left"
            >
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Subscribers</span>
                <span className="text-xl font-heading font-bold text-zinc-100">
                  <AnimatedCounter to={10000} suffix="+" />
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Tier-3 Coaches</span>
                <span className="text-xl font-heading font-bold text-zinc-100">
                  <AnimatedCounter to={50} suffix="+" />
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Retention</span>
                <span className="text-xl font-heading font-bold text-emerald-400">
                  <AnimatedCounter to={98} suffix=".4%" />
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Access Hours</span>
                <span className="text-xl font-heading font-bold text-zinc-100 font-mono">
                  24/7/365
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: The Interactive 3D Showcase Pedestal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Viewport Frame */}
            <div className="relative rounded-3xl bg-zinc-900/60 border border-zinc-800/90 p-4 sm:p-5 shadow-2xl backdrop-blur-xl overflow-hidden">
              
              {/* Header inside 3D Pedestal */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono font-bold tracking-wider text-zinc-200">
                    3D HARDWARE TELEMETRY
                  </span>
                </div>
                <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 bg-zinc-800/80 px-2 py-0.5 rounded-md">
                  <RotateCcw className="w-3 h-3 text-emerald-400 animate-spin" style={{ animationDuration: "8s" }} />
                  <span>DRAG TO ROTATE 360°</span>
                </div>
              </div>

              {/* 3D Canvas Viewport */}
              <div className="relative h-[340px] sm:h-[400px] w-full rounded-2xl bg-zinc-950/80 border border-zinc-900 overflow-hidden my-3">
                <HeroSceneWrapper activeEquipment={activeEquipment} className="w-full h-full" />

                {/* Subtle Grid Crosshairs Overlay */}
                <div className="absolute top-3 left-3 text-[10px] font-mono text-zinc-400 pointer-events-none">
                  + LOC // 3D-STAGE
                </div>
                <div className="absolute bottom-3 left-3 text-[10px] font-mono text-emerald-400/80 pointer-events-none">
                  INTERACTIVE PBR SHADER ACTIVE
                </div>
              </div>

              {/* Interactive 3D Model Switcher Bar */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {(["dumbbell", "kettlebell", "plate"] as EquipmentType[]).map((type, idx) => {
                  const labels = {
                    dumbbell: "01 // DUMBBELL",
                    kettlebell: "02 // KETTLEBELL",
                    plate: "03 // BUMPER PLATE",
                  };
                  const isSelected = activeEquipment === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setActiveEquipment(type)}
                      className={cn(
                        "py-2 px-2.5 rounded-xl text-[10px] font-mono font-semibold transition-all duration-200 text-center border",
                        isSelected
                          ? "bg-zinc-800 border-emerald-500/80 text-emerald-400 shadow-sm"
                          : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                      )}
                    >
                      {labels[type]}
                    </button>
                  );
                })}
              </div>

              {/* Hardware Spec Telemetry Box */}
              <div className="mt-3.5 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-[11px] font-mono space-y-1.5">
                <div className="flex justify-between items-center text-zinc-300">
                  <span className="text-zinc-400">Spec:</span>
                  <span className="font-semibold text-zinc-100">{currentSpec.name}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Weight:</span>
                  <span className="text-emerald-400 font-bold">{currentSpec.weight}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Metallurgy:</span>
                  <span className="text-zinc-300">{currentSpec.metallurgy}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Calibration:</span>
                  <span className="text-zinc-300">{currentSpec.tolerance}</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
