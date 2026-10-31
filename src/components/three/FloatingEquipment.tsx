'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export type EquipmentType = 'dumbbell' | 'kettlebell' | 'plate' | 'barbell' | 'trapbar' | 'shaker';
export type StageMode = 'orbit' | 'kinetic' | 'xray';

interface EquipmentViewerProps {
  activeType?: EquipmentType;
  stageMode?: StageMode;
}

/**
 * 01 // Olympic Hex Dumbbell
 */
export function ShowcaseDumbbell({ stageMode = 'orbit' }: { stageMode?: StageMode }) {
  const meshRef = useRef<THREE.Group>(null);
  const isXray = stageMode === 'xray';
  const isKinetic = stageMode === 'kinetic';

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    if (isKinetic) {
      // Natural Bicep Curl & Press Arc Kinematics
      meshRef.current.position.y = Math.sin(t * 2.4) * 0.35;
      meshRef.current.position.z = Math.cos(t * 2.4) * 0.15;
      meshRef.current.rotation.z = Math.sin(t * 2.4) * 0.45 + 0.15;
      meshRef.current.rotation.x = 0.3 + Math.cos(t * 2.4) * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    } else {
      meshRef.current.position.set(0, 0, 0);
      meshRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <Float speed={isKinetic ? 0 : 1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={meshRef} rotation={[0.3, 0.2, 0.15]} scale={1.15}>
        {/* Handle */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.075, 0.08, 1.5, 48]} />
          <meshStandardMaterial
            color={isXray ? '#10b981' : '#e4e4e7'}
            metalness={0.98}
            roughness={0.18}
            wireframe={isXray}
            emissive={isXray ? '#10b981' : '#000000'}
            emissiveIntensity={isXray ? 0.6 : 0}
          />
        </mesh>

        {/* Diamond Knurling Grips */}
        {[-0.32, 0, 0.32].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.082, 0.082, 0.22, 32]} />
            <meshStandardMaterial
              color={isXray ? '#34d399' : '#a1a1aa'}
              metalness={0.95}
              roughness={0.35}
              wireframe={isXray}
            />
          </mesh>
        ))}

        {/* Collars */}
        {[-0.6, 0.6].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.13, 0.13, 0.06, 32]} />
            <meshStandardMaterial
              color={isXray ? '#6ee7b7' : '#f4f4f5'}
              metalness={0.98}
              roughness={0.1}
              wireframe={isXray}
            />
          </mesh>
        ))}

        {/* Left Urethane Head */}
        <group position={[-0.82, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.62, 0.62, 0.38, 6]} />
            <meshStandardMaterial
              color={isXray ? '#047857' : '#141416'}
              metalness={0.4}
              roughness={0.5}
              wireframe={isXray}
              emissive={isXray ? '#10b981' : '#000000'}
              emissiveIntensity={isXray ? 0.3 : 0}
            />
          </mesh>
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.54, 0.62, 0.08, 6]} />
            <meshStandardMaterial color={isXray ? '#065f46' : '#1c1c20'} metalness={0.5} roughness={0.4} wireframe={isXray} />
          </mesh>
          <mesh position={[0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.625, 0.625, 0.03, 6]} />
            <meshStandardMaterial color="#10b981" metalness={0.85} roughness={0.2} emissive="#059669" emissiveIntensity={0.5} wireframe={isXray} />
          </mesh>
        </group>

        {/* Right Urethane Head */}
        <group position={[0.82, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.62, 0.62, 0.38, 6]} />
            <meshStandardMaterial
              color={isXray ? '#047857' : '#141416'}
              metalness={0.4}
              roughness={0.5}
              wireframe={isXray}
              emissive={isXray ? '#10b981' : '#000000'}
              emissiveIntensity={isXray ? 0.3 : 0}
            />
          </mesh>
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.62, 0.54, 0.08, 6]} />
            <meshStandardMaterial color={isXray ? '#065f46' : '#1c1c20'} metalness={0.5} roughness={0.4} wireframe={isXray} />
          </mesh>
          <mesh position={[-0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.625, 0.625, 0.03, 6]} />
            <meshStandardMaterial color="#10b981" metalness={0.85} roughness={0.2} emissive="#059669" emissiveIntensity={0.5} wireframe={isXray} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

/**
 * 02 // Competition Kettlebell
 */
