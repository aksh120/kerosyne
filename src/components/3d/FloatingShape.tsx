// @ts-nocheck
"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

type ShapeType = "hanger" | "diamond" | "cube" | "torus" | "octahedron" | "tag";

// Wireframe Hanger shape — relevant to fashion
function HangerShape() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.6;
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <group ref={ref} scale={1.2}>
      {/* Hook */}
      <mesh position={[0, 0.8, 0]}>
        <torusGeometry args={[0.25, 0.03, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#000000" wireframe />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.5, 0.2, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.025, 0.025, 1.2, 8]} />
        <meshStandardMaterial color="#000000" wireframe />
      </mesh>
      <mesh position={[0.5, 0.2, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.025, 0.025, 1.2, 8]} />
        <meshStandardMaterial color="#000000" wireframe />
      </mesh>
      {/* Bottom bar */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.6, 8]} />
        <meshStandardMaterial color="#000000" wireframe />
      </mesh>
    </group>
  );
}

// Diamond shape
function DiamondShape() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#000000" wireframe />
    </mesh>
  );
}

// Cube shape
function CubeShape() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color="#000000" wireframe />
    </mesh>
  );
}

// Torus (ring) shape
function TorusShape() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.5;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.8, 0.15, 16, 32]} />
      <meshStandardMaterial color="#000000" wireframe />
    </mesh>
  );
}

// Octahedron
function OctahedronShape() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.6;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#000000" wireframe />
    </mesh>
  );
}

// Price tag shape — relevant to shopping
function TagShape() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.8;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
  });
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.8, 1.2, 0.05]} />
        <meshStandardMaterial color="#000000" wireframe />
      </mesh>
      {/* Hole in tag */}
      <mesh position={[0, 0.4, 0]}>
        <torusGeometry args={[0.1, 0.02, 8, 16]} />
        <meshStandardMaterial color="#000000" wireframe />
      </mesh>
      {/* String */}
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 4]} />
        <meshStandardMaterial color="#000000" wireframe />
      </mesh>
    </group>
  );
}

const shapeMap: Record<ShapeType, React.FC> = {
  hanger: HangerShape,
  diamond: DiamondShape,
  cube: CubeShape,
  torus: TorusShape,
  octahedron: OctahedronShape,
  tag: TagShape,
};

type FloatingShapeProps = {
  shape: ShapeType;
  size?: number;
  className?: string;
};

export default function FloatingShape({ shape, size = 100, className = "" }: FloatingShapeProps) {
  const ShapeComponent = shapeMap[shape];

  return (
    <div className={className} style={{ width: size, height: size }}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[3, 3, 3]} intensity={0.8} />
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <ShapeComponent />
        </Float>
      </Canvas>
    </div>
  );
}
