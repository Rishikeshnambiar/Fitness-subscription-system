import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <TooltipProvider delay={300}>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              className: "glass-card",
            }}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}
