"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  Scan,
  ShieldCheck,
  Zap,
  Target,
  Flame,
  Layers,
  Sparkles,
  ArrowRight,
  Eye,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BiometricHotspot {
  id: string;
  label: string;
  topPct: number;
  leftPct: number;
  metric: string;
  metricValue: string;
  fiberDensity: string;
  recommendedStation: string;
  kineticRole: string;
  tierAccess: string;
}

const BIOMETRIC_HOTSPOTS: BiometricHotspot[] = [
  {
    id: "shoulders",
    label: "Shoulders & Deltoids",
    topPct: 20,
    leftPct: 50,
    metric: "Upper Body Pressing Force",
    metricValue: "880 N",
    fiberDensity: "Balanced Type-I & Type-II Fibers",
    recommendedStation: "Olympic Power Cage / Overhead Press",
    kineticRole: "Stabilizes overhead bar path and delivers upper body vertical drive.",
    tierAccess: "Available All Tiers",
  },
  {
    id: "chest",
    label: "Chest & Pectoralis Major",
    topPct: 30,
    leftPct: 44,
    metric: "Lean Muscular Mass",
    metricValue: "44.8 cm²",
    fiberDensity: "65% Fast-Twitch Glycolytic",
    recommendedStation: "Olympic Flat Bench Station & Cable Crossover",
    kineticRole: "Drives horizontal pressing power and continuous cable adduction tension.",
    tierAccess: "Available All Tiers",
  },
  {
    id: "core",
    label: "Core & Abdominals",
    topPct: 44,
    leftPct: 50,
    metric: "Core Bracing Pressure",
    metricValue: "185 mmHg",
    fiberDensity: "Postural Endurance & Anti-Rotation",
    recommendedStation: "Power Cage Pull-up & Suspension Station",
    kineticRole: "Transfers kinetic force between upper and lower body while safeguarding the spine.",
    tierAccess: "Available All Tiers",
  },
  {
    id: "glutes",
    label: "Glutes & Posterior Chain",
    topPct: 55,
    leftPct: 55,
    metric: "Peak Explosive Power Output",
    metricValue: "1,940 Watts",
    fiberDensity: "74% Explosive Power Fibers",
    recommendedStation: "45° Linear Incline Leg Press & Trap Bar",
    kineticRole: "Primary hip extension propulsion driver for squats, deadlifts, and athletic sprints.",
    tierAccess: "Athlete Pro & Elite",
  },
  {
    id: "quads",
    label: "Quadriceps & Hamstrings",
    topPct: 70,
    leftPct: 43,
    metric: "Isokinetic Quad Torque",
    metricValue: "340 Nm",
    fiberDensity: "High Hypertrophic Growth Blend",
    recommendedStation: "45° Linear Incline Leg Press & Olympic Squat Cage",
    kineticRole: "Absorbs landing forces and provides maximal leg drive under heavy resistance.",
    tierAccess: "Athlete Pro & Elite",
  },
  {
    id: "calves",
    label: "Calves & Ankle Complex",
    topPct: 88,
    leftPct: 53,
    metric: "Elastic Fascial Energy Return",
    metricValue: "91.8%",
    fiberDensity: "High-Density Achilles Collagen",
    recommendedStation: "Linear Sled Platform & Plyometric Floor",
    kineticRole: "Stores kinetic energy for dynamic ground contact and athletic spring.",
    tierAccess: "Available All Tiers",
  },
];

