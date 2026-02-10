"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "@/components/three/Scene";
import { SplitText, RevealText } from "@/components/ui/SplitText";
import { cn } from "@/lib/utils";
import { Globe, ArrowRight } from "lucide-react";

// ─── 1. THE REACTIVE WIREFRAME GRID ─────────────────────────────────────────
function InteractiveGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    const t = state.clock.getElapsedTime();
    gridRef.current.rotation.x = -Math.PI / 2.5;
    gridRef.current.position.y = -2 + Math.sin(t * 0.5) * 0.2;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[30, 30, "#ff0000", "#cccccc"]}
      position={[0, -2, 0]}
    />
  );
}

// ─── 2. FLOATING BROWSER PANELS ─────────────────────────────────────────────
function BrowserPanel({
  position,
  scale = [1.5, 1],
}: {
  position: [number, number, number];
  scale?: [number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;
    const targetZ = hovered ? position[2] + 0.5 : position[2];
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      targetZ,
      0.1
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        <mesh
          ref={meshRef}
          position={position}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={scale} />
          <meshPhysicalMaterial
            transmission={0.85}
            thickness={0.2}
            roughness={0.05}
            ior={1.5}
            color={hovered ? "#ff0000" : "#ffffff"}
            transparent
            opacity={0.3}
            clearcoat={1}
            clearcoatRoughness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Wireframe border */}
        <lineSegments position={position}>
          <edgesGeometry
            args={[new THREE.PlaneGeometry(scale[0], scale[1])]}
          />
          <lineBasicMaterial color="#000000" linewidth={2} />
        </lineSegments>

        {/* Browser header bar */}
        <mesh position={[position[0], position[1] + scale[1] / 2 - 0.06, position[2] + 0.01]}>
          <planeGeometry args={[scale[0], 0.12]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Red accent dot */}
        <mesh position={[position[0] + scale[0] / 2 - 0.15, position[1] + scale[1] / 2 - 0.06, position[2] + 0.02]}>
          <circleGeometry args={[0.03, 12]} />
          <meshStandardMaterial
            color="#FF0000"
            emissive="#FF0000"
            emissiveIntensity={hovered ? 1 : 0.5}
          />
        </mesh>

        {/* Content lines inside browser */}
        {[-0.15, -0.05, 0.05, 0.15].map((yOff, i) => (
          <mesh key={i} position={[position[0] - scale[0] * 0.1, position[1] + yOff - 0.05, position[2] + 0.01]}>
            <planeGeometry args={[scale[0] * (0.6 - i * 0.08), 0.04]} />
            <meshStandardMaterial color="#999999" transparent opacity={0.6} />
          </mesh>
        ))}

        {/* Small content block */}
        <mesh position={[position[0] + scale[0] * 0.25, position[1] - 0.1, position[2] + 0.01]}>
          <planeGeometry args={[scale[0] * 0.3, scale[1] * 0.35]} />
          <meshStandardMaterial color="#bbbbbb" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

// ─── 3. SCENE COMPOSITION ────────────────────────────────────────────────────
function WebsiteScene({ isMobile }: { isMobile: boolean }) {
  return (
    <Scene camera={{ position: [0, 0.5, 5], fov: 45 }}>
      {/* Bright white background */}
      <color attach="background" args={["#faf8f5"]} />

      {/* Lighting */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, 5, 5]} intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {!isMobile && <pointLight position={[-5, -5, 5]} intensity={0.3} color="#FF0000" />}

      <InteractiveGrid />

      {/* Stack of floating browser windows */}
      <BrowserPanel position={[0, 0.6, 1]} scale={[2.2, 1.4]} />
      <BrowserPanel position={[-1.2, -0.3, 0.5]} scale={[1.4, 0.9]} />
      {!isMobile && <BrowserPanel position={[1.3, -0.5, 1.5]} scale={[1.2, 0.8]} />}

      {/* Wireframe diamond/octahedron — top right accent */}
      <Float speed={3} rotationIntensity={2} floatIntensity={0.5}>
        <mesh position={[2, 1.8, -1]}>
          <octahedronGeometry args={[0.35]} />
          <meshStandardMaterial
            color="#FF0000"
            wireframe
            emissive="#FF0000"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
    </Scene>
  );
}

// ─── 4. EXPORTED SECTION COMPONENT ───────────────────────────────────────────
export function ServiceWebsites() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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
      id="websites"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#faf8f5" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 3D Scene — left half */}
          <div className="relative aspect-square order-2 lg:order-1 max-h-[400px] sm:max-h-[500px] lg:max-h-none">
            <WebsiteScene isMobile={isMobile} />
          </div>

          {/* Text content — right half */}
          <div ref={contentRef} className="relative z-10 order-1 lg:order-2">
            <div className="animate-in flex items-center gap-4 mb-4 sm:mb-6">
              <span className="text-accent font-mono text-base sm:text-body-lg">02</span>
              <div className="h-px flex-1 bg-foreground/20 max-w-[100px]" />
            </div>

            <div className="animate-in mb-4 sm:mb-6">
              <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-foreground" />
            </div>

            <h2 className="animate-in text-brutalist text-2xl sm:text-3xl lg:text-display-md mb-4 sm:mb-6">
              <SplitText type="words" animation="slide" stagger={0.05}>
                DIGITAL PRESENCE
              </SplitText>
            </h2>

            <div className="animate-in">
              <RevealText>
                <p className="text-sm sm:text-base lg:text-body-lg text-foreground-muted mb-6 sm:mb-8 max-w-lg">
                  Immersive web experiences that convert visitors into believers.
                  Every pixel engineered for impact, every interaction designed to
                  inspire.
                </p>
              </RevealText>
            </div>

            <ul className="animate-in space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {[
                "Custom Web Design",
                "WebGL & 3D Experiences",
                "E-commerce Solutions",
                "CMS Development",
                "Performance Optimization",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm sm:text-body-md">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://zynnon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "animate-in inline-flex items-center gap-2",
                "text-xs sm:text-sm font-display uppercase tracking-wider",
                "text-primary hover:text-accent",
                "transition-colors duration-300"
              )}
              data-cursor="hover"
            >
              View Our Work
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
