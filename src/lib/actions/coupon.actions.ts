"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { Coupon, ICouponDocument } from "@/models/Coupon";
import { couponSchema, type CouponFormData } from "@/lib/validations";

const DEFAULT_COUPONS = [
  {
    _id: "coupon_welcome10",
    code: "WELCOME10",
    discountType: "PERCENTAGE" as const,
    discountValue: 10,
    minPurchaseAmount: 1000,
    maxUsage: 500,
    usedCount: 14,
    expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    _id: "coupon_fithalf",
    code: "FITHALF",
    discountType: "PERCENTAGE" as const,
    discountValue: 50,
    minPurchaseAmount: 2000,
    maxUsage: 50,
    usedCount: 8,
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    _id: "coupon_flat1000",
    code: "FLAT1000",
    discountType: "FLAT" as const,
    discountValue: 1000,
    minPurchaseAmount: 5000,
    maxUsage: 200,
    usedCount: 42,
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    _id: "coupon_hypervip",
    code: "HYPERVIP",
    discountType: "PERCENTAGE" as const,
    discountValue: 25,
    minPurchaseAmount: 4000,
    maxUsage: 100,
    usedCount: 19,
    expiresAt: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
];

export async function getCoupons() {
  try {
    await connectToDatabase();
    const coupons = await Coupon.find().sort({ createdAt: -1 }).lean();

    if (coupons.length > 0) {
      return JSON.parse(JSON.stringify(coupons));
    }

    // Seed default coupons if collection is empty
    await Coupon.insertMany(DEFAULT_COUPONS);
    const seeded = await Coupon.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(seeded));
  } catch (error) {
    console.warn("MongoDB getCoupons error, using fallback coupons:", error);
    return DEFAULT_COUPONS;
  }
}

export async function createCoupon(formData: CouponFormData) {
  try {
    const validated = couponSchema.parse(formData);
    await connectToDatabase();

    const existing = await Coupon.findOne({ code: validated.code.toUpperCase() });
    if (existing) {
      return { success: false, error: "A coupon with this code already exists" };
    }

    const newCoupon = await Coupon.create({
      ...validated,
      code: validated.code.toUpperCase(),
      expiresAt: new Date(validated.expiresAt),
      usedCount: 0,
      isActive: true,
    });

    revalidatePath("/admin/coupons");
    return { success: true, coupon: JSON.parse(JSON.stringify(newCoupon)) };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create coupon" };
  }
}

export async function toggleCouponActive(id: string) {
  try {
    await connectToDatabase();
    const coupon = await Coupon.findById(id);
    if (!coupon) return { success: false, error: "Coupon not found" };

    coupon.isActive = !coupon.isActive;
    await coupon.save();

    revalidatePath("/admin/coupons");
    return { success: true, isActive: coupon.isActive };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to toggle coupon status" };
  }
}

export async function validateCoupon(code: string, purchaseAmount: number) {
  try {
    const cleanCode = code.trim().toUpperCase();
    await connectToDatabase();

    let coupon = await Coupon.findOne({ code: cleanCode });

    if (!coupon) {
      // Fallback in memory
      const fallback = DEFAULT_COUPONS.find((c) => c.code === cleanCode);
      if (!fallback) {
        return { valid: false, error: "Invalid coupon code" };
      }
      coupon = fallback as any;
    }

    if (!coupon!.isActive) {
      return { valid: false, error: "This coupon is no longer active" };
    }

    if (new Date(coupon!.expiresAt) < new Date()) {
      return { valid: false, error: "This coupon has expired" };
    }

    if (coupon!.usedCount >= coupon!.maxUsage) {
      return { valid: false, error: "This coupon has reached its maximum redemptions" };
    }

    if (coupon!.minPurchaseAmount && purchaseAmount < coupon!.minPurchaseAmount) {
      return {
        valid: false,
        error: `Minimum cart value of ₹${coupon!.minPurchaseAmount.toLocaleString("en-IN")} required`,
      };
    }

    return {
      valid: true,
      coupon: {
        code: coupon!.code,
        discountType: coupon!.discountType,
        discountValue: coupon!.discountValue,
        minPurchaseAmount: coupon!.minPurchaseAmount,
      },
    };
  } catch (error: any) {
    return { valid: false, error: "Coupon verification error" };
  }
}
