"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  ChevronRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface RelatedPost {
  title: string;
  href: string;
  category: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface BlogPostTemplateProps {
  category: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  readTime: string;
  heroImageAlt: string;
  tableOfContents: TableOfContentsItem[];
  children: React.ReactNode;
  faqs: BlogFAQ[];
  relatedPosts: RelatedPost[];
  relatedServices: { title: string; href: string }[];
  ctaTitle?: string;
  ctaDescription?: string;
}

export function BlogPostTemplate({
  category,
  title,
  subtitle,
  author,
  date,
  readTime,
  heroImageAlt,
  tableOfContents,
  children,
  faqs,
  relatedPosts,
  relatedServices,
  ctaTitle = "Ready to Build Your Next Project?",
  ctaDescription = "Get your free consultation with KRAMATRIX — India's #1 premium software development agency. Let's engineer the future together.",
}: BlogPostTemplateProps) {
  const articleRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!articleRef.current) return;

      gsap.fromTo(
        articleRef.current.querySelectorAll(".blog-animate"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    },
    { scope: articleRef }
  );

  // Track active section for TOC
  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    tableOfContents.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mounted, tableOfContents]);

  return (
    <main ref={articleRef} className="relative">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="blog-animate flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-foreground-muted mb-8">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-accent transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-accent">{category}</span>
          </nav>

          {/* Category Badge */}
          <div className="blog-animate mb-4">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-mono uppercase tracking-widest border border-accent/20">
              {category}
            </span>
          </div>

          {/* Title */}
          <h1 className="blog-animate text-brutalist text-3xl sm:text-4xl lg:text-5xl xl:text-display-lg mb-4 leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="blog-animate text-lg sm:text-xl text-foreground-muted mb-8 max-w-3xl">
            {subtitle}
          </p>

          {/* Meta */}
          <div className="blog-animate flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-foreground-muted border-t border-b border-foreground/10 py-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body with Sidebar TOC */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-12 max-w-7xl mx-auto">
            {/* Sticky Table of Contents — Desktop */}
            <aside className="hidden xl:block w-64 flex-shrink-0">
              <div className="sticky top-28">
                <h3 className="text-xs font-mono uppercase tracking-widest text-foreground-muted mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={cn(
                        "block text-sm transition-colors duration-200",
                        item.level === 2 ? "pl-0" : "pl-4",
                        activeSection === item.id
                          ? "text-accent font-medium"
                          : "text-foreground-muted hover:text-foreground"
                      )}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>

                {/* Related Services */}
                <div className="mt-8 pt-8 border-t border-foreground/10">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-foreground-muted mb-4">
                    Related Services
                  </h3>
                  <div className="space-y-2">
                    {relatedServices.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block text-sm text-foreground-muted hover:text-accent transition-colors"
                      >
                        → {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <article className="flex-1 max-w-4xl">
              {/* Mobile TOC */}
              <details className="xl:hidden mb-8 border border-foreground/10 p-4">
                <summary className="text-sm font-mono uppercase tracking-widest cursor-pointer text-foreground-muted">
                  Table of Contents
                </summary>
                <nav className="mt-4 space-y-2">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={cn(
                        "block text-sm text-foreground-muted hover:text-accent transition-colors",
                        item.level === 2 ? "pl-0" : "pl-4"
                      )}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </details>

              {/* Blog Content */}
              <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-foreground/80 prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-blockquote:border-accent prose-blockquote:text-foreground-muted prose-code:text-accent prose-code:bg-foreground/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-table:border-collapse prose-th:bg-foreground/5 prose-th:border prose-th:border-foreground/20 prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-foreground/20 prose-td:px-4 prose-td:py-2 prose-img:rounded-sm prose-li:text-foreground/80">
                {children}
              </div>

              {/* FAQ Section */}
              {faqs.length > 0 && (
                <section className="mt-16 pt-12 border-t border-foreground/10">
                  <h2
                    id="faq"
                    className="text-brutalist text-2xl sm:text-3xl mb-8"
                  >
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group border border-foreground/10 p-6 hover:border-accent/30 transition-colors"
                      >
                        <summary className="text-lg font-display cursor-pointer list-none flex items-start justify-between gap-4">
                          <span>{faq.question}</span>
                          <ChevronRight className="w-5 h-5 flex-shrink-0 mt-1 transition-transform group-open:rotate-90" />
                        </summary>
                        <p className="mt-4 text-foreground/70 leading-relaxed">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* CTA Section */}
              <section className="mt-16 bg-foreground text-background p-8 sm:p-12">
                <h2 className="text-brutalist text-2xl sm:text-3xl mb-4">
                  {ctaTitle}
                </h2>
                <p className="text-background/70 mb-8 max-w-2xl">
                  {ctaDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://kramatrix.com/#contact"
                    className={cn(
                      "inline-block px-8 py-4 bg-background text-foreground",
                      "text-sm font-display uppercase tracking-wider",
                      "border-2 border-background",
                      "transition-all duration-300 ease-brutalist",
                      "hover:bg-transparent hover:text-background",
                      "text-center"
                    )}
                  >
                    Get Free Consultation
                  </a>
                  <a
                    href="mailto:info@kramatrix.com"
                    className={cn(
                      "inline-block px-8 py-4 bg-transparent text-background",
                      "text-sm font-display uppercase tracking-wider",
                      "border-2 border-background/40",
                      "transition-all duration-300",
                      "hover:border-background hover:bg-background/10",
                      "text-center"
                    )}
                  >
                    Email Us Directly
                  </a>
                </div>
              </section>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section className="mt-16">
                  <h2 className="text-brutalist text-2xl mb-8">
                    Related Articles
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relatedPosts.map((post) => (
                      <Link
                        key={post.href}
                        href={post.href}
                        className="group block border border-foreground/10 p-6 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1"
                      >
                        <span className="text-xs font-mono uppercase tracking-widest text-accent mb-2 block">
                          {post.category}
                        </span>
                        <h3 className="text-lg font-display group-hover:text-accent transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Back to Blog */}
              <div className="mt-12 pt-8 border-t border-foreground/10">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-foreground-muted hover:text-accent transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to All Articles
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
