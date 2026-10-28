import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EvaluatorToolbar from "@/components/demo/EvaluatorToolbar";
import { getSessionUser } from "@/lib/auth";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionUser();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5] flex flex-col justify-between">
      <div>
        <Navbar isAuthenticated={Boolean(session)} userRole={session?.role} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-28">
          {children}
        </main>
      </div>

      <Footer />
      <EvaluatorToolbar />
    </div>
  );
}
