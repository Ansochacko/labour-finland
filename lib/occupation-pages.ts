export type PageCopy = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  context: string;
  keyPoints?: string[];
};

const pages: Record<string, PageCopy> = {
  cleaner: {
    title: "Cleaner Salary in Finland 2026 (Siivooja) | TES Pay Scale",
    description:
      "Sourced Property Services (PAM) TES wage scale for cleaners in Finland, job grades 1–6, experience supplements, and official Statistics Finland 2024 earnings.",
    h1: "Cleaner Salary in Finland (Siivooja)",
    intro:
      "Cleaner pay in Finland is governed by collective agreements rather than a single statutory minimum wage. In the private sector, cleaning roles (siivooja) generally follow the Property Services Collective Agreement (Kiinteistöpalvelualan TES), negotiated between PAM and Real Estate Employers.",
    context:
      "Pay in Property Services is structured into job demand grades (grades 1–6, assessed via job points). Pay increases with certified job complexity and experience. Additional evening supplements (€0.73/h) and night supplements (€1.36/h) apply under specific conditions.",
    keyPoints: [
      "Property Services TES hourly pay floor starts from €11.33 (Trainee) to €12.59+ (Grade 2).",
      "Pay is determined by workplace job classification points (17–20 pts = Grade 2).",
      "Evening and night work qualify for collective agreement shift additions.",
      "Check your employment contract to confirm the applicable collective agreement.",
    ],
  },
  "restaurant-worker": {
    title: "Restaurant Worker Salary in Finland 2026 | Hospitality TES",
    description:
      "Hotel, Restaurant and Leisure Industry (PAM) collective-agreement wage scale for restaurant workers in Finland: pay groups, experience tiers, and shift pay.",
    h1: "Restaurant Worker Salary in Finland",
    intro:
      "Restaurant work in Finland (ravintolatyöntekijä) is covered by the Hotel, Restaurant and Leisure Industry Collective Agreement (Matkailu-, ravintola- ja vapaa-ajan palveluita koskeva TES) negotiated by PAM and the Finnish Hospitality Association (MaRa).",
    context:
      "Pay is organized by job difficulty groups and experience stages (0–2 years, 2–5 years, 5–10 years, and over 10 years). Shift supplements also apply: evening supplement (€1.40/h) and night supplement (€2.37/h), in addition to 100% Sunday pay under Finnish law.",
    keyPoints: [
      "Hospitality wages are structured across defined pay groups and experience increments.",
      "Shift additions: €1.40/h evening supplement and €2.37/h night supplement.",
      "Sunday work is compensated with statutory +100% Sunday pay under Finnish Working Hours Act.",
      "Actual workplace pay may exceed the collective agreement minimum scale.",
    ],
  },
  waiter: {
    title: "Waiter Salary in Finland 2026 (Tarjoilija) | TES Pay",
    description:
      "Waiter wages in Finland from the hospitality TES pay scale, plus Statistics Finland 2024 earnings. Pay groups, experience additions, and Sunday pay explained.",
    h1: "Waiter Salary in Finland (Tarjoilija)",
    intro:
      "Waiter positions (tarjoilija) in Finland are covered by the Hotel, Restaurant and Leisure Industry Collective Agreement. Base pay depends on job skill grading, dining establishment type, and verified professional experience.",
    context:
      "In addition to base hourly or monthly wages, waitstaff are eligible for evening supplements (€1.40/h between 18:00–24:00), night supplements (€2.37/h after midnight), and statutory Sunday compensation (100% increase on base hourly wage).",
    keyPoints: [
      "Base wage scales set minimum contractual hourly and monthly rates.",
      "Experience increments apply at 2, 5, and 10 years of industry service.",
      "Official Statistics Finland 2024 median waiter earnings provide market context.",
      "Tips are personal income and do not replace collective agreement pay floors.",
    ],
  },
  waitress: {
    title: "Waitress Salary in Finland 2026 | Sourced Hospitality TES",
    description:
      "Hospitality collective agreement wage scale for waitresses and waitstaff in Finland. Verified pay groups, experience increments, and Statistics Finland data.",
    h1: "Waitress Salary in Finland",
    intro:
      "Under Finnish labour law and collective agreements, all waiting staff share identical collective agreement pay scales regardless of gender. Pay follows the Hotel, Restaurant and Leisure Industry Agreement (PAM/MaRa).",
    context:
      "Pay classification is based entirely on job duties and seniority. The hospitality agreement provides standard shift supplements for evening and night hours, as well as statutory Sunday premiums.",
    keyPoints: [
      "Governed by the PAM Hotel, Restaurant and Leisure Industry agreement.",
      "Equal pay scales apply across all waiting and service personnel.",
      "Evening (€1.40/h) and night (€2.37/h) supplements apply to qualifying shift hours.",
      "Statistics Finland ISCO 5131 earnings are provided as separate statistical benchmarks.",
    ],
  },
  cook: {
    title: "Cook Salary in Finland 2026 (Kokki) | Hospitality TES",
    description:
      "Cook wages in Finland: verified PAM hospitality collective agreement pay groups, experience stages, and Statistics Finland Structure of Earnings 2024 data.",
    h1: "Cook Salary in Finland (Kokki)",
    intro:
      "Kitchen cook positions (kokki) in Finland generally follow the Hotel, Restaurant and Leisure Industry Collective Agreement. Kitchen roles are categorized into specific pay groups based on vocational qualifications and kitchen responsibilities.",
    context:
      "Experienced cooks advance through seniority tiers (2, 5, and 10 years). Shift supplements for evening and night kitchen prep apply, and Sunday shifts earn statutory double pay.",
    keyPoints: [
      "Pay groups differentiate between kitchen assistants, line cooks, and specialized cooks.",
      "Experience tiers reward accumulated service in professional kitchen environments.",
      "Shift additions and Sunday pay apply on top of base contractual rates.",
      "Statistics Finland 2024 earnings benchmark median cook earnings across Finland.",
    ],
  },
  chef: {
    title: "Chef Salary in Finland 2026 | Hospitality Scale & Data",
    description:
      "Chef pay in Finland from the hospitality TES scale where applicable, plus Statistics Finland 2024 average and median earnings for professional chefs (3434).",
    h1: "Chef Salary in Finland",
    intro:
      "Chef pay in Finland reflects culinary leadership, kitchen management, and collective agreement classifications. While senior chefs and head chefs often negotiate individual salaries above the TES floor, collective agreements establish the binding baseline.",
    context:
      "Statistics Finland classifies Chefs under ISCO code 3434, reporting official full-time monthly earnings across Finland. These statistics illustrate actual market compensation above mandatory minimum scales.",
    keyPoints: [
      "TES scales provide the non-negotiable pay floor for all culinary staff.",
      "Head chefs and executive chefs typically negotiate higher individual contract terms.",
      "Official Statistics Finland data shows median and average full-time monthly compensation.",
      "Working hours and overtime compensation must comply with the Working Hours Act.",
    ],
  },
  "kitchen-worker": {
    title: "Kitchen Worker Salary in Finland 2026 | Sourced TES",
    description:
      "Kitchen helper and assistant wages in Finland from the PAM hospitality collective agreement, plus Statistics Finland 2024 earnings for kitchen helpers (9412).",
    h1: "Kitchen Worker Salary in Finland",
    intro:
      "Kitchen helpers, dishwashers, and assistant staff (keittiöapulainen / keittiötyöntekijä) are covered under the Hotel, Restaurant and Leisure Industry Collective Agreement.",
    context:
      "Entry-level kitchen staff begin in foundational pay groups with structured progression as experience grows. Shift supplements for evening and night hours apply equally to kitchen assistants.",
    keyPoints: [
      "Covers kitchen assistants, dishwashers, and prep support staff.",
      "PAM hospitality agreement guarantees binding minimum hourly rates.",
      "Evening (€1.40/h) and night (€2.37/h) supplements apply to shift work.",
      "Official 2024 statistics for ISCO 9412 Kitchen helpers provide realistic wage insight.",
    ],
  },
  "hotel-worker": {
    title: "Hotel Worker Salary in Finland 2026 | Hospitality TES",
    description:
      "Hotel worker pay in Finland by department (reception, housekeeping, F&B) under the PAM hospitality collective agreement. Verified scales and experience tiers.",
    h1: "Hotel Worker Salary in Finland",
    intro:
      "Hotel employees (hotellityöntekijä) work across multiple departments including front desk/reception, housekeeping, maintenance, and food service, primarily under the PAM Hotel, Restaurant and Leisure Industry Agreement.",
    context:
      "Different hotel departments align with specific pay groups. Night auditors and evening reception staff receive collective agreement night supplements in addition to base pay.",
    keyPoints: [
      "Covers front desk reception, housekeeping, and general hotel operations.",
      "Pay groups depend on whether the position involves specialized front-office software.",
      "Night shift supplements apply to overnight reception and audit shifts.",
      "Sunday shifts are compensated at double pay under Finnish labour law.",
    ],
  },
  "hospitality-worker": {
    title: "Hospitality Worker Salary in Finland 2026 | PAM TES Scale",
    description:
      "Hospitality wages in Finland: collective-agreement pay scale for hotel, restaurant, catering and leisure services. Verified rates, supplements, and legal terms.",
    h1: "Hospitality Worker Salary in Finland",
    intro:
      "The Finnish hospitality sector encompasses restaurants, hotels, cafes, catering, and recreational venues, unified under the national Hotel, Restaurant and Leisure Industry Collective Agreement (PAM).",
    context:
      "Because 'hospitality worker' is a broad category, exact compensation depends on the specific job classification, location, accumulated years of service, and shift scheduling.",
    keyPoints: [
      "Universal sectoral framework negotiated between PAM and MaRa.",
      "Binding minimum hourly rates across all sub-sectors and establishments.",
      "Specific supplements for evening, night, and Sunday hours.",
      "Clear progression paths based on 2, 5, and 10 years of service.",
    ],
  },
  "retail-salesperson": {
    title: "Retail Salesperson Salary in Finland 2026 | Commerce TES",
    description:
      "Shop worker wages in Finland from the PAM Commerce TES by region (Capital vs Rest of Finland) and pay group, plus Statistics Finland 2024 retail earnings.",
    h1: "Retail Salesperson Salary in Finland (Myyjä)",
    intro:
      "Retail sales assistants and store workers (myyjä) in Finland are covered by the Commerce Collective Agreement (Kaupan työehtosopimus), negotiated between Service Union United PAM and the Finnish Commerce Federation.",
    context:
      "The commerce pay scale distinguishes between the Helsinki Metropolitan Area (Region 1: Helsinki, Espoo, Vantaa, Kauniainen) and the rest of Finland (Region 2), with job tiers A–D reflecting product complexity and responsibility.",
    keyPoints: [
      "Regional pay differentiation: Helsinki metropolitan area has a higher base scale.",
      "Job groups A–D reflect customer advisory depth and specialist merchandise.",
      "Major commerce wage system revisions take effect in October 2026.",
      "Official Statistics Finland 2024 data (ISCO 5223) reports shop sales assistant earnings.",
    ],
  },
  "warehouse-worker": {
    title: "Warehouse Worker Salary in Finland 2026 | Logistics Pay",
    description:
      "Warehouse pay in Finland: commerce logistics collective agreement rules, transport sector differences, and verified job grading requirements.",
    h1: "Warehouse Worker Salary in Finland (Varastotyöntekijä)",
    intro:
      "Warehouse worker pay (varastotyöntekijä) in Finland depends on the specific industry sector. Commercial wholesale and retail warehouses fall under the PAM Commerce Agreement, while freight terminals may fall under AKT transport agreements.",
    context:
      "For commerce logistics, pay is categorized by technical skill (e.g. forklift operation, automated inventory systems) and regional location. Where a role is outside commerce logistics, specific union scales must be verified.",
    keyPoints: [
      "Commerce logistics roles follow the PAM Commerce Collective Agreement.",
      "Transport terminal roles may follow the AKT Transport Workers collective agreement.",
      "Regional scale adjustments apply between Greater Helsinki and other regions.",
      "Forklift and equipment certifications often impact job classification.",
    ],
  },
  "logistics-worker": {
    title: "Logistics Worker Salary in Finland 2026 | Sector Lookup",
    description:
      "Logistics wages in Finland: understand which collective agreement applies (Commerce vs Transport/AKT), regional pay tiers, and verified wage guidelines.",
    h1: "Logistics Worker Salary in Finland",
    intro:
      "Logistics covers diverse roles from fulfillment centers and warehouse operations to freight handling. In Finland, your applicable pay floor depends on whether your employer belongs to commerce, transport, or manufacturing sectors.",
    context:
      "Labour Finland does not guess an agreement from a general job title. For commerce logistics, verified PAM scales apply. For transport logistics, check agreements negotiated by the Finnish Transport Workers' Union (AKT).",
    keyPoints: [
      "Sector-dependent collective agreements dictate pay scales and allowances.",
      "Evening, night, and weekend shift allowances vary by applicable sector agreement.",
      "Always verify the employer's registered collective agreement on your contract.",
      "Overtime and holiday compensation follow sectoral TES rules.",
    ],
  },
  "construction-worker": {
    title: "Construction Worker Wage in Finland 2026 (Rakennusmies)",
    description:
      "Construction wages in Finland: collective agreements negotiated by Rakennusliitto, skill tiers 1–6, piecework principles, and sector authority links.",
    h1: "Construction Worker Wage in Finland",
    intro:
      "Construction workers (rakennustyöntekijä / rakennusmies) in Finland work under collective agreements negotiated by the Finnish Construction Trade Union (Rakennusliitto) and the Confederation of Finnish Construction Industries (RT).",
    context:
      "Construction pay utilizes six skill and demand pay tiers (palkkaryhmät 1–6), as well as widespread piecework / contract pricing (urakkatyö). In our dataset, official sector wage tables are referenced directly to Rakennusliitto official publications.",
    keyPoints: [
      "Governed by Rakennusliitto sectoral agreements (Building Construction, Infrastructure, Painting).",
      "Structured across 6 wage groups based on vocational qualification and competence.",
      "Piecework (urakka) is common and can yield higher effective earnings.",
      "Direct links to the Finnish Construction Trade Union ensure authoritative terms.",
    ],
  },
  "practical-nurse": {
    title: "Practical Nurse Salary in Finland 2026 (Lähihoitaja)",
    description:
      "Practical nurse wages in Finland: Private Social Services TES scale, public sector wellbeing services county scales, and Statistics Finland 2024 earnings.",
    h1: "Practical Nurse Salary in Finland (Lähihoitaja)",
    intro:
      "Practical nurse pay in Finland (lähihoitaja) depends on whether employment is in the private sector (e.g. private care homes, home services) or the public sector (Wellbeing Services Counties / Hyvinvointialueet).",
    context:
      "Our verified private social services table covers private sector care in Other Finland (outside capital region) based on Tehy/Super agreements. Public sector nursing follows the SOTE-sopimus agreement. Official Statistics Finland 2024 earnings for ISCO 53219 are shown separately.",
    keyPoints: [
      "Private social services TES (Yksityisen sosiaalipalvelualan TES) covers private care.",
      "Public sector nurses follow the SOTE-sopimus across Wellbeing Services Counties.",
      "Experience increments (kokemuslisät) increase pay after qualifying years.",
      "Official 2024 statistics benchmark full-time practical nurse median earnings.",
    ],
  },
  "security-guard": {
    title: "Security Guard Salary in Finland 2026 (Vartija) | Data",
    description:
      "Security guard wages in Finland: Security Sector TES overview, night/shift allowances, and Statistics Finland 2024 Structure of Earnings benchmarks (5414).",
    h1: "Security Guard Salary in Finland (Vartija)",
    intro:
      "Security personnel and guards (vartija / järjestyksenvalvoja) work under the Security Sector Collective Agreement (Vartiointialan työehtosopimus), negotiated between PAM and the Finnish Security Association.",
    context:
      "Security pay includes distinct pay tiers based on guard licensing, assignment risk, and specialized training (e.g. airport screening, cash-in-transit). Statistics Finland reports 2024 Structure of Earnings for ISCO 5414 Security guards as official market data.",
    keyPoints: [
      "Vartiointialan TES establishes mandatory hourly pay floors and supplements.",
      "Night work, Sunday shifts, and lone-working supplements are heavily utilized.",
      "Security licenses (vartijakortti) and specialized certifications affect pay.",
      "Statistics Finland 2024 data provides official average and median earnings context.",
    ],
  },
  "office-administrative-worker": {
    title: "Office Worker Salary in Finland 2026 | Administration Pay",
    description:
      "Office and administrative worker pay in Finland: cross-sector collective agreement rules, job evaluation systems, and employment contract advice.",
    h1: "Office & Administrative Worker Salary in Finland",
    intro:
      "Office, administrative, and clerical positions in Finland span multiple economic sectors—including commerce, industry, public administration, and financial services.",
    context:
      "Because administrative jobs are covered by different sector agreements depending on the employer's core business (e.g., Commercial Office TES, Financial Sector TES, Technology Industry Clerical TES), pay terms must be checked against the specific industry agreement.",
    keyPoints: [
      "Agreement depends on employer's primary industry (e.g. Commerce, Tech, Finance).",
      "Clerical collective agreements (toimihenkilö TES) provide pay scales by job requirement.",
      "Salaries are usually monthly rather than hourly contracts.",
      "Overtime rules are governed by the Finnish Working Hours Act and sector TES.",
    ],
  },
  "software-developer": {
    title: "Software Developer Salary in Finland 2026 | IT Earnings Data",
    description:
      "Software developer salary in Finland: official Statistics Finland 2024 median and average earnings (ISCO 2512), collective agreement context, and market pay.",
    h1: "Software Developer Salary in Finland",
    intro:
      "Software engineers and developers in Finland generally negotiate individual market-based salaries, though collective agreements (such as the Technology Industry Senior Salaried Employees agreement by YTN) provide overarching employment standards.",
    context:
      "Statistics Finland publishes official Structure of Earnings data (table 15au) for ISCO code 2512 Software Developers. This reports official median and average monthly earnings for full-time developers across Finland under the CC BY 4.0 license.",
    keyPoints: [
      "Market-rate individual contracting is standard across the Finnish tech industry.",
      "YTN / Technology Industry agreements provide baseline working condition standards.",
      "Official 2024 Statistics Finland median monthly earnings provide realistic market insight.",
      "Remote work arrangements, benefits, and equity incentives are negotiated in the contract.",
    ],
  },
};

