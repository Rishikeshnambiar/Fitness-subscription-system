import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SubscriptionPlan } from "@/models/SubscriptionPlan";
import { Coupon } from "@/models/Coupon";
import { Transaction } from "@/models/Transaction";
import { User } from "@/models/User";
import { DEFAULT_PLANS, DEFAULT_COUPONS } from "@/lib/constants/defaults";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Check & seed Plans via idempotent upsert
    for (const plan of DEFAULT_PLANS) {
      await SubscriptionPlan.findByIdAndUpdate(
        plan._id,
        { $set: plan },
        { upsert: true, new: true }
      );
    }
    const planCount = await SubscriptionPlan.countDocuments();

    // 2. Check & seed Coupons via idempotent upsert
    for (const coupon of DEFAULT_COUPONS) {
      await Coupon.findByIdAndUpdate(
        coupon._id,
        { $set: coupon },
        { upsert: true, new: true }
      );
    }
    const couponCount = await Coupon.countDocuments();

    // 3. Check & seed Demo Users with realistic active subscriptions
    const demoUsers = [
      {
        clerkId: "demo_admin_clerk_id",
        email: "admin@hypergym.com",
        firstName: "Rishikesh",
        lastName: "Nambiar",
        role: "ADMIN" as const,
        subscription: null,
        activeSubscription: null,
      },
      {
        clerkId: "demo_user_clerk_id",
        email: "alex.rider@hypergym.com",
        firstName: "Alex",
        lastName: "Rider",
        role: "USER" as const,
        subscription: {
          planId: "plan_pro_3m",
          planNameSnapshot: "Pro Performance (3-Mo)",
          status: "PENDING_COMPLETION" as const,
          startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000),
          balanceDue: 2902,
          lastTransactionId: "INV-2026-00109",
        },
        activeSubscription: {
          planId: "plan_pro_3m",
          planNameSnapshot: "Pro Performance (3-Mo)",
          status: "PENDING_COMPLETION" as const,
          startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000),
          balanceDue: 2902,
          lastTransactionId: "INV-2026-00109",
        },
      },
      {
        clerkId: "user_sarah_clerk_id",
        email: "sarah.j@hypergym.com",
        firstName: "Sarah",
        lastName: "Jenkins",
        role: "USER" as const,
        subscription: {
          planId: "plan_champion_12m",
          planNameSnapshot: "Champion Annual (12-Mo)",
          status: "ACTIVE" as const,
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000),
          balanceDue: 0,
          lastTransactionId: "INV-2026-00108",
        },
        activeSubscription: {
          planId: "plan_champion_12m",
          planNameSnapshot: "Champion Annual (12-Mo)",
          status: "ACTIVE" as const,
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000),
          balanceDue: 0,
          lastTransactionId: "INV-2026-00108",
        },
      },
      {
        clerkId: "user_marcus_clerk_id",
        email: "marcus.v@hypergym.com",
        firstName: "Marcus",
        lastName: "Vance",
        role: "USER" as const,
        subscription: {
          planId: "plan_starter_1m",
          planNameSnapshot: "Starter Velocity (1-Mo)",
          status: "ACTIVE" as const,
          startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
          balanceDue: 0,
          lastTransactionId: "INV-2026-00107",
        },
        activeSubscription: {
          planId: "plan_starter_1m",
          planNameSnapshot: "Starter Velocity (1-Mo)",
          status: "ACTIVE" as const,
          startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
          balanceDue: 0,
          lastTransactionId: "INV-2026-00107",
        },
      },
    ];

    for (const u of demoUsers) {
      await User.findOneAndUpdate(
        { clerkId: u.clerkId },
        { $set: u },
        { upsert: true, new: true }
      );
    }
    const userCount = await User.countDocuments();

    // 4. Check & seed Sample Demonstration Transactions
    const demoTransactions = [
      {
        userId: "demo_user_clerk_id",
        planId: "plan_pro_3m",
        invoiceNumber: "INV-2026-00109",
        totalAmount: 5805,
        amountPaid: 2903,
        remainingBalance: 2902,
        paymentStatus: "PARTIAL" as const,
        paymentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        planSnapshot: {
          name: "Pro Performance (3-Mo)",
          durationMonths: 3,
          baseMonthlyPrice: 2199,
          planDiscountPercentage: 12,
          grossAmount: 6597,
          planDiscountAmount: 792,
          couponCode: "WELCOME10",
          couponDiscountAmount: 580,
        },
      },
      {
        userId: "user_sarah_clerk_id",
        planId: "plan_champion_12m",
        invoiceNumber: "INV-2026-00108",
        totalAmount: 13864,
        amountPaid: 13864,
        remainingBalance: 0,
        paymentStatus: "COMPLETED" as const,
        paymentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        planSnapshot: {
          name: "Champion Annual (12-Mo)",
          durationMonths: 12,
          baseMonthlyPrice: 1699,
          planDiscountPercentage: 32,
          grossAmount: 20388,
          planDiscountAmount: 6524,
          couponCode: undefined,
          couponDiscountAmount: 0,
        },
      },
      {
        userId: "user_marcus_clerk_id",
        planId: "plan_starter_1m",
        invoiceNumber: "INV-2026-00107",
        totalAmount: 2499,
        amountPaid: 2499,
        remainingBalance: 0,
        paymentStatus: "COMPLETED" as const,
        paymentDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        planSnapshot: {
          name: "Starter Velocity (1-Mo)",
          durationMonths: 1,
          baseMonthlyPrice: 2499,
          planDiscountPercentage: 0,
          grossAmount: 2499,
          planDiscountAmount: 0,
          couponCode: undefined,
          couponDiscountAmount: 0,
        },
      },
    ];

    for (const tx of demoTransactions) {
      await Transaction.findOneAndUpdate(
        { invoiceNumber: tx.invoiceNumber },
        { $set: tx },
        { upsert: true, new: true }
      );
    }
    const transactionCount = await Transaction.countDocuments();

    return NextResponse.json({
      status: "success",
      database: "connected",
      message: "HyperGym database successfully seeded and synchronized.",
      stats: {
        plans: planCount,
        coupons: couponCount,
        users: userCount,
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

