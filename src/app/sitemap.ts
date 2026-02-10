import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kramatrix.com";
  const now = new Date().toISOString();

  return [
    // ── Home Page ──────────────────────────────────────────────────────────
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // ── Tech Stack Page ────────────────────────────────────────────────────
    {
      url: `${baseUrl}/stack`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // ── Service Pages (SEO-optimized slugs) ────────────────────────────────
    {
      url: `${baseUrl}/services/ai-development-agency-delhi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/blockchain-web3-development-india`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/custom-software-development-delhi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/web-development-company-india`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/mobile-app-development-delhi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/custom-crm-erp-solutions-india`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/llm-ai-agent-development-india`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // ── Careers Page ──────────────────────────────────────────────────────
    {
      url: `${baseUrl}/careers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // ── Blog Pages ────────────────────────────────────────────────────────
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/why-top-companies-outsource-web3-blockchain-development-india-2025`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/how-to-hire-best-ai-agent-development-company-india`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/india-vs-eastern-europe-vs-southeast-asia-outsource-software-development-2025`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/outsourcing-mobile-app-development-india-dubai-switzerland-canada`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/how-kramatrix-engineers-enterprise-web3-defi-ai-solutions-international-clients`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