export function occupationPageCopy(id: string): PageCopy {
  const copy = pages[id];
  if (copy) return copy;
  return {
    title: "Wage Information in Finland 2026 | Labour Finland",
    description:
      "Sourced wage information and collective-agreement scales in Finland. Sourced with validity dates, grades, and official Statistics Finland figures.",
    h1: "Wage Information in Finland",
    intro:
      "Labour Finland publishes wage figures only after a source, collective agreement, and validity period have been checked. A missing number is shown as not yet verified rather than invented.",
    context:
      "In Finland, pay rates are determined primarily through collective agreements (TES) negotiated by trade unions and employer federations.",
    keyPoints: [
      "Finland has no universal statutory minimum wage.",
      "Pay scales are established sector by sector in collective agreements.",
      "Official figures include source name, validity dates, and verification status.",
    ],
  };
}

export function directoryGroups() {
  return [
    ["cleaning-property", "Cleaning and property services"],
    ["hospitality-restaurants", "Hospitality and restaurants"],
    ["retail-commerce", "Retail and commerce"],
    ["logistics", "Logistics and warehousing"],
    ["construction", "Construction and trades"],
    ["health-social-care", "Health and social care"],
    ["security", "Security and guarding"],
    ["office-administration", "Office and administration"],
    ["it-technology", "IT, software and technology"],
  ] as const;
}
