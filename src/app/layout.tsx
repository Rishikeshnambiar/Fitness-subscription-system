import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ClerkWrapper } from "@/components/providers/ClerkWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HyperGym Fitness | Premium Subscription Platform",
    template: "%s | HyperGym Fitness",
  },
  description:
    "Transform your body with India's most advanced fitness subscription platform. Flexible plans, smart billing, and world-class training programs designed for champions.",
  keywords: [
    "fitness",
    "gym",
    "subscription",
    "workout",
    "training",
    "health",
    "wellness",
  ],
  authors: [{ name: "AgarkarMedia Private Limited" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "HyperGym Fitness",
    title: "HyperGym Fitness | Premium Subscription Platform",
    description:
      "Transform your body with India's most advanced fitness subscription platform.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
        <ClerkWrapper>
          <TooltipProvider delay={300}>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                className: "bg-zinc-900 border border-zinc-800 text-zinc-100",
              }}
            />
          </TooltipProvider>
        </ClerkWrapper>
      </body>
    </html>
  );
}
