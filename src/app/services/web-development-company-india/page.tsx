import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Web Development Company India — Next.js, React, Full-Stack Delhi",
  description:
    "KRAMATRIX is India's leading web development company based in Delhi. Next.js, React, Three.js, full-stack web applications. SEO-optimized, responsive, high-performance websites. 600+ projects. Free consultation.",
  keywords: [
    "web development company India", "web development company Delhi",
    "web suite developer India", "Next.js development India",
    "React development company Delhi", "full-stack web development India",
    "website development agency Delhi NCR", "responsive web design India",
    "SEO-friendly web development Delhi", "Three.js development India",
    "progressive web app development Delhi", "web application company India",
  ],
  alternates: { canonical: "https://kramatrix.com/services/web-development-company-india" },
  openGraph: {
    title: "Web Development Company India — Next.js & React | KRAMATRIX Delhi",
    description: "India's leading web development company. Next.js, React, full-stack. Based in Delhi. 600+ projects. Free consultation.",
    url: "https://kramatrix.com/services/web-development-company-india",
    type: "website", locale: "en_IN",
    images: [{ url: "https://kramatrix.com/logo.png", width: 1200, height: 630, alt: "KRAMATRIX Web Development India" }],
  },
};

const schemas = [
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://kramatrix.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://kramatrix.com/services" },
    { "@type": "ListItem", position: 3, name: "Web Development Company India", item: "https://kramatrix.com/services/web-development-company-india" },
  ]},
  { "@context": "https://schema.org", "@type": "Service", name: "Web Development Company in India",
    description: "Modern web applications with Next.js, React, and cutting-edge frontend technologies from India's leading web development company.",
    provider: { "@type": "Organization", name: "KRAMATRIX" }, areaServed: ["Delhi", "India"],
    serviceType: "Web Development", url: "https://kramatrix.com/services/web-development-company-india" },
];

export default function WebDevServicePage() {
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <ServicePageTemplate
        badge="Web Development"
        title="Web Development Company India"
        subtitle="Next.js, React & Full-Stack Web Applications from Delhi"
        description="KRAMATRIX is India's leading web development company, building high-performance, SEO-optimized web applications from our Delhi headquarters. We specialize in Next.js, React, Three.js for 3D experiences, GSAP animations, and full-stack architectures that deliver exceptional user experiences. From corporate websites to complex web platforms — we engineer digital presence that converts."
        features={[
          { title: "Next.js & React Development", description: "Production-grade web applications with server-side rendering, static generation, and hybrid rendering for optimal performance and SEO." },
          { title: "3D Web Experiences", description: "Immersive 3D websites using Three.js and React Three Fiber — interactive product showcases, virtual tours, and creative web experiences." },
          { title: "UI/UX Design & Animation", description: "Premium user interfaces with GSAP animations, micro-interactions, and responsive design that works flawlessly across all devices." },
          { title: "E-commerce Development", description: "Custom e-commerce platforms with payment integration, inventory management, and conversion-optimized checkout flows." },
          { title: "SEO-Optimized Websites", description: "Websites built for search engine dominance — semantic HTML, structured data, Core Web Vitals optimization, and technical SEO best practices." },
          { title: "Progressive Web Apps", description: "PWAs that combine the best of web and mobile — offline capability, push notifications, and app-like experiences in the browser." },
        ]}
        technologies={[
          "Next.js", "React", "TypeScript", "Three.js", "GSAP", "Tailwind CSS",
          "Framer Motion", "Vercel", "Cloudflare", "Node.js", "GraphQL",
          "PostgreSQL", "Prisma", "Supabase", "Stripe", "Shopify",
        ]}
        faqs={[
          { question: "Which is the best web development company in India?", answer: "KRAMATRIX is recognized as one of India's best web development companies, based in Delhi. We build high-performance websites with Next.js and React, delivering 600+ projects with a 96% success rate and expertise in 42+ technologies." },
          { question: "How much does website development cost in Delhi?", answer: "Website development costs in Delhi range from ₹1-3 lakhs for basic websites, ₹5-15 lakhs for custom web applications, and ₹20-50+ lakhs for complex platforms. KRAMATRIX offers free consultations for accurate estimates." },
          { question: "Does KRAMATRIX build SEO-friendly websites?", answer: "Yes, every website we build is SEO-optimized from the ground up — semantic HTML, structured data (JSON-LD), Core Web Vitals optimization, mobile-first responsive design, and technical SEO best practices for maximum search visibility." },
        ]}
        relatedServices={[
          { title: "Custom Software", href: "/services/custom-software-development-delhi" },
          { title: "Mobile App Development", href: "/services/mobile-app-development-delhi" },
          { title: "AI Development", href: "/services/ai-development-agency-delhi" },
          { title: "Blockchain & Web3", href: "/services/blockchain-web3-development-india" },
        ]}
      />
    </>
  );
}
