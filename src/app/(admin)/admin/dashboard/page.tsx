import Link from "next/link";
import {
  TrendingUp,
  Users,
  AlertCircle,
  Ticket,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";
import { getPlans } from "@/lib/actions/plan.actions";
import { getCoupons } from "@/lib/actions/coupon.actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const plans = await getPlans(true);
  const coupons = await getCoupons();

  const totalPlans = plans.length;
  const activePlans = plans.filter((p: any) => p.isActive).length;
  const activeCoupons = coupons.filter((c: any) => c.isActive).length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/20 text-xs font-semibold text-[#ffd700] mb-2">
            <Shield className="w-3.5 h-3.5" /> Executive Control
          </div>
          <h1 className="text-3xl font-heading font-bold text-[#f0f0f5]">
            Platform Overview
          </h1>
          <p className="text-sm text-[#8888a0] mt-1">
            Real-time subscriber metrics, revenue streams, and system controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/plans"
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#0099ff] text-[#0a0a0f] font-semibold text-xs hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" /> Manage Plans
          </Link>
          <Link
            href="/admin/coupons"
            className="py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#f0f0f5] text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Ticket className="w-3.5 h-3.5 text-[#ff006e]" /> Manage Coupons
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-[#12121a] border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-[#8888a0] text-xs font-medium uppercase tracking-wider">
            <span>Gross Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-[#f0f0f5]">
            ₹3,48,250
          </div>
          <div className="text-xs text-[#00e676] flex items-center gap-1 font-medium">
            +18.4% vs previous 30-day cycle
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-[#12121a] border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-[#8888a0] text-xs font-medium uppercase tracking-wider">
            <span>Active Subscribers</span>
            <div className="w-8 h-8 rounded-lg bg-[#00e676]/10 text-[#00e676] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-[#f0f0f5]">
            164 Members
          </div>
          <div className="text-xs text-[#8888a0]">
            92% retention rate across metro clubs
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-[#12121a] border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-[#8888a0] text-xs font-medium uppercase tracking-wider">
            <span>Pending Receivables</span>
            <div className="w-8 h-8 rounded-lg bg-[#ffd700]/10 text-[#ffd700] flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-[#ffd700]">
            ₹24,800
          </div>
          <div className="text-xs text-[#8888a0]">
            Installment balances (50% upfront)
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-[#12121a] border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-[#8888a0] text-xs font-medium uppercase tracking-wider">
            <span>Active Plans / Coupons</span>
            <div className="w-8 h-8 rounded-lg bg-[#ff006e]/10 text-[#ff006e] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-[#f0f0f5]">
            {activePlans} Plans / {activeCoupons} Codes
          </div>
          <div className="text-xs text-[#8888a0]">
            Live in checkout discovery grid
          </div>
        </div>
      </div>

      {/* Strategic Actions & Plan Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plans Snapshot */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#12121a] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-bold text-[#f0f0f5]">
              Active Subscription Catalog
            </h2>
            <Link
              href="/admin/plans"
              className="text-xs text-[#00f0ff] hover:underline flex items-center gap-1 font-medium"
            >
              Configure Plans <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {plans.map((p: any) => (
              <div
                key={p._id}
                className="py-3.5 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-semibold text-sm text-[#f0f0f5] flex items-center gap-2">
                    <span>{p.name}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-[#8888a0] font-mono">
                      v{p.version || 1}
                    </span>
                    {p.isPopular && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] font-semibold">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#8888a0] mt-0.5">
                    {p.durationMonths} Month{p.durationMonths > 1 ? "s" : ""} •{" "}
                    {p.discountPercentage}% Plan Discount • Partial:{" "}
                    {p.allowPartialPayment ? "Enabled" : "Disabled"}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-[#00f0ff] text-sm">
                    ₹{p.baseMonthlyPrice.toLocaleString("en-IN")}/mo
                  </div>
                  <span
                    className={`inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full mt-1 ${
                      p.isActive
                        ? "bg-[#00e676]/10 text-[#00e676]"
                        : "bg-white/5 text-[#8888a0]"
                    }`}
                  >
                    {p.isActive ? "Active" : "Archived"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Audit & Action Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#12121a] to-[#1a1a2e] border border-white/5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 text-[#00f0ff] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-heading font-bold text-[#f0f0f5]">
              Administrative Safeguards
            </h3>
            <p className="text-xs text-[#8888a0] leading-relaxed">
              Every plan modification automatically generates a new version. Existing invoices are bound to immutable snapshot captures to prevent audit discrepancies.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/5">
            <Link
              href="/admin/transactions"
              className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-[#f0f0f5] flex items-center justify-center gap-2 transition-all"
            >
              Open Global Transaction Ledger
            </Link>
            <Link
              href="/dashboard"
              className="w-full py-2.5 px-3 rounded-xl bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-xs font-semibold text-[#00f0ff] flex items-center justify-center gap-2 transition-all"
            >
              Test Member Checkout Experience
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
