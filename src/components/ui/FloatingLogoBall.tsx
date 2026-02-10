"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Floating logo ball that bounces around the viewport like a DVD screensaver.
 * Clicking it scrolls to the #contact section.
 * "Contact Us" tooltip cycles: visible 6s → hidden 5s.
 */
export function FloatingLogoBall() {
  const ballRef = useRef<HTMLAnchorElement>(null);
  const posRef = useRef({ x: 100, y: 200 });
  const velRef = useRef({ x: 2.2, y: 1.8 });
  const animRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const BALL_SIZE = isMobile ? 48 : 64;

  // Cycle tooltip: visible 6s → hidden 5s
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const cycle = () => {
      if (showTooltip) {
        // Currently visible → hide after 6s
        timeout = setTimeout(() => setShowTooltip(false), 6000);
      } else {
        // Currently hidden → show after 5s
        timeout = setTimeout(() => setShowTooltip(true), 5000);
      }
    };
    cycle();
    return () => clearTimeout(timeout);
  }, [showTooltip]);

  const animate = useCallback(() => {
    if (!ballRef.current) return;

    const pos = posRef.current;
    const vel = velRef.current;

    // Get viewport bounds
    const maxX = window.innerWidth - BALL_SIZE;
    const maxY = window.innerHeight - BALL_SIZE;

    // Update position
    pos.x += vel.x;
    pos.y += vel.y;

    // Bounce off walls
    if (pos.x <= 0) {
      pos.x = 0;
      vel.x = Math.abs(vel.x);
    } else if (pos.x >= maxX) {
      pos.x = maxX;
      vel.x = -Math.abs(vel.x);
    }

    if (pos.y <= 0) {
      pos.y = 0;
      vel.y = Math.abs(vel.y);
    } else if (pos.y >= maxY) {
      pos.y = maxY;
      vel.y = -Math.abs(vel.y);
    }

    // Apply position
    ballRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Start from a random position
    posRef.current = {
      x: Math.random() * (window.innerWidth - BALL_SIZE),
      y: Math.random() * (window.innerHeight - BALL_SIZE),
    };

    // Random direction with very gentle speed (slower float)
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.3;
    velRef.current = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [animate]);

  // Pause animation on hover
  useEffect(() => {
    if (isHovered) {
      cancelAnimationFrame(animRef.current);
    } else {
      animRef.current = requestAnimationFrame(animate);
    }
  }, [isHovered, animate]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      ref={ballRef}
      href="#contact"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "fixed top-0 left-0 z-50",
        "w-12 h-12 md:w-16 md:h-16 rounded-full",
        "bg-white shadow-2xl",
        "flex items-center justify-center",
        "cursor-pointer",
        "transition-shadow duration-300",
        "hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]",
        "group"
      )}
      style={{ willChange: "transform" }}
      title="Click to contact us!"
      data-cursor="hover"
    >
      {/* Logo image */}
      <Image
        src="/logo.png"
        alt="KRAMATRIX - Click to contact"
        width={48}
        height={48}
        className={cn(
          "w-9 h-9 md:w-12 md:h-12 object-contain rounded-full",
          "transition-transform duration-300",
          "group-hover:scale-110"
        )}
        priority
      />

      {/* Tooltip: cycles visible 6s / hidden 5s, always visible on hover */}
      <span
        className={cn(
          "absolute -bottom-8 left-1/2 -translate-x-1/2",
          "whitespace-nowrap px-3 py-1",
          "bg-black text-white text-xs font-display uppercase tracking-wider rounded",
          "transition-opacity duration-500",
          "pointer-events-none",
          showTooltip || isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        Contact Us
      </span>

      {/* Pulse ring */}
      <span
        className={cn(
          "absolute inset-0 rounded-full",
          "border-2 border-black/20",
          "animate-ping",
          "pointer-events-none"
        )}
        style={{ animationDuration: "3s" }}
      />
    </a>
  );
}
