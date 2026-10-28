"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { SubscriptionPlan, ISubscriptionPlanDocument } from "@/models/SubscriptionPlan";
import { planSchema, type PlanFormData } from "@/lib/validations";

const DEFAULT_PLANS = [
  {
    _id: "plan_starter_1m",
    name: "Starter Velocity",
    description: "Ideal for committed beginners establishing consistency and athletic form.",
    durationMonths: 1,
    baseMonthlyPrice: 2499,
    discountPercentage: 0,
    allowPartialPayment: true,
    minUpfrontPercentage: 50,
    features: [
      "Full 24/7 access to all 12 metro clubs",
      "Complimentary fitness & biometric assessment",
      "Locker room & sauna access",
      "HyperGym mobile tracking suite",
    ],
    isPopular: false,
    isActive: true,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "plan_pro_3m",
    name: "Pro Performance",
    description: "The accelerated 90-day hypertrophy and metabolic transformation system.",
    durationMonths: 3,
    baseMonthlyPrice: 2199,
    discountPercentage: 12,
    allowPartialPayment: true,
    minUpfrontPercentage: 50,
    features: [
      "All Starter benefits included",
      "3 Complimentary 1-on-1 PT coaching sessions",
      "Advanced body composition scan every 30 days",
      "Priority group fitness class booking",
      "Hydro-massage lounge passes",
    ],
    isPopular: true,
    isActive: true,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "plan_elite_6m",
    name: "Elite Strength",
    description: "Designed for competitive athletes seeking total body and endurance re-engineering.",
    durationMonths: 6,
    baseMonthlyPrice: 1999,
    discountPercentage: 20,
    allowPartialPayment: true,
    minUpfrontPercentage: 50,
    features: [
      "All Pro benefits included",
      "8 Personal training sessions with Elite Master Coach",
      "Custom sports nutritionist meal programming",
      "Guest passes (2 per month)",
      "Dedicated athletic recovery towel & laundry service",
    ],
    isPopular: false,
    isActive: true,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "plan_champion_12m",
    name: "Champion Annual",
    description: "The ultimate 365-day all-access luxury fitness sanctuary for serious champions.",
    durationMonths: 12,
    baseMonthlyPrice: 1699,
    discountPercentage: 32,
    allowPartialPayment: true,
    minUpfrontPercentage: 50,
    features: [
      "All Elite benefits included",
      "Unlimited guest privileges",
      "VIP locker suite with personal biometric key",
      "Quarterly wellness retreat invitations",
      "HyperGym Champion apparel & supplement kit",
    ],
    isPopular: false,
    isActive: true,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function getPlans(includeInactive = false) {
  try {
    await connectToDatabase();
    const query = includeInactive ? {} : { isActive: true };
    const plans = await SubscriptionPlan.find(query).sort({ durationMonths: 1 }).lean();

    if (plans.length > 0) {
      return JSON.parse(JSON.stringify(plans));
    }

    // Seed defaults if database is empty
    await SubscriptionPlan.insertMany(DEFAULT_PLANS);
    const seeded = await SubscriptionPlan.find(query).sort({ durationMonths: 1 }).lean();
    return JSON.parse(JSON.stringify(seeded));
  } catch (error) {
    console.warn("MongoDB getPlans error, falling back to in-memory plans:", error);
    return DEFAULT_PLANS.filter((p) => includeInactive || p.isActive);
  }
}

export async function getPlanById(id: string) {
  const aliasMap: Record<string, string> = {
    basic: "plan_starter_1m",
    pro: "plan_pro_3m",
    elite: "plan_elite_6m",
    champion: "plan_champion_12m",
  };
  const targetId = aliasMap[id] || id;

  try {
    await connectToDatabase();
    const plan = await SubscriptionPlan.findOne({
      $or: [{ _id: targetId }, { name: new RegExp(`^${id}`, "i") }],
    }).lean();
    if (plan) return JSON.parse(JSON.stringify(plan));
  } catch {
    // fallback search in default plans
  }
  return DEFAULT_PLANS.find((p) => p._id === targetId || p._id === id) || DEFAULT_PLANS[1];
}

export async function createPlan(formData: PlanFormData) {
  try {
    const validated = planSchema.parse(formData);
    await connectToDatabase();

    const newPlan = await SubscriptionPlan.create({
      ...validated,
      version: 1,
      isActive: true,
    });

    revalidatePath("/admin/plans");
    revalidatePath("/#plans");
    revalidatePath("/dashboard");
    return { success: true, plan: JSON.parse(JSON.stringify(newPlan)) };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create plan" };
  }
}

export async function updatePlan(id: string, formData: Partial<PlanFormData>) {
  try {
    await connectToDatabase();
    const existing = await SubscriptionPlan.findById(id);
    if (!existing) return { success: false, error: "Plan not found" };

    // Increment version if price or duration is altered to maintain snapshot traceability
    const priceChanged =
      formData.baseMonthlyPrice !== undefined &&
      formData.baseMonthlyPrice !== existing.baseMonthlyPrice;
    const discountChanged =
      formData.discountPercentage !== undefined &&
      formData.discountPercentage !== existing.discountPercentage;
    const durationChanged =
      formData.durationMonths !== undefined &&
      formData.durationMonths !== existing.durationMonths;

    const nextVersion = priceChanged || discountChanged || durationChanged
      ? existing.version + 1
      : existing.version;

    Object.assign(existing, formData);
    existing.version = nextVersion;
    await existing.save();

    revalidatePath("/admin/plans");
    revalidatePath("/#plans");
    revalidatePath("/dashboard");
    return { success: true, plan: JSON.parse(JSON.stringify(existing)) };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update plan" };
  }
}

export async function togglePlanActive(id: string) {
  try {
    await connectToDatabase();
    const plan = await SubscriptionPlan.findById(id);
    if (!plan) return { success: false, error: "Plan not found" };

    plan.isActive = !plan.isActive;
    await plan.save();

    revalidatePath("/admin/plans");
    revalidatePath("/#plans");
    return { success: true, isActive: plan.isActive };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to toggle plan status" };
  }
}
