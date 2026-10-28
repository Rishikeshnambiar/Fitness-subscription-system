import Link from "next/link";
import { Dumbbell, ShieldCheck, Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#0a0a0f] text-[#f0f0f5]">
      {/* Left Showcase Panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#12121a] via-[#1a1a2e] to-[#0a0a0f] border-r border-white/5 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00f0ff]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#ff006e]/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00f0ff] to-[#ff006e] p-0.5 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0a0a0f] rounded-[10px] flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-[#00f0ff]" />
              </div>
            </div>
            <span className="font-heading font-bold text-xl tracking-wider text-[#f0f0f5]">
              HYPER<span className="text-[#00f0ff]">GYM</span>
            </span>
          </Link>
        </div>

        {/* Center Presentation */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-xs font-semibold text-[#00f0ff]">
            <Zap className="w-3.5 h-3.5" /> Next-Gen Subscription Experience
          </div>
          <h1 className="text-4xl font-heading font-bold text-[#f0f0f5] leading-tight">
            Step into the future of luxury fitness engineering.
          </h1>
          <p className="text-[#8888a0] text-sm leading-relaxed">
            Manage your memberships, enjoy flexible installment payments, unlock exclusive amenities, and take command of your training journey.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="text-2xl font-mono font-bold text-[#00f0ff]">100%</div>
              <div className="text-xs text-[#8888a0] mt-1">Snapshot-backed invoices</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="text-2xl font-mono font-bold text-[#ffd700]">50–90%</div>
              <div className="text-xs text-[#8888a0] mt-1">Flexible installment options</div>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="relative z-10 flex items-center gap-2 text-xs text-[#8888a0]">
          <ShieldCheck className="w-4 h-4 text-[#00e676]" />
          <span>Enterprise-grade biometric security & encrypted billing</span>
        </div>
      </div>

      {/* Right Content Panel */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-6 flex flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
