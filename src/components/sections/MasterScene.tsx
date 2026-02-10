"use client";

import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  Points,
  PointMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText, RevealText } from "@/components/ui/SplitText";
import { cn } from "@/lib/utils";
import { Globe, Smartphone, ArrowRight } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3D OBJECTS — SECTION 04: NATIVE EXPERIENCES (Apps)
// ═══════════════════════════════════════════════════════════════════════════════

// Digital particle rain
function ParticleRain({ count = 800 }: { count?: number }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p.set(
        [
          Math.random() * 10 - 5,
          Math.random() * 10 - 5,
          Math.random() * 10 - 7,
        ],
        i * 3
      );
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    ref.current.rotation.x = state.clock.elapsedTime * 0.03;
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff0000"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

// Phone model (Three.js primitives)
function PhoneModel() {
  const deviceRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!deviceRef.current) return;
    deviceRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    deviceRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  const getAppColor = (xi: number, yi: number) => {
    const colors = ["#FF0000", "#00ffff", "#ffaa00", "#4488ff", "#00ff88", "#ff44aa"];
    return colors[(xi * 4 + yi) % colors.length];
  };

  return (
    <group ref={deviceRef} scale={1.3}>
      <mesh>
        <boxGeometry args={[1.5, 3, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.076]}>
        <boxGeometry args={[1.52, 3.02, 0.01]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[1.3, 2.7]} />
        <meshStandardMaterial color="#f5f0e8" emissive="#ffffff" emissiveIntensity={0.15} />
      </mesh>
      {[-0.4, 0, 0.4].map((x, xi) =>
        [-0.8, -0.2, 0.4, 1].map((y, yi) => (
          <mesh key={`${xi}-${yi}`} position={[x, y, 0.09]} scale={0.15}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial
              color={getAppColor(xi, yi)}
              emissive={getAppColor(xi, yi)}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))
      )}
      <mesh position={[0, 1.25, 0.09]}>
        <planeGeometry args={[0.4, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, -1.25, 0.09]}>
        <planeGeometry args={[0.5, 0.05]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[0.78, 0.5, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.1]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

// Glass panel for Apps section
function GlassPanel({
  position,
  color = "#ff0000",
}: {
  position: [number, number, number];
  color?: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    if (!mesh.current) return;
    const targetZ = hovered ? position[2] + 1.2 : position[2];
    mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, targetZ, 0.1);
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1.4, 0.05]} />
      <meshPhysicalMaterial
        transmission={1}
        thickness={0.5}
        roughness={0.1}
        ior={1.5}
        color={hovered ? color : "#ffffff"}
        transparent
        opacity={0.4}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3D OBJECTS — SECTION 02: DIGITAL PRESENCE (Websites)
// ═══════════════════════════════════════════════════════════════════════════════

// Interactive rippling grid
function InteractiveGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    const t = state.clock.getElapsedTime();
    gridRef.current.rotation.x = -Math.PI / 2.5;
    gridRef.current.position.y = -2 + Math.sin(t * 0.5) * 0.2;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, "#ff0000", "#cccccc"]}
      position={[0, -2, 0]}
    />
  );
}

// Browser panel with MeshTransmissionMaterial
function BrowserPanel({
  position,
  scale = [1.5, 1],
}: {
  position: [number, number, number];
  scale?: [number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;
    const targetZ = hovered ? position[2] + 0.5 : position[2];
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        <mesh
          ref={meshRef}
          position={position}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={scale} />
          <MeshTransmissionMaterial
            thickness={0.2}
            anisotropy={0.1}
            chromaticAberration={0.04}
            distortion={0.2}
            distortionScale={0.1}
            temporalDistortion={0.1}
            transmission={1}
            color={hovered ? "#ff0000" : "#ffffff"}
          />
        </mesh>
        <lineSegments position={position}>
          <edgesGeometry args={[new THREE.PlaneGeometry(scale[0], scale[1])]} />
          <lineBasicMaterial color="#000000" linewidth={2} />
        </lineSegments>
        <mesh position={[position[0], position[1] + scale[1] / 2 - 0.06, position[2] + 0.01]}>
          <planeGeometry args={[scale[0], 0.12]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[position[0] + scale[0] / 2 - 0.15, position[1] + scale[1] / 2 - 0.06, position[2] + 0.02]}>
          <circleGeometry args={[0.03, 16]} />
          <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={hovered ? 1 : 0.5} />
        </mesh>
      </group>
    </Float>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CAMERA RIG — Scroll-driven camera transitions
// ═══════════════════════════════════════════════════════════════════════════════

function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    // Section 1 (Apps): camera at [0, 0, 6] looking at origin
    // Section 2 (Websites): camera at [8, 1, 8] looking at [8, 0, 0]
    const t = scrollProgress;

    // Lerp camera position
    camera.position.x = THREE.MathUtils.lerp(0, 8, t);
    camera.position.y = THREE.MathUtils.lerp(0, 1, t);
    camera.position.z = THREE.MathUtils.lerp(6, 8, t);

    // Lerp look-at target
    const lookX = THREE.MathUtils.lerp(0, 8, t);
    const lookY = THREE.MathUtils.lerp(0, 0, t);
    const lookZ = THREE.MathUtils.lerp(0, 0, t);
    camera.lookAt(lookX, lookY, lookZ);
  });

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MASTER 3D SCENE — All objects in one Canvas
// ═══════════════════════════════════════════════════════════════════════════════

function MasterCanvas({ scrollProgress }: { scrollProgress: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 1000 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-3, 3, 3]} intensity={0.5} color="#FF0000" />
      <pointLight position={[3, 2, 3]} intensity={0.4} color="#00ffff" />
      <pointLight position={[12, 5, 5]} intensity={0.6} />

      {/* Camera rig driven by scroll */}
      <CameraRig scrollProgress={scrollProgress} />

      {/* ── SECTION 04 OBJECTS: Native Experiences (centered at origin) ── */}
      <group position={[0, 0, 0]}>
        <ParticleRain />
        <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
          <PhoneModel />
        </Float>
        <GlassPanel position={[-2.5, 1, 0.5]} color="#ff0000" />
        <GlassPanel position={[2.2, -0.8, 1]} color="#00ffff" />
        <GlassPanel position={[-1.8, -1.8, 0.2]} color="#ffaa00" />
        <gridHelper
          args={[30, 30, 0xeeeeee, 0xeeeeee]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, -3]}
        />
      </group>

      {/* ── SECTION 02 OBJECTS: Digital Presence (offset at x=8) ── */}
      <group position={[8, 0, 0]}>
        <InteractiveGrid />
        <BrowserPanel position={[-1, 0.5, 1]} scale={[2, 1.2]} />
        <BrowserPanel position={[1.5, -0.2, 2]} scale={[1.2, 0.8]} />
        <BrowserPanel position={[0.5, 1.2, 0]} scale={[1.5, 1]} />
      </group>
    </Canvas>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HTML SECTIONS — Scroll over the fixed 3D background
