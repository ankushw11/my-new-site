"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceFeature {
  title: string;
  description: string;
}

interface ServiceFAQ {
  question: string;
  answer: string;
}

interface RelatedService {
  title: string;
  href: string;
}

interface ServicePageProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: ServiceFeature[];
  technologies: string[];
  faqs: ServiceFAQ[];
  relatedServices: RelatedService[];
  ctaText?: string;
}

export function ServicePageTemplate({
  badge,
  title,
  subtitle,
  description,
  features,
  technologies,
  faqs,
  relatedServices,
  ctaText = "Get Your Free Consultation",
}: ServicePageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md" aria-label="Service page navigation">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-display uppercase tracking-wider hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="KRAMATRIX — AI & Software Development Agency Delhi, India"
              width={28}
              height={28}
              className="invert dark:invert-0"
            />
            <span className="text-xs font-mono text-foreground/40 uppercase tracking-widest">
              Services
            </span>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="pt-32 pb-16 px-6" aria-label="Service overview">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block text-[10px] font-mono text-accent uppercase tracking-[0.3em] border border-accent/30 px-3 py-1 mb-6">
            {badge}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase leading-[0.95] tracking-tight mb-6">
            {title}
          </h1>
          <h2 className="text-xl md:text-2xl font-display text-foreground/60 uppercase tracking-wider mb-8">
            {subtitle}
          </h2>
          <p className="max-w-3xl text-foreground/50 text-sm md:text-base leading-relaxed font-mono">
            {description}
          </p>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* ── Features / What We Offer ── */}
      <section className="py-16 px-6" aria-label="Service features">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-wider mb-12">
            <span className="text-foreground/30 mr-2">//</span>
            What We Deliver
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <article
                key={i}
                className="border border-foreground/10 p-6 hover:border-foreground/30 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <h3 className="text-sm font-display font-bold uppercase tracking-wider">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs text-foreground/50 leading-relaxed pl-8">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technologies ── */}
      <section className="py-12 px-6 bg-foreground/[0.02]" aria-label="Technologies used">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-display font-black uppercase tracking-wider mb-8">
            <span className="text-foreground/30 mr-2">//</span>
            Technologies We Use
          </h2>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 border border-foreground/10 text-xs font-mono text-foreground/60 hover:border-accent hover:text-accent transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why KRAMATRIX ── */}
      <section className="py-16 px-6" aria-label="Why choose KRAMATRIX">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-wider mb-8">
            <span className="text-foreground/30 mr-2">//</span>
            Why Choose KRAMATRIX
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "600+", label: "Projects Delivered" },
              { value: "96%", label: "Success Rate" },
              { value: "42+", label: "Technologies" },
              { value: "24hr", label: "Response Time" },
            ].map((stat) => (
              <div key={stat.label} className="border border-foreground/10 p-4 text-center">
                <div className="text-2xl font-display font-black text-accent">{stat.value}</div>
                <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>Based in Delhi, India — serving globally</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>Free first consultation — no commitment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>End-to-end development & support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-16 px-6 bg-foreground/[0.02]" aria-label="Frequently asked questions">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-wider mb-12">
            <span className="text-foreground/30 mr-2">//</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-4xl">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-foreground/10 open:border-accent/30">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-foreground/[0.02] transition-colors">
                  <h3 className="text-sm font-display font-bold uppercase tracking-wider pr-4">
                    {faq.question}
                  </h3>
                  <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-16 px-6 border-t border-foreground/10" aria-label="Contact us">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-display font-black uppercase tracking-wider mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-sm text-foreground/50 font-mono mb-8 max-w-lg mx-auto">
            Contact our Delhi-based team for a free consultation. We respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/#contact"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-3",
                "bg-foreground text-background",
                "text-sm font-display font-bold uppercase tracking-wider",
                "hover:bg-accent transition-colors duration-300"
              )}
            >
              {ctaText}
            </Link>
            <Link
              href="/stack"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-3",
                "border border-foreground/20",
                "text-sm font-display uppercase tracking-wider",
                "hover:border-foreground/50 transition-colors duration-300"
              )}
            >
              View Our Tech Stack
            </Link>
          </div>
          {/* Contact Info — NAP for GEO-SEO */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-foreground/40 font-mono">
            <a href="tel:+917291056360" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone className="w-3 h-3" /> +91-72910-56360
            </a>
            <a href="mailto:info@kramatrix.com" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Mail className="w-3 h-3" /> info@kramatrix.com
            </a>
            <a href="https://wa.me/917291056360" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent transition-colors">
              <MessageCircle className="w-3 h-3" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Related Services ── */}
      <section className="py-12 px-6 border-t border-foreground/10" aria-label="Related services">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-display font-black uppercase tracking-wider mb-6">
            Related Services
          </h2>
          <div className="flex flex-wrap gap-3">
            {relatedServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="px-4 py-2 border border-foreground/10 text-xs font-display uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
              >
                {service.title} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-foreground/10 py-8 px-6" role="contentinfo">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="KRAMATRIX Logo"
              width={24}
              height={24}
              className="invert dark:invert-0"
            />
            <span className="text-xs font-mono text-foreground/30">
              © {new Date().getFullYear()} KRAMATRIX — Delhi, India
            </span>
          </div>
          <address className="not-italic text-xs font-mono text-foreground/30">
            Delhi, India · info@kramatrix.com · +91-72910-56360
          </address>
        </div>
      </footer>
    </main>
  );
}
