"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const stats = [
  { value: "600+", label: "Satisfaction Beyond Expectation" },
  { value: "794+", label: "Projects Completed" },
  { value: "42+", label: "Technologies Used" },
  { value: "96%", label: "Success Rate" },
];

const steps = [
  { number: "01", icon: "🔍", title: "Business Discovery", desc: "Deep dive into your business model, challenges, and growth opportunities." },
  { number: "02", icon: "📊", title: "Strategic Analysis", desc: "Analyze processes, identify bottlenecks, and evaluate AI/automation opportunities." },
  { number: "03", icon: "🎯", title: "Solution Design", desc: "Custom AI agents, automation workflows, and intelligent systems for your needs." },
  { number: "04", icon: "🚀", title: "Implementation Support", desc: "Guide your team through implementation, training, and seamless integration." },
  { number: "05", icon: "🤝", title: "Ongoing Partnership", desc: "Continuous optimization, monitoring, and strategic guidance for long-term growth." },
];

export function ImpactAndProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".animate-item"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-gutter">
        {/* ── Impact Numbers ── */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-accent font-mono text-xs uppercase tracking-widest mb-2 block">
            Results That Speak
          </span>
          <h2 className="text-brutalist text-2xl sm:text-3xl lg:text-display-md mb-2">
            Our Impact in Numbers
          </h2>
          <p className="text-xs sm:text-body-sm text-foreground-muted">
            Delivering exceptional results for businesses worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={cn(
                "animate-item text-center py-4 sm:py-6 px-3 sm:px-4",
                "border border-foreground/10",
                "hover:border-accent transition-colors duration-300"
              )}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-accent mb-1">
                {stat.value}
              </div>
              <p className="text-[10px] sm:text-xs text-foreground-muted uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Consultancy Process ── */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-accent font-mono text-xs uppercase tracking-widest mb-2 block">
            How We Work
          </span>
          <h2 className="text-brutalist text-2xl sm:text-3xl lg:text-display-md mb-2">
            Our Consultancy Process
          </h2>
          <p className="text-xs sm:text-body-sm text-foreground-muted max-w-2xl mx-auto px-4 sm:px-0">
            A proven methodology that ensures your business transformation is
            strategic, measurable, and sustainable
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className={cn(
                "animate-item text-center p-5",
                "border border-foreground/10",
                "hover:border-accent transition-all duration-300",
                "hover:-translate-y-1"
              )}
            >
              <span className="text-2xl block mb-2">{step.icon}</span>
              <span className="font-mono text-accent text-xs font-bold block mb-1">
                {step.number}
              </span>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-foreground-muted leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className={cn(
              "inline-block px-8 py-3 bg-primary text-primary-foreground",
              "font-display text-sm uppercase tracking-wider",
              "border-2 border-primary",
              "transition-all duration-300 ease-brutalist",
              "hover:bg-transparent hover:text-primary",
              "shadow-brutalist hover:shadow-brutalist-lg hover:-translate-y-1"
            )}
            data-cursor="hover"
          >
            Get Your 1st Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
