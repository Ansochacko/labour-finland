"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { label: "Wages", href: "/wages", tag: "TES 2026" },
  { label: "Jobs in Finland", href: "/jobs" },
  { label: "Students in Finland", href: "/students" },
  { label: "Working in Finland", href: "/working-in-finland" },
  { label: "Calculator", href: "/calculator" },
  { label: "Methodology", href: "/methodology" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-md shadow-sm transition-shadow">
      {/* Top micro-ribbon */}
      <div className="bg-surface-container-low px-4 sm:px-6 lg:px-12 border-b border-line/60">
        <div className="max-w-6xl mx-auto h-8 flex items-center justify-between text-[11px] text-on-surface-variant font-medium">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-container shrink-0"></span>
            <span className="truncate">Independent public-interest service • Sourced from Finnish collective agreements &amp; Migri</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 shrink-0 font-mono text-[10px]">
            <span>Last audit: September 2026</span>
          </div>
        </div>
      </div>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-primary-container focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-cream focus:shadow-lift"
      >
        Skip to main content
      </a>

      {/* Main Masthead */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-12">
        {/* Brand Lockup */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-on-surface no-underline"
          aria-label="Labour Finland Homepage"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-cream shadow-sm transition-transform group-hover:scale-105">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-tight text-primary leading-tight">
              LABOUR FINLAND
            </span>
            <span className="text-[9px] uppercase tracking-widest font-mono font-semibold text-on-surface-variant">
              Independent Information Service
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Primary Navigation">
          {links.map(({ label, href, tag }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors no-underline inline-flex items-center gap-1.5 ${
                  isActive
                    ? "bg-surface-container-high text-primary font-bold shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                }`}
              >
                <span>{label}</span>
                {tag && (
                  <span className="px-1.5 py-0.2 font-mono text-[9px] font-bold rounded bg-surface-container-highest text-primary-container">
                    {tag}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/wages"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-container px-4 py-2 text-xs font-semibold tracking-wide text-cream shadow-sm hover:bg-primary-dark transition-all no-underline hover:shadow active:scale-[0.98]"
          >
            <span>Check your wage</span>
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-line bg-surface-container p-2 text-on-surface transition-colors hover:bg-surface-container-high xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="border-b border-line bg-surface px-4 pb-6 pt-2 shadow-lg xl:hidden animate-in slide-in-from-top-2 duration-150"
        >
          <div className="flex flex-col gap-1.5">
            {links.map(({ label, href, tag }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors no-underline flex items-center justify-between ${
                    isActive
                      ? "bg-surface-container text-primary font-bold"
                      : "text-on-surface hover:bg-surface-container-low"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span>{label}</span>
                  {tag && (
                    <span className="px-1.5 py-0.5 font-mono text-[10px] font-bold rounded bg-surface-container-highest text-primary-container">
                      {tag}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-line">
              <Link
                href="/wages"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary-container px-4 py-3 text-sm font-semibold text-cream shadow-sm hover:bg-primary-dark transition-colors no-underline"
                onClick={() => setOpen(false)}
              >
                <span>Check your wage</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
