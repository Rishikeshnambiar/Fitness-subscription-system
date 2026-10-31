"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Sparkles,
  Zap,
  Shield,
  Crown,
  Check,
  ArrowRight,
  TrendingUp,
  CreditCard,
  Percent,
  CheckCircle2,
  Lock,
  Unlock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FacilityZone {
  id: string;
  name: string;
  code: string;
  tagline: string;
  includedInTiers: ("basic" | "pro" | "elite")[];
  addonPriceMonthly: number;
  apparatusCount: string;
  performanceBenefit: string;
  iconName: string;
}

const FACILITY_ZONES: FacilityZone[] = [
  {
    id: "olympic_floor",
    name: "Olympic Free Weight & Power Cage Arena",
    code: "ZONE 01 // HEAVY RESISTANCE",
    tagline: "Commercial 11-gauge power cages, Eleiko calibrated plates, and competition flat benches.",
    includedInTiers: ["basic", "pro", "elite"],
    addonPriceMonthly: 0,
    apparatusCount: "18 Stations",
    performanceBenefit: "+42% Maximal Motor Unit Force",
    iconName: "Dumbbell",
  },
  {
    id: "cable_arena",
    name: "Commercial Functional Cable & Incline Sled Matrix",
    code: "ZONE 02 // GUIDED KINETICS",
    tagline: "Dual-pulley functional cable trainers, 45° linear incline leg presses, and isolateral lever rows.",
    includedInTiers: ["pro", "elite"],
    addonPriceMonthly: 500,
    apparatusCount: "24 Stations",
    performanceBenefit: "+36% Continuous Tension Hypertrophy",
    iconName: "Zap",
  },
  {
    id: "contrast_recovery",
    name: "Contrast Therapy Suite: Sauna & 3°C Cold Plunge",
    code: "ZONE 03 // CELLULAR RECOVERY",
    tagline: "Finnish dry sauna (90°C), ice cold immersion tubs (3°C), and normatec compression lounge.",
    includedInTiers: ["pro", "elite"],
    addonPriceMonthly: 600,
    apparatusCount: "Private Recovery Cabins",
    performanceBenefit: "-68% DOMS & +2.4x Parasympathetic Reset",
    iconName: "Sparkles",
  },
  {
    id: "master_coaching",
    name: "1-on-1 Biomechanics Master Coaching & Bod Pod",
    code: "ZONE 04 // ELITE GUIDANCE",
    tagline: "Weekly private movement analysis with Tier-3 coaches and monthly air-displacement body composition scans.",
    includedInTiers: ["elite"],
    addonPriceMonthly: 1200,
    apparatusCount: "Dedicated Coaching Cage",
    performanceBenefit: "+88% Accountability & Rapid Form Mastery",
    iconName: "Crown",
  },
];

