import Link from "next/link";
import { WageLookup } from "@/components/wage-lookup";
import { AdSlot } from "@/components/json-ld";
import { pageMetadata, SITE } from "@/lib/site";
import { activeOccupations, pageSlug } from "@/lib/dataset";

export const metadata = pageMetadata({
  title: "Wages in Finland 2026 — Collective Agreement Rates & Salaries",
  description:
    "Look up verified collective-agreement (TES) wage scales and Statistics Finland earnings by occupation. Sourced with validity dates, grades, and shift supplements.",
  path: "/",
});

export default function HomePage() {
  const popular = activeOccupations().filter((item) => item.popular);

  return (
    <main id="main">
      {/* Editorial Hero Section */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 lg:pt-20 lg:pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-dark shadow-sm font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
            Independent · Sourced · Verified TES Data
          </div>

          <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-ink tracking-tight">
            Understand your pay in Finland.
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-muted leading-relaxed font-normal">
            Finland does not have a single statutory national minimum wage. Instead, pay floors and terms come from collective agreements (TES). We publish verified pay scales with exact sources, validity dates, and zero invented figures.
          </p>
        </div>

        {/* Wage Search Component */}
        <div className="mt-10 sm:mt-12" id="wage-lookup">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
              Look up your wage rate
            </h2>
            <Link
              href="/wages"
              className="text-xs font-semibold text-accent hover:text-accent-dark underline hidden sm:inline"
            >
              Browse all occupations directory →
            </Link>
          </div>

          <WageLookup />

          {/* Quick occupation pills */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted mr-1 font-mono">
              Popular:
            </span>
            {popular.map((occupation) => (
              <Link
                key={occupation.id}
                href={`/wages/${pageSlug(occupation)}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-line bg-cream px-3.5 py-1.5 text-xs font-medium text-ink-light no-underline shadow-sm hover:border-accent hover:text-accent hover:bg-paper transition-all"
              >
                <span>{occupation.name}</span>
                <span className="text-[10px] text-muted">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Navigation Cards */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <HomeCard
            href="/wages"
            eyebrow="Directory"
            title="Browse Verified Pay Scales"
            description="Explore full collective-agreement wage tables for cleaners, hospitality, commerce, healthcare, and technology."
            badge="17 Occupations"
          />
          <HomeCard
            href="/calculator"
            eyebrow="Tool"
            title="Salary & Gross Pay Calculator"
            description="Convert your hourly rate into projected weekly, monthly, and annual gross earnings under Finnish standard hours."
            badge="Estimator"
          />
          <HomeCard
            href="/working-in-finland"
            eyebrow="Knowledge"
            title="Finnish Working Life Guides"
            description="Clear explanations of how collective agreements work, Sunday pay rules, evening supplements, and tax cards (verokortti)."
            badge="7 Guides"
          />
        </div>
      </section>

      {/* The Trust Standard: Archival Ledger Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-xl border border-line bg-cream p-8 sm:p-12 shadow-card">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
              Our Publication Standard
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-ink">
              Source → Date → Number → Explanation
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Every wage figure published on Labour Finland is tied to a primary collective agreement text or Statistics Finland dataset. If a figure has not been verified from primary documentation, it is marked as unverified — never estimated.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <TrustPillar
              step="01"
              title="Primary Agreement Texts"
              description="Extracted directly from published trade union and employer collective agreements (e.g. PAM, Tehy, Rakennusliitto)."
            />
            <TrustPillar
              step="02"
              title="Active Validity Dates"
              description="Each wage scale displays its exact effective start date and expiration date, tracking upcoming revisions."
            />
            <TrustPillar
              step="03"
              title="Statistics Finland Context"
              description="Separately displays Structure of Earnings 2024 data (CC BY 4.0) so users can compare agreement floors with market medians."
            />
            <TrustPillar
              step="04"
              title="Editorial Independence"
              description={SITE.independence}
            />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
            <Link
              href="/methodology"
              className="text-sm font-semibold text-accent underline hover:text-accent-dark"
            >
              Read our full 6-step verification methodology →
            </Link>
            <span className="text-xs text-muted">
              Last dataset update: September 2026
            </span>
          </div>
        </div>
        <AdSlot slot="home-after-trust" />
      </section>
    </main>
  );
}

function HomeCard({
  href,
  eyebrow,
  title,
  description,
  badge,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-2xl border border-line bg-cream p-7 shadow-card hover:border-accent hover:shadow-lift transition-all no-underline"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            {eyebrow}
          </span>
          <span className="rounded-full bg-paper px-2.5 py-0.5 text-[11px] font-semibold text-muted border border-line group-hover:border-accent/30 transition-colors">
            {badge}
          </span>
        </div>
        <h3 className="mt-4 font-serif text-2xl font-semibold text-ink group-hover:text-accent transition-colors leading-snug">
          {title}
        </h3>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          {description}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform">
        <span>Explore section</span>
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </Link>
  );
}

function TrustPillar({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-paper-subtle/70 p-5">
      <span className="text-xs font-bold tracking-wider text-accent">
        {step}
      </span>
      <h3 className="mt-2 font-serif text-lg font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-2 text-xs text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}