export default function BiometricDexaScanner() {
  const [selectedHotspot, setSelectedHotspot] = useState<BiometricHotspot>(BIOMETRIC_HOTSPOTS[1]);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [scanLayer, setScanLayer] = useState<"muscular" | "skeletal" | "thermal">("muscular");

  // Synthetic beep on hotspot selection
  const playHotspotSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1650, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {}
  };

  return (
    <section id="dexa-scanner" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 font-mono">
          <Scan className="w-3.5 h-3.5" /> BODY COMPOSITION & MOVEMENT LAB
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-zinc-100">
          Targeted Muscular Analysis & Equipment Match
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto font-sans leading-relaxed">
          Interactive anatomical scanner. Click any muscle group to view force outputs, recommended commercial apparatus, and optimal training tier.
        </p>
      </div>

      {/* Main Dual Grid: Holographic Scanner Display + Live Telemetry HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT COLUMN (6 COLS): Holographic Silhouette Viewport with Sweeping Laser */}
        <div className="lg:col-span-6 relative">
          <div className="relative h-[480px] sm:h-[540px] w-full rounded-3xl bg-zinc-950/90 border border-zinc-800/90 p-4 shadow-2xl overflow-hidden flex items-center justify-center">
            
            {/* Background Grid Crosshairs */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Top HUD Controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono z-20">
              <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 rounded-lg">
                <span className={cn("w-2 h-2 rounded-full", isScanning ? "bg-emerald-400 animate-ping" : "bg-zinc-600")} />
                <span className="text-zinc-200">SCANNER: {isScanning ? "ACTIVE BEAM" : "PAUSED"}</span>
              </div>

              {/* Layer Mode Switcher */}
              <div className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 p-0.5 rounded-lg">
                {(["muscular", "skeletal", "thermal"] as const).map((layer) => (
                  <button
                    key={layer}
                    type="button"
                    onClick={() => setScanLayer(layer)}
                    className={cn(
                      "px-2 py-0.5 rounded capitalize transition-colors",
                      scanLayer === layer
                        ? "bg-zinc-800 text-emerald-400 font-bold border border-zinc-700"
                        : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    {layer}
                  </button>
                ))}
              </div>
            </div>

            {/* Sweeping Laser Beam Animation */}
            {isScanning && (
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] z-10 pointer-events-none"
                animate={{
                  top: ["8%", "90%", "8%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* SVG Anatomical Human Silhouette */}
            <div className="relative w-64 h-[440px] flex items-center justify-center">
              <svg
                viewBox="0 0 200 420"
                className="w-full h-full drop-shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Head */}
                <circle
                  cx="100"
                  cy="45"
                  r="24"
                  className={cn(
                    "transition-colors duration-500",
                    scanLayer === "thermal" ? "fill-amber-500/30 stroke-amber-400" : "fill-emerald-500/10 stroke-emerald-400"
                  )}
                  strokeWidth="1.5"
                />
                {/* Neck & Trapezius */}
                <path
                  d="M85 70 L115 70 L135 95 L65 95 Z"
                  className="fill-emerald-500/15 stroke-emerald-500/60"
                  strokeWidth="1.5"
                />
                {/* Torso & Pectorals */}
                <path
                  d="M65 95 L135 95 L125 180 L75 180 Z"
                  className={cn(
                    "transition-colors duration-500",
                    scanLayer === "skeletal" ? "fill-blue-500/10 stroke-blue-400" : "fill-emerald-500/20 stroke-emerald-400"
                  )}
                  strokeWidth="1.5"
                />
                {/* Upper Arms */}
                <path d="M65 95 L40 170 L55 175 L75 110 Z" className="fill-emerald-500/10 stroke-emerald-500/60" strokeWidth="1.5" />
                <path d="M135 95 L160 170 L145 175 L125 110 Z" className="fill-emerald-500/10 stroke-emerald-500/60" strokeWidth="1.5" />
                {/* Forearms */}
                <path d="M40 175 L28 240 L40 245 L55 180 Z" className="fill-emerald-500/15 stroke-emerald-500/40" strokeWidth="1.5" />
                <path d="M160 175 L172 240 L160 245 L145 180 Z" className="fill-emerald-500/15 stroke-emerald-500/40" strokeWidth="1.5" />
                {/* Pelvis & Hips */}
                <path d="M75 180 L125 180 L118 225 L82 225 Z" className="fill-emerald-500/20 stroke-emerald-400" strokeWidth="1.5" />
                {/* Thighs & Quadriceps */}
                <path d="M82 225 L70 320 L92 320 L98 225 Z" className="fill-emerald-500/15 stroke-emerald-400" strokeWidth="1.5" />
                <path d="M118 225 L130 320 L108 320 L102 225 Z" className="fill-emerald-500/15 stroke-emerald-400" strokeWidth="1.5" />
                {/* Lower Legs & Calves */}
                <path d="M70 325 L65 400 L82 400 L90 325 Z" className="fill-emerald-500/15 stroke-emerald-500/60" strokeWidth="1.5" />
                <path d="M130 325 L135 400 L118 400 L110 325 Z" className="fill-emerald-500/15 stroke-emerald-500/60" strokeWidth="1.5" />
              </svg>

              {/* Clickable Telemetry Hotspot Pins */}
              {BIOMETRIC_HOTSPOTS.map((hotspot) => {
                const isSelected = selectedHotspot.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => {
                      setSelectedHotspot(hotspot);
                      playHotspotSound();
                    }}
                    style={{
                      top: `${hotspot.topPct}%`,
                      left: `${hotspot.leftPct}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    className={cn(
                      "absolute group flex items-center justify-center p-1.5 rounded-full transition-transform focus:outline-none z-20",
                      isSelected ? "scale-125 ring-2 ring-emerald-400 shadow-[0_0_12px_#10b981]" : "hover:scale-110"
                    )}
                    title={hotspot.label}
                  >
                    <span className="w-3 h-3 rounded-full bg-emerald-400 flex items-center justify-center animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                    </span>
                    <span className="sr-only">{hotspot.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Status Ticker */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-zinc-800/80 pt-2.5">
              <span>ACTIVE TARGET: <span className="text-emerald-400 font-semibold">{selectedHotspot.label}</span></span>
              <button
                type="button"
                onClick={() => setIsScanning(!isScanning)}
                className="hover:text-zinc-200 flex items-center gap-1 font-mono text-emerald-400"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{isScanning ? "FREEZE" : "RESUME"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (6 COLS): Interactive Biometric Diagnostic Readout */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-6 sm:p-7 rounded-3xl bg-zinc-900/80 border border-zinc-800/90 shadow-2xl backdrop-blur-xl space-y-6">
            
            {/* Hotspot Header */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  BIOMETRIC TELEMETRY READOUT
                </span>
                <h3 className="text-2xl font-heading font-black text-zinc-100 mt-0.5">
                  {selectedHotspot.label}
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                {selectedHotspot.tierAccess}
              </span>
            </div>

            {/* Core Metric Highlight */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                  {selectedHotspot.metric}
                </span>
                <span className="text-2xl sm:text-3xl font-heading font-bold text-zinc-100 font-mono">
                  {selectedHotspot.metricValue}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-zinc-400 block">FIBER COMPOSITION</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  {selectedHotspot.fiberDensity}
                </span>
              </div>
            </div>

            {/* Kinematic Role & Recommended Commercial Apparatus */}
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800 space-y-1">
                <span className="text-[10px] uppercase text-zinc-400 block font-semibold">
                  BIOMECHANICAL RECRUITMENT VECTOR:
                </span>
                <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                  {selectedHotspot.kineticRole}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800 space-y-1">
                <span className="text-[10px] uppercase text-emerald-400 block font-semibold flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  RECOMMENDED COMMERCIAL APPARATUS:
                </span>
                <span className="text-zinc-200 font-semibold block text-sm">
                  {selectedHotspot.recommendedStation}
                </span>
              </div>
            </div>

            {/* Quick Switch Hotspot Pills */}
            <div className="space-y-2 pt-1 border-t border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                Quick Select Anatomical Region:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {BIOMETRIC_HOTSPOTS.map((h) => {
                  const isSel = selectedHotspot.id === h.id;
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => {
                        setSelectedHotspot(h);
                        playHotspotSound();
                      }}
                      className={cn(
                        "py-1.5 px-2 rounded-lg text-[10px] font-mono transition-all truncate border",
                        isSel
                          ? "bg-zinc-800 text-emerald-400 font-bold border-emerald-500/80 shadow-sm"
                          : "bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                      )}
                    >
                      {h.label.split("&")[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action CTA */}
            <Link
              href="/#configurator"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span>CONFIGURE MEMBERSHIP FOR THIS REGION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
