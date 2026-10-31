'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export type EquipmentType = 'dumbbell' | 'kettlebell' | 'plate' | 'barbell' | 'trapbar' | 'shaker';

interface EquipmentViewerProps {
  activeType?: EquipmentType;
}

/**
 * 01 // Olympic Hex Dumbbell
 */
export function ShowcaseDumbbell() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group ref={meshRef} rotation={[0.3, 0.2, 0.15]} scale={1.15}>
        {/* Handle */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.075, 0.08, 1.5, 48]} />
          <meshStandardMaterial color="#e4e4e7" metalness={0.98} roughness={0.18} />
        </mesh>

        {/* Diamond Knurling Grips */}
        {[-0.32, 0, 0.32].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.082, 0.082, 0.22, 32]} />
            <meshStandardMaterial color="#a1a1aa" metalness={0.95} roughness={0.35} />
          </mesh>
        ))}

        {/* Collars */}
        {[-0.6, 0.6].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.13, 0.13, 0.06, 32]} />
            <meshStandardMaterial color="#f4f4f5" metalness={0.98} roughness={0.1} />
          </mesh>
        ))}

        {/* Left Urethane Head */}
        <group position={[-0.82, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.62, 0.62, 0.38, 6]} />
            <meshStandardMaterial color="#141416" metalness={0.4} roughness={0.5} />
          </mesh>
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.54, 0.62, 0.08, 6]} />
            <meshStandardMaterial color="#1c1c20" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.625, 0.625, 0.03, 6]} />
            <meshStandardMaterial color="#10b981" metalness={0.85} roughness={0.2} emissive="#059669" emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[-0.245, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.02, 32]} />
            <meshStandardMaterial color="#27272a" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* Right Urethane Head */}
        <group position={[0.82, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.62, 0.62, 0.38, 6]} />
            <meshStandardMaterial color="#141416" metalness={0.4} roughness={0.5} />
          </mesh>
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.62, 0.54, 0.08, 6]} />
            <meshStandardMaterial color="#1c1c20" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[-0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.625, 0.625, 0.03, 6]} />
            <meshStandardMaterial color="#10b981" metalness={0.85} roughness={0.2} emissive="#059669" emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[0.245, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.02, 32]} />
            <meshStandardMaterial color="#27272a" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

/**
 * 02 // Competition Kettlebell
 */
export function ShowcaseKettlebell() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group ref={meshRef} rotation={[0.15, 0.3, -0.05]} scale={1.2}>
        {/* Main Bell Sphere */}
        <mesh position={[0, -0.15, 0]} scale={[1, 0.98, 1]}>
          <sphereGeometry args={[0.82, 64, 64]} />
          <meshStandardMaterial color="#17171a" metalness={0.7} roughness={0.42} />
        </mesh>

        {/* Flat Base */}
        <mesh position={[0, -0.88, 0]}>
          <cylinderGeometry args={[0.48, 0.52, 0.12, 48]} />
          <meshStandardMaterial color="#0e0e11" metalness={0.8} roughness={0.35} />
        </mesh>

        {/* Emerald Inlay */}
        <mesh position={[0, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.825, 0.028, 24, 64]} />
          <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.2} emissive="#059669" emissiveIntensity={0.25} />
        </mesh>

        {/* Mounts */}
        {[-0.32, 0.32].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0.6, 0]}>
            <cylinderGeometry args={[0.09, 0.11, 0.22, 32]} />
            <meshStandardMaterial color="#27272a" metalness={0.9} roughness={0.25} />
          </mesh>
        ))}

        {/* Horn Handle */}
        <mesh position={[0, 0.88, 0]}>
          <torusGeometry args={[0.42, 0.085, 32, 64]} />
          <meshStandardMaterial color="#f4f4f5" metalness={0.97} roughness={0.14} />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * 03 // Calibrated Olympic Bumper Plate
 */
