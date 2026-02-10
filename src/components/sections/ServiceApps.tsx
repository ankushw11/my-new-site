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
import { Smartphone, ArrowRight } from "lucide-react";

// App icon component with KRAMATRIX geometric pattern
function AppIcon({ 
  position, 
  orbitRadius, 
  orbitSpeed, 
  orbitOffset,
  iconType,
}: { 
  position: [number, number, number];
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  iconType: 'circle' | 'square' | 'triangle';
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime * orbitSpeed + orbitOffset;
    meshRef.current.position.x = position[0] + Math.cos(time) * orbitRadius;
    meshRef.current.position.z = position[2] + Math.sin(time) * orbitRadius;
    meshRef.current.position.y = position[1] + Math.sin(time * 2) * 0.3;
    meshRef.current.lookAt(0, 0, 0);
  });

  const getColors = () => {
    switch (iconType) {
      case 'circle': return { color: "#00aaaa", emissive: "#00ffff" };
      case 'square': return { color: "#cc0000", emissive: "#FF0000" };
      case 'triangle': return { color: "#ff8800", emissive: "#ffaa00" };
    }
  };
  const colors = getColors();

  return (
    <group ref={meshRef}>
      {/* Icon background */}
      <mesh>
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#f0f0f0"
          emissiveIntensity={0.1}
          transparent
          opacity={0.95}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Geometric icon */}
      <group position={[0, 0, 0.05]}>
        {iconType === 'circle' ? (
          <mesh>
            <circleGeometry args={[0.3, 24]} />
            <meshStandardMaterial
              color={colors.color}
              emissive={colors.emissive}
              emissiveIntensity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        ) : iconType === 'square' ? (
          <mesh>
            <planeGeometry args={[0.5, 0.5]} />
            <meshStandardMaterial
              color={colors.color}
              emissive={colors.emissive}
              emissiveIntensity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        ) : (
          <mesh rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[0.3, 0.5, 3]} />
            <meshStandardMaterial
              color={colors.color}
              emissive={colors.emissive}
              emissiveIntensity={0.3}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}

