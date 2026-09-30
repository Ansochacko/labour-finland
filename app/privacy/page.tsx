import Link from "next/link";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";

export const metadata = pageMetadata({
  title: "Privacy Policy — Labour Finland",
  description:
    "Privacy and data protection at Labour Finland. Hosted on Vercel with no invasive tracking, no advertising scripts, and full transparency.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <main id="main" className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      {/* Breadcrumb nav */}
      <nav className="flex items-center text-xs font-medium text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-accent transition-colors no-underline text-muted">
          Home
        </Link>
        <svg className="mx-2 h-3.5 w-3.5 text-line-strong" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-ink font-semibold" aria-current="page">
          Privacy Policy
        </span>
      </nav>

      {/* Header section */}
      <div className="mt-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-dark shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
          Transparency & Data Protection
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold text-ink tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          Labour Finland is built with privacy by design. We do not require user accounts, track personal salary inquiries, or install third-party advertising trackers.
        </p>
      </div>

      {/* Sections */}
      <article className="mt-12 space-y-8">
        <section className="rounded-2xl border border-line bg-cream p-7 shadow-card space-y-3">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Hosting & Technical Server Logs
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            This website is hosted on the Vercel cloud platform. To serve web pages securely and detect security incidents, Vercel servers process standard HTTP request data, including IP address, browser user-agent header, requested URL path, and timestamp.
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-cream p-7 shadow-card space-y-3">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Analytics & Web Performance
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            We use privacy-friendly Vercel Analytics and Speed Insights to measure overall traffic trends (e.g. aggregate page views) and core web vitals (e.g. page loading speeds). These metrics are aggregated, privacy-preserving, and do not track individual users across the web.
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-cream p-7 shadow-card space-y-3">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            What Is Not Installed
          </h2>
          <ul className="space-y-2 text-sm text-muted list-disc list-inside leading-relaxed">
            <li>No invasive cross-site tracking pixels or advertising cookies.</li>
            <li>No Google Analytics or tag manager tracking containers.</li>
            <li>No sale, lease, or commercial sharing of visitor information.</li>
            <li>Interactive wage queries run client-side in your browser and are not saved to a user profile.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-line bg-cream p-7 shadow-card space-y-3">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Data Controller & Legal Identity
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Official controller registration details and physical address will be posted here ahead of official public launch.
          </p>
        </section>
      </article>
    </main>
  );
}
