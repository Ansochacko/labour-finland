import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata, SITE, absoluteUrl } from "@/lib/site";
import { getJobGuide, jobGuides } from "@/lib/jobs";
import type { Metadata } from "next";

export function generateStaticParams() {
  return jobGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getJobGuide(slug);
  if (!guide) return { title: "Job Guide not found | Labour Finland" };
  return pageMetadata({
    title: guide.metaTitle,
    description: guide.description,
    path: `/jobs/${guide.slug}`,
    type: "article",
  });
}

export default async function JobGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getJobGuide(slug);
  if (!guide) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Jobs in Finland", href: "/jobs" },
    { name: guide.title, href: `/jobs/${guide.slug}` },
  ];

  const faq = guide.sections.map((section) => ({
    "@type": "Question",
    name: section.heading,
    acceptedAnswer: { "@type": "Answer", text: section.body },
  }));

  return (
    <main id="main" className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.h1,
          description: guide.description,
          url: absoluteUrl(`/jobs/${guide.slug}`),
          author: { "@type": "Organization", name: SITE.name },
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-xs font-medium text-on-surface-variant" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary-container transition-colors no-underline text-on-surface-variant">
          Home
        </Link>
        <svg className="mx-2 h-3.5 w-3.5 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/jobs" className="hover:text-primary-container transition-colors no-underline text-on-surface-variant">
          Jobs in Finland
        </Link>
        <svg className="mx-2 h-3.5 w-3.5 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-on-surface font-semibold" aria-current="page">
          {guide.title}
        </span>
      </nav>

      {/* Article Header */}
      <header className="mt-8 border-b border-line pb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-semibold">
            {guide.badge}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-container">
            {guide.category}
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-primary tracking-tight leading-tight">
          {guide.h1}
        </h1>
        <p className="mt-5 text-base sm:text-xl text-on-surface-variant leading-relaxed font-normal">
          {guide.summary}
        </p>
      </header>

      {/* Article Sections */}
      <article className="mt-10 space-y-8">
        {guide.sections.map((section, idx) => (
          <section key={section.heading} className="rounded-xl border border-line bg-surface-container-lowest p-6 sm:p-8 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-container text-primary font-mono text-xs font-bold border border-line">
                {idx + 1}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-on-surface">
                {section.heading}
              </h2>
            </div>

            <p className="mt-3 text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {section.body}
            </p>

            {section.keyItems && (
              <div className="mt-4 rounded-lg bg-surface-container-low/70 p-4 border border-line/60">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-2">
                  Actionable Checklist / Details:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant">
                  {section.keyItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-container shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.sourceUrl && (
              <div className="mt-5 flex items-center gap-2 border-t border-line/60 pt-4 text-xs text-on-surface-variant">
                <span className="font-semibold text-on-surface">Primary Official Authority:</span>
                <a
                  href={section.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-primary underline hover:text-primary-container inline-flex items-center gap-1"
                >
                  <span>{section.sourceName || section.sourceUrl}</span>
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            )}
          </section>
        ))}
      </article>

      {/* Related Guides & Cross Links */}
      {guide.related.length > 0 && (
        <aside className="mt-14 rounded-xl border border-line bg-surface-container-low p-6 sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-primary">
            Related Guides & Tools
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {guide.related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-lg border border-line bg-surface-container-lowest p-4 no-underline hover:border-primary-container hover:shadow-sm transition-all"
              >
                <span className="text-sm font-medium text-on-surface group-hover:text-primary">
                  {item.label}
                </span>
                <span className="text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
            ))}
          </div>
        </aside>
      )}

      {/* Disclaimer */}
      <div className="mt-12 rounded-xl border border-line bg-surface-container-lowest p-5 text-xs text-on-surface-variant leading-relaxed">
        <strong className="text-on-surface">Legal Disclaimer: </strong>
        {SITE.disclaimer}
      </div>
    </main>
  );
}
