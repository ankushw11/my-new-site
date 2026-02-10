"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

// Create the grid shader material
const GridMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0x000000),
    uOpacity: 0.08,
    uGridSize: 40.0,
    uLineWidth: 1.0,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uGridSize;
    uniform float uLineWidth;
    varying vec2 vUv;
    
    void main() {
      // Animated UV offset for subtle movement
      vec2 animatedUv = vUv + vec2(
        sin(uTime * 0.1) * 0.02,
        cos(uTime * 0.08) * 0.02
      );
      
      // Create grid pattern
      vec2 grid = abs(fract(animatedUv * uGridSize - 0.5) - 0.5);
      vec2 gridWidth = fwidth(animatedUv * uGridSize) * uLineWidth;
      vec2 lines = smoothstep(gridWidth, vec2(0.0), grid);
      float line = max(lines.x, lines.y);
      
      // Add subtle pulse effect
      float pulse = 0.8 + sin(uTime * 0.5) * 0.2;
      
      // Add distance-based fade from center
      vec2 center = vUv - 0.5;
      float dist = length(center);
      float fade = 1.0 - smoothstep(0.0, 0.7, dist);
      
      // Final color with transparency
      float alpha = line * uOpacity * pulse * fade;
      gl_FragColor = vec4(uColor, alpha);
    }
  `
);

interface GridShaderBackgroundProps {
  color?: string;
  opacity?: number;
  gridSize?: number;
  lineWidth?: number;
}

export function GridShaderBackground({
  color = "#000000",
  opacity = 0.08,
  gridSize = 40,
  lineWidth = 1.0,
}: GridShaderBackgroundProps) {
  const materialRef = useRef<any>(null);
  
  const colorObj = useMemo(() => new THREE.Color(color), [color]);
  
  const material = useMemo(() => {
    const mat = new GridMaterial();
    mat.transparent = true;
    mat.depthWrite = false;
    mat.side = THREE.DoubleSide;
    return mat;
  }, []);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uColor = colorObj;
      materialRef.current.uOpacity = opacity;
      materialRef.current.uGridSize = gridSize;
      materialRef.current.uLineWidth = lineWidth;
    }
  });
  
  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[30, 30, 1, 1]} />
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
  );
}

// Alternative: Animated dot grid background
const DotGridMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0x000000),
    uOpacity: 0.15,
    uGridSize: 30.0,
    uDotSize: 0.03,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uGridSize;
    uniform float uDotSize;
    varying vec2 vUv;
    
    void main() {
      // Animated UV for subtle movement
      vec2 animatedUv = vUv + vec2(
        sin(uTime * 0.05 + vUv.y * 3.0) * 0.01,
        cos(uTime * 0.07 + vUv.x * 3.0) * 0.01
      );
      
      // Create dot grid
      vec2 gridUv = fract(animatedUv * uGridSize);
      vec2 gridCenter = gridUv - 0.5;
      float dist = length(gridCenter);
      
      // Dot with soft edges
      float dot = 1.0 - smoothstep(uDotSize - 0.01, uDotSize + 0.01, dist);
      
      // Wave animation affecting dot size
      vec2 gridId = floor(animatedUv * uGridSize);
      float wave = sin(uTime * 0.5 + gridId.x * 0.3 + gridId.y * 0.3) * 0.5 + 0.5;
      dot *= 0.5 + wave * 0.5;
      
      // Distance fade from center
      vec2 center = vUv - 0.5;
      float centerDist = length(center);
      float fade = 1.0 - smoothstep(0.2, 0.6, centerDist);
      
      float alpha = dot * uOpacity * fade;
      gl_FragColor = vec4(uColor, alpha);
    }
  `
);

interface DotGridBackgroundProps {
  color?: string;
  opacity?: number;
  gridSize?: number;
  dotSize?: number;
}

export function DotGridBackground({
  color = "#000000",
  opacity = 0.15,
  gridSize = 30,
  dotSize = 0.03,
}: DotGridBackgroundProps) {
  const materialRef = useRef<any>(null);
  
  const colorObj = useMemo(() => new THREE.Color(color), [color]);
  
  const material = useMemo(() => {
    const mat = new DotGridMaterial();
    mat.transparent = true;
    mat.depthWrite = false;
    mat.side = THREE.DoubleSide;
    return mat;
  }, []);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uColor = colorObj;
      materialRef.current.uOpacity = opacity;
      materialRef.current.uGridSize = gridSize;
      materialRef.current.uDotSize = dotSize;
    }
  });
  
  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[30, 30, 1, 1]} />
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
  );
}

// Perspective grid (converging lines)
const PerspectiveGridMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0x000000),
    uAccentColor: new THREE.Color(0xff0000),
    uOpacity: 0.1,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uAccentColor;
    uniform float uOpacity;
    varying vec2 vUv;
    
    float line(vec2 p, vec2 a, vec2 b) {
      vec2 pa = p - a;
      vec2 ba = b - a;
      float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
      return length(pa - ba * h);
    }
    
    void main() {
      vec2 uv = vUv;
      vec2 center = vec2(0.5, 0.0);
      
      // Horizontal lines with perspective
      float horizLines = 0.0;
      for (float i = 0.0; i < 10.0; i++) {
        float y = i / 10.0;
        y = pow(y, 1.5); // Perspective compression
        float lineY = abs(uv.y - y);
        float width = 0.002 + y * 0.003;
        horizLines += smoothstep(width, 0.0, lineY);
      }
      
      // Vertical converging lines
      float vertLines = 0.0;
      for (float i = -5.0; i <= 5.0; i++) {
        float x = 0.5 + i * 0.1;
        // Lines converge toward center-top
        float convergence = mix(x, 0.5, uv.y * 0.8);
        float lineX = abs(uv.x - convergence);
        float width = 0.002 * (1.0 - uv.y * 0.5);
        vertLines += smoothstep(width, 0.0, lineX);
      }
      
      float grid = min(horizLines + vertLines, 1.0);
      
      // Animated scan line
      float scanY = fract(uTime * 0.1);
      float scan = smoothstep(0.02, 0.0, abs(uv.y - scanY)) * 0.5;
      
      // Mix colors
      vec3 finalColor = mix(uColor, uAccentColor, scan);
      float alpha = (grid * uOpacity + scan * 0.3) * (1.0 - uv.y * 0.5);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

interface PerspectiveGridBackgroundProps {
  color?: string;
  accentColor?: string;
  opacity?: number;
}

export function PerspectiveGridBackground({
  color = "#000000",
  accentColor = "#FF0000",
  opacity = 0.1,
}: PerspectiveGridBackgroundProps) {
  const materialRef = useRef<any>(null);
  
  const colorObj = useMemo(() => new THREE.Color(color), [color]);
  const accentColorObj = useMemo(() => new THREE.Color(accentColor), [accentColor]);
  
  const material = useMemo(() => {
    const mat = new PerspectiveGridMaterial();
    mat.transparent = true;
    mat.depthWrite = false;
    mat.side = THREE.DoubleSide;
    return mat;
  }, []);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uColor = colorObj;
      materialRef.current.uAccentColor = accentColorObj;
      materialRef.current.uOpacity = opacity;
    }
  });
  
  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[30, 30, 1, 1]} />
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
  );
}
