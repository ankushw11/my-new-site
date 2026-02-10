"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Points, PointMaterial, Line } from "@react-three/drei";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "@/components/three/Scene";
import { SplitText, RevealText } from "@/components/ui/SplitText";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

// Central brain structure
function CentralBrain({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  
  const elementCount = isMobile ? 30 : 50;
  
  const logoElements = useMemo(() => {
    const elements: Array<{
      position: THREE.Vector3;
      rotation: THREE.Euler;
      shape: 'circle' | 'square' | 'triangle';
      scale: number;
    }> = [];
    
    const radius = 1.2;
    
    for (let i = 0; i < elementCount; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / elementCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      elements.push({
        position: new THREE.Vector3(x, y, z),
        rotation: new THREE.Euler(
          (i * 1.1) % Math.PI,
          (i * 0.7) % Math.PI,
          (i * 1.3) % Math.PI
        ),
        shape: ['circle', 'square', 'triangle'][i % 3] as 'circle' | 'square' | 'triangle',
        scale: 0.08 + (i % 4) * 0.01,
      });
    }
    
    return elements;
  }, [elementCount]);
  
  useFrame((state) => {
    if (!groupRef.current || !innerRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    innerRef.current.scale.setScalar(pulse);
  });
  
  return (
    <group ref={groupRef}>
      {/* Inner glowing core */}
      <group ref={innerRef}>
        <Sphere args={[0.6, 16, 16]}>
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.8}
            transparent
            opacity={0.3}
          />
        </Sphere>
        <Sphere args={[0.4, 12, 12]}>
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#ffffff"
            emissiveIntensity={1}
            transparent
            opacity={0.6}
          />
        </Sphere>
        <Sphere args={[0.25, 12, 12]}>
          <meshStandardMaterial
            color="#FF0000"
            emissive="#FF0000"
            emissiveIntensity={1.5}
          />
        </Sphere>
      </group>
      
      {/* Logo shapes forming the brain surface */}
      {logoElements.map((el, i) => (
        <group key={i} position={el.position} rotation={el.rotation}>
          {el.shape === 'circle' ? (
            <mesh scale={el.scale}>
              <torusGeometry args={[1, 0.3, 6, 12]} />
              <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          ) : el.shape === 'square' ? (
            <mesh scale={el.scale}>
              <boxGeometry args={[1.5, 1.5, 0.3]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#4488ff"
                emissiveIntensity={0.3}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          ) : (
            <mesh scale={el.scale} rotation={[0, 0, Math.PI]}>
              <coneGeometry args={[1, 1.5, 3]} />
              <meshStandardMaterial
                color="#FF0000"
                emissive="#FF0000"
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          )}
        </group>
      ))}
      
      {/* Outer wireframe sphere */}
      <Sphere args={[1.5, 12, 12]}>
        <meshStandardMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.25}
        />
      </Sphere>
    </group>
  );
}

// Neural network nodes
function NeuralNode({ 
  position, 
  shape, 
  isActive,
  pulseDelay 
}: { 
  position: [number, number, number];
  shape: 'circle' | 'square' | 'triangle';
  isActive: boolean;
  pulseDelay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + pulseDelay) * 0.05;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.5 + pulseDelay;
  });
  
  const size = 0.2;
  
  const getNodeColor = () => {
    if (!isActive) return { color: "#2a2a2a", emissive: "#000000" };
    switch (shape) {
      case 'circle': return { color: "#00ffff", emissive: "#00ffff" };
      case 'square': return { color: "#ffffff", emissive: "#4488ff" };
      case 'triangle': return { color: "#FF0000", emissive: "#FF0000" };
    }
  };
  
  const nodeColors = getNodeColor();
  
  return (
    <group position={position}>
      {shape === 'circle' ? (
        <mesh ref={meshRef}>
          <torusGeometry args={[size, size * 0.4, 6, 16]} />
          <meshStandardMaterial
            color={nodeColors.color}
            emissive={nodeColors.emissive}
            emissiveIntensity={isActive ? 0.8 : 0}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ) : shape === 'square' ? (
        <mesh ref={meshRef}>
          <boxGeometry args={[size * 1.8, size * 1.8, size * 0.4]} />
          <meshStandardMaterial
            color={nodeColors.color}
            emissive={nodeColors.emissive}
            emissiveIntensity={isActive ? 0.6 : 0}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ) : (
        <mesh ref={meshRef} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[size * 1.2, size * 2, 3]} />
          <meshStandardMaterial
            color={nodeColors.color}
            emissive={nodeColors.emissive}
            emissiveIntensity={isActive ? 0.8 : 0}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      )}
    </group>
  );
}

// Connection line
function NeuralConnection({
  start,
  end,
  isActive,
}: {
  start: [number, number, number];
  end: [number, number, number];
  isActive: boolean;
}) {
  return (
    <Line
      points={[start, end]}
      color={isActive ? "#00ffff" : "#333333"}
      lineWidth={1}
      transparent
      opacity={isActive ? 0.5 : 0.1}
    />
  );
}

