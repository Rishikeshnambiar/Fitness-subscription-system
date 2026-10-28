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
      toast.success("Balance settled! Membership is now 100% active.");
      setTimeout(() => window.location.reload(), 500);
    } else {
      toast.error(res.error || "Failed to settle balance");
    }
  };

  return (
    <div className="space-y-8">
      {/* 3-Day Expiry Warning Banner */}
      {isExpiringSoon && (
        <div className="p-4 sm:p-5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-heading font-bold text-red-400">
                CRITICAL MEMBERSHIP ALERT: Expiring in {subscription.daysRemaining} Day{subscription.daysRemaining > 1 ? "s" : ""}!
              </div>
              <div className="text-xs text-red-300/80 mt-0.5">
                Your athletic privileges and locked-in rates will lapse. Renew immediately to preserve member status.
              </div>
            </div>
          </div>

          <Link
            href="/#plans"
            className="py-2.5 px-4 rounded-xl bg-red-500 text-white font-semibold text-xs hover:bg-red-600 transition-all text-center shrink-0 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          >
            Renew Subscription
          </Link>
        </div>
      )}

      {/* Activation / Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-xs font-semibold text-[#00f0ff] mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Athlete Command Center
          </div>
          <h1 className="text-3xl font-heading font-bold text-[#f0f0f5]">
            Welcome back, {subscription?.userName || "Athlete"}
          </h1>
          <p className="text-xs text-[#8888a0] mt-1">
            Manage your active membership, monitor billing snapshots, and discover training upgrades.
          </p>
        </div>

        <Link
          href="/billing"
          className="py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-[#f0f0f5] transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <CreditCard className="w-4 h-4 text-[#00f0ff]" />
          <span>Invoices & Billing History</span>
        </Link>
      </div>

      {/* Active Subscription Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#12121a] via-[#1a1a2e] to-[#0a0a0f] border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00f0ff]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2.5">
              <span
                className={`text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full ${
                  subscription?.status === "ACTIVE"
                    ? "bg-[#00e676]/10 border border-[#00e676]/30 text-[#00e676]"
                    : subscription?.status === "PENDING_COMPLETION"
                    ? "bg-[#ffd700]/10 border border-[#ffd700]/30 text-[#ffd700]"
                    : "bg-red-500/10 border border-red-500/30 text-red-400"
                }`}
              >
                {subscription?.status === "ACTIVE"
                  ? "Active Membership"
                  : subscription?.status === "PENDING_COMPLETION"
                  ? "Installment Active (Balance Pending)"
                  : "Expired"}
              </span>

              <span className="text-xs text-[#8888a0]">
                All 12 Clubs Open 24/7
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#f0f0f5]">
              {subscription?.planNameSnapshot || "Pro Hypertrophy (3-Month)"}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[#8888a0] text-[10px] uppercase tracking-wider">
                  Started
                </div>
                <div className="font-mono font-medium text-[#f0f0f5] mt-0.5">
                  {new Date(subscription?.startDate || Date.now()).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[#8888a0] text-[10px] uppercase tracking-wider">
                  Valid Until
                </div>
                <div className="font-mono font-medium text-[#f0f0f5] mt-0.5">
                  {new Date(subscription?.endDate || Date.now()).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 col-span-2 sm:col-span-1">
                <div className="text-[#8888a0] text-[10px] uppercase tracking-wider">
                  Days Remaining
                </div>
                <div className="font-mono font-bold text-[#00f0ff] mt-0.5 text-sm">
                  {subscription?.daysRemaining ?? 86} Days
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Box on Card */}
          <div className="flex flex-col gap-3 min-w-[240px]">
            {hasBalanceDue ? (
              <div className="p-4 rounded-2xl bg-[#ffd700]/10 border border-[#ffd700]/30 space-y-2">
                <div className="text-[11px] text-[#ffd700] font-semibold uppercase tracking-wider">
                  Remaining Installment Due
                </div>
                <div className="text-2xl font-mono font-bold text-[#ffd700]">
                  ₹{subscription.balanceDue.toLocaleString("en-IN")}
                </div>
                <button
                  onClick={handleSettleBalance}
                  className="w-full py-2 px-3 rounded-xl bg-[#ffd700] text-[#0a0a0f] font-semibold text-xs hover:bg-[#ffd700]/90 transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)] mt-1"
                >
                  Pay Remaining Balance
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#00e676]/10 border border-[#00e676]/20 text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#00e676]/20 text-[#00e676] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-[#00e676]">
                  Fully Paid & In Good Standing
                </div>
                <div className="text-[10px] text-[#8888a0]">
                  Tax invoice stored in Snapshot Ledger
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Discovery Grid: Available Plans for Upgrade/Renewal */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-heading font-bold text-[#f0f0f5]">
              Explore Upgrades & Extensions
            </h3>
            <p className="text-xs text-[#8888a0]">
              Unlock additional coaching sessions, longer terms, or family benefits.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {availablePlans.map((plan) => (
            <div
              key={plan._id}
              className="p-5 rounded-2xl bg-[#12121a] border border-white/5 hover:border-[#00f0ff]/30 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#00f0ff] font-semibold">
                    {plan.durationMonths} Months
                  </span>
                  {plan.isPopular && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] font-semibold">
                      POPULAR
                    </span>
                  )}
                </div>
                <h4 className="font-heading font-bold text-base text-[#f0f0f5] group-hover:text-[#00f0ff] transition-colors">
                  {plan.name}
                </h4>
                <div className="font-mono text-xl font-bold text-[#f0f0f5]">
                  ₹{plan.baseMonthlyPrice.toLocaleString("en-IN")}
                  <span className="text-xs font-normal text-[#8888a0]">/mo</span>
                </div>
                {plan.discountPercentage > 0 && (
                  <div className="text-[11px] text-[#00e676] font-semibold">
                    {plan.discountPercentage}% Plan Discount Included
                  </div>
                )}
                <p className="text-xs text-[#8888a0] line-clamp-2 mt-1">
                  {plan.description}
                </p>
              </div>

              <Link
                href={`/checkout/${plan._id}`}
                className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-gradient-to-r hover:from-[#00f0ff] hover:to-[#0099ff] hover:text-[#0a0a0f] text-xs font-semibold text-[#f0f0f5] transition-all flex items-center justify-center gap-1.5"
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
