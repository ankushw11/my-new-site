"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, Line } from "@react-three/drei";
import * as THREE from "three";

/**
 * KRAMATRIX 4×4 Geometric Monogram
 * 
 * This is the brand mark - a 4×4 grid of geometric shapes that:
 * - Forms the letter "K" through negative space and diagonal lines
 * - Contains hidden letterforms of "K-R-A-M-A-T-R-I-X" within the modular shapes
 * - Acts as the brand mark (like Nike swoosh or Apple logo)
 * 
 * Grid Layout (4×4 = 16 modules):
 * Row 0: [circle, square, triangle, circle]     - Top row
 * Row 1: [triangle, circle, square, triangle]   - "K" diagonal starts
 * Row 2: [square, triangle, circle, square]     - "K" diagonal continues
 * Row 3: [triangle, circle, square, circle]     - Base row
 * 
 * The diagonal from top-right to bottom-left forms the "K" spine
 */

// Module configuration for the 4×4 monogram grid
// Each module has: type, fill style, rotation, and whether it's part of the "K" spine
interface MonogramModule {
  type: 'circle' | 'square' | 'triangle';
  position: [number, number, number];
  rotation: number; // degrees
  fill: 'solid' | 'half' | 'negative' | 'outline';
  isKSpine: boolean; // Part of the diagonal "K" formation
  row: number;
  col: number;
}

const MONOGRAM_MODULES: MonogramModule[] = [
  // Row 0 (top)
  { type: 'circle', position: [-1.5, 1.5, 0], rotation: 0, fill: 'solid', isKSpine: false, row: 0, col: 0 },
  { type: 'square', position: [-0.5, 1.5, 0], rotation: 0, fill: 'solid', isKSpine: false, row: 0, col: 1 },
  { type: 'triangle', position: [0.5, 1.5, 0], rotation: 45, fill: 'half', isKSpine: true, row: 0, col: 2 },
  { type: 'circle', position: [1.5, 1.5, 0], rotation: 0, fill: 'negative', isKSpine: true, row: 0, col: 3 },
  
  // Row 1 (upper middle) - "K" diagonal formation
  { type: 'triangle', position: [-1.5, 0.5, 0], rotation: 90, fill: 'solid', isKSpine: false, row: 1, col: 0 },
  { type: 'circle', position: [-0.5, 0.5, 0], rotation: 0, fill: 'half', isKSpine: false, row: 1, col: 1 },
  { type: 'square', position: [0.5, 0.5, 0], rotation: 0, fill: 'solid', isKSpine: true, row: 1, col: 2 },
  { type: 'triangle', position: [1.5, 0.5, 0], rotation: 270, fill: 'solid', isKSpine: true, row: 1, col: 3 },
  
  // Row 2 (lower middle) - Center cross forming "A" and "M" negative space
  { type: 'square', position: [-1.5, -0.5, 0], rotation: 0, fill: 'solid', isKSpine: false, row: 2, col: 0 },
  { type: 'triangle', position: [-0.5, -0.5, 0], rotation: 180, fill: 'solid', isKSpine: true, row: 2, col: 1 },
  { type: 'triangle', position: [0.5, -0.5, 0], rotation: 0, fill: 'solid', isKSpine: true, row: 2, col: 2 },
  { type: 'circle', position: [1.5, -0.5, 0], rotation: 0, fill: 'half', isKSpine: false, row: 2, col: 3 },
  
  // Row 3 (bottom) - Base stabilization
  { type: 'triangle', position: [-1.5, -1.5, 0], rotation: 270, fill: 'solid', isKSpine: true, row: 3, col: 0 },
  { type: 'circle', position: [-0.5, -1.5, 0], rotation: 0, fill: 'solid', isKSpine: true, row: 3, col: 1 },
  { type: 'square', position: [0.5, -1.5, 0], rotation: 45, fill: 'solid', isKSpine: false, row: 3, col: 2 },
  { type: 'circle', position: [1.5, -1.5, 0], rotation: 0, fill: 'negative', isKSpine: false, row: 3, col: 3 },
];

