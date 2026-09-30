import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { activeOccupations, pageSlug } from "@/lib/dataset";
import { guides } from "@/lib/guides";
import { jobGuides } from "@/lib/jobs";
import { studentGuides } from "@/lib/students";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date("2026-09-29");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE.url}/wages`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/jobs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/students`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/working-in-finland`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/methodology`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE.url}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE.url}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const occupationRoutes: MetadataRoute.Sitemap = activeOccupations().map((occupation) => ({
    url: `${SITE.url}/wages/${pageSlug(occupation)}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: occupation.popular ? 0.9 : 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE.url}/working-in-finland/${guide.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const jobRoutes: MetadataRoute.Sitemap = jobGuides.map((guide) => ({
    url: `${SITE.url}/jobs/${guide.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const studentRoutes: MetadataRoute.Sitemap = studentGuides.map((guide) => ({
    url: `${SITE.url}/students/${guide.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...occupationRoutes, ...guideRoutes, ...jobRoutes, ...studentRoutes];
}

