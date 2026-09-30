import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-line bg-surface-container-low text-on-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          {/* Brand and Provenance Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-cream shadow-sm">
                <svg
                  className="h-3.5 w-3.5"
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
              <span className="font-serif text-lg font-bold tracking-tight text-primary">
                Labour Finland
              </span>
            </div>
            <p className="text-sm text-on-surface font-medium leading-relaxed max-w-sm">
              {SITE.tagline} Sourced guidance for workers, job seekers, and international students.
            </p>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm">
              {SITE.independence}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-container-lowest px-3 py-1 text-[11px] font-medium text-on-surface-variant">
                <span className="h-1.5 w-1.5 rounded-full bg-tertiary"></span>
                TES Collective Agreements • Migri • Statistics Finland
              </span>
            </div>
          </div>

          {/* Nav groups */}
          <div className="grid gap-8 grid-cols-2 sm:grid-cols-4">
            <FooterGroup
              title="Wages"
              links={[
                ["Wage Directory", "/wages"],
                ["Cleaner Salary", "/wages/cleaner-salary-finland"],
                ["Restaurant Worker", "/wages/restaurant-worker-salary-finland"],
                ["Retail Salesperson", "/wages/retail-salesperson-salary-finland"],
                ["Practical Nurse", "/wages/practical-nurse-salary-finland"],
                ["Software Developer", "/wages/software-developer-salary-finland"],
              ]}
            />
            <FooterGroup
              title="Jobs in Finland"
              links={[
                ["Jobs Hub", "/jobs"],
                ["How to Find a Job", "/jobs/how-to-find-a-job-in-finland"],
                ["Finnish CV Template", "/jobs/finnish-cv-template"],
                ["Work Permits (TTOL)", "/jobs/work-permits-finland"],
                ["Job Offers & Contracts", "/jobs/understanding-job-offers-finland"],
              ]}
            />
            <FooterGroup
              title="Students"
              links={[
                ["Students Hub", "/students"],
                ["30h Work Limit", "/students/part-time-work-rules"],
                ["Student Jobs", "/students/student-jobs-finland"],
                ["Cost of Living", "/students/cost-of-living-students"],
                ["Study Permits", "/students/student-residence-permits"],
              ]}
            />
            <FooterGroup
              title="Working Rights & Tools"
              links={[
                ["Working in Finland", "/working-in-finland"],
                ["Minimum Wage Rules", "/working-in-finland/minimum-wage-finland"],
                ["TES Explained", "/working-in-finland/tes-finland"],
                ["Salary Calculator", "/calculator"],
                ["Methodology", "/methodology"],
                ["About & Disclaimer", "/about"],
              ]}
            />
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="mt-12 rounded-xl border border-line bg-surface-container-lowest/80 p-4 text-xs leading-relaxed text-on-surface-variant">
          <strong className="text-on-surface font-semibold">Important note: </strong>
          {SITE.disclaimer}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line pt-6 text-xs text-on-surface-variant">
          <p>© {year} Labour Finland. Independent public-interest service.</p>
          <div className="flex items-center gap-4">
            <Link href="/methodology" className="hover:text-primary-container transition-colors no-underline">
              Methodology
            </Link>
            <span className="text-outline">•</span>
            <Link href="/privacy" className="hover:text-primary-container transition-colors no-underline">
              Privacy
            </Link>
            <span className="text-outline">•</span>
            <Link href="/disclaimer" className="hover:text-primary-container transition-colors no-underline">
              Disclaimer
            </Link>
            <span className="text-outline">•</span>
            <Link href="/contact" className="hover:text-primary-container transition-colors no-underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="font-serif text-sm font-semibold tracking-wide text-on-surface">{title}</h3>
      <ul className="mt-3.5 space-y-2 text-xs">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              href={href}
              className="text-on-surface-variant hover:text-primary-container transition-colors no-underline block py-0.5"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
