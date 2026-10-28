"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import {
  Check,
  Zap,
  Crown,
  Shield,
  ArrowRight,
  Sparkles,
  Calculator,
  TrendingUp,
  Percent,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PlanItem {
  id: "basic" | "pro" | "elite";
  name: string;
  tagline: string;
  popular?: boolean;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  duration: string;
  badge?: string;
  features: PlanFeature[];
  ctaText: string;
  icon: typeof Shield;
}

const plans: PlanItem[] = [
  {
    id: "basic",
    name: "Foundation",
    tagline: "Essential access for consistent personal conditioning",
    monthlyPrice: 1499,
    annualMonthlyPrice: 1199,
    duration: "month",
    icon: Shield,
    ctaText: "Select Foundation",
    features: [
      { text: "Full gym floor & Olympic lifting zone access", included: true },
      { text: "Smart locker & rainfall shower suites", included: true },
      { text: "Biometric body composition scan on onboarding", included: true },
      { text: "HyperGym performance tracking mobile app", included: true },
      { text: "High-speed Wi-Fi & chilled towel service", included: true },
      { text: "Peak hours access (6 AM - 10 PM)", included: false },
    ],
  },
  {
    id: "pro",
    name: "Athlete Pro",
    tagline: "Unrestricted multi-facility access with recovery suites",
    popular: true,
    monthlyPrice: 2499,
    annualMonthlyPrice: 1999,
    duration: "month",
    badge: "Most Selected",
    icon: Zap,
    ctaText: "Start Pro Trial",
    features: [
      { text: "All Foundation tier privileges included", included: true },
      { text: "24/7 unlimited access across all 12 metro clubs", included: true },
      { text: "2 Monthly 1-on-1 performance coaching sessions", included: true },
      { text: "Contrast therapy: Finnish sauna & cold plunge pool", included: true },
      { text: "Precision macronutrient & nutrition programming", included: true },
      { text: "Priority reservation for HIIT & hybrid training", included: true },
    ],
  },
  {
    id: "elite",
    name: "Executive Elite",
    tagline: "The pinnacle athletic lifestyle and dedicated master coaching",
    monthlyPrice: 4999,
    annualMonthlyPrice: 3999,
    duration: "month",
    badge: "VIP Club",
    icon: Crown,
    ctaText: "Join Executive Elite",
    features: [
      { text: "All Athlete Pro benefits with universal tier access", included: true },
      { text: "Dedicated Tier-3 Master Trainer (weekly 1-on-1)", included: true },
      { text: "Permanent private VIP locker & daily laundry care", included: true },
      { text: "Bi-weekly DEXA body composition & blood lactate check", included: true },
      { text: "Weekly percussive therapy & sports recovery massage", included: true },
      { text: "Unlimited guest passes for workout partners", included: true },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface PlanPreviewProps {
  onSelectPlan?: (planId: string) => void;
  className?: string;
}

export default function PlanPreview({
  onSelectPlan,
  className,
}: PlanPreviewProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState<number>(4);

  // Financial ROI Math
  const activePlanPrice = billingCycle === "annual" ? 1999 : 2499; // Pro plan benchmark
  const monthlyWorkouts = workoutsPerWeek * 4.33;
  const costPerWorkout = Math.round(activePlanPrice / Math.max(1, monthlyWorkouts));
  const boutiqueDayPassCost = 650; // standard market drop-in rate in INR
  const monthlySavings = Math.round(monthlyWorkouts * boutiqueDayPassCost - activePlanPrice);
  const annualSavings = monthlySavings * 12;

  return (
    <section
      id="plans"
      className={cn(
        "relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden border-t border-zinc-900/60",
        className
      )}
    >
      {/* Subtle radial ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Structured Membership Tiers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-zinc-100 mb-4">
            Transparent Investment in Your Longevity.
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Choose the membership tier aligned with your athletic objectives.
            All plans include GST, zero lock-in contracts, and partial installment options.
          </p>

          {/* Billing Toggle (Monthly / Annual) */}
          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-5 py-2 rounded-lg text-xs font-medium transition-all duration-200",
                billingCycle === "monthly"
                  ? "bg-zinc-800 text-zinc-100 shadow-sm font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "px-5 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5",
                billingCycle === "annual"
                  ? "bg-zinc-800 text-zinc-100 shadow-sm font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* 3 Plan Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch pt-2 mb-16"
        >
          {plans.map((plan) => {
            const isPro = plan.popular;
            const currentPrice =
              billingCycle === "annual"
                ? plan.annualMonthlyPrice
                : plan.monthlyPrice;
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                className={cn(
                  "relative flex flex-col justify-between rounded-2xl p-7 transition-all duration-300",
                  "bg-zinc-900/60 backdrop-blur-xl",
                  isPro
                    ? "border-2 border-emerald-500/60 shadow-xl shadow-emerald-950/20 lg:-translate-y-2 bg-gradient-to-b from-zinc-900/90 to-zinc-900/50"
                    : "border border-zinc-800/80 hover:border-zinc-700"
                )}
              >
                {/* Most Popular Badge for Pro */}
                {isPro && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-emerald-950 bg-emerald-400 shadow-md">
                      <Zap className="w-3 h-3 fill-current" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Card Top: Plan Title, Price, Description */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center border",
                          isPro
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-zinc-800 border-zinc-700 text-zinc-300"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-semibold text-zinc-100">
                          {plan.name}
                        </h3>
                        <span className="text-xs text-zinc-500 font-mono">
                          {billingCycle === "annual" ? "Annual Commitment" : "Monthly Recurring"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 min-h-[36px] leading-relaxed mb-6">
                    {plan.tagline}
                  </p>

                  {/* Price Tag */}
                  <div className="flex items-baseline gap-1.5 mb-2 pb-6 border-b border-zinc-800/80">
                    <span className="text-sm font-medium text-zinc-400">₹</span>
                    <span className="text-4xl font-heading font-extrabold text-zinc-100 tracking-tight font-mono">
                      {currentPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs font-normal text-zinc-400">
                      / month
                    </span>
                    {billingCycle === "annual" && (
                      <span className="ml-auto text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        Billed Annually
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="py-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-3.5">
                      Included with {plan.name}:
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature.text}
                          className="flex items-start gap-2.5 text-xs"
                        >
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                              feature.included
                                ? isPro
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-zinc-800 text-zinc-300"
                                : "bg-zinc-900 text-zinc-600"
                            )}
                          >
                            <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                          </div>
                          <span
                            className={cn(
                              "leading-tight",
                              feature.included
                                ? "text-zinc-300"
                                : "text-zinc-600 line-through"
                            )}
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom CTA Button */}
                <div className="mt-8 pt-4">
                  {onSelectPlan ? (
                    <button
                      type="button"
                      onClick={() => onSelectPlan(plan.id)}
                      className={cn(
                        "w-full py-3 px-5 rounded-xl font-medium text-xs transition-all duration-200 flex items-center justify-center gap-2",
                        isPro
                          ? "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold shadow-sm"
                          : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/80"
                      )}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <Link
                      href={`/checkout/${plan.id}`}
                      className={cn(
                        "w-full py-3 px-5 rounded-xl font-medium text-xs transition-all duration-200 flex items-center justify-center gap-2",
                        isPro
                          ? "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold shadow-sm"
                          : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/80"
                      )}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  <p className="text-[11px] text-center text-zinc-400 mt-2.5">
                    Supports 100% full or 50% partial milestone checkout
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* STANDOUT TPM FEATURE: Interactive Membership ROI & Cost Per Workout Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl p-6 sm:p-8 max-w-4xl mx-auto shadow-lg"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                  Membership ROI & Unit Economics
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-emerald-400 border border-zinc-700">
                    Live Model
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Calculate your true cost-per-session versus ad-hoc boutique drop-in rates (₹650/session).
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-zinc-400 block">Benchmark Tier</span>
              <span className="text-xs font-semibold text-zinc-200">Athlete Pro (₹{activePlanPrice}/mo)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label
                  htmlFor="roi-workouts-slider"
                  className="text-xs font-medium text-zinc-300"
                >
                  Your Planned Frequency:
                </label>
                <span className="text-sm font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                  {workoutsPerWeek} Days / Week
                </span>
              </div>
              <input
                id="roi-workouts-slider"
                type="range"
                min="1"
                max="6"
                step="1"
                value={workoutsPerWeek}
                onChange={(e) => setWorkoutsPerWeek(Number(e.target.value))}
                aria-label="Planned workouts per week"
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-2">
                <span>1 day (Casual)</span>
                <span>3-4 days (Athletic)</span>
                <span>6 days (Elite)</span>
              </div>

              <div className="mt-5 p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-400 space-y-1.5">
                <div className="flex justify-between">
                  <span>Sessions per month:</span>
                  <span className="text-zinc-200 font-mono">{Math.round(monthlyWorkouts)} sessions</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Drop-In Market Equivalent:</span>
                  <span className="text-zinc-200 font-mono">₹{(Math.round(monthlyWorkouts) * boutiqueDayPassCost).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Live KPI Cards */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/90 text-center">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                  Cost Per Session
                </span>
                <span className="text-2xl font-mono font-bold text-zinc-100">
                  ₹{costPerWorkout}
                </span>
                <span className="text-[10px] text-emerald-400 block mt-1">
                  vs ₹650 drop-in
                </span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-emerald-500/30 text-center relative overflow-hidden">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                  Estimated Annual Savings
                </span>
                <span className="text-2xl font-mono font-bold text-emerald-400">
                  ₹{annualSavings.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-zinc-400 block mt-1 flex items-center justify-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />
                  Positive ROI
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
