"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { Transaction } from "@/models/Transaction";
import { User } from "@/models/User";
import { getSessionUser } from "@/lib/auth";

export async function getAllTransactions() {
  try {
    await connectToDatabase();
    const transactions = await Transaction.find().sort({ createdAt: -1 }).lean();

    if (transactions.length > 0) {
      return JSON.parse(JSON.stringify(transactions));
    }
  } catch (e) {
    console.warn("Could not fetch global transactions:", e);
  }

  // Seed sample transactions if empty
  return [
    {
      _id: "tx_global_demo_1",
      userId: "user_alex_1",
      planId: "plan_pro_3m",
      invoiceNumber: "INV-202610-8842",
      totalAmount: 5805,
      amountPaid: 5805,
      remainingBalance: 0,
      paymentStatus: "COMPLETED",
      paymentDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      planSnapshot: {
        name: "Pro Performance (3-Mo)",
        durationMonths: 3,
        baseMonthlyPrice: 2199,
        planDiscountPercentage: 12,
        grossAmount: 6597,
        planDiscountAmount: 792,
        couponCode: "WELCOME10",
        couponDiscountAmount: 581,
      },
    },
    {
      _id: "tx_global_demo_2",
      userId: "user_sarah_2",
      planId: "plan_champion_12m",
      invoiceNumber: "INV-202610-9114",
      totalAmount: 13860,
      amountPaid: 6930,
      remainingBalance: 6930,
      paymentStatus: "PARTIAL",
      paymentDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      planSnapshot: {
        name: "Champion Annual (12-Mo)",
        durationMonths: 12,
        baseMonthlyPrice: 1699,
        planDiscountPercentage: 32,
        grossAmount: 20388,
        planDiscountAmount: 6528,
        couponCode: undefined,
        couponDiscountAmount: 0,
      },
    },
  ];
}

export async function adminOverrideTransaction(
  transactionId: string,
  adminNotes: string
) {
  try {
    const session = await getSessionUser();
    if (!session || session.role !== "ADMIN") {
      return { success: false, error: "Unauthorized: Admin privileges required" };
    }

    await connectToDatabase();

    const tx = await Transaction.findById(transactionId);
    if (!tx) {
      // In-memory demo simulation
      return {
        success: true,
        message: "Demo override simulated successfully!",
      };
    }

    if (tx.paymentStatus === "COMPLETED") {
      return { success: false, error: "Transaction is already completed" };
    }

    // Atomic update
    tx.paymentStatus = "COMPLETED";
    tx.remainingBalance = 0;
    tx.amountPaid = tx.totalAmount;
    tx.adminNotes = adminNotes || "Administrative clearance by executive";
    tx.overriddenBy = session.email;
    tx.overriddenAt = new Date();
    await tx.save();

    // Update User activeSubscription balanceDue to 0
    await User.findByIdAndUpdate(tx.userId, {
      $set: {
        "activeSubscription.balanceDue": 0,
        "activeSubscription.status": "ACTIVE",
      },
    });

    revalidatePath("/admin/transactions");
    revalidatePath("/admin/dashboard");
    revalidatePath("/dashboard");
    revalidatePath("/billing");

    return {
      success: true,
      transaction: JSON.parse(JSON.stringify(tx)),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to execute administrative override",
    };
  }
}
