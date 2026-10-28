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
      {/* 3D Immersive Hero Section */}
      <HeroSection sceneSlot={<HeroSceneWrapper />} />

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
