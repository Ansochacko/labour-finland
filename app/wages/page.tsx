import Link from "next/link";
import { WageLookup } from "@/components/wage-lookup";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, absoluteUrl, breadcrumbJsonLd } from "@/lib/site";
import { activeOccupations, getDataset, engine, pageSlug } from "@/lib/dataset";
import { directoryGroups, occupationPageCopy } from "@/lib/occupation-pages";

export const metadata = pageMetadata({
  title: "Wages in Finland by Occupation 2026 — Collective Agreement Directory",
  description:
    "Explore verified Finnish collective-agreement wage scales by occupation: cleaner, restaurant worker, retail, nursing, logistics, construction, and IT.",
  path: "/wages",
});

export default async function WagesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const dataset = getDataset();
  const occupations = activeOccupations();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Wages Directory", href: "/wages" },
  ];

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Occupations with wage information in Finland",
          itemListElement: occupations.map((occupation, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: occupation.name,
            url: absoluteUrl(`/wages/${pageSlug(occupation)}`),
          })),
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
          Wages Directory
        </span>
      </nav>

      {/* Header section */}
      <div className="mt-6 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
          Occupational Wage Scales & Data
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold text-ink tracking-tight">
          Wages in Finland
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          Because Finland does not enforce a single universal statutory minimum wage, pay rates are negotiated sector by sector in collective agreements (työehtosopimus, TES). Explore verified pay rates, grades, and official 2024 earnings below.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mt-10">
        <WageLookup initialQuery={q} />
      </div>

      {/* Directory grouped by sectors */}
      <section className="mt-16">
        <div className="border-b border-line pb-4 flex items-baseline justify-between flex-wrap gap-2">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
              Occupation Directory by Sector
            </h2>
            <p className="mt-1 text-xs text-muted">
              Select an occupation to view full pay scale, experience tiers, and official Statistics Finland figures.
            </p>
          </div>
          <span className="text-xs font-medium text-muted">
            {occupations.length} occupations tracked
          </span>
        </div>

        <div className="mt-10 space-y-12">
          {directoryGroups().map(([groupId, title]) => {
            const items = occupations.filter((item) => item.directory_group === groupId);
            if (!items.length) return null;

            return (
              <section key={groupId} className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl font-semibold text-ink">
                    {title}
                  </h3>
                  <span className="rounded-full bg-paper px-2 py-0.5 text-[11px] font-semibold text-muted border border-line">
                    {items.length}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((occupation) => {
                    const status = engine.occupationLookupStatus(dataset, occupation);
                    const copy = occupationPageCopy(occupation.id);
                    const isVerified = status === "VERIFIED_NUMERIC" || status === "VERIFIED_SCALE";

                    return (
                      <Link
                        key={occupation.id}
                        href={`/wages/${pageSlug(occupation)}`}
                        className="group flex flex-col justify-between rounded-2xl border border-line bg-cream p-5 shadow-card hover:border-accent hover:shadow-lift transition-all no-underline"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-serif text-lg font-semibold text-ink group-hover:text-accent transition-colors">
                              {occupation.name}
                            </span>
                            {isVerified ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-verified-bg px-2 py-0.5 text-[10px] font-bold text-verified border border-verified-border">
                                <span className="h-1 w-1 rounded-full bg-verified"></span>
                                TES Scale
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-paper px-2 py-0.5 text-[10px] font-medium text-muted border border-line">
                                Info
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-xs text-muted line-clamp-2 leading-relaxed">
                            {copy.intro}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-xs">
                          <span className="text-[11px] font-medium text-muted">
                            {engine.lookupStatusLabel(status)}
                          </span>
                          <span className="font-semibold text-accent group-hover:translate-x-0.5 transition-transform">
                            View guide →
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
