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
          <h1 className="text-2xl font-heading font-bold text-[#f0f0f5]">
            Coupon Engine
          </h1>
          <p className="text-xs text-[#8888a0] mt-1">
            Create promotional campaigns, configure percentage or flat rupee discounts, and control redemptions.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ff006e] to-[#ff4081] text-white font-semibold text-xs hover:shadow-[0_0_20px_rgba(255,0,110,0.3)] transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      {/* Coupons Table */}
      <div className="rounded-2xl bg-[#12121a] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.02] border-b border-white/5 text-[11px] font-mono uppercase tracking-wider text-[#8888a0]">
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
            <tbody className="divide-y divide-white/5">
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-mono font-bold text-[#f0f0f5] flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-[#ff006e]" />
                      <span className="tracking-wider">{coupon.code}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs">
                    {coupon.discountType === "PERCENTAGE" ? (
                      <span className="text-[#00f0ff] font-bold">
                        {coupon.discountValue}% OFF
                      </span>
                    ) : (
                      <span className="text-[#ffd700] font-bold">
                        ₹{coupon.discountValue.toLocaleString("en-IN")} FLAT
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-[#8888a0]">
                    {coupon.minPurchaseAmount
                      ? `₹${coupon.minPurchaseAmount.toLocaleString("en-IN")}`
                      : "None"}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-[#f0f0f5]">
                    {coupon.usedCount || 0} / {coupon.maxUsage}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-[#8888a0]">
                    {new Date(coupon.expiresAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        coupon.isActive
                          ? "bg-[#00e676]/10 text-[#00e676]"
                          : "bg-white/5 text-[#8888a0]"
                      }`}
                    >
                      {coupon.isActive ? "Active" : "Paused"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleToggleActive(coupon._id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#8888a0] hover:text-white transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-[#12121a] border border-white/10 shadow-2xl p-6 text-[#f0f0f5] space-y-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-lg font-heading font-bold text-[#f0f0f5] flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#ff006e]" /> Create Coupon
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#8888a0] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#8888a0] uppercase tracking-wider text-[10px] font-semibold">
                  Coupon Code (Uppercase Alphanumeric)
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SUMMER25"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono uppercase focus:outline-none focus:border-[#ff006e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#8888a0] uppercase tracking-wider text-[10px] font-semibold">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1a1a2e] border border-white/10 text-white focus:outline-none focus:border-[#ff006e]"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FLAT">Flat Rupee (₹)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#8888a0] uppercase tracking-wider text-[10px] font-semibold">
                    {discountType === "PERCENTAGE" ? "Discount Percentage (%)" : "Flat Amount (₹)"}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={discountType === "PERCENTAGE" ? 100 : 100000}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#ff006e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#8888a0] uppercase tracking-wider text-[10px] font-semibold">
                    Min Purchase Value (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={minPurchaseAmount}
                    onChange={(e) => setMinPurchaseAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#ff006e]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#8888a0] uppercase tracking-wider text-[10px] font-semibold">
                    Max Redemptions
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={maxUsage}
                    onChange={(e) => setMaxUsage(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#ff006e]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#8888a0] uppercase tracking-wider text-[10px] font-semibold">
                  Expiration Date
                </label>
                <input
                  type="date"
                  required
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#1a1a2e] border border-white/10 text-white focus:outline-none focus:border-[#ff006e]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-[#8888a0] text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-5 rounded-xl bg-gradient-to-r from-[#ff006e] to-[#ff4081] text-white text-xs font-semibold hover:shadow-[0_0_20px_rgba(255,0,110,0.3)] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Save Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
