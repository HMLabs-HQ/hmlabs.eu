import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SiteChrome from "@/components/site-chrome";
import { ThemeModeProvider } from "@/components/theme-mode-provider";
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

const baseUrl = process.env.NEXT_PUBLIC_URL || "https://hmlabs.eu";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "HMLabs",
    template: "%s | HMLabs",
  },
  description:
    "HMLabs is home to independent projects across software, tools, and Minecraft.",
  keywords: [
    "HMLabs",
    "projects",
    "open source",
    "Minecraft",
    "software",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "HMLabs",
    title: "HMLabs | Independent Projects",
    description:
      "HMLabs is home to independent projects across software, tools, and Minecraft.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "HMLabs projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HMLabs | Independent Projects",
    description: "Independent projects across software, tools, and Minecraft.",
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: baseUrl,
  },
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
};

const themeInitScript = `(() => {
  const STORAGE_KEY = "theme-mode";
  const root = document.documentElement;

  const savedMode = window.localStorage.getItem(STORAGE_KEY);
  const mode =
    savedMode === "light" || savedMode === "dark" || savedMode === "auto"
      ? savedMode
      : "auto";

  const effectiveMode =
    mode === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : mode;

  root.classList.toggle("dark", effectiveMode === "dark");
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HMLabs",
    url: baseUrl,
    description:
      "HMLabs is home to independent projects across software, tools, and Minecraft.",
    sameAs: [
      "https://github.com/HMLabs-HQ",
      "https://github.com/HMLabs-Gaming",
      "https://modrinth.com/organization/9zYhowm8",
      "https://discord.gg/fuAx3waeHp",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head />
      <body className="min-h-full flex flex-col">
        <ThemeModeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <SiteChrome />

          {children}

          <SpeedInsights />
          <Analytics />
        </ThemeModeProvider>
      </body>
    </html>
  );
}
