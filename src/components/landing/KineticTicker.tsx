"use client";

import React from "react";
import { motion } from "motion/react";
import { Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";

const TICKER_ITEMS = [
  "12 PREMIUM METRO CLUBS OPERATIONAL",
  "OLYMPIC ELEIKO & TECHNOGYM EQUIPMENT",
  "FLEXIBLE 50% MILESTONE INSTALLMENTS",
  "CONTRAST THERAPY: 3°C COLD PLUNGE & 90°C FINNISH SAUNA",
  "PERSONALIZED BIOMETRIC NUTRITION PROTOCOLS",
  "1-ON-1 MASTER BIOMECHANICS COACHING",
  "INSTANT NFC DIGITAL TURNSTILE PASSES",
  "98.4% ATHLETE SATISFACTION & RETENTION",
];

export default function KineticTicker() {
  return (
    <div className="w-full bg-zinc-950 border-y border-zinc-800/80 py-3.5 overflow-hidden select-none relative">
      {/* Side Vignettes for Infinite Illusion */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Double array for seamless loop */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            <span className="tracking-wider">{item}</span>
            <span className="text-zinc-700">///</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

