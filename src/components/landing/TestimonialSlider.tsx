"use client";

import { useRef } from "react";
import { motion, type Variants } from "motion/react";
import { Quote, Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  badge: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: "vikram",
    author: "Vikram Malhotra",
    role: "Engineering Director & Triathlete",
    location: "Indiranagar, Bengaluru",
    quote:
      "HyperGym completely transformed my training consistency. The 24/7 access fits around intensive product sprint schedules, and the bi-weekly DEXA telemetry helped me optimize power-to-weight ratio for my marathon personal record.",
    rating: 5,
    badge: "Athlete Pro • PR Smashed",
    initials: "VM",
  },
  {
    id: "ananya",
    author: "Ananya Sharma",
    role: "Principal Product Designer & Powerlifter",
    location: "Bandra West, Mumbai",
    quote:
      "The Eleiko barbell standards and contrast recovery suites are world-class. It is refreshing to train in a high-performance space where biomechanics, progressive overload, and clean equipment are prioritized without gimmicks.",
    rating: 5,
    badge: "Executive Elite • +45kg PR",
    initials: "AS",
  },
  {
    id: "rohan",
    author: "Rohan Deshmukh",
    role: "Venture Partner & Lifelong Lifter",
    location: "Jubilee Hills, Hyderabad",
    quote:
      "From transparent digital membership renewal to flexible milestone payment checkout, HyperGym sets the benchmark for luxury athletic infrastructure. It feels like an executive private training club.",
    rating: 5,
    badge: "Athlete Pro • 2-Year Member",
    initials: "RD",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface TestimonialSliderProps {
  className?: string;
}

export default function TestimonialSlider({ className }: TestimonialSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const offset = direction === "left" ? -340 : 340;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section
      className={cn(
        "relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden border-t border-zinc-900",
        className
      )}
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Member Performance Records</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-zinc-100 mb-4">
            Validated by Athletes and Leaders.
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Discover how founders, athletes, and professionals sustain physical conditioning through HyperGym&apos;s digital training ecosystem.
          </p>

          {/* Mobile Scroll Controls */}
          <div className="flex md:hidden items-center justify-center gap-3 mt-6">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll testimonials left"
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll testimonials right"
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          ref={scrollContainerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 md:pb-0 md:grid md:grid-cols-3 md:overflow-visible no-scrollbar"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              className="min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center rounded-2xl bg-zinc-900/60 border border-zinc-800 p-7 flex flex-col justify-between backdrop-blur-xl hover:border-zinc-700 transition-colors"
            >
              <div>
                {/* Top Row: Stars + Badge */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400"
                      />
                    ))}
                  </div>

                  <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
                    {t.badge}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Profile */}
              <div className="pt-4 border-t border-zinc-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-100">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-zinc-400">
                    {t.role} • {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