// Mobile device component
function MobileDevice() {
  const deviceRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!deviceRef.current) return;
    deviceRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    deviceRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  const getAppColor = (xi: number, yi: number) => {
    const colors = [
      { color: "#FF0000", emissive: "#FF0000" },
      { color: "#00ffff", emissive: "#00ffff" },
      { color: "#ffaa00", emissive: "#ffaa00" },
      { color: "#4488ff", emissive: "#4488ff" },
      { color: "#00ff88", emissive: "#00ff88" },
      { color: "#ff44aa", emissive: "#ff44aa" },
    ];
    return colors[(xi * 4 + yi) % colors.length];
  };
  
  return (
    <group ref={deviceRef}>
      {/* Phone body */}
      <mesh>
        <boxGeometry args={[1.5, 3, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[1.3, 2.7]} />
        <meshStandardMaterial color="#f5f0e8" emissive="#ffffff" emissiveIntensity={0.15} />
      </mesh>

      {/* Screen content - colorful app grid */}
      {[-0.4, 0, 0.4].map((x, xi) =>
        [-0.8, -0.2, 0.4, 1].map((y, yi) => {
          const appColor = getAppColor(xi, yi);
          return (
            <mesh key={`${xi}-${yi}`} position={[x, y, 0.09]} scale={0.15}>
              <planeGeometry args={[1, 1]} />
              <meshStandardMaterial
                color={appColor.color}
                emissive={appColor.emissive}
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        })
      )}

      {/* Notch */}
      <mesh position={[0, 1.25, 0.09]}>
        <planeGeometry args={[0.4, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Home indicator */}
      <mesh position={[0, -1.25, 0.09]}>
        <planeGeometry args={[0.5, 0.05]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {/* Side button */}
      <mesh position={[0.78, 0.5, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.1]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

// Main visualization component
function AppsVisualization({ isMobile = false }: { isMobile?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const iconTypes: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];

  // Generate orbiting app icons — fewer on mobile
  const appIcons = useMemo(() => {
    const icons: Array<{
      position: [number, number, number];
      orbitRadius: number;
      orbitSpeed: number;
      orbitOffset: number;
      iconType: 'circle' | 'square' | 'triangle';
    }> = [];

    const innerCount = isMobile ? 3 : 4;
    const outerCount = isMobile ? 4 : 6;
    
    for (let i = 0; i < innerCount; i++) {
      const angle = (i / innerCount) * Math.PI * 2;
      icons.push({
        position: [0, 0, 0],
        orbitRadius: 2.5,
        orbitSpeed: 0.3,
        orbitOffset: angle,
        iconType: iconTypes[i % 3],
      });
    }

    for (let i = 0; i < outerCount; i++) {
      const angle = (i / outerCount) * Math.PI * 2;
      icons.push({
        position: [0, 0.5, 0],
        orbitRadius: 4,
        orbitSpeed: 0.2,
        orbitOffset: angle,
        iconType: iconTypes[i % 3],
      });
    }

    return icons;
  }, [isMobile]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  const particleCount = isMobile ? 12 : 20;

  return (
    <group ref={groupRef}>
      {/* Central mobile device */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <MobileDevice />
      </Float>

      {/* Orbiting app icons */}
      {appIcons.map((icon, i) => (
        <AppIcon
          key={i}
          position={icon.position}
          orbitRadius={icon.orbitRadius}
          orbitSpeed={icon.orbitSpeed}
          orbitOffset={icon.orbitOffset}
          iconType={icon.iconType}
        />
      ))}

      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 8, 48]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.2, 0]}>
        <torusGeometry args={[4, 0.02, 8, 48]} />
        <meshStandardMaterial
          color="#FF0000"
          emissive="#FF0000"
          emissiveIntensity={0.2}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Accent particles — reduced */}
      {Array.from({ length: particleCount }).map((_, i) => {
        const colors = ["#FF0000", "#00ffff", "#ffaa00", "#4488ff", "#00ff88"];
        const particleColor = colors[i % colors.length];
        return (
          <Float key={i} speed={3} rotationIntensity={0} floatIntensity={1}>
            <mesh
              position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 10,
              ]}
              scale={0.04 + (i % 3) * 0.01}
            >
              <sphereGeometry args={[1, 6, 6]} />
              <meshStandardMaterial
                color={particleColor}
                emissive={particleColor}
                emissiveIntensity={0.8}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// Scene wrapper
function AppsScene({ isMobile }: { isMobile: boolean }) {
  return (
    <Scene camera={{ position: [0, 2, 8], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, 3, 3]} intensity={0.5} color="#FF0000" />
      {!isMobile && <pointLight position={[3, 2, 3]} intensity={0.4} color="#00ffff" />}
      <color attach="background" args={["#faf8f5"]} />
      <AppsVisualization isMobile={isMobile} />
    </Scene>
  );
}

export function ServiceApps() {
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
      id="apps"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#faf8f5" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 3D Scene */}
          <div className="relative aspect-square order-2 lg:order-1 max-h-[400px] sm:max-h-[500px] lg:max-h-none">
            <AppsScene isMobile={isMobile} />
          </div>

          {/* Content */}
          <div ref={contentRef} className="relative z-10 order-1 lg:order-2">
            <div className="animate-in flex items-center gap-4 mb-4 sm:mb-6">
              <span className="text-accent font-mono text-base sm:text-body-lg">04</span>
              <div className="h-px flex-1 bg-foreground/20 max-w-[100px]" />
            </div>

            <div className="animate-in mb-4 sm:mb-6">
              <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-foreground" />
            </div>

            <h2 className="animate-in text-brutalist text-2xl sm:text-3xl lg:text-display-md mb-4 sm:mb-6">
              <SplitText type="words" animation="slide" stagger={0.05}>
                NATIVE EXPERIENCES
              </SplitText>
            </h2>

            <div className="animate-in">
              <RevealText>
                <p className="text-sm sm:text-base lg:text-body-lg text-foreground-muted mb-6 sm:mb-8 max-w-lg">
                  iOS, Android, and cross-platform applications crafted for human hands.
                  Intuitive interfaces that feel natural and perform flawlessly.
                </p>
              </RevealText>
            </div>

            <ul className="animate-in space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {[
                "iOS & Android Development",
                "Cross-Platform Solutions",
                "UI/UX Design",
                "App Store Optimization",
                "Maintenance & Support",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm sm:text-body-md">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://play.google.com/store/apps/details?id=com.hometriangle.consumer&utm_source=website&utm_medium=footer&utm_campaign=website-footer-app-install&utm_content=delhi"
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
              See Our Apps
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
