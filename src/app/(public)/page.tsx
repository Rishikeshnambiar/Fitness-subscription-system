import type { Metadata } from "next";
import HeroSceneWrapper from "@/components/three/HeroSceneWrapper";
import HeroSection from "@/components/landing/HeroSection";
import PlanPreview from "@/components/landing/PlanPreview";
import StatsCounter from "@/components/landing/StatsCounter";
import TestimonialSlider from "@/components/landing/TestimonialSlider";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "HyperGym Fitness | Transform Your Body, Elevate Your Life",
  description:
    "India's most advanced fitness subscription platform. Premium plans with flexible billing, expert trainers, and a world-class training experience designed for champions.",
};

export default function LandingPage() {
  return (
    <>
      {/* Hero Section with 3D Background */}
      <section className="relative min-h-screen overflow-hidden">
        {/* 3D Scene Layer (behind content) */}
        <div className="absolute inset-0 z-0">
          <HeroSceneWrapper />
        </div>

        {/* Content Layer (above 3D scene) */}
        <div className="relative z-10">
          <HeroSection />
        </div>
      </section>

      {/* Stats Section */}
      <StatsCounter />

      {/* Plans Preview Section */}
      <section id="plans">
        <PlanPreview />
      </section>

      {/* Testimonials Section */}
      <TestimonialSlider />

      {/* Footer */}
      <Footer />
    </>
  );
}
