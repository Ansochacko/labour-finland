import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, absoluteUrl, breadcrumbJsonLd } from "@/lib/site";
import { jobGuides } from "@/lib/jobs";

export const metadata = pageMetadata({
  title: "Jobs in Finland 2026 — Employment, CVs & Work Permits",
  description:
    "Impartial guide to the Finnish job market: official job portals (Työmarkkinatori), hidden jobs (piilotyöpaikat), CV formats, work permits, and trial periods.",
  path: "/jobs",
});

export default function JobsPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Jobs in Finland", href: "/jobs" },
  ];

  return (
    <main id="main" className="w-full">
      {/* Editorial Header Section */}
      <section className="relative w-full bg-surface-container-low/40 px-4 sm:px-6 lg:px-12 py-12 lg:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-6">
          <JsonLd data={breadcrumbJsonLd(crumbs)} />
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Jobs in Finland Guide",
              url: absoluteUrl("/jobs"),
              description:
                "Practical, sourced guidance for job seekers and international workers in Finland.",
            }}
          />

          {/* Breadcrumbs & Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Breadcrumb" className="flex items-center text-xs font-medium text-on-surface-variant">
              <Link href="/" className="hover:text-primary-container transition-colors no-underline text-on-surface-variant">
                Home
              </Link>
              <svg className="mx-2 h-3.5 w-3.5 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-on-surface font-semibold" aria-current="page">
                Jobs in Finland
              </span>
            </nav>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
              <span>Independent Employment Guide for Job Seekers</span>
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="max-w-3xl flex flex-col gap-3">
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-primary tracking-tight leading-tight">
              Navigating the Finnish job market with clarity and confidence.
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Practical, honest advice on finding work, understanding Finnish recruitment culture, preparing a standard Finnish CV, and evaluating employment contract terms.
            </p>
          </div>
        </div>
      </section>

      {/* Employment Law Reference Notice Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 -mt-4 relative z-20">
        <div className="bg-surface-container-lowest rounded-xl shadow-card p-5 sm:p-6 border border-line flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0 mt-0.5">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="font-mono uppercase tracking-wider text-secondary font-bold">
                  Key Labor Rule
                </span>
                <span className="text-outline">•</span>
                <span className="text-on-surface-variant">Työsopimuslaki 55/2001 (Employment Contracts Act)</span>
              </div>
              <p className="text-xs sm:text-sm text-on-surface font-medium leading-relaxed">
                Written employment terms must be provided within one month of commencing work. Under Finnish law, the maximum trial period (koeaika) is capped at 6 months.
              </p>
            </div>
          </div>
          <a
            className="shrink-0 px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary text-xs font-semibold inline-flex items-center gap-1.5 transition-colors no-underline"
            href="https://www.tyosuojelu.fi"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Check with Työsuojelu</span>
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </section>

      {/* 4 Pillars of Finnish Employment */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-line pb-4">
            <div>
              <span className="font-mono uppercase tracking-widest text-secondary font-semibold text-xs">
                Essential Knowledge
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-primary mt-1">
                Four Pillars of Finnish Employment
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-md">
              Structured guidance built on direct legislation, employer compliance guidelines, and field data from working professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobGuides.map((guide) => (
              <article
                key={guide.slug}
                className="bg-surface-container-lowest rounded-xl p-6 sm:p-7 shadow-card border border-line flex flex-col justify-between hover:shadow-lift hover:border-primary-container transition-all group"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-semibold">
                      {guide.badge}
                    </span>
                    <span className="text-xs font-semibold text-primary-container uppercase tracking-wider">
                      {guide.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-xl font-semibold text-on-surface group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>

                  {guide.sections[0]?.keyItems && (
                    <div className="p-3.5 rounded-lg bg-surface-container-low/70 flex flex-col gap-2 text-xs text-on-surface-variant">
                      <span className="font-semibold text-on-surface">Key Focus:</span>
                      <ul className="space-y-1 list-disc list-inside">
                        {guide.sections[0].keyItems.slice(0, 2).map((item, i) => (
                          <li key={i} className="line-clamp-1">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-line/60">
                  <Link
                    href={`/jobs/${guide.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary-container no-underline"
                  >
                    <span>Read full guide</span>
                    <svg className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-linking to Wages and Students */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pb-16">
        <div className="rounded-2xl border border-line bg-surface-container-low p-7 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-primary">
              Verify your sector's collective agreement wages
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-on-surface-variant max-w-xl">
              Before attending job interviews or signing employment contracts, explore verified TES wage scales for 17+ Finnish occupations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/wages"
              className="rounded-lg bg-primary-container hover:bg-primary text-cream px-5 py-2.5 text-xs font-semibold transition-colors no-underline shadow-sm"
            >
              Browse Wages Directory
            </Link>
            <Link
              href="/students"
              className="rounded-lg border border-line bg-cream hover:bg-surface-container text-on-surface px-5 py-2.5 text-xs font-semibold transition-colors no-underline"
            >
              Student Work Rules
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
