export type JobGuide = {
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

export const jobGuides: JobGuide[] = [
  {
    slug: "how-to-find-a-job-in-finland",
    title: "How to Find a Job in Finland",
    metaTitle: "How to Find a Job in Finland 2026 — Portals & Hidden Market",
    description:
      "Comprehensive guide to finding employment in Finland: official job portals (Työmarkkinatori), aggregators, hidden job market (piilotyöpaikat), and English roles.",
    h1: "How to Find a Job in Finland: Sourced Guide for Job Seekers",
    summary:
      "Navigating the Finnish employment market requires a dual strategy: monitoring public recruitment registries and actively engaging with the extensive unadvertised hidden job market (piilotyöpaikat).",
    category: "Job Discovery",
    badge: "01 / Discovery",
    sections: [
      {
        heading: "Primary Official and Commercial Job Portals",
        body: "Public-sector and officially registered private sector openings in Finland are published on Työmarkkinatori (the state employment market platform operated by KEHA-keskus / TE-palvelut). Major commercial job aggregators index thousands of additional private-sector vacancies.",
        sourceName: "Työmarkkinatori — Official Finnish Employment Platform",
        sourceUrl: "https://tyomarkkinatori.fi/en",
        keyItems: [
          "Työmarkkinatori: Official government registry with CV publishing and open search filters.",
          "Duunitori & Oikotie Työpaikat: Largest commercial job portals across service, engineering, and office sectors.",
          "LinkedIn Jobs Finland: Standard platform for tech, management, startup, and specialist positions.",
          "Jobly & Barona: Direct employment and staffing agencies for logistics, hospitality, and customer service.",
        ],
      },
      {
        heading: "Tapping the Hidden Job Market (Piilotyöpaikat)",
        body: "Studies across Nordic labour markets estimate that up to 70–80% of open vacancies are never publicly advertised on job boards. Instead, positions are filled via direct outreach (avoin hakemus), professional networking, and internal talent pipelines.",
        keyItems: [
          "Targeted cold outreach: Research department heads on LinkedIn and submit targeted open applications.",
          "Finnish trade associations & industry directories: Browse company lists on Technology Industries of Finland (Teknologiateollisuus) and Finnish Commerce Federation.",
          "Recruitment fairs & networking events: Matchmaking events like Slush, Rekrytorit, and university career days.",
        ],
      },
      {
        heading: "Finding English-Speaking Jobs in Finland",
        body: "While knowledge of Finnish or Swedish is required in healthcare, customer service, and public administration, many industries operate extensively in English. Key English-language sectors include software development, game studios, university research, international sales, logistics, and cleaning services.",
        sourceName: "Work in Finland (Business Finland)",
        sourceUrl: "https://www.workinfinland.com/",
      },
    ],
    related: [
      { href: "/jobs/finnish-cv-template", label: "Finnish CV Template & Format" },
      { href: "/jobs/work-permits-finland", label: "Work Permits & TTOL Guide" },
      { href: "/wages", label: "Check Collective Agreement Wages" },
    ],
  },
  {
    slug: "finnish-cv-template",
    title: "Finnish CV Template & Format",
    metaTitle: "Finnish CV Format 2026 — Template & Recruitment Standards",
    description:
      "How to write a Finnish-style CV (ansioluettelo): length, structure, language proficiencies (CEFR), cover letter etiquette, and recruiter expectations in Finland.",
    h1: "Finnish CV Format and Application Guide (Ansioluettelo)",
    summary:
      "Finnish recruitment culture values modesty, factual precision, and transparent career timelines. A Finnish CV (ansioluettelo) is typically 1–2 pages, strictly factual, and structured around verified competencies.",
    category: "Application",
    badge: "02 / Preparation",
    sections: [
      {
        heading: "Core Structure of a Standard Finnish CV",
        body: "Finnish hiring managers prefer clear chronological layouts over decorative graphic resumes. The CV must highlight practical experience, education, language proficiencies, and software/technical competencies without hyperbolic claims.",
        keyItems: [
          "Contact Information: Full name, phone number, professional email, city of residence, LinkedIn URL. (Do not include Finnish personal identity code / henkilötunnus).",
          "Professional Summary (Profiili): 2–3 concise sentences summarizing your expertise and core target role.",
          "Work Experience (Työkokemus): Reverse chronological order. List job title, employer, dates, and bulleted achievements.",
          "Education (Koulutus): Degree, institution, graduation year, and relevant specializations.",
          "Language Skills (Kielitaito): Clearly state levels according to CEFR scale (A1–C2) or Native/Professional/Basic.",
          "IT & Technical Skills (IT-taidot): Tools, software, and operational certifications (e.g. hygiene passport, safety card).",
        ],
      },
      {
        heading: "Photos, Personal Details, and Discrimination Protections",
        body: "Including a professional photograph is optional in Finland. Finnish Non-Discrimination Act (Yhdenvertaisuuslaki) prohibits employers from asking about marital status, children, religious beliefs, political views, or age during recruitment.",
        sourceName: "Finlex — Non-Discrimination Act (1325/2014)",
        sourceUrl: "https://www.finlex.fi/en/laki/kaannokset/2014/en20141325",
      },
      {
        heading: "Cover Letter Etiquette (Hakemuskirje)",
        body: "A Finnish cover letter should not exceed one single A4 page. Explain why your background fits the specific requirements mentioned in the job post, why you want to work for that specific employer, and your availability date.",
      },
    ],
    related: [
      { href: "/jobs/how-to-find-a-job-in-finland", label: "Job Search Strategies in Finland" },
      { href: "/jobs/understanding-job-offers-finland", label: "Evaluating Job Offers & Trial Periods" },
      { href: "/calculator", label: "Calculate Gross Monthly Salary" },
    ],
  },
  {
    slug: "work-permits-finland",
    title: "Work Permits & TTOL in Finland",
    metaTitle: "Work Permit Finland 2026 — Residence Permit (TTOL) Rules",
    description:
      "Guide to Finnish work permits: Residence permit for an employed person (TTOL), labour market testing (saatavuusharkinta), specialist permits, and Migri rules.",
    h1: "Work Permits and Residence Permits for Employed Persons (TTOL)",
    summary:
      "Non-EU/EEA citizens moving to Finland for employment require a valid residence permit. The type of permit depends on your professional qualification, salary level, and job sector.",
    category: "Immigration & Legal",
    badge: "03 / Permits",
    sections: [
      {
        heading: "Residence Permit for an Employed Person (TTOL)",
        body: "The standard permit for non-EU workers is the Residence Permit for an Employed Person (työntekijän oleskelulupa, TTOL). The process involves a two-tier decision: first by the TE Office (evaluating labour market availability and employment terms), and second by Migri.",
        sourceName: "Finnish Immigration Service (Migri) — Employed Person Permit",
        sourceUrl: "https://migri.fi/en/residence-permit-for-an-employed-person",
        keyItems: [
          "Two-stage assessment: TE Office conducts labour market testing (saatavuusharkinta); Migri issues final residence card.",
          "Binding terms: The agreed salary and working conditions must strictly meet the applicable collective agreement (TES).",
          "Employer role: The employer submits employment terms through Enter Finland for Employers before application processing.",
        ],
      },
      {
        heading: "Specialist Residence Permit & EU Blue Card",
        body: "High-skilled professionals, IT specialists, and managers with an accredited higher education degree or verified expertise can apply for the Specialist Permit or EU Blue Card. These permits are exempt from labour market testing and offer fast-track processing (often under two weeks).",
        sourceName: "Migri — Specialist Residence Permit Guidelines",
        sourceUrl: "https://migri.fi/en/specialist",
      },
      {
        heading: "EU/EEA and Nordic Citizens",
        body: "Citizens of EU/EEA member states and Switzerland have the right to work in Finland without a residence permit. If staying in Finland longer than three months, EU citizens must register their right of residence with Migri.",
        sourceName: "Migri — Registration of EU Citizens",
        sourceUrl: "https://migri.fi/en/eu-citizen",
      },
    ],
    related: [
      { href: "/students/student-residence-permits", label: "Student Residence Permits & Work Rights" },
      { href: "/working-in-finland/tes-finland", label: "Understanding Collective Agreements" },
      { href: "/wages", label: "Explore Verified Wage Rates" },
    ],
  },
  {
    slug: "understanding-job-offers-finland",
    title: "Understanding Job Offers & Contracts",
    metaTitle: "Understanding Job Offers in Finland 2026 — Contracts & Trial Periods",
    description:
      "How to evaluate a Finnish employment contract: trial periods (koeaika max 6 months), collective agreement binding terms, working hours, and notice periods.",
    h1: "Understanding Job Offers and Employment Contracts in Finland",
    summary:
      "Before signing an employment contract (työsopimus) in Finland, workers should review mandatory contractual elements, statutory trial period rules, and collective agreement alignment.",
    category: "Contract & Terms",
    badge: "04 / Contracts",
    sections: [
      {
        heading: "Mandatory Elements of a Finnish Employment Contract",
        body: "Under Chapter 2 of the Employment Contracts Act, employers must provide written employment terms containing employer and employee details, employment start date, fixed-term grounds (if applicable), trial period duration, workplace location, principal duties, applicable collective agreement (TES), base salary, and pay period.",
        sourceName: "Occupational Safety and Health Administration (Työsuojelu)",
        sourceUrl: "https://www.tyosuojelu.fi/web/en/employment-relationship/employment-contract",
      },
      {
        heading: "Trial Periods in Finland (Koeaika)",
        body: "The statutory maximum trial period under Finnish law is six months. In fixed-term contracts shorter than one year, the trial period cannot exceed half the total contract duration. During a trial period, either party may terminate the contract without a notice period, but termination cannot be based on discriminatory or inappropriate grounds.",
        sourceName: "Finlex — Employment Contracts Act 55/2001 § 4",
        sourceUrl: "https://www.finlex.fi/en/laki/kaannokset/2001/en20010055",
      },
      {
        heading: "Salary Structure and Supplemental Allowances",
        body: "Ensure your written contract clearly distinguishes base gross salary from supplemental allowances (e.g. evening, night, and weekend supplements). Check if meal benefits (lounasseteli/ravintoetu) or public transit benefits are deducted from gross or provided on top of base pay.",
      },
    ],
    related: [
      { href: "/working-in-finland/how-to-read-finnish-payslip", label: "Guide to Finnish Payslips" },
      { href: "/working-in-finland/tes-finland", label: "How Collective Agreements Set Pay Floors" },
      { href: "/calculator", label: "Gross Salary Calculator" },
    ],
  },
];

export function getJobGuide(slug: string) {
  return jobGuides.find((guide) => guide.slug === slug) || null;
}
