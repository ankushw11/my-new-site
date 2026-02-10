"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Floating geometric shapes that respond to mouse
interface FloatingShapeProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  shape?: "box" | "sphere" | "octahedron" | "torus" | "cone" | "cylinder";
  wireframe?: boolean;
  distort?: boolean;
  speed?: number;
}

export function FloatingShape({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color = "#000000",
  shape = "box",
  wireframe = false,
  distort = false,
  speed = 1,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.001 * speed;
    meshRef.current.rotation.y += 0.002 * speed;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "sphere":
        return <sphereGeometry args={[1, 32, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case "cone":
        return <coneGeometry args={[1, 2, 32]} />;
      case "cylinder":
        return <cylinderGeometry args={[1, 1, 2, 32]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  }, [shape]);

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        {geometry}
        {distort ? (
          <MeshDistortMaterial
            color={color}
            wireframe={wireframe}
            distort={0.3}
            speed={2}
          />
        ) : (
          <meshStandardMaterial color={color} wireframe={wireframe} />
        )}
      </mesh>
    </Float>
  );
}

// Grid of floating cubes (for Web3 section)
export function CubeGrid({
  count = 5,
  spacing = 2,
  color = "#000000",
}: {
  count?: number;
  spacing?: number;
  color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const cubes = useMemo(() => {
    const items = [];
    const offset = ((count - 1) * spacing) / 2;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        for (let z = 0; z < count; z++) {
          // Only render outer cubes (hollow cube effect)
          if (
            x === 0 ||
            x === count - 1 ||
            y === 0 ||
            y === count - 1 ||
            z === 0 ||
            z === count - 1
          ) {
            items.push({
              position: [
                x * spacing - offset,
                y * spacing - offset,
                z * spacing - offset,
              ] as [number, number, number],
              delay: (x + y + z) * 0.1,
            });
          }
        }
      }
    }
    return items;
  }, [count, spacing]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position} scale={0.3}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} wireframe />
        </mesh>
      ))}
    </group>
  );
}

// Neural network visualization (for AI section)
export function NeuralNetwork({
  layers = [4, 6, 6, 4],
  color = "#000000",
  accentColor = "#FF0000",
}: {
  layers?: number[];
  color?: string;
  accentColor?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { nodes, connections } = useMemo(() => {
    const nodePositions: THREE.Vector3[] = [];
    const connectionIndices: number[] = [];

    const layerSpacing = 3;
    const nodeSpacing = 1.5;

    layers.forEach((nodeCount, layerIndex) => {
      const layerX = layerIndex * layerSpacing - ((layers.length - 1) * layerSpacing) / 2;
      const startY = -((nodeCount - 1) * nodeSpacing) / 2;

      for (let i = 0; i < nodeCount; i++) {
        nodePositions.push(new THREE.Vector3(layerX, startY + i * nodeSpacing, 0));

        // Connect to previous layer
        if (layerIndex > 0) {
          const prevLayerStart = layers
            .slice(0, layerIndex)
            .reduce((a, b) => a + b, 0);
          const currentIndex = prevLayerStart + layers[layerIndex - 1] + i;

          for (let j = 0; j < layers[layerIndex - 1]; j++) {
            connectionIndices.push(prevLayerStart + j, currentIndex);
          }
        }
      }
    });

    return { nodes: nodePositions, connections: connectionIndices };
  }, [layers]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];

    for (let i = 0; i < connections.length; i += 2) {
      const start = nodes[connections[i]];
      const end = nodes[connections[i + 1]];
      if (start && end) {
        positions.push(start.x, start.y, start.z);
        positions.push(end.x, end.y, end.z);
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }, [nodes, connections]);

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? accentColor : color}
            emissive={i % 3 === 0 ? accentColor : undefined}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Connections */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color={color} opacity={0.3} transparent />
      </lineSegments>
    </group>
  );
}

// Geometric tunnel (for scroll experience)
export function GeometricTunnel({
  segments = 20,
  radius = 5,
  length = 50,
  color = "#000000",
}: {
  segments?: number;
  radius?: number;
  length?: number;
  color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    const items = [];
    for (let i = 0; i < segments; i++) {
      items.push({
        position: [0, 0, -i * (length / segments)] as [number, number, number],
        rotation: [0, 0, (i * Math.PI) / 8] as [number, number, number],
        scale: 1 - (i / segments) * 0.3,
      });
    }
    return items;
  }, [segments, length]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z += 0.002 * (i % 2 === 0 ? 1 : -1);
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh
          key={i}
          position={ring.position}
          rotation={ring.rotation}
          scale={ring.scale}
        >
          <torusGeometry args={[radius, 0.05, 8, i % 2 === 0 ? 4 : 6]} />
          <meshStandardMaterial color={color} wireframe />
        </mesh>
      ))}
    </group>
  );
}
