import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreenBuild AI | Carbon-Smart Construction Advisor",
  description: "AI-powered sustainability advisor for construction projects. Reduce carbon, build greener, and save costs with intelligent AI reasoning.",
  keywords: ["sustainability", "construction", "carbon footprint", "AI advisor", "green building", "carbon-smart", "embodied carbon"],
  authors: [{ name: "GreenBuild AI Team" }],
  openGraph: {
    title: "GreenBuild AI | Sustainable Construction",
    description: "Build Smarter. Build Greener. AI-powered carbon-smart construction decisions.",
    url: "https://greenbuild.ai",
    siteName: "GreenBuild AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GreenBuild AI - Carbon-Smart Construction",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenBuild AI | Carbon-Smart Construction",
    description: "AI-powered sustainability advisor for construction projects.",
    images: ["/og-image.png"],
  },
};

import { AuthProvider } from "@/context/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
