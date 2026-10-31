import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SubscriptionPlan } from "@/models/SubscriptionPlan";
import { Coupon } from "@/models/Coupon";
import { Transaction } from "@/models/Transaction";
import { DEFAULT_PLANS, DEFAULT_COUPONS } from "@/lib/constants/defaults";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    // Check & seed Plans
    let planCount = await SubscriptionPlan.countDocuments();
    if (planCount === 0) {
      await SubscriptionPlan.insertMany(DEFAULT_PLANS);
      planCount = await SubscriptionPlan.countDocuments();
    }

    // Check & seed Coupons
    let couponCount = await Coupon.countDocuments();
    if (couponCount === 0) {
      await Coupon.insertMany(DEFAULT_COUPONS);
      couponCount = await Coupon.countDocuments();
    }

    // Check & seed Sample Demonstration Transaction
    let transactionCount = await Transaction.countDocuments();
    if (transactionCount === 0) {
      await Transaction.create({
        userId: "demo_user_clerk_id",
        planId: "plan_pro_3m",
        invoiceNumber: "INV-2026-00109",
        totalAmount: 5805,
        amountPaid: 2903,
        remainingBalance: 2902,
        paymentStatus: "PARTIAL",
        paymentDate: new Date(),
        planSnapshot: {
          name: "Pro Performance",
          durationMonths: 3,
          baseMonthlyPrice: 2199,
          planDiscountPercentage: 12,
          grossAmount: 6597,
          planDiscountAmount: 792,
          couponCode: "WELCOME10",
          couponDiscountAmount: 580,
        },
      });
      transactionCount = await Transaction.countDocuments();
    }

    return NextResponse.json({
      status: "success",
      database: "connected",
      message: "HyperGym database successfully seeded and synchronized.",
      stats: {
        plans: planCount,
        coupons: couponCount,
        transactions: transactionCount,
      },
      organization: "AgarkarMedia Pvt. Ltd.",
      gstin: "27AAWCA1536C1ZP",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Database seed error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to MongoDB. Please verify MONGODB_URI in Vercel Environment Variables.",
        error: error?.message || "Unknown database error",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
