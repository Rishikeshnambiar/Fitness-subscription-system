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
  Volume2,
  Eye,
  Play,
  Layers,
  Dumbbell,
  CheckCircle2,
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
  weight: string;
  metallurgy: string;
  knurl: string;
  tolerance: string;
  primaryMuscle: string;
  secondaryMuscle: string;
  kineticVector: string;
  stimulusRating: string;
  liftExercise: string;
}

const equipmentSpecs: Record<EquipmentType, EquipmentTelemetry> = {
  dumbbell: {
    name: "Olympic Hex Dumbbell",
    weight: "24.0 KG (Calibrated)",
    metallurgy: "316 Stainless Steel & Urethane",
    knurl: "1.2mm Volcano Diamond",
    tolerance: "±10g Competition Standard",
    primaryMuscle: "Biceps Brachii & Anterior Deltoid",
    secondaryMuscle: "Brachialis & Core Stabilizers",
    kineticVector: "Unilateral Arc (180° Free ROM)",
    stimulusRating: "9.6 / 10 Hypertrophic Index",
    liftExercise: "Standing Strict Hammer Curl",
  },
  kettlebell: {
    name: "Competition Kettlebell",
    weight: "32.0 KG (Eleiko Spec)",
    metallurgy: "Cast Iron Sphere & Steel Horn",
    knurl: "Milled Raw Steel 35mm",
    tolerance: "±15g Olympic Standard",
    primaryMuscle: "Gluteus Maximus & Hamstrings",
    secondaryMuscle: "Latissimus Dorsi & Transverse Abdominis",
    kineticVector: "Ballistic Hip Hinge (Peak Power Arc)",
    stimulusRating: "9.8 / 10 Power Output",
    liftExercise: "Russian Explosive Swing",
  },
  plate: {
    name: "Calibrated Bumper Plate",
    weight: "20.0 KG (450mm IWF)",
    metallurgy: "Chrome Hub & Vulcanized Rubber",
    knurl: "50.4mm Center Bore",
    tolerance: "±5g Certified Accuracy",
    primaryMuscle: "Core Anti-Rotation & Grip Force",
    secondaryMuscle: "Rotator Cuff & Deltoids",
    kineticVector: "Radial Center-of-Mass Balance",
    stimulusRating: "9.2 / 10 Structural Tension",
    liftExercise: "Overhead Plate Ground-to-Lockout",
  },
  barbell: {
    name: "Olympic Competition Barbell",
    weight: "20.0 KG (2.2m Men's)",
    metallurgy: "Heat-Treated Chrome-Moly Alloy",
    knurl: "1.5mm Dual Olympic Knurl Marks",
    tolerance: "215,000 PSI Tensile Strength",
    primaryMuscle: "Pectoralis Major & Quadriceps",
    secondaryMuscle: "Triceps Brachii & Spinal Erectors",
    kineticVector: "Bilateral Closed Kinetic Chain",
    stimulusRating: "10 / 10 Compound Peak Tension",
    liftExercise: "Olympic Clean & Jerk / Front Squat",
  },
  trapbar: {
    name: "Hex Deadlift Trap Bar",
    weight: "30.0 KG (Commercial Hex)",
    metallurgy: "Heavy-Gauge Tubular Carbon Steel",
    knurl: "Dual Elevated Knurled Grips",
    tolerance: "700 KG Load Rating (±10g)",
    primaryMuscle: "Glutes, Quads & Trapezius",
    secondaryMuscle: "Lumbopelvic Hip Complex & Grip",
    kineticVector: "Neutral Spine Axial Drive (-28% shear)",
    stimulusRating: "9.9 / 10 Axial Force Loading",
    liftExercise: "Maximal Effort Hex Deadlift",
  },
  shaker: {
    name: "Titanium Athlete Shaker",
    weight: "750 ML / 340g Dry",
    metallurgy: "Grade 2 Titanium & BPA-Free Tritan",
    knurl: "Laser-Etched Grip Scale",
    tolerance: "Hermetic Vacuum Sealed (24h Cold)",
    primaryMuscle: "Cellular Anabolic Nutrient Delivery",
    secondaryMuscle: "Intra-Workout Hydration Replenishment",
    kineticVector: "Vortex Fluid Dispersion & Hydrolysis",
    stimulusRating: "10 / 10 Recovery Rate Index",
    liftExercise: "Hydrolyzed Whey & Creatine Dispersion",
  },
};