interface MonogramModuleMeshProps {
  module: MonogramModule;
  index: number;
  explodeProgress: number; // 0 = assembled, 1 = exploded
  assembleProgress: number; // 0 = scattered, 1 = assembled
  hovered: boolean;
  onHover: (index: number | null) => void;
}

function MonogramModuleMesh({
  module,
  index,
  explodeProgress,
  assembleProgress,
  hovered,
  onHover,
}: MonogramModuleMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outlineRef = useRef<THREE.Mesh>(null);
  
  // Scattered position (random around the grid)
  const scatteredPosition = useMemo(() => {
    const angle = (index / 16) * Math.PI * 2 + Math.random() * 0.5;
    const radius = 3 + Math.random() * 2;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      (Math.random() - 0.5) * 5
    );
  }, [index]);
  
  // Exploded position (spread out in Z)
  const explodedPosition = useMemo(() => {
    return new THREE.Vector3(
      module.position[0] * 1.5,
      module.position[1] * 1.5,
      (Math.random() - 0.5) * 3
    );
  }, [module.position]);
  
  // Grid position
  const gridPosition = useMemo(() => {
    return new THREE.Vector3(...module.position);
  }, [module.position]);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Calculate current position based on animation states
    let targetPosition: THREE.Vector3;
    
    if (assembleProgress < 1) {
      // Assembling from scattered to grid
      targetPosition = scatteredPosition.clone().lerp(gridPosition, assembleProgress);
    } else if (explodeProgress > 0) {
      // Exploding from grid
      targetPosition = gridPosition.clone().lerp(explodedPosition, explodeProgress);
    } else {
      targetPosition = gridPosition;
    }
    
    // Smooth position interpolation
    meshRef.current.position.lerp(targetPosition, 0.1);
    
    // Rotation during assembly
    const assemblyRotation = (1 - assembleProgress) * Math.PI * 2;
    const baseRotation = (module.rotation * Math.PI) / 180;
    
    // Hover effect
    const hoverRotation = hovered ? Math.PI / 4 : 0;
    const hoverScale = hovered ? 1.15 : 1;
    
    // Apply rotation
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      baseRotation + assemblyRotation + hoverRotation,
      0.1
    );
    
    // Apply scale
    const targetScale = 0.4 * hoverScale;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
    );
    
    // Subtle floating when assembled
    if (assembleProgress >= 1 && explodeProgress === 0) {
      const floatOffset = Math.sin(state.clock.elapsedTime * 2 + index * 0.3) * 0.02;
      meshRef.current.position.y += floatOffset;
    }
    
    // Update outline position
    if (outlineRef.current) {
      outlineRef.current.position.copy(meshRef.current.position);
      outlineRef.current.rotation.copy(meshRef.current.rotation);
      outlineRef.current.scale.copy(meshRef.current.scale);
    }
  });
  
  // Geometry based on shape type
  const geometry = useMemo(() => {
    switch (module.type) {
      case 'circle':
        return new THREE.CylinderGeometry(1, 1, 0.2, 32);
      case 'square':
        return new THREE.BoxGeometry(1.8, 1.8, 0.2);
      case 'triangle':
        // Create extruded triangle
        const shape = new THREE.Shape();
        shape.moveTo(0, 1);
        shape.lineTo(-0.866, -0.5);
        shape.lineTo(0.866, -0.5);
        shape.closePath();
        return new THREE.ExtrudeGeometry(shape, { depth: 0.2, bevelEnabled: false });
      default:
        return new THREE.BoxGeometry(1, 1, 0.2);
    }
  }, [module.type]);
  
  // Material color based on fill type and K-spine membership
  const materialProps = useMemo(() => {
    const baseColor = "#000000";
    const accentColor = "#FF0000";
    
    if (hovered) {
      return {
        color: accentColor,
        emissive: accentColor,
        emissiveIntensity: 0.3,
        metalness: 0.2,
        roughness: 0.1,
      };
    }
    
    switch (module.fill) {
      case 'solid':
        return {
          color: baseColor,
          emissive: "#000000",
          emissiveIntensity: 0,
          metalness: 0.2,
          roughness: 0.1,
        };
      case 'half':
        return {
          color: "#333333",
          emissive: "#000000",
          emissiveIntensity: 0,
          metalness: 0.3,
          roughness: 0.2,
        };
      case 'negative':
        return {
          color: "#666666",
          emissive: "#000000",
          emissiveIntensity: 0,
          metalness: 0.1,
          roughness: 0.3,
          transparent: true,
          opacity: 0.5,
        };
      case 'outline':
        return {
          color: baseColor,
          emissive: "#000000",
          emissiveIntensity: 0,
          metalness: 0.2,
          roughness: 0.1,
          wireframe: true,
        };
      default:
        return {
          color: baseColor,
          emissive: "#000000",
          emissiveIntensity: 0,
          metalness: 0.2,
          roughness: 0.1,
        };
    }
  }, [module.fill, hovered]);
  
  // Rotation for cylinder (circle) to face camera
  const meshRotation: [number, number, number] = module.type === 'circle' 
    ? [Math.PI / 2, 0, (module.rotation * Math.PI) / 180]
    : module.type === 'triangle'
    ? [0, 0, (module.rotation * Math.PI) / 180]
    : [0, 0, (module.rotation * Math.PI) / 180];
  
  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        rotation={meshRotation}
        onPointerEnter={() => onHover(index)}
        onPointerLeave={() => onHover(null)}
      >
        <meshPhysicalMaterial
          {...materialProps}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}

