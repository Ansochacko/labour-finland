import Link from "next/link";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";

export const metadata = pageMetadata({
  title: "Contact & Data Corrections — Labour Finland",
  description:
    "How to submit data corrections, report expired collective agreements, or send editorial feedback to the Labour Finland team.",
  path: "/contact",
});

export default function ContactPage() {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Contact & Corrections", href: "/contact" },
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
          Contact & Corrections
        </span>
      </nav>

      {/* Page Header */}
      <div className="mt-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-dark shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
          Editorial Feedback & Data Audits
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold text-ink tracking-tight">
          Contact & Data Corrections
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          We welcome verified updates, corrections to collective-agreement scales, and suggestions for newly published sector tables.
        </p>
      </div>

      {/* Feedback Channels */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border border-line bg-cream p-6 shadow-card">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-paper-subtle text-accent mb-3 border border-line">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h2 className="font-serif text-lg font-semibold text-ink">
            Wage Data Corrections
          </h2>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            Specify the occupation, the relevant collective agreement, the exact table clause, and a link to the official union or employer text.
          </p>
        </article>

        <article className="rounded-2xl border border-line bg-cream p-6 shadow-card">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-paper-subtle text-accent mb-3 border border-line">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
          </div>
          <h2 className="font-serif text-lg font-semibold text-ink">
            Broken Primary Sources
          </h2>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            Report any expired union URLs or moved government statistics links so our team can update references immediately.
          </p>
        </article>

        <article className="rounded-2xl border border-line bg-cream p-6 shadow-card">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-paper-subtle text-accent mb-3 border border-line">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
            </svg>
          </div>
          <h2 className="font-serif text-lg font-semibold text-ink">
            New Sector Requests
          </h2>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            Let us know which additional Finnish occupations or sector agreements you would like prioritized for verification.
          </p>
        </article>
      </div>

      {/* Form or Pre-launch Notice */}
      <div className="mt-10">
        {endpoint ? (
          <form
            className="rounded-2xl border border-line bg-cream p-6 sm:p-8 shadow-card space-y-4"
            action={endpoint}
            method="post"
          >
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Send an editorial report
            </h2>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink" htmlFor="message">
                Message & Source Link
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="mt-2 min-h-36 w-full rounded-xl border border-line bg-paper p-4 text-sm text-ink focus:bg-cream focus:border-accent transition-colors"
                placeholder="Describe the occupation, wage figure, or source text that needs review..."
              />
            </div>
            <button
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-cream hover:bg-accent-hover transition-colors shadow-sm"
              type="submit"
            >
              Submit report
            </button>
          </form>
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-paper-subtle p-6 text-sm text-muted leading-relaxed">
            <h3 className="font-serif text-lg font-semibold text-ink mb-1">
              Contact Channel Notice
            </h3>
            <p>
              Direct messaging endpoint is currently being configured prior to public launch. Once enabled via <code className="rounded bg-paper px-1.5 py-0.5 text-xs text-ink font-mono">NEXT_PUBLIC_FORM_ENDPOINT</code>, reports can be submitted directly here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