// Particle system — optimized
function DataParticles({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = isMobile ? 150 : 300;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, [particleCount]);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);
      
      if (dist > 2) {
        const speed = 0.002;
        positions[i] -= (x / dist) * speed;
        positions[i + 1] -= (y / dist) * speed;
        positions[i + 2] -= (z / dist) * speed;
      } else {
        const radius = 5 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <Points ref={pointsRef} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#00ffff"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

// Main AI visualization
function AIVisualization({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const shapes: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];
  
  // Neural network — reduced on mobile
  const networkConfig = useMemo(() => {
    const nodes: Array<{
      position: [number, number, number];
      shape: 'circle' | 'square' | 'triangle';
      isActive: boolean;
      layer: number;
    }> = [];
    
    const layers = isMobile
      ? [
          { radius: 2.5, count: 6, yOffset: 0 },
          { radius: 3.5, count: 8, yOffset: 0 },
        ]
      : [
          { radius: 2.5, count: 8, yOffset: 0 },
          { radius: 3.2, count: 10, yOffset: 0.5 },
          { radius: 3.2, count: 10, yOffset: -0.5 },
          { radius: 4, count: 12, yOffset: 0 },
        ];
    
    layers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2;
        const x = Math.cos(angle) * layer.radius;
        const z = Math.sin(angle) * layer.radius;
        
        nodes.push({
          position: [x, layer.yOffset, z],
          shape: shapes[i % 3],
          isActive: i % 3 !== 2, // deterministic instead of random
          layer: layerIndex,
        });
      }
    });
    
    return nodes;
  }, [isMobile]);
  
  // Generate connections — reduced
  const connections = useMemo(() => {
    const conns: Array<{
      start: [number, number, number];
      end: [number, number, number];
      isActive: boolean;
    }> = [];
    
    // Connect every 3rd node to center
    networkConfig.forEach((node, i) => {
      if (i % 3 === 0) {
        conns.push({
          start: node.position,
          end: [0, 0, 0],
          isActive: node.isActive,
        });
      }
    });
    
    return conns;
  }, [networkConfig]);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });
  
  return (
    <group ref={groupRef}>
      {/* Central brain structure */}
      <CentralBrain isMobile={isMobile} />
      
      {/* Neural network nodes */}
      {networkConfig.map((node, i) => (
        <NeuralNode
          key={i}
          position={node.position}
          shape={node.shape}
          isActive={node.isActive}
          pulseDelay={i * 0.2}
        />
      ))}
      
      {/* Connections */}
      {connections.map((conn, i) => (
        <NeuralConnection
          key={i}
          start={conn.start}
          end={conn.end}
          isActive={conn.isActive}
        />
      ))}
      
      {/* Data training particles */}
      <DataParticles isMobile={isMobile} />
      
      {/* Ambient decorative elements */}
      {!isMobile && (
        <>
          <Float speed={0.3} floatIntensity={0.5}>
            <mesh position={[5, 2, -2]} scale={0.3}>
              <icosahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color="#00ffff" wireframe transparent opacity={0.4} />
            </mesh>
          </Float>
          
          <Float speed={0.4} floatIntensity={0.4}>
            <mesh position={[-5, -1.5, -1]} scale={0.25}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.3} />
            </mesh>
          </Float>
        </>
      )}
    </group>
  );
}

export function ServiceAI() {
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
      id="ai"
      className="relative min-h-screen flex items-center bg-[#0a0a0a]"
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-gutter relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="relative z-10 order-1">
            <div className="animate-in flex items-center gap-4 mb-4 sm:mb-6">
              <span className="text-accent font-mono text-base sm:text-body-lg">05</span>
              <div className="h-px flex-1 bg-white/20 max-w-[100px]" />
            </div>

            {/* Custom AI icon */}
            <div className="animate-in mb-4 sm:mb-6 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <div className="w-3 h-3 bg-white" />
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-accent" />
            </div>

            <h2 className="animate-in text-brutalist text-2xl sm:text-3xl lg:text-display-md mb-4 sm:mb-6 text-white">
              <SplitText type="words" animation="slide" stagger={0.05}>
                ARTIFICIAL INTELLIGENCE
              </SplitText>
            </h2>

            <div className="animate-in">
              <RevealText>
                <p className="text-sm sm:text-base lg:text-body-lg text-white/70 mb-6 sm:mb-8 max-w-lg">
                  Custom LLMs and AI agents engineered for your specific 
                  business intelligence. Machine learning solutions that 
                  transform data into decisive action.
                </p>
              </RevealText>
            </div>

            <ul className="animate-in space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {[
                "Custom AI Agent Development",
                "LLM Fine-tuning & Training",
                "RAG System Implementation",
                "ML Model Development",
                "AI Integration & Automation",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm sm:text-body-md text-white/90">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://mundibusiness.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "animate-in inline-flex items-center gap-2",
                "text-xs sm:text-sm font-display uppercase tracking-wider",
                "text-white hover:text-accent",
                "transition-colors duration-300"
              )}
              data-cursor="hover"
            >
              Engineer Intelligence
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* 3D Scene */}
          <div className="relative aspect-square order-2 max-h-[400px] sm:max-h-[500px] lg:max-h-none">
            <Scene camera={{ position: [0, 0, 10], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
              <pointLight position={[0, 0, 3]} intensity={1.2} color="#00ffff" />
              {!isMobile && <pointLight position={[-3, 2, 2]} intensity={0.6} color="#FF0000" />}
              <AIVisualization isMobile={isMobile} />
            </Scene>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
