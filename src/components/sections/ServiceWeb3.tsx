"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "@/components/three/Scene";
import { SplitText, RevealText } from "@/components/ui/SplitText";
import { cn } from "@/lib/utils";
import { Blocks, ArrowRight } from "lucide-react";

// 4x4 Grid Blockchain Visualization with glowing connections
function BlockchainVisualization({ scrollProgress = 0, isMobile = false }: { scrollProgress?: number; isMobile?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const gridSize = isMobile ? 3 : 4;

  // Generate grid of blocks
  const blocks = useMemo(() => {
    const items: Array<{
      position: [number, number, number];
      gridPos: [number, number];
      scale: number;
      delay: number;
    }> = [];

    const spacing = 1.8;
    const offset = ((gridSize - 1) * spacing) / 2;

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const index = x * gridSize + z;
        const yOffset = Math.sin(x * 0.5 + z * 0.3) * 0.5;
        
        items.push({
          position: [
            x * spacing - offset,
            yOffset,
            z * spacing - offset,
          ],
          gridPos: [x, z],
          scale: 0.5,
          delay: index * 0.05,
        });
      }
    }

    return items;
  }, [gridSize]);

  // Generate connection lines between adjacent blocks
  const connections = useMemo(() => {
    const lines: Array<{
      start: [number, number, number];
      end: [number, number, number];
      isHighlighted: boolean;
    }> = [];

    for (let i = 0; i < blocks.length; i++) {
      const [x, z] = blocks[i].gridPos;
      
      // Connect to right neighbor
      if (x < gridSize - 1) {
        const rightIndex = (x + 1) * gridSize + z;
        lines.push({
          start: blocks[i].position,
          end: blocks[rightIndex].position,
          isHighlighted: i % 3 === 0,
        });
      }
      
      // Connect to front neighbor
      if (z < gridSize - 1) {
        const frontIndex = x * gridSize + (z + 1);
        lines.push({
          start: blocks[i].position,
          end: blocks[frontIndex].position,
          isHighlighted: i % 4 === 0,
        });
      }
    }

    return lines;
  }, [blocks, gridSize]);

  // Camera movement based on scroll
  const { camera } = useThree();
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Subtle rotation
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    
    // Camera moves through the grid based on scroll
    const targetZ = 12 - scrollProgress * 6;
    const targetY = 3 + scrollProgress * 2;
    const targetX = Math.sin(scrollProgress * Math.PI) * 2;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.02);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      {/* Blocks */}
      {blocks.map((block, i) => (
        <Float 
          key={i} 
          speed={1.5} 
          rotationIntensity={0.2} 
          floatIntensity={0.3}
        >
          <group position={block.position}>
            {/* Outer wireframe cube */}
            <mesh 
              scale={block.scale}
              rotation={[
                scrollProgress * Math.PI * 0.5 + i * 0.1,
                scrollProgress * Math.PI * 0.3,
                0
              ]}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color="#000000"
                wireframe
                transparent
                opacity={0.9}
              />
            </mesh>
            
            {/* Inner solid cube */}
            <mesh 
              scale={block.scale * 0.7}
              rotation={[
                scrollProgress * Math.PI * 0.5 + i * 0.1,
                scrollProgress * Math.PI * 0.3,
                0
              ]}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={i % 4 === 0 ? "#FF0000" : "#000000"}
                emissive={i % 4 === 0 ? "#FF0000" : "#111111"}
                emissiveIntensity={i % 4 === 0 ? 0.8 : 0.1}
              />
            </mesh>

            {/* Glow effect for highlighted blocks — reduced on mobile */}
            {i % 4 === 0 && !isMobile && (
              <pointLight
                position={[0, 0, 0]}
                color="#FF0000"
                intensity={0.5}
                distance={2}
              />
            )}
          </group>
        </Float>
      ))}

      {/* Connection lines */}
      {connections.map((conn, i) => (
        <Line
          key={i}
          points={[conn.start, conn.end]}
          color={conn.isHighlighted ? "#FF0000" : "#333333"}
          lineWidth={conn.isHighlighted ? 2 : 1}
          transparent
          opacity={conn.isHighlighted ? 0.8 : 0.3}
        />
      ))}

      {/* Central glowing node */}
      <mesh position={[0, 0, 0]} scale={0.3}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#FF0000"
          emissive="#FF0000"
          emissiveIntensity={1}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Outer glow ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 8, 48]} />
        <meshStandardMaterial
          color="#FF0000"
          emissive="#FF0000"
          emissiveIntensity={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

// Wrapper component to pass scroll progress to 3D scene
function Web3Scene({ scrollProgress, isMobile }: { scrollProgress: number; isMobile: boolean }) {
  return (
    <Scene camera={{ position: [0, 3, 12], fov: 50 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#FF0000" />
      <fog attach="fog" args={["#000000", 10, 25]} />
      <BlockchainVisualization scrollProgress={scrollProgress} isMobile={isMobile} />
    </Scene>
  );
}

export function ServiceWeb3() {
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

      // Pin the section and track scroll progress
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

      // Animate content
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
      id="web3"
      className="relative min-h-screen flex items-center bg-background overflow-hidden"
    >
      {/* Subtle noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="relative z-10 order-1">
            <div className="animate-in flex items-center gap-4 mb-4 sm:mb-6">
              <span className="text-accent font-mono text-base sm:text-body-lg">01</span>
              <div className="h-px flex-1 bg-foreground/20 max-w-[100px]" />
            </div>

            <div className="animate-in mb-4 sm:mb-6">
              <Blocks className="w-8 h-8 sm:w-10 sm:h-10 text-foreground" />
            </div>

            <h2 className="animate-in text-brutalist text-2xl sm:text-3xl lg:text-display-md mb-4 sm:mb-6">
              <SplitText type="words" animation="slide" stagger={0.05}>
                WEB3 ARCHITECTURE
              </SplitText>
            </h2>

            <div className="animate-in">
              <RevealText>
                <p className="text-sm sm:text-base lg:text-body-lg text-foreground-muted mb-6 sm:mb-8 max-w-lg">
                  Smart contracts, DApps, and blockchain infrastructure built for scale.
                  We engineer the decentralized future with cutting-edge Web3 technology.
                </p>
              </RevealText>
            </div>

            <ul className="animate-in space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {[
                "Smart Contract Development",
                "DeFi Protocol Architecture",
                "NFT Marketplace Solutions",
                "Cross-chain Integration",
                "Web3 dApp Development",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm sm:text-body-md">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://www.igloo.inc"
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
              Explore Web3 Solutions
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* 3D Scene */}
          <div className="relative aspect-square order-2 max-h-[400px] sm:max-h-[500px] lg:max-h-none">
            <Web3Scene scrollProgress={scrollProgress} isMobile={isMobile} />
          </div>
        </div>
      </div>
    </section>
  );
}
