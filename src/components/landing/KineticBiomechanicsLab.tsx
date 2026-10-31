"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  Zap,
  Flame,
  Dumbbell,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

type LabMode = "movement" | "transformation";
type MovementType = "squat" | "deadlift" | "bench" | "clean";

interface MovementDef {
  id: MovementType;
  name: string;
  category: string;
  defaultLoadKg: number;
  minLoadKg: number;
  maxLoadKg: number;
  primaryMovers: { name: string; activation: number; color: string }[];
  targetZone: string;
  cnsFatigueRating: "Moderate" | "High" | "Maximum Central";
  description: string;
  matchingPlanId: string;
  matchingPlanName: string;
}

const MOVEMENTS: MovementDef[] = [
  {
    id: "squat",
    name: "Olympic High-Bar Squat",
    category: "Lower Body Axial Drive",
    defaultLoadKg: 140,
    minLoadKg: 40,
    maxLoadKg: 240,
    primaryMovers: [
      { name: "Quadriceps (Vastus Lateralis & Medialis)", activation: 94, color: "#10b981" },
      { name: "Gluteus Maximus & Medius", activation: 86, color: "#34d399" },
      { name: "Erector Spinae & Spinal Stabilizers", activation: 72, color: "#38bdf8" },
      { name: "Core & Intra-Abdominal Wall", activation: 68, color: "#818cf8" },
    ],
    targetZone: "Quads & Glute Complex",
    cnsFatigueRating: "High",
    description: "Deep knee flexion and hip extension under axial load drives massive bilateral hypertrophy and lower kinetic chain force.",
    matchingPlanId: "plan_pro_3m",
    matchingPlanName: "Pro Performance (3-Mo)",
  },
  {
    id: "deadlift",
    name: "Conventional Pull from Floor",
    category: "Posterior Chain Force",
    defaultLoadKg: 180,
    minLoadKg: 60,
    maxLoadKg: 280,
    primaryMovers: [
      { name: "Hamstrings (Biceps Femoris)", activation: 92, color: "#10b981" },
      { name: "Gluteus Complex & Hip Hinge", activation: 96, color: "#34d399" },
      { name: "Trapezius & Rhomboids", activation: 88, color: "#38bdf8" },
      { name: "Latissimus Dorsi & Spinal Erectors", activation: 82, color: "#818cf8" },
    ],
    targetZone: "Full Posterior Kinetic Chain",
    cnsFatigueRating: "Maximum Central",
    description: "Maximum ground-reaction force production through violent hip extension and total posterior rigidity.",
    matchingPlanId: "plan_elite_6m",
    matchingPlanName: "Elite Strength (6-Mo)",
  },
  {
    id: "bench",
    name: "Incline Barbell Press",
    category: "Upper Anterior Kinetic Drive",
    defaultLoadKg: 100,
    minLoadKg: 40,
    maxLoadKg: 180,
    primaryMovers: [
      { name: "Clavicular Pectoralis (Upper Chest)", activation: 91, color: "#10b981" },
      { name: "Anterior Deltoids", activation: 84, color: "#34d399" },
      { name: "Triceps Brachii (Lateral & Medial Head)", activation: 78, color: "#38bdf8" },
      { name: "Serratus Anterior", activation: 64, color: "#818cf8" },
    ],
    targetZone: "Pectoral & Deltoid Girdle",
    cnsFatigueRating: "Moderate",
    description: "Angles the pressing plane to target upper clavicular fibers while demanding shoulder stabilization.",
    matchingPlanId: "plan_pro_3m",
    matchingPlanName: "Pro Performance (3-Mo)",
  },
  {
    id: "clean",
    name: "Power Clean & Push Press",
    category: "Triple Extension Explosiveness",
    defaultLoadKg: 90,
    minLoadKg: 40,
    maxLoadKg: 160,
    primaryMovers: [
      { name: "Triple Extension (Ankles, Knees, Hips)", activation: 98, color: "#10b981" },
      { name: "Lateral & Anterior Deltoids", activation: 92, color: "#34d399" },
      { name: "Upper Trapezius & Upper Back", activation: 94, color: "#38bdf8" },
      { name: "Core Kinetic Transfer Unit", activation: 89, color: "#818cf8" },
    ],
    targetZone: "Total Body Neuromuscular Speed",
    cnsFatigueRating: "Maximum Central",
    description: "Translates raw strength into rate of force development (RFD) across the entire skeletal kinetic chain.",
    matchingPlanId: "plan_champion_12m",
    matchingPlanName: "Champion Annual (12-Mo)",
  },
];

