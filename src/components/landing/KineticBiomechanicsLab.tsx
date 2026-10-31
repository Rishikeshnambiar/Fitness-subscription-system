"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
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
  Layers,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type GuideMode = "workouts" | "transformation";
type ExerciseType = "squat" | "deadlift" | "bench" | "press";

interface ExerciseDef {
  id: ExerciseType;
  name: string;
  focusArea: string;
  defaultLoadKg: number;
  minLoadKg: number;
  maxLoadKg: number;
  musclesWorked: { name: string; percentage: number }[];
  benefit: string;
  estCaloriesBurned: string;
  recommendedPlanId: string;
  recommendedPlanName: string;
}

const EXERCISES: ExerciseDef[] = [
  {
    id: "squat",
    name: "Barbell Back Squat",
    focusArea: "Legs & Glutes",
    defaultLoadKg: 80,
    minLoadKg: 30,
    maxLoadKg: 160,
    musclesWorked: [
      { name: "Quadriceps (Front Thighs)", percentage: 90 },
      { name: "Glutes (Hip Shaping)", percentage: 85 },
      { name: "Hamstrings (Back of Thighs)", percentage: 70 },
      { name: "Core & Abdominals", percentage: 65 },
    ],
    benefit: "Builds lower body firmness, tones legs and glutes, and boosts metabolism.",
    estCaloriesBurned: "420 - 550 kcal / session",
    recommendedPlanId: "plan_pro_3m",
    recommendedPlanName: "Pro Performance (3-Month)",
  },
  {
    id: "deadlift",
    name: "Conventional Deadlift",
    focusArea: "Back, Posterior & Full Body",
    defaultLoadKg: 100,
    minLoadKg: 40,
    maxLoadKg: 200,
    musclesWorked: [
      { name: "Glutes & Hamstrings", percentage: 95 },
      { name: "Upper & Lower Back", percentage: 90 },
      { name: "Core & Spinal Support", percentage: 80 },
      { name: "Grip & Forearms", percentage: 75 },
    ],
    benefit: "Improves posture, strengthens back muscles, and burns maximum total calories.",
    estCaloriesBurned: "480 - 620 kcal / session",
    recommendedPlanId: "plan_elite_6m",
    recommendedPlanName: "Elite Strength (6-Month)",
  },
  {
    id: "bench",
    name: "Incline Chest Press",
    focusArea: "Chest, Shoulders & Arms",
    defaultLoadKg: 60,
    minLoadKg: 20,
    maxLoadKg: 130,
    musclesWorked: [
      { name: "Upper Chest (Pectorals)", percentage: 90 },
      { name: "Shoulders (Deltoids)", percentage: 80 },
      { name: "Back of Arms (Triceps)", percentage: 75 },
      { name: "Chest Definition", percentage: 70 },
    ],
    benefit: "Sculpts defined upper chest and shoulders while tightening arms.",
    estCaloriesBurned: "320 - 420 kcal / session",
    recommendedPlanId: "plan_starter_1m",
    recommendedPlanName: "Starter Velocity (1-Month)",
  },
  {
    id: "press",
    name: "Athletic Push Press",
    focusArea: "Shoulders, Power & Core",
    defaultLoadKg: 50,
    minLoadKg: 20,
    maxLoadKg: 110,
    musclesWorked: [
      { name: "Shoulders & Upper Body", percentage: 92 },
      { name: "Core Bracing & Abs", percentage: 85 },
      { name: "Leg Drive Propulsion", percentage: 80 },
      { name: "Overall Stamina", percentage: 78 },
    ],
    benefit: "Develops shoulder tone, full-body coordination, and athletic agility.",
    estCaloriesBurned: "380 - 500 kcal / session",
    recommendedPlanId: "plan_champion_12m",
    recommendedPlanName: "Champion Annual (12-Month)",
  },
];

