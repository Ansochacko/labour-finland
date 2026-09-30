import Link from "next/link";
import type { WageRecord } from "@/lib/wage-engine";
import { engine } from "@/lib/dataset";
import { classificationLabel } from "@/lib/format";

export function WageTable({ records }: { records: WageRecord[] }) {
  if (!records.length) return null;
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-cream shadow-card">
      <div className="border-b border-line bg-paper-subtle px-5 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-verified-bg text-verified border border-verified-border">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-verified-text">
            Verified TES Wage Scale
          </span>
        </div>
        <span className="text-xs font-medium text-muted">
          {records.length} pay {records.length === 1 ? "level" : "levels"} published
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm border-collapse">
          <caption className="sr-only">Verified collective-agreement wage scale</caption>
          <thead>
            <tr className="border-b border-line text-[11px] font-semibold uppercase tracking-wider text-muted bg-paper/40">
              <th scope="col" className="px-5 py-3">Classification & Grade</th>
              <th scope="col" className="px-5 py-3">Hourly Rate</th>
              <th scope="col" className="px-5 py-3">Monthly Scale</th>
              <th scope="col" className="px-5 py-3">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-paper-subtle/50 transition-colors">
                <td className="px-5 py-3.5 font-medium text-ink">
                  {classificationLabel(record.classification)}
                  {record.classification?.points && (
                    <span className="ml-2 text-xs text-muted font-normal">
                      ({record.classification.points} pts)
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 font-semibold text-accent-dark tabular-nums text-base">
                  {engine.formatWage(record.wage)}
                </td>
                <td className="px-5 py-3.5 text-muted tabular-nums">
                  {engine.formatMonthlyAmount(record.wage) ? `${engine.formatMonthlyAmount(record.wage)}/mo` : "—"}
                </td>
                <td className="px-5 py-3.5">
                  <span className="inline-flex items-center rounded-md bg-paper px-2 py-0.5 text-xs font-medium text-muted border border-line">
                    {engine.wageTypeLabel(record.wage.type)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function EmptyVerifiedState({
  title,
  body,
  sourceName,
  sourceUrl,
}: {
  title: string;
  body: string;
  sourceName?: string;
  sourceUrl?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-warn-border bg-warn-bg/40 p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warn-border text-warn">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </span>
        <div className="flex-1 space-y-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-warn">
              Data not yet verified
            </span>
            <h2 className="mt-1 font-serif text-xl sm:text-2xl text-ink font-semibold">
              {title}
            </h2>
          </div>
          <p className="text-sm text-ink-light leading-relaxed">
            {body}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium">
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-lg bg-cream px-3.5 py-2 text-ink border border-line hover:border-accent hover:text-accent shadow-sm transition-colors no-underline"
              >
                <span>Check {sourceName || "Primary Union / Authority"}</span>
                <svg className="h-3.5 w-3.5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            )}
            <Link
              href="/methodology"
              className="text-accent underline underline-offset-4 hover:text-accent-dark transition-colors"
            >
              Why we don't invent unverified wages →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
