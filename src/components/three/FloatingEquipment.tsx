'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export interface EquipmentPieceProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

/**
 * Procedural 3D Dumbbell — Precision Matte Urethane with Knurled Chrome Steel Handle
 */
export function Dumbbell({
  position = [2.4, 0.8, -0.2],
  rotation = [0.35, -0.4, 0.25],
  scale = 0.9,
}: EquipmentPieceProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.z += delta * 0.08;

      const targetX = state.pointer.x * 0.35;
      const targetY = state.pointer.y * 0.35;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetY + 0.3,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        position[1] + targetY * 0.2,
        0.05
      );
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8} floatingRange={[-0.15, 0.15]}>
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        {/* Central Steel Handle */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.065, 0.065, 1.45, 32]} />
          <meshStandardMaterial color="#d4d4d8" metalness={0.96} roughness={0.15} />
        </mesh>

        {/* Handle Knurling Rings */}
        {[-0.22, 0, 0.22].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 0.16, 32]} />
            <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.3} />
          </mesh>
        ))}

        {/* Left Weight Stack */}
        <group position={[-0.52, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.54, 0.54, 0.14, 48]} />
            <meshStandardMaterial color="#18181b" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Subtle Emerald Accent Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.545, 0.545, 0.03, 48]} />
            <meshStandardMaterial color="#10b981" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[-0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.44, 0.44, 0.12, 48]} />
            <meshStandardMaterial color="#27272a" metalness={0.65} roughness={0.35} />
          </mesh>
        </group>

        {/* Right Weight Stack */}
        <group position={[0.52, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.54, 0.54, 0.14, 48]} />
            <meshStandardMaterial color="#18181b" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Subtle Emerald Accent Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.545, 0.545, 0.03, 48]} />
            <meshStandardMaterial color="#10b981" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.44, 0.44, 0.12, 48]} />
            <meshStandardMaterial color="#27272a" metalness={0.65} roughness={0.35} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

/**
 * Procedural 3D Kettlebell — Textured Cast Iron with Polished Steel Handle
 */
export function Kettlebell({
  position = [-2.4, -0.4, 0.2],
  rotation = [0.2, 0.45, -0.15],
  scale = 0.9,
}: EquipmentPieceProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
      const targetX = state.pointer.x * 0.3;
      const targetY = state.pointer.y * 0.3;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -targetY * 0.3 + 0.15,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        position[1] + targetY * 0.15,
        0.05
      );
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.45} floatIntensity={0.7} floatingRange={[-0.12, 0.12]}>
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        {/* Main Body */}
        <mesh position={[0, 0, 0]} scale={[1, 0.95, 1]}>
          <sphereGeometry args={[0.72, 48, 48]} />
          <meshStandardMaterial color="#18181b" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Stable Base */}
        <mesh position={[0, -0.64, 0]}>
          <cylinderGeometry args={[0.42, 0.46, 0.1, 32]} />
          <meshStandardMaterial color="#09090b" metalness={0.8} roughness={0.45} />
        </mesh>

        {/* Subtle Athletic Emerald Ring */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.728, 0.025, 24, 64]} />
          <meshStandardMaterial color="#10b981" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Handle */}
        <mesh position={[0, 0.76, 0]}>
          <torusGeometry args={[0.4, 0.08, 32, 48]} />
          <meshStandardMaterial color="#e4e4e7" metalness={0.94} roughness={0.16} />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Procedural 3D Barbell Competition Bumper Plate — Matte Black with Chrome Center Hub
 */
export function BarbellPlate({
  position = [1.8, -1.2, 0.5],
  rotation = [0.85, 0.4, -0.6],
  scale = 0.85,
}: EquipmentPieceProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.18;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.9} floatingRange={[-0.15, 0.15]}>
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        {/* Outer Heavy Rubber Rim */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.14, 64]} />
          <meshStandardMaterial color="#18181b" metalness={0.5} roughness={0.45} />
        </mesh>

        {/* Outer Edge Bevel */}
        <mesh position={[0, 0, 0.07]}>
          <torusGeometry args={[0.94, 0.035, 20, 64]} />
          <meshStandardMaterial color="#27272a" metalness={0.6} roughness={0.35} />
        </mesh>

        {/* Chrome Stainless Steel Center Hub */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.16, 48]} />
          <meshStandardMaterial color="#e4e4e7" metalness={0.96} roughness={0.12} />
        </mesh>

        {/* Center Olympic Barbell Hole */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.18, 32]} />
          <meshStandardMaterial color="#09090b" metalness={0.9} roughness={0.3} />
        </mesh>

        {/* Subtle Emerald Calibration Stripe */}
        <mesh position={[0, 0, 0.072]}>
          <torusGeometry args={[0.74, 0.015, 16, 64]} />
          <meshStandardMaterial color="#10b981" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * All Floating Equipment Group
 */
export function FloatingEquipment() {
  return (
    <group>
      <Dumbbell />
      <Kettlebell />
      <BarbellPlate />
    </group>
  );
}

export default FloatingEquipment;
