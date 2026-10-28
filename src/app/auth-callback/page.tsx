import { redirect } from "next/navigation";
import { getOrCreateCurrentUser, getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AuthCallbackPage() {
  const user = await getOrCreateCurrentUser();

  if (!user) {
    const session = await getSessionUser();
    if (session?.role === "ADMIN") {
      redirect("/admin/dashboard");
    }
    redirect("/dashboard");
  }

  if (user.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  redirect("/dashboard");
}