export function ShowcaseKettlebell({ stageMode = 'orbit' }: { stageMode?: StageMode }) {
  const meshRef = useRef<THREE.Group>(null);
  const isXray = stageMode === 'xray';
  const isKinetic = stageMode === 'kinetic';

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    if (isKinetic) {
      // Dynamic Ballistic Kettlebell Swing Pendulum
      meshRef.current.rotation.x = Math.sin(t * 3.0) * 0.65;
      meshRef.current.position.z = Math.sin(t * 3.0) * 0.45;
      meshRef.current.position.y = -Math.abs(Math.cos(t * 3.0)) * 0.25 - 0.1;
      meshRef.current.rotation.y += delta * 0.2;
    } else {
      meshRef.current.position.set(0, -0.2, 0);
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={isKinetic ? 0 : 1.5} rotationIntensity={0.25} floatIntensity={0.45}>
      <group ref={meshRef} position={[0, -0.2, 0]} rotation={[0.1, 0.2, 0]} scale={1.2}>
        {/* Spherical Cast Iron Body */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.78, 64, 64]} />
          <meshStandardMaterial
            color={isXray ? '#047857' : '#1a1a1f'}
            metalness={0.85}
            roughness={0.35}
            wireframe={isXray}
            emissive={isXray ? '#10b981' : '#000000'}
            emissiveIntensity={isXray ? 0.35 : 0}
          />
        </mesh>

        {/* Machined Flat Base */}
        <mesh position={[0, -0.74, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.05, 32]} />
          <meshStandardMaterial color={isXray ? '#065f46' : '#27272a'} metalness={0.9} roughness={0.3} wireframe={isXray} />
        </mesh>

        {/* Competition Color Calibration Ring (32kg Red/Emerald) */}
        <mesh position={[0, -0.28, 0]}>
          <torusGeometry args={[0.785, 0.022, 16, 64]} />
          <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.2} emissive="#10b981" emissiveIntensity={0.6} wireframe={isXray} />
        </mesh>

        {/* Handle Horns (Smooth Arch) */}
        <mesh position={[0, 0.88, 0]}>
          <torusGeometry args={[0.48, 0.075, 24, 48, Math.PI]} />
          <meshStandardMaterial
            color={isXray ? '#10b981' : '#f4f4f5'}
            metalness={0.98}
            roughness={0.15}
            wireframe={isXray}
            emissive={isXray ? '#10b981' : '#000000'}
            emissiveIntensity={isXray ? 0.5 : 0}
          />
        </mesh>

        {/* Handle Pillars */}
        {[-0.48, 0.48].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0.62, 0]}>
            <cylinderGeometry args={[0.075, 0.075, 0.52, 24]} />
            <meshStandardMaterial color={isXray ? '#34d399' : '#e4e4e7'} metalness={0.96} roughness={0.2} wireframe={isXray} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/**
 * 03 // Calibrated Bumper Plate
 */
export function ShowcaseBumperPlate({ stageMode = 'orbit' }: { stageMode?: StageMode }) {
  const meshRef = useRef<THREE.Group>(null);
  const isXray = stageMode === 'xray';
  const isKinetic = stageMode === 'kinetic';

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    if (isKinetic) {
      // Rapid Gyroscopic Calibration Spin & Dynamic Tilt
      meshRef.current.rotation.y += delta * 2.8;
      meshRef.current.rotation.z = Math.sin(t * 3.5) * 0.15;
      meshRef.current.position.y = Math.sin(t * 2.0) * 0.1;
    } else {
      meshRef.current.position.set(0, 0, 0);
      meshRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={isKinetic ? 0 : 1.6} rotationIntensity={0.25} floatIntensity={0.4}>
      <group ref={meshRef} rotation={[0.2, 0.4, 0.1]} scale={1.25}>
        {/* Outer Vulcanized Rubber Ring (450mm diameter) */}
        <mesh>
          <cylinderGeometry args={[1.35, 1.35, 0.22, 64]} />
          <meshStandardMaterial
            color={isXray ? '#047857' : '#121215'}
            metalness={0.3}
            roughness={0.65}
            wireframe={isXray}
            emissive={isXray ? '#10b981' : '#000000'}
            emissiveIntensity={isXray ? 0.3 : 0}
          />
        </mesh>

        {/* Emerald Competition Outer Rim */}
        <mesh>
          <torusGeometry args={[1.34, 0.035, 16, 64]} />
          <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.2} emissive="#10b981" emissiveIntensity={0.6} wireframe={isXray} />
        </mesh>

        {/* Recessed Inner Flange */}
        <mesh>
          <cylinderGeometry args={[1.05, 1.05, 0.25, 64]} />
          <meshStandardMaterial color={isXray ? '#065f46' : '#18181b'} metalness={0.6} roughness={0.4} wireframe={isXray} />
        </mesh>

        {/* Chrome Center Hub */}
        <mesh>
          <cylinderGeometry args={[0.42, 0.42, 0.27, 48]} />
          <meshStandardMaterial
            color={isXray ? '#10b981' : '#f4f4f5'}
            metalness={0.99}
            roughness={0.08}
            wireframe={isXray}
            emissive={isXray ? '#10b981' : '#000000'}
            emissiveIntensity={isXray ? 0.5 : 0}
          />
        </mesh>

        {/* Olympic 50.4mm Center Bore */}
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.3, 32]} />
          <meshStandardMaterial color="#09090b" metalness={0.9} roughness={0.3} wireframe={isXray} />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * 04 // Olympic Competition Barbell (2.2m)
 */
