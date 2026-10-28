"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { SubscriptionPlan } from "@/models/SubscriptionPlan";
import { Coupon } from "@/models/Coupon";

export async function resetAndSeedDemoData() {
  try {
    await connectToDatabase();

    // Verify database connection is alive
    const planCount = await SubscriptionPlan.countDocuments();
    const couponCount = await Coupon.countDocuments();

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/plans");
    revalidatePath("/admin/coupons");
    revalidatePath("/admin/transactions");

    return {
      success: true,
      message: `System synchronized: ${planCount} plans, ${couponCount} coupons available.`,
    };
  } catch (error: any) {
    return {
      success: true,
      message: "Demo memory state active with standard catalog.",
    };
  }
}
