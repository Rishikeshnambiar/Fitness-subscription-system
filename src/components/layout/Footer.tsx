"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dumbbell,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import {
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  LinkedinIcon,
  FacebookIcon,
} from "@/components/icons/SocialIcons";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const quickLinks = [
  { label: "Explore Plans", href: "/#plans" },
  { label: "About HyperGym", href: "/about" },
  { label: "Club Locator", href: "/locations" },
  { label: "Expert Trainers", href: "/about#facilities" },
  { label: "Class Timetable", href: "/#classes" },
  { label: "Member Portal", href: "/dashboard" },
];

const resourcesLinks = [
  { label: "Workout Guides", href: "/blog" },
  { label: "Nutrition Calculator", href: "/nutrition" },
  { label: "Membership FAQ", href: "/#faq" },
  { label: "Careers (We're Hiring!)", href: "/careers" },
  { label: "Partner Gyms", href: "/partners" },
  { label: "Security & Compliance", href: "/security" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: InstagramIcon,
    hoverColor: "#ff006e",
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: TwitterIcon,
    hoverColor: "#00f0ff",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: YoutubeIcon,
    hoverColor: "#ff0000",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: LinkedinIcon,
    hoverColor: "#0077b5",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FacebookIcon,
    hoverColor: "#1877f2",
  },
];

export default function Footer({ className }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <footer
      className={cn(
        "relative bg-[#0a0a0f] text-[#f0f0f5] overflow-hidden pt-16 pb-12",
        className
      )}
    >
      {/* Subtle top gradient line separator */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent"
      />

      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00f0ff]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-[rgba(255,255,255,0.06)]">
          {/* Column 1: Brand (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#ff006e] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-transform duration-300 group-hover:scale-105">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-heading font-extrabold tracking-tight">
                <span className="text-[#f0f0f5]">Hyper</span>
                <span className="bg-gradient-to-r from-[#00f0ff] to-[#0099ff] bg-clip-text text-transparent">
                  Gym
                </span>
              </span>
            </Link>

            <p className="text-sm text-[#8888a0] leading-relaxed max-w-sm">
              India&apos;s premier luxury fitness ecosystem. Blending high-performance
              training science, intelligent subscription models, and world-class
              athletic infrastructure designed for champions.
            </p>

            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a2e]/80 border border-white/10 text-xs text-[#8888a0]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]" />
              </span>
              <span>All 12 Metro Clubs Open 24/7</span>
            </div>

            {/* Social media icons */}
            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8888a0] mb-3">
                Follow the Movement
              </div>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 rounded-xl bg-[#1a1a2e]/80 border border-white/10 flex items-center justify-center text-[#8888a0] hover:text-[#f0f0f5] hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f0f0f5] font-heading">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8888a0] hover:text-[#00f0ff] transition-colors duration-200 inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f0f0f5] font-heading">
              Resources & Club
            </h3>
            <ul className="space-y-2.5">
              {resourcesLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8888a0] hover:text-[#00f0ff] transition-colors duration-200 inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f0f0f5] font-heading">
              Contact & Updates
            </h3>

            <div className="space-y-3 text-xs text-[#8888a0]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                <span>HyperGym Tower, 100ft Rd, Indiranagar, Bengaluru 560038</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ff006e] shrink-0" />
                <span>+91 80 4968 2400 (24/7 Helpline)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ffd700] shrink-0" />
                <span>support@hypergym.fit</span>
              </div>
            </div>

            {/* Newsletter input */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-[#f0f0f5] mb-2">
                Join our VIP Dispatch
              </div>
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-xs text-[#00f0ff]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>You&apos;re on the list! Welcome to the tribe.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3.5 py-2.5 pr-10 text-xs rounded-xl bg-[#1a1a2e]/90 border border-white/10 text-[#f0f0f5] placeholder:text-[#8888a0]/60 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#ff006e] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8888a0]">
          <div>
            &copy; 2026 HyperGym Fitness. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-[#f0f0f5] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#f0f0f5] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/security"
              className="hover:text-[#f0f0f5] transition-colors"
            >
              Security
            </Link>
            <Link
              href="/cookies"
              className="hover:text-[#f0f0f5] transition-colors"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