export function ShowcaseBarbell({ stageMode = 'orbit' }: { stageMode?: StageMode }) {
  const meshRef = useRef<THREE.Group>(null);
  const isXray = stageMode === 'xray';
  const isKinetic = stageMode === 'kinetic';

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    if (isKinetic) {
      // Olympic Clean & Press / Squat Vertical Kinematics
      meshRef.current.position.y = Math.sin(t * 2.0) * 0.45;
      meshRef.current.position.z = Math.cos(t * 2.0) * 0.12;
      meshRef.current.rotation.x = Math.sin(t * 2.0) * 0.15;
      meshRef.current.rotation.y += delta * 0.35;
    } else {
      meshRef.current.position.set(0, 0, 0);
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={isKinetic ? 0 : 1.4} rotationIntensity={0.2} floatIntensity={0.35}>
      <group ref={meshRef} rotation={[0.2, 0.4, 0.2]} scale={1.05}>
        {/* Main 28mm Shaft */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 3.2, 48]} />
          <meshStandardMaterial
            color={isXray ? '#10b981' : '#e4e4e7'}
            metalness={0.98}
            roughness={0.15}
            wireframe={isXray}
            emissive={isXray ? '#10b981' : '#000000'}
            emissiveIntensity={isXray ? 0.5 : 0}
          />
        </mesh>

        {/* Dual Olympic Knurl Rings */}
        {[-0.6, 0.6].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.049, 0.049, 0.45, 32]} />
            <meshStandardMaterial color={isXray ? '#34d399' : '#a1a1aa'} metalness={0.96} roughness={0.35} wireframe={isXray} />
          </mesh>
        ))}

        {/* Inner Sleeves Stop Collars */}
        {[-1.15, 1.15].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 32]} />
            <meshStandardMaterial color={isXray ? '#6ee7b7' : '#f4f4f5'} metalness={0.99} roughness={0.1} wireframe={isXray} />
          </mesh>
        ))}

        {/* 50mm Rotating Sleeves */}
        {[-1.6, 1.6].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.095, 0.095, 0.8, 32]} />
            <meshStandardMaterial color={isXray ? '#10b981' : '#f4f4f5'} metalness={0.98} roughness={0.12} wireframe={isXray} />
          </mesh>
        ))}

        {/* Mounted Calibrated Bumper Plates on Barbell */}
        {[-1.4, 1.4].map((xOffset, idx) => (
          <group key={idx} position={[xOffset, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.65, 0.65, 0.12, 48]} />
              <meshStandardMaterial color={isXray ? '#047857' : '#18181b'} metalness={0.4} roughness={0.5} wireframe={isXray} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.645, 0.02, 16, 48]} />
              <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.2} emissive="#10b981" emissiveIntensity={0.6} wireframe={isXray} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

/**
 * 05 // Hex Deadlift Trap Bar
 */
