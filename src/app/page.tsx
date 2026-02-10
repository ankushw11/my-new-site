"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText, RevealText } from "@/components/ui/SplitText";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

// ── Static imports (lightweight, needed immediately) ──
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { ImpactAndProcess } from "@/components/sections/ImpactAndProcess";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Loading skeleton for service sections ──
function ServiceSkeleton({
  id,
  number,
  title,
  light,
  dark,
}: {
  id: string;
  number: string;
  title: string;
  light?: boolean;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "min-h-screen flex items-center",
        dark ? "bg-[#0a0a0a]" : light ? "bg-[#faf8f5]" : "bg-background"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-accent font-mono text-body-lg">{number}</span>
              <div className="h-px flex-1 bg-foreground/20 max-w-[100px]" />
            </div>
            <h2
              className={cn(
                "text-brutalist text-3xl sm:text-4xl lg:text-display-md mb-6",
                dark && "text-white"
              )}
            >
              {title}
            </h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-4 rounded animate-pulse",
                    dark ? "bg-white/10" : "bg-foreground/10"
                  )}
                  style={{ width: `${80 - i * 15}%` }}
                />
              ))}
            </div>
          </div>
          <div className="relative aspect-square flex items-center justify-center">
            <div
              className={cn(
                "w-16 h-16 border-2 rounded-full animate-spin",
                dark
                  ? "border-white/20 border-t-accent"
                  : "border-foreground/20 border-t-accent"
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Service data for navigation
const services = [
  { id: "web3", number: "01", title: "Web3" },
  { id: "websites", number: "02", title: "Websites" },
  { id: "software", number: "03", title: "Software" },
  { id: "apps", number: "04", title: "Apps" },
  { id: "ai", number: "05", title: "AI" },
];

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !contentRef.current) return;

      // Parallax effect on scroll
      gsap.to(contentRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade out content on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-gutter text-center"
      >
        {/* Main headline */}
        <h1 className="text-brutalist text-4xl sm:text-5xl md:text-6xl lg:text-display-xl mb-4 sm:mb-6">
          <SplitText
            type="chars"
            animation="slide"
            trigger="load"
            stagger={0.03}
            duration={1}
          >
            THE FUTURE
          </SplitText>
        </h1>

        {/* Tagline */}
        <div className="overflow-hidden mb-8 sm:mb-12">
          <RevealText trigger="load" delay={0.5} duration={1.2}>
            <p className="text-xl sm:text-2xl md:text-display-sm text-foreground-muted font-display tracking-tight">
              ENGINEERED.
            </p>
          </RevealText>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-16">
          <RevealText trigger="load" delay={0.8} duration={1}>
            <p className="text-sm sm:text-base lg:text-body-lg text-foreground-muted px-4 sm:px-0">
              Elite IT services agency specializing in Web3, Blockchain, AI Agents,
              and cutting-edge software solutions.
            </p>
          </RevealText>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
          <a
            href="#contact"
            className={cn(
              "group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground",
              "font-display text-xs sm:text-sm uppercase tracking-wider",
              "border-2 border-primary",
              "transition-all duration-300 ease-brutalist",
              "hover:bg-transparent hover:text-primary",
              "shadow-brutalist hover:shadow-brutalist-lg hover:-translate-y-1",
              "text-center"
            )}
            data-cursor="hover"
          >
            Get Your 1st Free Consultation
          </a>
          <a
            href="#services"
            className={cn(
              "group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-primary",
              "font-display text-xs sm:text-sm uppercase tracking-wider",
              "border-2 border-primary",
              "transition-all duration-300 ease-brutalist",
              "hover:bg-primary hover:text-primary-foreground",
              "hover:-translate-y-1",
              "text-center"
            )}
            data-cursor="hover"
          >
            Explore Services
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#web3"
          className="flex flex-col items-center gap-2 text-foreground-muted hover:text-primary transition-colors"
          data-cursor="hover"
        >
          <span className="text-caption uppercase tracking-widest text-xs">Scroll</span>
          <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}

function ServicesIntro() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".animate-in"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="flex items-center justify-center py-20 sm:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-gutter text-center">
        <span className="animate-in text-accent font-mono text-xs sm:text-body-sm uppercase tracking-widest mb-3 sm:mb-4 block">
          What We Do
        </span>
        <h2 className="animate-in text-brutalist text-3xl sm:text-4xl lg:text-display-lg mb-6 sm:mb-8">
          <SplitText type="chars" animation="slide" stagger={0.02}>
            OUR SERVICES
          </SplitText>
        </h2>
        <p className="animate-in text-sm sm:text-base lg:text-body-lg text-foreground-muted max-w-2xl mx-auto px-4 sm:px-0">
          We engineer the future through cutting-edge technology solutions
          that push boundaries and deliver exceptional results.
        </p>
      </div>
    </section>
  );
}

