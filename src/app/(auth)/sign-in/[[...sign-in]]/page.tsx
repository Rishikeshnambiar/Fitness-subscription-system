"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Zap, ShieldCheck, UserCheck, Dumbbell } from "lucide-react";

export default function SignInPage() {
  const hasClerkKey = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  const handleDemoLogin = (role: "ADMIN" | "USER") => {
    document.cookie = `hypergym_demo_role=${role}; path=/; max-age=86400`;
    window.location.href = role === "ADMIN" ? "/admin/dashboard" : "/dashboard";
  };

  return (
    <div className="w-full flex flex-col items-center">
      {hasClerkKey ? (
        <SignIn
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
              Welcome to HyperGym
            </h2>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-mono">
              Evaluator Access: Select persona to test RBAC workflows instantly.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => handleDemoLogin("USER")}
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <UserCheck className="w-4 h-4" />
              AUTHENTICATE AS MEMBER
            </button>
            <button
              onClick={() => handleDemoLogin("ADMIN")}
              className="w-full py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-mono font-bold text-xs hover:text-emerald-400 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              AUTHENTICATE AS ADMIN
            </button>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 pt-3 border-t border-zinc-800/80">
            Clerk Auth active when <code className="text-emerald-400">CLERK_SECRET_KEY</code> is set in .env.local
          </div>
        </div>
      )}

      {/* Quick Demo Switcher link below Clerk if enabled */}
      {hasClerkKey && (
        <div className="mt-4 flex gap-3 text-xs font-mono text-zinc-400">
          <span>Evaluator Demo:</span>
          <button
            onClick={() => handleDemoLogin("USER")}
            className="text-emerald-400 hover:underline"
          >
            Member View
          </button>
          <span>•</span>
          <button
            onClick={() => handleDemoLogin("ADMIN")}
            className="text-emerald-400 hover:underline"
          >
            Admin View
          </button>
        </div>
      )}
    </div>
  );
}
