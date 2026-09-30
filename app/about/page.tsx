import Link from "next/link";
import { SITE, pageMetadata, breadcrumbJsonLd } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";

export const metadata = pageMetadata({
  title: "About Labour Finland — Independent Wage & Working Life Data",
  description:
    "Labour Finland is an independent wage and working-life information service. Accuracy over completeness. Sourced from Finnish collective agreements and Statistics Finland.",
  path: "/about",
});

export default function AboutPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
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
          About
        </span>
      </nav>

      {/* Header section */}
      <div className="mt-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-dark shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
          Mission & Background
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold text-ink tracking-tight">
          About Labour Finland
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          Labour Finland is an independent, non-governmental informational service created to make complex Finnish collective agreements and wage structures accessible and clear to international workers, jobseekers, and employees in Finland.
        </p>
      </div>

      {/* Declaration of Independence Notice */}
      <div className="mt-8 rounded-2xl border-2 border-accent-border/60 bg-accent-soft/40 p-6 sm:p-7 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-cream">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
          </span>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-accent-dark">
              Declaration of Independence
            </h2>
            <p className="mt-1 text-sm text-ink-light leading-relaxed">
              {SITE.independence} We are not affiliated with Migri, Verohallinto, Statistics Finland, any municipality, trade union, employer confederation, or recruitment agency.
            </p>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <section className="mt-12 space-y-8">
        <div className="rounded-2xl border border-line bg-cream p-7 shadow-card">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Accuracy Before Completeness
          </h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            In the labour sector, inaccurate wage estimates can mislead workers entering contracts or planning their finances. If a wage figure has not been verified directly from an active collective agreement text, we mark it as unverified. We never display estimated or fabricated numbers.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-cream p-7 shadow-card">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Transparent Data Provenance
          </h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            Every published wage row includes the full legal name of the applicable collective agreement, the signatory union, the effective date range, and the date the record was last reviewed by our team.
          </p>
          <div className="mt-4">
            <Link href="/methodology" className="text-sm font-semibold text-accent underline hover:text-accent-dark">
              Read our full verification methodology →
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-dashed border-line bg-paper-subtle p-5 text-xs text-muted">
          <p>
            <strong>Operator Information:</strong> Labour Finland is an independent project. [TO BE COMPLETED BEFORE PUBLIC LAUNCH — Operator legal entity & address].
          </p>
        </div>
      </section>
    </main>
  );
}
