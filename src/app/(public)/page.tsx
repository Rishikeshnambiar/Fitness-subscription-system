import type { Metadata } from "next";
import HeroSection from "@/components/landing/HeroSection";
import PlanPreview from "@/components/landing/PlanPreview";
import TestimonialSlider from "@/components/landing/TestimonialSlider";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "HyperGym Fitness | Transform Your Body, Elevate Your Life",
  description:
    "India's most advanced fitness subscription platform. Premium plans with flexible billing, expert trainers, and a world-class training experience designed for champions.",
};

export default function LandingPage() {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">
      {/* Interactive 3D Showcase Hero Section */}
      <HeroSection />

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
