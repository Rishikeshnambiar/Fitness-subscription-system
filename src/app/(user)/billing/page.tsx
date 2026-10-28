import { getUserTransactions } from "@/lib/actions/billing.actions";
import BillingClient from "@/components/billing/BillingClient";

export const dynamic = "force-dynamic";

export default async function MemberBillingPage() {
  const transactions = await getUserTransactions();
  return <BillingClient initialTransactions={transactions} />;
}
