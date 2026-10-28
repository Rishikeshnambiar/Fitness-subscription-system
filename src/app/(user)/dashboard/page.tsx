import { getUserSubscription } from "@/lib/actions/billing.actions";
import { getPlans } from "@/lib/actions/plan.actions";
import UserDashboardClient from "@/components/dashboard/UserDashboardClient";

export const dynamic = "force-dynamic";

export default async function UserDashboardPage() {
  const subscription = await getUserSubscription();
  const availablePlans = await getPlans(false);

  return (
    <UserDashboardClient
      subscription={subscription}
      availablePlans={availablePlans}
    />
  );
}
