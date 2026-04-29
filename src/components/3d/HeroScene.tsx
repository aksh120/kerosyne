// @ts-nocheck
"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Abstract Complex Wireframe Core
function AbstractCore() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Smooth dynamic rotation based on time only
    groupRef.current.rotation.y = t * 0.2;
    groupRef.current.rotation.x = t * 0.1;
    
    // Rotate the inner objects slightly differently for a complex mechanical feel
    if (groupRef.current.children[0]) {
      groupRef.current.children[0].rotation.x = t * 0.2;
      groupRef.current.children[0].rotation.y = t * 0.15;
    }
    if (groupRef.current.children[1]) {
      groupRef.current.children[1].rotation.x = -t * 0.1;
      groupRef.current.children[1].rotation.z = t * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer twisting knot */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <torusKnotGeometry args={[1, 0.25, 256, 32, 3, 4]} />
        <meshStandardMaterial
          color="#000000"
          wireframe
        />
      </mesh>
      
      {/* Inner sharp geometry */}
      <mesh scale={[1.1, 1.1, 1.1]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#000000"
          wireframe
        />
      </mesh>
      
      {/* Central dense core */}
      <mesh scale={[0.6, 0.6, 0.6]}>
        <octahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#000000" wireframe />
      </mesh>
    </group>
  );
}

// Orbiting technical rings
function OrbitRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.x = t * 0.2;
    groupRef.current.rotation.y = t * 0.3;
  });

  return (
    <group ref={groupRef}>
      <mesh scale={[2.2, 2.2, 2.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.005, 16, 100]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh scale={[1.8, 1.8, 1.8]} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[1, 0.008, 16, 100]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh scale={[2.6, 2.6, 2.6]} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[1, 0.003, 16, 100]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

// Floating particles around the core
function FloatingParticles({ count = 100 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 2, // Keep Z range small so they stay behind/in front of core but not too close to camera
      ] as [number, number, number],
      speed: Math.random() * 0.5 + 0.2,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const dummy = new THREE.Object3D();

    particles.forEach((particle, i) => {
      dummy.position.set(
        particle.position[0],
        particle.position[1],
        particle.position[2]
      );
      // Subtle twinkle/scale effect only
      dummy.scale.setScalar(0.015 + Math.sin(t * 1.5 + particle.offset) * 0.005);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#000000" />
    </instancedMesh>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -3, -5]} intensity={0.4} />

        <AbstractCore />

        <OrbitRings />
        <FloatingParticles count={100} />
      </Canvas>
    </div>
  );
}
