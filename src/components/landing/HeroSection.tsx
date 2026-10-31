"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, animate } from "motion/react";
import {
  ArrowRight,
  Shield,
  Zap,
  Sparkles,
  RotateCcw,
  Activity,
  Flame,
  Eye,
  Play,
  Layers,
  Dumbbell,
  CheckCircle2,
  Cpu,
  Target,
} from "lucide-react";
import HeroSceneWrapper from "@/components/three/HeroSceneWrapper";
import type { EquipmentType, StageMode } from "@/components/three/FloatingEquipment";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  onExplorePlans?: () => void;
  className?: string;
}

function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
}: {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, to, duration, from]);

  return (
    <span ref={ref} className="font-mono font-bold tabular-nums">
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

interface EquipmentTelemetry {
  name: string;
  category: string;
  loadCapacity: string;
  metallurgy: string;
  linearMechanism: string;
  primaryMuscle: string;
  secondaryMuscle: string;
  kineticVector: string;
  stimulusRating: string;
  exerciseSimulation: string;
  tierAccess: string;
  tierColor: string;
}

const equipmentSpecs: Record<EquipmentType, EquipmentTelemetry> = {
  power_rack: {
    name: "Commercial Olympic Power Cage",
    category: "Heavy Structural Resistance",
    loadCapacity: "1,000 KG Structural Test Rating",
    metallurgy: "11-Gauge 3\"x3\" Robot-Welded Steel",
    linearMechanism: "Laser-Numbered 1\" Westside Spacing & Pin-Pipes",
    primaryMuscle: "Quadriceps, Gluteus Maximus & Spinal Erectors",
    secondaryMuscle: "Hamstrings, Core Transverse Abdominis & Traps",
    kineticVector: "Bilateral Closed Kinetic Chain Axial Drive",
    stimulusRating: "10 / 10 Maximal Compound Motor Unit Recruitment",
    exerciseSimulation: "Olympic Back Squat & Overhead Lockout",
    tierAccess: "Athlete Pro & Executive Elite",
    tierColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  cable_crossover: {
    name: "Commercial Dual Pulley Functional Trainer",
    category: "Cable Mechanics & Constant Tension",
    loadCapacity: "Dual 100 KG Precision Weight Stacks (200kg Total)",
    metallurgy: "Aircraft-Grade 6mm Nylon Coated Steel Cables",
    linearMechanism: "36-Position Laser-Cut Swivel Pulley Column",
    primaryMuscle: "Pectoralis Major (Sternal & Clavicular Heads)",
    secondaryMuscle: "Anterior Deltoid & Serratus Anterior",
    kineticVector: "Variable Horizontal Convergent Tension Arc",
    stimulusRating: "9.8 / 10 Continuous Muscle Tension Curve",
    exerciseSimulation: "Standing Convergent Cable Chest Flye",
    tierAccess: "Athlete Pro & Executive Elite",
    tierColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  bench_press: {
    name: "Olympic Competition Flat Bench Station",
    category: "Free Weight Competition Floor",
    loadCapacity: "650 KG Total Weight Payload Standard",
    metallurgy: "Heavy Commercial Box Tubing & Diamond Spotter Deck",
    linearMechanism: "Dual-Tier Laser Chamfered Bar Hooks",
    primaryMuscle: "Pectoralis Major & Triceps Brachii",
    secondaryMuscle: "Anterior Deltoids & Scapular Retractors",
    kineticVector: "Horizontal Closed Kinetic Upper Body Press",
    stimulusRating: "9.7 / 10 Upper Body Hypertrophic Index",
    exerciseSimulation: "Powerlifting Competition Flat Barbell Press",
    tierAccess: "All Tiers (Foundation, Pro, Elite)",
    tierColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  leg_press: {
    name: "45° Linear Incline Plate-Loaded Leg Press",
    category: "Isolated Lower Extremity Hypertrophy",
    loadCapacity: "800 KG Sled Load Limit (Quad Horns)",
    metallurgy: "Solid 40mm Hard-Chrome Linear Shafts",
    linearMechanism: "Industrial Sealed Linear Recirculating Ball Bearings",
    primaryMuscle: "Vastus Lateralis, Rectus Femoris & Gluteus",
    secondaryMuscle: "Adductor Magnus & Soleus / Gastrocnemius",
    kineticVector: "45-Degree Fixed Guide Plane (-100% Lumbar Shear)",
    stimulusRating: "9.9 / 10 Isolated Quad Mechanical Tension",
    exerciseSimulation: "Heavy 45° Linear Sled Leg Press",
    tierAccess: "Athlete Pro & Executive Elite",
    tierColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  dumbbell_rack: {
    name: "Commercial 2-Tier Heavy Dumbbell Matrix",
    category: "Unilateral Free Weights Complex",
    loadCapacity: "10 KG to 40 KG Polyurethane Graduated Pairs",
    metallurgy: "316 Stainless Steel Volcano Diamond Knurl",
    linearMechanism: "High-Impact Acoustic Shock-Absorbing Saddles",
    primaryMuscle: "Multi-Plane Unilateral Joint Stabilizers",
    secondaryMuscle: "Wrist Flexors, Rotator Cuff & Forearms",
    kineticVector: "Tri-Planar Free Range of Motion Joint Articulation",
    stimulusRating: "9.6 / 10 Neuromuscular Joint Stability",
    exerciseSimulation: "Synchronized Dumbbell Incline Press & Curls",
    tierAccess: "All Tiers (Foundation, Pro, Elite)",
    tierColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
};

export default function HeroSection({
  onExplorePlans,
  className,
}: HeroSectionProps) {
  const [activeEquipment, setActiveEquipment] = useState<EquipmentType>("power_rack");
  const [stageMode, setStageMode] = useState<StageMode>("orbit");

  const currentSpec = equipmentSpecs[activeEquipment];

  return (
    <section
      id="biomechanics"
      className={cn(
        "relative min-h-screen flex flex-col justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 overflow-hidden bg-zinc-950 text-zinc-100 border-b border-zinc-900",
        className
      )}
    >
      {/* Main Dual-Column Hero Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center my-auto py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Editorial Architecture & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-medium">PREMIUM ATHLETIC CLUB & CONDITIONING SUITE</span>
            </motion.div>

            {/* Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-zinc-100 leading-[1.08]">
                <span>WORLD-CLASS TRAINING.</span>
                <br />
                <span className="text-emerald-400">UNCOMPROMISING RESULTS.</span>
              </h1>
            </motion.div>

            {/* Sub-headline description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed font-sans"
            >
              Step into India&apos;s premier performance training floor. Inspect our commercial Olympic power cages, dual-pulley functional trainers, and 45° incline leg presses in interactive 3D, and configure your plan with flexible 50% milestone installments.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                href="/#plans"
                onClick={onExplorePlans}
                className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono font-bold text-xs transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98]"
              >
                <span>CHOOSE YOUR MEMBERSHIP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#nutrition-lab"
                className="py-3 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 font-mono font-medium text-xs transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                <Flame className="w-4 h-4 text-emerald-400" />
                <span>NUTRITION LAB</span>
              </Link>
            </motion.div>

            {/* Live Athlete Trust Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800/80 max-w-lg"
            >
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Commercial Stations</span>
                <span className="text-xl font-heading font-bold text-zinc-100 font-mono">
                  120+ Machines
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Member Retention</span>
                <span className="text-xl font-heading font-bold text-emerald-400 font-mono">
                  <AnimatedCounter to={98} suffix=".4%" />
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Facility Access</span>
                <span className="text-xl font-heading font-bold text-zinc-100 font-mono">
                  24/7/365
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: The Interactive 3D Commercial Apparatus Studio */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Viewport Frame */}
            <div className="relative rounded-3xl bg-zinc-900/60 border border-zinc-800/90 p-4 sm:p-5 shadow-2xl backdrop-blur-xl overflow-hidden space-y-3">
              
              {/* Header inside 3D Pedestal */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-wider text-zinc-200">
                    3D APPARATUS INSPECTOR
                  </span>
                </div>
                
                {/* Stage Mode Tabs (Orbit / Kinetic / X-Ray) */}
                <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 p-0.5 rounded-lg text-[10px] font-mono">
                  {[
                    { id: "orbit", label: "360° View", icon: RotateCcw },
                    { id: "kinetic", label: "Lift Motion", icon: Play },
                    { id: "xray", label: "X-Ray Specs", icon: Layers },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setStageMode(mode.id as StageMode)}
                      className={cn(
                        "px-2 py-1 rounded-md transition-colors flex items-center gap-1",
                        stageMode === mode.id
                          ? "bg-zinc-800 text-emerald-400 font-bold border border-zinc-700 shadow-sm"
                          : "text-zinc-400 hover:text-zinc-200"
                      )}
                    >
                      <mode.icon className="w-2.5 h-2.5" />
                      <span>{mode.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3D Canvas Viewport */}
              <div className="relative h-[320px] sm:h-[360px] w-full rounded-2xl bg-zinc-950/90 border border-zinc-900 overflow-hidden">
                <HeroSceneWrapper
                  activeEquipment={activeEquipment}
                  stageMode={stageMode}
                  className="w-full h-full"
                />

                {/* Status Overlays */}
                <div className="absolute top-3 left-3 text-[10px] font-mono text-zinc-400 pointer-events-none flex items-center gap-1.5 bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-800">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span>MODE: {stageMode.toUpperCase()}</span>
                </div>

                <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 pointer-events-none bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-800">
                  {currentSpec.exerciseSimulation}
                </div>

                <div className="absolute bottom-3 left-3 text-[10px] font-mono text-zinc-400 pointer-events-none">
                  DRAG TO ROTATE 360° • CLICK TABS FOR SPECS
                </div>
              </div>

              {/* Commercial Apparatus Selector Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    Select Commercial Apparatus:
                  </span>
                  <div className="relative">
                    <select
                      value={activeEquipment}
                      onChange={(e) => setActiveEquipment(e.target.value as EquipmentType)}
                      className="appearance-none bg-zinc-900/90 text-emerald-400 border border-zinc-700/80 rounded-lg py-1.5 pl-3 pr-8 text-xs font-mono font-medium focus:outline-none focus:border-emerald-500 cursor-pointer shadow-inner"
                    >
                      <option value="power_rack">01 // Olympic Power Cage & Squat Station</option>
                      <option value="cable_crossover">02 // Dual-Pulley Cable Functional Trainer</option>
                      <option value="bench_press">03 // Olympic Competition Flat Bench Station</option>
                      <option value="leg_press">04 // 45° Linear Incline Leg Press Machine</option>
                      <option value="dumbbell_rack">05 // Commercial 2-Tier Dumbbell Saddle Matrix</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-emerald-400 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Quick Selector Pills for 5 Machines */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {([
                    { id: "power_rack", label: "Power Cage" },
                    { id: "cable_crossover", label: "Cable Machine" },
                    { id: "bench_press", label: "Olympic Bench" },
                    { id: "leg_press", label: "45° Leg Press" },
                    { id: "dumbbell_rack", label: "Dumbbell Rack" },
                  ] as { id: EquipmentType; label: string }[]).map(({ id, label }, idx) => {
                    const isSelected = activeEquipment === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setActiveEquipment(id)}
                        className={cn(
                          "py-2 px-1.5 rounded-lg text-[10px] font-mono font-medium transition-all duration-200 text-center border truncate",
                          isSelected
                            ? "bg-zinc-800 border-emerald-500/90 text-emerald-400 font-bold shadow-sm"
                            : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                        )}
                      >
                        {String(idx + 1).padStart(2, "0")}. {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Engineering & Biomechanics Telemetry Box */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono space-y-2.5">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                  <div className="flex items-center gap-1.5 text-zinc-200 font-semibold">
                    <Target className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{currentSpec.name}</span>
                  </div>
                  <span className={cn("text-[10px] font-mono font-semibold px-2 py-0.5 rounded border", currentSpec.tierColor)}>
                    {currentSpec.tierAccess}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-0.5">
                  <div>
                    <span className="text-zinc-400 block text-[10px]">LOAD CAPACITY:</span>
                    <span className="text-emerald-400 font-semibold">{currentSpec.loadCapacity}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">FRAME & BUILD:</span>
                    <span className="text-zinc-300">{currentSpec.metallurgy}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">PRIMARY MUSCLES:</span>
                    <span className="text-zinc-200 font-medium">{currentSpec.primaryMuscle}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">MOVEMENT PATTERN:</span>
                    <span className="text-zinc-300">{currentSpec.kineticVector}</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
