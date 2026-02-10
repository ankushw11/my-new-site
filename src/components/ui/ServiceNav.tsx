"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

interface ServiceNavProps {
  services: Array<{
    id: string;
    number: string;
    title: string;
  }>;
}

export function ServiceNav({ services }: ServiceNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Register ScrollTrigger for each service section
    services.forEach((service, index) => {
      ScrollTrigger.create({
        trigger: `#${service.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    // Show/hide nav based on scroll position
    ScrollTrigger.create({
      trigger: "#services",
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => setIsVisible(true),
      onLeave: () => setIsVisible(false),
      onEnterBack: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [services]);

  useGSAP(
    () => {
      if (!navRef.current) return;

      gsap.to(navRef.current, {
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 20,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { dependencies: [isVisible] }
  );

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed right-8 top-1/2 -translate-y-1/2 z-header",
        "flex flex-col items-end gap-6",
        "opacity-0"
      )}
    >
      {services.map((service, index) => (
        <button
          key={service.id}
          onClick={() => handleClick(service.id)}
          className="group flex items-center gap-4"
          data-cursor="hover"
        >
          {/* Service title (hidden by default, shown on hover) */}
          <span
            className={cn(
              "text-sm font-display uppercase tracking-wider",
              "opacity-0 translate-x-4",
              "transition-all duration-300",
              "group-hover:opacity-100 group-hover:translate-x-0",
              activeIndex === index ? "text-accent" : "text-foreground-muted"
            )}
          >
            {service.title}
          </span>

          {/* Number and dot */}
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-xs font-mono",
                "transition-colors duration-300",
                activeIndex === index ? "text-accent" : "text-foreground-muted"
              )}
            >
              {service.number}
            </span>

            {/* Dot indicator */}
            <div
              className={cn(
                "relative w-3 h-3 rounded-full",
                "border-2 transition-all duration-300",
                activeIndex === index
                  ? "border-accent bg-accent scale-125"
                  : "border-foreground-muted bg-transparent",
                "group-hover:border-accent group-hover:scale-110"
              )}
            >
              {/* Active pulse effect */}
              {activeIndex === index && (
                <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-50" />
              )}
            </div>
          </div>
        </button>
      ))}

      {/* Progress line */}
      <div className="absolute right-[5px] top-0 bottom-0 w-px bg-foreground/10">
        <div
          className="absolute top-0 w-full bg-accent transition-all duration-500 ease-brutalist"
          style={{
            height: `${((activeIndex + 1) / services.length) * 100}%`,
          }}
        />
      </div>
    </nav>
  );
}
