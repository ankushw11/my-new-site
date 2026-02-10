"use client";

import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, View } from "@react-three/drei";
import * as THREE from "three";

interface SceneProps {
  children: React.ReactNode;
  className?: string;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  gl?: Partial<THREE.WebGLRendererParameters>;
}

// Loading placeholder for 3D scenes
function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-foreground/20 border-t-accent rounded-full animate-spin" />
    </div>
  );
}

export function Scene({
  children,
  className,
  camera = { position: [0, 0, 5], fov: 75 },
  gl,
}: SceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className="relative w-full h-full">
      <Suspense fallback={<SceneLoader />}>
        <Canvas
          className={className}
          camera={{
            position: camera.position,
            fov: camera.fov,
            near: 0.1,
            far: 100, // Reduced from 1000 for better z-buffer precision
          }}
          gl={{
            antialias: !isMobile, // Disable antialiasing on mobile
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            ...gl,
          }}
          dpr={isMobile ? [1, 1] : [1, 1.5]} // Limit DPR for performance
          performance={{ min: 0.5 }} // Allow frame dropping for adaptive performance
        >
          <Suspense fallback={null}>
            {children}
            <Preload all />
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  );
}

// View-based scene for multiple canvases
export function ViewScene({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <View className="absolute inset-0">
        <Suspense fallback={null}>{children}</Suspense>
      </View>
    </div>
  );
}

// Global canvas for View components
export function GlobalCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      className="!fixed !inset-0 !pointer-events-none"
      eventSource={document.body}
      eventPrefix="client"
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      dpr={[1, 1.5]}
    >
      <View.Port />
    </Canvas>
  );
}
