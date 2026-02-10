import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — KRAMATRIX | Web3, AI, Blockchain & Software Development Insights",
  description:
    "Expert insights on outsourcing Web3, AI, blockchain, and software development to India. Guides for CTOs, founders, and decision-makers from the USA, Europe, Dubai & Canada.",
  keywords: [
    "outsource software development India blog",
    "web3 development insights",
    "AI development outsourcing guide",
    "blockchain development India articles",
    "hire developers India blog",
    "KRAMATRIX blog",
    "IT outsourcing India insights",
    "software development trends 2025",
  ],
  alternates: { canonical: "https://kramatrix.com/blog" },
  openGraph: {
    title: "Blog — KRAMATRIX | Web3, AI, Blockchain & Software Development Insights",
    description:
      "Expert insights on outsourcing Web3, AI, blockchain, and software development to India from KRAMATRIX.",
    url: "https://kramatrix.com/blog",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://kramatrix.com/logo.png",
        width: 1200,
        height: 630,
        alt: "KRAMATRIX Blog — Web3, AI & Software Development Insights",
      },
    ],
  },
};

const blogPosts = [
  {
    slug: "why-top-companies-outsource-web3-blockchain-development-india-2025",
    category: "Web3 & Blockchain",
    title:
      "Why Top Companies in the USA and Europe Outsource Web3 and Blockchain Development to India in 2025",
    excerpt:
      "Discover why Fortune 500 companies and funded startups from New York, London, Zurich, and Dubai are choosing Indian blockchain agencies for smart contracts, DeFi protocols, and dApp development.",
    date: "February 10, 2025",
    readTime: "14 min read",
    author: "KRAMATRIX Editorial",
  },
  {
    slug: "how-to-hire-best-ai-agent-development-company-india",
    category: "AI & Machine Learning",
    title:
      "How to Hire the Best AI Agent Development Company in India — A Complete Guide for Global CTOs",
    excerpt:
      "A comprehensive guide for CTOs and technology leaders in the USA, Europe, and Middle East on evaluating, selecting, and partnering with India's top AI development agencies for custom AI agents and LLM solutions.",
    date: "February 10, 2025",
    readTime: "16 min read",
    author: "KRAMATRIX Editorial",
  },
  {
    slug: "india-vs-eastern-europe-vs-southeast-asia-outsource-software-development-2025",
    category: "Software Outsourcing",
    title:
      "India vs Eastern Europe vs Southeast Asia — Where Should You Outsource Custom Software Development in 2025?",
    excerpt:
      "An objective, data-driven comparison of the world's top three outsourcing destinations. Cost analysis, talent pool depth, timezone overlap, and quality benchmarks for decision-makers.",
    date: "February 10, 2025",
    readTime: "15 min read",
    author: "KRAMATRIX Editorial",
  },
  {
    slug: "outsourcing-mobile-app-development-india-dubai-switzerland-canada",
    category: "Mobile Development",
    title:
      "The Ultimate Guide to Outsourcing Mobile App Development to India from Dubai, Switzerland, and Canada",
    excerpt:
      "Everything you need to know about outsourcing iOS, Android, and cross-platform app development to India — from contract structures and IP protection to communication frameworks and delivery timelines.",
    date: "February 10, 2025",
    readTime: "15 min read",
    author: "KRAMATRIX Editorial",
  },
  {
    slug: "how-kramatrix-engineers-enterprise-web3-defi-ai-solutions-international-clients",
    category: "Case Study",
    title:
      "How KRAMATRIX Engineers Enterprise-Grade Web3, DeFi, and AI Solutions for International Clients",
    excerpt:
      "An inside look at KRAMATRIX's engineering methodology, technology stack, and delivery framework that has powered 794+ projects for clients across the USA, Europe, Dubai, and beyond.",
    date: "February 10, 2025",
    readTime: "13 min read",
    author: "KRAMATRIX Editorial",
  },
];

const blogIndexSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://kramatrix.com/blog/#blog",
  name: "KRAMATRIX Blog — Web3, AI, Blockchain & Software Development Insights",
  description:
    "Expert insights on outsourcing Web3, AI, blockchain, and software development to India from KRAMATRIX, India's #1 premium software development agency.",
  url: "https://kramatrix.com/blog",
  publisher: {
    "@type": "Organization",
    name: "KRAMATRIX",
    url: "https://kramatrix.com",
    logo: { "@type": "ImageObject", url: "https://kramatrix.com/logo.png" },
  },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `https://kramatrix.com/blog/${post.slug}`,
    datePublished: "2025-02-10",
    author: { "@type": "Organization", name: "KRAMATRIX" },
    publisher: { "@type": "Organization", name: "KRAMATRIX" },
  })),
};

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }}
      />
      <main className="relative">
        <Header />

        {/* Hero */}
        <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <span className="text-accent font-mono text-xs uppercase tracking-widest mb-4 block">
              Insights & Guides
            </span>
            <h1 className="text-brutalist text-4xl sm:text-5xl lg:text-display-lg mb-6">
              THE KRAMATRIX BLOG.
            </h1>
            <p className="text-lg sm:text-xl text-foreground-muted max-w-3xl">
              Expert insights on outsourcing Web3, AI, blockchain, and software
              development to India. Written for CTOs, founders, and
              decision-makers across the USA, Europe, Dubai, and Canada.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="pb-20 sm:pb-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="space-y-8">
              {blogPosts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block border border-foreground/10 p-6 sm:p-8 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-brutalist"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                    {/* Number */}
                    <span className="text-accent font-mono text-4xl sm:text-5xl font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex-1">
                      {/* Category & Meta */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="inline-block px-2 py-0.5 bg-accent/10 text-accent text-xs font-mono uppercase tracking-widest border border-accent/20">
                          {post.category}
                        </span>
                        <span className="text-xs text-foreground-muted">
                          {post.date}
                        </span>
                        <span className="text-xs text-foreground-muted">
                          · {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl sm:text-2xl font-display tracking-tight mb-3 group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-foreground-muted text-sm sm:text-base mb-4">
                        {post.excerpt}
                      </p>

                      {/* Read More */}
                      <span className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-accent">
                        Read Article
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground text-background py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <h2 className="text-brutalist text-3xl sm:text-4xl mb-6">
              READY TO BUILD THE FUTURE?
            </h2>
            <p className="text-background/70 text-lg mb-8 max-w-2xl mx-auto">
              Whether you need Web3, AI, blockchain, or custom software
              development — KRAMATRIX delivers enterprise-grade solutions from
              India to the world.
            </p>
            <a
              href="https://kramatrix.com/#contact"
              className="inline-block px-8 py-4 bg-background text-foreground text-sm font-display uppercase tracking-wider border-2 border-background transition-all duration-300 ease-brutalist hover:bg-transparent hover:text-background"
            >
              Get Free Consultation
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
