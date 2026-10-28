"use client";

import { useState } from "react";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  X,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { adminOverrideTransaction } from "@/lib/actions/admin.actions";

interface TransactionManagerClientProps {
  initialTransactions: any[];
}

export default function TransactionManagerClient({
  initialTransactions,
}: TransactionManagerClientProps) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Override Modal
  const [overrideTx, setOverrideTx] = useState<any | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Snapshot View Modal
  const [viewTx, setViewTx] = useState<any | null>(null);

  const filtered = transactions.filter((t) => {
    const matchesStatus =
      filterStatus === "ALL" || t.paymentStatus === filterStatus;
    const matchesSearch =
      !searchQuery ||
      t.invoiceNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.planSnapshot?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenOverride = (tx: any) => {
    setOverrideTx(tx);
    setAdminNotes("Physical cash receipt settled at club front desk.");
  };

  const handleConfirmOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!overrideTx) return;

    setIsSubmitting(true);
    const res = await adminOverrideTransaction(overrideTx._id, adminNotes);

    if (res.success) {
      toast.success(
        `Invoice ${overrideTx.invoiceNumber} successfully overridden to COMPLETED!`
      );
      setTransactions((prev) =>
        prev.map((t) =>
          t._id === overrideTx._id
            ? {
                ...t,
                paymentStatus: "COMPLETED",
                amountPaid: t.totalAmount,
                remainingBalance: 0,
                adminNotes,
                overriddenBy: "Admin",
                overriddenAt: new Date(),
              }
            : t
        )
      );
      setOverrideTx(null);
    } else {
      toast.error(res.error || "Failed to execute override");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-[#f0f0f5]">
          Global Transaction Ledger & Audit
        </h1>
        <p className="text-xs text-[#8888a0] mt-1">
          Review all platform payments, view immutable line-item snapshots, and execute authorized installment clearances.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {["ALL", "COMPLETED", "PARTIAL"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                filterStatus === st
                  ? "bg-[#00f0ff] text-[#0a0a0f] shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  : "bg-white/[0.03] text-[#8888a0] hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8888a0]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Invoice # or Plan..."
            className="w-full sm:w-64 pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-[#8888a0]/50 focus:outline-none focus:border-[#00f0ff]"
          />
        </div>
      </div>

      {/* Ledger Table */}
      <div className="rounded-2xl bg-[#12121a] border border-white/5 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.02] border-b border-white/5 text-[11px] font-mono uppercase tracking-wider text-[#8888a0]">
              <tr>
                <th className="py-3.5 px-4">Invoice #</th>
                <th className="py-3.5 px-4">Plan Snapshot</th>
                <th className="py-3.5 px-4">Gross & Paid</th>
                <th className="py-3.5 px-4">Remaining Balance</th>
                <th className="py-3.5 px-4">Status & Notes</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((tx) => (
                <tr key={tx._id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-[#00f0ff] text-xs">
                    {tx.invoiceNumber}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-xs text-[#f0f0f5]">
                      {tx.planSnapshot?.name || "Membership Plan"}
                    </div>
                    <div className="text-[11px] text-[#8888a0] mt-0.5">
                      {tx.planSnapshot?.durationMonths} Months • ₹
                      {tx.planSnapshot?.baseMonthlyPrice?.toLocaleString("en-IN")}/mo
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs">
                    <div className="text-[#f0f0f5] font-bold">
                      ₹{tx.totalAmount.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[#00e676] text-[11px]">
                      Paid: ₹{tx.amountPaid.toLocaleString("en-IN")}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs">
                    {tx.remainingBalance > 0 ? (
                      <span className="text-[#ffd700] font-bold">
                        ₹{tx.remainingBalance.toLocaleString("en-IN")}
                      </span>
                    ) : (
                      <span className="text-[#8888a0]">₹0 (Settled)</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        tx.paymentStatus === "COMPLETED"
                          ? "bg-[#00e676]/10 text-[#00e676]"
                          : "bg-[#ffd700]/10 text-[#ffd700]"
                      }`}
                    >
                      {tx.paymentStatus}
                    </span>
                    {tx.overriddenBy && (
                      <div className="text-[10px] text-[#ffd700] mt-1 font-mono">
                        Overridden by {tx.overriddenBy}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    {tx.paymentStatus === "PARTIAL" && (
                      <button
                        onClick={() => handleOpenOverride(tx)}
                        className="py-1 px-2.5 rounded-lg bg-[#ffd700] hover:bg-[#ffd700]/90 text-[#0a0a0f] text-xs font-semibold transition-all shadow-[0_0_10px_rgba(255,215,0,0.2)]"
                      >
                        Override to COMPLETED
                      </button>
                    )}
                    <button
                      onClick={() => setViewTx(tx)}
                      className="py-1 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#00f0ff] text-xs font-semibold transition-all"
                    >
                      Snapshot
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Override Modal */}
      {overrideTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-[#12121a] border border-[#ffd700]/30 shadow-2xl p-6 text-[#f0f0f5] space-y-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2 text-sm font-heading font-bold text-[#ffd700]">
                <ShieldCheck className="w-4 h-4" /> Administrative Balance Override
              </div>
              <button
                onClick={() => setOverrideTx(null)}
                className="p-1 text-[#8888a0] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#8888a0]">
                <span>Invoice Number:</span>
                <span className="font-mono text-[#00f0ff] font-bold">
                  {overrideTx.invoiceNumber}
                </span>
              </div>
              <div className="flex justify-between text-[#8888a0]">
                <span>Outstanding Balance:</span>
                <span className="font-mono text-[#ffd700] font-bold">
                  ₹{overrideTx.remainingBalance.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <form onSubmit={handleConfirmOverride} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#8888a0] uppercase tracking-wider text-[10px] font-semibold">
                  Reason / Audit Log Notes
                </label>
                <textarea
                  required
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Cleared via corporate NEFT / Front-desk cash payment"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
                Warning: Executing this override immediately sets balance due to ₹0, marks transaction COMPLETED, and activates full membership privileges for the subscriber.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOverrideTx(null)}
                  className="py-2 px-4 rounded-xl bg-white/5 text-[#8888a0] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-5 rounded-xl bg-[#ffd700] text-[#0a0a0f] text-xs font-semibold hover:bg-[#ffd700]/90 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Overriding..." : "Confirm & Clear Balance"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Snapshot View Modal */}
      {viewTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-[#12121a] border border-white/10 shadow-2xl p-6 text-[#f0f0f5] space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="font-heading font-bold text-sm text-[#00f0ff]">
                Immutable Point-In-Time Snapshot
              </h3>
              <button
                onClick={() => setViewTx(null)}
                className="p-1 text-[#8888a0] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-[#8888a0]">
                <span>Plan Name:</span>
                <span className="text-white">{viewTx.planSnapshot?.name}</span>
              </div>
              <div className="flex justify-between text-[#8888a0]">
                <span>Duration:</span>
                <span className="text-white">{viewTx.planSnapshot?.durationMonths} Months</span>
              </div>
              <div className="flex justify-between text-[#8888a0]">
                <span>Base Rate:</span>
                <span className="text-white">₹{viewTx.planSnapshot?.baseMonthlyPrice}/mo</span>
              </div>
              <div className="flex justify-between text-[#8888a0]">
                <span>Gross Value:</span>
                <span className="text-white">₹{viewTx.planSnapshot?.grossAmount}</span>
              </div>
              <div className="flex justify-between text-[#8888a0]">
                <span>Plan Discount:</span>
                <span className="text-[#00e676]">-₹{viewTx.planSnapshot?.planDiscountAmount}</span>
              </div>
              {viewTx.planSnapshot?.couponCode && (
                <div className="flex justify-between text-[#8888a0]">
                  <span>Coupon Applied:</span>
                  <span className="text-[#ff006e]">{viewTx.planSnapshot.couponCode} (-₹{viewTx.planSnapshot.couponDiscountAmount})</span>
                </div>
              )}
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-[#00f0ff]">
                <span>Net Total:</span>
                <span>₹{viewTx.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
