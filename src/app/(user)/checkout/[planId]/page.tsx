import { notFound } from "next/navigation";
import { getPlanById } from "@/lib/actions/plan.actions";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;
  const plan = await getPlanById(planId);

  if (!plan) {
    notFound();
  }

  return <CheckoutClient plan={plan} />;
}
