'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

export interface ParticleFieldProps {
  totalCount?: number;
}

/**
 * Clean, subtle, luxury micro-particle field with fine platinum/silver sparkles.
 * Eliminates noisy multicolored circles in favor of a crisp, studio atmosphere.
 */
export function ParticleField({ totalCount = 100 }: ParticleFieldProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Subtle, fine atmospheric sparkles in ice-white */}
      <Sparkles
        count={totalCount}
        scale={[12, 8, 8]}
        size={1.4}
        speed={0.2}
        opacity={0.4}
        color="#e4e4e7"
      />
      {/* Secondary micro-particles in subtle emerald accent */}
      <Sparkles
        count={30}
        scale={[10, 6, 6]}
        size={1.8}
        speed={0.15}
        opacity={0.25}
        color="#10b981"
      />
    </group>
  );
}

export default ParticleField;
