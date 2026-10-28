import Navbar from "@/components/layout/Navbar";
import { getSessionUser } from "@/lib/auth";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionUser();

  return (
    <>
      <Navbar
        isAuthenticated={Boolean(session)}
        userRole={session?.role}
      />
      <main className="flex-1">{children}</main>
    </>
  );
}
