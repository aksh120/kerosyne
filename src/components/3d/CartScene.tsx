"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// A wireframe shopping bag
function ShoppingBag() {
  const ref = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.3) * 0.4 + mouseRef.current.x * 0.3;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.1 + mouseRef.current.y * 0.2;
  });

  return (
    <group ref={ref} scale={1.5}>
      {/* Bag body */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.2, 1.4, 0.6]} />
        <meshStandardMaterial color="#000000" wireframe />
      </mesh>
      {/* Handle left */}
      <mesh position={[-0.3, 0.8, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.25, 0.025, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#000000" wireframe />
      </mesh>
      {/* Handle right */}
      <mesh position={[0.3, 0.8, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.25, 0.025, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#000000" wireframe />
      </mesh>
    </group>
  );
}

export default function CartScene({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[3, 3, 3]} intensity={0.8} />
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
          <ShoppingBag />
        </Float>
      </Canvas>
    </div>
  );
}
