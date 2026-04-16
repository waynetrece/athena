"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Floating gold particles — editorial luxury atmosphere ─── */

function Particles({ count = 80 }) {
  const meshRef = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, [count]);

  useEffect(() => {
    if (!geoRef.current) return;
    geoRef.current.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }, [positions]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.06;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.04;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial
        size={0.035}
        color="#D4AF37"
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.04;
    ref.current.rotation.z = t * 0.025;
  });

  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <torusGeometry args={[3.5, 0.004, 16, 120]} />
      <meshBasicMaterial color="#D4AF37" transparent opacity={0.06} />
    </mesh>
  );
}

function FloatingRing2() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.035;
    ref.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.2) * 0.1;
  });

  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <torusGeometry args={[5, 0.003, 16, 120]} />
      <meshBasicMaterial color="#D4AF37" transparent opacity={0.03} />
    </mesh>
  );
}

export function ParticlesBg() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
        <FloatingRing />
        <FloatingRing2 />
      </Canvas>
    </div>
  );
}
