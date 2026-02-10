"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  children: string;
  className?: string;
  type?: "chars" | "words" | "lines";
  animation?: "fade" | "slide" | "rotate" | "scale";
  trigger?: "load" | "scroll";
  stagger?: number;
  duration?: number;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}

export function SplitText({
  children,
  className,
  type = "chars",
  animation = "slide",
  trigger = "scroll",
  stagger = 0.02,
  duration = 0.8,
  delay = 0,
  as: Component = "div",
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<string[]>([]);

  useEffect(() => {
    if (type === "chars") {
      setElements(children.split(""));
    } else if (type === "words") {
      setElements(children.split(" "));
    } else {
      setElements(children.split("\n"));
    }
  }, [children, type]);

  useGSAP(
    () => {
      if (!containerRef.current || elements.length === 0) return;

      const chars = containerRef.current.querySelectorAll(".split-char");

      // Define animation properties based on type
      const getFromVars = () => {
        switch (animation) {
          case "fade":
            return { opacity: 0 };
          case "slide":
            return { opacity: 0, y: 50 };
          case "rotate":
            return { opacity: 0, rotationX: -90 };
          case "scale":
            return { opacity: 0, scale: 0 };
          default:
            return { opacity: 0, y: 50 };
        }
      };

      const getToVars = () => {
        switch (animation) {
          case "fade":
            return { opacity: 1 };
          case "slide":
            return { opacity: 1, y: 0 };
          case "rotate":
            return { opacity: 1, rotationX: 0 };
          case "scale":
            return { opacity: 1, scale: 1 };
          default:
            return { opacity: 1, y: 0 };
        }
      };

      const tl = gsap.timeline({
        paused: trigger === "scroll",
      });

      tl.fromTo(
        chars,
        getFromVars(),
        {
          ...getToVars(),
          duration,
          stagger: {
            each: stagger,
            from: "start",
          },
          ease: "power3.out",
          delay,
        }
      );

      if (trigger === "scroll") {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
        });
      } else {
        tl.play();
      }

      return () => {
        tl.kill();
      };
    },
    { scope: containerRef, dependencies: [elements, animation, trigger] }
  );

  return (
    <Component
      ref={containerRef}
      className={cn("split-text", className)}
      aria-label={children}
    >
      {elements.map((element, index) => (
        <span
          key={index}
          className={cn(
            "split-char inline-block",
            type === "words" && "mr-[0.25em]",
            element === " " && "w-[0.25em]"
          )}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {element === " " ? "\u00A0" : element}
        </span>
      ))}
    </Component>
  );
}

// Reveal text animation (clip-path based)
export function RevealText({
  children,
  className,
  trigger = "scroll",
  duration = 1,
  delay = 0,
  direction = "left",
}: {
  children: React.ReactNode;
  className?: string;
  trigger?: "load" | "scroll";
  duration?: number;
  delay?: number;
  direction?: "left" | "right" | "top" | "bottom";
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const getClipPath = () => {
        switch (direction) {
          case "left":
            return { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" };
          case "right":
            return { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" };
          case "top":
            return { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" };
          case "bottom":
            return { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" };
          default:
            return { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" };
        }
      };

      const { from, to } = getClipPath();

      const tl = gsap.timeline({ paused: trigger === "scroll" });

      tl.fromTo(
        containerRef.current,
        { clipPath: from },
        {
          clipPath: to,
          duration,
          ease: "power3.inOut",
          delay,
        }
      );

      if (trigger === "scroll") {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80%",
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
        });
      } else {
        tl.play();
      }

      return () => {
        tl.kill();
      };
    },
    { scope: containerRef, dependencies: [trigger, direction] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
