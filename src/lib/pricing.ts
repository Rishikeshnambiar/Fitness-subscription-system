// ============================================
// HyperGym Fitness — Pure Pricing Functions
// Server-side only — never trust client-side math
// ============================================

import type { PricingBreakdown, CouponDiscountType } from "@/types";

interface PlanInput {
  durationMonths: number;
  baseMonthlyPrice: number;
  discountPercentage: number;
}

interface CouponInput {
  discountType: CouponDiscountType;
  discountValue: number;
  minPurchaseAmount?: number;
}

/**
 * Calculate the full pricing breakdown for a subscription plan
 * with optional coupon application.
 *
 * Formula:
 *   Gross Total = durationMonths × baseMonthlyPrice
 *   Plan Discount = Gross Total × (discountPercentage / 100)
 *   Subtotal = Gross Total - Plan Discount
 *   Coupon Discount = depends on type (FLAT or PERCENTAGE)
 *   Final Total = max(0, Subtotal - Coupon Discount)
 */
export function calculatePricing(
  plan: PlanInput,
  coupon?: CouponInput | null
): PricingBreakdown {
  const grossTotal = plan.durationMonths * plan.baseMonthlyPrice;
  const planDiscount = Math.round(
    grossTotal * (plan.discountPercentage / 100)
  );
  const subtotal = grossTotal - planDiscount;

  let couponDiscount = 0;

  if (coupon) {
    // Check minimum purchase amount
    if (coupon.minPurchaseAmount && subtotal < coupon.minPurchaseAmount) {
      couponDiscount = 0;
    } else if (coupon.discountType === "PERCENTAGE") {
      couponDiscount = Math.round(
        subtotal * (coupon.discountValue / 100)
      );
    } else if (coupon.discountType === "FLAT") {
      couponDiscount = Math.min(coupon.discountValue, subtotal);
    }
  }

  const finalTotal = Math.max(0, subtotal - couponDiscount);
  const perMonth =
    plan.durationMonths > 0
      ? Math.round(finalTotal / plan.durationMonths)
      : finalTotal;
  const savings = grossTotal - finalTotal;
  const savingsPercentage =
    grossTotal > 0 ? Math.round((savings / grossTotal) * 100) : 0;

  return {
    grossTotal,
    planDiscount,
    subtotal,
    couponDiscount,
    finalTotal,
    perMonth,
    savings,
    savingsPercentage,
  };
}

/**
 * Calculate partial payment amounts
 */
export function calculatePartialPayment(
  totalAmount: number,
  upfrontPercentage: number,
  minUpfrontPercentage: number = 50
) {
  // Clamp between min and 90%
  const clampedPercentage = Math.max(
    minUpfrontPercentage,
    Math.min(90, upfrontPercentage)
  );

  const upfrontAmount = Math.round(
    totalAmount * (clampedPercentage / 100)
  );
  const remainingBalance = totalAmount - upfrontAmount;

  return {
    upfrontPercentage: clampedPercentage,
    upfrontAmount,
    remainingBalance,
  };
}

/**
 * Format currency in INR
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generate a unique invoice number
 * Format: INV-YYYYMM-XXXX
 */
export function generateInvoiceNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `INV-${year}${month}-${random}`;
}
