"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, PresentationControls } from "@react-three/drei";
import * as THREE from "three";
import { Logo3D } from "./LogoTiles";

/** Gentle floating animation */
function FloatingLogo({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.06;
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.08;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.05;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function LogoScene() {
  return (
    <div className="w-full h-screen" style={{ background: "#ffffff" }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{
          antialias: true,
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        {/* Pure white background */}
        <color attach="background" args={["#ffffff"]} />

        {/* Studio lighting */}
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[-3, 5, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[4, 2, 3]} intensity={0.6} />
        <directionalLight position={[0, 3, -3]} intensity={0.4} />

        {/* Soft contact shadow */}
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.25}
          scale={6}
          blur={2.5}
          far={4}
        />

        {/* Interactive rotation */}
        <PresentationControls
          global
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 300 }}
          rotation={[0.1, 0.2, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <FloatingLogo>
            <Suspense fallback={null}>
              <Logo3D />
            </Suspense>
          </FloatingLogo>
        </PresentationControls>
      </Canvas>
    </div>
  );
}
