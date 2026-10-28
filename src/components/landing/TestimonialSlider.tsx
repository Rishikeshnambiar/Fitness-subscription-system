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
  gradient: string;
}

const testimonials: Testimonial[] = [
  {
    id: "vikram",
    author: "Vikram Malhotra",
    role: "Tech Lead & Amateur Triathlete",
    location: "Indiranagar, Bengaluru",
    quote:
      "HyperGym completely transformed my relationship with fitness. The flexible 24/7 access accommodates my demanding engineering schedule, while the biometric tracking helped me drop 9kg and smash my first half-marathon personal best.",
    rating: 5,
    badge: "Pro Plan • 14kg Lost",
    initials: "VM",
    gradient: "from-[#00f0ff] to-[#0072ff]",
  },
  {
    id: "ananya",
    author: "Ananya Sharma",
    role: "Product Designer & Powerlifter",
    location: "Bandra West, Mumbai",
    quote:
      "The equipment standard is unlike anything else in India. The calibrated plates, recovery cold plunge, and sauna facilities are pristine. The trainers actually analyze your biomechanics rather than handing out generic templates.",
    rating: 5,
    badge: "Elite Plan • PR +45kg",
    initials: "AS",
    gradient: "from-[#ff006e] to-[#d946ef]",
  },
  {
    id: "rohan",
    author: "Rohan Deshmukh",
    role: "Angel Investor & Fitness Enthusiast",
    location: "Jubilee Hills, Hyderabad",
    quote:
      "From seamless digital membership management to effortless guest privileges, HyperGym is the gold standard of luxury wellness. It feels more like a private high-performance athletic club than a typical commercial gym.",
    rating: 5,
    badge: "Elite Plan • 2+ Yrs Member",
    initials: "RD",
    gradient: "from-[#ffd700] to-[#ff6b00]",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
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
        "relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] overflow-hidden",
        className
      )}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-[#ff006e]/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[500px] bg-[#00f0ff]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(255,0,110,0.08)] border border-[rgba(255,0,110,0.2)] text-[#ff006e] text-xs sm:text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Real Stories • Real Transformations</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-[#f0f0f5] mb-5">
            What Our Members{" "}
            <span className="bg-gradient-to-r from-[#00f0ff] via-[#d946ef] to-[#ff006e] bg-clip-text text-transparent">
              Say
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#8888a0] leading-relaxed">
            Discover how founders, athletes, creators, and everyday achievers level
            up their physical and mental vitality at HyperGym.
          </p>

          {/* Mobile Scroll Controls */}
          <div className="flex md:hidden items-center justify-center gap-3 mt-6">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll testimonials left"
              className="p-2 rounded-full bg-[#1a1a2e] border border-white/10 text-[#8888a0] active:text-[#f0f0f5]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll testimonials right"
              className="p-2 rounded-full bg-[#1a1a2e] border border-white/10 text-[#8888a0] active:text-[#f0f0f5]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Testimonials: Scrollable row on mobile, 3-column grid on desktop */}
        <motion.div
          ref={scrollContainerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 md:pb-0 md:grid md:grid-cols-3 md:overflow-visible no-scrollbar"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.25 },
              }}
              className="min-w-[85vw] sm:min-w-[420px] md:min-w-0 snap-center group"
            >
              {/* Subtle Gradient Border wrapper */}
              <div className="h-full p-[1px] rounded-3xl bg-gradient-to-br from-white/15 via-white/5 to-[#00f0ff]/20 group-hover:from-[#00f0ff]/50 group-hover:to-[#ff006e]/50 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                {/* Inner Card */}
                <div className="relative h-full flex flex-col justify-between rounded-[23px] bg-[#1a1a2e]/70 backdrop-blur-2xl p-7 sm:p-8 overflow-hidden">
                  {/* Decorative Quote Icon */}
                  <div className="absolute top-6 right-6 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    <Quote className="w-12 h-12 text-[#00f0ff]" />
                  </div>

                  <div>
                    {/* Top Row: 5 Stars + Badge */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#ffd700] text-[#ffd700]"
                          />
                        ))}
                      </div>

                      <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[#00f0ff]">
                        {t.badge}
                      </span>
                    </div>

                    {/* Quote Text */}
                    <p className="text-sm sm:text-base text-[#f0f0f5] leading-relaxed mb-6 font-normal">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Row */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                    {/* Avatar with Gradient Ring */}
                    <div
                      className={cn(
                        "w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr shrink-0",
                        t.gradient
                      )}
                    >
                      <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center text-xs font-bold text-[#f0f0f5]">
                        {t.initials}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-[#f0f0f5] tracking-tight">
                        {t.author}
                      </h4>
                      <div className="text-xs text-[#8888a0]">
                        {t.role}
                      </div>
                      <div className="text-[11px] text-[#8888a0]/70">
                        {t.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
