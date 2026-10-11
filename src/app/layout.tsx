import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { FloatingDonateButton } from "@/components/layout/FloatingDonateButton";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const fraunces = localFont({
  src: "../fonts/fraunces-normal-latin.woff2",
  weight: "300 700",
  style: "normal",
  display: "swap",
  variable: "--font-fraunces",
});

const frauncesItalic = localFont({
  src: "../fonts/fraunces-italic-latin.woff2",
  weight: "300 700",
  style: "italic",
  display: "swap",
  variable: "--font-fraunces-italic",
});

const inter = localFont({
  src: "../fonts/inter-normal-latin.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.tagline} · ${siteConfig.name}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Andrea",
    "recaudación de fondos",
    "campaña",
    "Hope Motion",
    "GoFundMe",
    "Venezuela",
    "solidaridad",
  ],
  authors: [{ name: "Hope Motion" }],
  creator: "Hope Motion",
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.tagline,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.tagline,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f2e9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${frauncesItalic.variable} ${inter.variable}`}
    >
      <body className="grain min-h-screen">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper"
        >
          Saltar al contenido principal
        </a>
        <ScrollProgress />
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <FloatingDonateButton />
      </body>
    </html>
  );
}
