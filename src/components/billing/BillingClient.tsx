"use client";

import { useState } from "react";
import {
  FileText,
  Printer,
  CheckCircle2,
  AlertCircle,
  X,
  CreditCard,
  Dumbbell,
  Shield,
  Clock,
  Sparkles,
  Download,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import { settleRemainingBalance } from "@/lib/actions/billing.actions";

interface BillingClientProps {
  initialTransactions: any[];
}

export default function BillingClient({ initialTransactions }: BillingClientProps) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  const handleSettleBalance = async (txId: string) => {
    toast.info("Settling remaining installment balance...");
    const res = await settleRemainingBalance(txId);
    if (res.success) {
      toast.success("Balance settled in full. Invoice status updated to COMPLETED.");
      setTransactions((prev) =>
        prev.map((t) =>
          t._id === txId
            ? {
                ...t,
                amountPaid: t.totalAmount,
                remainingBalance: 0,
                paymentStatus: "COMPLETED",
              }
            : t
        )
      );
    } else {
      toast.error(res.error || "Failed to settle balance");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-2">
          <Shield className="w-3.5 h-3.5" /> Immutable Snapshot Ledger
        </div>
        <h1 className="text-3xl font-heading font-bold text-zinc-100">
          Invoices & Financial History
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Every transaction retains an immutable point-in-time snapshot of plan rates, GST computations, and applied discounts.
        </p>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden shadow-lg backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/90 border-b border-zinc-800 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3.5 px-4">Invoice #</th>
                <th className="py-3.5 px-4">Plan Snapshot</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Paid / Balance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {transactions.map((tx) => (
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
                      {tx.planSnapshot?.baseMonthlyPrice?.toLocaleString("en-IN")}/mo base
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-zinc-400">
                    {new Date(tx.paymentDate || tx.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs font-semibold text-zinc-200">
                    ₹{tx.totalAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs">
                    <span className="text-emerald-400 font-medium">
                      ₹{tx.amountPaid.toLocaleString("en-IN")}
                    </span>
                    {tx.remainingBalance > 0 && (
                      <span className="text-amber-400 ml-1.5 font-medium">
                        (Due: ₹{tx.remainingBalance.toLocaleString("en-IN")})
                      </span>
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
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    {tx.remainingBalance > 0 && (
                      <button
                        onClick={() => handleSettleBalance(tx._id)}
                        className="py-1 px-3 rounded-lg bg-emerald-500 text-zinc-950 text-xs font-semibold hover:bg-emerald-400 transition-all shadow-sm"
                      >
                        Settle Balance
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedInvoice(tx)}
                      className="py-1 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-medium transition-all inline-flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tax Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Snapshot Tax Invoice Modal (Printable & Compliant with AgarkarMedia Assessment) */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 sm:p-8 text-zinc-200 space-y-6 max-h-[92vh] overflow-y-auto">
            {/* Modal Top Action Bar */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-emerald-400" />
                <span className="font-heading font-bold text-sm tracking-wide text-zinc-100">
                  OFFICIAL TAX INVOICE & RECEIPT
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="py-1.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 border border-zinc-700 transition-all flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-emerald-400" /> Print / Save PDF
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Official Legal Entity Header: AgarkarMedia Pvt. Ltd. */}
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-100 tracking-wide uppercase">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  AgarkarMedia Pvt. Ltd.
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  Operational Division: HyperGym Fitness Technologies<br />
                  GSTIN : <span className="font-mono font-semibold text-zinc-300">27AAWCA1536C1ZP</span><br />
                  SAC Code : <span className="font-mono">999723</span> (Gymnasium & Physical Fitness Services)<br />
                  Official Domain : <span className="text-emerald-400">www.AgarkarMedia.com</span>
                </div>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">
                  Original For Recipient
                </span>
                <span className="font-mono text-xs font-semibold text-emerald-400 mt-0.5 block">
                  Tax Invoice under Sec 31 GST Act
                </span>
                <span className="text-[10px] text-zinc-400 block mt-1">
                  Place of Supply: Maharashtra (State Code 27)
                </span>
              </div>
            </div>

            {/* Invoice Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800/60">
              <div>
                <div className="text-zinc-400 text-[10px] uppercase font-mono">Invoice Number</div>
                <div className="font-mono font-semibold text-emerald-400 mt-0.5">
                  {selectedInvoice.invoiceNumber}
                </div>
              </div>
              <div>
                <div className="text-zinc-400 text-[10px] uppercase font-mono">Payment Date</div>
                <div className="font-mono text-zinc-200 mt-0.5">
                  {new Date(selectedInvoice.paymentDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div>
                <div className="text-zinc-400 text-[10px] uppercase font-mono">Settlement Status</div>
                <div className="font-mono font-semibold text-emerald-400 mt-0.5">
                  {selectedInvoice.paymentStatus}
                </div>
              </div>
              <div>
                <div className="text-zinc-400 text-[10px] uppercase font-mono">Snapshot Version</div>
                <div className="font-mono text-zinc-400 mt-0.5">
                  v{selectedInvoice.planSnapshot?.snapshotVersion || "1.0"} (Frozen)
                </div>
              </div>
            </div>

            {/* Immutable Snapshot Line Items Table */}
            <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950/40">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-800/50 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  <tr>
                    <th className="py-2.5 px-3">Description (Snapshot Rate)</th>
                    <th className="py-2.5 px-3 text-right">Base / Mo</th>
                    <th className="py-2.5 px-3 text-right">Tenure</th>
                    <th className="py-2.5 px-3 text-right">Discount</th>
                    <th className="py-2.5 px-3 text-right">Taxable Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 font-mono">
                  <tr>
                    <td className="py-3 px-3 font-sans">
                      <div className="font-semibold text-zinc-100">
                        {selectedInvoice.planSnapshot?.name}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Immutable record locked at purchase time
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      ₹{selectedInvoice.planSnapshot?.baseMonthlyPrice?.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {selectedInvoice.planSnapshot?.durationMonths}M
                    </td>
                    <td className="py-3 px-3 text-right text-emerald-400">
                      -{selectedInvoice.planSnapshot?.planDiscountPercentage}%
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-zinc-100">
                      ₹{selectedInvoice.planSnapshot?.grossAmount?.toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Calculations & GST Breakdown */}
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Gross Value</span>
                <span className="font-mono text-zinc-200">
                  ₹{selectedInvoice.planSnapshot?.grossAmount?.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Plan Discount Amount</span>
                <span className="font-mono">
                  -₹{selectedInvoice.planSnapshot?.planDiscountAmount?.toLocaleString("en-IN")}
                </span>
              </div>
              {selectedInvoice.planSnapshot?.couponCode && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Applied ({selectedInvoice.planSnapshot.couponCode})</span>
                  <span className="font-mono">
                    -₹{selectedInvoice.planSnapshot.couponDiscountAmount?.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-zinc-800 flex justify-between font-bold text-sm text-zinc-100">
                <span>Total Invoice Value (Incl. 18% GST)</span>
                <span className="font-mono text-emerald-400">
                  ₹{selectedInvoice.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-xs text-zinc-200">
                <span>Amount Paid</span>
                <span className="font-mono text-emerald-400">
                  ₹{selectedInvoice.amountPaid.toLocaleString("en-IN")}
                </span>
              </div>
              {selectedInvoice.remainingBalance > 0 && (
                <div className="flex justify-between font-semibold text-xs text-amber-400">
                  <span>Balance Outstanding</span>
                  <span className="font-mono">
                    ₹{selectedInvoice.remainingBalance.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
            </div>

            <div className="text-[11px] text-zinc-400 text-center font-mono">
              Document certified under AgarkarMedia Pvt. Ltd. GSTIN 27AAWCA1536C1ZP • Non-negotiable tax receipt
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
