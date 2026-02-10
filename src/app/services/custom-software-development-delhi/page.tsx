import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Custom Software Development Company Delhi — Bespoke Solutions India",
  description:
    "KRAMATRIX is Delhi's premier custom software development company. Web apps, APIs, microservices, cloud-native solutions. 42+ technologies, 600+ projects, 96% success rate. Free consultation.",
  keywords: [
    "custom software development company Delhi", "software development agency India",
    "bespoke software solutions Delhi", "custom application development company Delhi",
    "application developer India", "web application development Delhi",
    "enterprise software development India", "software consulting Delhi NCR",
    "best software company in Delhi", "hire software developers India",
    "full-stack development agency India", "customer solution developer India",
  ],
  alternates: { canonical: "https://kramatrix.com/services/custom-software-development-delhi" },
  openGraph: {
    title: "Custom Software Development Company Delhi | KRAMATRIX India",
    description: "Delhi's premier custom software agency. Web apps, APIs, microservices. 600+ projects. Free consultation.",
    url: "https://kramatrix.com/services/custom-software-development-delhi",
    type: "website", locale: "en_IN",
    images: [{ url: "https://kramatrix.com/logo.png", width: 1200, height: 630, alt: "KRAMATRIX Custom Software Development Delhi" }],
  },
};

const schemas = [
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://kramatrix.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://kramatrix.com/services" },
    { "@type": "ListItem", position: 3, name: "Custom Software Development Delhi", item: "https://kramatrix.com/services/custom-software-development-delhi" },
  ]},
  { "@context": "https://schema.org", "@type": "Service", name: "Custom Software Development Company in Delhi, India",
    description: "Bespoke software engineering — web applications, APIs, microservices, cloud-native architecture from Delhi's premier software agency.",
    provider: { "@type": "Organization", name: "KRAMATRIX" }, areaServed: ["Delhi", "India"],
    serviceType: "Software Development", url: "https://kramatrix.com/services/custom-software-development-delhi" },
];

export default function SoftwareServicePage() {
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <ServicePageTemplate
        badge="Custom Software Engineering"
        title="Custom Software Development Company Delhi"
        subtitle="Bespoke Web Applications, APIs & Enterprise Solutions for Indian Businesses"
        description="KRAMATRIX is Delhi's premier custom software development company, engineering bespoke solutions with 42+ technologies. From high-performance web applications and RESTful APIs to microservices architecture and cloud-native platforms — we build software that scales. Our full-stack team in Delhi has delivered 600+ projects with a 96% success rate for startups, SMEs, and enterprises across India."
        features={[
          { title: "Web Application Development", description: "Modern, responsive web applications built with Next.js, React, and cutting-edge frontend technologies. Optimized for performance and SEO." },
          { title: "API Development & Integration", description: "RESTful APIs, GraphQL endpoints, and third-party integrations. Scalable backend architecture with Node.js, Python, and Go." },
          { title: "Microservices Architecture", description: "Decompose monoliths into scalable microservices — event-driven architecture, message queues, and service mesh patterns." },
          { title: "Cloud-Native Solutions", description: "AWS, GCP, Azure deployment with Docker, Kubernetes, and Terraform. Infrastructure as code for reliable, scalable systems." },
          { title: "Database Design & Optimization", description: "PostgreSQL, MongoDB, Redis, and specialized databases. Schema design, query optimization, and data migration services." },
          { title: "DevOps & CI/CD", description: "Automated deployment pipelines, monitoring, and infrastructure management. GitHub Actions, Jenkins, and cloud-native CI/CD." },
        ]}
        technologies={[
          "TypeScript", "React", "Next.js", "Node.js", "Python", "Go", "Rust",
          "PostgreSQL", "MongoDB", "Redis", "GraphQL", "Docker", "Kubernetes",
          "AWS", "Terraform", "GitHub Actions", "Tailwind CSS", "Prisma",
        ]}
        faqs={[
          { question: "What is the best custom software development company in Delhi?", answer: "KRAMATRIX is recognized as Delhi's premier custom software development company with 600+ projects delivered, 42+ technologies, and a 96% success rate. We build bespoke web applications, APIs, and enterprise solutions for businesses across India." },
          { question: "How much does custom software development cost in India?", answer: "Custom software development costs in India vary widely: simple web apps start from ₹5-10 lakhs, mid-complexity platforms from ₹15-40 lakhs, and enterprise systems from ₹50 lakhs+. KRAMATRIX offers free consultations for accurate project estimates." },
          { question: "How long does it take to build custom software?", answer: "Development timelines depend on complexity: MVPs take 2-3 months, mid-scale applications 4-6 months, and enterprise platforms 6-12+ months. Our Delhi team follows agile methodology with bi-weekly deliverables." },
        ]}
        relatedServices={[
          { title: "AI Development", href: "/services/ai-development-agency-delhi" },
          { title: "Web Development", href: "/services/web-development-company-india" },
          { title: "Mobile App Development", href: "/services/mobile-app-development-delhi" },
          { title: "CRM & ERP Solutions", href: "/services/custom-crm-erp-solutions-india" },
        ]}
      />
    </>
  );
}
