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
  showGradientOverlays?: boolean;
}

/**
 * Animated scene lighting controller reacting subtly to cursor
 */
function SceneRig() {
  const lightRef = useRef<THREE.PointLight>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (lightRef.current) {
      // Subtle follow of cursor for dynamic highlights on metallic surfaces
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

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      {/* Interactive dynamic cursor highlight point light */}
      <pointLight
        ref={lightRef}
        position={[0, 1, 4]}
        intensity={2.5}
        distance={8}
        color="#ffffff"
        decay={2}
      />
      {/* Invisible anchor mesh holding the required THREE.Mesh ref */}
      <mesh ref={meshRef} visible={false}>
        <boxGeometry args={[0.01, 0.01, 0.01]} />
        <meshBasicMaterial />
      </mesh>
    </>
  );
}

/**
 * SceneContent - Houses the lights, environment map, floating equipment, and particles.
 */
function SceneContent() {
  return (
    <>
      {/* Atmosphere Fog */}
      <fog attach="fog" args={['#040508', 6, 22]} />

      {/* Ambient Lighting */}
      <ambientLight intensity={0.45} />

      {/* Key Directional Sunlight */}
      <directionalLight
        position={[6, 9, 6]}
        intensity={1.8}
        color="#ffffff"
      />

      {/* Cool Fill Directional Light */}
      <directionalLight
        position={[-6, -4, -3]}
        intensity={0.65}
        color="#384b66"
      />

      {/* Point Lights with Project Accent Palette */}
      {/* 1. Cyan Accent Light (illuminates Dumbbell at top right) */}
      <pointLight
        position={[3.5, 2.0, 3.0]}
        intensity={6.0}
        distance={10}
        color="#00f0ff"
        decay={2}
      />

      {/* 2. Magenta Accent Light (illuminates Kettlebell at bottom left) */}
      <pointLight
        position={[-3.5, -0.8, 3.0]}
        intensity={6.0}
        distance={10}
        color="#ff006e"
        decay={2}
      />

      {/* 3. Gold Accent Light (illuminates Barbell Plate at bottom right) */}
      <pointLight
        position={[2.6, -2.2, 3.0]}
        intensity={5.2}
        distance={9}
        color="#ffd700"
        decay={2}
      />

      {/* 4. Deep Violet Rim Light (creates silhouette separation) */}
      <pointLight
        position={[0, 4.0, -4.0]}
        intensity={3.2}
        distance={12}
        color="#8b5cf6"
        decay={2}
      />

      {/* Cursor tracking rig */}
      <SceneRig />

      {/* Ambient Particle Field (~200 glowing accent particles with depth-of-field) */}
      <ParticleField totalCount={200} />

      {/* Procedural 3D Gym Equipment */}
      <FloatingEquipment />

      {/* Studio Environment for Realistic Metallic Reflections */}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
    </>
  );
}

/**
 * HeroScene - The 3D hero scene component for the fitness platform landing page.
 * Renders passive procedural 3D gym equipment floating in space with ambient particles,
 * metallic reflection environments, and cinematic accent lighting.
 */
export function HeroScene({
  className = '',
  children,
  showGradientOverlays = true,
}: HeroSceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={`relative w-full h-full min-h-[500px] overflow-hidden ${className}`}
      style={{
        // Gradient background color for the scene container
        background:
          'radial-gradient(ellipse 90% 70% at 50% 30%, #0d1222 0%, #070912 45%, #030407 100%)',
      }}
    >
      {/* Background ambient neon glow spheres */}
      {showGradientOverlays && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Cyan Glow (top-right dumbbell focus) */}
          <div
            className="absolute top-1/6 right-1/8 w-96 h-96 rounded-full blur-[120px] opacity-25 pointer-events-none"
            style={{ backgroundColor: '#00f0ff' }}
          />

          {/* Magenta Glow (bottom-left kettlebell focus) */}
          <div
            className="absolute bottom-1/5 left-1/10 w-96 h-96 rounded-full blur-[130px] opacity-20 pointer-events-none"
            style={{ backgroundColor: '#ff006e' }}
          />

          {/* Gold Glow (bottom-right plate focus) */}
          <div
            className="absolute bottom-1/8 right-1/6 w-80 h-80 rounded-full blur-[110px] opacity-15 pointer-events-none"
            style={{ backgroundColor: '#ffd700' }}
          />
        </div>
      )}

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
          toneMappingExposure: 1.1,
        }}
        className="absolute inset-0 w-full h-full"
      >
        <SceneContent />
      </Canvas>

      {/* Vignette / bottom fade overlay for smooth transition into next page sections */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#030407] via-transparent to-transparent opacity-70" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#030407_100%)] opacity-50" />

      {/* Optional Children Layer (e.g. Hero headlines, badges, CTA buttons) */}
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {children}
        </div>
      )}
    </motion.div>
  );
}

export default HeroScene;
