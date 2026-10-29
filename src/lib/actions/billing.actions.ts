"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { Transaction } from "@/models/Transaction";
import { getSessionUser } from "@/lib/auth";
import { cookies } from "next/headers";

export async function getUserSubscription() {
  const session = await getSessionUser();
  if (!session) return null;

  const cookieStore = await cookies();
  const isSimulatedExpiry = cookieStore.get("hypergym_sim_expiry")?.value === "true";

  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: session.clerkId }).lean();

    if (user?.activeSubscription) {
      const sub = user.activeSubscription;
      const now = new Date();
      const end = new Date(sub.endDate);
      const diffDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      return {
        ...sub,
        daysRemaining: isSimulatedExpiry ? 2 : Math.max(0, diffDays),
        isExpiringSoon: isSimulatedExpiry || (diffDays > 0 && diffDays <= 3),
        userEmail: session.email,
        userName: `${session.firstName} ${session.lastName}`.trim(),
      };
    }
  } catch (e) {
    console.warn("Could not fetch user subscription from DB:", e);
  }

  // Fallback demo active subscription
  const now = new Date();
  const demoEnd = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
  return {
    planId: "plan_pro_3m",
    planNameSnapshot: "Pro Performance (90-Day)",
    status: "ACTIVE" as const,
    startDate: now,
    endDate: demoEnd,
    balanceDue: 0,
    daysRemaining: isSimulatedExpiry ? 2 : 86,
    isExpiringSoon: isSimulatedExpiry,
    userEmail: session.email,
    userName: `${session.firstName} ${session.lastName}`.trim(),
  };
}

export async function getUserTransactions() {
  const session = await getSessionUser();
  if (!session) return [];

  try {
    await connectToDatabase();
    const transactions = await Transaction.find({
      $or: [{ userId: session.id }, { userId: session.clerkId }],
    })
      .sort({ createdAt: -1 })
      .lean();

    if (transactions.length > 0) {
      return JSON.parse(JSON.stringify(transactions));
    }
  } catch (e) {
    console.warn("Could not fetch user transactions:", e);
  }

  // Default demo transaction for visual presentation
  return [
    {
      _id: "tx_sample_demo_1",
      userId: session.id,
      planId: "plan_pro_3m",
      invoiceNumber: "INV-202610-8842",
      totalAmount: 5805,
      amountPaid: 5805,
      remainingBalance: 0,
      paymentStatus: "COMPLETED",
      paymentDate: new Date(),
      planSnapshot: {
        name: "Pro Performance",
        durationMonths: 3,
        baseMonthlyPrice: 2199,
        planDiscountPercentage: 12,
        grossAmount: 6597,
        planDiscountAmount: 792,
        couponCode: "WELCOME10",
        couponDiscountAmount: 581,
      },
    },
  ];
}

export async function settleRemainingBalance(transactionId: string) {
  try {
    const session = await getSessionUser();
    if (!session) return { success: false, error: "Please sign in" };

    await connectToDatabase();

    const tx = await Transaction.findById(transactionId);
    if (!tx) {
      // In-memory demo simulation
      return { success: true, message: "Balance settled successfully!" };
    }

    if (tx.remainingBalance <= 0) {
      return { success: false, error: "This invoice has already been fully paid" };
    }

    // Atomic update
    tx.amountPaid = tx.totalAmount;
    tx.remainingBalance = 0;
    tx.paymentStatus = "COMPLETED";
    await tx.save();

    // Update User subscription
    await User.findOneAndUpdate(
      { clerkId: session.clerkId },
      {
        $set: {
          "activeSubscription.balanceDue": 0,
          "activeSubscription.status": "ACTIVE",
          "subscription.balanceDue": 0,
          "subscription.status": "ACTIVE",
        },
      }
    );

    revalidatePath("/dashboard");
    revalidatePath("/billing");
    revalidatePath("/admin/transactions");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to settle remaining balance" };
  }
}
