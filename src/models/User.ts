import mongoose, { Schema, Document, Model } from "mongoose";
import type { UserRole, SubscriptionStatus } from "@/types";

export interface IUserSubscription {
  planId: mongoose.Types.ObjectId;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  balanceDue: number;
  planNameSnapshot?: string;
  lastTransactionId?: mongoose.Types.ObjectId;
}

export interface IUserDocument extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  role: UserRole;
  subscription?: IUserSubscription;
  activeSubscription?: IUserSubscription;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionEmbeddedSchema = new Schema(
  {
    planId: { type: Schema.Types.ObjectId, ref: "SubscriptionPlan", required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "PENDING_COMPLETION", "NONE"],
      default: "NONE",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    balanceDue: { type: Number, default: 0, min: 0 },
    planNameSnapshot: { type: String, default: "" },
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
    // Exact assessment field name: subscription
    subscription: {
      type: SubscriptionEmbeddedSchema,
      default: null,
    },
    // Mirror field for backwards compatibility
    activeSubscription: {
      type: SubscriptionEmbeddedSchema,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook ensuring subscription & activeSubscription stay in sync
UserSchema.pre("save", function () {
  if (this.subscription && !this.activeSubscription) {
    this.activeSubscription = this.subscription;
  } else if (this.activeSubscription && !this.subscription) {
    this.subscription = this.activeSubscription;
  }
});

export const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);
