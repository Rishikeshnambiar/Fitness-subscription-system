import mongoose, { Schema, Document, Model } from "mongoose";
import type { UserRole, SubscriptionStatus } from "@/types";

export interface IUserDocument extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  role: UserRole;
  activeSubscription?: {
    planId: mongoose.Types.ObjectId;
    planNameSnapshot: string;
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    balanceDue: number;
    lastTransactionId?: mongoose.Types.ObjectId;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ActiveSubscriptionSchema = new Schema(
  {
    planId: { type: Schema.Types.ObjectId, ref: "SubscriptionPlan", required: true },
    planNameSnapshot: { type: String, required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "PENDING_COMPLETION", "NONE"],
      default: "NONE",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    balanceDue: { type: Number, default: 0, min: 0 },
    lastTransactionId: { type: Schema.Types.ObjectId, ref: "Transaction" },
  },
  { _id: false }
);

const UserSchema = new Schema<IUserDocument>(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
      index: true,
    },
    activeSubscription: {
      type: ActiveSubscriptionSchema,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);
