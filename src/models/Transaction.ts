import mongoose, { Schema, Document, Model } from "mongoose";
import type { PaymentStatus } from "@/types";

export interface ITransactionDocument extends Document {
  userId: any;
  planId: any;
  invoiceNumber: string;
  totalAmount: number;
  amountPaid: number;
  remainingBalance: number;
  paymentStatus: PaymentStatus;
  paymentDate: Date;
  planSnapshot: {
    name: string;
    durationMonths: number;
    baseMonthlyPrice: number;
    planDiscountPercentage: number;
    grossAmount: number;
    planDiscountAmount: number;
    couponCode?: string;
    couponDiscountAmount: number;
  };
  adminNotes?: string;
  overriddenBy?: string;
  overriddenAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PlanSnapshotSchema = new Schema(
  {
    name: { type: String, required: true },
    durationMonths: { type: Number, required: true },
    baseMonthlyPrice: { type: Number, required: true },
    planDiscountPercentage: { type: Number, required: true },
    grossAmount: { type: Number, required: true },
    planDiscountAmount: { type: Number, required: true },
    couponCode: { type: String },
    couponDiscountAmount: { type: Number, default: 0 },
  },
  { _id: false }
);

const TransactionSchema = new Schema<ITransactionDocument>(
  {
    userId: { type: Schema.Types.Mixed, required: true, index: true },
    planId: { type: Schema.Types.Mixed, required: true },
    invoiceNumber: { type: String, required: true, unique: true, index: true },
    totalAmount: { type: Number, required: true, min: 0 },
    amountPaid: { type: Number, required: true, min: 0 },
    remainingBalance: { type: Number, required: true, min: 0 },
    paymentStatus: {
      type: String,
      enum: ["COMPLETED", "PARTIAL", "FAILED"],
      required: true,
      index: true,
    },
    paymentDate: { type: Date, default: Date.now, index: true },
    planSnapshot: { type: PlanSnapshotSchema, required: true },
    adminNotes: { type: String },
    overriddenBy: { type: String },
    overriddenAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const Transaction: Model<ITransactionDocument> =
  mongoose.models.Transaction ||
  mongoose.model<ITransactionDocument>("Transaction", TransactionSchema);
