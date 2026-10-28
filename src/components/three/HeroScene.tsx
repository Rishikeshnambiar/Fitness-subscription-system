'use client';

import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'motion/react';
import { FloatingEquipment } from './FloatingEquipment';
import { ParticleField } from './ParticleField';

export interface HeroSceneProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Animated scene lighting controller reacting subtly to cursor
 */
function SceneRig() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      const targetX = state.pointer.x * 2.5;
      const targetY = state.pointer.y * 2.0;
      lightRef.current.position.x = THREE.MathUtils.lerp(
        lightRef.current.position.x,
        targetX,
        0.05
      );
      lightRef.current.position.y = THREE.MathUtils.lerp(
        lightRef.current.position.y,
        targetY + 1,
        0.05
      );
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 1.5, 4.5]}
      intensity={3.0}
      distance={10}
      color="#ffffff"
      decay={2}
    />
  );
}

/**
 * SceneContent - Clean studio lighting with titanium metallic reflections.
 */
function SceneContent() {
  return (
    <>
      {/* Studio Fog */}
      <fog attach="fog" args={['#09090b', 7, 24]} />

      {/* Ambient Lighting */}
      <ambientLight intensity={0.5} />

      {/* Primary Key Light (Soft White Studio Light) */}
      <directionalLight
        position={[6, 8, 6]}
        intensity={2.2}
        color="#ffffff"
      />

      {/* Cool Fill Light */}
      <directionalLight
        position={[-6, -3, -2]}
        intensity={0.8}
        color="#64748b"
      />

      {/* Subtle Athletic Emerald Rim Light */}
      <pointLight
        position={[0, 3.5, -4.0]}
        intensity={2.0}
        distance={12}
        color="#10b981"
        decay={2}
      />

      {/* Interactive cursor light */}
      <SceneRig />

      {/* Micro-particle atmosphere */}
      <ParticleField totalCount={80} />

      {/* 3D Equipment */}
      <FloatingEquipment />

      {/* High-fidelity studio reflections */}
      <Suspense fallback={null}>
        <Environment preset="studio" />
      </Suspense>
    </>
  );
}

export function HeroScene({ className = '', children }: HeroSceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`absolute inset-0 w-full h-full overflow-hidden bg-[#09090b] ${className}`}
    >
      {/* R3F Canvas - fills container absolutely */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
        performance={{ min: 0.5 }}
        frameloop="always"
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        className="absolute inset-0 w-full h-full"
      >
        <SceneContent />
      </Canvas>

      {/* Smooth vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80" />

      {children && (
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {children}
        </div>
      )}
    </motion.div>
  );
}

export default HeroScene;
