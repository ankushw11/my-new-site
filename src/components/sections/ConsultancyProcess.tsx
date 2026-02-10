"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "Business Discovery",
    description:
      "Deep dive into your business model, challenges, and growth opportunities through comprehensive consultation sessions.",
  },
  {
    number: "02",
    icon: "📊",
    title: "Strategic Analysis",
    description:
      "Analyze your current processes, identify bottlenecks, and evaluate AI/automation opportunities for maximum impact.",
  },
  {
    number: "03",
    icon: "🎯",
    title: "Solution Design",
    description:
      "Design custom AI agents, automation workflows, and intelligent systems tailored to your specific business needs.",
  },
  {
    number: "04",
    icon: "🚀",
    title: "Implementation Support",
    description:
      "Guide your team through implementation, provide training, and ensure seamless integration with existing systems.",
  },
  {
    number: "05",
    icon: "🤝",
    title: "Ongoing Partnership",
    description:
      "Continuous optimization, monitoring, and strategic guidance to ensure long-term success and growth.",
  },
];

export function ConsultancyProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".process-step"),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
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
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-gutter">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-accent font-mono text-body-sm uppercase tracking-widest mb-4 block">
            How We Work
          </span>
          <h2 className="text-brutalist text-display-lg mb-4">
            Our Consultancy Process
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-3xl mx-auto">
            A proven methodology that ensures your business transformation is
            strategic, measurable, and sustainable
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "process-step flex gap-6 p-8",
                "border-2 border-foreground/10",
                "hover:border-accent transition-all duration-300",
                "hover:shadow-brutalist hover:-translate-y-1"
              )}
            >
              {/* Number + Icon */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <span className="text-4xl">{step.icon}</span>
                <span className="font-mono text-accent text-sm font-bold">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display text-xl font-bold uppercase tracking-wider mb-2">
                  {step.title}
                </h3>
                <p className="text-body-md text-foreground-muted">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className={cn(
              "inline-block px-8 py-4 bg-primary text-primary-foreground",
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
