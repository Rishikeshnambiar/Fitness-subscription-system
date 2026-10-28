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

  // Pricing math
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Secure Checkout Terminal
        </div>
        <h1 className="text-3xl font-heading font-bold text-zinc-100">
          Review & Complete Subscription
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Lock in your preferred tier with immutable price protection and flexible installment options.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Plan Summary & Payment Customizer */}
        <div className="lg:col-span-7 space-y-6">
          {/* Plan Details Card */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Selected Tier
                </span>
                <h2 className="text-xl font-heading font-bold text-zinc-100 mt-0.5">
                  {plan.name}
                </h2>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {plan.description}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center shrink-0">
                <Dumbbell className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2 border-t border-zinc-800 text-xs text-zinc-400">
              <div>
                Duration:{" "}
                <span className="text-zinc-200 font-semibold">
                  {plan.durationMonths} Month{plan.durationMonths > 1 ? "s" : ""}
                </span>
              </div>
              <div>•</div>
              <div>
                Rate:{" "}
                <span className="text-zinc-200 font-mono font-bold">
                  ₹{plan.baseMonthlyPrice.toLocaleString("en-IN")}/mo
                </span>
              </div>
              <div>•</div>
              <div>
                Discount:{" "}
                <span className="text-emerald-400 font-mono font-bold">
                  {plan.discountPercentage}%
                </span>
              </div>
            </div>

            {/* Plan Features */}
            {plan.features?.length > 0 && (
              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                  Included Privileges
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                  {plan.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Payment Type Selection (Full vs Partial/Installment) */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-5">
            <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
              Payment Structure
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentType("FULL")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  paymentType === "FULL"
                    ? "bg-zinc-800 border-emerald-500 shadow-sm"
                    : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="font-semibold text-sm text-zinc-100 flex items-center justify-between">
                  <span>Full Payment</span>
                  {paymentType === "FULL" && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  )}
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  100% complete settlement today
                </div>
              </button>

              <button
                type="button"
                disabled={!plan.allowPartialPayment}
                onClick={() => setPaymentType("PARTIAL")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  !plan.allowPartialPayment
                    ? "opacity-40 cursor-not-allowed border-zinc-900 bg-zinc-950"
                    : paymentType === "PARTIAL"
                    ? "bg-zinc-800 border-amber-500 shadow-sm"
                    : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="font-semibold text-sm text-zinc-100 flex items-center justify-between">
                  <span>Installment Plan</span>
                  <span className="text-[10px] font-mono text-amber-400 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    FLEX
                  </span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  Pay {minUpfront}%–90% upfront now
                </div>
              </button>
            </div>

            {/* Slider for partial payments */}
            {paymentType === "PARTIAL" && (
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Upfront Contribution:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">
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
                  className="w-full accent-amber-400 cursor-pointer"
                />

                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>Min {minUpfront}%</span>
                  <span>70%</span>
                  <span>Max 90%</span>
                </div>
              </div>
            )}
          </div>

          {/* Coupon Redemption Box */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5 text-emerald-400" /> Promotional Discount Code
            </div>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono font-bold text-emerald-400">
                    {appliedCoupon.code}
                  </span>
                  <span className="text-zinc-300">
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
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono uppercase text-zinc-200 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={isValidatingCoupon || !couponCode.trim()}
                  className="py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-all disabled:opacity-40 border border-zinc-700"
                >
                  {isValidatingCoupon ? "Checking..." : "Apply"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Price Breakdown & Final Confirmation */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-5 sticky top-24">
            <h3 className="text-base font-heading font-bold text-zinc-100 border-b border-zinc-800 pb-3">
              Order Breakdown
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>
                  Gross Total ({plan.durationMonths} × ₹
                  {plan.baseMonthlyPrice.toLocaleString("en-IN")})
                </span>
                <span className="font-mono font-medium text-zinc-200">
                  ₹{pricing.grossTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {pricing.planDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Plan Discount ({plan.discountPercentage}%)</span>
                  <span className="font-mono font-medium">
                    -₹{pricing.planDiscount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-zinc-200">
                  ₹{pricing.subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {pricing.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span className="font-mono font-medium">
                    -₹{pricing.couponDiscount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline">
                <div>
                  <div className="text-sm font-semibold text-zinc-100">
                    Total Subscription Value
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    ₹{pricing.perMonth.toLocaleString("en-IN")}/month effective
                  </div>
                </div>
                <div className="text-xl font-mono font-bold text-emerald-400">
                  ₹{pricing.finalTotal.toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            {/* If Partial Payment Breakdown */}
            {paymentType === "PARTIAL" && (
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2 text-xs">
                <div className="flex justify-between text-amber-300 font-semibold">
                  <span>Payable Today ({upfrontPercentage}%)</span>
                  <span className="font-mono">
                    ₹{amountToPayToday.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Balance Pending</span>
                  <span className="font-mono text-amber-400">
                    ₹{remainingBalance.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400 pt-1">
                  Remaining balance can be settled at any time from your member billing portal.
                </div>
              </div>
            )}

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
            >
              <CreditCard className="w-4 h-4" />
              <span>
                {isProcessing
                  ? "Securing Subscription..."
                  : `Pay ₹${amountToPayToday.toLocaleString("en-IN")} & Activate`}
              </span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Snapshot price locked & tax invoice generated instantly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
