// ============================================
// HyperGym Fitness — Shared TypeScript Types
// ============================================

// --- User Roles ---
export type UserRole = "ADMIN" | "USER";

// --- Subscription Statuses ---
export type SubscriptionStatus =
  | "ACTIVE"
  | "EXPIRED"
  | "PENDING_COMPLETION"
  | "NONE";

// --- Payment Statuses ---
export type PaymentStatus = "COMPLETED" | "PARTIAL" | "FAILED";

// --- Coupon Types ---
export type CouponDiscountType = "FLAT" | "PERCENTAGE";

// --- Subscription Plan ---
export interface ISubscriptionPlan {
  _id: string;
  name: string;
  description: string;
  durationMonths: number;
  baseMonthlyPrice: number;
  discountPercentage: number;
  allowPartialPayment: boolean;
  minUpfrontPercentage: number;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

// --- User ---
export interface IUser {
  _id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  role: UserRole;
  activeSubscription?: {
    planId: string;
    planNameSnapshot: string;
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    balanceDue: number;
    lastTransactionId?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// --- Plan Snapshot (Embedded in Transaction) ---
export interface IPlanSnapshot {
  name: string;
  durationMonths: number;
  baseMonthlyPrice: number;
  planDiscountPercentage: number;
  grossAmount: number;
  planDiscountAmount: number;
  couponCode?: string;
  couponDiscountAmount: number;
}

// --- Transaction ---
export interface ITransaction {
  _id: string;
  userId: string;
  planId: string;
  invoiceNumber: string;
  totalAmount: number;
  amountPaid: number;
  remainingBalance: number;
  paymentStatus: PaymentStatus;
  paymentDate: Date;
  planSnapshot: IPlanSnapshot;
  adminNotes?: string;
  overriddenBy?: string;
  overriddenAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// --- Coupon ---
export interface ICoupon {
  _id: string;
  code: string;
  discountType: CouponDiscountType;
  discountValue: number;
  minPurchaseAmount?: number;
  maxUsage: number;
  usedCount: number;
  expiresAt: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// --- Pricing Calculation Result ---
export interface PricingBreakdown {
  grossTotal: number;
  planDiscount: number;
  subtotal: number;
  couponDiscount: number;
  finalTotal: number;
  perMonth: number;
  savings: number;
  savingsPercentage: number;
}

// --- Plan Card Props (for UI) ---
export interface PlanCardData {
  id: string;
  name: string;
  description: string;
  durationMonths: number;
  baseMonthlyPrice: number;
  discountPercentage: number;
  features: string[];
  isPopular: boolean;
  allowPartialPayment: boolean;
  effectiveMonthlyPrice: number;
  totalPrice: number;
  savings: number;
}
