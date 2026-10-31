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
  Database,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  UserCheck,
} from "lucide-react";
import { getAdminDashboardMetrics } from "@/lib/actions/admin.actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const result = await getAdminDashboardMetrics();
  const stats = result.data;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-2">
            <Shield className="w-3.5 h-3.5" /> Executive Command Center
          </div>
          <h1 className="text-3xl font-heading font-bold text-zinc-100">
            Platform Overview
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Real-time subscriber metrics, revenue streams, and system controls queried from active database.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/plans"
            className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" /> Plan Manager
          </Link>
          <Link
            href="/admin/coupons"
            className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <Ticket className="w-3.5 h-3.5 text-emerald-400" /> Coupon Manager
          </Link>
        </div>
      </div>

      {/* Database Connection Banner */}
      <div className="p-3.5 px-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-zinc-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          <span className="font-mono font-medium text-emerald-400">Live MongoDB Cluster</span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-zinc-400 hidden sm:inline">Entity: AgarkarMedia Pvt. Ltd. (GSTIN: 27AAWCA1536C1ZP)</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] text-zinc-400">
          <span>{stats.totalUsersCount} Users</span>
          <span>•</span>
          <span>{stats.totalTransactionsCount} Invoices</span>
          <span>•</span>
          <span>{stats.totalPlansCount} Plans</span>
          <span>•</span>
          <span>{stats.totalCouponsCount} Coupons</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Revenue Received */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium uppercase tracking-wider">
            <span>Payments Received</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-zinc-100">
            ₹{stats.totalRevenue.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {stats.completedPaymentsCount} Full • {stats.partialPaymentsCount} Partial Paid
          </div>
        </div>

        {/* KPI 2: Total Registered / Logged Users */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium uppercase tracking-wider">
            <span>Registered Members</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-zinc-100">
            {stats.totalUsersCount} {stats.totalUsersCount === 1 ? "User" : "Users"}
          </div>
          <div className="text-xs text-zinc-400">
            {stats.activeSubscribersCount} Active Athletic Passes • {stats.totalAdminsCount} Admin
          </div>
        </div>

        {/* KPI 3: Pending Receivables */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium uppercase tracking-wider">
            <span>Pending Receivables</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-amber-400">
            ₹{stats.pendingReceivables.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-zinc-400">
            {stats.partialPaymentsCount} Installment {stats.partialPaymentsCount === 1 ? "Balance" : "Balances"} (50% Upfront)
          </div>
        </div>

        {/* KPI 4: Active Plans & Coupons */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium uppercase tracking-wider">
            <span>Catalog & Promos</span>
            <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-200 flex items-center justify-center border border-zinc-700">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-zinc-100">
            {stats.activePlansCount} Plans / {stats.activeCouponsCount} Promos
          </div>
          <div className="text-xs text-zinc-400">
            {stats.totalCouponsUsedCount} Cumulative coupon redemptions
          </div>
        </div>
      </div>

      {/* Main Content Grid: Recent Users & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table 1: Recent Registered Members from MongoDB */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-heading font-bold text-zinc-100 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" /> Registered Users & Members
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Profiles synchronized via Clerk Auth / Evaluator RBAC.
              </p>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
              {stats.totalUsersCount} Total
            </span>
          </div>

          <div className="divide-y divide-zinc-800/60">
            {stats.recentUsers && stats.recentUsers.length > 0 ? (
              stats.recentUsers.map((u: any) => {
                const sub = u.subscription || u.activeSubscription;
                return (
                  <div key={u._id || u.clerkId} className="py-3.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-zinc-200 flex items-center gap-2 truncate">
                        <span>{u.firstName || u.lastName ? `${u.firstName || ""} ${u.lastName || ""}`.trim() : "Member"}</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                            u.role === "ADMIN"
                              ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}
                        >
                          {u.role}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5 font-mono truncate">
                        {u.email}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-medium text-zinc-200">
                        {sub?.planNameSnapshot || (u.role === "ADMIN" ? "Platform Admin" : "Free Explorer")}
                      </div>
                      <span
                        className={`inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full mt-1 ${
                          sub?.status === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : sub?.status === "PENDING_COMPLETION"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {sub?.status || "INACTIVE"}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-zinc-500 font-mono">
                No users registered yet. Visit /sign-up or run /api/demo/seed to populate.
              </div>
            )}
          </div>
        </div>

        {/* Table 2: Recent Transactions Ledger */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-heading font-bold text-zinc-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Live Invoices & Cash Flow
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Real-time transactions recorded with immutable plan snapshots.
              </p>
            </div>
            <Link
              href="/admin/transactions"
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium"
            >
              Full Ledger <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-zinc-800/60">
            {stats.recentTransactions && stats.recentTransactions.length > 0 ? (
              stats.recentTransactions.map((tx: any) => (
                <div key={tx._id || tx.invoiceNumber} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-zinc-200 flex items-center gap-2">
                      <span className="font-mono text-xs text-emerald-400">{tx.invoiceNumber}</span>
                      <span className="text-zinc-500 text-xs hidden sm:inline">•</span>
                      <span className="text-xs text-zinc-300 truncate hidden sm:inline">
                        {tx.planSnapshot?.name || "Subscription"}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5 font-mono">
                      Paid: ₹{tx.amountPaid?.toLocaleString("en-IN") || 0}
                      {tx.remainingBalance > 0 && (
                        <span className="text-amber-400 ml-1.5">
                          (Due: ₹{tx.remainingBalance.toLocaleString("en-IN")})
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        tx.paymentStatus === "COMPLETED"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : tx.paymentStatus === "PARTIAL"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {tx.paymentStatus}
                    </span>
                    <div className="text-[11px] text-zinc-500 font-mono mt-1">
                      {tx.paymentDate ? new Date(tx.paymentDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "Today"}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-zinc-500 font-mono">
                No transactions recorded yet. Run /api/demo/seed or complete a checkout.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plan Definitions & Administrative Safeguards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plans Snapshot */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-heading font-bold text-zinc-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Active Subscription Catalog
            </h2>
            <Link
              href="/admin/plans"
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium"
            >
              Configure Plans <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-zinc-800/60">
            {stats.plans && stats.plans.length > 0 ? (
              stats.plans.map((p: any) => (
                <div key={p._id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-sm text-zinc-200 flex items-center gap-2">
                      <span>{p.name}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 font-mono">
                        v{p.version || 1}
                      </span>
                      {p.isPopular && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5 font-mono">
                      {p.durationMonths} Month{p.durationMonths > 1 ? "s" : ""} • {p.discountPercentage}% Discount • Partial:{" "}
                      {p.allowPartialPayment ? "Enabled" : "Disabled"}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-zinc-100 text-sm">
                      ₹{p.baseMonthlyPrice?.toLocaleString("en-IN")}/mo
                    </div>
                    <span
                      className={`inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full mt-1 ${
                        p.isActive
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {p.isActive ? "Active" : "Archived"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-xs text-zinc-500 font-mono">
                No plans found in database.
              </div>
            )}
          </div>
        </div>

        {/* Quick Audit & Action Box */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-heading font-bold text-zinc-100">
              Audit Safeguards & Compliance
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every plan modification automatically branches a new revision index. Existing transactions and invoices preserve immutable historical pricing snapshots to ensure full GST compliance under AgarkarMedia Pvt. Ltd. (SAC 999723).
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-zinc-800">
            <Link
              href="/admin/transactions"
              className="w-full py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-zinc-200 flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              Open Global Transaction Ledger
            </Link>
            <Link
              href="/dashboard"
              className="w-full py-2.5 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 flex items-center justify-center gap-2 transition-all"
            >
              Test Member Experience
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
