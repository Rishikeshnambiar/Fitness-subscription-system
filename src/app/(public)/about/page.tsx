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
} from "lucide-react";
import Footer from "@/components/layout/Footer";

const values = [
  {
    icon: Trophy,
    title: "Excellence First",
    description:
      "We set the highest standards in fitness training and never compromise on quality.",
    color: "#ffd700",
  },
  {
    icon: Heart,
    title: "Member-Centric",
    description:
      "Every decision we make starts with our members' well-being and goals in mind.",
    color: "#ff006e",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We leverage cutting-edge technology and science to deliver transformative results.",
    color: "#00f0ff",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We build a supportive ecosystem where every member thrives and inspires others.",
    color: "#00e676",
  },
];

const facilities = [
  {
    icon: Dumbbell,
    title: "World-Class Equipment",
    stat: "500+",
    description: "Premium machines and free weights from top global brands",
  },
  {
    icon: Target,
    title: "Personal Training",
    stat: "50+",
    description: "Certified expert trainers with specialized expertise",
  },
  {
    icon: Shield,
    title: "Hygiene & Safety",
    stat: "A+",
    description: "Medical-grade sanitization and 24/7 security monitoring",
  },
  {
    icon: Clock,
    title: "Always Open",
    stat: "24/7",
    description: "Access your fitness journey any time, day or night",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,240,255,0.03)] via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(0,240,255,0.08)] border border-[rgba(0,240,255,0.15)] text-[#00f0ff] text-sm font-medium mb-8"
            >
              <Dumbbell className="w-4 h-4" />
              Our Mission & Values
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Redefining Fitness{" "}
              <span className="gradient-text-cyan">For Everyone</span>
            </h1>
            <p className="text-lg text-[#8888a0] leading-relaxed">
              At HyperGym, we believe fitness is not just about exercise — it&apos;s
              a lifestyle transformation. Our platform combines cutting-edge
              technology with proven training methodologies to deliver
              results that speak for themselves.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              What <span className="gradient-text-cyan">Drives Us</span>
            </h2>
            <p className="text-[#8888a0] max-w-2xl mx-auto">
              Our core values shape every aspect of the HyperGym experience
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="glass-card-hover p-6 text-center group"
              >
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${value.color}15`,
                    boxShadow: `0 0 20px ${value.color}20`,
                  }}
                >
                  <value.icon
                    className="w-7 h-7"
                    style={{ color: value.color }}
                  />
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2 text-[#f0f0f5]">
                  {value.title}
                </h3>
                <p className="text-sm text-[#8888a0] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* Facilities Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              World-Class{" "}
              <span className="gradient-text-magenta">Facilities</span>
            </h2>
            <p className="text-[#8888a0] max-w-2xl mx-auto">
              State-of-the-art infrastructure designed for peak performance
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {facilities.map((facility) => (
              <motion.div
                key={facility.title}
                variants={itemVariants}
                className="glass-card-hover p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[rgba(0,240,255,0.08)] mx-auto mb-4 flex items-center justify-center">
                  <facility.icon className="w-6 h-6 text-[#00f0ff]" />
                </div>
                <div className="text-3xl font-heading font-bold gradient-text-cyan mb-2">
                  {facility.stat}
                </div>
                <h3 className="text-base font-semibold mb-1 text-[#f0f0f5]">
                  {facility.title}
                </h3>
                <p className="text-sm text-[#8888a0]">
                  {facility.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-10 sm:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,240,255,0.05)] to-[rgba(255,0,110,0.05)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
                Ready to{" "}
                <span className="gradient-text-hero">Transform?</span>
              </h2>
              <p className="text-[#8888a0] mb-8 max-w-xl mx-auto">
                Join thousands of members who have already started their journey
                with HyperGym. Your transformation begins today.
              </p>
              <motion.a
                href="/sign-up"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#ff006e] text-white font-semibold text-lg shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_50px_rgba(0,240,255,0.5)] transition-shadow duration-300"
              >
                <Zap className="w-5 h-5" />
                Start Your Journey
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
