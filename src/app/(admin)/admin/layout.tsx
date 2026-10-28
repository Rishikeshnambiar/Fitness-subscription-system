import Link from "next/link";
import { Dumbbell, LayoutDashboard, Layers, Ticket, ArrowLeftRight, UserCheck, Shield } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import EvaluatorToolbar from "@/components/demo/EvaluatorToolbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionUser();

  // If user is not admin, redirect
  if (session && session.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const navItems = [
    { label: "Executive KPI", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Plan Manager", href: "/admin/plans", icon: Layers },
    { label: "Coupon Engine", href: "/admin/coupons", icon: Ticket },
    { label: "Global Transactions", href: "/admin/transactions", icon: ArrowLeftRight },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5] flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#12121a] border-r border-white/5 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand & Badge */}
          <div className="p-6 border-b border-white/5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00f0ff] to-[#ff006e] p-0.5">
                <div className="w-full h-full bg-[#0a0a0f] rounded-[10px] flex items-center justify-center">
                  <Dumbbell className="w-4 h-4 text-[#00f0ff]" />
                </div>
              </div>
              <span className="font-heading font-bold text-lg tracking-wider text-[#f0f0f5]">
                HYPER<span className="text-[#00f0ff]">GYM</span>
              </span>
            </Link>
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/20 text-[11px] font-mono font-semibold text-[#ffd700]">
              <Shield className="w-3 h-3" /> ADMIN COMMAND CENTER
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#8888a0] hover:text-[#f0f0f5] hover:bg-white/[0.04] transition-all"
                >
                  <Icon className="w-4 h-4 text-[#00f0ff]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-[#00f0ff] transition-all"
          >
            <UserCheck className="w-3.5 h-3.5" />
            Switch to Member View
          </Link>
          <div className="text-[11px] text-[#8888a0] text-center pt-1">
            Logged in as {session?.email || "Admin"}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen overflow-x-hidden p-6 md:p-10">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>

      {/* Floating Evaluator Demo Toolbar */}
      <EvaluatorToolbar />
    </div>
  );
}
