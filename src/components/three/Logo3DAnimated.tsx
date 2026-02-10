"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 4x4 grid of geometric shapes (circles, squares, triangles)
const GRID_SHAPES: Array<'circle' | 'square' | 'triangle'> = [
  'circle', 'square', 'triangle', 'circle',
  'triangle', 'circle', 'square', 'triangle',
  'square', 'triangle', 'circle', 'square',
  'circle', 'square', 'triangle', 'circle',
];

interface LogoPieceProps {
  shape: 'circle' | 'square' | 'triangle';
  gridPosition: [number, number, number];
  scatteredPosition: [number, number, number];
  index: number;
  scrollProgress: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

function LogoPiece({
  shape,
  gridPosition,
  scatteredPosition,
  index,
  scrollProgress,
  isHovered,
  onHover,
}: LogoPieceProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [localHover, setLocalHover] = useState(false);
  
  // Animation phases based on scroll progress
  // 0-10%: Scattered → Grid assembly
  // 10-20%: Grid → 3D extrusion (z-axis depth)
  // 20%+: Fully assembled 3D logo
  
  const assemblyProgress = Math.min(scrollProgress / 0.1, 1); // 0-10% scroll
  const extrusionProgress = Math.max(0, Math.min((scrollProgress - 0.1) / 0.1, 1)); // 10-20% scroll
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Interpolate position from scattered to grid
    const currentX = THREE.MathUtils.lerp(scatteredPosition[0], gridPosition[0], assemblyProgress);
    const currentY = THREE.MathUtils.lerp(scatteredPosition[1], gridPosition[1], assemblyProgress);
    
    // Z position: scattered z → 0 → extruded depth
    const assembledZ = 0;
    const extrudedZ = gridPosition[2] * extrusionProgress;
    const scatteredZ = scatteredPosition[2];
    
    const currentZ = assemblyProgress < 1 
      ? THREE.MathUtils.lerp(scatteredZ, assembledZ, assemblyProgress)
      : THREE.MathUtils.lerp(assembledZ, extrudedZ, extrusionProgress);
    
    meshRef.current.position.set(currentX, currentY, currentZ);
    
    // Rotation during assembly
    const assemblyRotation = (1 - assemblyProgress) * Math.PI * 2;
    
    // Hover rotation (90 degrees)
    const hoverRotation = localHover ? Math.PI / 2 : 0;
    
    // Smooth rotation interpolation
    const targetRotationY = assemblyRotation + hoverRotation;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotationY,
      0.1
    );
    
    // Subtle floating animation when assembled
    if (assemblyProgress >= 1) {
      const floatOffset = Math.sin(state.clock.elapsedTime * 2 + index * 0.5) * 0.02;
      meshRef.current.position.y += floatOffset;
    }
    
    // Scale animation
    const baseScale = 0.15;
    const hoverScale = localHover ? 1.2 : 1;
    const targetScale = baseScale * hoverScale;
    
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
    );
  });
  
  const handlePointerEnter = () => {
    setLocalHover(true);
    onHover(index);
  };
  
  const handlePointerLeave = () => {
    setLocalHover(false);
    onHover(null);
  };
  
  // Geometry based on shape type
  const geometry = useMemo(() => {
    switch (shape) {
      case 'circle':
        return <cylinderGeometry args={[1, 1, 0.3, 32]} />;
      case 'square':
        return <boxGeometry args={[1.8, 1.8, 0.3]} />;
      case 'triangle':
        return <coneGeometry args={[1, 1.5, 3]} />;
      default:
        return <boxGeometry args={[1, 1, 0.3]} />;
    }
  }, [shape]);
  
  // Color based on shape
  const color = useMemo(() => {
    if (localHover) return "#FF0000";
    return "#000000";
  }, [localHover]);
  
  return (
    <mesh
      ref={meshRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      rotation={shape === 'circle' ? [Math.PI / 2, 0, 0] : shape === 'triangle' ? [0, 0, Math.PI] : [0, 0, 0]}
    >
      {geometry}
      <meshStandardMaterial
        color={color}
        metalness={0.1}
        roughness={0.3}
        emissive={localHover ? "#FF0000" : "#000000"}
        emissiveIntensity={localHover ? 0.3 : 0}
      />
    </mesh>
  );
}

interface Logo3DAnimatedProps {
  scrollProgress?: number;
  scale?: number;
}

export function Logo3DAnimated({ 
  scrollProgress = 0,
  scale = 1,
}: Logo3DAnimatedProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Generate grid positions (4x4 grid)
  const gridPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const spacing = 0.4;
    const offset = (3 * spacing) / 2; // Center the grid
    
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const x = col * spacing - offset;
        const y = -row * spacing + offset; // Flip Y so row 0 is at top
        // Z depth based on position for 3D extrusion effect
        const z = (Math.sin(row * 0.5) + Math.cos(col * 0.5)) * 0.2;
        positions.push([x, y, z]);
      }
    }
    
    return positions;
  }, []);
  
  // Generate scattered positions (random positions around the grid)
  const scatteredPositions = useMemo(() => {
    return gridPositions.map((_, index) => {
      const angle = (index / 16) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 2 + Math.random() * 3;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * 4;
      return [x, y, z] as [number, number, number];
    });
  }, [gridPositions]);
  
  // Overall group rotation based on scroll
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Subtle rotation when fully assembled
    if (scrollProgress > 0.2) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });
  
  return (
    <group ref={groupRef} scale={scale}>
      {GRID_SHAPES.map((shape, index) => (
        <LogoPiece
          key={index}
          shape={shape}
          gridPosition={gridPositions[index]}
          scatteredPosition={scatteredPositions[index]}
          index={index}
          scrollProgress={scrollProgress}
          isHovered={hoveredIndex === index}
          onHover={setHoveredIndex}
        />
      ))}
      
      {/* Ambient glow when assembled */}
      {scrollProgress > 0.15 && (
        <pointLight
          position={[0, 0, 1]}
          intensity={scrollProgress * 0.5}
          color="#FF0000"
          distance={3}
        />
      )}
    </group>
  );
}

// Wrapper component that handles scroll tracking
interface Logo3DWithScrollProps {
  containerRef?: React.RefObject<HTMLElement>;
  scale?: number;
}

export function Logo3DWithScroll({ 
  containerRef,
  scale = 1,
}: Logo3DWithScrollProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Calculate progress based on first 20% of viewport scroll
      const progress = Math.min(scrollY / (windowHeight * 0.3), 1);
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return <Logo3DAnimated scrollProgress={scrollProgress} scale={scale} />;
}

// Alternative: GSAP ScrollTrigger version for more precise control
export function Logo3DScrollTrigger({
  triggerRef,
  scale = 1,
}: {
  triggerRef: React.RefObject<HTMLElement>;
  scale?: number;
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useGSAP(() => {
    if (!triggerRef.current) return;
    
    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "+=30%",
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });
  }, { dependencies: [triggerRef] });
  
  return <Logo3DAnimated scrollProgress={scrollProgress} scale={scale} />;
}
