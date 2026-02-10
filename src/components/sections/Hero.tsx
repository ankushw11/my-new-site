"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "@/components/three/Scene";
import { FloatingShape, GeometricTunnel } from "@/components/three/GeometricShapes";
import { GridShaderBackground } from "@/components/three/GridShaderBackground";
import { Monogram3DScroll } from "@/components/three/Monogram3D";
import { SplitText, RevealText } from "@/components/ui/SplitText";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress for logo animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Calculate progress based on first 30% of viewport scroll
      const progress = Math.min(scrollY / (windowHeight * 0.3), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || !contentRef.current) return;

      // Parallax effect on scroll
      gsap.to(contentRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade out content on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background with Monogram */}
      <div className="absolute inset-0 z-0">
        <Scene camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-5, 5, 5]} intensity={0.5} color="#ffffff" />
          
          {/* Animated grid shader background */}
          <GridShaderBackground
            color="#000000"
            opacity={0.08}
            gridSize={40}
            lineWidth={1}
          />
          
          {/* 3D Monogram - The Hero Element */}
          {/* Positioned between "THE FUTURE" and "ENGINEERED." text */}
          <group position={[0, 0.5, 0]}>
            <Monogram3DScroll scrollProgress={scrollProgress} scale={2.5} />
          </group>
          
          {/* Subtle floating geometric shapes in background */}
          <FloatingShape
            position={[-5, 3, -8]}
            shape="octahedron"
            scale={1}
            wireframe
            speed={0.3}
          />
          <FloatingShape
            position={[5, -2, -6]}
            shape="box"
            scale={0.8}
            wireframe
            speed={0.4}
          />
          <FloatingShape
            position={[-4, -3, -7]}
            shape="torus"
            scale={0.6}
            wireframe
            speed={0.35}
          />
          <FloatingShape
            position={[4, 4, -9]}
            shape="cone"
            scale={0.9}
            wireframe
            speed={0.25}
          />
          
          {/* Geometric tunnel in far background */}
          <GeometricTunnel segments={12} radius={10} length={40} />
        </Scene>
      </div>

      {/* Content - Text overlays around the 3D Monogram */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-gutter text-center pointer-events-none"
      >
        {/* Main headline - Above the monogram */}
        <h1 className="text-brutalist text-[12vw] md:text-[10vw] lg:text-display-xl leading-none mb-[-2vw]">
          <SplitText
            type="chars"
            animation="slide"
            trigger="load"
            stagger={0.03}
            duration={1}
          >
            THE FUTURE
          </SplitText>
        </h1>

        {/* Spacer for 3D Monogram - The monogram sits visually here */}
        <div className="h-[30vh] md:h-[35vh]" />

        {/* Tagline - Below the monogram */}
        <div className="overflow-hidden mb-8">
          <RevealText trigger="load" delay={0.5} duration={1.2}>
            <p className="text-[8vw] md:text-[6vw] lg:text-display-sm text-foreground-muted font-display tracking-tight leading-none">
              ENGINEERED.
            </p>
          </RevealText>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-12">
          <RevealText trigger="load" delay={0.8} duration={1}>
            <p className="text-body-lg text-foreground-muted">
              Elite IT services agency specializing in Web3, Blockchain, AI Agents,
              and cutting-edge software solutions.
            </p>
          </RevealText>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
          <a
            href="#services"
            className={cn(
              "group relative px-8 py-4 bg-primary text-primary-foreground",
              "font-display text-sm uppercase tracking-wider",
              "border-2 border-primary",
              "transition-all duration-300 ease-brutalist",
              "hover:bg-transparent hover:text-primary",
              "shadow-brutalist hover:shadow-brutalist-lg hover:-translate-y-1"
            )}
            data-cursor="hover"
          >
            Explore Services
          </a>
          <a
            href="#contact"
            className={cn(
              "group relative px-8 py-4 bg-transparent text-primary",
              "font-display text-sm uppercase tracking-wider",
              "border-2 border-primary",
              "transition-all duration-300 ease-brutalist",
              "hover:bg-primary hover:text-primary-foreground",
              "hover:-translate-y-1"
            )}
            data-cursor="hover"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#services"
          className="flex flex-col items-center gap-2 text-foreground-muted hover:text-primary transition-colors"
          data-cursor="hover"
        >
          <span className="text-caption uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
