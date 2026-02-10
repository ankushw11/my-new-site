import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Custom CRM & ERP Development Company India — Delhi Solutions",
  description:
    "KRAMATRIX is India's leading CRM & ERP development company based in Delhi. Custom CRM systems, enterprise resource planning, sales automation, analytics dashboards. 600+ projects. Free consultation.",
  keywords: [
    "CRM development company India", "CRM development company Delhi",
    "custom CRM solutions India", "custom CRM solutions Delhi",
    "ERP development company India", "ERP development company Delhi",
    "custom ERP solutions India", "custom ERP solutions Delhi",
    "CRM software development Delhi NCR", "ERP software company India",
    "sales automation software Delhi", "business management software India",
    "customer relationship management Delhi", "enterprise resource planning India",
  ],
  alternates: { canonical: "https://kramatrix.com/services/custom-crm-erp-solutions-india" },
  openGraph: {
    title: "Custom CRM & ERP Development Company India | KRAMATRIX Delhi",
    description: "India's leading CRM & ERP developer. Custom solutions for Indian businesses. Based in Delhi. Free consultation.",
    url: "https://kramatrix.com/services/custom-crm-erp-solutions-india",
    type: "website", locale: "en_IN",
    images: [{ url: "https://kramatrix.com/logo.png", width: 1200, height: 630, alt: "KRAMATRIX CRM ERP Development India" }],
  },
};

const schemas = [
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://kramatrix.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://kramatrix.com/services" },
    { "@type": "ListItem", position: 3, name: "CRM & ERP Solutions India", item: "https://kramatrix.com/services/custom-crm-erp-solutions-india" },
  ]},
  { "@context": "https://schema.org", "@type": "Service", name: "Custom CRM & ERP Development Company in India",
    description: "Tailored CRM and ERP solutions for Indian businesses — customer management, enterprise resource planning, sales automation from Delhi.",
    provider: { "@type": "Organization", name: "KRAMATRIX" }, areaServed: ["Delhi", "India"],
    serviceType: "CRM/ERP Development", url: "https://kramatrix.com/services/custom-crm-erp-solutions-india" },
];

export default function CRMERPServicePage() {
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <ServicePageTemplate
        badge="CRM & ERP Solutions"
        title="Custom CRM & ERP Development Company India"
        subtitle="Tailored Customer Management & Enterprise Resource Planning from Delhi"
        description="KRAMATRIX is India's leading CRM and ERP development company, headquartered in Delhi. We build fully customized CRM systems that streamline customer relationships, automate sales pipelines, and deliver actionable analytics — alongside comprehensive ERP solutions covering inventory, HR, finance, and supply chain management. Unlike off-the-shelf solutions, our custom-built systems are tailored exactly to your business processes."
        features={[
          { title: "Custom CRM Development", description: "Tailored customer relationship management systems — lead tracking, sales pipeline automation, customer 360° views, and communication management." },
          { title: "Custom ERP Development", description: "Enterprise resource planning systems covering inventory management, HR, payroll, finance, procurement, and supply chain — all integrated." },
          { title: "Sales Automation", description: "Automated sales workflows — lead scoring, follow-up sequences, proposal generation, and deal tracking to accelerate your sales cycle." },
          { title: "Analytics & Dashboards", description: "Real-time business intelligence dashboards — KPI tracking, revenue analytics, customer insights, and predictive reporting." },
          { title: "Integration & Migration", description: "Seamless integration with existing tools — email, accounting software, payment gateways, and data migration from legacy systems." },
          { title: "AI-Powered CRM/ERP", description: "Intelligent features powered by AI — predictive lead scoring, automated customer segmentation, demand forecasting, and smart recommendations." },
        ]}
        technologies={[
          "React", "Next.js", "Node.js", "Python", "PostgreSQL", "MongoDB",
          "Redis", "GraphQL", "Docker", "AWS", "Stripe", "Razorpay",
          "Elasticsearch", "Apache Kafka", "TensorFlow", "Power BI",
        ]}
        faqs={[
          { question: "Which is the best CRM development company in Delhi?", answer: "KRAMATRIX is recognized as Delhi's leading CRM development company. We build fully customized CRM systems tailored to your business — not generic off-the-shelf solutions. With 600+ projects and expertise in AI-powered CRM features, we serve businesses across India." },
          { question: "How much does custom CRM development cost in India?", answer: "Custom CRM development in India ranges from ₹8-15 lakhs for basic systems, ₹20-40 lakhs for mid-complexity CRMs with automation, and ₹50+ lakhs for enterprise-grade AI-powered CRM platforms. KRAMATRIX offers free consultations for detailed estimates." },
          { question: "Should I build a custom CRM or use Salesforce/HubSpot?", answer: "Custom CRM is ideal when you need: (1) workflows specific to your industry, (2) full data ownership, (3) no per-user licensing fees at scale, (4) deep integration with existing systems. Off-the-shelf works for standard sales processes. Our Delhi team can assess which approach suits your business." },
          { question: "Can KRAMATRIX build an ERP system for manufacturing?", answer: "Yes, we build custom ERP systems for manufacturing, retail, healthcare, logistics, and other industries. Our ERP solutions cover production planning, inventory management, quality control, supply chain, HR, and finance — all tailored to your specific manufacturing processes." },
        ]}
        relatedServices={[
          { title: "AI Development", href: "/services/ai-development-agency-delhi" },
          { title: "Custom Software", href: "/services/custom-software-development-delhi" },
          { title: "Web Development", href: "/services/web-development-company-india" },
          { title: "LLM & AI Agents", href: "/services/llm-ai-agent-development-india" },
        ]}
      />
    </>
  );
}
