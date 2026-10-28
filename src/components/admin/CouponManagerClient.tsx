"use client";

import { useState } from "react";
import { Plus, Ticket, Eye, EyeOff, X, Sparkles, Check, AlertCircle } from "lucide-react";
import { createCoupon, toggleCouponActive } from "@/lib/actions/coupon.actions";
import { toast } from "sonner";

interface CouponManagerClientProps {
  initialCoupons: any[];
}

export default function CouponManagerClient({ initialCoupons }: CouponManagerClientProps) {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"FLAT" | "PERCENTAGE">("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState(15);
  const [minPurchaseAmount, setMinPurchaseAmount] = useState(2000);
  const [maxUsage, setMaxUsage] = useState(100);
  const [expiresAt, setExpiresAt] = useState("2026-12-31");

  const openCreateModal = () => {
    setCode("");
    setDiscountType("PERCENTAGE");
    setDiscountValue(15);
    setMinPurchaseAmount(2000);
    setMaxUsage(100);
    setExpiresAt("2026-12-31");
    setIsModalOpen(true);
  };

  const handleToggleActive = async (id: string) => {
    const res = await toggleCouponActive(id);
    if (res.success) {
      setCoupons((prev) =>
        prev.map((c) => (c._id === id ? { ...c, isActive: res.isActive } : c))
      );
      toast.success(res.isActive ? "Coupon activated" : "Coupon paused");
    } else {
      toast.error(res.error || "Failed to update coupon status");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      minPurchaseAmount: Number(minPurchaseAmount),
      maxUsage: Number(maxUsage),
      expiresAt: new Date(expiresAt).toISOString(),
      isActive: true,
    };

    const res = await createCoupon(payload);
    if (res.success) {
      setCoupons((prev) => [res.coupon, ...prev]);
      toast.success(`Coupon ${payload.code} created successfully`);
      setIsModalOpen(false);
    } else {
      toast.error(res.error || "Failed to create coupon");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-zinc-100">
            Coupon Engine
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Create promotional campaigns, configure percentage or flat rupee discounts, and control redemptions.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      {/* Coupons Table */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden shadow-lg backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/90 border-b border-zinc-800 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3.5 px-4">Coupon Code</th>
                <th className="py-3.5 px-4">Type & Benefit</th>
                <th className="py-3.5 px-4">Min Spend</th>
                <th className="py-3.5 px-4">Redemptions</th>
                <th className="py-3.5 px-4">Expires</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-mono font-bold text-zinc-100 flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-emerald-400" />
                      <span className="tracking-wider">{coupon.code}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs">
                    {coupon.discountType === "PERCENTAGE" ? (
                      <span className="text-emerald-400 font-bold">
                        {coupon.discountValue}% OFF
                      </span>
                    ) : (
                      <span className="text-zinc-200 font-bold">
                        ₹{coupon.discountValue.toLocaleString("en-IN")} FLAT
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-zinc-400">
                    {coupon.minPurchaseAmount
                      ? `₹${coupon.minPurchaseAmount.toLocaleString("en-IN")}`
                      : "None"}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-zinc-200">
                    {coupon.usedCount || 0} / {coupon.maxUsage}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-zinc-400">
                    {new Date(coupon.expiresAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full ${
                        coupon.isActive
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {coupon.isActive ? "Active" : "Paused"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleToggleActive(coupon._id)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors border border-zinc-700"
                      title={coupon.isActive ? "Pause Coupon" : "Activate Coupon"}
                    >
                      {coupon.isActive ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 text-zinc-200 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-lg font-heading font-bold text-zinc-100 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-emerald-400" /> Create Promotional Coupon
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
                  Coupon Code
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. VIPSUMMER25"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FLAT">Flat Rupee (₹)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
                    Discount Value ({discountType === "PERCENTAGE" ? "%" : "₹"})
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
                    Min Spend (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={minPurchaseAmount}
                    onChange={(e) => setMinPurchaseAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
                    Max Redemptions
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={maxUsage}
                    onChange={(e) => setMaxUsage(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
                  Expiration Date
                </label>
                <input
                  type="date"
                  required
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-semibold transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
