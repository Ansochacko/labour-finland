import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, absoluteUrl, breadcrumbJsonLd } from "@/lib/site";
import { studentGuides } from "@/lib/students";

export const metadata = pageMetadata({
  title: "Students in Finland 2026 — Work Rights, 30h Limit & Jobs",
  description:
    "Independent practical guide for international students in Finland: 30h/week working hour limits (Aliens Act § 77), tax cards, part-time jobs, living costs, and Migri rules.",
  path: "/students",
});

export default function StudentsPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Students in Finland", href: "/students" },
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
              name: "Students in Finland Guide",
              url: absoluteUrl("/students"),
              description:
                "Practical and sourced guide for international students working and living in Finland.",
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
                Students in Finland
              </span>
            </nav>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              <span>Independent Student Employment &amp; Rights Guide</span>
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-primary tracking-tight leading-tight">
                Studying and working in Finland: rights, limits, and real wages.
              </h1>
              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                Everything you need to know about the 30-hour work limit, obtaining your tax card (<em>verokortti</em>), student healthcare through YTHS, finding part-time work, and protecting yourself against wage underpayment.
              </p>
            </div>

            <div className="lg:col-span-4 bg-surface-container-lowest p-5 rounded-xl border border-line shadow-sm">
              <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                <span className="font-bold uppercase tracking-wider text-[10px] font-mono">Academic Year 2024–2026</span>
                <span className="font-mono text-primary font-semibold">Aliens Act § 77</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-bold text-primary">30 h<span className="text-sm font-normal text-on-surface-variant">/wk</span></span>
                <span className="text-xs text-on-surface-variant">term-time work limit</span>
              </div>
              <p className="mt-2 text-[11px] text-on-surface-variant">
                Full-time work permitted during university summer and winter holiday recesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Migri Sourced Provenance Module (Signature Trust Component) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 -mt-4 relative z-20">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-card p-6 sm:p-7 border border-line">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tertiary"></div>
          <div className="flex flex-col gap-4 pl-2 sm:pl-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-tertiary-soft text-tertiary flex items-center justify-center font-bold text-sm border border-tertiary-border">
                  ✓
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-on-surface">Finnish Immigration Service (Migri) Reference</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-tertiary-soft text-tertiary font-bold uppercase">
                      Aliens Act Sourced
                    </span>
                  </div>
                  <span className="text-xs text-on-surface-variant">Legal reference: Ulkomaalaislaki (301/2004) § 77</span>
                </div>
              </div>
              <span className="text-xs font-mono text-on-surface-variant">
                Verified from migri.fi
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-secondary font-bold">
                  Rule in Force
                </span>
                <h2 className="font-serif text-2xl font-semibold text-primary">
                  30 Hours Per Week Average Working Limit (Calendar Year Basis)
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Following the legislative reform in June 2022, students holding a Finnish residence permit for studies (<em>opiskelijan oleskelulupa</em>) are entitled to work up to an <strong>average of 30 hours per week</strong> over the entire calendar year.
                </p>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  During periods when educational institutions do not hold instruction (summer recess and winter holidays), students may work <strong>full-time without hours caps</strong>. All collective agreement pay scales (TES) apply equally to student workers.
                </p>
              </div>

              <div className="lg:col-span-4 bg-surface-container-low p-4 rounded-xl space-y-3 text-xs border border-line">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Term-Time Cap</span>
                  <span className="font-mono font-bold text-primary">30.0 h/week avg.</span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full w-[75%]"></div>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-on-surface-variant">Holiday Recess Cap</span>
                  <span className="font-mono font-bold text-tertiary">Unlimited (40h+)</span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full w-[100%]"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2 pt-2 text-xs text-on-surface-variant">
              <span>Source: Finnish Immigration Service Guidelines for Degree Students</span>
              <a
                href="https://migri.fi/en/working-during-studies"
                target="_blank"
                rel="noreferrer noopener"
                className="text-primary font-semibold underline hover:text-primary-container"
              >
                Verify on Migri.fi →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Student Life */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-line pb-4">
            <div>
              <span className="font-mono uppercase tracking-widest text-secondary font-semibold text-xs">
                Student Practical Knowledge
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-primary mt-1">
                Student Life, Budget &amp; Employment Pillars
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-md">
              Clear facts on housing subsidies, tax cards, entry-level jobs, and post-graduation visa pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studentGuides.map((guide) => (
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
                      <span className="font-semibold text-on-surface">Key Facts:</span>
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
                    href={`/students/${guide.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary-container no-underline"
                  >
                    <span>Read complete guide</span>
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

      {/* Cross-linking to Calculator & Wages */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pb-16">
        <div className="rounded-2xl border border-line bg-surface-container-low p-7 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-primary">
              Estimate your student monthly earnings
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-on-surface-variant max-w-xl">
              Convert your part-time hourly rate (e.g. cleaning €12.59/h or restaurant €12.70/h) into weekly and monthly gross pay at 15h, 20h, or 30h per week.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/calculator"
              className="rounded-lg bg-primary-container hover:bg-primary text-cream px-5 py-2.5 text-xs font-semibold transition-colors no-underline shadow-sm"
            >
              Open Salary Calculator
            </Link>
            <Link
              href="/wages"
              className="rounded-lg border border-line bg-cream hover:bg-surface-container text-on-surface px-5 py-2.5 text-xs font-semibold transition-colors no-underline"
            >
              Browse Hourly Wages
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
