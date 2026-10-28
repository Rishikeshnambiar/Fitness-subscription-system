'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

export interface ParticleFieldProps {
  totalCount?: number;
}

interface BokehParticle {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  driftX: number;
  driftY: number;
}

/**
 * Ambient particle field background with ~200 tiny glowing particles
 * matching the fitness platform accent palette (Cyan, Magenta, Gold).
 * Includes depth-of-field optical bokeh and slow parallax drift.
 */
export function ParticleField({ totalCount = 200 }: ParticleFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const bokehGroupRef = useRef<THREE.Group>(null);

  // Divide totalCount across the 3 accent colors (~200 particles total)
  const cyanCount = Math.round(totalCount * 0.38); // ~76
  const magentaCount = Math.round(totalCount * 0.35); // ~70
  const goldCount = totalCount - cyanCount - magentaCount; // ~54

  // Foreground soft bokeh orbs for cinematic depth-of-field
  const bokehParticles = useMemo<BokehParticle[]>(() => {
    const colors = ['#00f0ff', '#ff006e', '#ffd700'];
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        Math.random() * 3 + 3.5, // Foreground near camera (z between 3.5 and 6.5)
      ],
      scale: Math.random() * 0.28 + 0.15,
      color: colors[i % colors.length],
      speed: Math.random() * 0.4 + 0.2,
      driftX: (Math.random() - 0.5) * 0.05,
      driftY: (Math.random() - 0.5) * 0.05,
    }));
  }, []);

  useFrame((state, delta) => {
    // Parallax sway reacting to mouse
    if (groupRef.current) {
      const targetX = state.pointer.x * 0.25;
      const targetY = state.pointer.y * 0.25;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetX,
        0.02
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -targetY,
        0.02
      );
    }

    // Gentle motion for foreground bokeh layer (amplified parallax = depth of field)
    if (bokehGroupRef.current) {
      const targetX = state.pointer.x * 0.6;
      const targetY = state.pointer.y * 0.6;
      bokehGroupRef.current.position.x = THREE.MathUtils.lerp(
        bokehGroupRef.current.position.x,
        targetX,
        0.04
      );
      bokehGroupRef.current.position.y = THREE.MathUtils.lerp(
        bokehGroupRef.current.position.y,
        targetY,
        0.04
      );
      bokehGroupRef.current.rotation.z += delta * 0.02;
    }

    // Subtle breathing pulse for focal ambient glow
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      const s = 1 + Math.sin(t * 1.5) * 0.08;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Cyan Sparkles (~76 particles) */}
      <Sparkles
        count={cyanCount}
        scale={[12, 9, 8]}
        size={3.4}
        speed={0.35}
        opacity={0.85}
        color="#00f0ff"
        noise={[0.8, 1.2, 0.8]}
      />

      {/* 2. Magenta Sparkles (~70 particles) */}
      <Sparkles
        count={magentaCount}
        scale={[14, 11, 10]}
        size={2.8}
        speed={0.25}
        opacity={0.75}
        color="#ff006e"
        noise={[1.0, 0.8, 1.0]}
      />

      {/* 3. Gold Sparkles (~54 particles) */}
      <Sparkles
        count={goldCount}
        scale={[16, 12, 12]}
        size={3.6}
        speed={0.2}
        opacity={0.7}
        color="#ffd700"
        noise={[0.6, 0.6, 0.6]}
      />

      {/* Deep Background Fine Dust Layer */}
      <Sparkles
        count={40}
        scale={[20, 14, 14]}
        size={1.6}
        speed={0.12}
        opacity={0.4}
        color="#88a0c8"
      />

      {/* Foreground Cinematic Bokeh Orbs (Depth-of-field feeling) */}
      <group ref={bokehGroupRef}>
        {bokehParticles.map((bokeh, idx) => (
          <mesh
            key={idx}
            position={bokeh.position}
            scale={bokeh.scale}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial
              color={bokeh.color}
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* Subtle Focal Center Glow Mesh */}
      <mesh ref={meshRef} position={[0, 0, -2]}>
        <sphereGeometry args={[2.5, 24, 24]} />
        <meshBasicMaterial
          color="#101528"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default ParticleField;