export default function KineticBiomechanicsLab() {
  const [labMode, setLabMode] = useState<LabMode>("movement");
  const [selectedMovement, setSelectedMovement] = useState<MovementType>("squat");
  const [loadKg, setLoadKg] = useState<number>(140);
  const [transformWeek, setTransformWeek] = useState<number>(8);

  const activeMovement = useMemo(() => {
    return MOVEMENTS.find((m) => m.id === selectedMovement) || MOVEMENTS[0];
  }, [selectedMovement]);

  // Handle movement selection with appropriate load
  const handleSelectMovement = (id: MovementType) => {
    setSelectedMovement(id);
    const mov = MOVEMENTS.find((m) => m.id === id);
    if (mov) setLoadKg(mov.defaultLoadKg);
  };

  // Kinetic Physics & Neuromuscular Calculations
  const biomechanics = useMemo(() => {
    const mass = loadKg;
    const gravity = 9.81;
    const acceleration = 1.6; // estimated bar acceleration in concentric phase
    const peakForceNewtons = Math.round(mass * (gravity + acceleration));
    const workJoules = Math.round(peakForceNewtons * 0.75); // ~0.75m bar travel distance

    // Neuromuscular motor unit recruitment percentage
    const maxCapacity = activeMovement.maxLoadKg;
    const recruitmentRatio = Math.min(0.98, Math.max(0.45, (mass / maxCapacity) * 0.95));
    const motorRecruitmentPct = Math.round(recruitmentRatio * 100);

    // CNS Recovery Window (hours)
    let cnsRecoveryHours = 24;
    if (mass > activeMovement.maxLoadKg * 0.75) cnsRecoveryHours = 48;
    if (mass > activeMovement.maxLoadKg * 0.88) cnsRecoveryHours = 72;

    // Strain Heat Status
    let strainTier: { label: string; color: string; desc: string } = {
      label: "Sub-Maximal Hypertrophy",
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      desc: "Optimized for muscle protein synthesis with rapid glycogen replenishing.",
    };

    if (motorRecruitmentPct >= 85) {
      strainTier = {
        label: "Peak Neuromuscular Load",
        color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
        desc: "High motor unit recruitment triggering myofibrillar micro-trauma.",
      };
    }
    if (motorRecruitmentPct >= 92) {
      strainTier = {
        label: "Maximal Kinetic Threshold",
        color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
        desc: "Near-failure neural strain. Requires 48–72h supercompensation recovery.",
      };
    }

    return {
      peakForceNewtons,
      workJoules,
      motorRecruitmentPct,
      cnsRecoveryHours,
      strainTier,
    };
  }, [loadKg, activeMovement]);

  // 12-Week Transformation Morphing Calculations
  const transformation = useMemo(() => {
    const progress = transformWeek / 12; // 0 to 1
    const bodyFatPct = Number((24.0 - progress * 13.2).toFixed(1)); // 24.0% down to 10.8%
    const muscleGainKg = Number((progress * 3.8).toFixed(1)); // 0 to +3.8kg
    const rmrKcal = Math.round(1840 + progress * 210); // +210 kcal/day basal burn
    const visceralGrade = Math.max(1, Math.round(5 - progress * 4)); // Grade 5 down to Grade 1

    return {
      bodyFatPct,
      muscleGainKg,
      rmrKcal,
      visceralGrade,
    };
  }, [transformWeek]);

  return (
    <section id="biometrics" className="py-24 border-t border-zinc-800/80 bg-zinc-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-3">
              <Cpu className="w-3.5 h-3.5" /> Biomechanical Intelligence
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-zinc-100 tracking-tight">
              Kinetic Muscle Activation & Transformation Lab
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              Explore real-time electromyography (EMG) motor unit recruitment under dynamic barbell loads, or simulate projected 12-week body recomposition.
            </p>
          </div>

          {/* Mode Switcher Pills */}
          <div className="flex items-center p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 self-start md:self-auto">
            <button
              onClick={() => setLabMode("movement")}
              className={cn(
                "py-2 px-4 rounded-xl text-xs font-heading font-semibold transition-all flex items-center gap-2",
                labMode === "movement"
                  ? "bg-emerald-500 text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Lift Kinematics</span>
            </button>
            <button
              onClick={() => setLabMode("transformation")}
              className={cn(
                "py-2 px-4 rounded-xl text-xs font-heading font-semibold transition-all flex items-center gap-2",
                labMode === "transformation"
                  ? "bg-emerald-500 text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>12-Week Morph</span>
            </button>
          </div>
        </div>

        {/* MODE 1: LIFT KINEMATICS & MOTOR UNIT RECRUITMENT */}
        {labMode === "movement" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Movement Selector Chips */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {MOVEMENTS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectMovement(m.id)}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition-all",
                    selectedMovement === m.id
                      ? "bg-zinc-900/90 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                      : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-400"
                  )}
                >
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    {m.category}
                  </div>
                  <div className={cn("text-sm font-heading font-bold mt-1", selectedMovement === m.id ? "text-emerald-400" : "text-zinc-200")}>
                    {m.name}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono mt-1">
                    Primary: {m.targetZone}
                  </div>
                </button>
              ))}
            </div>

            {/* Central Simulator Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column: Visual Kinetic Silhouette */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 relative flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-800/80 pb-3">
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                    NEUROMUSCULAR HEATMAP
                  </span>
                  <span className="text-zinc-500">EMG RECRUITMENT</span>
                </div>

                {/* Dynamic SVG Anatomical Kinetic Wireframe */}
                <div className="py-8 flex items-center justify-center relative min-h-[300px]">
                  {/* Radial Energy Aura that expands with weight */}
                  <div
                    style={{
                      transform: `scale(${0.7 + (biomechanics.motorRecruitmentPct / 100) * 0.6})`,
                      opacity: 0.2 + (biomechanics.motorRecruitmentPct / 100) * 0.3,
                    }}
                    className={cn(
                      "absolute w-56 h-56 rounded-full blur-3xl transition-all duration-500 pointer-events-none",
                      biomechanics.motorRecruitmentPct >= 90
                        ? "bg-rose-500"
                        : biomechanics.motorRecruitmentPct >= 80
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    )}
                  />

                  {/* Anatomical Kinetic Model Vector Graphic */}
                  <svg
                    viewBox="0 0 200 360"
                    className="w-44 h-80 transition-all duration-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Head / Cranium */}
                    <circle cx="100" cy="35" r="18" stroke="#52525b" strokeWidth="2" strokeDasharray="3 3" />
                    <circle cx="100" cy="35" r="8" fill="#10b981" fillOpacity={biomechanics.motorRecruitmentPct / 150} />

                    {/* Spine / Axial Kinetic Column */}
                    <line x1="100" y1="55" x2="100" y2="180" stroke="#34d399" strokeWidth="3" strokeDasharray="4 2" />

                    {/* Shoulders & Clavicle */}
                    <path
                      d="M 60 75 Q 100 65 140 75"
                      stroke={selectedMovement === "bench" || selectedMovement === "clean" ? "#10b981" : "#52525b"}
                      strokeWidth={selectedMovement === "bench" || selectedMovement === "clean" ? "5" : "2"}
                      strokeLinecap="round"
                    />

                    {/* Pectorals / Chest Group */}
                    <path
                      d="M 75 85 Q 100 95 125 85"
                      stroke={selectedMovement === "bench" ? "#34d399" : "#3f3f46"}
                      strokeWidth={selectedMovement === "bench" ? "6" : "2"}
                    />

                    {/* Core / Abdominal Bracing */}
                    <rect
                      x="82"
                      y="110"
                      width="36"
                      height="50"
                      rx="8"
                      stroke={selectedMovement === "squat" || selectedMovement === "deadlift" ? "#38bdf8" : "#3f3f46"}
                      strokeWidth="2"
                      fill={selectedMovement === "squat" || selectedMovement === "deadlift" ? "#38bdf8" : "transparent"}
                      fillOpacity={biomechanics.motorRecruitmentPct / 250}
                    />

                    {/* Pelvic / Glute Complex */}
                    <path
                      d="M 68 180 Q 100 205 132 180"
                      stroke={selectedMovement === "squat" || selectedMovement === "deadlift" ? "#10b981" : "#52525b"}
                      strokeWidth={selectedMovement === "squat" || selectedMovement === "deadlift" ? "7" : "3"}
                      strokeLinecap="round"
                    />

                    {/* Upper Arms / Pressing Limbs */}
                    <line
                      x1="60"
                      y1="75"
                      x2="40"
                      y2="135"
                      stroke={selectedMovement === "bench" || selectedMovement === "clean" ? "#34d399" : "#3f3f46"}
                      strokeWidth="3"
                    />
                    <line
                      x1="140"
                      y1="75"
                      x2="160"
                      y2="135"
                      stroke={selectedMovement === "bench" || selectedMovement === "clean" ? "#34d399" : "#3f3f46"}
                      strokeWidth="3"
                    />

                    {/* Forearms & Grip */}
                    <line x1="40" y1="135" x2="30" y2="185" stroke="#71717a" strokeWidth="2.5" />
                    <line x1="160" y1="135" x2="170" y2="185" stroke="#71717a" strokeWidth="2.5" />

                    {/* Femurs / Quadriceps & Hamstrings */}
                    <line
                      x1="76"
                      y1="185"
                      x2="68"
                      y2="265"
                      stroke={selectedMovement === "squat" || selectedMovement === "deadlift" ? "#10b981" : "#52525b"}
                      strokeWidth={selectedMovement === "squat" ? "7" : "4"}
                    />
                    <line
                      x1="124"
                      y1="185"
                      x2="132"
                      y2="265"
                      stroke={selectedMovement === "squat" || selectedMovement === "deadlift" ? "#10b981" : "#52525b"}
                      strokeWidth={selectedMovement === "squat" ? "7" : "4"}
                    />

                    {/* Lower Legs / Tibia & Calves */}
                    <line x1="68" y1="265" x2="62" y2="340" stroke="#71717a" strokeWidth="3" />
                    <line x1="132" y1="265" x2="138" y2="340" stroke="#71717a" strokeWidth="3" />
                  </svg>
                </div>

                {/* Bottom Strain Badge */}
                <div className={cn("p-3 rounded-2xl border text-center text-xs font-mono", biomechanics.strainTier.color)}>
                  <div className="font-bold uppercase tracking-wider">{biomechanics.strainTier.label}</div>
                  <div className="text-[11px] opacity-80 mt-0.5">{biomechanics.strainTier.desc}</div>
                </div>
              </div>

              {/* Right Column: Interactive Load Control & Telemetry */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between space-y-6">
                {/* Movement Description */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                      Movement Profile
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                      CNS Fatigue: {activeMovement.cnsFatigueRating}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-zinc-100 mt-1">
                    {activeMovement.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {activeMovement.description}
                  </p>
                </div>

                {/* Interactive Barbell Load Slider */}
                <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-emerald-400" />
                      Dynamic Barbell Resistance Load
                    </span>
                    <span className="font-mono text-xl font-bold text-zinc-100">
                      {loadKg} <span className="text-xs font-normal text-zinc-400">KG</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={activeMovement.minLoadKg}
                    max={activeMovement.maxLoadKg}
                    step="5"
                    value={loadKg}
                    onChange={(e) => setLoadKg(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                    <span>Min: {activeMovement.minLoadKg} kg</span>
                    <span>Median: {Math.round((activeMovement.minLoadKg + activeMovement.maxLoadKg) / 2)} kg</span>
                    <span>Max: {activeMovement.maxLoadKg} kg</span>
                  </div>
                </div>

                {/* Real-Time Telemetry Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Peak Kinetic Force</div>
                    <div className="text-lg font-mono font-bold text-zinc-100 mt-0.5">
                      {biomechanics.peakForceNewtons} <span className="text-[10px] font-normal text-zinc-400">N</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Motor Recruitment</div>
                    <div className="text-lg font-mono font-bold text-emerald-400 mt-0.5">
                      {biomechanics.motorRecruitmentPct}%
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Work Output</div>
                    <div className="text-lg font-mono font-bold text-zinc-100 mt-0.5">
                      {biomechanics.workJoules} <span className="text-[10px] font-normal text-zinc-400">J</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Recovery Window</div>
                    <div className="text-lg font-mono font-bold text-amber-400 mt-0.5">
                      {biomechanics.cnsRecoveryHours} <span className="text-[10px] font-normal text-zinc-400">hrs</span>
                    </div>
                  </div>
                </div>

                {/* Primary Movers Breakdown Bars */}
                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Electromyographic (EMG) Muscle Group Recruitment:
                  </div>
                  <div className="space-y-2">
                    {activeMovement.primaryMovers.map((mover) => {
                      const scaledActivation = Math.min(
                        100,
                        Math.round(mover.activation * (biomechanics.motorRecruitmentPct / 85))
                      );
                      return (
                        <div key={mover.name} className="space-y-1">
                          <div className="flex justify-between text-xs text-zinc-300">
                            <span>{mover.name}</span>
                            <span className="font-mono text-emerald-400 font-bold">{scaledActivation}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${scaledActivation}%` }}
                              className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Match to Subscription Plan CTA */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-emerald-300">
                      Recommended Coaching Tier for this Lift:
                    </div>
                    <div className="text-sm font-heading font-bold text-zinc-100">
                      {activeMovement.matchingPlanName}
                    </div>
                  </div>
                  <Link
                    href={`/checkout/${activeMovement.matchingPlanId}`}
                    className="py-2 px-3.5 rounded-xl bg-emerald-500 text-zinc-950 font-mono font-bold text-xs hover:bg-emerald-400 transition-all text-center shrink-0 shadow-sm"
                  >
                    SELECT COMMITTED TIER &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: 12-WEEK METCON TRANSFORMATION SIMULATOR */}
        {labMode === "transformation" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-8 animate-in fade-in duration-300">
            <div className="max-w-2xl">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                Hyperbolic Conditioning Slicer
              </span>
              <h3 className="text-2xl font-heading font-bold text-zinc-100 mt-1">
                Projected 12-Week Body Recomposition Slicer
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Slide through the 12-week MetCon training timeline to observe projected adipose reduction, myofibrillar tissue expansion, and basal metabolic adaptation.
              </p>
            </div>

            {/* Timeline Slider: Week 0 to Week 12 */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-zinc-300">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Training Progression Timeline
                </span>
                <span className="text-lg font-bold text-emerald-400 font-mono">
                  Week {transformWeek} of 12
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={transformWeek}
                onChange={(e) => setTransformWeek(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2.5 bg-zinc-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>Week 0 (Baseline DEXA)</span>
                <span>Week 6 (Midway Supercompensation)</span>
                <span>Week 12 (Peak Conditioning)</span>
              </div>
            </div>

            {/* Projected Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-1">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Total Adipose Body Fat
                </div>
                <div className="text-3xl font-mono font-bold text-emerald-400">
                  {transformation.bodyFatPct}%
                </div>
                <div className="text-[11px] text-zinc-500 font-mono pt-1">
                  Baseline: 24.0% &rarr; Delta: -{(24.0 - transformation.bodyFatPct).toFixed(1)}%
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-1">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Accrued Lean Skeletal Muscle
                </div>
                <div className="text-3xl font-mono font-bold text-zinc-100">
                  +{transformation.muscleGainKg} <span className="text-xs font-normal text-zinc-400">KG</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono pt-1">
                  Myofibrillar cross-sectional density
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-1">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Resting Caloric Burn (RMR)
                </div>
                <div className="text-3xl font-mono font-bold text-zinc-100">
                  {transformation.rmrKcal} <span className="text-xs font-normal text-zinc-400">kcal</span>
                </div>
                <div className="text-[11px] text-zinc-500 font-mono pt-1">
                  +{transformation.rmrKcal - 1840} kcal/day passive expenditure
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-1">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Visceral Adipose Index
                </div>
                <div className="text-3xl font-mono font-bold text-amber-400">
                  Grade {transformation.visceralGrade}
                </div>
                <div className="text-[11px] text-zinc-500 font-mono pt-1">
                  Cardiovascular & longevity safety bracket
                </div>
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-heading font-bold text-zinc-100">
                  Ready to lock in this athletic transformation?
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Backed by AgarkarMedia Pvt. Ltd. with partial 50% installment payments and flexible pause privileges.
                </div>
              </div>
              <Link
                href="/#plans"
                className="py-2.5 px-5 rounded-xl bg-emerald-500 text-zinc-950 font-heading font-bold text-xs hover:bg-emerald-400 transition-all text-center shrink-0 shadow-sm"
              >
                DISCOVER SUBSCRIPTION PLANS &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
