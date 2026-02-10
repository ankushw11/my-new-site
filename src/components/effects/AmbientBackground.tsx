"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * AmbientBackground — Subtle cinematic grain + gradient fog.
 * Optimized: renders at 15fps instead of 60fps, lower resolution.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * 0.15); // Even lower res for performance
      canvas.height = Math.floor(height * 0.15);
    };

    resize();
    window.addEventListener("resize", resize);

    let lastTime = 0;
    const targetInterval = 1000 / 15; // 15fps cap

    const drawGrain = (time: number) => {
      // Throttle to 15fps
      if (time - lastTime < targetInterval) {
        animRef.current = requestAnimationFrame(drawGrain);
        return;
      }
      lastTime = time;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Subtle gradient fog
      const t = time * 0.0001;
      const gx = Math.sin(t * 0.7) * w * 0.3 + w * 0.5;
      const gy = Math.cos(t * 0.5) * h * 0.3 + h * 0.5;

      const gradient = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.8);
      gradient.addColorStop(0, "rgba(245, 245, 245, 0.03)");
      gradient.addColorStop(0.5, "rgba(230, 230, 230, 0.02)");
      gradient.addColorStop(1, "rgba(220, 220, 220, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Sparse film grain (every 32nd pixel for performance)
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 32) {
        const noise = (Math.random() - 0.5) * 6;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
      }
      ctx.putImageData(imageData, 0, 0);

      animRef.current = requestAnimationFrame(drawGrain);
    };

    animRef.current = requestAnimationFrame(drawGrain);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 z-0",
        "w-full h-full",
        "pointer-events-none",
        "opacity-40"
      )}
      style={{
        imageRendering: "auto",
        mixBlendMode: "multiply",
      }}
      aria-hidden="true"
    />
  );
}
