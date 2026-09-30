import Link from "next/link";
import { CalculatorForm } from "@/components/calculator-form";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, absoluteUrl, SITE, breadcrumbJsonLd } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Salary Calculator Finland 2026 — Hourly to Monthly Gross Pay",
  description:
    "Convert your Finnish hourly wage into estimated weekly, monthly, and annual gross pay. Standard 37.5h full-time benchmark with clear tax and TES caveats.",
  path: "/calculator",
});

export default async function CalculatorPage({
  searchParams,
}: {
  searchParams: Promise<{ hourly_wage?: string }>;
}) {
  const { hourly_wage } = await searchParams;
  const preset = hourly_wage ? Number(hourly_wage) : undefined;

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Salary Calculator", href: "/calculator" },
  ];

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Finland Salary & Gross Pay Calculator",
          url: absoluteUrl("/calculator"),
          description:
            "Converts hourly wage rates in Finland to weekly, monthly, and annual gross estimates.",
          applicationCategory: "FinanceApplication",
          operatingSystem: "All",
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
          Salary Calculator
        </span>
      </nav>

      {/* Page Header */}
      <div className="mt-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-dark shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
          Gross Earnings Estimator
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold text-ink tracking-tight">
          Finland Salary Calculator
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          Convert hourly wages into projected weekly, monthly, and annual gross earnings under Finnish standard working hours (typically 37.5 or 40 hours per week).
        </p>
      </div>

      {/* Calculator Interactive Form */}
      <div className="mt-10">
        <CalculatorForm presetHourly={preset && Number.isFinite(preset) ? preset : undefined} />
      </div>

      {/* Educational context sections */}
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border border-line bg-cream p-6 shadow-card">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-paper-subtle text-accent mb-4 border border-line">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h2 className="font-serif text-xl font-semibold text-ink">
            Standard Finnish Working Hours
          </h2>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            In Finland, full-time office and service work commonly runs at 37.5 hours/week (7.5 hours/day). Industrial and logistics schedules may use 38.25 or 40 hours/week.
          </p>
        </article>

        <article className="rounded-2xl border border-line bg-cream p-6 shadow-card">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-paper-subtle text-accent mb-4 border border-line">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6H2.25m0 0v8.25m0-8.25h19.5m-19.5 0v.75m19.5-.75v.75m0 0a.75.75 0 0 1-.75.75H3m16.5 0v8.25m0-8.25v.75M3 15.75h18" />
            </svg>
          </div>
          <h2 className="font-serif text-xl font-semibold text-ink">
            Gross Pay vs Take-Home Pay
          </h2>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            This tool outputs gross pay. To calculate your net pay, Finnish personal income tax (based on your verokortti), municipal tax, pension (TyEL), and unemployment insurance are deducted by your employer.
          </p>
        </article>

        <article className="rounded-2xl border border-line bg-cream p-6 shadow-card">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-paper-subtle text-accent mb-4 border border-line">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h2 className="font-serif text-xl font-semibold text-ink">
            Collective Agreement Additions
          </h2>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            Working evening, night, or weekend shifts triggers collective-agreement supplements (iltalisä, yöllisä, sunnuntailisä) that increase gross pay above base hourly rates.
          </p>
        </article>
      </div>

      {/* Helpful Links */}
      <div className="mt-12 flex flex-wrap gap-4 border-t border-line pt-6 text-xs text-muted">
        <Link href="/wages" className="hover:text-accent underline font-medium">
          Browse verified occupation wage tables
        </Link>
        <span>•</span>
        <Link href="/working-in-finland/how-to-read-finnish-payslip" className="hover:text-accent underline font-medium">
          Guide to reading a Finnish payslip
        </Link>
        <span>•</span>
        <Link href="/working-in-finland/verokortti-explained" className="hover:text-accent underline font-medium">
          How tax cards (verokortti) work in Finland
        </Link>
      </div>
    </main>
  );
}
