import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, absoluteUrl, breadcrumbJsonLd } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Verification Methodology — How Labour Finland Checks Wage Data",
  description:
    "SOURCE → DATE → NUMBER → EXPLANATION. The rigorous 6-step editorial standard for verifying Finnish collective agreements and Statistics Finland data.",
  path: "/methodology",
  type: "article",
});

export default function MethodologyPage() {
  const steps = [
    {
      num: "01",
      title: "Authoritative Primary Source",
      body: "We extract wage figures directly from published trade union and employer collective agreement texts (e.g., PAM, Tehy, Rakennusliitto) or official statistical releases from Statistics Finland.",
    },
    {
      num: "02",
      title: "Precise Classification & Grading",
      body: "We document the exact pay group, job grade, points scale, or regional applicability. We never map a generic job title onto an arbitrary grade.",
    },
    {
      num: "03",
      title: "Scope & Agreement Validation",
      body: "We verify whether an agreement is universally binding (yleissitova) and confirm whether allowances (such as evening and night shift additions) are mandatory.",
    },
    {
      num: "04",
      title: "Explicit Validity Dating",
      body: "Every numeric record is tagged with its effective start date and expiration date. Future negotiated increases are recorded with explicit future activation dates.",
    },
    {
      num: "05",
      title: "Transparent Provenance Publication",
      body: "Figures are published with a direct link to the primary source document, the name of the negotiating parties, and the date the record was last verified.",
    },
    {
      num: "06",
      title: "Continuous Editorial Review",
      body: "When collective agreements expire or national wage revisions take effect, records are reviewed and updated. If data is unverified, it remains clearly marked as unverified.",
    },
  ];

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Methodology", href: "/methodology" },
  ];

  return (
    <main id="main" className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How Labour Finland Verifies Wage Information",
          description:
            "The 6-step editorial standard for validating Finnish collective agreements and official earnings statistics.",
          url: absoluteUrl("/methodology"),
          author: { "@type": "Organization", name: "Labour Finland" },
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
          Methodology
        </span>
      </nav>

      {/* Page Header */}
      <div className="mt-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-dark shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
          Editorial Standard
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold text-ink tracking-tight">
          How We Verify Wage Information
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          The goal of Labour Finland is not simply to publish a salary number. It is to explain what that number represents, who it applies to, where it came from, and when it expires.
        </p>
      </div>

      {/* The 6-step Grid */}
      <section className="mt-12">
        <div className="border-b border-line pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Core Verification Pipeline
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
            SOURCE → DATE → NUMBER → EXPLANATION
          </h2>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {steps.map((step) => (
            <div key={step.num} className="rounded-2xl border border-line bg-cream p-6 shadow-card space-y-2">
              <span className="inline-block rounded-md bg-paper px-2.5 py-1 font-mono text-xs font-bold text-accent border border-line">
                {step.num}
              </span>
              <h3 className="font-serif text-xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Deep Context Section */}
      <section className="mt-14 space-y-8 rounded-2xl border border-line bg-paper-subtle p-8 text-ink">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-ink">
            How the Interactive Wage Lookup Operates
          </h2>
          <ol className="mt-4 space-y-3 text-sm text-ink-light list-decimal list-inside leading-relaxed">
            <li>
              <strong>Occupation Matching:</strong> The engine identifies your occupation and search aliases (e.g. <em>siivooja</em> → Cleaner, <em>lähihoitaja</em> → Practical nurse).
            </li>
            <li>
              <strong>Classification Flow:</strong> If an occupation requires specific job parameters (such as Property Services points or Hospitality experience tiers), the system asks targeted questions.
            </li>
            <li>
              <strong>Active Validity Check:</strong> The engine queries verified wage records whose validity period encompasses the current date.
            </li>
            <li>
              <strong>Provenance Display:</strong> The resolved view displays the exact rate, legal collective agreement name, primary source URL, and verified timestamp.
            </li>
          </ol>
        </div>

        <div className="border-t border-line pt-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Handling Missing or Unverified Data
          </h2>
          <p className="mt-3 text-sm text-ink-light leading-relaxed">
            When a sector does not have a verified numeric wage record in our database, we display an honest <em>"Data not yet verified"</em> state accompanied by direct links to the relevant trade union or employer federation. We never use unverified estimates or AI approximations to fill data gaps.
          </p>
          <div className="mt-4">
            <Link href="/contact" className="text-sm font-semibold text-accent underline hover:text-accent-dark">
              Report a correction or submit a verified source →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
