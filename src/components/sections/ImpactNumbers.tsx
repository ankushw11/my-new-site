"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const stats = [
  { value: "600+", label: "Satisfaction Beyond Expectation" },
  { value: "794+", label: "Projects Completed" },
  { value: "42+", label: "Technologies Used" },
  { value: "96%", label: "Success Rate" },
];

export function ImpactNumbers() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".stat-item"),
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
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
    <section
      ref={sectionRef}
      className="py-24 bg-primary text-primary-foreground"
    >
      <div className="container mx-auto px-gutter">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-accent font-mono text-body-sm uppercase tracking-widest mb-4 block">
            Results That Speak
          </span>
          <h2 className="text-brutalist text-display-lg mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-body-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Delivering exceptional results for businesses worldwide
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "stat-item text-center p-8",
                "border border-primary-foreground/20",
                "hover:border-accent transition-colors duration-300"
              )}
            >
              <div className="text-display-lg font-display font-black text-accent mb-2">
                {stat.value}
              </div>
              <p className="text-body-sm text-primary-foreground/70 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
