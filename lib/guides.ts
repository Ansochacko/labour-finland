export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  h1: string;
  summary: string;
  sections: { heading: string; body: string; sourceName?: string; sourceUrl?: string }[];
  related: { href: string; label: string }[];
  badge?: string;
};

export const guides: Guide[] = [
  {
    slug: "minimum-wage-finland",
    title: "Minimum Wage in Finland",
    metaTitle: "Minimum Wage in Finland 2026 — Official TES Pay Floors",
    description:
      "Does Finland have a minimum wage? Clear explanation of how collective agreements (TES) set binding pay floors across Finnish industries without a statutory rate.",
    h1: "Does Finland Have a Minimum Wage?",
    summary:
      "Finland does not have a single universal statutory minimum hourly wage. Instead, legally binding minimum wage levels and employment terms are established through industry-specific collective agreements (työehtosopimus, TES).",
    badge: "Key Regulatory Concept",
    sections: [
      {
        heading: "How Finnish Pay Floors Work Without a National Minimum Wage",
        body: "Unlike countries with a flat statutory minimum wage set by parliament, Finland relies on a collective bargaining model. In sectors with universally binding collective agreements (yleissitova työehtosopimus), every employer—regardless of whether they are organized in an employer federation—is legally required to pay at least the minimum wage specified in that sector's agreement.",
        sourceName: "Occupational Safety and Health Administration in Finland",
        sourceUrl: "https://www.tyosuojelu.fi/web/en/employment-relationship/pay",
      },
      {
        heading: "What This Means for Workers and Jobseekers",
        body: "Your minimum pay is determined by the specific industry sector, the job classification grade (palkkaryhmä), and your verified years of experience. For instance, a property services cleaner or restaurant worker has a legally protected base rate dictated by PAM's collective agreement, not an arbitrary national hourly floor.",
        sourceName: "Occupational Safety and Health Administration in Finland",
        sourceUrl: "https://www.tyosuojelu.fi/web/en/employment-relationship/pay",
      },
      {
        heading: "Sectors Without Universally Binding Agreements",
        body: "In rare sectors without a universally binding collective agreement or company-level agreement, the Employment Contracts Act states that an employee must be paid a 'customary and reasonable' remuneration for the work performed. Official dispute resolution and legal oversight are handled by the labour authorities and courts.",
        sourceName: "Finlex — Employment Contracts Act (55/2001)",
        sourceUrl: "https://www.finlex.fi/en/laki/kaannokset/2001/en20010055",
      },
    ],
    related: [
      { href: "/working-in-finland/tes-finland", label: "Understanding Finnish Collective Agreements (TES)" },
      { href: "/wages", label: "Browse Verified Occupation Wage Scales" },
      { href: "/calculator", label: "Gross Salary Calculator" },
      { href: "/methodology", label: "How Wage Figures are Verified" },
    ],
  },
  {
    slug: "tes-finland",
    title: "TES in Finland (Collective Agreements)",
    metaTitle: "TES Finland Guide 2026 — Collective Agreements & Pay Terms",
    description:
      "What is a Finnish TES (työehtosopimus)? Learn how collective agreements regulate minimum wages, working hours, sick pay, holiday bonuses, and shift additions.",
    h1: "TES in Finland: Collective Agreements and Pay Terms",
    summary:
      "TES stands for työehtosopimus (collective agreement). Negotiated between trade unions and employer federations, collective agreements define the baseline terms of employment across Finnish industries.",
    badge: "Labour Law & Agreements",
    sections: [
      {
        heading: "What a Collective Agreement (TES) Regulates",
        body: "A collective agreement sets the floor for employment conditions in a given industry. It establishes minimum wage tables, annual pay increases, working time schedules, overtime rules, evening and weekend supplements, sick leave pay, and holiday bonuses (lomaraha). Individual employment contracts may offer better terms than the TES, but they can never offer worse.",
      },
      {
        heading: "Universally Binding vs Normally Binding Agreements",
        body: "A collective agreement can be 'universally binding' (yleissitova) if it covers the majority of workers in that sector. When an agreement is confirmed as universally binding by the state committee, all employers in that industry in Finland must comply with its terms. Other agreements are 'normally binding' (normaalisitova), applying only to member employers of the signing federation.",
        sourceName: "PAM — Service Union United Collective Agreements",
        sourceUrl: "https://www.pam.fi/en/tes/",
      },
      {
        heading: "How to Identify the TES for Your Workplace",
        body: "By law, your written employment contract (työsopimus) or written statement of employment terms must state which collective agreement applies to your position. If you are unsure, compare the industry of your employer with the main sector agreements tracked on Labour Finland.",
      },
    ],
    related: [
      { href: "/working-in-finland/minimum-wage-finland", label: "How Finnish Minimum Wages Work" },
      { href: "/wages/cleaner-salary-finland", label: "Property Services TES Pay Scale" },
      { href: "/wages/restaurant-worker-salary-finland", label: "Hospitality TES Pay Scale" },
      { href: "/wages/retail-salesperson-salary-finland", label: "Commerce TES Pay Scale" },
    ],
  },
  {
    slug: "sunday-pay-finland",
    title: "Sunday Pay in Finland",
    metaTitle: "Sunday Pay in Finland 2026 — Statutory 100% Rules & TES",
    description:
      "How Sunday compensation works in Finland: Finnish Working Hours Act § 20 rules, 100% wage supplements, public holiday additions, and collective agreement terms.",
    h1: "Sunday Pay in Finland: Working Hours Act & Supplements",
    summary:
      "In Finland, Sunday work is subject to statutory compensation under Section 20 of the Working Hours Act. Employees working on Sundays or religious public holidays are entitled to an increased wage rate.",
    badge: "Working Hours & Allowances",
    sections: [
      {
        heading: "The Statutory Sunday Supplement (+100%)",
        body: "Under Section 20 of the Finnish Working Hours Act (Työaikalaki 872/2019), work performed on a Sunday or religious public holiday must be compensated with a 100% pay supplement (double base hourly pay), unless otherwise legally agreed in a collective agreement with specific derogation clauses.",
        sourceName: "Finlex — Working Hours Act (872/2019)",
        sourceUrl: "https://www.finlex.fi/en/laki/kaannokset/2019/en20190872",
      },
      {
        heading: "Combination with Evening and Night Supplements",
        body: "If an employee works evening or night shift hours on a Sunday, the Sunday supplement is calculated on the base hourly rate. Depending on the collective agreement, shift allowances (e.g. evening or night lisät) are either added on top or paid in accordance with sector TES rules.",
      },
      {
        heading: "Public Holidays and Eve Days",
        body: "Certain collective agreements (such as the Property Services and Hospitality agreements) include specific compensation rules for work performed on public holidays, Midsummer Eve, Christmas Eve, and New Year's Day. Check the exact collective agreement for holiday eve terms.",
        sourceName: "PAM — Property Services collective agreement",
        sourceUrl: "https://www.pam.fi/tes/kiinteistopalvelualan-tyoehtosopimus/",
      },
    ],
    related: [
      { href: "/working-in-finland/evening-supplement-finland", label: "Evening Shift Supplements" },
      { href: "/working-in-finland/night-shift-pay-finland", label: "Night Shift Supplements" },
      { href: "/calculator", label: "Gross Pay Calculator" },
    ],
  },
  {
    slug: "evening-supplement-finland",
    title: "Evening Supplements in Finland",
    metaTitle: "Evening Supplement Finland 2026 (Iltalisä) | Sourced TES",
    description:
      "Verified evening work supplements in Finland: Property Services €0.73/h and hospitality €1.40/h rates, qualifying shift hours, and collective agreement terms.",
    h1: "Evening Supplements in Finland (Iltalisä)",
    summary:
      "Evening supplements (iltalisä) are collective-agreement additions paid to workers whose shifts extend into evening hours. Because rates are set sector by sector, each agreement defines exact qualifying hours and euro amounts.",
    badge: "Shift Allowances",
    sections: [
      {
        heading: "Property Services (Cleaning & Maintenance)",
        body: "Under the verified Property Services Collective Agreement (PAM), a sourced evening supplement of €0.73 per hour applies for work performed between 18:00 and 23:00, when the work is not organized as regular two-shift or three-shift rotational work. Dataset validity: 2025-04-01 to 2028-03-31.",
        sourceName: "PAM — Property Services Collective Agreement",
        sourceUrl: "https://www.pam.fi/tes/kiinteistopalvelualan-tyoehtosopimus/",
      },
      {
        heading: "Hotel, Restaurant and Leisure Industry",
        body: "Under the verified Hotel, Restaurant and Leisure Industry Agreement (PAM), an evening supplement of €1.40 per hour applies for qualifying evening work (typically 18:00 to 24:00) in restaurants, bars, and hotels. Dataset validity: 2025-09-01 to 2027-06-30.",
        sourceName: "PAM — Hotel, Restaurant and Leisure Industry Agreement",
        sourceUrl: "https://www.pam.fi/en/tes/collective-agreement-hotel-restaurant-leisure/",
      },
      {
        heading: "How Evening Supplements Appear on Payslips",
        body: "Evening supplements must be itemized on your monthly or bi-weekly pay statement (palkkalaskelma) under a separate line item showing the exact number of evening hours worked and the applicable euro supplement rate.",
      },
    ],
    related: [
      { href: "/working-in-finland/night-shift-pay-finland", label: "Night Shift Supplements (Yölisä)" },
      { href: "/working-in-finland/sunday-pay-finland", label: "Sunday Compensation Rules" },
      { href: "/wages/cleaner-salary-finland", label: "Cleaner Pay & Allowances" },
      { href: "/wages/restaurant-worker-salary-finland", label: "Restaurant Pay & Allowances" },
    ],
  },
  {
    slug: "night-shift-pay-finland",
    title: "Night Shift Pay in Finland",
    metaTitle: "Night Shift Pay Finland 2026 (Yölisä) | TES Allowances",
    description:
      "Verified night shift allowances in Finland: Property Services €1.36/h, hospitality €2.37/h, Working Hours Act night definitions, and payslip checks.",
    h1: "Night Shift Pay in Finland (Yölisä)",
    summary:
      "Night work (yötyö) carries higher physical demands and is compensated with collective-agreement night supplements (yölisä) under Finnish labour law and industry agreements.",
    badge: "Shift Allowances",
    sections: [
      {
        heading: "Definition of Night Work Under Finnish Law",
        body: "Under the Finnish Working Hours Act, work performed between 23:00 and 06:00 is classified as night work. Night work is subject to specific statutory restrictions regarding maximum consecutive night shifts and health and safety requirements.",
        sourceName: "Occupational Safety and Health Administration — Working Hours",
        sourceUrl: "https://www.tyosuojelu.fi/web/en/employment-relationship/working-hours",
      },
      {
        heading: "Property Services Night Supplement (€1.36/h)",
        body: "In the Property Services sector (cleaning and real estate services), a verified night supplement of €1.36 per hour applies for hours worked between 23:00 and 06:00 when the work is not scheduled as regular shift work. Dataset validity: 2025-04-01 to 2028-03-31.",
        sourceName: "PAM — Property Services Collective Agreement",
        sourceUrl: "https://www.pam.fi/tes/kiinteistopalvelualan-tyoehtosopimus/",
      },
      {
        heading: "Hospitality Sector Night Supplement (€2.37/h)",
        body: "In the Hotel, Restaurant and Leisure Industry (including night clubs, late-night dining, and hotel night reception), a verified night supplement of €2.37 per hour applies between 00:00 and 06:00. Dataset validity: 2025-09-01 to 2027-06-30.",
        sourceName: "PAM — Hotel, Restaurant and Leisure Industry Agreement",
        sourceUrl: "https://www.pam.fi/en/tes/collective-agreement-hotel-restaurant-leisure/",
      },
    ],
    related: [
      { href: "/working-in-finland/evening-supplement-finland", label: "Evening Supplements (Iltalisä)" },
      { href: "/working-in-finland/sunday-pay-finland", label: "Sunday Pay Rules" },
      { href: "/calculator", label: "Gross Pay Calculator" },
    ],
  },
  {
    slug: "how-to-read-finnish-payslip",
    title: "How to Read a Finnish Payslip",
    metaTitle: "How to Read a Finnish Payslip (Palkkalaskelma) 2026 Guide",
    description:
      "Clear guide to understanding your Finnish payslip (palkkalaskelma): gross pay, tax withholding, TyEL pension, unemployment insurance, and shift supplements.",
    h1: "How to Read a Finnish Payslip (Palkkalaskelma)",
    summary:
      "By law, employers in Finland must provide an itemized pay slip (palkkalaskelma or palkkakuitti) with each wage payment. Learn how to verify your hours, supplements, and deductions.",
    badge: "Worker Practical Guide",
    sections: [
      {
        heading: "Mandatory Information on a Finnish Payslip",
        body: "According to the Employment Contracts Act, a pay slip must clearly state: employee and employer identity, pay period, gross salary (bruttopalkka), itemized shift supplements and overtime, tax withholding amount (ennakonpidätys), statutory pension insurance deduction (TyEL), and unemployment insurance deduction.",
        sourceName: "Occupational Safety and Health Administration — Pay and Payslips",
        sourceUrl: "https://www.tyosuojelu.fi/web/en/employment-relationship/pay",
      },
      {
        heading: "Key Finnish Payslip Terms Explained",
        body: "Common terminology includes: Bruttopalkka (Gross pay), Peruspalkka (Base pay), Iltalisä (Evening supplement), Yölisä (Night supplement), Sunnuntailisä (Sunday supplement), TyEL-maksu (Employee pension deduction ~7.15%), Työttömyysvakuutusmaksu (Unemployment insurance ~0.79%), Ennakonpidätys (Tax withholding), and Maksettava määrä / Nettopalkka (Net take-home pay).",
      },
      {
        heading: "What to Do If an Item Is Missing or Incorrect",
        body: "Always cross-check your logged work hours and shifts against the payslip. If a collective agreement supplement or overtime rate is missing, notify your employer's payroll office in writing. If unresolved, consult your shop steward (luottamusmies) or the Occupational Safety and Health Administration.",
        sourceName: "Occupational Safety and Health Administration",
        sourceUrl: "https://www.tyosuojelu.fi/web/en/employment-relationship/pay",
      },
    ],
    related: [
      { href: "/working-in-finland/verokortti-explained", label: "Understanding Your Tax Card (Verokortti)" },
      { href: "/calculator", label: "Gross Salary Estimator" },
      { href: "/working-in-finland/tes-finland", label: "Collective Agreements in Finland" },
    ],
  },
  {
    slug: "verokortti-explained",
    title: "Finnish Tax Card Explained (Verokortti)",
    metaTitle: "Tax Card in Finland Explained (Verokortti) 2026 Guide",
    description:
      "How the Finnish tax card (verokortti) works: tax withholding percentage, annual income limits, OmaVero online portal, and tax rules for foreign workers.",
    h1: "Finnish Tax Card Explained (Verokortti)",
    summary:
      "A tax card (verokortti) is the official certificate issued by the Finnish Tax Administration (Verohallinto) that determines your personal income tax withholding rate.",
    badge: "Taxation & Compliance",
    sections: [
      {
        heading: "How the Tax Card Affects Your Net Pay",
        body: "In Finland, personal income tax is progressive. Your verokortti specifies a withholding tax rate (perusprosentti) and an annual income ceiling (tuloraja). If your earnings exceed this ceiling during the calendar year, a higher marginal rate (lisäprosentti) is automatically applied to prevent under-withholding.",
        sourceName: "Finnish Tax Administration (Verohallinto)",
        sourceUrl: "https://www.vero.fi/en/individuals/tax-cards-and-tax-returns/tax-card/",
      },
      {
        heading: "How to Order and Update Your Tax Card",
        body: "You can view, calculate, and adjust your tax card anytime online via the OmaVero (MyTax) portal using Finnish electronic bank credentials (pankkitunnukset) or certificate cards. In many workplaces, the tax card information is transferred automatically via electronic tax data retrieval.",
        sourceName: "Verohallinto — MyTax (OmaVero)",
        sourceUrl: "https://www.vero.fi/en/e-services/mytax-instructions/",
      },
      {
        heading: "What Happens If You Do Not Submit a Tax Card?",
        body: "If an employer does not receive your tax card before payroll processing, Finnish tax regulations require the employer to withhold a mandatory flat penalty rate of 60% from your gross pay. Any overpaid tax is reconciled in the annual tax assessment the following year.",
        sourceName: "Finnish Tax Administration (Verohallinto)",
        sourceUrl: "https://www.vero.fi/en/individuals/tax-cards-and-tax-returns/tax-card/",
      },
    ],
    related: [
      { href: "/working-in-finland/how-to-read-finnish-payslip", label: "How to Read a Finnish Payslip" },
      { href: "/calculator", label: "Gross Salary Calculator" },
      { href: "/disclaimer", label: "Legal & Tax Disclaimer" },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug) || null;
}
