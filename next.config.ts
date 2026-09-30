import type { NextConfig } from "next";

const occupationRedirects = [
  "cleaner",
  "restaurant-worker",
  "waiter",
  "waitress",
  "cook",
  "chef",
  "kitchen-worker",
  "hotel-worker",
  "hospitality-worker",
  "retail-salesperson",
  "warehouse-worker",
  "logistics-worker",
  "construction-worker",
  "practical-nurse",
  "security-guard",
  "office-administrative-worker",
  "software-developer",
].map((slug) => ({
  source: `/occupations/${slug}.html`,
  destination: `/wages/${slug}-salary-finland`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/wages.html", destination: "/wages", permanent: true },
      { source: "/calculator.html", destination: "/calculator", permanent: true },
      { source: "/working-in-finland.html", destination: "/working-in-finland", permanent: true },
      { source: "/methodology.html", destination: "/methodology", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/disclaimer.html", destination: "/disclaimer", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/terms.html", destination: "/disclaimer", permanent: true },
      { source: "/collective-agreements.html", destination: "/working-in-finland/tes-finland", permanent: true },
      { source: "/moving-to-finland.html", destination: "/working-in-finland", permanent: true },
      { source: "/before-you-arrive.html", destination: "/working-in-finland", permanent: true },
      { source: "/after-you-arrive.html", destination: "/working-in-finland", permanent: true },
      { source: "/students.html", destination: "/working-in-finland", permanent: true },
      { source: "/workers.html", destination: "/working-in-finland", permanent: true },
      { source: "/families.html", destination: "/working-in-finland", permanent: true },
      { source: "/visas-and-permits.html", destination: "/working-in-finland", permanent: true },
      { source: "/places-in-finland.html", destination: "/working-in-finland", permanent: true },
      { source: "/everyday-finland.html", destination: "/working-in-finland", permanent: true },
      ...occupationRedirects,
    ];
  },
};

export default nextConfig;
