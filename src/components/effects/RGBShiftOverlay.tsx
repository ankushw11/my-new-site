"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RGBShiftOverlayProps {
  enabled?: boolean;
  maxShift?: number;
  className?: string;
}

export function RGBShiftOverlay({
  enabled = true,
  maxShift = 8,
  className = "",
}: RGBShiftOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [velocity, setVelocity] = useState(0);
  const lastScrollRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let lastTime = performance.now();
    let lastScroll = window.scrollY;

    const updateVelocity = () => {
      const currentTime = performance.now();
      const currentScroll = window.scrollY;
      const deltaTime = currentTime - lastTime;
      const deltaScroll = Math.abs(currentScroll - lastScroll);

      // Calculate velocity (pixels per millisecond)
      const instantVelocity = deltaScroll / Math.max(deltaTime, 1);
      
      // Smooth the velocity
      velocityRef.current += (instantVelocity - velocityRef.current) * 0.15;
      
      // Decay when not scrolling
      if (deltaScroll < 1) {
        velocityRef.current *= 0.9;
      }

      // Clamp velocity to reasonable range (0-1)
      const normalizedVelocity = Math.min(velocityRef.current * 0.5, 1);
      setVelocity(normalizedVelocity);

      lastTime = currentTime;
      lastScroll = currentScroll;

      rafRef.current = requestAnimationFrame(updateVelocity);
    };

    rafRef.current = requestAnimationFrame(updateVelocity);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  const shift = velocity * maxShift;

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 pointer-events-none z-[9999] ${className}`}
      style={{
        mixBlendMode: "screen",
      }}
    >
      {/* Red channel shift */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, rgba(255,0,0,${velocity * 0.15}) 0%, transparent 50%)`,
          transform: `translate(${shift}px, ${-shift * 0.5}px)`,
          transition: "transform 0.05s ease-out",
        }}
      />
      
      {/* Blue channel shift */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(-45deg, rgba(0,0,255,${velocity * 0.15}) 0%, transparent 50%)`,
          transform: `translate(${-shift}px, ${shift * 0.5}px)`,
          transition: "transform 0.05s ease-out",
        }}
      />

      {/* Scan lines effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,${velocity * 0.03}) 2px,
            rgba(0,0,0,${velocity * 0.03}) 4px
          )`,
          opacity: velocity > 0.1 ? 1 : 0,
          transition: "opacity 0.1s ease-out",
        }}
      />

      {/* Vignette that intensifies with scroll */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,${velocity * 0.2}) 100%)`,
          transition: "background 0.1s ease-out",
        }}
      />
    </div>
  );
}

// Alternative: Canvas-based RGB shift for better performance
export function CanvasRGBShift({ enabled = true }: { enabled?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const velocityRef = useRef(0);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastScroll = window.scrollY;
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      const currentScroll = window.scrollY;
      const deltaScroll = Math.abs(currentScroll - lastScroll);
      
      // Update velocity
      const targetVelocity = Math.min(deltaScroll * 0.02, 1);
      velocityRef.current += (targetVelocity - velocityRef.current) * 0.1;
      
      if (deltaScroll < 1) {
        velocityRef.current *= 0.92;
      }

      lastScroll = currentScroll;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const velocity = velocityRef.current;

      if (velocity > 0.01) {
        const shift = velocity * 10;

        // Red channel
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = `rgba(255, 0, 0, ${velocity * 0.1})`;
        ctx.fillRect(shift, -shift * 0.5, canvas.width, canvas.height);

        // Blue channel
        ctx.fillStyle = `rgba(0, 0, 255, ${velocity * 0.1})`;
        ctx.fillRect(-shift, shift * 0.5, canvas.width, canvas.height);

        // Scan lines
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = `rgba(0, 0, 0, ${velocity * 0.05})`;
        ctx.lineWidth = 1;
        for (let y = 0; y < canvas.height; y += 4) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// Hook to get scroll velocity for use in other components
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    let lastScroll = window.scrollY;
    let rafId: number;

    const update = () => {
      const currentScroll = window.scrollY;
      const delta = Math.abs(currentScroll - lastScroll);
      
      const target = Math.min(delta * 0.02, 1);
      velocityRef.current += (target - velocityRef.current) * 0.1;
      
      if (delta < 1) {
        velocityRef.current *= 0.92;
      }

      setVelocity(velocityRef.current);
      lastScroll = currentScroll;
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return velocity;
}