// K-spine diagonal line
function KSpineLine({ assembleProgress }: { assembleProgress: number }) {
  const lineRef = useRef<any>(null);
  
  const points = useMemo<[number, number, number][]>(() => {
    return [
      [1.5, 1.5, 0.1],
      [-1.5, -1.5, 0.1],
    ];
  }, []);
  
  useFrame(() => {
    if (!lineRef.current) return;
    
    // Fade in the line as assembly completes
    const material = lineRef.current.material as THREE.LineBasicMaterial;
    material.opacity = THREE.MathUtils.lerp(material.opacity, assembleProgress > 0.8 ? 0.3 : 0, 0.1);
  });
  
  return (
    <Line
      ref={lineRef}
      points={points}
      color="#000000"
      transparent
      opacity={0}
      lineWidth={2}
    />
  );
}

interface Monogram3DProps {
  scale?: number;
  explodeProgress?: number; // 0 = assembled, 1 = exploded
  assembleProgress?: number; // 0 = scattered, 1 = assembled
  rotationSpeed?: number;
}

export function Monogram3D({
  scale = 1,
  explodeProgress = 0,
  assembleProgress = 1,
  rotationSpeed = 0.1,
}: Monogram3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Gentle idle rotation when assembled
    if (assembleProgress >= 1 && explodeProgress === 0) {
      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });
  
  return (
    <group ref={groupRef} scale={scale}>
      <Center>
        {MONOGRAM_MODULES.map((module, index) => (
          <MonogramModuleMesh
            key={index}
            module={module}
            index={index}
            explodeProgress={explodeProgress}
            assembleProgress={assembleProgress}
            hovered={hoveredIndex === index}
            onHover={setHoveredIndex}
          />
        ))}
        
        {/* K-spine diagonal line */}
        <KSpineLine assembleProgress={assembleProgress} />
      </Center>
    </group>
  );
}

// Scroll-controlled version
interface Monogram3DScrollProps {
  scrollProgress: number; // 0-1 scroll progress
  scale?: number;
}

export function Monogram3DScroll({
  scrollProgress,
  scale = 1,
}: Monogram3DScrollProps) {
  /**
   * Animation phases based on scroll progress:
   * 0-10%: Scattered → Grid assembly
   * 10-20%: Grid assembled, subtle rotation
   * 20-30%: Explode into pieces
   * 30%+: Pieces scattered, logo shrinks to header
   */
  
  const assembleProgress = Math.min(scrollProgress / 0.1, 1); // 0-10% scroll
  const explodeProgress = scrollProgress > 0.2 
    ? Math.min((scrollProgress - 0.2) / 0.1, 1) 
    : 0; // 20-30% scroll
  
  return (
    <Monogram3D
      scale={scale}
      assembleProgress={assembleProgress}
      explodeProgress={explodeProgress}
    />
  );
}

export default Monogram3D;
