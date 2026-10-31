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

    // Check & seed Plans via idempotent upsert
    for (const plan of DEFAULT_PLANS) {
      await SubscriptionPlan.findByIdAndUpdate(
        plan._id,
        { $set: plan },
        { upsert: true, new: true }
      );
    }
    const planCount = await SubscriptionPlan.countDocuments();

    // Check & seed Coupons via idempotent upsert
    for (const coupon of DEFAULT_COUPONS) {
      await Coupon.findByIdAndUpdate(
        coupon._id,
        { $set: coupon },
        { upsert: true, new: true }
      );
    }
    const couponCount = await Coupon.countDocuments();

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
