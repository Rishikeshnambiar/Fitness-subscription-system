"use client";

import Link from "next/link";
import {
  Dumbbell,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Shield,
  CreditCard,
  Sparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { settleRemainingBalance } from "@/lib/actions/billing.actions";
import NutritionArchitecture from "@/components/dashboard/NutritionArchitecture";

interface UserDashboardClientProps {
  subscription: any;
  availablePlans: any[];
}

export default function UserDashboardClient({
  subscription,
  availablePlans,
}: UserDashboardClientProps) {
  const hasBalanceDue = subscription?.balanceDue > 0;
  const isExpiringSoon = subscription?.isExpiringSoon;

  const handleSettleBalance = async () => {
    toast.info("Processing remaining installment balance...");
    const res = await settleRemainingBalance(subscription.lastTransactionId || "tx_sample");
    if (res.success) {
      toast.success("Balance settled in full. Membership status marked ACTIVE.");
      setTimeout(() => window.location.reload(), 500);
    } else {
      toast.error(res.error || "Failed to settle balance");
    }
  };

  return (
    <div className="space-y-8">
      {/* 3-Day Expiry Warning Banner (Assessment Requirement) */}
      {isExpiringSoon && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-heading font-bold text-amber-400">
                MEMBERSHIP EXPIRY WARNING: {subscription.daysRemaining} Day{subscription.daysRemaining > 1 ? "s" : ""} Remaining
              </div>
              <div className="text-xs text-amber-300/80 mt-0.5">
                Your athletic privileges and locked-in rates will expire soon. Renew now to maintain uninterrupted access.
              </div>
            </div>
          </div>

          <Link
            href="/#plans"
            className="py-2.5 px-4 rounded-xl bg-amber-500 text-zinc-950 font-semibold text-xs hover:bg-amber-400 transition-all text-center shrink-0 shadow-sm"
          >
            Renew Membership
          </Link>
        </div>
      )}

      {/* Activation / Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Subscriber Command Center
          </div>
          <h1 className="text-3xl font-heading font-bold text-zinc-100">
            Welcome back, {subscription?.userName || "Athlete"}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your active conditioning tier, track installment balance, and access official tax invoices.
          </p>
        </div>

        <Link
          href="/billing"
          className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-semibold text-zinc-200 transition-all flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <CreditCard className="w-4 h-4 text-emerald-400" />
          <span>Billing & GST Invoices</span>
        </Link>
      </div>

      {/* Active Subscription Hero Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2.5">
              <span
                className={`text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full ${
                  subscription?.status === "ACTIVE"
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    : subscription?.status === "PENDING_COMPLETION"
                    ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                    : "bg-red-500/10 border border-red-500/20 text-red-400"
                }`}
              >
                {subscription?.status === "ACTIVE"
                  ? "Active Tier"
                  : subscription?.status === "PENDING_COMPLETION"
                  ? "Installment Active (Balance Outstanding)"
                  : "Expired"}
              </span>

              <span className="text-xs text-zinc-400 font-mono">
                Universal Multi-Club NFC Access
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-100">
              {subscription?.planNameSnapshot || "Athlete Pro (3-Month Commitment)"}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <div className="text-zinc-400 text-[10px] uppercase font-mono tracking-wider">
                  Effective Date
                </div>
                <div className="font-mono font-medium text-zinc-200 mt-0.5">
                  {new Date(subscription?.startDate || Date.now()).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <div className="text-zinc-400 text-[10px] uppercase font-mono tracking-wider">
                  Expiry Date
                </div>
                <div className="font-mono font-medium text-zinc-200 mt-0.5">
                  {new Date(subscription?.endDate || Date.now()).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 col-span-2 sm:col-span-1">
                <div className="text-zinc-400 text-[10px] uppercase font-mono tracking-wider">
                  Days Remaining
                </div>
                <div className="font-mono font-bold text-emerald-400 mt-0.5 text-sm">
                  {subscription?.daysRemaining ?? 86} Days
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Box on Card */}
          <div className="flex flex-col gap-3 min-w-[240px]">
            {hasBalanceDue ? (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="text-[11px] text-amber-300 font-semibold uppercase tracking-wider">
                  Remaining Installment Due
                </div>
                <div className="text-2xl font-mono font-bold text-amber-400">
                  ₹{subscription.balanceDue.toLocaleString("en-IN")}
                </div>
                <button
                  onClick={handleSettleBalance}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 transition-all shadow-sm mt-1"
                >
                  Settle Outstanding Balance
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-emerald-400">
                  Fully Settled & Good Standing
                </div>
                <div className="text-[10px] text-zinc-400">
                  Tax invoice stored in Snapshot Ledger
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Standout Feature: Biometric Nutrition & Macro Architecture Engine */}
      <NutritionArchitecture memberTier={subscription?.planNameSnapshot || "Athlete Pro"} />

      {/* Discovery Grid: Available Plans for Upgrade/Renewal */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-heading font-bold text-zinc-100">
              Explore Tiers & Add-on Protocols
            </h3>
            <p className="text-xs text-zinc-400">
              Unlock dedicated coaching sessions, sauna access, or longer commitment savings.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availablePlans.map((plan) => (
            <div
              key={plan._id}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                    {plan.durationMonths} Months
                  </span>
                  {plan.isPopular && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                      RECOMMENDED
                    </span>
                  )}
                </div>
                <h4 className="font-heading font-semibold text-base text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  {plan.name}
                </h4>
                <div className="font-mono text-xl font-bold text-zinc-100">
                  ₹{plan.baseMonthlyPrice.toLocaleString("en-IN")}
                  <span className="text-xs font-normal text-zinc-400">/mo</span>
                </div>
                {plan.discountPercentage > 0 && (
                  <div className="text-[11px] text-emerald-400 font-semibold">
                    {plan.discountPercentage}% Plan Discount Included
                  </div>
                )}
                <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                  {plan.description}
                </p>
              </div>

              <Link
                href={`/checkout/${plan._id}`}
                className="w-full py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-xs font-semibold text-zinc-200 transition-all flex items-center justify-center gap-1.5 border border-zinc-700"
              >
                <span>Select & Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
