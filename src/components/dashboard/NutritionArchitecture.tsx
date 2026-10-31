"use client";

import React, { useState, useMemo } from "react";
import {
  Flame,
  Apple,
  Dumbbell,
  Droplets,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Plus,
  RotateCcw,
  Download,
  Info,
} from "lucide-react";
import { toast } from "sonner";

type FitnessGoal = "hypertrophy" | "recomp" | "fat_loss";
type ActivityLevel = "moderate" | "heavy" | "elite";

interface NutritionArchitectureProps {
  memberTier?: string;
}

export default function NutritionArchitecture({
  memberTier = "Athlete Pro",
}: NutritionArchitectureProps) {
  // Biometric States
  const [goal, setGoal] = useState<FitnessGoal>("hypertrophy");
  const [weightKg, setWeightKg] = useState<number>(75);
  const [activity, setActivity] = useState<ActivityLevel>("heavy");
  const [waterLoggedMl, setWaterLoggedMl] = useState<number>(2250);

  // Dynamic Macro & Calorie Math based on clinical sports nutrition guidelines
  const nutritionPlan = useMemo(() => {
    // Baseline BMR via Mifflin-St Jeor formula (assuming average male/female median)
    const baseBMR = 10 * weightKg + 6.25 * 175 - 5 * 26 + 5;

    // Activity Multiplier
    const activityMultipliers: Record<ActivityLevel, number> = {
      moderate: 1.45,
      heavy: 1.65,
      elite: 1.85,
    };
    const tdee = Math.round(baseBMR * activityMultipliers[activity]);

    // Goal Adjustments
    let targetCalories = tdee;
    let proteinPerKg = 2.0;
    let fatRatio = 0.25; // 25% of calories from fat

    if (goal === "hypertrophy") {
      targetCalories = Math.round(tdee * 1.12); // +12% anabolic surplus
      proteinPerKg = 2.2;
      fatRatio = 0.25;
    } else if (goal === "fat_loss") {
      targetCalories = Math.round(tdee * 0.82); // -18% deficit
      proteinPerKg = 2.4; // higher protein to prevent muscle catabolism
      fatRatio = 0.25;
    } else {
      // Recomposition
      targetCalories = tdee;
      proteinPerKg = 2.2;
      fatRatio = 0.25;
    }

    const proteinGrams = Math.round(weightKg * proteinPerKg);
    const proteinKcal = proteinGrams * 4;

    const fatKcal = Math.round(targetCalories * fatRatio);
    const fatGrams = Math.round(fatKcal / 9);

    const remainingKcal = targetCalories - proteinKcal - fatKcal;
    const carbGrams = Math.max(50, Math.round(remainingKcal / 4));
    const carbKcal = carbGrams * 4;

    const waterTargetMl = Math.round(weightKg * 45); // 45ml per kg for strength athletes

    const proteinPct = Math.round((proteinKcal / targetCalories) * 100);
    const carbPct = Math.round((carbKcal / targetCalories) * 100);
    const fatPct = Math.max(5, 100 - proteinPct - carbPct);

    return {
      tdee,
      targetCalories,
      proteinGrams,
      carbGrams,
      fatGrams,
      proteinPct,
      carbPct,
      fatPct,
      waterTargetMl,
    };
  }, [goal, weightKg, activity]);

  const handleLogWater = (amount: number) => {
    setWaterLoggedMl((prev) => Math.min(6000, prev + amount));
    toast.success(`Logged +${amount}ml pure hydration.`);
  };

  const handleResetWater = () => {
    setWaterLoggedMl(0);
    toast.info("Hydration log reset for new training cycle.");
  };

  const handleExportProtocol = () => {
    const textContent = `HYPERGYM ATHLETIC NUTRITION PROTOCOL // AGARKARMEDIA
=========================================================
Member Tier: ${memberTier}
Conditioning Goal: ${goal.toUpperCase()}
Bodyweight: ${weightKg} KG
Activity Profile: ${activity.toUpperCase()}

TARGET CALORIC INTAKE: ${nutritionPlan.targetCalories.toLocaleString("en-IN")} kcal/day
- Protein: ${nutritionPlan.proteinGrams}g (${nutritionPlan.proteinPct}%)
- Carbohydrates: ${nutritionPlan.carbGrams}g (${nutritionPlan.carbPct}%)
- Dietary Fats: ${nutritionPlan.fatGrams}g (${nutritionPlan.fatPct}%)
- Recommended Hydration: ${(nutritionPlan.waterTargetMl / 1000).toFixed(1)} Liters/day

NUTRIENT TIMING MATRIX:
1. Pre-Workout (-90m): 40g Complex Carbs + 30g Fast Whey Protein
2. Intra-Workout: 750ml Water + 500mg Sodium + 7g BCAAs/EAAs
3. Post-Workout (+30m): 35g Hydrolyzed Isolate + 50g Dextrose/Rice
4. Bedtime Protocol: 30g Micellar Casein + 300mg Magnesium Glycinate

Generated via HyperGym Biometric Engine (c) AgarkarMedia Pvt. Ltd.`;

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hypergym-nutrition-protocol-${goal}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Diet & Macro Protocol downloaded successfully.");
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Biometric Conditioning Engine
          </div>
          <h2 className="text-2xl font-heading font-bold text-zinc-100 flex items-center gap-2">
            Personalized Macro & Nutrition Architecture
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Calibrated daily caloric expenditure, gram-precision macronutrient targets, and anabolic meal timing for {memberTier}.
          </p>
        </div>

        <button
          onClick={handleExportProtocol}
          className="py-2 px-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/80 text-xs font-semibold text-zinc-200 transition-all flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Protocol</span>
        </button>
      </div>

      {/* Control Strip: Goal, Weight & Activity Level */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Goal Selector */}
        <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
          <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-emerald-400" /> Primary Conditioning Goal
          </label>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {[
              { id: "hypertrophy", label: "Hypertrophy" },
              { id: "recomp", label: "Recomp" },
              { id: "fat_loss", label: "Fat Loss" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setGoal(item.id as FitnessGoal)}
                className={`py-2 px-1 text-center rounded-lg text-xs font-medium transition-all ${
                  goal === item.id
                    ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-semibold"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Weight Slider */}
        <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
          <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5 text-emerald-400" /> Current Bodyweight
            </span>
            <span className="font-bold text-zinc-100 font-mono text-sm">{weightKg} KG</span>
          </div>
          <input
            type="range"
            min="50"
            max="125"
            step="1"
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer pt-2"
          />
          <div className="flex justify-between text-[10px] font-mono text-zinc-500">
            <span>50 kg</span>
            <span>85 kg</span>
            <span>125 kg</span>
          </div>
        </div>

        {/* Activity Intensity */}
        <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
          <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" /> Weekly Training Volume
          </label>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {[
              { id: "moderate", label: "3-4 Days" },
              { id: "heavy", label: "5-6 Days" },
              { id: "elite", label: "Two-a-Day" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivity(item.id as ActivityLevel)}
                className={`py-2 px-1 text-center rounded-lg text-xs font-medium transition-all ${
                  activity === item.id
                    ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-semibold"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics: Daily Calories & Gram Distribution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Calories */}
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 space-y-1">
          <div className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
            Daily Target Caloric Energy
          </div>
          <div className="text-3xl font-heading font-bold text-zinc-100 font-mono">
            {nutritionPlan.targetCalories.toLocaleString("en-IN")}
            <span className="text-xs font-normal text-zinc-400 ml-1">kcal</span>
          </div>
          <div className="text-[11px] text-emerald-400/90 font-mono pt-1">
            {goal === "hypertrophy"
              ? "+12% Anabolic Hypertrophy Surplus"
              : goal === "fat_loss"
              ? "-18% Lean Adipose Cut Deficit"
              : "Isocaloric Athletic Recomposition"}
          </div>
        </div>

        {/* Protein Target */}
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-emerald-500/30 space-y-1">
          <div className="text-[11px] font-mono uppercase text-emerald-400 tracking-wider flex items-center justify-between">
            <span>Target Protein</span>
            <span>{nutritionPlan.proteinPct}% Cal</span>
          </div>
          <div className="text-3xl font-heading font-bold text-emerald-400 font-mono">
            {nutritionPlan.proteinGrams}
            <span className="text-xs font-normal text-zinc-400 ml-1">g/day</span>
          </div>
          <div className="text-[11px] text-zinc-400 font-mono pt-1">
            {(nutritionPlan.proteinGrams / weightKg).toFixed(1)}g per kg bodyweight
          </div>
        </div>

        {/* Carbohydrates Target */}
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 space-y-1">
          <div className="text-[11px] font-mono uppercase text-blue-400 tracking-wider flex items-center justify-between">
            <span>Glycogen Carbs</span>
            <span>{nutritionPlan.carbPct}% Cal</span>
          </div>
          <div className="text-3xl font-heading font-bold text-blue-400 font-mono">
            {nutritionPlan.carbGrams}
            <span className="text-xs font-normal text-zinc-400 ml-1">g/day</span>
          </div>
          <div className="text-[11px] text-zinc-400 font-mono pt-1">
            Sustained muscular glycogen & ATP
          </div>
        </div>

        {/* Healthy Fats */}
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 space-y-1">
          <div className="text-[11px] font-mono uppercase text-amber-400 tracking-wider flex items-center justify-between">
            <span>Hormonal Fats</span>
            <span>{nutritionPlan.fatPct}% Cal</span>
          </div>
          <div className="text-3xl font-heading font-bold text-amber-400 font-mono">
            {nutritionPlan.fatGrams}
            <span className="text-xs font-normal text-zinc-400 ml-1">g/day</span>
          </div>
          <div className="text-[11px] text-zinc-400 font-mono pt-1">
            Endocrine & testosterone regulation
          </div>
        </div>
      </div>

      {/* Visual Macro Spectrum Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
          <span>Macronutrient Ratio Distribution</span>
          <span className="text-zinc-300 font-semibold">
            {nutritionPlan.proteinPct}% PRO / {nutritionPlan.carbPct}% CHO / {nutritionPlan.fatPct}% FAT
          </span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-zinc-800">
          <div
            style={{ width: `${nutritionPlan.proteinPct}%` }}
            className="h-full bg-emerald-500 transition-all duration-300"
            title={`Protein: ${nutritionPlan.proteinPct}%`}
          />
          <div
            style={{ width: `${nutritionPlan.carbPct}%` }}
            className="h-full bg-blue-500 transition-all duration-300"
            title={`Carbs: ${nutritionPlan.carbPct}%`}
          />
          <div
            style={{ width: `${nutritionPlan.fatPct}%` }}
            className="h-full bg-amber-500 transition-all duration-300"
            title={`Fats: ${nutritionPlan.fatPct}%`}
          />
        </div>
      </div>

      {/* Lower Dual Grid: Nutrient Timing Protocol & Daily Hydration Station */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
        {/* Nutrient Timing Matrix */}
        <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-heading font-bold text-zinc-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Nutrient Timing Protocol
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono">
              ACTIVE PROTOCOL
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <div>
                <span className="font-semibold text-zinc-200">Pre-Workout Window (-90m): </span>
                <span className="text-zinc-400">
                  40g slow carbohydrates (oats/sweet potato) + 30g fast protein. Improves blood amino acid pool.
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
              <div>
                <span className="font-semibold text-zinc-200">Intra-Workout Performance: </span>
                <span className="text-zinc-400">
                  750ml electrolyte fluid (500mg sodium, 200mg potassium) + 5g essential amino acids.
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <div>
                <span className="font-semibold text-zinc-200">Post-Workout Recovery (+30m): </span>
                <span className="text-zinc-400">
                  35g 100% Whey Isolate + 50g glycemic recovery carbs for rapid MPS (Muscle Protein Synthesis) spike.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Cellular Hydration Station */}
        <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-zinc-100 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-400" />
                Cellular Hydration Tracker
              </h3>
              <button
                type="button"
                onClick={handleResetWater}
                className="text-[10px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1 font-mono"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-mono font-bold text-zinc-100">
                  {(waterLoggedMl / 1000).toFixed(2)}
                </span>
                <span className="text-xs text-zinc-400 ml-1 font-mono">
                  / {(nutritionPlan.waterTargetMl / 1000).toFixed(1)} L
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-blue-400">
                {Math.round((waterLoggedMl / nutritionPlan.waterTargetMl) * 100)}% Complete
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-zinc-800 mt-2 overflow-hidden">
              <div
                style={{
                  width: `${Math.min(100, (waterLoggedMl / nutritionPlan.waterTargetMl) * 100)}%`,
                }}
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleLogWater(250)}
              className="flex-1 py-2 px-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> +250ml Glass
            </button>
            <button
              type="button"
              onClick={() => handleLogWater(750)}
              className="flex-1 py-2 px-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-blue-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> +750ml Shaker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
