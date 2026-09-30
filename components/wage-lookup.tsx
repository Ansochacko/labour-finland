"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { engine, getDataset, pageSlug, type Occupation } from "@/lib/dataset";
import type { ResolveResult, WageRecord } from "@/lib/wage-engine";
import { classificationLabel, formatEuro } from "@/lib/format";

export function WageLookup({ initialQuery = "" }: { initialQuery?: string }) {
  const dataset = useMemo(() => getDataset(), []);
  const [query, setQuery] = useState(initialQuery);
  const [occupation, setOccupation] = useState<Occupation | null>(() => {
    if (!initialQuery) return null;
    const found = (dataset.occupations as Occupation[]).find(
      (o) => o.name.toLowerCase() === initialQuery.toLowerCase() || o.id === initialQuery
    );
    return found || null;
  });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<Record<string, string>[]>([]);

  const suggestions = query.trim()
    ? (engine.searchOccupations(dataset.occupations, query, 6) as Occupation[])
    : [];
  const result: ResolveResult | null = occupation
    ? engine.resolveWage(dataset, occupation, answers)
    : null;

  function choose(next: Occupation) {
    setOccupation(next);
    setQuery(next.name);
    setAnswers({});
    setHistory([]);
  }

  function reset() {
    setOccupation(null);
    setQuery("");
    setAnswers({});
    setHistory([]);
  }

  return (
    <div className="rounded-2xl border border-line bg-cream p-5 sm:p-7 shadow-card transition-all duration-200">
      {/* Search Input Bar */}
      <form
        className="relative flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          const matches = engine.findOccupations(dataset.occupations, query) as Occupation[];
          if (matches.length === 1) {
            choose(matches[0]);
          } else if (suggestions.length > 0) {
            choose(suggestions[0]);
          }
        }}
      >
        <label className="sr-only" htmlFor="occupation-search">
          Search occupation or job title
        </label>
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <input
            id="occupation-search"
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOccupation(null);
            }}
            className="w-full rounded-xl border border-line bg-paper pl-11 pr-10 py-3.5 text-sm text-ink placeholder:text-muted/70 focus:bg-cream focus:border-accent transition-colors shadow-sm"
            placeholder="Search job title (e.g. Cleaner, Waiter, Nurse, Salesperson)..."
            autoComplete="off"
            spellCheck="false"
          />
          {query ? (
            <button
              type="button"
              onClick={reset}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted hover:text-ink"
              aria-label="Clear search input"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : null}
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-cream shadow-sm hover:bg-accent-hover active:scale-[0.98] transition-all"
          type="submit"
        >
          <span>Find wage rate</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </form>

      {/* Autocomplete Dropdown List */}
      {suggestions.length > 0 && !occupation ? (
        <div className="mt-3 overflow-hidden rounded-xl border border-line bg-cream shadow-dropdown animate-in fade-in-50 duration-150">
          <p className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-muted bg-paper-subtle border-b border-line">
            Suggested Occupations
          </p>
          <ul className="divide-y divide-line">
            {suggestions.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-paper-subtle transition-colors group"
                  onClick={() => choose(item)}
                >
                  <span className="font-medium text-ink group-hover:text-accent">
                    {item.name}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="capitalize">{item.sector.replace(/-/g, " ")}</span>
                    <svg className="h-3.5 w-3.5 text-muted group-hover:translate-x-0.5 group-hover:text-accent transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* QUESTION FLOW FOR CLASSIFICATION */}
      {result?.status === "NEEDS_QUESTION" && result.question ? (
        <div className="mt-6 rounded-xl border border-accent-border/70 bg-accent-soft/30 p-5 sm:p-6 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent-dark">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              Classification Step {history.length + 1}
            </span>
            {history.length > 0 && (
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-ink transition-colors"
                onClick={() => {
                  const prev = history[history.length - 1];
                  setHistory(history.slice(0, -1));
                  setAnswers(prev);
                }}
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span>Previous step</span>
              </button>
            )}
          </div>

          {result.question.lead ? (
            <p className="mt-2 text-xs font-medium text-muted">{result.question.lead}</p>
          ) : null}

          <h3 className="mt-1 font-serif text-xl sm:text-2xl text-ink font-semibold">
            {result.question.prompt}
          </h3>

          {result.question.why ? (
            <p className="mt-2 text-xs text-muted leading-relaxed max-w-2xl">{result.question.why}</p>
          ) : null}

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {result.question.options.map((option) => (
              <button
                key={option.value}
                type="button"
                className="group flex flex-col justify-between rounded-xl border border-line bg-cream p-4 text-left transition-all hover:border-accent hover:shadow-sm active:scale-[0.99]"
                onClick={() => {
                  setHistory((prev) => [...prev, answers]);
                  const full = (dataset.questions as { id: string; answer_key: string }[]).find(
                    (item) => item.id === result.question!.id
                  );
                  const key = full?.answer_key || "pay_group";
                  if (option.action === "SHOW_TABLE" || option.value === "__table__") {
                    setAnswers({ ...answers, [key]: "__table__" });
                    return;
                  }
                  setAnswers({ ...answers, [key]: option.value });
                }}
              >
                <span className="font-medium text-sm text-ink group-hover:text-accent">
                  {option.label}
                </span>
                <span className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Select</span>
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* RESOLVED RESULT CARD (THE VISUAL CENTERPIECE OF TRUST) */}
      {result?.status === "RESOLVED" && result.record ? (
        <ResolvedProvenanceCard
          record={result.record}
          occupation={occupation}
          dataset={dataset}
          onReset={reset}
        />
      ) : null}

      {/* FULL SCALE / MULTIPLE MATCHES TABLE */}
      {result?.status === "SHOW_TABLE" && result.records ? (
        <div className="mt-6 rounded-xl border border-line bg-cream p-5">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-line pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Complete Scale View
              </span>
              <h3 className="font-serif text-xl font-semibold text-ink">
                {occupation?.name} Wage Scale
              </h3>
            </div>
            {history.length > 0 && (
              <button
                type="button"
                className="text-xs text-accent font-medium hover:underline"
                onClick={() => {
                  const prev = history[history.length - 1];
                  setHistory(history.slice(0, -1));
                  setAnswers(prev);
                }}
              >
                ← Back to question
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-muted">
            More than one sourced row matches, or you chose to view the full scale. Labour Finland does not guess your exact grade.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[30rem] text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-line text-[11px] font-semibold uppercase tracking-wider text-muted bg-paper/50">
                  <th scope="col" className="py-2.5 px-3">Classification</th>
                  <th scope="col" className="py-2.5 px-3">Hourly Pay</th>
                  <th scope="col" className="py-2.5 px-3">Monthly Scale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {result.records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-paper/40 transition-colors">
                    <td className="py-3 px-3 font-medium text-ink">
                      {classificationLabel(rec.classification)}
                    </td>
                    <td className="py-3 px-3 font-semibold text-accent-dark tabular-nums">
                      {engine.formatWage(rec.wage)}
                    </td>
                    <td className="py-3 px-3 text-muted tabular-nums">
                      {engine.formatMonthlyAmount(rec.wage) ? `${engine.formatMonthlyAmount(rec.wage)}/mo` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {occupation && (
            <div className="mt-4 pt-3 border-t border-line text-right">
              <Link
                href={`/wages/${pageSlug(occupation)}`}
                className="text-xs font-semibold text-accent hover:text-accent-dark underline inline-flex items-center gap-1"
              >
                <span>Open complete {occupation.name} guide & details</span>
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      ) : null}

      {/* NO RESULT / PREPARING STATE */}
      {result?.status === "NO_RESULT" ? (
        <div className="mt-6 rounded-xl border border-dashed border-warn-border bg-warn-bg/50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-warn-border text-warn">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </span>
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-warn">
                Data not yet verified
              </p>
              <h3 className="mt-1 font-serif text-xl font-semibold text-ink">
                {result.preparing?.title || `${occupation?.name || query} Wage Information`}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-ink-light leading-relaxed">
                {result.preparing?.body ||
                  "Labour Finland publishes wage figures only after verifying the source and active collective agreement. No guessed number is ever shown."}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                {result.preparing?.source_url ? (
                  <a
                    href={result.preparing.source_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 font-semibold text-accent underline"
                  >
                    <span>Check {result.preparing.source_name || "Official Union Source"}</span>
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                ) : null}
                <Link href="/methodology" className="text-muted underline">
                  How we verify data →
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* =========================================================================
   PROVENANCE DOCUMENT COMPONENT — THE VISUAL CENTERPIECE OF TRUST
   ========================================================================= */
function ResolvedProvenanceCard({
  record,
  occupation,
  dataset,
  onReset,
}: {
  record: WageRecord;
  occupation: Occupation | null;
  dataset: ReturnType<typeof getDataset>;
  onReset: () => void;
}) {
  const supplements = engine.getApplicableSupplements(dataset, record);
  const agreement = engine.getAgreement(dataset, record.agreement_id);
  const hourlyRate = record.wage.amount;

  return (
    <article className="mt-6 overflow-hidden rounded-xl border border-line bg-cream shadow-card transition-all relative">
      {/* Signature 3px Top Accent Bar */}
      <div className="h-1 bg-verified w-full" aria-hidden="true" />

      {/* Verified Header Seal */}
      <div className="border-b border-line bg-paper-subtle px-5 py-3 sm:px-6 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-verified text-cream shadow-badge">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-verified-text">
            Official TES Classification Record
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
          <span>Verified: {record.last_verified}</span>
        </div>
      </div>

      {/* Main Wage Display Area */}
      <div className="p-5 sm:p-7 space-y-6">
        {/* Title and Classification Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-line pb-4">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
              {occupation?.sector?.replace(/-/g, " ") || "Occupation"}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
              {occupation?.name}
            </h3>
          </div>
          <div>
            <span className="inline-flex items-center rounded-md bg-paper px-3 py-1 text-xs font-semibold text-ink-light border border-line font-mono">
              {classificationLabel(record.classification)}
            </span>
          </div>
        </div>

        {/* Primary Figures Grid */}
        <div className="grid gap-4 sm:grid-cols-2 rounded-lg bg-paper-subtle p-5 border border-line">
          <div>
            <span className="font-mono text-[11px] uppercase font-bold tracking-wider text-muted">
              Official TES Minimum Hourly
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-accent-dark tabular-nums">
                {engine.formatWage(record.wage)}
              </span>
              <span className="text-xs text-muted font-medium">gross / hour</span>
            </div>
          </div>

          {engine.formatMonthlyAmount(record.wage) && (
            <div>
              <span className="font-mono text-[11px] uppercase font-bold tracking-wider text-muted">
                Monthly Scale Benchmark
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-ink tabular-nums">
                  {engine.formatMonthlyAmount(record.wage)}
                </span>
                <span className="text-xs text-muted font-medium">gross / month</span>
              </div>
            </div>
          )}
        </div>

        {/* Legal & Agreement Explanation */}
        <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-ink-light">
          <p className="font-medium text-ink">
            {engine.wageTypeExplanation(record.wage.type)}
          </p>
          <p className="text-muted">{record.notes}</p>
        </div>

        {/* Document Provenance Information Matrix */}
        <div className="rounded-lg border border-line bg-paper/60 p-4">
          <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted mb-3">
            Source &amp; Legal Provenance
          </h4>
          <dl className="grid gap-3 text-xs sm:grid-cols-2">
            <div>
              <dt className="text-muted font-medium">Collective Agreement (TES):</dt>
              <dd className="font-semibold text-ink mt-0.5">{agreement?.name || "Applicable sector TES"}</dd>
            </div>
            <div>
              <dt className="text-muted font-medium">Primary Source Documentation:</dt>
              <dd className="mt-0.5">
                <a
                  href={record.source_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-accent underline inline-flex items-center gap-1 hover:text-accent-dark"
                >
                  <span>{record.source_name}</span>
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted font-medium">Effective Validity Window:</dt>
              <dd className="font-mono text-ink mt-0.5">
                {record.effective_from} → {record.effective_until || "Until renewed"}
              </dd>
            </div>
            <div>
              <dt className="text-muted font-medium">Verification Status:</dt>
              <dd className="inline-flex items-center gap-1.5 text-verified font-semibold mt-0.5">
                <span className="h-2 w-2 rounded-full bg-verified"></span>
                <span>Active &amp; Sourced</span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Applicable Supplements */}
        {supplements.length > 0 && (
          <div className="rounded-lg border border-line bg-cream p-4">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink mb-2">
              Statutory &amp; Collective Supplements (Lisät)
            </h4>
            <ul className="space-y-2 text-xs">
              {supplements.map((item) => (
                <li key={item.id} className="flex items-start gap-2 text-muted">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0"></span>
                  <div>
                    <strong className="text-ink font-semibold">{item.name}: </strong>
                    <span className="text-accent-dark font-mono font-medium">
                      {item.amount != null
                        ? `${formatEuro(item.amount)}${item.unit === "EUR_HOUR" ? " / hour" : ""}`
                        : item.calculation_rule}
                    </span>
                    {item.conditions ? <span className="text-muted"> ({item.conditions})</span> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions & Links */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <div className="flex items-center gap-4 flex-wrap">
            {occupation && (
              <Link
                href={`/wages/${pageSlug(occupation)}`}
                className="text-xs font-semibold text-accent underline hover:text-accent-dark inline-flex items-center gap-1"
              >
                <span>Full {occupation.name} guide &amp; statistics</span>
                <span>→</span>
              </Link>
            )}
            <Link
              href={`/calculator?hourly_wage=${hourlyRate}`}
              className="text-xs font-medium text-muted hover:text-ink underline"
            >
              Project in gross calculator
            </Link>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-muted hover:text-ink underline"
          >
            Check another job
          </button>
        </div>
      </div>
    </article>
  );
}
