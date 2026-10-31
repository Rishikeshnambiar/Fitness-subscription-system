"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Zap, ShieldCheck, UserCheck, Dumbbell } from "lucide-react";

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
              card: "bg-zinc-900 border border-zinc-800 shadow-2xl text-zinc-100 rounded-2xl",
              headerTitle: "text-xl font-heading font-bold text-zinc-100",
              headerSubtitle: "text-zinc-400 text-sm",
              socialButtonsBlockButton: "border-zinc-800 hover:bg-zinc-800 text-zinc-100",
              formFieldLabel: "text-zinc-400 text-xs font-mono uppercase tracking-wider",
              formFieldInput: "bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-emerald-500 rounded-xl",
              formButtonPrimary:
                "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold shadow-sm transition-all rounded-xl",
              footerActionLink: "text-emerald-400 hover:underline",
            },
          }}
          fallbackRedirectUrl="/auth-callback"
        />
      ) : (
        <div className="w-full max-w-sm p-7 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-2xl space-y-6 text-center backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 mx-auto flex items-center justify-center text-emerald-400 shadow-sm">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-black text-zinc-100">
              Create Member Account
            </h2>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-mono">
              Join India&apos;s most advanced athletic subscription platform.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => handleDemoLogin("USER")}
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <UserCheck className="w-4 h-4" />
              ACTIVATE AS NEW MEMBER
            </button>
            <button
              onClick={() => handleDemoLogin("ADMIN")}
              className="w-full py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-mono font-bold text-xs hover:text-emerald-400 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              ACCESS AS ADMINISTRATOR
            </button>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 pt-3 border-t border-zinc-800/80">
            Already registered?{" "}
            <Link href="/sign-in" className="text-emerald-400 hover:underline font-bold">
              Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
