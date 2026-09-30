import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, absoluteUrl, breadcrumbJsonLd } from "@/lib/site";
import { guides } from "@/lib/guides";

export const metadata = pageMetadata({
  title: "Working in Finland 2026 — Collective Agreements, Pay & Rights",
  description:
    "Plain-language guides to working life in Finland: minimum wage rules, collective agreements (TES), Sunday pay, evening supplements, payslips, and tax cards.",
  path: "/working-in-finland",
});

export default function WorkingInFinlandPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Working in Finland", href: "/working-in-finland" },
  ];

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Working in Finland Guides",
          url: absoluteUrl("/working-in-finland"),
          description:
            "Authoritative guides on Finnish employment conditions, collective agreements, and wage rights.",
        }}
      />

      {/* Breadcrumb nav */}
      <nav className="flex items-center text-xs font-medium text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-accent transition-colors no-underline text-muted">
          Home
        </Link>
        <svg className="mx-2 h-3.5 w-3.5 text-line-strong" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-ink font-semibold" aria-current="page">
          Working in Finland
        </span>
      </nav>

      {/* Header section */}
      <div className="mt-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-dark shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
          Finnish Working Life Knowledge Hub
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold text-ink tracking-tight">
          Working in Finland
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          Clear, sourced guides to the rules, rights, and wage mechanics of the Finnish labour market. Learn how collective agreements (TES) protect your pay floor, how shift additions work, and how to verify your payslip.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/working-in-finland/${guide.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-line bg-cream p-7 shadow-card hover:border-accent hover:shadow-lift transition-all no-underline"
          >
            <div>
              {guide.badge && (
                <span className="inline-block rounded-full bg-paper px-2.5 py-0.5 text-[11px] font-semibold text-accent-dark border border-line mb-3">
                  {guide.badge}
                </span>
              )}
              <h2 className="font-serif text-2xl font-semibold text-ink group-hover:text-accent transition-colors leading-snug">
                {guide.title}
              </h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {guide.summary}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform border-t border-line/60 pt-4">
              <span>Read complete guide</span>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Practical Advisory Cards */}
      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-line bg-paper-subtle p-7">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream text-accent mb-4 border border-line shadow-sm">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Employment Contracts in Finland
          </h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            By law, employers must provide written employment terms within one month of starting work. The contract must specify your job title, base salary, working hours, pay frequency, and the applicable collective agreement (TES).
          </p>
        </article>

        <article className="rounded-2xl border border-line bg-paper-subtle p-7">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream text-accent mb-4 border border-line shadow-sm">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.199l-.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Where to Seek Official Advice
          </h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            For authoritative legal dispute resolution or safety oversight, contact the Occupational Safety and Health Administration (Työsuojeluhallinto) or your sector's trade union. Labour Finland provides independent general information.
          </p>
        </article>
      </section>
    </main>
  );
}