export function ShowcaseBumperPlate() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group ref={meshRef} rotation={[0.4, 0.3, -0.2]} scale={1.25}>
        {/* Outer Heavy Vulcanized Rim */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.15, 1.15, 0.18, 64]} />
          <meshStandardMaterial color="#141417" metalness={0.45} roughness={0.48} />
        </mesh>

        {/* Outer Rim Lip Profile */}
        <mesh position={[0, 0, 0.09]}>
          <torusGeometry args={[1.13, 0.035, 24, 64]} />
          <meshStandardMaterial color="#202024" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, -0.09]}>
          <torusGeometry args={[1.13, 0.035, 24, 64]} />
          <meshStandardMaterial color="#202024" metalness={0.6} roughness={0.35} />
        </mesh>

        {/* Inner Recessed Face */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.88, 0.88, 0.14, 64]} />
          <meshStandardMaterial color="#18181c" metalness={0.55} roughness={0.4} />
        </mesh>

        {/* Emerald Calibration Ring */}
        <mesh position={[0, 0, 0.075]}>
          <torusGeometry args={[0.88, 0.02, 16, 64]} />
          <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.2} emissive="#059669" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, 0, -0.075]}>
          <torusGeometry args={[0.88, 0.02, 16, 64]} />
          <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.2} emissive="#059669" emissiveIntensity={0.3} />
        </mesh>

        {/* Mirror Chrome Center Hub */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.22, 48]} />
          <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.08} />
        </mesh>

        {/* 50.4mm Olympic Sleeve Bore */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.24, 32]} />
          <meshStandardMaterial color="#09090b" metalness={0.95} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * 04 // Olympic Competition Barbell with Quick-Lock Collars
 */
export function ShowcaseBarbell() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.38;
      meshRef.current.rotation.x = 0.25 + Math.sin(Date.now() * 0.001) * 0.08;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.45} floatingRange={[-0.1, 0.1]}>
      <group ref={meshRef} rotation={[0.25, 0.4, -0.1]} scale={1.05}>
        {/* Main 28mm Steel Shaft */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 3.4, 32]} />
          <meshStandardMaterial color="#e4e4e7" metalness={0.98} roughness={0.2} />
        </mesh>

        {/* Center & Outer Knurl Bands */}
        {[-0.9, -0.3, 0.3, 0.9].map((pos, i) => (
          <mesh key={i} position={[pos, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.048, 0.048, 0.35, 32]} />
            <meshStandardMaterial color="#a1a1aa" metalness={0.95} roughness={0.38} />
          </mesh>
        ))}

        {/* Left Sleeve Collar */}
        <group position={[-1.35, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.14, 0.14, 0.08, 32]} />
            <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.1} />
          </mesh>
          {/* Rotating 50mm Sleeve */}
          <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.085, 0.085, 0.95, 32]} />
            <meshStandardMaterial color="#d4d4d8" metalness={0.98} roughness={0.15} />
          </mesh>
          {/* Quick-Lock Clamp Collar */}
          <mesh position={[-0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.13, 0.13, 0.12, 32]} />
            <meshStandardMaterial color="#10b981" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>

        {/* Right Sleeve Collar */}
        <group position={[1.35, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.14, 0.14, 0.08, 32]} />
            <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.1} />
          </mesh>
          {/* Rotating 50mm Sleeve */}
          <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.085, 0.085, 0.95, 32]} />
            <meshStandardMaterial color="#d4d4d8" metalness={0.98} roughness={0.15} />
          </mesh>
          {/* Quick-Lock Clamp Collar */}
          <mesh position={[0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.13, 0.13, 0.12, 32]} />
            <meshStandardMaterial color="#10b981" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

/**
 * 05 // Olympic Hex Deadlift Trap Bar
 */
