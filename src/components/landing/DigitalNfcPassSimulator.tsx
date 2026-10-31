"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  Wifi,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Zap,
  CreditCard,
  QrCode,
  Radio,
  KeyRound,
  Smartphone,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DigitalNfcPassSimulator() {
  const [activeTier, setActiveTier] = useState<"Starter Velocity" | "Pro Performance" | "Champion Annual">("Pro Performance");

  // 3D Tilt on Card
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 font-mono">
          <Smartphone className="w-3.5 h-3.5" /> SMART CONTACTLESS CLUB PASS
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-zinc-100">
          Zero Plastic Cards. Keyless 24/7 Access.
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto font-sans leading-relaxed">
          Every active subscription includes a digital membership credential compatible with Apple Wallet and Google Wallet. Simply tap your phone or smartwatch to enter.
        </p>
      </div>

      {/* Main Grid: 3D Digital Card + Simple How-It-Works Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
        
        {/* LEFT COLUMN (5 COLS): 3D Digital Member Pass */}
        <div className="lg:col-span-5 flex flex-col items-center perspective-[1000px]">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="w-full max-w-[340px] h-[220px] rounded-3xl p-6 relative overflow-hidden shadow-2xl border border-zinc-700/80 cursor-pointer select-none bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 group"
          >
            {/* Holographic Sheen Layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/15 via-transparent to-cyan-500/15 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none" />

            {/* Card Content Layout */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Top Row: Logo & NFC Wireless Waves */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-heading font-black tracking-tight text-zinc-100 block leading-none">
                      HYPERGYM
                    </span>
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">
                      DIGITAL PASS
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Wifi className="w-4 h-4 rotate-90" />
                  <span className="text-[9px] font-mono font-bold tracking-wider">TAP</span>
                </div>
              </div>

              {/* Middle Row: Chip & Tier Identifier */}
              <div className="flex items-center justify-between pt-1">
                <div className="w-9 h-6 rounded-md bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
                  <div className="w-5 h-3.5 border border-amber-400/60 rounded-sm" />
                </div>
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {activeTier}
                </span>
              </div>

              {/* Bottom Row: Member Info & Pass Serial */}
              <div className="border-t border-zinc-800/80 pt-2 flex items-end justify-between text-xs font-mono">
                <div>
                  <span className="text-[9px] text-zinc-500 block uppercase">MEMBER</span>
                  <span className="text-zinc-200 font-semibold text-xs tracking-wider">ALEX RIDER</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-zinc-500 block uppercase">PASS ID</span>
                  <span className="text-[10px] text-emerald-400 font-bold">HG-8842-NFC</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tier Switcher for preview */}
          <div className="flex items-center gap-2 mt-4 text-xs font-mono">
            <span className="text-zinc-500 text-[10px] uppercase">Preview:</span>
            {(["Starter Velocity", "Pro Performance", "Champion Annual"] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] transition-colors border",
                  activeTier === tier
                    ? "bg-zinc-800 text-emerald-400 font-bold border-zinc-700"
                    : "text-zinc-500 border-transparent hover:text-zinc-300"
                )}
              >
                {tier.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN (7 COLS): How Access Works In Real Life */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-xl space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">
                Frictionless Entry Workflow
              </span>
              <h3 className="text-xl font-heading font-bold text-zinc-100">
                How Your Membership Unlocks Club Facilities
              </h3>
            </div>

            {/* 3 Clear Steps */}
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">
                    Subscribe & Receive Instant Digital Pass
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Choose full payment or our 50% partial payment option. Your digital pass is immediately provisioned in your Member Dashboard.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">
                    Add to Apple Wallet, Google Wallet or Show QR
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Store your pass on your smartphone or Apple Watch. No need to carry physical keys, badges, or plastic fobs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">
                    Tap to Enter All 12 Metro Locations 24/7
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Contactless turnstiles scan your encrypted token in under 0.2 seconds and automatically unlock your paired smart locker.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">
                Universal access across Mumbai, Delhi & Bangalore
              </span>
              <Link
                href="/#plans"
                className="py-2.5 px-4 rounded-xl bg-emerald-500 text-zinc-950 font-heading font-bold text-xs hover:bg-emerald-400 transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>CHOOSE A PLAN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