export default function HeroSection({
  onExplorePlans,
  className,
}: HeroSectionProps) {
  const [activeEquipment, setActiveEquipment] = useState<EquipmentType>("dumbbell");
  const [stageMode, setStageMode] = useState<StageMode>("orbit");
  const [loadWeight, setLoadWeight] = useState<number>(24);

  const currentSpec = equipmentSpecs[activeEquipment];

  // Synthesize authentic metallic iron acoustic click using Web Audio API
  const playIronAcoustics = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(820, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.28);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } catch {}
  };

  return (
    <section
      id="biomechanics"
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
              <span className="font-medium">INDIA&apos;S PREMIER HYBRID FITNESS ECOSYSTEM</span>
            </motion.div>

            {/* Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-zinc-100 leading-[1.08]">
                <span>PRECISION TRAINING.</span>
                <br />
                <span className="text-emerald-400">UNCOMPROMISING LIVING.</span>
              </h1>
            </motion.div>

            {/* Sub-headline description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed font-sans"
            >
              Experience an executive athletic tier engineered with Olympic lifting platforms, cryogenic recovery suites, and personalized biometric macro architecture. Flexible commitments with milestone installment payments.
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
                <span>EXPLORE MEMBERSHIPS</span>
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
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Active Members</span>
                <span className="text-xl font-heading font-bold text-zinc-100 font-mono">
                  <AnimatedCounter to={10000} suffix="+" />
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Retention Rate</span>
                <span className="text-xl font-heading font-bold text-emerald-400 font-mono">
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

          {/* RIGHT COLUMN: The Interactive 3D Biomechanics & Hardware Studio */}
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
                    3D BIOMECHANICS STUDIO
                  </span>
                </div>
                
                {/* Stage Mode Tabs (Orbit / Kinetic / X-Ray) */}
                <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 p-0.5 rounded-lg text-[10px] font-mono">
                  {[
                    { id: "orbit", label: "360° Studio", icon: RotateCcw },
                    { id: "kinetic", label: "Kinetic Lift", icon: Play },
                    { id: "xray", label: "X-Ray Core", icon: Layers },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => {
                        setStageMode(mode.id as StageMode);
                        playIronAcoustics();
                      }}
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
                <div className="absolute top-3 left-3 text-[10px] font-mono text-zinc-400 pointer-events-none flex items-center gap-1.5 bg-zinc-900/80 px-2 py-0.5 rounded-md border border-zinc-800">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span>MODE: {stageMode.toUpperCase()}</span>
                </div>

                <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 pointer-events-none bg-zinc-900/80 px-2 py-0.5 rounded-md border border-zinc-800">
                  {currentSpec.liftExercise}
                </div>

                <div className="absolute bottom-3 left-3 text-[10px] font-mono text-zinc-400 pointer-events-none">
                  DRAG CURSOR TO ORBIT • PBR SHADER ACTIVE
                </div>

                <button
                  type="button"
                  onClick={playIronAcoustics}
                  className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-emerald-400 transition-colors shadow-sm"
                  title="Test Olympic Iron Acoustic Response"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Hardware Switcher Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    Select Hardware Model:
                  </span>
                  <div className="relative">
                    <select
                      value={activeEquipment}
                      onChange={(e) => {
                        setActiveEquipment(e.target.value as EquipmentType);
                        playIronAcoustics();
                      }}
                      className="appearance-none bg-zinc-900/90 text-emerald-400 border border-zinc-700/80 rounded-lg py-1.5 pl-3 pr-8 text-xs font-mono font-medium focus:outline-none focus:border-emerald-500 cursor-pointer shadow-inner"
                    >
                      <option value="dumbbell">01 // Olympic Hex Dumbbell (24kg)</option>
                      <option value="kettlebell">02 // Competition Kettlebell (32kg)</option>
                      <option value="plate">03 // Calibrated Bumper Plate (20kg)</option>
                      <option value="barbell">04 // Olympic Barbell (2.2m 20kg)</option>
                      <option value="trapbar">05 // Hex Deadlift Trap Bar (30kg)</option>
                      <option value="shaker">06 // Titanium Athlete Shaker (750ml)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-emerald-400 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Quick Selector Pills */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {([
                    { id: "dumbbell", label: "Dumbbell" },
                    { id: "kettlebell", label: "Kettlebell" },
                    { id: "plate", label: "Bumper" },
                    { id: "barbell", label: "Barbell" },
                    { id: "trapbar", label: "Trap Bar" },
                    { id: "shaker", label: "Shaker" },
                  ] as { id: EquipmentType; label: string }[]).map(({ id, label }, idx) => {
                    const isSelected = activeEquipment === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setActiveEquipment(id);
                          playIronAcoustics();
                        }}
                        className={cn(
                          "py-1.5 px-1 rounded-lg text-[10px] font-mono font-medium transition-all duration-200 text-center border truncate",
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

              {/* Dynamic Anatomical Biomechanics & Telemetry Box */}
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                  <div className="flex items-center gap-1.5 text-zinc-200 font-semibold">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Target Muscle Activation</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {currentSpec.stimulusRating}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-0.5">
                  <div>
                    <span className="text-zinc-400 block text-[10px]">PRIMARY MOVER:</span>
                    <span className="text-emerald-400 font-semibold">{currentSpec.primaryMuscle}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">SECONDARY / STABILIZER:</span>
                    <span className="text-zinc-300">{currentSpec.secondaryMuscle}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">KINETIC VECTOR:</span>
                    <span className="text-zinc-300">{currentSpec.kineticVector}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">METALLURGY & TOLERANCE:</span>
                    <span className="text-zinc-300">{currentSpec.tolerance}</span>
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
