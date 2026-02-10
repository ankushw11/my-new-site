"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "@/components/three/Scene";
import { SplitText, RevealText } from "@/components/ui/SplitText";
import { cn } from "@/lib/utils";
import { Code2, ArrowRight } from "lucide-react";

// Brutalist monolithic structure component
function MonolithicStructure({ 
  position, 
  scale, 
  scrollProgress,
  delay 
}: { 
  position: [number, number, number];
  scale: number;
  scrollProgress: number;
  delay: number;
}) {
  const meshRef = useRef<THREE.Group>(null);

  // Calculate assembly progress based on scroll
  const assemblyProgress = Math.max(0, Math.min(1, (scrollProgress - delay) * 3));

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay * 10) * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  // Scattered positions for assembly animation
  const scatterOffset = useMemo(() => ({
    x: (Math.random() - 0.5) * 8,
    y: (Math.random() - 0.5) * 8,
    z: (Math.random() - 0.5) * 8,
    rotX: Math.random() * Math.PI * 2,
    rotY: Math.random() * Math.PI * 2,
    rotZ: Math.random() * Math.PI * 2,
  }), []);

  const currentPos: [number, number, number] = [
    THREE.MathUtils.lerp(scatterOffset.x, position[0], assemblyProgress),
    THREE.MathUtils.lerp(scatterOffset.y, position[1], assemblyProgress),
    THREE.MathUtils.lerp(scatterOffset.z, position[2], assemblyProgress),
  ];

  const currentRot: [number, number, number] = [
    THREE.MathUtils.lerp(scatterOffset.rotX, 0, assemblyProgress),
    THREE.MathUtils.lerp(scatterOffset.rotY, 0, assemblyProgress),
    THREE.MathUtils.lerp(scatterOffset.rotZ, 0, assemblyProgress),
  ];

  return (
    <group ref={meshRef} position={currentPos} rotation={currentRot} scale={scale}>
      {/* Main concrete block */}
      <mesh>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Glass panel overlay */}
      <mesh position={[0.51, 0, 0]}>
        <boxGeometry args={[0.02, 1.8, 0.8]} />
        <meshStandardMaterial
          color="#88ccff"
          emissive="#4488aa"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Red accent strip */}
      <mesh position={[0, 0.9, 0.51]}>
        <boxGeometry args={[0.8, 0.15, 0.02]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={1} />
      </mesh>

      {/* Wireframe overlay */}
      <mesh scale={1.02}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="#66ffff" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Main visualization component
function SystemsVisualization({ scrollProgress = 0, isMobile = false }: { scrollProgress?: number; isMobile?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate monolithic structures — fewer on mobile
  const structures = useMemo(() => {
    const items: Array<{
      position: [number, number, number];
      scale: number;
      delay: number;
    }> = [];

    // Central tower
    items.push({ position: [0, 0, 0], scale: 1.5, delay: 0 });
    
    // Surrounding structures
    const angleCount = isMobile ? 4 : 6;
    const angles = Array.from({ length: angleCount }, (_, i) => (i / angleCount) * Math.PI * 2);
    angles.forEach((angle, i) => {
      const radius = 2.5;
      items.push({
        position: [
          Math.cos(angle) * radius,
          -0.5 + (i % 3) * 0.2,
          Math.sin(angle) * radius,
        ],
        scale: 0.8 + (i % 3) * 0.15,
        delay: 0.1 + i * 0.05,
      });
    });

    // Additional smaller structures — skip on mobile
    if (!isMobile) {
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + 0.5;
        const radius = 3.5 + (i % 2) * 0.5;
        items.push({
          position: [
            Math.cos(angle) * radius,
            -1 + (i % 2) * 0.3,
            Math.sin(angle) * radius,
          ],
          scale: 0.4 + (i % 3) * 0.1,
          delay: 0.2 + i * 0.03,
        });
      }
    }

    return items;
  }, [isMobile]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  const particleCount = isMobile ? 15 : 30;

  return (
    <group ref={groupRef}>
      {/* Ground plane with grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20, 15, 15]} />
        <meshStandardMaterial color="#00ffff" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Monolithic structures */}
      {structures.map((structure, i) => (
        <MonolithicStructure
          key={i}
          position={structure.position}
          scale={structure.scale}
          scrollProgress={scrollProgress}
          delay={structure.delay}
        />
      ))}

      {/* Ambient particles — reduced count */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0} floatIntensity={0.5}>
          <mesh
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 10,
            ]}
            scale={i % 3 === 0 ? 0.08 : 0.05}
          >
            <sphereGeometry args={[1, 6, 6]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#FF0000" : i % 3 === 1 ? "#00ffff" : "#ffffff"}
              emissive={i % 3 === 0 ? "#FF0000" : i % 3 === 1 ? "#00aaaa" : "#444444"}
              emissiveIntensity={i % 3 === 0 ? 1.5 : 0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Scene wrapper
function SoftwareScene({ scrollProgress, isMobile }: { scrollProgress: number; isMobile: boolean }) {
  return (
    <Scene camera={{ position: [5, 3, 8], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      {!isMobile && <directionalLight position={[-5, 5, 10]} intensity={0.5} color="#aaccff" />}
      <pointLight position={[-5, 5, -5]} intensity={0.8} color="#FF0000" />
      <pointLight position={[5, 2, 5]} intensity={0.5} color="#FF3333" />
      <fog attach="fog" args={["#0a0a0a", 15, 35]} />
      <SystemsVisualization scrollProgress={scrollProgress} isMobile={isMobile} />
    </Scene>
  );
}

export function ServiceSoftware() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || !contentRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      gsap.fromTo(
        contentRef.current.querySelectorAll(".animate-in"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="software"
      className="relative min-h-screen flex items-center bg-background-dark text-foreground-light overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="relative z-10 order-1">
            <div className="animate-in flex items-center gap-4 mb-4 sm:mb-6">
              <span className="text-accent font-mono text-base sm:text-body-lg">03</span>
              <div className="h-px flex-1 bg-foreground-light/20 max-w-[100px]" />
            </div>

            <div className="animate-in mb-4 sm:mb-6">
              <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-foreground-light" />
            </div>

            <h2 className="animate-in text-brutalist text-2xl sm:text-3xl lg:text-display-md mb-4 sm:mb-6 text-foreground-light">
              <SplitText type="words" animation="slide" stagger={0.05}>
                SYSTEMS ENGINEERING
              </SplitText>
            </h2>

            <div className="animate-in">
              <RevealText>
                <p className="text-sm sm:text-base lg:text-body-lg text-foreground-light/70 mb-6 sm:mb-8 max-w-lg">
                  Enterprise software architecture designed for performance millions depend on.
                  Robust backend systems built with brutalist precision.
                </p>
              </RevealText>
            </div>

            <ul className="animate-in space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {[
                "Custom Software Solutions",
                "API Development & Integration",
                "Microservices Architecture",
                "Cloud-Native Applications",
                "DevOps & CI/CD Pipelines",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm sm:text-body-md text-foreground-light/80">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/stack"
              className={cn(
                "animate-in inline-flex items-center gap-2",
                "text-xs sm:text-sm font-display uppercase tracking-wider",
                "text-foreground-light hover:text-accent",
                "transition-colors duration-300"
              )}
              data-cursor="hover"
            >
              Discover Our Stack
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* 3D Scene */}
          <div className="relative aspect-square order-2 max-h-[400px] sm:max-h-[500px] lg:max-h-none">
            <SoftwareScene scrollProgress={scrollProgress} isMobile={isMobile} />
          </div>
        </div>
      </div>
    </section>
  );
}
