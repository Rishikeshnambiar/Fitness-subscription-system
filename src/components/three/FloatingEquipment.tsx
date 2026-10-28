'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

export interface EquipmentPieceProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

/**
 * Procedural 3D Dumbbell built from cylinders and spheres
 * Accented with project Cyan (#00f0ff) metallic elements
 */
export function Dumbbell({
  position = [2.5, 1.2, -0.2],
  rotation = [0.35, -0.4, 0.25],
  scale = 1,
}: EquipmentPieceProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle continuous rotation
      groupRef.current.rotation.y += delta * 0.32;
      groupRef.current.rotation.z += delta * 0.12;

      // Responsive tilt towards mouse pointer
      const targetX = state.pointer.x * 0.45;
      const targetY = state.pointer.y * 0.45;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetY + 0.3,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        position[1] + targetY * 0.25,
        0.05
      );
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        position[0] + targetX * 0.2,
        0.05
      );
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.65}
      floatIntensity={1.2}
      floatingRange={[-0.18, 0.18]}
    >
      <group
        ref={groupRef}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        {/* Central Steel Handle */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.065, 0.065, 1.45, 32]} />
          <meshStandardMaterial
            color="#2a303e"
            metalness={0.92}
            roughness={0.22}
          />
        </mesh>

        {/* Handle Knurling / Chrome Grips */}
        {[-0.22, 0, 0.22].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.072, 0.072, 0.16, 32]} />
            <meshStandardMaterial
              color="#00f0ff"
              metalness={0.88}
              roughness={0.25}
              emissive="#004050"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}

        {/* Collar Stopper Rings */}
        {[-0.42, 0.42].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
            <meshStandardMaterial
              color="#161922"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        ))}

        {/* Left Weight Stack */}
        <group position={[-0.52, 0, 0]}>
          {/* Inner Plate */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.54, 0.54, 0.14, 48]} />
            <meshStandardMaterial
              color="#171a22"
              metalness={0.85}
              roughness={0.28}
            />
          </mesh>

          {/* Cyan Metallic Accent Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.548, 0.548, 0.04, 48]} />
            <meshStandardMaterial
              color="#00f0ff"
              metalness={0.92}
              roughness={0.15}
              emissive="#00f0ff"
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Outer Plate */}
          <mesh position={[-0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.44, 0.44, 0.12, 48]} />
            <meshStandardMaterial
              color="#1e222e"
              metalness={0.88}
              roughness={0.24}
            />
          </mesh>

          {/* End Cap Sphere */}
          <mesh position={[-0.26, 0, 0]}>
            <sphereGeometry args={[0.13, 32, 32]} />
            <meshStandardMaterial
              color="#2e3547"
              metalness={0.92}
              roughness={0.18}
            />
          </mesh>

          {/* Cyan Core Sphere with MeshDistortMaterial */}
          <mesh ref={meshRef} position={[-0.31, 0, 0]}>
            <sphereGeometry args={[0.075, 24, 24]} />
            <MeshDistortMaterial
              color="#00f0ff"
              speed={2.2}
              distort={0.18}
              metalness={0.95}
              roughness={0.12}
            />
          </mesh>
        </group>

        {/* Right Weight Stack */}
        <group position={[0.52, 0, 0]}>
          {/* Inner Plate */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.54, 0.54, 0.14, 48]} />
            <meshStandardMaterial
              color="#171a22"
              metalness={0.85}
              roughness={0.28}
            />
          </mesh>

          {/* Cyan Metallic Accent Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.548, 0.548, 0.04, 48]} />
            <meshStandardMaterial
              color="#00f0ff"
              metalness={0.92}
              roughness={0.15}
              emissive="#00f0ff"
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Outer Plate */}
          <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.44, 0.44, 0.12, 48]} />
            <meshStandardMaterial
              color="#1e222e"
              metalness={0.88}
              roughness={0.24}
            />
          </mesh>

          {/* End Cap Sphere */}
          <mesh position={[0.26, 0, 0]}>
            <sphereGeometry args={[0.13, 32, 32]} />
            <meshStandardMaterial
              color="#2e3547"
              metalness={0.92}
              roughness={0.18}
            />
          </mesh>

          {/* Cyan Core Sphere */}
          <mesh position={[0.31, 0, 0]}>
            <sphereGeometry args={[0.075, 24, 24]} />
            <meshStandardMaterial
              color="#00f0ff"
              metalness={0.95}
              roughness={0.12}
              emissive="#00f0ff"
              emissiveIntensity={0.25}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

