import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { WageLookup } from "@/components/wage-lookup";
import { EmptyVerifiedState, WageTable } from "@/components/wage-table";
import { AdSlot } from "@/components/json-ld";
import { pageMetadata, absoluteUrl, SITE, breadcrumbJsonLd } from "@/lib/site";
import {
  activeOccupations,
  engine,
  getDataset,
  occupationFromPageSlug,
  pageSlug,
  statfinFor,
  statfinMeta,
} from "@/lib/dataset";
import { occupationPageCopy } from "@/lib/occupation-pages";
import { formatEuro } from "@/lib/format";
import type { Metadata } from "next";

export function generateStaticParams() {
  return activeOccupations().map((occupation) => ({ slug: pageSlug(occupation) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const occupation = occupationFromPageSlug(slug);
  if (!occupation) return { title: "Occupation not found | Labour Finland" };
  const copy = occupationPageCopy(occupation.id);
  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: `/wages/${slug}`,
    type: "article",
  });
}

export default async function OccupationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const occupation = occupationFromPageSlug(slug);
  if (!occupation) notFound();

  const copy = occupationPageCopy(occupation.id);
  const dataset = getDataset();
  const records = engine.eligibleWageRecords(dataset, occupation.id);
  const agreement = records[0] ? engine.getAgreement(dataset, records[0].agreement_id) : null;
  const statfin = statfinFor(occupation.id);
  const related = activeOccupations()
    .filter((item) => item.sector === occupation.sector && item.id !== occupation.id)
    .slice(0, 4);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Wages", href: "/wages" },
    { name: occupation.name, href: `/wages/${slug}` },
  ];

  const primaryRate = records[0]?.wage.amount;

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: copy.h1,
          url: absoluteUrl(`/wages/${slug}`),
          description: copy.description,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
        }}
      />

      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center text-xs font-medium text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-accent transition-colors no-underline text-muted">
          Home
        </Link>
        <svg className="mx-2 h-3.5 w-3.5 text-line-strong" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/wages" className="hover:text-accent transition-colors no-underline text-muted">
          Wages
        </Link>
        <svg className="mx-2 h-3.5 w-3.5 text-line-strong" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-ink font-semibold" aria-current="page">
          {occupation.name}
        </span>
      </nav>

      {/* Page Header */}
      <div className="mt-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-dark shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
          {records.length ? "Verified Collective Agreement Data" : "Factual Overview"}
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold text-ink tracking-tight">
          {copy.h1}
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed font-normal">
          {copy.intro}
        </p>
        <p className="mt-3 text-sm text-ink-light leading-relaxed">
          {copy.context}
        </p>
      </div>

      {/* Key Takeaways Card */}
      {copy.keyPoints && copy.keyPoints.length > 0 && (
        <div className="mt-8 rounded-2xl border border-line bg-paper-subtle p-6 max-w-4xl">
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent-dark">
            Key Rules & Information for {occupation.name}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-light">
            {copy.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-cream text-[10px]">
                  ✓
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Wage Scale Section */}
      <section className="mt-12 space-y-6">
        {records.length ? (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-line pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-verified">
                  Official Pay Floor
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
                  Collective-Agreement Wage Scale
                </h2>
              </div>
              <div className="text-xs text-muted">
                Valid: <strong className="text-ink">{records[0].effective_from}</strong> to{" "}
                <strong className="text-ink">{records[0].effective_until || "open"}</strong>
              </div>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">
              {engine.wageTypeExplanation(records[0].wage.type)} Figures are gross amounts before taxation. Last verified: {records[0].last_verified}.
            </p>

            <div className="mt-6">
              <WageTable records={records} />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-paper-subtle/50 px-4 py-3 text-xs text-muted">
              <div>
                <strong className="text-ink">Primary Source: </strong>
                <a
                  className="font-semibold text-accent underline hover:text-accent-dark"
                  href={records[0].source_url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {records[0].source_name}
                </a>
                {agreement ? ` (${agreement.name})` : null}
              </div>
              {primaryRate && (
                <Link
                  href={`/calculator?hourly_wage=${primaryRate}`}
                  className="font-semibold text-accent hover:underline inline-flex items-center gap-1"
                >
                  Calculate monthly gross for this wage →
                </Link>
              )}
            </div>
          </div>
        ) : (
          <EmptyVerifiedState
            title={occupation.preparing?.title || `${occupation.name} TES Wage Information`}
            body={
              occupation.preparing?.body ||
              "A verified collective-agreement wage table has not been published for this occupation yet. Labour Finland does not publish unverified or guessed figures."
            }
            sourceName={occupation.preparing?.source_name}
            sourceUrl={occupation.preparing?.source_url}
          />
        )}
      </section>

      {/* Statistics Finland 2024 Earnings Card */}
      {statfin ? (
        <section className="mt-14 rounded-2xl border border-line bg-cream p-6 sm:p-8 shadow-card">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-line pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Official Government Statistics
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
                Statistics Finland 2024 Earnings
              </h2>
            </div>
            <span className="rounded-full bg-paper px-3 py-1 text-[11px] font-semibold text-muted border border-line">
              ISCO Code {statfin.isco_code}
            </span>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
            Official Structure of Earnings figures for <strong className="text-ink">{statfin.statfin_occupation}</strong>. Full-time employees, all sectors, sexes total. This represents overall market earnings across Finland and is <span className="underline decoration-warn font-semibold text-ink">not a legal TES pay minimum</span>.
          </p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-paper-subtle p-5">
              <dt className="text-xs font-bold uppercase tracking-wider text-muted">
                Median Monthly Gross
              </dt>
              <dd className="mt-2 font-serif text-3xl font-bold text-accent-dark tabular-nums">
                {formatEuro(statfin.median_monthly_eur)}
              </dd>
              <p className="mt-1 text-[11px] text-muted">50% earn less, 50% earn more</p>
            </div>

            <div className="rounded-xl border border-line bg-paper-subtle p-5">
              <dt className="text-xs font-bold uppercase tracking-wider text-muted">
                Average Monthly Gross
              </dt>
              <dd className="mt-2 font-serif text-3xl font-bold text-ink tabular-nums">
                {formatEuro(statfin.average_monthly_eur)}
              </dd>
              <p className="mt-1 text-[11px] text-muted">Mean total earnings</p>
            </div>

            <div className="rounded-xl border border-line bg-paper-subtle p-5">
              <dt className="text-xs font-bold uppercase tracking-wider text-muted">
                Full-Time Employees Sampled
              </dt>
              <dd className="mt-2 font-serif text-3xl font-bold text-ink tabular-nums">
                {statfin.employee_count.toLocaleString("en-FI")}
              </dd>
              <p className="mt-1 text-[11px] text-muted">Workers in data cell</p>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4 text-xs text-muted">
            <p>
              {statfinMeta.attribution} Retrieved {statfinMeta.last_verified}.
            </p>
            <a
              className="text-accent underline font-semibold hover:text-accent-dark inline-flex items-center gap-1"
              href={statfinMeta.source_url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span>View original Statistics Finland table 15au</span>
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </section>
      ) : null}

      {/* Interactive Grade Lookup Tool */}
      <section className="mt-14">
        <div className="border-b border-line pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Interactive Lookup
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
            Check the grade & supplements that apply to you
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted">
            Answer the specific classification questions to identify your wage group under the collective agreement.
          </p>
        </div>

        <div className="mt-6">
          <WageLookup initialQuery={occupation.name} />
        </div>
      </section>
      <AdSlot slot="occupation-after-lookup" />

      {/* Related Occupations Grid */}
      {related.length ? (
        <section className="mt-16 border-t border-line pt-10">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Related Occupations in {occupation.sector.replace(/-/g, " ")}
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Link
                key={item.id}
                className="group flex flex-col justify-between rounded-xl border border-line bg-cream p-4 no-underline hover:border-accent hover:shadow-sm transition-all"
                href={`/wages/${pageSlug(item)}`}
              >
                <span className="font-serif text-base font-semibold text-ink group-hover:text-accent">
                  {item.name}
                </span>
                <span className="mt-2 text-xs font-medium text-accent inline-flex items-center gap-1">
                  <span>View pay scale</span>
                  <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Helpful internal links footer */}
      <div className="mt-12 flex flex-wrap gap-4 border-t border-line pt-6 text-xs text-muted">
        <Link href="/methodology" className="hover:text-accent underline font-medium">
          How these figures are verified
        </Link>
        <span>•</span>
        <Link href="/working-in-finland/minimum-wage-finland" className="hover:text-accent underline font-medium">
          How Finland's minimum wage system works
        </Link>
        <span>•</span>
        <Link href="/working-in-finland/tes-finland" className="hover:text-accent underline font-medium">
          Understanding Finnish collective agreements (TES)
        </Link>
      </div>
    </main>
  );
}
