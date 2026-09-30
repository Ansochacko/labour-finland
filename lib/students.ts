export type StudentGuide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  h1: string;
  summary: string;
  category: string;
  badge: string;
  sections: { heading: string; body: string; sourceName?: string; sourceUrl?: string; keyItems?: string[] }[];
  related: { href: string; label: string }[];
};

export const studentGuides: StudentGuide[] = [
  {
    slug: "part-time-work-rules",
    title: "Working Hours Limits for Students (30h/wk)",
    metaTitle: "Student Work Hours Finland 2026 — 30h Limit & Aliens Act Rules",
    description:
      "Official rules on student working hours in Finland: 30 hours/week average during term time (Aliens Act § 77), unlimited holiday work, and tax cards.",
    h1: "International Student Working Hours in Finland: Sourced Guide",
    summary:
      "Following legislation in force since June 2022, international students holding a Finnish residence permit for studies are legally entitled to work up to an average of 30 hours per week during term time, and unlimited hours during official holidays.",
    category: "Legal & Working Hours",
    badge: "01 / Statutory Limit",
    sections: [
      {
        heading: "The 30-Hour Average Rule Explained (Aliens Act § 77)",
        body: "Under Section 77 of the Finnish Aliens Act (Ulkomaalaislaki 301/2004), a student residence permit grants unrestricted right to engage in gainful employment if the average working hours do not exceed 30 hours per week across the calendar year.",
        sourceName: "Finnish Immigration Service (Migri) — Working During Studies",
        sourceUrl: "https://migri.fi/en/working-during-studies",
        keyItems: [
          "Term-time average: Calculated over the academic year, allowing flexible week-to-week variations as long as the 30h average is maintained.",
          "Summer & Winter Recess: During official school holiday periods when no teaching takes place, students may work full-time (up to 40h/week or more) without restriction.",
          "Internships & Practical Training: Mandatory degree practical training (harjoittelu) and thesis work are exempt from the 30-hour limitation.",
        ],
      },
      {
        heading: "Collective Agreement Protection for Student Workers",
        body: "Student employees in Finland enjoy identical legal rights, minimum wage floors, and working condition protections as full-time Finnish employees. Employers are legally prohibited from paying below the applicable collective agreement (TES) rate simply because a worker is a student or foreign national.",
        sourceName: "Occupational Safety and Health Administration (Työsuojelu)",
        sourceUrl: "https://www.tyosuojelu.fi/web/en/employment-relationship/pay",
      },
      {
        heading: "Tax Cards and Verokortti for Students",
        body: "All student income in Finland is subject to Finnish taxation. Before receiving your first paycheck, you must obtain a tax card (verokortti) from the Finnish Tax Administration (Verohallinto). If your estimated annual income is low, your withholding tax percentage may be 0% or very low.",
        sourceName: "Verohallinto — Student Taxation Guide",
        sourceUrl: "https://www.vero.fi/en/individuals/tax-cards-and-tax-returns/arriving_in_finland/students/",
      },
    ],
    related: [
      { href: "/students/student-jobs-finland", label: "Popular Student Jobs & Pay Scales" },
      { href: "/students/student-residence-permits", label: "Student Residence Permit Requirements" },
      { href: "/working-in-finland/verokortti-explained", label: "How to Order Your Tax Card" },
      { href: "/calculator", label: "Calculate Student Part-Time Earnings" },
    ],
  },
  {
    slug: "student-jobs-finland",
    title: "Best Jobs for International Students",
    metaTitle: "Jobs for International Students in Finland 2026 — Verified Pay",
    description:
      "Popular part-time jobs for international students in Finland: cleaning, restaurant service, food delivery, logistics, verified hourly TES wages, and no-Finnish roles.",
    h1: "Best Part-Time Jobs for International Students in Finland",
    summary:
      "Many international students in Finland work part-time in sectors where English is widely accepted or language requirements are minimal. Explore common sectors, verified pay baselines, and practical entry routes.",
    category: "Employment",
    badge: "02 / Student Jobs",
    sections: [
      {
        heading: "Cleaning & Facility Services (Property Services TES)",
        body: "Cleaning is one of the most accessible entry routes for international students. Office cleaning, maintenance, and hotel housekeeping are covered by the Property Services Collective Agreement (Kiinteistöpalvelualan TES).",
        sourceName: "PAM — Property Services Collective Agreement",
        sourceUrl: "https://www.pam.fi/tes/kiinteistopalvelualan-tyoehtosopimus/",
        keyItems: [
          "Verified Base Hourly Pay: Starts at €11.33 (Trainee) to €12.59+ (Grade 2).",
          "Evening & Night Additions: €0.73/h evening supplement and €1.36/h night supplement.",
          "Language Requirements: Basic English is sufficient for most commercial cleaning roles.",
        ],
      },
      {
        heading: "Hospitality & Restaurant Service (PAM MaRa TES)",
        body: "Dishwashing (tiskari), kitchen assistance (keittiöapulainen), and waiting staff (tarjoilija) in international restaurants and cafes provide flexible evening and weekend shifts.",
        keyItems: [
          "Verified Base Hourly Pay: €11.64 (Grade 1) to €12.70+ (Grade 2).",
          "Shift Supplements: €1.40/h evening supplement and €2.37/h night supplement.",
          "Sunday Pay: +100% statutory pay supplement for all Sunday shifts.",
          "Certification: A Hygiene Passport (Hygieniapassi) is required after 3 months of handling unpackaged food.",
        ],
      },
      {
        heading: "Warehousing, Logistics & Courier Delivery",
        body: "E-commerce fulfillment centers, parcel sorting hubs (Posti, logistics terminals), and bicycle/car courier delivery (Wolt, Foodora) offer flexible schedules that fit around university lectures.",
      },
    ],
    related: [
      { href: "/wages/cleaner-salary-finland", label: "Cleaner Salary & Grade Breakdown" },
      { href: "/wages/restaurant-worker-salary-finland", label: "Restaurant Worker Pay Scale" },
      { href: "/students/part-time-work-rules", label: "30h Weekly Working Limit" },
      { href: "/calculator", label: "Gross Pay Calculator" },
    ],
  },
  {
    slug: "cost-of-living-students",
    title: "Cost of Living for Students in Finland",
    metaTitle: "Cost of Living in Finland for Students 2026 — Real Budget Guide",
    description:
      "Realistic monthly student budgets in Finland: student housing (HOAS/TOAS/TYS €300–€550), €2.95 Kela-subsidized university lunches, transit, and groceries.",
    h1: "Cost of Living for International Students in Finland (2026 Budget)",
    summary:
      "Finland offers substantial institutional student benefits—including government-subsidized student housing, €2.95 university cafeteria lunches, and 50% public transit discounts—making monthly living costs predictable.",
    category: "Finance & Living",
    badge: "03 / Monthly Budget",
    sections: [
      {
        heading: "Estimated Monthly Student Budget Breakdown",
        body: "An international student in Finland typically requires between €700 and €1,000 per month, depending on the university city and housing arrangement.",
        keyItems: [
          "Student Housing (HOAS, TOAS, TYS, PSOAS): €280 – €550 / month (includes water, electricity, heating, and internet).",
          "Groceries & Food: €200 – €300 / month (leveraging €2.95 student cafeteria meals).",
          "Public Transportation: €35 – €55 / month (50% student discount on local transit and VR trains).",
          "Student Union & YTHS Healthcare Fee: ~€36.80 per term for comprehensive student healthcare.",
          "Mobile Plan & Miscellaneous: €30 – €60 / month (unlimited 5G data is standard in Finland).",
        ],
      },
      {
        heading: "Subsidized Student Meals (Kela Meal Subsidy)",
        body: "Under the Finnish social security system (Kela), all degree students enrolled in Finnish higher education institutions (Universities and UAS) are entitled to heavily subsidized warm lunches (typically €2.95 per meal) at accredited student cafeterias across all campuses.",
        sourceName: "Kela — Meal Subsidy for Higher Education Students",
        sourceUrl: "https://www.kela.fi/meal-subsidy",
      },
      {
        heading: "Cost Differences: Helsinki Region vs Other University Cities",
        body: "Living in the Helsinki Metropolitan Area (Helsinki, Espoo, Vantaa) carries higher rent and transit costs compared to major university cities like Tampere, Turku, Oulu, Jyväskylä, Kuopio, and Vaasa.",
      },
    ],
    related: [
      { href: "/students/part-time-work-rules", label: "Student Working Hours (30h/wk)" },
      { href: "/students/student-jobs-finland", label: "Student Part-Time Jobs" },
      { href: "/calculator", label: "Calculate Part-Time Pay vs Living Costs" },
    ],
  },
  {
    slug: "student-residence-permits",
    title: "Student Residence Permits & Post-Graduation",
    metaTitle: "Student Residence Permit Finland 2026 — Migri Rules & Work",
    description:
      "Migri student residence permit requirements: €560/month income proof, private health insurance, and the 2-year post-graduation job-seeker residence permit.",
    h1: "Student Residence Permits and Post-Graduation Work in Finland",
    summary:
      "Non-EU/EEA degree students must secure a residence permit for studies from the Finnish Immigration Service (Migri) prior to arrival. Permits are issued for the entire duration of degree studies.",
    category: "Immigration & Legal",
    badge: "04 / Migri Permits",
    sections: [
      {
        heading: "Migri Financial Requirement for Student Permits",
        body: "To receive a student residence permit, applicants must demonstrate sufficient financial funds to cover living expenses in Finland. The statutory requirement set by Migri is currently €560 per month, which equals €6,720 per year.",
        sourceName: "Finnish Immigration Service (Migri) — Residence Permit for Studies",
        sourceUrl: "https://migri.fi/en/residence-permit-for-studies",
        keyItems: [
          "Financial proof: Bank account statement under the student's name showing at least €6,720 per year.",
          "Health Insurance: Non-EU students must maintain private health insurance covering medical expenses up to €120,000 (if studies are under 2 years) or €40,000 (if studies are 2+ years).",
          "Validity: Permits for degree studies are granted for the full expected duration of the academic degree program.",
        ],
      },
      {
        heading: "Transition to Post-Graduation Job-Seeker Permit",
        body: "Upon completing an academic degree in Finland, international graduates can apply for an extended residence permit to look for work or start a business. This permit is granted for up to two years and can be taken in multiple parts.",
        sourceName: "Migri — Residence Permit After Graduation",
        sourceUrl: "https://migri.fi/en/extended-permit-to-look-for-work",
      },
    ],
    related: [
      { href: "/jobs/work-permits-finland", label: "Full Work Permits (TTOL) Guide" },
      { href: "/students/part-time-work-rules", label: "Working Hours Rules for Students" },
      { href: "/jobs/how-to-find-a-job-in-finland", label: "Finding Work in Finland" },
    ],
  },
];

export function getStudentGuide(slug: string) {
  return studentGuides.find((guide) => guide.slug === slug) || null;
}
