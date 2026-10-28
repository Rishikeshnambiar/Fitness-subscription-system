"use client";

import { motion } from "motion/react";
import {
  Dumbbell,
  Heart,
  Trophy,
  Users,
  Zap,
  Target,
  Shield,
  Clock,
  Sparkles,
  Building2,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

const values = [
  {
    icon: Trophy,
    title: "Uncompromising Standards",
    description:
      "We benchmark our equipment, trainers, and recovery protocols against international Olympic training facilities.",
  },
  {
    icon: Heart,
    title: "Biometric Precision",
    description:
      "Every workout and nutrition program is continuously calibrated using continuous DEXA and lactate telemetry.",
  },
  {
    icon: Zap,
    title: "Technological Edge",
    description:
      "Our members track every set, rep, and milestone with real-time analytics synced across all 12 metro clubs.",
  },
  {
    icon: Users,
    title: "Elite Community",
    description:
      "Train alongside motivated athletes, executives, and specialists who share a relentless commitment to physical excellence.",
  },
];

const facilities = [
  {
    icon: Dumbbell,
    title: "Eleiko Olympic Systems",
    stat: "500+",
    description: "Certified competition bars, calibrated bumper plates, and motorized platforms.",
  },
  {
    icon: Target,
    title: "Tier-3 Performance Coaches",
    stat: "50+",
    description: "NSCA and CSCS certified coaches dedicated to your progressive overload.",
  },
  {
    icon: Shield,
    title: "Contrast Recovery Suite",
    stat: "3°C / 90°C",
    description: "Medical-grade ice bath immersion tanks and authentic Finnish dry-heat saunas.",
  },
  {
    icon: Clock,
    title: "Continuous Biometric Access",
    stat: "24/7/365",
    description: "Keyless NFC access across all club branches with round-the-clock facility monitoring.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AboutPage() {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-36 pb-24 overflow-hidden border-b border-zinc-900/60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mb-6">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>AgarkarMedia Fitness Technologies</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-zinc-100 mb-6">
              Engineering the Next Era of Human Performance.
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
              HyperGym was built to eliminate the friction between ambition and physical transformation.
              We combine precision athletic architecture with transparent, flexible digital subscription management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-100 mb-3">
            Core Architectural Principles
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            How we design our training environments, transparent billing models, and coaching relationships.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-6 backdrop-blur-xl hover:border-zinc-700 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                <value.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                {value.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Facilities Section */}
      <section className="py-24 bg-zinc-900/30 border-y border-zinc-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-100 mb-3">
              Facility Infrastructure
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              Purpose-built spaces designed for progressive overload and accelerated metabolic recovery.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {facilities.map((facility) => (
              <motion.div
                key={facility.title}
                variants={itemVariants}
                className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 mx-auto mb-4 flex items-center justify-center text-zinc-200">
                  <facility.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-2xl font-heading font-extrabold text-zinc-100 font-mono mb-1">
                  {facility.stat}
                </div>
                <h3 className="text-xs font-semibold text-zinc-200 mb-2">
                  {facility.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {facility.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-10 sm:p-14 text-center backdrop-blur-xl">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-zinc-100 mb-4">
            Begin Your Conditioning Protocol Today.
          </h2>
          <p className="text-sm text-zinc-400 mb-8 max-w-md mx-auto">
            Choose your membership tier, select full or milestone payments, and experience the highest standard in athletic conditioning.
          </p>
          <Link
            href="/#plans"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition-all shadow-sm"
          >
            <Zap className="w-4 h-4" />
            Explore Membership Tiers
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