/**
 * Procedural 3D Kettlebell built from a sphere body and torus handle
 * Accented with project Magenta (#ff006e) metallic elements
 */
export function Kettlebell({
  position = [-2.6, -0.6, 0.4],
  rotation = [0.2, 0.45, -0.15],
  scale = 1,
}: EquipmentPieceProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle continuous rotation
      groupRef.current.rotation.y += delta * 0.28;

      // Mouse reactivity
      const targetX = state.pointer.x * 0.4;
      const targetY = state.pointer.y * 0.4;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -targetY * 0.35 + 0.18,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetX * 0.35 - 0.12,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        position[1] + targetY * 0.2,
        0.05
      );
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        position[0] + targetX * 0.18,
        0.05
      );
    }
  });

  return (
    <Float
      speed={1.6}
      rotationIntensity={0.5}
      floatIntensity={1.0}
      floatingRange={[-0.15, 0.15]}
    >
      <group
        ref={groupRef}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        {/* Main Kettlebell Spherical Body */}
        <mesh position={[0, 0, 0]} scale={[1, 0.95, 1]}>
          <sphereGeometry args={[0.76, 48, 48]} />
          <meshStandardMaterial
            color="#1b1d26"
            metalness={0.88}
            roughness={0.24}
          />
        </mesh>

        {/* Stable Base Cylinder */}
        <mesh position={[0, -0.68, 0]}>
          <cylinderGeometry args={[0.44, 0.48, 0.1, 32]} />
          <meshStandardMaterial
            color="#12141c"
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>

        {/* Magenta Accent Torus Ring around the belly */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.768, 0.035, 24, 64]} />
          <meshStandardMaterial
            color="#ff006e"
            metalness={0.92}
            roughness={0.16}
            emissive="#ff006e"
            emissiveIntensity={0.22}
          />
        </mesh>

        {/* Front Distorted Magenta Emblem / Weight Badge */}
        <mesh
          ref={meshRef}
          position={[0, 0.08, 0.74]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.24, 0.24, 0.04, 32]} />
          <MeshDistortMaterial
            color="#ff006e"
            speed={1.8}
            distort={0.14}
            metalness={0.94}
            roughness={0.14}
          />
        </mesh>

        {/* Torus Handle Arc */}
        <mesh position={[0, 0.8, 0]}>
          <torusGeometry args={[0.42, 0.088, 32, 48]} />
          <meshStandardMaterial
            color="#33394b"
            metalness={0.94}
            roughness={0.18}
          />
        </mesh>

        {/* Handle Upright Support Posts connecting into the body */}
        {[-0.42, 0.42].map((xOffset, idx) => (
          <group key={idx}>
            <mesh position={[xOffset, 0.62, 0]}>
              <cylinderGeometry args={[0.088, 0.088, 0.36, 32]} />
              <meshStandardMaterial
                color="#33394b"
                metalness={0.94}
                roughness={0.18}
              />
            </mesh>
            {/* Magenta accent collar at handle joints */}
            <mesh position={[xOffset, 0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.11, 0.02, 16, 32]} />
              <meshStandardMaterial
                color="#ff006e"
                metalness={0.9}
                roughness={0.15}
                emissive="#ff006e"
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

/**
 * Procedural 3D Barbell Plate built from cylinder with beveled torus edges
 * Accented with project Gold (#ffd700) metallic elements
 */
export function BarbellPlate({
  position = [2.1, -1.5, 0.6],
  rotation = [0.42, -0.32, 0.5],
  scale = 1,
}: EquipmentPieceProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow continuous spinning rotation
      groupRef.current.rotation.z += delta * 0.26;

      // Mouse reactivity tilt
      const targetX = state.pointer.x * 0.42;
      const targetY = state.pointer.y * 0.42;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetY + 0.35,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        -targetX - 0.25,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        position[1] + targetY * 0.22,
        0.05
      );
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        position[0] + targetX * 0.2,
        0.05
      );
    }
  });

  return (
    <Float
      speed={2.2}
      rotationIntensity={0.7}
      floatIntensity={1.3}
      floatingRange={[-0.2, 0.2]}
    >
      <group
        ref={groupRef}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        {/* Main Cylinder Plate Disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.05, 1.05, 0.16, 64]} />
          <meshStandardMaterial
            color="#ffd700"
            metalness={0.94}
            roughness={0.16}
          />
        </mesh>

        {/* Outer Beveled Edge Front Torus */}
        <mesh position={[0, 0, 0.08]}>
          <torusGeometry args={[1.04, 0.045, 24, 64]} />
          <meshStandardMaterial
            color="#ffe033"
            metalness={0.95}
            roughness={0.14}
          />
        </mesh>

        {/* Outer Beveled Edge Back Torus */}
        <mesh position={[0, 0, -0.08]}>
          <torusGeometry args={[1.04, 0.045, 24, 64]} />
          <meshStandardMaterial
            color="#e6b800"
            metalness={0.95}
            roughness={0.14}
          />
        </mesh>

        {/* Inner Recessed Disc Section (Dark Contrast Graphite) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 0.13, 64]} />
          <meshStandardMaterial
            color="#181a24"
            metalness={0.88}
            roughness={0.26}
          />
        </mesh>

        {/* Inner Step Bevel Rings */}
        <mesh position={[0, 0, 0.065]}>
          <torusGeometry args={[0.82, 0.028, 20, 64]} />
          <meshStandardMaterial
            color="#ffd700"
            metalness={0.94}
            roughness={0.18}
          />
        </mesh>
        <mesh position={[0, 0, -0.065]}>
          <torusGeometry args={[0.82, 0.028, 20, 64]} />
          <meshStandardMaterial
            color="#ffd700"
            metalness={0.94}
            roughness={0.18}
          />
        </mesh>

        {/* Decorative Gold Accent Inset Ring with Distortion */}
        <mesh ref={meshRef} position={[0, 0, 0.07]}>
          <torusGeometry args={[0.62, 0.032, 24, 64]} />
          <MeshDistortMaterial
            color="#ffd700"
            speed={1.6}
            distort={0.12}
            metalness={0.96}
            roughness={0.12}
          />
        </mesh>

        {/* Center Collar Bushing */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.22, 32]} />
          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Center Collar Bevel Rings */}
        <mesh position={[0, 0, 0.11]}>
          <torusGeometry args={[0.3, 0.025, 16, 32]} />
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
        <mesh position={[0, 0, -0.11]}>
          <torusGeometry args={[0.3, 0.025, 16, 32]} />
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Center Olympic Bar Hole (Dark Hollow Core) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.24, 32]} />
          <meshStandardMaterial
            color="#080a10"
            metalness={0.8}
            roughness={0.6}
          />
        </mesh>

        {/* Radial Weight Indicator Bars / Grip Accents */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
          <group key={idx} rotation={[0, 0, angle]}>
            <mesh position={[0, 0.72, 0.075]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.16, 16]} />
              <meshStandardMaterial
                color="#ffd700"
                metalness={0.92}
                roughness={0.15}
                emissive="#ffd700"
                emissiveIntensity={0.2}
              />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

