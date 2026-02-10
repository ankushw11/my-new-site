"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  color?: "black" | "white";
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

export function Logo({
  className,
  size = "md",
  animated = true,
  color = "black",
}: LogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!animated || !containerRef.current) return;

      // Initial animation
      gsap.fromTo(
        containerRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        }
      );

      // Hover animation
      const container = containerRef.current;

      const handleMouseEnter = () => {
        gsap.to(container, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(container, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: containerRef, dependencies: [animated] }
  );

  const px = sizeMap[size];

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ width: px, height: px }}
      data-cursor="hover"
    >
      <Image
        src="/logo.png"
        alt="KRAMATRIX Logo"
        width={px}
        height={px}
        className={cn(
          "w-full h-full object-contain",
          color === "white" && "invert"
        )}
        priority
      />
    </div>
  );
}

// Text logo variant
export function LogoText({
  className,
  color = "black",
}: {
  className?: string;
  color?: "black" | "white";
}) {
  return (
    <span
      className={cn(
        "font-display font-black text-2xl tracking-tighter",
        color === "black" ? "text-black" : "text-white",
        className
      )}
    >
      KRAMATRIX
    </span>
  );
}

// Combined logo with icon and text
export function LogoFull({
  className,
  size = "md",
  color = "black",
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Logo size={size} color={color} />
      <LogoText color={color} />
    </div>
  );
}
