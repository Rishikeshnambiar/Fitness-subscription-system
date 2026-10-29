'use client';

import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'motion/react';
import { FloatingEquipment, type EquipmentType } from './FloatingEquipment';
import { ParticleField } from './ParticleField';

export interface HeroSceneProps {
  className?: string;
  activeEquipment?: EquipmentType;
  children?: React.ReactNode;
}

/**
 * Animated scene lighting controller reacting to cursor
 */
function SceneRig() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      const targetX = state.pointer.x * 3.0;
      const targetY = state.pointer.y * 2.5;
      lightRef.current.position.x = THREE.MathUtils.lerp(
        lightRef.current.position.x,
        targetX,
        0.05
      );
      lightRef.current.position.y = THREE.MathUtils.lerp(
        lightRef.current.position.y,
        targetY + 1.2,
        0.05
      );
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 1.8, 4.5]}
      intensity={2.8}
      distance={12}
      color="#ffffff"
      decay={2}
    />
  );
}

/**
 * SceneContent - Studio lighting with metallic reflections, contact shadows & OrbitControls
 */
function SceneContent({ activeEquipment = 'dumbbell' }: { activeEquipment?: EquipmentType }) {
  return (
    <>
      <ambientLight intensity={0.6} />

      {/* Primary Key Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.4}
        color="#ffffff"
      />

      {/* Rim light with Athletic Emerald tint */}
      <directionalLight
        position={[-6, 4, -4]}
        intensity={1.8}
        color="#10b981"
      />

      {/* Bottom fill bounce */}
      <pointLight
        position={[0, -2.5, 2]}
        intensity={0.8}
        distance={8}
        color="#64748b"
      />

      {/* Interactive cursor light */}
      <SceneRig />

      {/* Subtle particle micro-atmosphere */}
      <ParticleField totalCount={60} />

      {/* Interactive 3D Equipment Piece */}
      <FloatingEquipment activeType={activeEquipment} />

      {/* Contact Shadow on Virtual Pedestal */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.65}
        scale={6}
        blur={2}
        far={4}
        color="#000000"
      />

      {/* Smooth OrbitControls: Enables user to drag, spin & inspect in 360° */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.0}
        dampingFactor={0.06}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.7}
      />

      {/* High-fidelity studio reflections */}
      <Suspense fallback={null}>
        <Environment preset="studio" />
      </Suspense>
    </>
  );
}

export function HeroScene({ className = '', activeEquipment = 'dumbbell', children }: HeroSceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42, near: 0.1, far: 100 }}
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
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <SceneContent activeEquipment={activeEquipment} />
      </Canvas>

      {children && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {children}
        </div>
      )}
    </motion.div>
  );
}

export default HeroScene;
