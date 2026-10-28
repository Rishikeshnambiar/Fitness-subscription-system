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
      toast.success("Balance paid in full! Invoice marked as COMPLETED.");
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-xs font-semibold text-[#00f0ff] mb-2">
          <Shield className="w-3.5 h-3.5" /> Immutable Billing Records
        </div>
        <h1 className="text-3xl font-heading font-bold text-[#f0f0f5]">
          Invoices & Payment History
        </h1>
        <p className="text-xs text-[#8888a0] mt-1">
          Every transaction includes an immutable point-in-time snapshot of plan rates, discounts, and coupons.
        </p>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl bg-[#12121a] border border-white/5 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.02] border-b border-white/5 text-[11px] font-mono uppercase tracking-wider text-[#8888a0]">
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
            <tbody className="divide-y divide-white/5">
              {transactions.map((tx) => (
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
                      {tx.planSnapshot?.baseMonthlyPrice?.toLocaleString("en-IN")}/mo rate
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-[#8888a0]">
                    {new Date(tx.paymentDate || tx.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs font-bold text-[#f0f0f5]">
                    ₹{tx.totalAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs">
                    <span className="text-[#00e676]">
                      ₹{tx.amountPaid.toLocaleString("en-IN")}
                    </span>
                    {tx.remainingBalance > 0 && (
                      <span className="text-[#ffd700] ml-1">
                        (Due: ₹{tx.remainingBalance.toLocaleString("en-IN")})
                      </span>
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
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    {tx.remainingBalance > 0 && (
                      <button
                        onClick={() => handleSettleBalance(tx._id)}
                        className="py-1 px-2.5 rounded-lg bg-[#ffd700] text-[#0a0a0f] text-xs font-semibold hover:bg-[#ffd700]/90 transition-all shadow-[0_0_10px_rgba(255,215,0,0.2)]"
                      >
                        Settle Balance
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedInvoice(tx)}
                      className="py-1 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#00f0ff] text-xs font-semibold transition-all inline-flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Snapshot Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl bg-[#12121a] border border-white/10 shadow-2xl p-6 sm:p-8 text-[#f0f0f5] space-y-6 max-h-[92vh] overflow-y-auto">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-[#00f0ff]" />
                <span className="font-heading font-bold text-lg text-white">
                  HYPER<span className="text-[#00f0ff]">GYM</span> TAX INVOICE
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#f0f0f5] transition-all flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1.5 text-[#8888a0] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Invoice Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <div className="text-[#8888a0] text-[10px] uppercase font-mono">Invoice Number</div>
                <div className="font-mono font-bold text-[#00f0ff] mt-0.5">
                  {selectedInvoice.invoiceNumber}
                </div>
              </div>
              <div>
                <div className="text-[#8888a0] text-[10px] uppercase font-mono">Invoice Date</div>
                <div className="font-mono text-[#f0f0f5] mt-0.5">
                  {new Date(selectedInvoice.paymentDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div>
                <div className="text-[#8888a0] text-[10px] uppercase font-mono">Payment Status</div>
                <div className="font-mono font-bold text-[#00e676] mt-0.5">
                  {selectedInvoice.paymentStatus}
                </div>
              </div>
              <div>
                <div className="text-[#8888a0] text-[10px] uppercase font-mono">GSTIN / Entity</div>
                <div className="font-mono text-[#8888a0] mt-0.5">
                  27AAACH1234F1Z8
                </div>
              </div>
            </div>

            {/* Immutable Snapshot Line Items Table */}
            <div className="rounded-xl border border-white/5 overflow-hidden bg-white/[0.01]">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-[10px] font-mono uppercase tracking-wider text-[#8888a0]">
                  <tr>
                    <th className="py-2.5 px-3">Point-in-Time Snapshot Item</th>
                    <th className="py-2.5 px-3 text-right">Base Rate</th>
                    <th className="py-2.5 px-3 text-right">Duration</th>
                    <th className="py-2.5 px-3 text-right">Plan Discount</th>
                    <th className="py-2.5 px-3 text-right">Gross Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  <tr>
                    <td className="py-3 px-3 font-sans">
                      <div className="font-semibold text-white">
                        {selectedInvoice.planSnapshot?.name}
                      </div>
                      <div className="text-[11px] text-[#8888a0]">
                        Locked-in snapshot pricing
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      ₹{selectedInvoice.planSnapshot?.baseMonthlyPrice?.toLocaleString("en-IN")}/mo
                    </td>
                    <td className="py-3 px-3 text-right">
                      {selectedInvoice.planSnapshot?.durationMonths} Mo
                    </td>
                    <td className="py-3 px-3 text-right text-[#00e676]">
                      -{selectedInvoice.planSnapshot?.planDiscountPercentage}%
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-white">
                      ₹{selectedInvoice.planSnapshot?.grossAmount?.toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Calculations Breakdown */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-[#8888a0]">
                <span>Gross Value</span>
                <span className="font-mono text-white">
                  ₹{selectedInvoice.planSnapshot?.grossAmount?.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-[#00e676]">
                <span>Plan Discount</span>
                <span className="font-mono">
                  -₹{selectedInvoice.planSnapshot?.planDiscountAmount?.toLocaleString("en-IN")}
                </span>
              </div>
              {selectedInvoice.planSnapshot?.couponCode && (
                <div className="flex justify-between text-[#ff006e]">
                  <span>Coupon Savings ({selectedInvoice.planSnapshot.couponCode})</span>
                  <span className="font-mono">
                    -₹{selectedInvoice.planSnapshot.couponDiscountAmount?.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-[#00f0ff]">
                <span>Total Payable</span>
                <span className="font-mono">
                  ₹{selectedInvoice.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-xs text-[#00e676]">
                <span>Amount Paid</span>
                <span className="font-mono">
                  ₹{selectedInvoice.amountPaid.toLocaleString("en-IN")}
                </span>
              </div>
              {selectedInvoice.remainingBalance > 0 && (
                <div className="flex justify-between font-semibold text-xs text-[#ffd700]">
                  <span>Remaining Balance Due</span>
                  <span className="font-mono">
                    ₹{selectedInvoice.remainingBalance.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
            </div>

            <div className="text-[11px] text-[#8888a0] text-center">
              This tax invoice was generated automatically and cryptographically secured on HyperGym Snapshot Engine.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
