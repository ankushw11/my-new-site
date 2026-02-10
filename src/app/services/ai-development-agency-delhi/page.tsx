import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "AI Development Agency Delhi — Custom AI Agents, LLM & Chatbot Solutions India",
  description:
    "KRAMATRIX is Delhi's #1 AI development agency. Custom AI agents, LLM fine-tuning, RAG pipelines, AI chatbots, machine learning solutions. 600+ projects, 96% success rate. Free consultation for businesses across India.",
  keywords: [
    "AI agency Delhi", "AI development company India", "AI agent development Delhi",
    "custom AI agents India", "AI chatbot development Delhi", "machine learning company India",
    "artificial intelligence agency Delhi NCR", "best AI company Delhi",
    "hire AI developers India", "AI solutions Delhi", "AI consulting India",
    "deep learning company Delhi", "NLP development India", "computer vision Delhi",
  ],
  alternates: { canonical: "https://kramatrix.com/services/ai-development-agency-delhi" },
  openGraph: {
    title: "AI Development Agency Delhi — Custom AI Agents & LLM Solutions | KRAMATRIX",
    description: "Delhi's leading AI development agency. Custom AI agents, LLM solutions, chatbots, ML systems. 600+ projects. Free consultation.",
    url: "https://kramatrix.com/services/ai-development-agency-delhi",
    type: "website",
    locale: "en_IN",
    images: [{ url: "https://kramatrix.com/logo.png", width: 1200, height: 630, alt: "KRAMATRIX AI Development Agency Delhi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Development Agency Delhi — KRAMATRIX",
    description: "Custom AI agents, LLM solutions, chatbots. Delhi's #1 AI agency. Free consultation.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://kramatrix.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://kramatrix.com/services" },
    { "@type": "ListItem", position: 3, name: "AI Development Agency Delhi", item: "https://kramatrix.com/services/ai-development-agency-delhi" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Development Agency in Delhi, India",
  description: "Custom AI agent development, LLM fine-tuning, RAG pipelines, AI chatbots, and machine learning solutions from Delhi's leading AI agency.",
  provider: { "@type": "Organization", name: "KRAMATRIX", url: "https://kramatrix.com" },
  areaServed: [{ "@type": "City", name: "Delhi" }, { "@type": "Country", name: "India" }],
  serviceType: "AI Development",
  url: "https://kramatrix.com/services/ai-development-agency-delhi",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR", name: "Free AI Consultation", description: "Get a free consultation for your AI project" },
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is the best AI development company in Delhi?", acceptedAnswer: { "@type": "Answer", text: "KRAMATRIX is recognized as Delhi's leading AI development agency with 600+ projects delivered and a 96% success rate. We specialize in custom AI agents, LLM solutions, AI chatbots, and enterprise ML systems." } },
    { "@type": "Question", name: "How much does AI agent development cost in India?", acceptedAnswer: { "@type": "Answer", text: "AI agent development costs in India range from ₹5 lakhs for basic chatbots to ₹50+ lakhs for enterprise autonomous AI systems. KRAMATRIX offers free consultations to provide accurate project estimates." } },
    { "@type": "Question", name: "Can KRAMATRIX build custom LLM solutions?", acceptedAnswer: { "@type": "Answer", text: "Yes, KRAMATRIX specializes in custom LLM development including fine-tuning GPT/Claude models, building RAG pipelines, prompt engineering, and enterprise LLM integration for businesses across India." } },
  ],
};

export default function AIServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />
      <ServicePageTemplate
        badge="AI & Machine Learning"
        title="AI Development Agency in Delhi"
        subtitle="Custom AI Agents, LLM Solutions & Intelligent Automation for Indian Businesses"
        description="KRAMATRIX is India's premier AI development agency headquartered in Delhi. We build custom AI agents, fine-tune large language models, develop RAG pipelines, create intelligent chatbots, and engineer machine learning solutions that transform businesses. With 600+ projects delivered and expertise in OpenAI GPT, Anthropic Claude, LangChain, PyTorch, and Hugging Face — we turn AI from buzzword to business advantage."
        features={[
          { title: "Custom AI Agent Development", description: "Autonomous AI agents that handle customer service, data analysis, decision-making, and workflow automation — tailored to your specific business processes." },
          { title: "LLM Fine-tuning & Integration", description: "Custom large language model solutions — fine-tuning GPT, Claude, Llama models on your data for domain-specific intelligence and enterprise applications." },
          { title: "RAG Pipeline Development", description: "Retrieval-Augmented Generation systems that combine your proprietary data with LLM capabilities for accurate, contextual AI responses." },
          { title: "AI Chatbot Development", description: "Intelligent conversational AI chatbots for customer support, sales, HR, and internal operations — powered by the latest NLP and LLM technologies." },
          { title: "Machine Learning Solutions", description: "Custom ML models for prediction, classification, recommendation, anomaly detection, and computer vision — from prototype to production deployment." },
          { title: "AI Consulting & Strategy", description: "Expert AI consulting from our Delhi team — identify AI opportunities, build roadmaps, and implement AI transformation strategies for your business." },
        ]}
        technologies={[
          "OpenAI GPT-4", "Anthropic Claude", "LangChain", "LlamaIndex", "PyTorch",
          "TensorFlow", "Hugging Face", "Pinecone", "Weaviate", "Chroma",
          "FastAPI", "Python", "Node.js", "Docker", "Kubernetes", "AWS SageMaker",
        ]}
        faqs={[
          { question: "What is the best AI development company in Delhi?", answer: "KRAMATRIX is recognized as Delhi's leading AI development agency with 600+ projects delivered and a 96% success rate. We specialize in custom AI agents, LLM solutions, AI chatbots, and enterprise ML systems. Our Delhi-based team serves clients across India and globally." },
          { question: "How much does AI agent development cost in India?", answer: "AI agent development costs in India range from ₹5 lakhs for basic chatbots to ₹50+ lakhs for enterprise-grade autonomous AI systems. The cost depends on complexity, integrations, and scale. KRAMATRIX offers free initial consultations to assess your requirements and provide detailed estimates." },
          { question: "Can KRAMATRIX build custom LLM solutions?", answer: "Yes, KRAMATRIX is India's premier LLM development company. We offer custom LLM fine-tuning, RAG pipeline development, prompt engineering, and enterprise AI integration using OpenAI GPT, Anthropic Claude, open-source models like Llama, and frameworks like LangChain and LlamaIndex." },
          { question: "How long does it take to develop an AI chatbot?", answer: "A basic AI chatbot can be developed in 2-4 weeks, while enterprise-grade conversational AI systems with custom training, multi-channel support, and complex integrations typically take 2-4 months. Contact our Delhi team for a project timeline estimate." },
        ]}
        relatedServices={[
          { title: "LLM & AI Agent Development", href: "/services/llm-ai-agent-development-india" },
          { title: "Custom Software Development", href: "/services/custom-software-development-delhi" },
          { title: "Blockchain & Web3", href: "/services/blockchain-web3-development-india" },
          { title: "CRM & ERP Solutions", href: "/services/custom-crm-erp-solutions-india" },
        ]}
      />
    </>
  );
}
