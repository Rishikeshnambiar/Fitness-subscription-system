"use client";

import React, { useState, useRef } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DigitalNfcPassSimulator() {
  const [activeTier, setActiveTier] = useState<"Foundation" | "Athlete Pro" | "Executive Elite">("Athlete Pro");
  const [tapStatus, setTapStatus] = useState<"idle" | "tapping" | "success">("idle");
  const [lastCheckinTime, setLastCheckinTime] = useState<string>("23:42 IST");

  // 3D Tilt Gyroscope Simulation on Card
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

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

  // Play authentic dual-frequency NFC chime via Web Audio API
  const playNfcChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(880, ctx.currentTime);
      osc1.frequency.setValueAtTime(1320, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc1.connect(gain);
      gain.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.35);
    } catch {}
  };

  const handleSimulateTap = () => {
    if (tapStatus !== "idle") return;
    setTapStatus("tapping");
    playNfcChime();

    setTimeout(() => {
      setTapStatus("success");
      const now = new Date();
      setLastCheckinTime(
        now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " IST"
      );

      setTimeout(() => {
        setTapStatus("idle");
      }, 3500);
    }, 450);
  };

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 font-mono">
          <Radio className="w-3.5 h-3.5 animate-pulse" /> UNIVERSAL NFC DIGITAL TURNSTILE PASS
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-zinc-100">
          Instant Biometric Turnstile Access
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto font-sans leading-relaxed">
          Every active subscription issues an Apple Wallet / Google Wallet compatible NFC Pass. Hover over the card to experience 3D gyroscope physics, or click to test turnstile entry.
        </p>
      </div>

      {/* Main Grid: 3D Interactive Card + Turnstile Sensor Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
        
        {/* LEFT COLUMN (6 COLS): 3D Gyroscopic NFC Pass Card */}
        <div className="lg:col-span-6 flex justify-center perspective-[1000px]">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="w-full max-w-[360px] h-[225px] sm:h-[235px] rounded-2xl p-6 relative overflow-hidden shadow-2xl border border-zinc-700/80 cursor-pointer select-none bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 group"
          >
            {/* Holographic Sheen Layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-cyan-500/15 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Subtle Metallic Brushed Texture Lines */}
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
                      NFC ATHLETIC PASS
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Wifi className="w-5 h-5 rotate-90" />
                  <span className="text-[9px] font-mono font-bold tracking-wider">NFC</span>
                </div>
              </div>

              {/* Middle Row: Chip & Tier Identifier */}
              <div className="flex items-center justify-between pt-1">
                <div className="w-10 h-7 rounded-md bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
                  <div className="w-6 h-4 border border-amber-400/60 rounded-sm" />
                </div>
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {activeTier}
                </span>
              </div>

              {/* Bottom Row: Member Info & Pass Serial */}
              <div className="border-t border-zinc-800/80 pt-2 flex items-end justify-between text-xs font-mono">
                <div>
                  <span className="text-[9px] text-zinc-500 block uppercase">MEMBER NAME</span>
                  <span className="text-zinc-200 font-semibold text-xs tracking-wider">RISHIKESH NAMBIAR</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-zinc-500 block uppercase">PASS SERIAL</span>
                  <span className="text-[10px] text-emerald-400 font-bold">HG-8842-NFC</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN (6 COLS): Simulated Biometric Turnstile Reader */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800 shadow-xl backdrop-blur-xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-mono uppercase text-zinc-400 font-semibold flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400" />
                Optical Biometric Reader // Turnstile 04
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                BANDRA WEST CLUB
              </span>
            </div>

            {/* Sensor Status Display */}
            <div
              className={cn(
                "p-5 rounded-2xl border text-center transition-all duration-300 relative overflow-hidden",
                tapStatus === "success"
                  ? "bg-emerald-500/15 border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.25)]"
                  : tapStatus === "tapping"
                  ? "bg-amber-500/10 border-amber-500/40"
                  : "bg-zinc-950/70 border-zinc-800/80"
              )}
            >
              <div className="relative z-10 space-y-2">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full mx-auto flex items-center justify-center transition-all duration-300",
                    tapStatus === "success"
                      ? "bg-emerald-500 text-zinc-950 scale-110 shadow-lg shadow-emerald-500/40"
                      : "bg-zinc-800 text-zinc-400"
                  )}
                >
                  {tapStatus === "success" ? (
                    <CheckCircle2 className="w-6 h-6 animate-in zoom-in-75 duration-200" />
                  ) : (
                    <Wifi className="w-6 h-6 rotate-90" />
                  )}
                </div>

                <div className="font-mono text-sm font-bold text-zinc-100">
                  {tapStatus === "success"
                    ? "ACCESS GRANTED // TURNSTILE UNLOCKED"
                    : tapStatus === "tapping"
                    ? "COMMUNICATING WITH ENCRYPTED ENCLAVE..."
                    : "READY // TAP NFC PASS TO ENTER"}
                </div>

                <div className="text-[11px] font-mono text-zinc-400">
                  {tapStatus === "success"
                    ? `Authenticated at ${lastCheckinTime} • Welcome to HyperGym Arena`
                    : "Universal Multi-Club Entry Supported (12 Locations Across India)"}
                </div>
              </div>
            </div>

            {/* Trigger Button & Tier Switcher */}
            <div className="space-y-3 pt-1">
              <button
                type="button"
                onClick={handleSimulateTap}
                disabled={tapStatus !== "idle"}
                className={cn(
                  "w-full py-3 px-4 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm",
                  tapStatus === "idle"
                    ? "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 active:scale-[0.98]"
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                )}
              >
                <Radio className="w-4 h-4" />
                <span>TAP DIGITAL PASS TO SIMULATE ENTRY</span>
              </button>

              {/* Tier Toggle Pills for Demo */}
              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="text-[10px] text-zinc-400 uppercase">Simulate Tier:</span>
                <div className="flex gap-1.5">
                  {(["Foundation", "Athlete Pro", "Executive Elite"] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
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
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

