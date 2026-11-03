import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://inatechfmglobal.com";
  const now = new Date();

  // Core Pages
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    // Priority Target Service Pages for SEO Boosting
    {
      url: `${baseUrl}/services/hard-fm`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/technical-services`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/transition-services`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/sustainability-services`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/audit-and-offerings`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/allied-services`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    // Main Brand Pages
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sectors`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/clients-corner`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Sector detail pages
  const sectors = [
    "hospitality",
    "malls",
    "healthcare",
    "it-ites",
    "residential",
    "manufacturing",
    "commercial-corporate",
    "institution",
  ];

  const sectorRoutes = sectors.map((slug) => ({
    url: `${baseUrl}/sectors/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog detail pages
  const blogs = [
    "beating-the-heat-why-hvac-performance-matters-most-in-summer",
    "ina-techfm-pioneering-sustainable-and-technology-driven-facility-management",
    "ina-techfm-redefining-facility-management-with-innovation-and-sustainability",
  ];

  const blogRoutes = blogs.map((slug) => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...sectorRoutes, ...blogRoutes];
}

