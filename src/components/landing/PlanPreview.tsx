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
  accentColor: string;
  icon: typeof Shield;
}

const plans: PlanItem[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Ideal for beginners starting their journey",
    monthlyPrice: 999,
    annualMonthlyPrice: 799,
    duration: "month",
    icon: Shield,
    accentColor: "#00f0ff",
    ctaText: "Start with Basic",
    features: [
      { text: "Full gym floor & cardio zone access", included: true },
      { text: "Standard locker & shower facilities", included: true },
      { text: "Initial 1-on-1 fitness assessment", included: true },
      { text: "HyperGym mobile app workout log", included: true },
      { text: "Free high-speed Wi-Fi & locker key", included: true },
      { text: "Access during off-peak hours only", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "The optimal choice for committed fitness athletes",
    popular: true,
    monthlyPrice: 1999,
    annualMonthlyPrice: 1599,
    duration: "month",
    badge: "Most Popular",
    icon: Zap,
    accentColor: "#00f0ff",
    ctaText: "Get Pro Access",
    features: [
      { text: "All Basic tier features included", included: true },
      { text: "Unlimited 24/7 access to all 12+ clubs", included: true },
      { text: "2 Monthly 1-on-1 personal trainer sessions", included: true },
      { text: "Access to sauna, steam & recovery cold plunge", included: true },
      { text: "Custom nutrition & diet planning via app", included: true },
      { text: "Priority reservation for group HIIT & Spin classes", included: true },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    tagline: "The ultimate VIP athletic & lifestyle experience",
    monthlyPrice: 3999,
    annualMonthlyPrice: 3199,
    duration: "month",
    badge: "VIP Tier",
    icon: Crown,
    accentColor: "#ffd700",
    ctaText: "Join Elite Club",
    features: [
      { text: "All Pro tier benefits & all club access", included: true },
      { text: "Unlimited 1-on-1 sessions with Master Trainers", included: true },
      { text: "Private VIP locker, laundry service & valet parking", included: true },
      { text: "Bi-weekly 3D biometric body scan & progress report", included: true },
      { text: "Complimentary weekly sports massage & hydrotherapy", included: true },
      { text: "Unlimited guest passes for workout partners", included: true },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
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

  return (
    <section
      id="plans"
      className={cn(
        "relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] overflow-hidden",
        className
      )}
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#00f0ff]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#ff006e]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(0,240,255,0.08)] border border-[rgba(0,240,255,0.2)] text-[#00f0ff] text-xs sm:text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Memberships</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-[#f0f0f5] mb-5">
            Choose Your Path to{" "}
            <span className="bg-gradient-to-r from-[#00f0ff] via-[#d946ef] to-[#ff006e] bg-clip-text text-transparent">
              Greatness
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#8888a0] leading-relaxed">
            Transparent pricing with no hidden registration fees. Upgrade, downgrade,
            or pause anytime with our flexible digital membership portal.
          </p>

          {/* Billing Toggle (Monthly / Annual) */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-[#1a1a2e]/80 border border-[rgba(255,255,255,0.08)] backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300",
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-[#00f0ff] to-[#0099ff] text-[#0a0a0f] shadow-[0_0_15px_rgba(0,240,255,0.3)] font-semibold"
                  : "text-[#8888a0] hover:text-[#f0f0f5]"
              )}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1.5",
                billingCycle === "annual"
                  ? "bg-gradient-to-r from-[#00f0ff] to-[#0099ff] text-[#0a0a0f] shadow-[0_0_15px_rgba(0,240,255,0.3)] font-semibold"
                  : "text-[#8888a0] hover:text-[#f0f0f5]"
              )}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#ff006e] text-white">
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
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4"
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
                whileHover={{
                  y: isPro ? -14 : -8,
                  scale: isPro ? 1.03 : 1.02,
                  transition: { duration: 0.3 },
                }}
                className={cn(
                  "relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-300",
                  // Glassmorphism effect
                  "bg-[#1a1a2e]/60 backdrop-blur-2xl",
                  // Pro card elevated styling with glowing cyan border
                  isPro
                    ? "lg:-translate-y-4 border-2 border-[#00f0ff]/60 shadow-[0_0_40px_rgba(0,240,255,0.25)] z-20"
                    : plan.id === "elite"
                    ? "border border-[#ffd700]/30 shadow-[0_0_25px_rgba(255,215,0,0.1)] hover:border-[#ffd700]/60 hover:shadow-[0_0_35px_rgba(255,215,0,0.2)]"
                    : "border border-white/10 hover:border-[#00f0ff]/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
                )}
              >
                {/* Most Popular Badge for Pro */}
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#0a0a0f] bg-gradient-to-r from-[#00f0ff] via-[#4de8ff] to-[#ff006e] shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* VIP Badge for Elite */}
                {plan.id === "elite" && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#0a0a0f] bg-gradient-to-r from-[#ffd700] to-[#ffae00] shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                      <Crown className="w-3 h-3 fill-current" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Card Top: Plan Title, Price, Description */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${plan.accentColor}18`,
                          border: `1px solid ${plan.accentColor}33`,
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: plan.accentColor }}
                        />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-[#f0f0f5]">
                        {plan.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-[#8888a0] min-h-[40px] leading-relaxed mb-6">
                    {plan.tagline}
                  </p>

                  {/* Price Tag */}
                  <div className="flex items-baseline gap-1.5 mb-2 pb-6 border-b border-[rgba(255,255,255,0.08)]">
                    <span className="text-sm font-medium text-[#8888a0]">₹</span>
                    <span className="text-4xl sm:text-5xl font-heading font-extrabold text-[#f0f0f5] font-price tracking-tight">
                      {currentPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm font-normal text-[#8888a0]">
                      /mo
                    </span>
                    {billingCycle === "annual" && (
                      <span className="ml-auto text-xs font-medium text-[#00f0ff] bg-[rgba(0,240,255,0.1)] px-2.5 py-1 rounded-full border border-[rgba(0,240,255,0.2)]">
                        Billed yearly
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="py-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#8888a0] mb-3">
                      Included with {plan.name}:
                    </div>
                    <ul className="space-y-3.5">
                      {plan.features.map((feature) => (
                        <li
                          key={feature.text}
                          className="flex items-start gap-3 text-sm"
                        >
                          <div
                            className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                              feature.included
                                ? isPro
                                  ? "bg-[#00f0ff]/20 text-[#00f0ff]"
                                  : plan.id === "elite"
                                  ? "bg-[#ffd700]/20 text-[#ffd700]"
                                  : "bg-white/10 text-[#00f0ff]"
                                : "bg-white/5 text-[#8888a0]/40"
                            )}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                          <span
                            className={cn(
                              "leading-tight",
                              feature.included
                                ? "text-[#f0f0f5]"
                                : "text-[#8888a0]/50 line-through"
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
                        "w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2",
                        isPro
                          ? "bg-gradient-to-r from-[#00f0ff] to-[#ff006e] text-white shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(255,0,110,0.5)] hover:scale-[1.02]"
                          : plan.id === "elite"
                          ? "bg-gradient-to-r from-[#ffd700] to-[#ff9500] text-[#0a0a0f] shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-[1.02]"
                          : "bg-white/[0.05] border border-white/15 text-[#f0f0f5] hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/50 hover:text-[#00f0ff]"
                      )}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      href={`/sign-up?plan=${plan.id}&billing=${billingCycle}`}
                      className={cn(
                        "w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2",
                        isPro
                          ? "bg-gradient-to-r from-[#00f0ff] to-[#ff006e] text-white shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(255,0,110,0.5)] hover:scale-[1.02]"
                          : plan.id === "elite"
                          ? "bg-gradient-to-r from-[#ffd700] to-[#ff9500] text-[#0a0a0f] shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-[1.02]"
                          : "bg-white/[0.05] border border-white/15 text-[#f0f0f5] hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/50 hover:text-[#00f0ff]"
                      )}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                  <p className="text-[11px] text-center text-[#8888a0] mt-2.5">
                    Cancel or modify membership at any time
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