export interface FloatingEquipmentProps {
  dumbbellProps?: EquipmentPieceProps;
  kettlebellProps?: EquipmentPieceProps;
  barbellPlateProps?: EquipmentPieceProps;
}

/**
 * FloatingEquipment - Procedural 3D gym equipment floating in space
 * Composed of Dumbbell (Cyan), Kettlebell (Magenta), and Barbell Plate (Gold).
 */
export function FloatingEquipment({
  dumbbellProps,
  kettlebellProps,
  barbellPlateProps,
}: FloatingEquipmentProps) {
  const masterGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (masterGroupRef.current) {
      // Subtle master parallax tracking
      const targetX = state.pointer.x * 0.15;
      const targetY = state.pointer.y * 0.15;
      masterGroupRef.current.position.x = THREE.MathUtils.lerp(
        masterGroupRef.current.position.x,
        targetX,
        0.04
      );
      masterGroupRef.current.position.y = THREE.MathUtils.lerp(
        masterGroupRef.current.position.y,
        targetY,
        0.04
      );
    }
  });

  return (
    <group ref={masterGroupRef}>
      <Dumbbell {...dumbbellProps} />
      <Kettlebell {...kettlebellProps} />
      <BarbellPlate {...barbellPlateProps} />
    </group>
  );
}

export default FloatingEquipment;
