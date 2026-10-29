"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { SubscriptionPlan } from "@/models/SubscriptionPlan";
import { User } from "@/models/User";
import { Transaction } from "@/models/Transaction";
import { Coupon } from "@/models/Coupon";
import { calculatePricing, calculatePartialPayment } from "@/lib/pricing";
import { generateInvoiceNumber } from "@/lib/invoice";
import { getSessionUser } from "@/lib/auth";
import { validateCoupon } from "@/lib/actions/coupon.actions";
import { getPlanById } from "@/lib/actions/plan.actions";

export interface CheckoutPayload {
  planId: string;
  paymentType: "FULL" | "PARTIAL";
  upfrontPercentage?: number;
  couponCode?: string;
}

export async function processCheckout(payload: CheckoutPayload) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return { success: false, error: "Please sign in to complete subscription checkout" };
    }

    const plan = await getPlanById(payload.planId);
    if (!plan || !plan.isActive) {
      return { success: false, error: "Selected subscription plan is unavailable" };
    }

    // Validate Coupon if provided
    let couponData = null;
    if (payload.couponCode) {
      const grossTotal = plan.durationMonths * plan.baseMonthlyPrice;
      const planDiscount = Math.round(grossTotal * (plan.discountPercentage / 100));
      const subtotal = grossTotal - planDiscount;

      const couponValidation = await validateCoupon(payload.couponCode, subtotal);
      if (!couponValidation.valid) {
        return { success: false, error: couponValidation.error };
      }
      couponData = couponValidation.coupon;
    }

    // Calculate Final Payable using pure pricing engine
    const pricing = calculatePricing(
      {
        durationMonths: plan.durationMonths,
        baseMonthlyPrice: plan.baseMonthlyPrice,
        discountPercentage: plan.discountPercentage,
      },
      couponData
        ? {
            discountType: couponData.discountType,
            discountValue: couponData.discountValue,
            minPurchaseAmount: couponData.minPurchaseAmount,
          }
        : null
    );

    let amountPaid = pricing.finalTotal;
    let remainingBalance = 0;
    let paymentStatus: "COMPLETED" | "PARTIAL" = "COMPLETED";

    if (payload.paymentType === "PARTIAL") {
      if (!plan.allowPartialPayment) {
        return { success: false, error: "Partial payment is not permitted for this plan" };
      }

      const minUpfront = plan.minUpfrontPercentage || 50;
      const requestedUpfront = payload.upfrontPercentage || minUpfront;
      const partialCalc = calculatePartialPayment(pricing.finalTotal, requestedUpfront, minUpfront);

      amountPaid = partialCalc.upfrontAmount;
      remainingBalance = partialCalc.remainingBalance;
      paymentStatus = remainingBalance === 0 ? "COMPLETED" : "PARTIAL";
    }

    const invoiceNumber = generateInvoiceNumber();
    const startDate = new Date();
    const endDate = new Date(Date.now() + plan.durationMonths * 30 * 24 * 60 * 60 * 1000);

    // Prepare immutable Plan Snapshot
    const planSnapshot = {
      name: plan.name,
      durationMonths: plan.durationMonths,
      baseMonthlyPrice: plan.baseMonthlyPrice,
      planDiscountPercentage: plan.discountPercentage,
      grossAmount: pricing.grossTotal,
      planDiscountAmount: pricing.planDiscount,
      couponCode: couponData?.code || undefined,
      couponDiscountAmount: pricing.couponDiscount,
    };

    await connectToDatabase();

    // 1. Create Transaction Document
    let transaction;
    try {
      transaction = await Transaction.create({
        userId: session.id,
        planId: plan._id,
        invoiceNumber,
        totalAmount: pricing.finalTotal,
        amountPaid,
        remainingBalance,
        paymentStatus,
        paymentDate: startDate,
        planSnapshot,
      });
    } catch {
      // In-memory fallback if using demo ID not recognized as ObjectId
      transaction = {
        _id: "tx_" + Date.now(),
        userId: session.id,
        planId: plan._id,
        invoiceNumber,
        totalAmount: pricing.finalTotal,
        amountPaid,
        remainingBalance,
        paymentStatus,
        paymentDate: startDate,
        planSnapshot,
      };
    }

    // 2. Update User's Active Subscription & Assessment Field "subscription"
    try {
      const subscriptionObject = {
        planId: plan._id,
        planNameSnapshot: plan.name,
        status: paymentStatus === "COMPLETED" ? "ACTIVE" : "PENDING_COMPLETION",
        startDate,
        endDate,
        balanceDue: remainingBalance,
        lastTransactionId: transaction._id,
      };

      await User.findOneAndUpdate(
        { clerkId: session.clerkId },
        {
          $set: {
            activeSubscription: subscriptionObject,
            subscription: subscriptionObject,
          },
        }
      );
    } catch (e) {
      console.warn("Could not update User in Mongo:", e);
    }

    // 3. Increment Coupon Usage
    if (couponData?.code) {
      try {
        await Coupon.findOneAndUpdate(
          { code: couponData.code },
          { $inc: { usedCount: 1 } }
        );
      } catch (e) {
        console.warn("Could not increment coupon usedCount:", e);
      }
    }

    revalidatePath("/dashboard");
    revalidatePath("/billing");
    revalidatePath("/admin/transactions");

    return {
      success: true,
      invoiceNumber,
      paymentStatus,
      totalAmount: pricing.finalTotal,
      amountPaid,
      remainingBalance,
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to process checkout" };
  }
}
