import { z } from "zod";

export const planSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  durationMonths: z.coerce.number().refine((val) => [1, 3, 6, 12].includes(val), {
    message: "Duration must be 1, 3, 6, or 12 months",
  }),
  baseMonthlyPrice: z.coerce.number().min(1, "Base monthly price must be positive"),
  discountPercentage: z.coerce.number().min(0).max(100, "Discount cannot exceed 100%"),
  allowPartialPayment: z.boolean().default(true),
  minUpfrontPercentage: z.coerce.number().min(10).max(100).default(50),
  features: z.array(z.string()).default([]),
  isPopular: z.boolean().default(false),
});

export type PlanFormData = z.infer<typeof planSchema>;

export const couponSchema = z.object({
  code: z
    .string()
    .min(3, "Code must be at least 3 characters")
    .max(20, "Code cannot exceed 20 characters")
    .regex(/^[A-Z0-9_-]+$/, "Code must be uppercase alphanumeric"),
  discountType: z.enum(["FLAT", "PERCENTAGE"]),
  discountValue: z.coerce.number().min(1, "Discount value must be positive"),
  minPurchaseAmount: z.coerce.number().min(0).default(0),
  maxUsage: z.coerce.number().min(1).default(100),
  expiresAt: z.string().or(z.date()),
  isActive: z.boolean().default(true),
});

export type CouponFormData = z.infer<typeof couponSchema>;