export default function KineticBiomechanicsLab() {
  const [mode, setMode] = useState<GuideMode>("workouts");
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType>("squat");
  const [weightKg, setWeightKg] = useState<number>(80);
  const [week, setWeek] = useState<number>(8);

  const activeExercise = useMemo(() => {
    return EXERCISES.find((e) => e.id === selectedExercise) || EXERCISES[0];
  }, [selectedExercise]);

  const handleSelectExercise = (id: ExerciseType) => {
    setSelectedExercise(id);
    const ex = EXERCISES.find((e) => e.id === id);
    if (ex) setWeightKg(ex.defaultLoadKg);
  };

  // Human-friendly training intensity level
  const intensityTier = useMemo(() => {
    const ratio = weightKg / activeExercise.maxLoadKg;
    if (ratio < 0.45) {
      return {
        level: "Beginner / Form & Conditioning",
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        message: "Ideal for mastering technique and building muscular endurance.",
      };
    } else if (ratio < 0.75) {
      return {
        level: "Intermediate / Muscle Tone & Definition",
        color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        message: "Optimal sweet-spot for visible toning, muscle shape, and fat burn.",
      };
    } else {
      return {
        level: "Advanced / Maximum Strength & Power",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        message: "Heavy athletic loading for building serious strength and power.",
      };
    }
  }, [weightKg, activeExercise]);

  // 12-Week Transformation Projections (Easy to understand milestones)
  const transformationMilestones = useMemo(() => {
    const progress = week / 12;
    const bodyFat = Number((24.0 - progress * 12.0).toFixed(1)); // 24% to 12%
    const muscleGained = Number((progress * 3.4).toFixed(1)); // +0 to +3.4 kg
    const energyLevel = Math.round(60 + progress * 35); // 60% to 95%
    const strengthIncrease = Math.round(progress * 38); // +0% to +38%

    return {
      bodyFat,
      muscleGained,
      energyLevel,
      strengthIncrease,
    };
  }, [week]);

  return (
    <section id="biometrics" className="py-20 sm:py-24 border-t border-zinc-800/80 bg-zinc-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" /> INTERACTIVE WORKOUT & RESULTS GUIDE
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-zinc-100 tracking-tight">
              See How Your Workouts Shape Your Body
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              Explore which muscles are targeted by core gym exercises, or slide through our 12-week transformation projection to see what results you can expect.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 self-start md:self-auto">
            <button
              onClick={() => setMode("workouts")}
              className={cn(
                "py-2 px-4 rounded-xl text-xs font-heading font-semibold transition-all flex items-center gap-2",
                mode === "workouts"
                  ? "bg-emerald-500 text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Target Muscles</span>
            </button>
            <button
              onClick={() => setMode("transformation")}
              className={cn(
                "py-2 px-4 rounded-xl text-xs font-heading font-semibold transition-all flex items-center gap-2",
                mode === "transformation"
                  ? "bg-emerald-500 text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>12-Week Results</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: TARGET MUSCLES PER EXERCISE */}
        {mode === "workouts" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Exercise Selector Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {EXERCISES.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => handleSelectExercise(ex.id)}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition-all",
                    selectedExercise === ex.id
                      ? "bg-zinc-900 border-emerald-500/60 shadow-lg text-zinc-100"
                      : "bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                    {ex.focusArea}
                  </div>
                  <div className="text-sm font-heading font-bold mt-1 text-zinc-100">
                    {ex.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Main Interactive Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column: Visual Highlight Silhouette */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between items-center text-center">
                <div className="w-full flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-800/80 pb-3">
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    ACTIVATED MUSCLE GROUPS
                  </span>
                  <span className="text-emerald-400 font-semibold">{activeExercise.focusArea}</span>
                </div>

                {/* SVG Visual Body Graphic */}
                <div className="py-6 flex items-center justify-center relative w-full min-h-[280px]">
                  <svg
                    viewBox="0 0 200 340"
                    className="w-40 h-72 drop-shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Head */}
                    <circle cx="100" cy="30" r="16" stroke="#52525b" strokeWidth="2" strokeDasharray="3 3" />
                    <circle cx="100" cy="30" r="6" fill="#10b981" fillOpacity="0.4" />

                    {/* Spine / Core Alignment */}
                    <line x1="100" y1="50" x2="100" y2="170" stroke="#34d399" strokeWidth="2.5" strokeDasharray="4 2" />

                    {/* Shoulders */}
                    <path
                      d="M 60 70 Q 100 60 140 70"
                      stroke={selectedExercise === "bench" || selectedExercise === "press" ? "#10b981" : "#52525b"}
                      strokeWidth={selectedExercise === "bench" || selectedExercise === "press" ? "6" : "2"}
                      strokeLinecap="round"
                    />

                    {/* Chest Group */}
                    <path
                      d="M 75 80 Q 100 90 125 80"
                      stroke={selectedExercise === "bench" ? "#10b981" : "#3f3f46"}
                      strokeWidth={selectedExercise === "bench" ? "6" : "2"}
                    />

                    {/* Core / Midsection */}
                    <rect
                      x="82"
                      y="105"
                      width="36"
                      height="45"
                      rx="8"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      fill="#38bdf8"
                      fillOpacity="0.2"
                    />

                    {/* Pelvis & Glutes */}
                    <path
                      d="M 68 170 Q 100 195 132 170"
                      stroke={selectedExercise === "squat" || selectedExercise === "deadlift" ? "#10b981" : "#52525b"}
                      strokeWidth={selectedExercise === "squat" || selectedExercise === "deadlift" ? "7" : "3"}
                      strokeLinecap="round"
                    />

                    {/* Arms */}
                    <line
                      x1="60"
                      y1="70"
                      x2="40"
                      y2="130"
                      stroke={selectedExercise === "bench" || selectedExercise === "press" ? "#34d399" : "#3f3f46"}
                      strokeWidth="3.5"
                    />
                    <line
                      x1="140"
                      y1="70"
                      x2="160"
                      y2="130"
                      stroke={selectedExercise === "bench" || selectedExercise === "press" ? "#34d399" : "#3f3f46"}
                      strokeWidth="3.5"
                    />
                    <line x1="40" y1="130" x2="30" y2="180" stroke="#71717a" strokeWidth="2.5" />
                    <line x1="160" y1="130" x2="170" y2="180" stroke="#71717a" strokeWidth="2.5" />

                    {/* Thighs & Quads */}
                    <line
                      x1="76"
                      y1="175"
                      x2="68"
                      y2="255"
                      stroke={selectedExercise === "squat" || selectedExercise === "deadlift" ? "#10b981" : "#52525b"}
                      strokeWidth={selectedExercise === "squat" ? "7" : "4"}
                    />
                    <line
                      x1="124"
                      y1="175"
                      x2="132"
                      y2="255"
                      stroke={selectedExercise === "squat" || selectedExercise === "deadlift" ? "#10b981" : "#52525b"}
                      strokeWidth={selectedExercise === "squat" ? "7" : "4"}
                    />

                    {/* Lower Legs & Calves */}
                    <line x1="68" y1="255" x2="62" y2="320" stroke="#71717a" strokeWidth="3" />
                    <line x1="132" y1="255" x2="138" y2="320" stroke="#71717a" strokeWidth="3" />
                  </svg>
                </div>

                <div className={cn("w-full p-3 rounded-2xl border text-xs font-mono", intensityTier.color)}>
                  <div className="font-bold">{intensityTier.level}</div>
                  <div className="text-[11px] opacity-80 mt-0.5">{intensityTier.message}</div>
                </div>
              </div>

              {/* Right Column: Practical Details & Weight Slider */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                      Exercise Breakdown
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      Burn: {activeExercise.estCaloriesBurned}
                    </span>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-zinc-100 mt-1">
                    {activeExercise.name}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    {activeExercise.benefit}
                  </p>
                </div>

                {/* Weight Intensity Slider */}
                <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-300">
                    <span className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-emerald-400" />
                      Select Training Weight:
                    </span>
                    <span className="text-xl font-bold text-zinc-100 font-mono">
                      {weightKg} <span className="text-xs text-zinc-400 font-normal">KG</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={activeExercise.minLoadKg}
                    max={activeExercise.maxLoadKg}
                    step="5"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                    <span>Light: {activeExercise.minLoadKg} kg</span>
                    <span>Moderate: {Math.round((activeExercise.minLoadKg + activeExercise.maxLoadKg) / 2)} kg</span>
                    <span>Heavy: {activeExercise.maxLoadKg} kg</span>
                  </div>
                </div>

                {/* Targeted Muscles Bars */}
                <div className="space-y-3 pt-1 border-t border-zinc-800">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Primary Muscle Activation:
                  </div>
                  <div className="space-y-2">
                    {activeExercise.musclesWorked.map((muscle) => (
                      <div key={muscle.name} className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-300">
                          <span>{muscle.name}</span>
                          <span className="font-mono text-emerald-400 font-semibold">{muscle.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${muscle.percentage}%` }}
                            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommends Plan */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-emerald-300 font-medium">
                      Included with Personal Coaching In:
                    </div>
                    <div className="text-sm font-heading font-bold text-zinc-100">
                      {activeExercise.recommendedPlanName}
                    </div>
                  </div>
                  <Link
                    href={`/checkout/${activeExercise.recommendedPlanId}`}
                    className="py-2.5 px-4 rounded-xl bg-emerald-500 text-zinc-950 font-heading font-bold text-xs hover:bg-emerald-400 transition-all text-center shrink-0 shadow-sm"
                  >
                    SELECT PLAN &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: 12-WEEK TRANSFORMATION RESULTS */}
        {mode === "transformation" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-8 animate-in fade-in duration-300">
            <div className="max-w-2xl">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                Real Member Projections
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-100 mt-1">
                Your 12-Week Transformation Journey
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Consistent training 3 to 4 times a week combined with balanced nutrition creates noticeable, sustainable physical results. Slide through the weeks below:
              </p>
            </div>

            {/* Week Slider */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-zinc-300">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Select Week on Program:
                </span>
                <span className="text-lg font-bold text-emerald-400 font-mono">
                  Week {week} of 12
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2.5 bg-zinc-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>Week 0 (Getting Started)</span>
                <span>Week 6 (Visible Definition)</span>
                <span>Week 12 (Peak Transformation)</span>
              </div>
            </div>

            {/* Clear Results Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-1">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Estimated Body Fat
                </div>
                <div className="text-3xl font-mono font-bold text-emerald-400">
                  {transformationMilestones.bodyFat}%
                </div>
                <div className="text-[11px] text-zinc-500 font-mono pt-1">
                  Starting: 24.0% &rarr; Down by -{(24.0 - transformationMilestones.bodyFat).toFixed(1)}%
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-1">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Lean Muscle Toned
                </div>
                <div className="text-3xl font-mono font-bold text-zinc-100">
                  +{transformationMilestones.muscleGained} <span className="text-xs font-normal text-zinc-400">KG</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono pt-1">
                  Firm, defined muscular shape
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-1">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Strength & Performance
                </div>
                <div className="text-3xl font-mono font-bold text-zinc-100">
                  +{transformationMilestones.strengthIncrease}%
                </div>
                <div className="text-[11px] text-zinc-500 font-mono pt-1">
                  Higher stamina & lifting capacity
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-1">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Daily Vitality & Energy
                </div>
                <div className="text-3xl font-mono font-bold text-blue-400">
                  {transformationMilestones.energyLevel}%
                </div>
                <div className="text-[11px] text-zinc-500 font-mono pt-1">
                  Better sleep quality & daytime focus
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-heading font-bold text-zinc-100">
                  Ready to begin your 12-week transformation?
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Flexible plans with partial 50% installment payments and zero cancellation penalties.
                </div>
              </div>
              <Link
                href="/#plans"
                className="py-2.5 px-5 rounded-xl bg-emerald-500 text-zinc-950 font-heading font-bold text-xs hover:bg-emerald-400 transition-all text-center shrink-0 shadow-sm"
              >
                VIEW SUBSCRIPTION PLANS &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
