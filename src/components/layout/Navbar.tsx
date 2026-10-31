"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Dumbbell, LogIn, LayoutDashboard, Calculator, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isAuthenticated?: boolean;
  userRole?: "ADMIN" | "USER";
}

const navLinks = [
  { href: "/#biomechanics", label: "3D Biomechanics" },
  { href: "/#nutrition-lab", label: "Nutrition Lab" },
  { href: "/#plans", label: "Memberships" },
  { href: "/#roi-calculator", label: "Unit Economics" },
  { href: "/about", label: "Mission & Facilities" },
];

export default function Navbar({
  isAuthenticated = false,
  userRole,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dashboardHref =
    userRole === "ADMIN" ? "/admin/dashboard" : "/dashboard";

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-900 shadow-lg"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/50 transition-colors shadow-sm">
                <Dumbbell className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-heading font-black tracking-tight text-zinc-100 flex items-center gap-1 leading-none">
                  <span>HYPERGYM</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block ml-0.5 animate-pulse" />
                </span>
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
                  ATHLETIC PROTOCOL
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-1.5 text-xs font-mono font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <Link
                  href={dashboardHref}
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono font-bold text-xs rounded-xl transition-all shadow-sm"
                  )}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 mr-1.5" />
                  DASHBOARD
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="text-xs font-mono font-medium text-zinc-400 hover:text-zinc-100 px-3.5 py-2 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors flex items-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    SIGN IN
                  </Link>
                  <Link
                    href="/sign-up"
                    className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                  >
                    GET STARTED
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-lg bg-zinc-900 border border-zinc-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative pt-24 px-6 flex flex-col gap-2"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-4 text-base font-mono text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="h-px bg-zinc-900 my-4" />

              <div className="flex flex-col gap-3">
                {isAuthenticated ? (
                  <Link
                    href={dashboardHref}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-500 text-zinc-950 font-mono font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    DASHBOARD
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-xs flex items-center justify-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      SIGN IN
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-500 text-zinc-950 font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                    >
                      GET STARTED
                    </Link>
                  </>
                )}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
