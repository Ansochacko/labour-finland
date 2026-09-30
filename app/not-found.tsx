import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-24 sm:py-32 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-subtle text-accent mb-6 border border-line">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-warn">
        Error 404
      </span>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold text-ink">
        Page not found
      </h1>
      <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed max-w-md mx-auto">
        The requested page or wage record could not be found. It may have moved or been updated under a revised collective agreement path.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-accent px-6 py-2.5 text-xs font-semibold text-cream hover:bg-accent-hover transition-colors no-underline shadow-sm"
        >
          Return to homepage
        </Link>
        <Link
          href="/wages"
          className="rounded-full border border-line bg-cream px-6 py-2.5 text-xs font-semibold text-ink hover:border-accent hover:text-accent transition-colors no-underline shadow-sm"
        >
          Browse wage directory
        </Link>
      </div>
    </main>
  );
}