export default function InteractiveClubConfigurator() {
  const [selectedTier, setSelectedTier] = useState<"basic" | "pro" | "elite">("pro");
  const [activeAddons, setActiveAddons] = useState<string[]>([]);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "annual">("quarterly");
  const [useInstallment, setUseInstallment] = useState<boolean>(true);

  // Toggle optional addon zones
  const toggleAddon = (zoneId: string) => {
    setActiveAddons((prev) =>
      prev.includes(zoneId) ? prev.filter((id) => id !== zoneId) : [...prev, zoneId]
    );
  };

  // Dynamic Financial Math
  const financialSummary = useMemo(() => {
    const tierBaseRates: Record<"basic" | "pro" | "elite", { monthly: number; name: string; discountPct: number }> = {
      basic: { monthly: 1499, name: "Foundation Tier", discountPct: 0 },
      pro: { monthly: 2499, name: "Athlete Pro", discountPct: 12 },
      elite: { monthly: 4999, name: "Executive Elite", discountPct: 20 },
    };

    const tierInfo = tierBaseRates[selectedTier];
    let monthlyAddonTotal = 0;

    FACILITY_ZONES.forEach((zone) => {
      // If not included in current tier but selected as an add-on
      if (!zone.includedInTiers.includes(selectedTier) && activeAddons.includes(zone.id)) {
        monthlyAddonTotal += zone.addonPriceMonthly;
      }
    });

    const combinedMonthly = tierInfo.monthly + monthlyAddonTotal;
    const months = billingCycle === "monthly" ? 1 : billingCycle === "quarterly" ? 3 : 12;

    const termDiscountPct =
      billingCycle === "annual" ? 32 : billingCycle === "quarterly" ? tierInfo.discountPct : 0;

    const grossTotal = combinedMonthly * months;
    const discountAmount = Math.round(grossTotal * (termDiscountPct / 100));
    const finalTotal = grossTotal - discountAmount;

    // Milestone Installment (50% upfront, 50% remaining)
    const upfrontPayment = useInstallment ? Math.round(finalTotal * 0.5) : finalTotal;
    const remainingBalance = finalTotal - upfrontPayment;

    // Projected Athletic Growth Index
    const totalUnlockedZones = FACILITY_ZONES.filter(
      (z) => z.includedInTiers.includes(selectedTier) || activeAddons.includes(z.id)
    ).length;
    const athleticIndex = Math.min(100, 55 + totalUnlockedZones * 11.25);

    return {
      tierName: tierInfo.name,
      months,
      combinedMonthly,
      grossTotal,
      termDiscountPct,
      discountAmount,
      finalTotal,
      upfrontPayment,
      remainingBalance,
      athleticIndex,
      totalUnlockedZones,
    };
  }, [selectedTier, activeAddons, billingCycle, useInstallment]);

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 font-mono">
          <Sparkles className="w-3.5 h-3.5" /> INTERACTIVE CLUB CONFIGURATOR // 2026
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-zinc-100">
          Build Your Custom Athletic Architecture
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto font-sans leading-relaxed">
          Configure your access privileges across our commercial gym floor, contrast recovery suites, and coaching cages with live dynamic billing, term discounts, and 50% milestone installments.
        </p>
      </div>

      {/* Main Dual Grid: Interactive Zone Selector + Live Commercial Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN (7 COLS): Zone Toggles & Base Tier Selector */}
        <div className="lg:col-span-7 space-y-6">
          {/* Base Tier Selector Strip */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Select Base Membership Tier
              </span>
              <span className="text-[11px] font-mono text-emerald-400">
                GSTIN: 27AAWCA1536C1ZP
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "basic", label: "Foundation", rate: "₹1,499/mo", icon: Shield },
                { id: "pro", label: "Athlete Pro", rate: "₹2,499/mo", icon: Zap, popular: true },
                { id: "elite", label: "Executive Elite", rate: "₹4,999/mo", icon: Crown },
              ].map((tier) => {
                const isSelected = selectedTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setSelectedTier(tier.id as "basic" | "pro" | "elite");
                      setActiveAddons([]);
                    }}
                    className={cn(
                      "p-3 rounded-xl border text-left transition-all relative overflow-hidden",
                      isSelected
                        ? "bg-zinc-800 border-emerald-500/90 text-zinc-100 shadow-md ring-1 ring-emerald-500/50"
                        : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                    )}
                  >
                    {tier.popular && (
                      <span className="absolute top-1.5 right-1.5 text-[8px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        RECOMMENDED
                      </span>
                    )}
                    <tier.icon className={cn("w-4 h-4 mb-1.5", isSelected ? "text-emerald-400" : "text-zinc-500")} />
                    <div className="text-xs font-heading font-bold">{tier.label}</div>
                    <div className="text-[11px] font-mono text-zinc-400 mt-0.5">{tier.rate}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Facility Zones Interactive Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Facility Zones & Apparatus Privileges:
              </span>
              <span className="text-[11px] font-mono text-zinc-500">
                {financialSummary.totalUnlockedZones} of 4 Zones Active
              </span>
            </div>

            <div className="space-y-3">
              {FACILITY_ZONES.map((zone) => {
                const isIncludedInBase = zone.includedInTiers.includes(selectedTier);
                const isAddonActive = activeAddons.includes(zone.id);
                const isUnlocked = isIncludedInBase || isAddonActive;

                return (
                  <div
                    key={zone.id}
                    className={cn(
                      "p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative",
                      isUnlocked
                        ? "bg-zinc-900/80 border-emerald-500/40 shadow-sm"
                        : "bg-zinc-950/50 border-zinc-800/80 opacity-75 hover:opacity-100 hover:border-zinc-700"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "text-[10px] font-mono font-semibold px-2 py-0.5 rounded",
                              isUnlocked
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                            )}
                          >
                            {zone.code}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {zone.apparatusCount}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-heading font-bold text-zinc-100">
                          {zone.name}
                        </h4>
                        <p className="text-xs text-zinc-400 max-w-lg">
                          {zone.tagline}
                        </p>
                        <div className="text-[11px] font-mono text-emerald-400 font-medium pt-1">
                          {zone.performanceBenefit}
                        </div>
                      </div>

                      {/* State Action Pill */}
                      <div className="shrink-0 self-start sm:self-center">
                        {isIncludedInBase ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>INCLUDED IN TIER</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleAddon(zone.id)}
                            className={cn(
                              "px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 border",
                              isAddonActive
                                ? "bg-emerald-500 text-zinc-950 border-emerald-400 shadow-sm"
                                : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700"
                            )}
                          >
                            {isAddonActive ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>ADD-ON ACTIVE</span>
                              </>
                            ) : (
                              <>
                                <span>+₹{zone.addonPriceMonthly}/mo Add-on</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 COLS): Dynamic Financial Ledger & Checkout Engine */}
        <div className="lg:col-span-5 space-y-5 sticky top-28">
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800/90 shadow-2xl backdrop-blur-xl space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                  DYNAMIC CONTRACT SUMMARY
                </span>
                <h3 className="text-lg font-heading font-bold text-zinc-100">
                  {financialSummary.tierName}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-zinc-400 block">ATHLETIC SCORE</span>
                <span className="text-lg font-mono font-bold text-emerald-400">
                  {financialSummary.athleticIndex.toFixed(0)}/100
                </span>
              </div>
            </div>

            {/* Term Commitment Switcher */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider block">
                Billing Commitment Term:
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs font-mono">
                {[
                  { id: "monthly", label: "1 Month", disc: "0%" },
                  { id: "quarterly", label: "3 Months", disc: "12% Off" },
                  { id: "annual", label: "12 Months", disc: "32% Off" },
                ].map((term) => (
                  <button
                    key={term.id}
                    type="button"
                    onClick={() => setBillingCycle(term.id as "monthly" | "quarterly" | "annual")}
                    className={cn(
                      "py-2 px-1 text-center rounded-lg transition-all",
                      billingCycle === term.id
                        ? "bg-zinc-800 text-emerald-400 font-bold border border-zinc-700 shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    <div>{term.label}</div>
                    <div className="text-[9px] text-zinc-500 font-normal">{term.disc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Assessment Requirement: 50% Milestone Installment Toggle */}
            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-300 font-semibold flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                  Milestone Installment Option
                </span>
                <button
                  type="button"
                  onClick={() => setUseInstallment(!useInstallment)}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative focus:outline-none",
                    useInstallment ? "bg-emerald-500" : "bg-zinc-800"
                  )}
                >
                  <span
                    className={cn(
                      "w-4 h-4 rounded-full bg-zinc-950 absolute top-1 transition-transform",
                      useInstallment ? "right-1" : "left-1"
                    )}
                  />
                </button>
              </div>
              <p className="text-[11px] text-zinc-400">
                Pay 50% upfront to immediately activate gym turnstiles. Settle remaining 50% within 30 days via `/billing`.
              </p>
            </div>

            {/* Math Breakdown Ledger */}
            <div className="space-y-2 text-xs font-mono border-t border-zinc-800 pt-4">
              <div className="flex justify-between text-zinc-400">
                <span>Calculated Monthly Rate:</span>
                <span className="text-zinc-200">₹{financialSummary.combinedMonthly.toLocaleString("en-IN")}/mo</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Term Duration ({financialSummary.months} Months):</span>
                <span className="text-zinc-200">₹{financialSummary.grossTotal.toLocaleString("en-IN")}</span>
              </div>
              {financialSummary.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Term Discount ({financialSummary.termDiscountPct}%):</span>
                  <span>-₹{financialSummary.discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-200 font-bold border-t border-zinc-800/80 pt-2 text-sm">
                <span>Final Contract Total:</span>
                <span>₹{financialSummary.finalTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Due Now vs Balance Due */}
            {useInstallment && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono space-y-1">
                <div className="flex justify-between font-bold text-emerald-400 text-sm">
                  <span>Due Today (50% Milestone):</span>
                  <span>₹{financialSummary.upfrontPayment.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-zinc-400 text-[11px]">
                  <span>Remaining Installment Balance:</span>
                  <span>₹{financialSummary.remainingBalance.toLocaleString("en-IN")}</span>
                </div>
              </div>
            )}

            {/* Direct Checkout CTA */}
            <Link
              href={`/checkout/${selectedTier}`}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span>ACTIVATE CONFIGURED PROTOCOL</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="text-[10px] font-mono text-center text-zinc-500 space-y-1">
              <div>AgarkarMedia Pvt. Ltd. • SAC 999723 • GSTIN 27AAWCA1536C1ZP</div>
              <div>Instant NFC mobile pass issued upon checkout.</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
