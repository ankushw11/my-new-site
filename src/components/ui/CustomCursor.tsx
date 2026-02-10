"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        target.dataset.cursor === "hover";
      setIsHovering(isHoverable);
    };

    // Animation loop
    const animate = () => {
      // Cursor follows mouse with slight delay
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      // Follower has more delay
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

      requestAnimationFrame(animate);
    };

    // Event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousemove", handleElementHover);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Start animation
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // GSAP animations for state changes
  useGSAP(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    if (isHovering) {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(follower, {
        scale: 2,
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(follower, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isHovering]);

  useGSAP(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    if (isClicking) {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out",
      });
    } else {
      gsap.to(cursor, {
        scale: isHovering ? 1.5 : 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, [isClicking, isHovering]);

  return (
    <>
      {/* Main cursor - "K." text */}
      <div
        ref={cursorRef}
        className={cn(
          "fixed top-0 left-0 z-cursor pointer-events-none mix-blend-difference",
          "flex items-center justify-center",
          "transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{
          marginLeft: "-12px",
          marginTop: "-12px",
        }}
      >
        <span className="text-white font-bold text-sm tracking-tight select-none">
          K.
        </span>
      </div>

      {/* Follower - Red dot */}
      <div
        ref={followerRef}
        className={cn(
          "fixed top-0 left-0 z-cursor pointer-events-none",
          "w-3 h-3 rounded-full bg-accent",
          "transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{
          marginLeft: "-6px",
          marginTop: "-6px",
        }}
      />
    </>
  );
}
