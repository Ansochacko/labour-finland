"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatEuro } from "@/lib/format";

function calculate(hourly: number, hours: number) {
  const weekly = hourly * hours;
  const annual = weekly * 52;
  const monthly = annual / 12;
  return { weekly, monthly, annual };
}

const COMMON_RATES = [
  { label: "€11.33 (Trainee)", value: "11.33" },
  { label: "€12.59 (Cleaner Grade 2)", value: "12.59" },
  { label: "€13.22 (Grade 3)", value: "13.22" },
  { label: "€14.05 (Scale 4)", value: "14.05" },
];

const COMMON_HOURS = [
  { label: "37.5 h (Full-time)", value: "37.5" },
  { label: "38.25 h (Standard)", value: "38.25" },
  { label: "40.0 h (Standard)", value: "40" },
  { label: "20.0 h (Part-time)", value: "20" },
];

export function CalculatorForm({ presetHourly }: { presetHourly?: number }) {
  const [hourly, setHourly] = useState(presetHourly ? String(presetHourly) : "12.59");
  const [hours, setHours] = useState("37.5");

  const parsedHourly = Number(hourly);
  const parsedHours = Number(hours);
  const valid = parsedHourly > 0 && parsedHours > 0 && parsedHours <= 168;
  const result = useMemo(
    () => (valid ? calculate(parsedHourly, parsedHours) : null),
    [parsedHourly, parsedHours, valid]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2 items-start">
      {/* Input Parameters Panel */}
      <form
        className="rounded-xl border border-line bg-cream p-6 sm:p-7 shadow-card space-y-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="border-b border-line pb-4">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
            Step 1 · Working Pattern
          </span>
          <h2 className="font-serif text-2xl font-semibold text-ink mt-1">
            Input hourly pay &amp; hours
          </h2>
        </div>

        {/* Hourly Pay Field */}
        <div>
          <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-ink" htmlFor="hourly-wage">
            Gross Hourly Wage (€ / hour)
          </label>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted font-mono font-medium">
              €
            </span>
            <input
              id="hourly-wage"
              className="w-full rounded-md border border-line bg-paper pl-9 pr-4 py-2.5 text-base font-semibold text-ink font-mono focus:bg-cream focus:border-accent transition-colors shadow-sm"
              type="number"
              min="0.01"
              step="0.01"
              value={hourly}
              onChange={(event) => setHourly(event.target.value)}
              placeholder="e.g. 12.59"
              required
            />
          </div>

          {/* Quick Hourly Chips */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {COMMON_RATES.map((chip) => (
              <button
                key={chip.value}
                type="button"
                className={`rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors border ${
                  hourly === chip.value
                    ? "bg-accent text-cream border-accent font-semibold"
                    : "bg-paper text-muted border-line hover:border-accent hover:text-ink"
                }`}
                onClick={() => setHourly(chip.value)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Hours Field */}
        <div>
          <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-ink" htmlFor="hours-week">
            Working Hours per Week
          </label>
          <div className="relative mt-2">
            <input
              id="hours-week"
              className="w-full rounded-md border border-line bg-paper px-4 py-2.5 text-base font-semibold text-ink font-mono focus:bg-cream focus:border-accent transition-colors shadow-sm"
              type="number"
              min="0.25"
              max="168"
              step="0.25"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
              placeholder="e.g. 37.5"
              required
            />
          </div>

          {/* Quick Hours Chips */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {COMMON_HOURS.map((chip) => (
              <button
                key={chip.value}
                type="button"
                className={`rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors border ${
                  hours === chip.value
                    ? "bg-accent text-cream border-accent font-semibold"
                    : "bg-paper text-muted border-line hover:border-accent hover:text-ink"
                }`}
                onClick={() => setHours(chip.value)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted leading-relaxed">
          Gross pay represents pay before taxes, employee pension (TyEL), and unemployment insurance deductions.
        </p>
      </form>

      {/* Output Results Panel */}
      <section className="rounded-xl border border-line bg-cream p-6 sm:p-7 shadow-card space-y-6">
        <div className="border-b border-line pb-4 flex items-center justify-between">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-warn">
              Step 2 · Mathematical Estimate
            </span>
            <h2 className="font-serif text-2xl font-semibold text-ink mt-1">
              Estimated gross earnings
            </h2>
          </div>
          <span className="rounded-md bg-warn-bg px-2 py-0.5 font-mono text-[10px] font-bold text-warn border border-warn-border">
            Gross only
          </span>
        </div>

        {/* Big Highlight: Monthly Gross */}
        <div className="rounded-xl bg-paper-subtle p-5 border border-line">
          <span className="text-xs uppercase font-bold tracking-wider text-muted">
            Average Monthly Gross Pay
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-accent-dark tabular-nums">
              {result ? formatEuro(result.monthly) : "—"}
            </span>
            <span className="text-xs font-medium text-muted">/ month gross</span>
          </div>
          <p className="mt-1 text-[11px] text-muted">
            Calculated as annual gross ÷ 12 calendar months.
          </p>
        </div>

        {/* Detailed Breakdown */}
        <dl className="space-y-3 divide-y divide-line text-sm">
          <div className="flex justify-between pt-3">
            <dt className="text-muted font-medium">Weekly gross (at {hours || "0"} h/wk)</dt>
            <dd className="font-semibold text-ink tabular-nums">
              {result ? formatEuro(result.weekly) : "—"}
            </dd>
          </div>
          <div className="flex justify-between pt-3">
            <dt className="text-muted font-medium">Monthly gross (annual ÷ 12)</dt>
            <dd className="font-semibold text-ink tabular-nums">
              {result ? formatEuro(result.monthly) : "—"}
            </dd>
          </div>
          <div className="flex justify-between pt-3">
            <dt className="text-muted font-medium">Annual gross (weekly × 52 weeks)</dt>
            <dd className="font-semibold text-accent-dark tabular-nums">
              {result ? formatEuro(result.annual) : "—"}
            </dd>
          </div>
        </dl>

        {/* Essential Context & Caveats */}
        <div className="rounded-xl border border-line bg-paper/50 p-4 space-y-2 text-xs text-muted leading-relaxed">
          <p>
            <strong className="text-ink font-semibold">What is not included: </strong>
            This calculator is a mathematical gross projection. It does not calculate income tax withholding (verokortti), evening/night shift supplements, Sunday pay, holiday bonuses (lomaraha), or overtime pay.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link href="/working-in-finland/verokortti-explained" className="text-accent underline font-medium">
              How the Finnish tax card works →
            </Link>
            <Link href="/working-in-finland/how-to-read-finnish-payslip" className="text-accent underline font-medium">
              How to read your payslip →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
