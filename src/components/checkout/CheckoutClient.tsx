"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ShieldCheck,
  Ticket,
  Sparkles,
  CreditCard,
  Percent,
  Clock,
  ArrowRight,
  Dumbbell,
} from "lucide-react";
import { calculatePricing, calculatePartialPayment } from "@/lib/pricing";
import { validateCoupon } from "@/lib/actions/coupon.actions";
import { processCheckout } from "@/lib/actions/checkout.actions";
import { toast } from "sonner";

interface CheckoutClientProps {
  plan: any;
}

export default function CheckoutClient({ plan }: CheckoutClientProps) {
  const router = useRouter();

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  // Payment state
  const [paymentType, setPaymentType] = useState<"FULL" | "PARTIAL">("FULL");
  const minUpfront = plan.minUpfrontPercentage || 50;
  const [upfrontPercentage, setUpfrontPercentage] = useState(minUpfront);
  const [isProcessing, setIsProcessing] = useState(false);

  // Math
  const pricing = calculatePricing(
    {
      durationMonths: plan.durationMonths,
      baseMonthlyPrice: plan.baseMonthlyPrice,
      discountPercentage: plan.discountPercentage,
    },
    appliedCoupon
  );

  const partialMath = calculatePartialPayment(
    pricing.finalTotal,
    upfrontPercentage,
    minUpfront
  );

  const amountToPayToday =
    paymentType === "FULL" ? pricing.finalTotal : partialMath.upfrontAmount;
  const remainingBalance =
    paymentType === "FULL" ? 0 : partialMath.remainingBalance;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setIsValidatingCoupon(true);
    const grossTotal = plan.durationMonths * plan.baseMonthlyPrice;
    const planDiscount = Math.round(grossTotal * (plan.discountPercentage / 100));
    const subtotal = grossTotal - planDiscount;

    const res = await validateCoupon(couponCode, subtotal);
    if (res.valid && res.coupon) {
      setAppliedCoupon(res.coupon);
      toast.success(`Coupon ${res.coupon.code} applied successfully!`);
    } else {
      toast.error(res.error || "Invalid coupon code");
      setAppliedCoupon(null);
    }
    setIsValidatingCoupon(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.info("Coupon removed");
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    const res = await processCheckout({
      planId: plan._id,
      paymentType,
      upfrontPercentage: paymentType === "PARTIAL" ? upfrontPercentage : 100,
      couponCode: appliedCoupon?.code,
    });

    if (res.success) {
      toast.success(
        paymentType === "FULL"
          ? "Subscription activated! Full payment confirmed."
          : `Partial payment of ₹${res.amountPaid?.toLocaleString("en-IN")} received! Balance pending.`
      );
      router.push("/dashboard");
    } else {
      toast.error(res.error || "Checkout failed");
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-xs font-semibold text-[#00f0ff] mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Secure Checkout Terminal
        </div>
        <h1 className="text-3xl font-heading font-bold text-[#f0f0f5]">
          Review & Complete Subscription
        </h1>
        <p className="text-xs text-[#8888a0] mt-1">
          Lock in your preferred plan with immutable price protection and flexible installment options.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Plan Summary & Payment Customizer */}
        <div className="lg:col-span-7 space-y-6">
          {/* Plan Details Card */}
          <div className="p-6 rounded-2xl bg-[#12121a] border border-white/5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#00f0ff] font-semibold">
                  Selected Membership
                </span>
                <h2 className="text-xl font-heading font-bold text-[#f0f0f5] mt-0.5">
                  {plan.name}
                </h2>
                <p className="text-xs text-[#8888a0] mt-1 leading-relaxed">
                  {plan.description}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 text-[#00f0ff] flex items-center justify-center shrink-0">
                <Dumbbell className="w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2 border-t border-white/5 text-xs text-[#8888a0]">
              <div>
                Duration:{" "}
                <span className="text-[#f0f0f5] font-semibold">
                  {plan.durationMonths} Month{plan.durationMonths > 1 ? "s" : ""}
                </span>
              </div>
              <div>•</div>
              <div>
                Rate:{" "}
                <span className="text-[#00f0ff] font-mono font-bold">
                  ₹{plan.baseMonthlyPrice.toLocaleString("en-IN")}/mo
                </span>
              </div>
              <div>•</div>
              <div>
                Discount:{" "}
                <span className="text-[#ffd700] font-mono font-bold">
                  {plan.discountPercentage}%
                </span>
              </div>
            </div>

            {/* Plan Features */}
            {plan.features?.length > 0 && (
              <div className="pt-2 border-t border-white/5 space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-[#8888a0] font-semibold">
                  Included Privileges
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#f0f0f5]">
                  {plan.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00e676] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Payment Type Selection */}
          <div className="p-6 rounded-2xl bg-[#12121a] border border-white/5 space-y-5">
            <div className="text-xs uppercase tracking-wider text-[#8888a0] font-semibold">
              Payment Structure
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentType("FULL")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  paymentType === "FULL"
                    ? "bg-[#00f0ff]/10 border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="font-semibold text-sm text-[#f0f0f5]">
                  Full Upfront
                </div>
                <div className="text-xs text-[#8888a0] mt-1">
                  100% complete settlement today
                </div>
              </button>

              <button
                type="button"
                disabled={!plan.allowPartialPayment}
                onClick={() => setPaymentType("PARTIAL")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  !plan.allowPartialPayment
                    ? "opacity-40 cursor-not-allowed border-white/5"
                    : paymentType === "PARTIAL"
                    ? "bg-[#ffd700]/10 border-[#ffd700] shadow-[0_0_20px_rgba(255,215,0,0.2)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="font-semibold text-sm text-[#f0f0f5] flex items-center justify-between">
                  <span>Installment Plan</span>
                  <span className="text-[10px] font-mono text-[#ffd700] px-1.5 py-0.5 rounded bg-[#ffd700]/10">
                    FLEX
                  </span>
                </div>
                <div className="text-xs text-[#8888a0] mt-1">
                  Pay {minUpfront}%–90% upfront now
                </div>
              </button>
            </div>

            {/* Slider for partial payments */}
            {paymentType === "PARTIAL" && (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8888a0]">Upfront Contribution:</span>
                  <span className="font-mono font-bold text-[#ffd700] text-sm">
                    {upfrontPercentage}%
                  </span>
                </div>

                <input
                  type="range"
                  min={minUpfront}
                  max={90}
                  step={5}
                  value={upfrontPercentage}
                  onChange={(e) => setUpfrontPercentage(Number(e.target.value))}
                  className="w-full accent-[#ffd700] cursor-pointer"
                />

                <div className="flex justify-between text-[10px] font-mono text-[#8888a0]">
                  <span>Min {minUpfront}%</span>
                  <span>70%</span>
                  <span>Max 90%</span>
                </div>
              </div>
            )}
          </div>

          {/* Coupon Redemption Box */}
          <div className="p-6 rounded-2xl bg-[#12121a] border border-white/5 space-y-3">
            <div className="text-xs uppercase tracking-wider text-[#8888a0] font-semibold flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5 text-[#ff006e]" /> Promotional Coupon Code
            </div>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#00e676]/10 border border-[#00e676]/30 text-xs">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#00e676]" />
                  <span className="font-mono font-bold text-[#00e676]">
                    {appliedCoupon.code}
                  </span>
                  <span className="text-[#8888a0]">
                    ({appliedCoupon.discountType === "PERCENTAGE"
                      ? `${appliedCoupon.discountValue}% OFF`
                      : `₹${appliedCoupon.discountValue} OFF`})
                  </span>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-red-400 hover:text-red-300 font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Try: WELCOME10, FITHALF, FLAT1000"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono uppercase text-white focus:outline-none focus:border-[#00f0ff]"
                />
                <button
                  type="submit"
                  disabled={isValidatingCoupon || !couponCode.trim()}
                  className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all disabled:opacity-40"
                >
                  {isValidatingCoupon ? "Checking..." : "Apply"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Price Breakdown & Final Confirmation */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#12121a] border border-white/10 shadow-2xl space-y-5 sticky top-24">
            <h3 className="text-base font-heading font-bold text-[#f0f0f5] border-b border-white/5 pb-3">
              Order Breakdown
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-[#8888a0]">
                <span>
                  Gross Total ({plan.durationMonths} × ₹
                  {plan.baseMonthlyPrice.toLocaleString("en-IN")})
                </span>
                <span className="font-mono font-medium text-[#f0f0f5]">
                  ₹{pricing.grossTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {pricing.planDiscount > 0 && (
                <div className="flex justify-between text-[#00e676]">
                  <span>Plan Discount ({plan.discountPercentage}%)</span>
                  <span className="font-mono font-medium">
                    -₹{pricing.planDiscount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-[#8888a0]">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-[#f0f0f5]">
                  ₹{pricing.subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {pricing.couponDiscount > 0 && (
                <div className="flex justify-between text-[#ff006e]">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span className="font-mono font-medium">
                    -₹{pricing.couponDiscount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <div>
                  <div className="text-sm font-semibold text-[#f0f0f5]">
                    Total Subscription Value
                  </div>
                  <div className="text-[11px] text-[#8888a0]">
                    ₹{pricing.perMonth.toLocaleString("en-IN")}/month equivalent
                  </div>
                </div>
                <div className="text-xl font-mono font-bold text-[#00f0ff]">
                  ₹{pricing.finalTotal.toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            {/* If Partial Payment Breakdown */}
            {paymentType === "PARTIAL" && (
              <div className="p-4 rounded-xl bg-[#ffd700]/5 border border-[#ffd700]/20 space-y-2 text-xs">
                <div className="flex justify-between text-[#ffd700] font-semibold">
                  <span>Payable Today ({upfrontPercentage}%)</span>
                  <span className="font-mono">
                    ₹{amountToPayToday.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-[#8888a0]">
                  <span>Balance Pending</span>
                  <span className="font-mono text-[#ffd700]">
                    ₹{remainingBalance.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="text-[10px] text-[#8888a0] pt-1">
                  Remaining balance can be settled at any time from your member billing portal.
                </div>
              </div>
            )}

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#ff006e] text-white font-semibold text-sm hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CreditCard className="w-4 h-4" />
              <span>
                {isProcessing
                  ? "Securing Subscription..."
                  : `Pay ₹${amountToPayToday.toLocaleString("en-IN")} & Activate`}
              </span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#8888a0]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00e676]" />
              <span>Snapshot price locked & tax invoice generated instantly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
