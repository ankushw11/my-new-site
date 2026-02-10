"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface GeometricLogo3DProps {
  scale?: number;
  position?: [number, number, number];
  animated?: boolean;
  wireframe?: boolean;
  color?: string;
}

export function GeometricLogo3D({
  scale = 1,
  position = [0, 0, 0],
  animated = true,
}: GeometricLogo3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture("/logo.png");

  // Crisp texture
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  // White material for sides and back
  const whiteMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.2,
        metalness: 0.0,
      }),
    []
  );

  // Front face with the logo texture
  const frontMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.3,
        metalness: 0.0,
      }),
    [texture]
  );

  // Materials: [+x, -x, +y, -y, +z (front), -z (back)]
  const materials = useMemo(
    () => [
      whiteMaterial,
      whiteMaterial,
      whiteMaterial,
      whiteMaterial,
      frontMaterial,
      whiteMaterial,
    ],
    [whiteMaterial, frontMaterial]
  );

  useFrame((state) => {
    if (!groupRef.current || !animated) return;
    groupRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={position} scale={scale}>
        <mesh material={materials} castShadow receiveShadow>
          <boxGeometry args={[4, 4, 0.4]} />
        </mesh>
      </group>
    </Float>
  );
}
