'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export type EquipmentType = 'dumbbell' | 'kettlebell' | 'plate';

interface EquipmentViewerProps {
  activeType?: EquipmentType;
}

/**
 * Procedural Olympic Hex Dumbbell
 * High-precision knurled steel bar with dual-stage beveled urethane heads and calibration ring
 */
export function ShowcaseDumbbell() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group ref={meshRef} rotation={[0.3, 0.2, 0.15]} scale={1.15}>
        {/* Central Steel Handle with Ergonomic Taper */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.075, 0.08, 1.5, 48]} />
          <meshStandardMaterial
            color="#e4e4e7"
            metalness={0.98}
            roughness={0.18}
          />
        </mesh>

        {/* Diamond Knurling Grips (3-Band Precision Pattern) */}
        {[-0.32, 0, 0.32].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.082, 0.082, 0.22, 32]} />
            <meshStandardMaterial
              color="#a1a1aa"
              metalness={0.95}
              roughness={0.35}
            />
          </mesh>
        ))}

        {/* Shaft Collars (Chrome stops) */}
        {[-0.6, 0.6].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.13, 0.13, 0.06, 32]} />
            <meshStandardMaterial color="#f4f4f5" metalness={0.98} roughness={0.1} />
          </mesh>
        ))}

        {/* Left Urethane Head */}
        <group position={[-0.82, 0, 0]}>
          {/* Main Hex/Beveled Heavy Head */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.62, 0.62, 0.38, 6]} />
            <meshStandardMaterial color="#141416" metalness={0.4} roughness={0.5} />
          </mesh>
          {/* Beveled Outer Cap */}
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.54, 0.62, 0.08, 6]} />
            <meshStandardMaterial color="#1c1c20" metalness={0.5} roughness={0.4} />
          </mesh>
          {/* Emerald Calibration Band */}
          <mesh position={[0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.625, 0.625, 0.03, 6]} />
            <meshStandardMaterial color="#10b981" metalness={0.85} roughness={0.2} emissive="#059669" emissiveIntensity={0.2} />
          </mesh>
          {/* Center Weight Indicator Hub */}
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
          {/* Emerald Calibration Band */}
          <mesh position={[-0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.625, 0.625, 0.03, 6]} />
            <meshStandardMaterial color="#10b981" metalness={0.85} roughness={0.2} emissive="#059669" emissiveIntensity={0.2} />
          </mesh>
          {/* Center Weight Indicator Hub */}
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
 * Procedural Competition Kettlebell
 * Cast iron spherical bell with machine-milled flat bottom and brushed stainless competition horn
 */
export function ShowcaseKettlebell() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group ref={meshRef} rotation={[0.15, 0.3, -0.05]} scale={1.2}>
        {/* Main Cast Iron Bell Sphere */}
        <mesh position={[0, -0.15, 0]} scale={[1, 0.98, 1]}>
          <sphereGeometry args={[0.82, 64, 64]} />
          <meshStandardMaterial color="#17171a" metalness={0.7} roughness={0.42} />
        </mesh>

        {/* Milled Flat Base */}
        <mesh position={[0, -0.88, 0]}>
          <cylinderGeometry args={[0.48, 0.52, 0.12, 48]} />
          <meshStandardMaterial color="#0e0e11" metalness={0.8} roughness={0.35} />
        </mesh>

        {/* Equatorial Calibration Recess & Emerald Inlay */}
        <mesh position={[0, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.825, 0.028, 24, 64]} />
          <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.2} emissive="#059669" emissiveIntensity={0.25} />
        </mesh>

        {/* Bell-to-Handle Transition Mounts */}
        {[-0.32, 0.32].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0.6, 0]}>
            <cylinderGeometry args={[0.09, 0.11, 0.22, 32]} />
            <meshStandardMaterial color="#27272a" metalness={0.9} roughness={0.25} />
          </mesh>
        ))}

        {/* Competition Stainless Steel Horn Handle */}
        <mesh position={[0, 0.88, 0]}>
          <torusGeometry args={[0.42, 0.085, 32, 64]} />
          <meshStandardMaterial color="#f4f4f5" metalness={0.97} roughness={0.14} />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Procedural Calibrated Olympic Bumper Plate
 * 450mm Olympic diameter with high-density vulcanized rubber outer rim and mirror chrome center hub
 */
export function ShowcaseBumperPlate() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.45;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1 + 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group ref={meshRef} rotation={[0.4, 0.3, -0.2]} scale={1.25}>
        {/* Outer Heavy Vulcanized Urethane Rim */}
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

        {/* Emerald Calibration Ring (Olympic Standard Identification) */}
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
 * Main Interactive Viewer Component
 */
export function FloatingEquipment({ activeType = 'dumbbell' }: EquipmentViewerProps) {
  return (
    <group position={[0, 0, 0]}>
      {activeType === 'dumbbell' && <ShowcaseDumbbell />}
      {activeType === 'kettlebell' && <ShowcaseKettlebell />}
      {activeType === 'plate' && <ShowcaseBumperPlate />}
    </group>
  );
}

export default FloatingEquipment;
