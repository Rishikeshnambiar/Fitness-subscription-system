import Link from "next/link";
import { Dumbbell, ShieldCheck, Zap, Activity } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-zinc-950 text-zinc-100">
      {/* Left Showcase Panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 border-r border-zinc-900 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/50 transition-colors shadow-sm">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-tight text-zinc-100 flex items-center gap-1">
                <span>HYPERGYM</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block ml-0.5 animate-pulse" />
              </span>
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                ATHLETIC PROTOCOL
              </span>
            </div>
          </Link>
        </div>

        {/* Center Presentation */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>AGARKARMEDIA ATHLETIC DIVISION // ACCESS PORTAL</span>
          </div>
          <h1 className="text-4xl font-heading font-black text-zinc-100 leading-tight">
            Precision conditioning. Architectural subscription management.
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Manage your memberships, enjoy flexible 50% milestone installment payments, unlock multi-club access, and maintain immutable tax-deductible records.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
              <div className="text-2xl font-mono font-bold text-zinc-100">100%</div>
              <div className="text-xs font-mono text-zinc-400 mt-1">Snapshot-backed tax records</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
              <div className="text-2xl font-mono font-bold text-emerald-400">50% Flex</div>
              <div className="text-xs font-mono text-zinc-400 mt-1">Milestone installment options</div>
            </div>
          </div>
        </div>

        {/* Legal & Entity Footer */}
        <div className="relative z-10 text-xs font-mono text-zinc-400">
          AgarkarMedia Pvt. Ltd. • GSTIN: 27AAWCA1536C1ZP • SAC: 999723
        </div>
      </div>

      {/* Right Form Container */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