/**
 * DynamicSections — renders all heavy 3D components ONLY after hydration.
 *
 * HYDRATION SAFETY:
 * - Server render: static skeletons (zero dynamic imports, zero Suspense)
 * - Client hydration pass: same static skeletons (mounted=false, matches server)
 * - Post-hydration (useEffect fires): imports and renders actual components
 *
 * Components are imported via dynamic import() inside useEffect to guarantee
 * they never participate in SSR or hydration reconciliation.
 */
function DynamicSections() {
  const [mounted, setMounted] = useState(false);
  const [components, setComponents] = useState<{
    ServiceWeb3: React.ComponentType | null;
    ServiceWebsites: React.ComponentType | null;
    ServiceSoftware: React.ComponentType | null;
    ServiceApps: React.ComponentType | null;
    ServiceAI: React.ComponentType | null;
    FloatingLogoBall: React.ComponentType | null;
    ServiceNav: React.ComponentType<{ services: typeof services }> | null;
  }>({
    ServiceWeb3: null,
    ServiceWebsites: null,
    ServiceSoftware: null,
    ServiceApps: null,
    ServiceAI: null,
    FloatingLogoBall: null,
    ServiceNav: null,
  });

  useEffect(() => {
    setMounted(true);

    // Import all components after hydration is complete
    Promise.all([
      import("@/components/sections/ServiceWeb3").then((m) => m.ServiceWeb3),
      import("@/components/sections/ServiceWebsites").then((m) => m.ServiceWebsites),
      import("@/components/sections/ServiceSoftware").then((m) => m.ServiceSoftware),
      import("@/components/sections/ServiceApps").then((m) => m.ServiceApps),
      import("@/components/sections/ServiceAI").then((m) => m.ServiceAI),
      import("@/components/ui/FloatingLogoBall").then((m) => m.FloatingLogoBall),
      import("@/components/ui/ServiceNav").then((m) => m.ServiceNav),
    ]).then(([Web3, Websites, Software, Apps, AI, Ball, Nav]) => {
      setComponents({
        ServiceWeb3: Web3,
        ServiceWebsites: Websites,
        ServiceSoftware: Software,
        ServiceApps: Apps,
        ServiceAI: AI,
        FloatingLogoBall: Ball,
        ServiceNav: Nav as React.ComponentType<{ services: typeof services }>,
      });
    });
  }, []);

  // During SSR and hydration: render static skeletons only.
  // No dynamic imports, no Suspense boundaries, no BailoutToCSR.
  if (!mounted || !components.ServiceWeb3) {
    return (
      <>
        <ServiceSkeleton id="web3" number="01" title="WEB3 ARCHITECTURE" />
        <ServiceSkeleton id="websites" number="02" title="DIGITAL PRESENCE" light />
        <ServiceSkeleton id="software" number="03" title="SYSTEMS ENGINEERING" />
        <ServiceSkeleton id="apps" number="04" title="NATIVE EXPERIENCES" light />
        <ServiceSkeleton id="ai" number="05" title="ARTIFICIAL INTELLIGENCE" dark />
      </>
    );
  }

  // After hydration + imports complete: render actual components
  const {
    ServiceWeb3: Web3,
    ServiceWebsites: Websites,
    ServiceSoftware: Software,
    ServiceApps: Apps,
    ServiceAI: AI,
    FloatingLogoBall: Ball,
    ServiceNav: Nav,
  } = components;

  return (
    <>
      {Ball && <Ball />}
      {Nav && <Nav services={services} />}
      <Web3 />
      <Websites />
      <Software />
      <Apps />
      <AI />
    </>
  );
}

export default function Home() {
  return (
    <main className="relative">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Services Intro */}
      <ServicesIntro />
      
      {/* Dynamic 3D service sections — mounted after hydration */}
      <DynamicSections />
      
      {/* Impact Numbers + Consultancy Process (combined compact) */}
      <ImpactAndProcess />
      
      {/* Contact Section with Form */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
