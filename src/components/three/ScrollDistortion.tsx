"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { EffectComposer, RenderPass, ShaderPass } from "three-stdlib";
import * as THREE from "three";

// Extend Three.js with post-processing classes
extend({ EffectComposer, RenderPass, ShaderPass });

// RGB Shift Shader with scroll velocity
const RGBShiftShader = {
  uniforms: {
    tDiffuse: { value: null },
    uAmount: { value: 0.0 },
    uAngle: { value: 0.0 },
    uTime: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uAmount;
    uniform float uAngle;
    uniform float uTime;
    varying vec2 vUv;
    
    void main() {
      vec2 offset = uAmount * vec2(cos(uAngle), sin(uAngle));
      
      // Add slight wave distortion based on position
      float wave = sin(vUv.y * 10.0 + uTime * 2.0) * 0.002 * uAmount * 10.0;
      
      // Sample RGB channels with offset
      vec4 cr = texture2D(tDiffuse, vUv + offset + vec2(wave, 0.0));
      vec4 cg = texture2D(tDiffuse, vUv);
      vec4 cb = texture2D(tDiffuse, vUv - offset - vec2(wave, 0.0));
      
      // Combine channels
      gl_FragColor = vec4(cr.r, cg.g, cb.b, cg.a);
    }
  `,
};

// Chromatic Aberration with radial distortion
const ChromaticAberrationShader = {
  uniforms: {
    tDiffuse: { value: null },
    uIntensity: { value: 0.0 },
    uTime: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uIntensity;
    uniform float uTime;
    varying vec2 vUv;
    
    void main() {
      vec2 center = vec2(0.5);
      vec2 dir = vUv - center;
      float dist = length(dir);
      
      // Radial chromatic aberration - stronger at edges
      float aberration = uIntensity * dist * dist;
      
      // Add subtle noise
      float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233)) + uTime) * 43758.5453);
      aberration += noise * uIntensity * 0.1;
      
      vec2 redOffset = dir * aberration;
      vec2 blueOffset = -dir * aberration;
      
      float r = texture2D(tDiffuse, vUv + redOffset).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv + blueOffset).b;
      float a = texture2D(tDiffuse, vUv).a;
      
      gl_FragColor = vec4(r, g, b, a);
    }
  `,
};

// Scan Lines + Noise shader for extra distortion
const ScanLinesShader = {
  uniforms: {
    tDiffuse: { value: null },
    uIntensity: { value: 0.0 },
    uTime: { value: 0.0 },
    uCount: { value: 800.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uIntensity;
    uniform float uTime;
    uniform float uCount;
    varying vec2 vUv;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      
      // Scan lines
      float scanLine = sin(vUv.y * uCount + uTime * 5.0) * 0.5 + 0.5;
      scanLine = pow(scanLine, 1.5);
      
      // Noise
      float noise = random(vUv + uTime * 0.01);
      
      // Apply effects based on intensity
      float scanEffect = mix(1.0, scanLine, uIntensity * 0.3);
      float noiseEffect = mix(0.0, (noise - 0.5) * 0.1, uIntensity);
      
      color.rgb *= scanEffect;
      color.rgb += noiseEffect;
      
      gl_FragColor = color;
    }
  `,
};

interface ScrollDistortionEffectsProps {
  enabled?: boolean;
  maxRGBShift?: number;
  maxChromatic?: number;
  enableScanLines?: boolean;
}

export function ScrollDistortionEffects({
  enabled = true,
  maxRGBShift = 0.01,
  maxChromatic = 0.02,
  enableScanLines = false,
}: ScrollDistortionEffectsProps) {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef<EffectComposer | null>(null);
  const rgbShiftRef = useRef<ShaderPass | null>(null);
  const chromaticRef = useRef<ShaderPass | null>(null);
  const scanLinesRef = useRef<ShaderPass | null>(null);
  
  const scroll = useScroll();
  const lastScrollRef = useRef(0);
  const velocityRef = useRef(0);
  
  // Create composer and passes
  useEffect(() => {
    if (!enabled) return;
    
    const composer = new EffectComposer(gl);
    composer.setSize(size.width, size.height);
    
    // Render pass
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    // RGB Shift pass
    const rgbShiftPass = new ShaderPass(RGBShiftShader);
    rgbShiftPass.uniforms.uAmount.value = 0;
    rgbShiftPass.uniforms.uAngle.value = Math.PI / 4;
    composer.addPass(rgbShiftPass);
    rgbShiftRef.current = rgbShiftPass;
    
    // Chromatic aberration pass
    const chromaticPass = new ShaderPass(ChromaticAberrationShader);
    chromaticPass.uniforms.uIntensity.value = 0;
    composer.addPass(chromaticPass);
    chromaticRef.current = chromaticPass;
    
    // Scan lines pass (optional)
    if (enableScanLines) {
      const scanLinesPass = new ShaderPass(ScanLinesShader);
      scanLinesPass.uniforms.uIntensity.value = 0;
      composer.addPass(scanLinesPass);
      scanLinesRef.current = scanLinesPass;
    }
    
    composerRef.current = composer;
    
    return () => {
      composer.dispose();
    };
  }, [gl, scene, camera, size, enabled, enableScanLines]);
  
  // Update size on resize
  useEffect(() => {
    if (composerRef.current) {
      composerRef.current.setSize(size.width, size.height);
    }
  }, [size]);
  
  // Animation frame
  useFrame((state, delta) => {
    if (!enabled || !composerRef.current) return;
    
    // Calculate scroll velocity
    const currentScroll = scroll.offset;
    const scrollDelta = Math.abs(currentScroll - lastScrollRef.current);
    lastScrollRef.current = currentScroll;
    
    // Smooth velocity with easing
    const targetVelocity = Math.min(scrollDelta * 50, 1); // Normalize to 0-1
    velocityRef.current += (targetVelocity - velocityRef.current) * 0.1;
    
    // Decay velocity when not scrolling
    if (scrollDelta < 0.0001) {
      velocityRef.current *= 0.95;
    }
    
    const velocity = velocityRef.current;
    const time = state.clock.elapsedTime;
    
    // Update RGB shift
    if (rgbShiftRef.current) {
      rgbShiftRef.current.uniforms.uAmount.value = velocity * maxRGBShift;
      rgbShiftRef.current.uniforms.uAngle.value = time * 0.5;
      rgbShiftRef.current.uniforms.uTime.value = time;
    }
    
    // Update chromatic aberration
    if (chromaticRef.current) {
      chromaticRef.current.uniforms.uIntensity.value = velocity * maxChromatic;
      chromaticRef.current.uniforms.uTime.value = time;
    }
    
    // Update scan lines
    if (scanLinesRef.current) {
      scanLinesRef.current.uniforms.uIntensity.value = velocity * 0.5;
      scanLinesRef.current.uniforms.uTime.value = time;
    }
    
    // Render with composer
    composerRef.current.render();
  }, 1); // Priority 1 to render after scene updates
  
  return null;
}

// Simpler version using just a full-screen quad with shader
// This is more compatible and doesn't require post-processing setup
export function SimpleScrollDistortion() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();
  const lastScrollRef = useRef(0);
  const velocityRef = useRef(0);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uVelocity: { value: 0 },
    }),
    []
  );
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Calculate scroll velocity
    const currentScroll = scroll.offset;
    const scrollDelta = Math.abs(currentScroll - lastScrollRef.current);
    lastScrollRef.current = currentScroll;
    
    // Smooth velocity
    const targetVelocity = Math.min(scrollDelta * 100, 1);
    velocityRef.current += (targetVelocity - velocityRef.current) * 0.1;
    
    // Decay
    if (scrollDelta < 0.0001) {
      velocityRef.current *= 0.92;
    }
    
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uVelocity.value = velocityRef.current;
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <planeGeometry args={[50, 50]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform float uVelocity;
          varying vec2 vUv;
          
          void main() {
            // Create distortion overlay effect
            vec2 center = vUv - 0.5;
            float dist = length(center);
            
            // RGB shift visualization
            float r = smoothstep(0.3, 0.5, dist + uVelocity * 0.1);
            float b = smoothstep(0.3, 0.5, dist - uVelocity * 0.1);
            
            // Scan line effect
            float scanLine = sin(vUv.y * 500.0 + uTime * 10.0) * 0.5 + 0.5;
            scanLine = pow(scanLine, 8.0) * uVelocity;
            
            // Vignette
            float vignette = 1.0 - dist * uVelocity * 2.0;
            
            // Combine effects
            float alpha = (r - b) * uVelocity * 0.3 + scanLine * 0.1;
            alpha *= smoothstep(0.0, 0.1, uVelocity);
            
            gl_FragColor = vec4(1.0, 0.0, 0.0, alpha * 0.1);
          }
        `}
      />
    </mesh>
  );
}

// Hook to track scroll velocity for use in other components
export function useScrollVelocity() {
  const scroll = useScroll();
  const lastScrollRef = useRef(0);
  const velocityRef = useRef(0);
  
  useFrame(() => {
    const currentScroll = scroll.offset;
    const scrollDelta = Math.abs(currentScroll - lastScrollRef.current);
    lastScrollRef.current = currentScroll;
    
    const targetVelocity = Math.min(scrollDelta * 100, 1);
    velocityRef.current += (targetVelocity - velocityRef.current) * 0.1;
    
    if (scrollDelta < 0.0001) {
      velocityRef.current *= 0.92;
    }
  });
  
  return velocityRef;
}
