import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata, SITE } from "@/lib/site";
import { getGuide, guides } from "@/lib/guides";
import type { Metadata } from "next";

export function generateStaticParams() {
  return guides.map((guide) => ({ topic: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const guide = getGuide(topic);
  if (!guide) return { title: "Guide not found | Labour Finland" };
  return pageMetadata({
    title: guide.metaTitle,
    description: guide.description,
    path: `/working-in-finland/${guide.slug}`,
    type: "article",
  });
}

export default async function GuidePage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const guide = getGuide(topic);
  if (!guide) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Working in Finland", href: "/working-in-finland" },
    { name: guide.title, href: `/working-in-finland/${guide.slug}` },
  ];

  const faq = guide.sections.map((section) => ({
    "@type": "Question",
    name: section.heading,
    acceptedAnswer: { "@type": "Answer", text: section.body },
  }));

  return (
    <main id="main" className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq,
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
        <Link href="/working-in-finland" className="hover:text-accent transition-colors no-underline text-muted">
          Working in Finland
        </Link>
        <svg className="mx-2 h-3.5 w-3.5 text-line-strong" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-ink font-semibold" aria-current="page">
          {guide.title}
        </span>
      </nav>

      {/* Editorial Article Header */}
      <header className="mt-8 border-b border-line pb-8">
        {guide.badge && (
          <span className="inline-block rounded-full bg-paper px-3 py-1 text-xs font-semibold text-accent-dark border border-line mb-3">
            {guide.badge}
          </span>
        )}
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
          {guide.h1}
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-muted leading-relaxed font-normal">
          {guide.summary}
        </p>
      </header>

      {/* Article Content */}
      <article className="mt-10 space-y-10">
        {guide.sections.map((section, idx) => (
          <section key={section.heading} className="rounded-2xl border border-line bg-cream p-6 sm:p-8 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-paper text-accent font-mono text-xs font-bold border border-line">
                {idx + 1}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
                {section.heading}
              </h2>
            </div>

            <p className="mt-3 text-sm sm:text-base text-ink-light leading-relaxed">
              {section.body}
            </p>

            {section.sourceUrl && (
              <div className="mt-5 flex items-center gap-2 border-t border-line/60 pt-4 text-xs text-muted">
                <span className="font-semibold text-ink">Official Reference:</span>
                <a
                  href={section.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-accent underline hover:text-accent-dark inline-flex items-center gap-1"
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
        <aside className="mt-14 rounded-2xl border border-line bg-paper-subtle p-7">
          <h2 className="font-serif text-xl font-semibold text-ink">
            Related Guides & Tools
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {guide.related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-xl border border-line bg-cream p-4 no-underline hover:border-accent hover:shadow-sm transition-all"
              >
                <span className="text-sm font-medium text-ink group-hover:text-accent">
                  {item.label}
                </span>
                <span className="text-xs font-semibold text-accent group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
            ))}
          </div>
        </aside>
      )}

      {/* Disclaimer Footer */}
      <div className="mt-12 rounded-xl border border-line bg-cream p-5 text-xs text-muted leading-relaxed">
        <strong className="text-ink">Legal Disclaimer: </strong>
        {SITE.disclaimer}
      </div>
    </main>
  );
}
