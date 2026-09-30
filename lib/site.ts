export const SITE = {
  name: "Labour Finland",
  url: "https://labourfinland.com",
  tagline: "Understand your pay in Finland.",
  description:
    "Independent, sourced wage and working-life information for people working in or moving to Finland. Verified TES scales, Statistics Finland data, and clear rules.",
  independence:
    "Labour Finland is an independent information service and is not affiliated with or operated by the Finnish government, any public authority, trade union, employer organisation or recruitment agency.",
  disclaimer:
    "Labour Finland provides general informational content about wages and working life in Finland. We aim to keep information accurate and up to date, but collective agreements, legislation, wage levels and employment conditions can change. Information on this website should not be considered individualized legal, tax or employment advice. Always verify important information with the applicable collective agreement, your employer, relevant organization or competent authority.",
} as const;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${cleanPath}`;
}

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}) {
  const url = absoluteUrl(input.path);
  return {
    title: input.title,
    description: input.description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: input.type || "website",
      locale: "en_US",
      url,
      siteName: SITE.name,
      title: input.title,
      description: input.description,
      images: [
        {
          url: absoluteUrl("/assets/icons/mark.svg"),
          width: 512,
          height: 512,
          alt: "Labour Finland Logo",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: input.title,
      description: input.description,
      images: [absoluteUrl("/assets/icons/mark.svg")],
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/assets/icons/mark.svg"),
    description: SITE.description,
    nonprofitStatus: "NonprofitType",
    knowsAbout: [
      "Finnish collective agreements (TES)",
      "Wages in Finland",
      "Structure of Earnings Statistics Finland",
      "Employment regulations in Finland",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/wages?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
