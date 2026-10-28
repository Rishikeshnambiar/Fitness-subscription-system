"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Zap, ShieldCheck } from "lucide-react";

export default function SignUpPage() {
  const hasClerkKey = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  const handleDemoLogin = (role: "ADMIN" | "USER") => {
    document.cookie = `hypergym_demo_role=${role}; path=/; max-age=86400`;
    window.location.href = role === "ADMIN" ? "/admin/dashboard" : "/dashboard";
  };

  return (
    <div className="w-full flex flex-col items-center">
      {hasClerkKey ? (
        <SignUp
          appearance={{
            elements: {
              card: "bg-[#1a1a2e] border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.1)] text-[#f0f0f5]",
              headerTitle: "text-xl font-heading font-bold text-[#f0f0f5]",
              headerSubtitle: "text-[#8888a0] text-sm",
              socialButtonsBlockButton: "border-white/10 hover:bg-white/5 text-[#f0f0f5]",
              formFieldLabel: "text-[#8888a0] text-xs uppercase tracking-wider",
              formFieldInput: "bg-[#12121a] border-white/10 text-[#f0f0f5] focus:border-[#00f0ff]",
              formButtonPrimary:
                "bg-gradient-to-r from-[#00f0ff] to-[#ff006e] text-white hover:opacity-95 shadow-[0_0_20px_rgba(0,240,255,0.3)]",
              footerActionLink: "text-[#00f0ff] hover:underline",
            },
          }}
          fallbackRedirectUrl="/auth-callback"
        />
      ) : (
        <div className="w-full max-w-sm p-6 rounded-2xl bg-[#1a1a2e] border border-white/10 shadow-xl space-y-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 mx-auto flex items-center justify-center text-[#00f0ff]">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-[#f0f0f5]">
              Create Your Account
            </h2>
            <p className="text-xs text-[#8888a0] mt-1.5 leading-relaxed">
              Join India&apos;s most advanced fitness subscription platform today.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => handleDemoLogin("USER")}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#ff006e] text-white font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all flex items-center justify-center gap-2"
            >
              Get Started as New Member
            </button>
            <button
              onClick={() => handleDemoLogin("ADMIN")}
              className="w-full py-3 px-4 rounded-xl bg-[#12121a] border border-white/10 text-[#f0f0f5] font-semibold text-sm hover:border-[#ffd700] hover:text-[#ffd700] transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#ffd700]" />
              Start as Platform Administrator
            </button>
          </div>

          <div className="text-[11px] text-[#8888a0] pt-2 border-t border-white/5">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#00f0ff] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
