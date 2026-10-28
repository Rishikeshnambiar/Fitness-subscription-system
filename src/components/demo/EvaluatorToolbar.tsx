"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, UserCheck, Clock, RefreshCw, X, ChevronUp, Sparkles, Database } from "lucide-react";
import { toast } from "sonner";
import { resetAndSeedDemoData } from "@/lib/actions/demo.actions";

export default function EvaluatorToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<string>("USER");

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
    toast.success(`Role switched to ${role}`);
    window.location.href = role === "ADMIN" ? "/admin/dashboard" : "/dashboard";
  };

  const toggleSimulateExpiry = () => {
    const current = document.cookie.includes("hypergym_sim_expiry=true");
    if (current) {
      document.cookie = "hypergym_sim_expiry=; path=/; max-age=0";
      toast.info("Simulated 3-day expiry warning removed");
    } else {
      document.cookie = "hypergym_sim_expiry=true; path=/; max-age=86400";
      toast.warning("Simulated 3-Day Expiry Banner Activated!");
    }
    setTimeout(() => window.location.reload(), 400);
  };

  const resetAllDemoCookies = () => {
    document.cookie = "hypergym_demo_role=; path=/; max-age=0";
    document.cookie = "hypergym_sim_expiry=; path=/; max-age=0";
    toast.success("Demo preferences reset to default");
    window.location.href = "/";
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="w-80 rounded-2xl bg-[#12121a]/95 border border-[#00f0ff]/30 shadow-[0_0_35px_rgba(0,240,255,0.2)] backdrop-blur-xl p-4 text-[#f0f0f5] space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs font-heading font-bold text-[#00f0ff]">
              <Sparkles className="w-4 h-4" /> EVALUATOR TOOLBAR
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-[#8888a0] hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-[#8888a0]">
              Active Role: <span className="text-[#ffd700] font-bold">{currentRole}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => switchRole("USER")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  currentRole === "USER"
                    ? "bg-[#00f0ff] text-[#0a0a0f] shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-[#8888a0]"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" /> Member View
              </button>
              <button
                onClick={() => switchRole("ADMIN")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  currentRole === "ADMIN"
                    ? "bg-[#ffd700] text-[#0a0a0f] shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-[#8888a0]"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Admin View
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="text-[11px] uppercase tracking-wider text-[#8888a0]">
              Live Simulation Tests
            </div>
            <button
              onClick={toggleSimulateExpiry}
              className="w-full py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Clock className="w-3.5 h-3.5" />
              Simulate 3-Day Expiry Alert
            </button>
            <button
              onClick={async () => {
                const res = await resetAndSeedDemoData();
                toast.success(res.message);
              }}
              className="w-full py-2 px-3 rounded-xl bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Database className="w-3.5 h-3.5" />
              Sync / Seed Catalog Data
            </button>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8888a0]">
            <button
              onClick={resetAllDemoCookies}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Reset Demo
            </button>
            <span className="text-[#00f0ff]">AgarkarMedia Review</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 py-2.5 px-4 rounded-full bg-[#12121a]/90 hover:bg-[#1a1a2e] border border-[#00f0ff]/40 shadow-[0_0_20px_rgba(0,240,255,0.25)] text-xs font-semibold text-[#00f0ff] backdrop-blur-md transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-[#ffd700]" />
          <span>Demo Controls</span>
          <ChevronUp className="w-3.5 h-3.5 opacity-60" />
        </button>
      )}
    </div>
  );
}