export function ShowcaseTrapBar({ stageMode = 'orbit' }: { stageMode?: StageMode }) {
  const meshRef = useRef<THREE.Group>(null);
  const isXray = stageMode === 'xray';
  const isKinetic = stageMode === 'kinetic';

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    if (isKinetic) {
      // Hex Deadlift Ground-to-Lockout Biomechanical Arc
      meshRef.current.position.y = Math.sin(t * 2.2) * 0.4;
      meshRef.current.rotation.y += delta * 0.25;
    } else {
      meshRef.current.position.set(0, 0, 0);
      meshRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={isKinetic ? 0 : 1.3} rotationIntensity={0.2} floatIntensity={0.35}>
      <group ref={meshRef} rotation={[0.4, 0.3, 0.1]} scale={1.1}>
        {/* Hexagonal Outer Frame */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.05, 0.065, 16, 6]} />
          <meshStandardMaterial
            color={isXray ? '#047857' : '#1c1c20'}
            metalness={0.88}
            roughness={0.28}
            wireframe={isXray}
            emissive={isXray ? '#10b981' : '#000000'}
            emissiveIntensity={isXray ? 0.35 : 0}
          />
        </mesh>

        {/* Dual Elevated Knurled Grip Handles */}
        {[-0.65, 0.65].map((xOffset, idx) => (
          <group key={idx} position={[xOffset, 0.25, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.055, 0.055, 0.45, 24]} />
              <meshStandardMaterial color={isXray ? '#10b981' : '#f4f4f5'} metalness={0.98} roughness={0.2} wireframe={isXray} />
            </mesh>
            {[-0.2, 0.2].map((zOffset, zIdx) => (
              <mesh key={zIdx} position={[0, -0.12, zOffset]}>
                <cylinderGeometry args={[0.045, 0.045, 0.24, 16]} />
                <meshStandardMaterial color={isXray ? '#34d399' : '#a1a1aa'} metalness={0.95} roughness={0.3} wireframe={isXray} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Loadable Olympic Side Sleeves */}
        {[-1.35, 1.35].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.65, 32]} />
            <meshStandardMaterial color={isXray ? '#6ee7b7' : '#f4f4f5'} metalness={0.98} roughness={0.15} wireframe={isXray} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/**
 * 06 // Titanium Athlete Shaker
 */
export function ShowcaseShaker({ stageMode = 'orbit' }: { stageMode?: StageMode }) {
  const meshRef = useRef<THREE.Group>(null);
  const isXray = stageMode === 'xray';
  const isKinetic = stageMode === 'kinetic';

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    if (isKinetic) {
      // Dynamic High-Velocity Vortex Agitation
      meshRef.current.position.y = Math.sin(t * 6.0) * 0.22;
      meshRef.current.rotation.z = Math.cos(t * 6.0) * 0.25;
      meshRef.current.rotation.x = Math.sin(t * 4.0) * 0.18;
      meshRef.current.rotation.y += delta * 0.5;
    } else {
      meshRef.current.position.set(0, -0.1, 0);
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={isKinetic ? 0 : 1.7} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef} position={[0, -0.1, 0]} rotation={[0.2, 0.2, -0.1]} scale={1.3}>
        {/* Vacuum Insulated Main Body */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.42, 0.32, 1.35, 48]} />
          <meshStandardMaterial
            color={isXray ? '#047857' : '#18181b'}
            metalness={0.92}
            roughness={0.22}
            wireframe={isXray}
            emissive={isXray ? '#10b981' : '#000000'}
            emissiveIntensity={isXray ? 0.35 : 0}
          />
        </mesh>

        {/* Laser Etched Scale Ring */}
        <mesh position={[0, 0.38, 0]}>
          <torusGeometry args={[0.415, 0.015, 16, 48]} />
          <meshStandardMaterial color="#10b981" metalness={0.95} roughness={0.1} emissive="#10b981" emissiveIntensity={0.6} wireframe={isXray} />
        </mesh>

        {/* Screw-Lock Cap */}
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.44, 0.44, 0.16, 48]} />
          <meshStandardMaterial color={isXray ? '#10b981' : '#e4e4e7'} metalness={0.98} roughness={0.15} wireframe={isXray} />
        </mesh>

        {/* Drinking Spout & Carry Loop */}
        <mesh position={[0.16, 0.78, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.14, 32]} />
          <meshStandardMaterial color={isXray ? '#34d399' : '#27272a'} metalness={0.8} roughness={0.35} wireframe={isXray} />
        </mesh>
        <mesh position={[-0.18, 0.84, 0]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.12, 0.03, 16, 32]} />
          <meshStandardMaterial color="#10b981" metalness={0.85} roughness={0.2} emissive="#10b981" emissiveIntensity={0.5} wireframe={isXray} />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Main Interactive Viewer Component
 */
export function FloatingEquipment({ activeType = 'dumbbell', stageMode = 'orbit' }: EquipmentViewerProps) {
  return (
    <group position={[0, 0, 0]}>
      {activeType === 'dumbbell' && <ShowcaseDumbbell stageMode={stageMode} />}
      {activeType === 'kettlebell' && <ShowcaseKettlebell stageMode={stageMode} />}
      {activeType === 'plate' && <ShowcaseBumperPlate stageMode={stageMode} />}
      {activeType === 'barbell' && <ShowcaseBarbell stageMode={stageMode} />}
      {activeType === 'trapbar' && <ShowcaseTrapBar stageMode={stageMode} />}
      {activeType === 'shaker' && <ShowcaseShaker stageMode={stageMode} />}
    </group>
  );
}

export default FloatingEquipment;
