import type { Metadata } from "next";
import HeroSection from "@/components/landing/HeroSection";
import PlanPreview from "@/components/landing/PlanPreview";
import TestimonialSlider from "@/components/landing/TestimonialSlider";
import Footer from "@/components/layout/Footer";
import NutritionArchitecture from "@/components/dashboard/NutritionArchitecture";

export const metadata: Metadata = {
  title: "HyperGym Fitness | Transform Your Body, Elevate Your Life",
  description:
    "India's most advanced fitness subscription platform. Premium plans with flexible billing, expert trainers, and a world-class training experience designed for champions.",
};

export default function LandingPage() {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">
      {/* Interactive 3D Biomechanics & Hardware Telemetry Hero Section */}
      <HeroSection />

      {/* Standout TPM Feature: Interactive Biometric Nutrition & Macro Architecture Lab */}
      <section id="nutrition-lab" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 font-mono">
            FLAGSHIP ATHLETIC SCIENCE MODULE
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-zinc-100">
            Biometric Macro & Nutrition Architecture Lab
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto font-sans">
            Calculate your clinical Total Daily Energy Expenditure (TDEE), gram-calibrated protein/carb/fat macros, and anabolic nutrient timing protocols in real time before choosing your plan.
          </p>
        </div>

        <NutritionArchitecture memberTier="Athlete Pro (Public Protocol Preview)" />
      </section>

      {/* Plans, Milestone Installment & ROI Unit Economics Section */}
      <section id="plans">
        <PlanPreview />
      </section>

      {/* Performance Records & Testimonials */}
      <TestimonialSlider />

      {/* Executive Legal & Audit Footer */}
      <Footer />
    </div>
  );
}
