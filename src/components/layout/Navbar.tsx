"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Dumbbell, LogIn, LayoutDashboard } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isAuthenticated?: boolean;
  userRole?: "ADMIN" | "USER";
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#plans", label: "Plans" },
  { href: "/about", label: "About" },
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#ff006e] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                  <Dumbbell className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </motion.div>
              <span className="text-xl md:text-2xl font-heading font-bold tracking-tight">
                <span className="text-[#f0f0f5]">Hyper</span>
                <span className="gradient-text-cyan">Gym</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-[#8888a0] hover:text-[#f0f0f5] transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#00f0ff] to-[#ff006e] group-hover:w-3/4 transition-all duration-300 rounded-full" />
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
                    "bg-gradient-to-r from-[#00f0ff] to-[#0099ff] text-[#0a0a0f] font-semibold hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300"
                  )}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "default" }),
                      "text-[#8888a0] hover:text-[#f0f0f5] hover:bg-[rgba(255,255,255,0.05)]"
                    )}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className={cn(
                      buttonVariants({ size: "default" }),
                      "bg-gradient-to-r from-[#00f0ff] to-[#ff006e] text-white font-semibold hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:scale-105 transition-all duration-300"
                    )}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#8888a0] hover:text-[#f0f0f5] transition-colors"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a0a0f]/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.1 }}
              className="relative pt-24 px-6 flex flex-col gap-2"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 text-lg font-medium text-[#8888a0] hover:text-[#f0f0f5] hover:bg-[rgba(255,255,255,0.03)] rounded-xl transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="section-divider my-4" />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-3 mt-2"
              >
                {isAuthenticated ? (
                  <Link
                    href={dashboardHref}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-gradient-to-r from-[#00f0ff] to-[#0099ff] text-[#0a0a0f] font-semibold w-full justify-center"
                    )}
                  >
                    <LayoutDashboard className="w-5 h-5 mr-2" />
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "w-full border-[rgba(255,255,255,0.1)] text-[#f0f0f5] justify-center"
                      )}
                    >
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "bg-gradient-to-r from-[#00f0ff] to-[#ff006e] text-white font-semibold w-full justify-center"
                      )}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
