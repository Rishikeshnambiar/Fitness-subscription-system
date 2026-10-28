import { getAllTransactions } from "@/lib/actions/admin.actions";
import TransactionManagerClient from "@/components/admin/TransactionManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminTransactionsPage() {
  const transactions = await getAllTransactions();
  return <TransactionManagerClient initialTransactions={transactions} />;
}
