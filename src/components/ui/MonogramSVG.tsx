"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * KRAMATRIX Monogram - Uses the actual logo PNG
 */

interface MonogramSVGProps {
  className?: string;
  size?: number;
  color?: string;
  animated?: boolean;
}

export function MonogramSVG({
  className,
  size = 40,
  color = "#000000",
  animated = true,
}: MonogramSVGProps) {
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
          scale: 1.05,
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

  const isWhite = color === "#FFFFFF" || color === "#ffffff" || color === "white";

  return (
    <div
      ref={containerRef}
      className={cn("cursor-pointer relative", className)}
      style={{ width: size, height: size }}
      data-cursor="hover"
    >
      <Image
        src="/logo.png"
        alt="KRAMATRIX"
        width={size}
        height={size}
        className={cn(
          "w-full h-full object-contain",
          isWhite && "invert"
        )}
        priority
      />
    </div>
  );
}

// Compact version for header
export function MonogramIcon({
  className,
  size = 32,
  color = "#000000",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <MonogramSVG
      className={className}
      size={size}
      color={color}
      animated={false}
    />
  );
}

// Full logo with monogram + text
export function MonogramLogo({
  className,
  size = 40,
  color = "#000000",
  showText = true,
}: {
  className?: string;
  size?: number;
  color?: string;
  showText?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <MonogramSVG size={size} color={color} />
      {showText && (
        <span
          className="font-display font-black text-xl tracking-tighter"
          style={{ color }}
        >
          KRAMATRIX
        </span>
      )}
    </div>
  );
}

export default MonogramSVG;
