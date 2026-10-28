import { getPlans } from "@/lib/actions/plan.actions";
import PlanManagerClient from "@/components/admin/PlanManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminPlansPage() {
  const plans = await getPlans(true);
  return <PlanManagerClient initialPlans={plans} />;
}
