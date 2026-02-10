import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "LLM & AI Agent Development Company India — Custom GPT, RAG, Chatbots Delhi",
  description:
    "KRAMATRIX is India's top LLM development company based in Delhi. Custom GPT fine-tuning, RAG pipelines, AI agents, enterprise chatbots, prompt engineering. Large language model solutions for Indian businesses. Free consultation.",
  keywords: [
    "LLM development company India", "large language model solutions Delhi",
    "LLM development company Delhi", "AI agent development India",
    "custom GPT development India", "RAG pipeline development Delhi",
    "prompt engineering company India", "enterprise AI chatbot Delhi",
    "hire LLM developers India", "custom AI bots India",
    "business-specific AI bots India", "AI chatbot development Delhi",
    "GPT fine-tuning India", "Claude integration Delhi",
    "LangChain development India", "conversational AI company Delhi",
  ],
  alternates: { canonical: "https://kramatrix.com/services/llm-ai-agent-development-india" },
  openGraph: {
    title: "LLM & AI Agent Development Company India | KRAMATRIX Delhi",
    description: "India's top LLM company. Custom GPT, RAG pipelines, AI agents, chatbots. Based in Delhi. Free consultation.",
    url: "https://kramatrix.com/services/llm-ai-agent-development-india",
    type: "website", locale: "en_IN",
    images: [{ url: "https://kramatrix.com/logo.png", width: 1200, height: 630, alt: "KRAMATRIX LLM AI Agent Development India" }],
  },
};

const schemas = [
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://kramatrix.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://kramatrix.com/services" },
    { "@type": "ListItem", position: 3, name: "LLM & AI Agent Development India", item: "https://kramatrix.com/services/llm-ai-agent-development-india" },
  ]},
  { "@context": "https://schema.org", "@type": "Service", name: "LLM & AI Agent Development Company in India",
    description: "Custom large language model solutions — LLM fine-tuning, RAG pipelines, AI agent development, prompt engineering from India's top LLM company.",
    provider: { "@type": "Organization", name: "KRAMATRIX" }, areaServed: ["Delhi", "India"],
    serviceType: "LLM Development", url: "https://kramatrix.com/services/llm-ai-agent-development-india" },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
    { "@type": "Question", name: "What is the best LLM development company in India?", acceptedAnswer: { "@type": "Answer", text: "KRAMATRIX is India's premier LLM development company based in Delhi. We specialize in custom GPT fine-tuning, RAG pipeline development, AI agent creation, and enterprise LLM integration using OpenAI, Anthropic Claude, LangChain, and open-source models." } },
    { "@type": "Question", name: "How much does custom LLM development cost in India?", acceptedAnswer: { "@type": "Answer", text: "Custom LLM development costs in India range from ₹5-15 lakhs for basic fine-tuning and chatbots, ₹20-50 lakhs for RAG systems with custom knowledge bases, and ₹50+ lakhs for enterprise-grade autonomous AI agent platforms. Contact KRAMATRIX for a free consultation." } },
    { "@type": "Question", name: "Can KRAMATRIX build custom AI agents for my business?", acceptedAnswer: { "@type": "Answer", text: "Yes, KRAMATRIX builds custom AI agents tailored to your specific business needs — from customer service agents and sales assistants to data analysis agents and workflow automation bots. Our Delhi-based team uses the latest LLM technologies including GPT-4, Claude, LangChain, and custom fine-tuned models." } },
  ]},
];

export default function LLMServicePage() {
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <ServicePageTemplate
        badge="LLM & AI Agents"
        title="LLM & AI Agent Development Company India"
        subtitle="Custom GPT, RAG Pipelines & Intelligent AI Agents from Delhi"
        description="KRAMATRIX is India's premier LLM development company, headquartered in Delhi. We build custom large language model solutions — from fine-tuning GPT and Claude on your proprietary data to developing autonomous AI agents that handle complex business workflows. Our expertise spans RAG pipeline architecture, prompt engineering, multi-agent systems, and enterprise LLM integration. We turn the power of large language models into tangible business outcomes."
        features={[
          { title: "Custom LLM Fine-tuning", description: "Fine-tune GPT-4, Claude, Llama, Mistral, and other models on your domain-specific data for accurate, contextual AI that understands your business." },
          { title: "RAG Pipeline Development", description: "Retrieval-Augmented Generation systems that combine your proprietary knowledge base with LLM capabilities — accurate answers grounded in your data." },
          { title: "Autonomous AI Agents", description: "Multi-step AI agents that can research, analyze, decide, and act — from customer service automation to complex data processing workflows." },
          { title: "Enterprise Chatbot Development", description: "Intelligent conversational AI for customer support, internal helpdesk, sales qualification, and HR — powered by your custom-trained LLMs." },
          { title: "Prompt Engineering & Optimization", description: "Expert prompt engineering to maximize LLM performance — chain-of-thought reasoning, few-shot learning, and systematic prompt optimization." },
          { title: "Multi-Agent Systems", description: "Orchestrated multi-agent architectures where specialized AI agents collaborate — research agents, writing agents, coding agents working together." },
        ]}
        technologies={[
          "OpenAI GPT-4", "Anthropic Claude", "Meta Llama", "Mistral",
          "LangChain", "LlamaIndex", "CrewAI", "AutoGen",
          "Pinecone", "Weaviate", "Chroma", "Qdrant",
          "Python", "FastAPI", "Docker", "AWS Bedrock",
        ]}
        faqs={[
          { question: "What is the best LLM development company in India?", answer: "KRAMATRIX is India's premier LLM development company based in Delhi. We specialize in custom GPT fine-tuning, RAG pipeline development, AI agent creation, and enterprise LLM integration using OpenAI, Anthropic Claude, LangChain, and open-source models like Llama and Mistral." },
          { question: "How much does custom LLM development cost in India?", answer: "Custom LLM development costs in India range from ₹5-15 lakhs for basic fine-tuning and chatbots, ₹20-50 lakhs for RAG systems with custom knowledge bases, and ₹50+ lakhs for enterprise-grade autonomous AI agent platforms. KRAMATRIX offers free consultations for accurate estimates." },
          { question: "Can KRAMATRIX build custom AI agents for my business?", answer: "Yes, we build custom AI agents tailored to your specific business needs — customer service agents, sales assistants, data analysis agents, content creation agents, and workflow automation bots. Our Delhi team uses GPT-4, Claude, LangChain, CrewAI, and custom fine-tuned models." },
          { question: "What is RAG and why do I need it?", answer: "RAG (Retrieval-Augmented Generation) combines your proprietary data with LLM capabilities. Instead of relying solely on the LLM's training data, RAG retrieves relevant information from your documents, databases, and knowledge bases to generate accurate, contextual responses. It's essential for enterprise AI that needs to be grounded in your specific business data." },
        ]}
        relatedServices={[
          { title: "AI Development", href: "/services/ai-development-agency-delhi" },
          { title: "Custom Software", href: "/services/custom-software-development-delhi" },
          { title: "CRM & ERP Solutions", href: "/services/custom-crm-erp-solutions-india" },
          { title: "Blockchain & Web3", href: "/services/blockchain-web3-development-india" },
        ]}
      />
    </>
  );
}
