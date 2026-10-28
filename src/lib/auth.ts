import { auth, currentUser } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/db";
import { User, IUserDocument } from "@/models/User";
import { cookies } from "next/headers";

export interface AppUserSession {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER";
  id: string;
}

/**
 * Upsert or fetch user in MongoDB by clerkId.
 * First user created in the database automatically receives the ADMIN role.
 */
export async function getOrCreateCurrentUser(clerkData?: {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}): Promise<IUserDocument | null> {
  await connectToDatabase();

  let targetClerkId = clerkData?.clerkId;
  let email = clerkData?.email;
  let firstName = clerkData?.firstName || "";
  let lastName = clerkData?.lastName || "";
  let imageUrl = clerkData?.imageUrl || "";

  if (!targetClerkId) {
    try {
      if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
        return null;
      }
      const user = await currentUser();
      if (!user) return null;
      targetClerkId = user.id;
      email = user.emailAddresses[0]?.emailAddress || "user@hypergym.com";
      firstName = user.firstName || "";
      lastName = user.lastName || "";
      imageUrl = user.imageUrl || "";
    } catch {
      return null;
    }
  }

  if (!targetClerkId || !email) return null;

  // Check if user already exists
  let userDoc = await User.findOne({ clerkId: targetClerkId });

  if (!userDoc) {
    // If no users exist yet, first user is ADMIN
    const totalUsers = await User.countDocuments();
    const defaultRole = totalUsers === 0 ? "ADMIN" : "USER";

    userDoc = await User.findOneAndUpdate(
      { clerkId: targetClerkId },
      {
        $setOnInsert: {
          clerkId: targetClerkId,
          email,
          firstName,
          lastName,
          imageUrl,
          role: defaultRole,
        },
      },
      { upsert: true, new: true }
    );
  } else {
    // Keep name/image up to date
    userDoc.firstName = firstName || userDoc.firstName;
    userDoc.lastName = lastName || userDoc.lastName;
    if (imageUrl) userDoc.imageUrl = imageUrl;
    await userDoc.save();
  }

  return userDoc;
}

/**
 * Get current authenticated user, taking Evaluator Demo Mode cookies into account.
 */
export async function getSessionUser(): Promise<AppUserSession | null> {
  const cookieStore = await cookies();
  const demoRole = cookieStore.get("hypergym_demo_role")?.value;

  // Evaluator demo override
  if (demoRole === "ADMIN" || demoRole === "USER") {
    return {
      clerkId: demoRole === "ADMIN" ? "demo_admin_clerk_id" : "demo_user_clerk_id",
      email: demoRole === "ADMIN" ? "admin@hypergym.com" : "member@hypergym.com",
      firstName: demoRole === "ADMIN" ? "Demo" : "Alex",
      lastName: demoRole === "ADMIN" ? "Admin" : "Rider",
      role: demoRole,
      id: demoRole === "ADMIN" ? "000000000000000000000001" : "000000000000000000000002",
    };
  }

  try {
    if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
      return null;
    }
    const { userId } = await auth();
    if (!userId) return null;

    const userDoc = await getOrCreateCurrentUser();
    if (!userDoc) return null;

    return {
      clerkId: userDoc.clerkId,
      email: userDoc.email,
      firstName: userDoc.firstName,
      lastName: userDoc.lastName,
      role: userDoc.role,
      id: userDoc._id.toString(),
    };
  } catch {
    // If Clerk keys are missing or invalid during dev, return null
    return null;
  }
}
