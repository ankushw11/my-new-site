"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export const Logo3D = () => {
  const texture = useTexture("/logo.png");

  // Crisp texture filtering
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  // White material for sides and back
  const whiteMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.15,
        metalness: 0.0,
      }),
    []
  );

  // Front face with the logo texture
  const frontMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.25,
        metalness: 0.0,
      }),
    [texture]
  );

  // Materials array: [+x, -x, +y, -y, +z (front), -z (back)]
  const materials = useMemo(
    () => [
      whiteMaterial, // right
      whiteMaterial, // left
      whiteMaterial, // top
      whiteMaterial, // bottom
      frontMaterial, // front (logo)
      whiteMaterial, // back
    ],
    [whiteMaterial, frontMaterial]
  );

  return (
    <mesh material={materials} castShadow receiveShadow>
      <boxGeometry args={[2.8, 2.8, 0.3]} />
    </mesh>
  );
};
