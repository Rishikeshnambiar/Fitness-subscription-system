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
  Download,
  Building2,
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
    setAdminNotes("Physical cash/POS receipt settled at club front desk.");
  };

  const handleConfirmOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!overrideTx) return;

    setIsSubmitting(true);
    const res = await adminOverrideTransaction(overrideTx._id, adminNotes);

    if (res.success) {
      toast.success(
        `Invoice ${overrideTx.invoiceNumber} successfully overridden to COMPLETED.`
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

  const handleExportCSV = () => {
    if (filtered.length === 0) {
      toast.error("No transactions available to export");
      return;
    }

    const headers = [
      "Invoice Number",
      "Date",
      "Plan Name",
      "Plan Duration (Months)",
      "Base Rate (INR)",
      "Total Amount (INR)",
      "Amount Paid (INR)",
      "Remaining Balance (INR)",
      "Payment Status",
      "Overridden By",
      "Admin Audit Notes",
    ];

    const rows = filtered.map((tx) => [
      `"${tx.invoiceNumber || ""}"`,
      `"${new Date(tx.paymentDate || tx.createdAt).toISOString().split("T")[0]}"`,
      `"${tx.planSnapshot?.name || "Membership Plan"}"`,
      tx.planSnapshot?.durationMonths || 1,
      tx.planSnapshot?.baseMonthlyPrice || 0,
      tx.totalAmount || 0,
      tx.amountPaid || 0,
      tx.remainingBalance || 0,
      `"${tx.paymentStatus || ""}"`,
      `"${tx.overriddenBy || "N/A"}"`,
      `"${(tx.adminNotes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `AgarkarMedia_Transaction_Ledger_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Transaction Ledger CSV exported successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-zinc-100">
            Global Transaction Ledger & Audit
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Review all platform subscription payments, view immutable point-in-time snapshots, and execute authorized installment overrides.
          </p>
        </div>
        <div>
          <button
            onClick={handleExportCSV}
            className="py-2 px-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-medium transition-all inline-flex items-center gap-2 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Ledger (CSV)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {["ALL", "COMPLETED", "PARTIAL"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === st
                  ? "bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-transparent"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Invoice # or Plan..."
            className="w-full sm:w-64 pl-9 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Ledger Table */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden shadow-lg backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/90 border-b border-zinc-800 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3.5 px-4">Invoice #</th>
                <th className="py-3.5 px-4">Plan Snapshot</th>
                <th className="py-3.5 px-4">Gross & Paid</th>
                <th className="py-3.5 px-4">Remaining Balance</th>
                <th className="py-3.5 px-4">Status & Notes</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filtered.map((tx) => (
                <tr key={tx._id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="py-4 px-4 font-mono font-semibold text-emerald-400 text-xs">
                    {tx.invoiceNumber}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-xs text-zinc-200">
                      {tx.planSnapshot?.name || "Membership Plan"}
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5 font-mono">
                      {tx.planSnapshot?.durationMonths} Months • ₹
                      {tx.planSnapshot?.baseMonthlyPrice?.toLocaleString("en-IN")}/mo
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs">
                    <div className="text-zinc-200 font-semibold">
                      ₹{tx.totalAmount.toLocaleString("en-IN")}
                    </div>
                    <div className="text-emerald-400 text-[11px]">
                      Paid: ₹{tx.amountPaid.toLocaleString("en-IN")}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs">
                    {tx.remainingBalance > 0 ? (
                      <span className="text-amber-400 font-semibold">
                        ₹{tx.remainingBalance.toLocaleString("en-IN")}
                      </span>
                    ) : (
                      <span className="text-zinc-400">₹0 (Settled)</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full ${
                        tx.paymentStatus === "COMPLETED"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {tx.paymentStatus}
                    </span>
                    {tx.overriddenBy && (
                      <div className="text-[10px] text-emerald-400 mt-1 font-mono">
                        Overridden by {tx.overriddenBy}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    {tx.paymentStatus === "PARTIAL" && (
                      <button
                        onClick={() => handleOpenOverride(tx)}
                        className="py-1 px-3 rounded-lg bg-emerald-500 text-zinc-950 text-xs font-semibold hover:bg-emerald-400 transition-all shadow-sm"
                      >
                        Override to COMPLETED
                      </button>
                    )}
                    <button
                      onClick={() => setViewTx(tx)}
                      className="py-1 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-medium transition-all"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 text-zinc-200 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 text-sm font-heading font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> Administrative Balance Override
              </div>
              <button
                onClick={() => setOverrideTx(null)}
                className="p-1 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Invoice Number:</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {overrideTx.invoiceNumber}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Outstanding Balance:</span>
                <span className="font-mono text-amber-400 font-semibold">
                  ₹{overrideTx.remainingBalance.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <form onSubmit={handleConfirmOverride} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
                  Reason / Audit Log Notes
                </label>
                <textarea
                  required
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Cleared via corporate NEFT / Front-desk cash payment"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300">
                Notice: Executing this override immediately sets balance due to ₹0, marks transaction COMPLETED, and activates full membership privileges for the subscriber.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOverrideTx(null)}
                  className="py-2 px-4 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-5 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-semibold hover:bg-emerald-400 transition-all disabled:opacity-50"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 text-zinc-200 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-heading font-semibold text-sm text-zinc-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Immutable Point-In-Time Snapshot
              </h3>
              <button
                onClick={() => setViewTx(null)}
                className="p-1 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs font-mono p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
              <div className="flex justify-between text-zinc-400">
                <span>Plan Name:</span>
                <span className="text-zinc-100">{viewTx.planSnapshot?.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Duration:</span>
                <span className="text-zinc-100">{viewTx.planSnapshot?.durationMonths} Months</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Base Rate:</span>
                <span className="text-zinc-100">₹{viewTx.planSnapshot?.baseMonthlyPrice}/mo</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Gross Value:</span>
                <span className="text-zinc-100">₹{viewTx.planSnapshot?.grossAmount}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Plan Discount:</span>
                <span className="text-emerald-400">-₹{viewTx.planSnapshot?.planDiscountAmount}</span>
              </div>
              {viewTx.planSnapshot?.couponCode && (
                <div className="flex justify-between text-zinc-400">
                  <span>Coupon Applied:</span>
                  <span className="text-emerald-400">{viewTx.planSnapshot.couponCode} (-₹{viewTx.planSnapshot.couponDiscountAmount})</span>
                </div>
              )}
              <div className="pt-2 border-t border-zinc-800 flex justify-between text-sm font-semibold text-zinc-100">
                <span>Total Net Payable:</span>
                <span className="text-emerald-400">₹{viewTx.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
