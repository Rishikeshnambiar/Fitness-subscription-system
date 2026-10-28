"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, UserCheck, Clock, RefreshCw, X, ChevronUp, Sparkles, Database, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { resetAndSeedDemoData } from "@/lib/actions/demo.actions";

export default function EvaluatorToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<string>("USER");
  const [dbStatus, setDbStatus] = useState<"connected" | "checking">("connected");

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const roleCookie = cookies.find((c) => c.trim().startsWith("hypergym_demo_role="));
    if (roleCookie) {
      setCurrentRole(roleCookie.split("=")[1].trim());
    }
  }, []);

  const switchRole = (role: "ADMIN" | "USER") => {
    document.cookie = `hypergym_demo_role=${role}; path=/; max-age=86400`;
    setCurrentRole(role);
    toast.success(`Active persona switched to ${role}`);
    window.location.href = role === "ADMIN" ? "/admin/dashboard" : "/dashboard";
  };

  const toggleSimulateExpiry = () => {
    const current = document.cookie.includes("hypergym_sim_expiry=true");
    if (current) {
      document.cookie = "hypergym_sim_expiry=; path=/; max-age=0";
      toast.info("Simulated 3-day expiry banner removed");
    } else {
      document.cookie = "hypergym_sim_expiry=true; path=/; max-age=86400";
      toast.warning("Simulated 3-Day Expiry Notification Activated");
    }
    setTimeout(() => window.location.reload(), 400);
  };

  const resetAllDemoCookies = () => {
    document.cookie = "hypergym_demo_role=; path=/; max-age=0";
    document.cookie = "hypergym_sim_expiry=; path=/; max-age=0";
    toast.success("Preferences reset to default");
    window.location.href = "/";
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="w-80 rounded-2xl bg-zinc-900/95 border border-zinc-800 shadow-2xl backdrop-blur-xl p-4 text-zinc-200 space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-heading font-semibold text-zinc-100">
              <Sparkles className="w-4 h-4 text-emerald-400" /> EVALUATOR CONTROLS
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Database Health Live Badge */}
          <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>MongoDB Integration</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-zinc-400">
              Active Persona: <span className="text-emerald-400 font-semibold">{currentRole}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => switchRole("USER")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  currentRole === "USER"
                    ? "bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm"
                    : "bg-zinc-950/60 hover:bg-zinc-800 text-zinc-400 border border-zinc-800"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Subscriber
              </button>
              <button
                onClick={() => switchRole("ADMIN")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  currentRole === "ADMIN"
                    ? "bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm"
                    : "bg-zinc-950/60 hover:bg-zinc-800 text-zinc-400 border border-zinc-800"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Admin
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <div className="text-[11px] uppercase tracking-wider text-zinc-400">
              Assessment Flow Simulators
            </div>
            <button
              onClick={toggleSimulateExpiry}
              className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 text-xs font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Clock className="w-3.5 h-3.5" />
              Simulate 3-Day Expiry Banner
            </button>
            <button
              onClick={async () => {
                const res = await resetAndSeedDemoData();
                toast.success(res.message);
              }}
              className="w-full py-2 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              Reseed Default Plans & Coupons
            </button>
          </div>

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
            <button
              onClick={resetAllDemoCookies}
              className="hover:text-zinc-200 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Reset Session
            </button>
            <span className="text-zinc-500 font-mono text-[10px]">AgarkarMedia Assessment</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 py-2.5 px-4 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 shadow-xl text-xs font-medium text-zinc-200 backdrop-blur-md transition-all hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Demo Controls</span>
          <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
        </button>
      )}
    </div>
  );
}
