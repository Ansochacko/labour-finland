import Link from "next/link";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { SITE, absoluteUrl, websiteJsonLd, organizationJsonLd } from "@/lib/site";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Wages, Jobs & Student Life in Finland 2026 | Labour Finland",
    template: "%s",
  },
  description: SITE.description,
  icons: { icon: "/assets/icons/mark.svg" },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-surface font-sans text-on-surface antialiased selection:bg-primary-light selection:text-primary-container flex flex-col justify-between">
        <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
        <div>
          <Header />
          {children}
        </div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav className="flex items-center text-xs font-medium text-on-surface-variant" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.href} className="inline-flex items-center">
          {index > 0 ? (
            <svg
              className="mx-2 h-3.5 w-3.5 text-outline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          ) : null}
          {index === items.length - 1 ? (
            <span className="text-on-surface font-semibold" aria-current="page">
              {item.name}
            </span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-primary-container transition-colors no-underline text-on-surface-variant"
            >
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export { breadcrumbJsonLd } from "@/lib/site";