export function ShowcaseTrapBar() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
      meshRef.current.rotation.x = 0.35 + Math.sin(Date.now() * 0.001) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.45} floatingRange={[-0.1, 0.1]}>
      <group ref={meshRef} rotation={[0.35, 0.4, 0]} scale={1.1}>
        {/* Hexagonal Frame Center Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.85, 0.045, 16, 6]} />
          <meshStandardMaterial color="#18181b" metalness={0.7} roughness={0.35} />
        </mesh>

        {/* Dual Elevated Knurled Grip Handles (Left) */}
        <group position={[-0.72, 0, 0]}>
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.048, 0.048, 0.45, 32]} />
            <meshStandardMaterial color="#e4e4e7" metalness={0.96} roughness={0.22} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.08, 0.18, 0.48]} />
            <meshStandardMaterial color="#27272a" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* Dual Elevated Knurled Grip Handles (Right) */}
        <group position={[0.72, 0, 0]}>
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.048, 0.048, 0.45, 32]} />
            <meshStandardMaterial color="#e4e4e7" metalness={0.96} roughness={0.22} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.08, 0.18, 0.48]} />
            <meshStandardMaterial color="#27272a" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* Left Loadable Sleeve */}
        <group position={[-1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.085, 0.085, 0.85, 32]} />
            <meshStandardMaterial color="#d4d4d8" metalness={0.98} roughness={0.16} />
          </mesh>
          <mesh position={[0, -0.44, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.08, 32]} />
            <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Right Loadable Sleeve */}
        <group position={[1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.085, 0.085, 0.85, 32]} />
            <meshStandardMaterial color="#d4d4d8" metalness={0.98} roughness={0.16} />
          </mesh>
          <mesh position={[0, 0.44, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.08, 32]} />
            <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

/**
 * 06 // Titanium Athlete Shaker Bottle with Wire Whisk Sphere
 */
export function ShowcaseShaker() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.42;
    }
  });

  return (
    <Float speed={1.7} rotationIntensity={0.3} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group ref={meshRef} rotation={[0.2, 0.3, -0.1]} scale={1.2}>
        {/* Main Tapered Insulated Bottle Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.34, 1.35, 48]} />
          <meshStandardMaterial color="#141417" metalness={0.85} roughness={0.3} />
        </mesh>

        {/* Measurement Scale Ring */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.425, 0.425, 0.03, 48]} />
          <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.2} emissive="#059669" emissiveIntensity={0.3} />
        </mesh>

        {/* Stainless Steel Screw-Lock Cap */}
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.44, 0.44, 0.16, 48]} />
          <meshStandardMaterial color="#e4e4e7" metalness={0.98} roughness={0.15} />
        </mesh>

        {/* Drinking Spout & Carry Loop */}
        <mesh position={[0.16, 0.86, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.14, 32]} />
          <meshStandardMaterial color="#27272a" metalness={0.8} roughness={0.35} />
        </mesh>
        <mesh position={[-0.18, 0.92, 0]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.12, 0.03, 16, 32]} />
          <meshStandardMaterial color="#10b981" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Interior Wire Whisk Blender Sphere (Semi-Visible or Hovering) */}
        <mesh position={[0.65, -0.2, 0.2]}>
          <torusGeometry args={[0.16, 0.015, 16, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.1} />
        </mesh>
        <mesh position={[0.65, -0.2, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.015, 16, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Main Interactive Viewer Component
 */
export function FloatingEquipment({ activeType = 'dumbbell' }: EquipmentViewerProps) {
  return (
    <group position={[0, 0, 0]}>
      {activeType === 'dumbbell' && <ShowcaseDumbbell />}
      {activeType === 'kettlebell' && <ShowcaseKettlebell />}
      {activeType === 'plate' && <ShowcaseBumperPlate />}
      {activeType === 'barbell' && <ShowcaseBarbell />}
      {activeType === 'trapbar' && <ShowcaseTrapBar />}
      {activeType === 'shaker' && <ShowcaseShaker />}
    </group>
  );
}

export default FloatingEquipment;