// ═══════════════════════════════════════════════════════════════════════════════

function AppsHTML() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="apps"
      className="relative min-h-screen flex items-center"
    >
      <div className="relative z-[2] pointer-events-none ml-auto w-full lg:w-1/2 px-gutter py-20">
        <div ref={contentRef} className="pointer-events-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-accent font-mono text-body-lg">04</span>
            <div className="h-px flex-1 bg-foreground/20 max-w-[100px]" />
          </div>

          <div className="mb-6">
            <Smartphone className="w-10 h-10 text-foreground" />
          </div>

          <h2 className="text-brutalist text-display-md mb-6">
            <SplitText type="words" animation="slide" stagger={0.05}>
              NATIVE EXPERIENCES
            </SplitText>
          </h2>

          <div>
            <RevealText>
              <p className="text-body-lg text-foreground-muted mb-8 max-w-lg">
                iOS, Android, and cross-platform applications crafted for human
                hands. Intuitive interfaces that feel natural and perform
                flawlessly.
              </p>
            </RevealText>
          </div>

          <ul className="space-y-3 mb-8">
            {[
              "iOS & Android Development",
              "Cross-Platform Solutions",
              "UI/UX Design",
              "App Store Optimization",
              "Maintenance & Support",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-body-md">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="https://play.google.com/store/apps/details?id=com.hometriangle.consumer&utm_source=website&utm_medium=footer&utm_campaign=website-footer-app-install&utm_content=delhi"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2",
              "text-sm font-display uppercase tracking-wider",
              "text-primary hover:text-accent",
              "transition-colors duration-300"
            )}
            data-cursor="hover"
          >
            See Our Apps
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function WebsitesHTML() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="websites"
      className="relative min-h-screen flex items-center"
    >
      <div className="relative z-[2] pointer-events-none ml-auto w-full lg:w-[40%] px-gutter py-20">
        <div ref={contentRef} className="pointer-events-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-accent font-mono text-body-lg">02</span>
            <div className="h-px flex-1 bg-foreground/20 max-w-[100px]" />
          </div>

          <div className="mb-6">
            <Globe className="w-10 h-10 text-foreground" />
          </div>

          <h2 className="text-brutalist text-display-md mb-6">
            <SplitText type="words" animation="slide" stagger={0.05}>
              DIGITAL PRESENCE
            </SplitText>
          </h2>

          <div>
            <RevealText>
              <p className="text-body-lg text-foreground-muted mb-8 max-w-lg">
                Immersive web experiences that convert visitors into believers.
                Every pixel engineered for impact, every interaction designed to
                inspire.
              </p>
            </RevealText>
          </div>

          <ul className="space-y-3 mb-8">
            {[
              "Custom Web Design",
              "WebGL & 3D Experiences",
              "E-commerce Solutions",
              "CMS Development",
              "Performance Optimization",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-body-md">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="https://zynnon.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2",
              "text-sm font-display uppercase tracking-wider",
              "text-primary hover:text-accent",
              "transition-colors duration-300"
            )}
            data-cursor="hover"
          >
            View Our Work
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTED MASTER SCENE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function MasterScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => setIsVisible(true),
        onLeave: () => setIsVisible(false),
        onEnterBack: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false),
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative" style={{ height: "200vh" }}>
      {/* Sticky 3D Canvas — sticks to viewport while container scrolls */}
      <div
        className="sticky top-0 left-0 w-full z-[1]"
        style={{
          height: "100vh",
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        <MasterCanvas scrollProgress={scrollProgress} />
      </div>

      {/* Scrollable HTML content over the 3D scene */}
      <div className="relative z-[2]" style={{ marginTop: "-100vh" }}>
        <AppsHTML />
        <WebsitesHTML />
      </div>
    </div>
  );
}
