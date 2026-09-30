import Link from "next/link";
import { SITE, pageMetadata, breadcrumbJsonLd } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";

export const metadata = pageMetadata({
  title: "Legal & Information Disclaimer — Labour Finland",
  description:
    "Labour Finland provides general informational content about wages and collective agreements in Finland. Not legal, tax or employment advice.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Disclaimer", href: "/disclaimer" },
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
          Disclaimer
        </span>
      </nav>

      {/* Page Header */}
      <div className="mt-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-dark shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
          Informational Scope & Limitations
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold text-ink tracking-tight">
          Legal Disclaimer
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed font-normal">
          Please read this informational disclaimer carefully before relying on any data or tools published on Labour Finland.
        </p>
      </div>

      {/* Main Disclaimer Banner */}
      <div className="mt-8 rounded-2xl border-2 border-warn-border bg-warn-bg/50 p-6 sm:p-7 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-warn">
          Important Notice
        </h2>
        <p className="mt-2 text-sm sm:text-base text-ink-light leading-relaxed">
          {SITE.disclaimer}
        </p>
      </div>

      {/* Detailed Subsections */}
      <section className="mt-12 space-y-8">
        <div className="rounded-2xl border border-line bg-cream p-7 shadow-card space-y-3">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Calculator Results Are Estimates Only
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            All salary conversions, annual projections, and gross calculations provided on our calculator are mathematical projections based strictly on user-input values. They do not constitute an individualized payroll calculation, an official offer, a legal entitlement, or a tax estimation.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-cream p-7 shadow-card space-y-3">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            No Legal or Trade Union Representation
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            {SITE.independence} Labour Finland cannot provide individualized legal representation or trade union advice. For binding interpretations of a specific workplace dispute or contract clause, consult your workplace shop steward (luottamusmies), the relevant trade union, or the Occupational Safety and Health Administration (Työsuojeluhallinto).
          </p>
        </div>
      </section>
    </main>
  );
}
