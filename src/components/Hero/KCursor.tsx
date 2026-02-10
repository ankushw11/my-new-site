"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Premium custom arrow-triangle cursor with "K." branding.
 * Clean triangle (no tail) — tip at top-left for pixel-perfect clicking.
 * "K." elegantly placed inside the triangle.
 * Designed with a 15+ year senior designer's eye for detail.
 * Hidden on touch/mobile devices.
 */
export function KCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);

    if (isTouch) {
      document.body.classList.remove("custom-cursor");
    } else {
      document.body.classList.add("custom-cursor");
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover" ||
        target.closest("[data-cursor='hover']");
      setIsHovering(!!isHoverable);
    };

    const animate = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.85;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.85;
      cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      animationFrame = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousemove", handleElementHover);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrame);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed top-0 left-0 z-cursor pointer-events-none",
        "transition-opacity duration-150",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      style={{ willChange: "transform" }}
    >
      <svg
        width={isHovering ? 32 : 26}
        height={isHovering ? 38 : 32}
        viewBox="0 0 26 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "transition-all duration-100 ease-out",
          "drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]",
          isClicking && "scale-[0.88]"
        )}
      >
        {/* Arrow triangle — tip at (1,1), clean shape, no tail */}
        <path
          d="M1 1 L1 28 L8 22 L14 31 L18 29 L12 20 L22 18 Z"
          fill="white"
          stroke="black"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* "K." text — elegantly placed inside the arrow body */}
        <text
          x="8"
          y="16"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          fontSize="8"
          fontWeight="700"
          fontFamily="'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif"
          letterSpacing="-0.3"
        >
          K.
        </text>
      </svg>
    </div>
  );
}
