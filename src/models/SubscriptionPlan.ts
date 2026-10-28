import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubscriptionPlanDocument extends Document {
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

const SubscriptionPlanSchema = new Schema<ISubscriptionPlanDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    durationMonths: {
      type: Number,
      required: true,
      enum: [1, 3, 6, 12],
    },
    baseMonthlyPrice: { type: Number, required: true, min: 0 },
    discountPercentage: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
    allowPartialPayment: { type: Boolean, default: true },
    minUpfrontPercentage: { type: Number, default: 50, min: 10, max: 100 },
    features: { type: [String], default: [] },
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    version: { type: Number, default: 1, min: 1 },
  },
  {
    timestamps: true,
  }
);

// Indexes
SubscriptionPlanSchema.index({ isActive: 1, durationMonths: 1 });

export const SubscriptionPlan: Model<ISubscriptionPlanDocument> =
  mongoose.models.SubscriptionPlan ||
  mongoose.model<ISubscriptionPlanDocument>("SubscriptionPlan", SubscriptionPlanSchema);
