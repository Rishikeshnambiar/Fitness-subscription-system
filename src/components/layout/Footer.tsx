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
  Building2,
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
  { label: "Membership Tiers", href: "/#plans" },
  { label: "Mission & Values", href: "/about" },
  { label: "ROI Calculator", href: "/#plans" },
  { label: "Member Portal", href: "/dashboard" },
  { label: "Billing & Invoices", href: "/billing" },
];

const resourcesLinks = [
  { label: "Admin Console", href: "/admin/dashboard" },
  { label: "Plan Definition Manager", href: "/admin/plans" },
  { label: "Coupon Manager", href: "/admin/coupons" },
  { label: "Global Transaction Audit", href: "/admin/transactions" },
  { label: "Snapshot Strategy Whitepaper", href: "https://github.com" },
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
        "relative bg-zinc-950 text-zinc-300 overflow-hidden pt-16 pb-12 border-t border-zinc-900",
        className
      )}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-zinc-900">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xl font-heading font-bold tracking-tight text-zinc-100">
                Hyper<span className="text-emerald-400">Gym</span>
              </span>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Enterprise fitness platform engineering dynamic billing cycles, manageable discounts, immutable historical snapshots, and milestone installment tracking.
            </p>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-zinc-200">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                AgarkarMedia Pvt. Ltd.
              </div>
              <div>GSTIN: <span className="font-mono text-zinc-300">27AAWCA1536C1ZP</span> • SAC: <span className="font-mono">999723</span></div>
              <div>Official URL: <span className="text-emerald-400">www.AgarkarMedia.com</span></div>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Admin & Assessment links */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Assessment Deliverables
            </h4>
            <ul className="space-y-2 text-xs">
              {resourcesLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>MongoDB Mongoose Architecture Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            &copy; 2026 AgarkarMedia Pvt. Ltd. (HyperGym Division). All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-200 transition-colors">
              Privacy Protocol
            </Link>
            <Link href="/terms" className="hover:text-zinc-200 transition-colors">
              Terms of Membership
            </Link>
            <Link href="/security" className="hover:text-zinc-200 transition-colors">
              Data Security & GST Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
