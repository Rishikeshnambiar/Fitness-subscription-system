'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export type EquipmentType = 'power_rack' | 'cable_crossover' | 'bench_press' | 'leg_press' | 'dumbbell_rack';
export type StageMode = 'orbit' | 'kinetic' | 'xray';

interface EquipmentViewerProps {
  activeType?: EquipmentType;
  stageMode?: StageMode;
}

/**
 * 01 // Commercial Olympic Power Cage & Squat Station
 */
export function ShowcasePowerRack({ stageMode = 'orbit' }: { stageMode?: StageMode }) {
  const groupRef = useRef<THREE.Group>(null);
  const barbellRef = useRef<THREE.Group>(null);
  const isXray = stageMode === 'xray';
  const isKinetic = stageMode === 'kinetic';

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    if (isKinetic) {
      // Dynamic Olympic Squat Kinematics: Barbell descends to parallel and presses up
      if (barbellRef.current) {
        const squatCycle = Math.sin(t * 1.8);
        barbellRef.current.position.y = -0.3 + Math.min(0, squatCycle * 0.45);
      }
      groupRef.current.rotation.y += delta * 0.2;
    } else {
      if (barbellRef.current) {
        barbellRef.current.position.y = 0;
      }
      groupRef.current.position.set(0, -0.4, 0);
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={isKinetic ? 0 : 1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={groupRef} position={[0, -0.4, 0]} rotation={[0.15, 0.4, 0]} scale={0.92}>
        {/* 4 Commercial Uprights (3"x3" Laser-Cut 11-Gauge Steel) */}
        {[
          [-0.85, -0.65],
          [0.85, -0.65],
          [-0.85, 0.65],
          [0.85, 0.65],
        ].map(([x, z], idx) => (
          <group key={idx} position={[x, 0.4, z]}>
            <mesh>
              <boxGeometry args={[0.14, 2.8, 0.14]} />
              <meshStandardMaterial
                color={isXray ? '#047857' : '#141418'}
                metalness={0.92}
                roughness={0.28}
                wireframe={isXray}
                emissive={isXray ? '#10b981' : '#000000'}
                emissiveIntensity={isXray ? 0.35 : 0}
              />
            </mesh>
            {/* Numbered Laser-Cut Hole Accents */}
            {[-1.0, -0.5, 0, 0.5, 1.0].map((yOffset, hIdx) => (
              <mesh key={hIdx} position={[0, yOffset, 0.075]}>
                <boxGeometry args={[0.04, 0.04, 0.01]} />
                <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} wireframe={isXray} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Lower Perimeter Stabilizer Base Tubes */}
        <mesh position={[0, -0.95, -0.65]}>
          <boxGeometry args={[1.84, 0.12, 0.14]} />
          <meshStandardMaterial color={isXray ? '#065f46' : '#18181c'} metalness={0.9} roughness={0.3} wireframe={isXray} />
        </mesh>
        <mesh position={[0, -0.95, 0.65]}>
          <boxGeometry args={[1.84, 0.12, 0.14]} />
          <meshStandardMaterial color={isXray ? '#065f46' : '#18181c'} metalness={0.9} roughness={0.3} wireframe={isXray} />
        </mesh>
        {[-0.85, 0.85].map((x, idx) => (
          <mesh key={idx} position={[x, -0.95, 0]}>
            <boxGeometry args={[0.14, 0.12, 1.44]} />
            <meshStandardMaterial color={isXray ? '#065f46' : '#18181c'} metalness={0.9} roughness={0.3} wireframe={isXray} />
          </mesh>
        ))}

        {/* Upper Connecting Header Crossbeams */}
        {[-0.65, 0.65].map((z, idx) => (
          <mesh key={idx} position={[0, 1.75, z]}>
            <boxGeometry args={[1.84, 0.12, 0.14]} />
            <meshStandardMaterial color={isXray ? '#047857' : '#1c1c22'} metalness={0.92} roughness={0.25} wireframe={isXray} />
          </mesh>
        ))}

        {/* Multi-Grip Chin-Up Station Arch (Front Header) */}
        <group position={[0, 1.82, 0.65]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.038, 0.038, 1.6, 24]} />
            <meshStandardMaterial color={isXray ? '#10b981' : '#f4f4f5'} metalness={0.98} roughness={0.15} wireframe={isXray} />
          </mesh>
          {[-0.35, 0.35].map((x, idx) => (
            <mesh key={idx} position={[x, -0.06, 0.12]} rotation={[Math.PI / 4, 0, 0]}>
              <cylinderGeometry args={[0.032, 0.032, 0.28, 16]} />
              <meshStandardMaterial color={isXray ? '#34d399' : '#a1a1aa'} metalness={0.95} roughness={0.3} wireframe={isXray} />
            </mesh>
          ))}
        </group>

        {/* Heavy-Duty Horizontal Pin-Pipe Spotter Safety Arms */}
        {[-0.85, 0.85].map((x, idx) => (
          <group key={idx} position={[x, -0.15, 0]}>
            <mesh>
              <boxGeometry args={[0.1, 0.1, 1.35]} />
              <meshStandardMaterial color="#10b981" metalness={0.88} roughness={0.2} emissive="#059669" emissiveIntensity={0.25} wireframe={isXray} />
            </mesh>
          </group>
        ))}

        {/* J-Cups with Loaded Olympic Barbell (Can animate in Kinetic Mode) */}
        <group ref={barbellRef} position={[0, 0.55, 0]}>
          {/* J-Cups */}
          {[-0.85, 0.85].map((x, idx) => (
            <group key={idx} position={[x, -0.05, 0.65]}>
              <mesh>
                <boxGeometry args={[0.08, 0.14, 0.18]} />
                <meshStandardMaterial color="#27272a" metalness={0.9} roughness={0.2} wireframe={isXray} />
              </mesh>
              <mesh position={[0, 0.06, 0.08]}>
                <boxGeometry args={[0.07, 0.06, 0.04]} />
                <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.2} wireframe={isXray} />
              </mesh>
            </group>
          ))}

          {/* Olympic 2.2m Barbell Shaft */}
          <mesh position={[0, 0.04, 0.65]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.032, 0.032, 2.7, 32]} />
            <meshStandardMaterial color={isXray ? '#10b981' : '#f4f4f5'} metalness={0.98} roughness={0.12} wireframe={isXray} />
          </mesh>

          {/* Calibrated Bumper Plates Loaded on Barbell */}
          {[-1.08, 1.08].map((xBase, sideIdx) => (
            <group key={sideIdx} position={[xBase, 0.04, 0.65]}>
              {[0, 0.07, 0.14].map((xOffset, plateIdx) => {
                const posX = sideIdx === 0 ? -xOffset : xOffset;
                return (
                  <group key={plateIdx} position={[posX, 0, 0]}>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                      <cylinderGeometry args={[0.52, 0.52, 0.06, 48]} />
                      <meshStandardMaterial color={isXray ? '#047857' : '#18181b'} metalness={0.4} roughness={0.5} wireframe={isXray} />
                    </mesh>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                      <torusGeometry args={[0.515, 0.015, 16, 48]} />
                      <meshStandardMaterial color="#10b981" metalness={0.95} roughness={0.15} emissive="#10b981" emissiveIntensity={0.6} wireframe={isXray} />
                    </mesh>
                  </group>
                );
              })}
            </group>
          ))}
        </group>

        {/* Rear Weight Storage Horns */}
        {[-0.85, 0.85].map((x, sIdx) => (
          <group key={sIdx} position={[x, 0, -0.72]}>
            {[-0.4, 0.1, 0.6].map((y, hIdx) => (
              <mesh key={hIdx} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.28, 24]} />
                <meshStandardMaterial color={isXray ? '#34d399' : '#71717a'} metalness={0.95} roughness={0.2} wireframe={isXray} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </Float>
  );
}

/**
 * 02 // Commercial Dual-Pulley Cable Crossover / Functional Trainer
 */
export function ShowcaseCableCrossover({ stageMode = 'orbit' }: { stageMode?: StageMode }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftStackRef = useRef<THREE.Group>(null);
  const rightStackRef = useRef<THREE.Group>(null);
  const isXray = stageMode === 'xray';
  const isKinetic = stageMode === 'kinetic';

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    if (isKinetic) {
      // Dynamic Cable Flye Kinematics: Weight stacks slide up on guide rods
      const lift = Math.abs(Math.sin(t * 2.2)) * 0.35;
      if (leftStackRef.current) leftStackRef.current.position.y = -0.3 + lift;
      if (rightStackRef.current) rightStackRef.current.position.y = -0.3 + lift;
      groupRef.current.rotation.y += delta * 0.2;
    } else {
      if (leftStackRef.current) leftStackRef.current.position.y = -0.3;
      if (rightStackRef.current) rightStackRef.current.position.y = -0.3;
      groupRef.current.position.set(0, -0.3, 0);
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={isKinetic ? 0 : 1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={groupRef} position={[0, -0.3, 0]} rotation={[0.1, 0.3, 0]} scale={0.95}>
        {/* Dual Weight Stack Enclosure Towers (Left & Right) */}
        {[-1.35, 1.35].map((xBase, tIdx) => (
          <group key={tIdx} position={[xBase, 0.3, 0]}>
            {/* Tower Frame Box */}
            <mesh>
              <boxGeometry args={[0.55, 2.6, 0.45]} />
              <meshStandardMaterial
                color={isXray ? '#047857' : '#121215'}
                metalness={0.9}
                roughness={0.3}
                wireframe={isXray}
                emissive={isXray ? '#10b981' : '#000000'}
                emissiveIntensity={isXray ? 0.3 : 0}
              />
            </mesh>

            {/* Tinted Polycarbonate Front Window */}
            <mesh position={[0, 0, 0.23]}>
              <boxGeometry args={[0.42, 2.3, 0.02]} />
              <meshStandardMaterial color="#10b981" metalness={0.95} roughness={0.1} transparent opacity={0.35} wireframe={isXray} />
            </mesh>

            {/* Chrome Dual Guide Rods inside Tower */}
            {[-0.12, 0.12].map((xRod, rIdx) => (
              <mesh key={rIdx} position={[xRod, 0, 0]}>
                <cylinderGeometry args={[0.016, 0.016, 2.4, 16]} />
                <meshStandardMaterial color="#f4f4f5" metalness={0.99} roughness={0.08} wireframe={isXray} />
              </mesh>
            ))}

            {/* Sliding Weight Stack (15 Laser-Cut Steel Plates) */}
            <group ref={tIdx === 0 ? leftStackRef : rightStackRef} position={[0, -0.3, 0]}>
              {Array.from({ length: 14 }).map((_, pIdx) => (
                <mesh key={pIdx} position={[0, pIdx * 0.065, 0]}>
                  <boxGeometry args={[0.42, 0.055, 0.28]} />
                  <meshStandardMaterial color={isXray ? '#10b981' : '#27272a'} metalness={0.92} roughness={0.3} wireframe={isXray} />
                </mesh>
              ))}
              {/* Magnetic Selector Pin Indicator */}
              <mesh position={[0, 0.35, 0.15]}>
                <boxGeometry args={[0.06, 0.03, 0.08]} />
                <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} />
              </mesh>
            </group>

            {/* Adjustable Height Swivel Pulley Carriage */}
            <group position={[tIdx === 0 ? 0.32 : -0.32, 0.3, 0]}>
              <mesh>
                <boxGeometry args={[0.14, 0.22, 0.14]} />
                <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.2} wireframe={isXray} />
              </mesh>
              {/* Swivel Pulley Wheel */}
              <mesh position={[tIdx === 0 ? 0.08 : -0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.06, 0.06, 0.03, 24]} />
                <meshStandardMaterial color="#f4f4f5" metalness={0.99} roughness={0.1} />
              </mesh>
            </group>
          </group>
        ))}

        {/* Upper Overhead Connecting Arch Bridge */}
        <mesh position={[0, 1.62, 0]}>
          <boxGeometry args={[2.7, 0.14, 0.18]} />
          <meshStandardMaterial color={isXray ? '#047857' : '#1c1c20'} metalness={0.92} roughness={0.25} wireframe={isXray} />
        </mesh>

        {/* Central Multi-Angle Pull-Up Station on Overhead Bridge */}
        <group position={[0, 1.7, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.034, 0.034, 0.9, 24]} />
            <meshStandardMaterial color="#e4e4e7" metalness={0.98} roughness={0.15} wireframe={isXray} />
          </mesh>
          {[-0.3, 0.3].map((x, idx) => (
            <mesh key={idx} position={[x, -0.05, 0.14]} rotation={[Math.PI / 4, 0, 0]}>
              <cylinderGeometry args={[0.028, 0.028, 0.24, 16]} />
              <meshStandardMaterial color="#10b981" metalness={0.95} roughness={0.2} wireframe={isXray} />
            </mesh>
          ))}
        </group>

        {/* Floor Stabilizer Spreaders */}
        <mesh position={[0, -0.98, 0]}>
          <boxGeometry args={[3.1, 0.08, 0.45]} />
          <meshStandardMaterial color={isXray ? '#065f46' : '#18181c'} metalness={0.88} roughness={0.35} wireframe={isXray} />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * 03 // Olympic Competition Flat Bench Station
 */
export function ShowcaseBenchPress({ stageMode = 'orbit' }: { stageMode?: StageMode }) {
  const groupRef = useRef<THREE.Group>(null);
  const barbellRef = useRef<THREE.Group>(null);
  const isXray = stageMode === 'xray';
  const isKinetic = stageMode === 'kinetic';

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    if (isKinetic) {
      // Dynamic Bench Press Arc: Barbell lowers to chest level and drives to lockout
      if (barbellRef.current) {
        const pressCycle = Math.sin(t * 2.0);
        barbellRef.current.position.y = 0.5 + Math.min(0, pressCycle * 0.35);
      }
      groupRef.current.rotation.y += delta * 0.25;
    } else {
      if (barbellRef.current) barbellRef.current.position.y = 0.5;
      groupRef.current.position.set(0, -0.3, 0);
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={isKinetic ? 0 : 1.3} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, -0.3, 0]} rotation={[0.25, 0.35, 0.05]} scale={1.1}>
        {/* Heavy Upright Support Pillars with Catch J-Hooks */}
        {[-0.65, 0.65].map((x, idx) => (
          <group key={idx} position={[x, 0.1, -0.45]}>
            <mesh>
              <boxGeometry args={[0.1, 1.25, 0.1]} />
              <meshStandardMaterial color={isXray ? '#047857' : '#18181b'} metalness={0.92} roughness={0.25} wireframe={isXray} />
            </mesh>
            {/* Multi-Tier Bar Catches */}
            {[0.4, 0.55].map((y, cIdx) => (
              <mesh key={cIdx} position={[0, y, 0.08]}>
                <boxGeometry args={[0.08, 0.06, 0.08]} />
                <meshStandardMaterial color="#10b981" metalness={0.98} roughness={0.15} wireframe={isXray} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Upright Crossbrace Beam */}
        <mesh position={[0, -0.45, -0.45]}>
          <boxGeometry args={[1.4, 0.1, 0.1]} />
          <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.3} wireframe={isXray} />
        </mesh>

        {/* High-Density Textured Vinyl Competition Bench Pad */}
        <group position={[0, -0.05, 0.25]}>
          {/* Main Leather Cushion Pad */}
          <mesh>
            <boxGeometry args={[0.42, 0.12, 1.45]} />
            <meshStandardMaterial
              color={isXray ? '#047857' : '#141416'}
              metalness={0.3}
              roughness={0.6}
              wireframe={isXray}
              emissive={isXray ? '#10b981' : '#000000'}
              emissiveIntensity={isXray ? 0.35 : 0}
            />
          </mesh>
          {/* Emerald Perimeter Stitching Accent */}
          <mesh position={[0, 0.062, 0]}>
            <boxGeometry args={[0.425, 0.005, 1.455]} />
            <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.2} emissive="#10b981" emissiveIntensity={0.6} wireframe={isXray} />
          </mesh>
          {/* Bench Structural Steel Spine & Legs */}
          <mesh position={[0, -0.25, 0]}>
            <boxGeometry args={[0.12, 0.38, 1.3]} />
            <meshStandardMaterial color="#1f1f23" metalness={0.9} roughness={0.3} wireframe={isXray} />
          </mesh>
          {/* Front Foot Base */}
          <mesh position={[0, -0.48, 0.6]}>
            <boxGeometry args={[0.65, 0.08, 0.12]} />
            <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.3} wireframe={isXray} />
          </mesh>
        </group>

        {/* Rear Diamond-Plate Spotter Stand */}
        <mesh position={[0, -0.48, -0.72]}>
          <boxGeometry args={[0.75, 0.06, 0.38]} />
          <meshStandardMaterial color={isXray ? '#10b981' : '#27272a'} metalness={0.95} roughness={0.2} wireframe={isXray} />
        </mesh>

        {/* Olympic Loaded Barbell (Animates in Kinetic Mode) */}
        <group ref={barbellRef} position={[0, 0.5, -0.45]}>
          {/* Barbell Shaft */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.032, 0.032, 2.5, 32]} />
            <meshStandardMaterial color={isXray ? '#10b981' : '#f4f4f5'} metalness={0.99} roughness={0.1} wireframe={isXray} />
          </mesh>
          {/* Bumper Plates */}
          {[-0.95, 0.95].map((xBase, sIdx) => (
            <group key={sIdx} position={[xBase, 0, 0]}>
              {[0, 0.07].map((xOffset, pIdx) => {
                const posX = sIdx === 0 ? -xOffset : xOffset;
                return (
                  <group key={pIdx} position={[posX, 0, 0]}>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                      <cylinderGeometry args={[0.48, 0.48, 0.06, 48]} />
                      <meshStandardMaterial color="#18181b" metalness={0.4} roughness={0.5} wireframe={isXray} />
                    </mesh>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                      <torusGeometry args={[0.475, 0.015, 16, 48]} />
                      <meshStandardMaterial color="#10b981" metalness={0.9} emissive="#10b981" emissiveIntensity={0.6} wireframe={isXray} />
                    </mesh>
                  </group>
                );
              })}
            </group>
          ))}
        </group>
      </group>
    </Float>
  );
}

/**
 * 04 // Commercial 45° Incline Plate-Loaded Leg Press Machine
 */
export function ShowcaseLegPress({ stageMode = 'orbit' }: { stageMode?: StageMode }) {
  const groupRef = useRef<THREE.Group>(null);
  const sledRef = useRef<THREE.Group>(null);
  const isXray = stageMode === 'xray';
  const isKinetic = stageMode === 'kinetic';

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    if (isKinetic) {
      // 45-Degree Incline Linear Sled Glide Kinematics
      const glide = Math.abs(Math.sin(t * 1.8)) * 0.45;
      if (sledRef.current) {
        sledRef.current.position.x = -glide * 0.707;
        sledRef.current.position.y = glide * 0.707;
      }
      groupRef.current.rotation.y += delta * 0.2;
    } else {
      if (sledRef.current) {
        sledRef.current.position.set(0, 0, 0);
      }
      groupRef.current.position.set(0, -0.3, 0);
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={isKinetic ? 0 : 1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={groupRef} position={[0, -0.3, 0]} rotation={[0.15, 0.4, 0]} scale={0.95}>
        {/* Base Frame Rails (Floor Horizontal Base) */}
        <mesh position={[0, -0.85, 0]}>
          <boxGeometry args={[2.4, 0.12, 1.1]} />
          <meshStandardMaterial color={isXray ? '#047857' : '#141418'} metalness={0.92} roughness={0.3} wireframe={isXray} />
        </mesh>

        {/* 45° Angle Linear Guide Rails (Twin Heavy Chrome Tubes) */}
        {[-0.38, 0.38].map((z, idx) => (
          <mesh key={idx} position={[0, 0.1, z]} rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.045, 0.045, 2.5, 32]} />
            <meshStandardMaterial color={isXray ? '#10b981' : '#f4f4f5'} metalness={0.99} roughness={0.08} wireframe={isXray} />
          </mesh>
        ))}

        {/* Rear 45° Triangle Upright Support Columns */}
        <mesh position={[-0.85, -0.05, 0]}>
          <boxGeometry args={[0.14, 1.5, 0.9]} />
          <meshStandardMaterial color="#18181c" metalness={0.9} roughness={0.3} wireframe={isXray} />
        </mesh>

        {/* Contoured Bucket Seat with Lumbar Angle Support */}
        <group position={[0.65, -0.25, 0]}>
          {/* Seat Cushion */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.5, 0.1, 0.52]} />
            <meshStandardMaterial color={isXray ? '#065f46' : '#141416'} metalness={0.3} roughness={0.6} wireframe={isXray} />
          </mesh>
          {/* Backrest Cushion angled at 40° */}
          <mesh position={[0.2, 0.35, 0]} rotation={[0, 0, -Math.PI / 7]}>
            <boxGeometry args={[0.1, 0.85, 0.48]} />
            <meshStandardMaterial color={isXray ? '#047857' : '#141416'} metalness={0.3} roughness={0.6} wireframe={isXray} />
          </mesh>
          {/* Side Safety Lockout Handles */}
          {[-0.32, 0.32].map((z, idx) => (
            <mesh key={idx} position={[0, 0.12, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.024, 0.024, 0.3, 16]} />
              <meshStandardMaterial color="#10b981" metalness={0.95} roughness={0.2} wireframe={isXray} />
            </mesh>
          ))}
        </group>

        {/* Gliding Sled Assembly (Animates on 45° Axis in Kinetic Mode) */}
        <group ref={sledRef} position={[0, 0, 0]}>
          {/* Sled Carriage with Linear Bearing Housings */}
          <group position={[-0.1, 0.18, 0]} rotation={[0, 0, -Math.PI / 4]}>
            {/* Diamond-Plate Oversized Foot Platform */}
            <mesh position={[0.22, 0, 0]}>
              <boxGeometry args={[0.06, 0.82, 0.86]} />
              <meshStandardMaterial color={isXray ? '#10b981' : '#27272a'} metalness={0.95} roughness={0.2} wireframe={isXray} />
            </mesh>
            {/* Linear Bearing Sleeves */}
            {[-0.38, 0.38].map((z, idx) => (
              <mesh key={idx} position={[0, 0, z]}>
                <cylinderGeometry args={[0.075, 0.075, 0.4, 24]} />
                <meshStandardMaterial color="#10b981" metalness={0.98} roughness={0.15} wireframe={isXray} />
              </mesh>
            ))}
            {/* Dual Weight Horns loaded with 450mm Bumper Plates */}
            {[-0.55, 0.55].map((zSide, sideIdx) => (
              <group key={sideIdx} position={[0, -0.15, zSide]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.038, 0.038, 0.65, 24]} />
                  <meshStandardMaterial color="#e4e4e7" metalness={0.99} roughness={0.1} />
                </mesh>
                {/* 3 Loaded Bumper Plates on Each Side */}
                {[0.12, 0.22, 0.32].map((zOff, pIdx) => {
                  const pZ = sideIdx === 0 ? -zOff : zOff;
                  return (
                    <group key={pIdx} position={[0, 0, pZ]}>
                      <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.48, 0.48, 0.06, 48]} />
                        <meshStandardMaterial color="#18181b" metalness={0.4} roughness={0.5} wireframe={isXray} />
                      </mesh>
                      <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.475, 0.015, 16, 48]} />
                        <meshStandardMaterial color="#10b981" metalness={0.9} emissive="#10b981" emissiveIntensity={0.6} wireframe={isXray} />
                      </mesh>
                    </group>
                  );
                })}
              </group>
            ))}
          </group>
        </group>
      </group>
    </Float>
  );
}

/**
 * 05 // Commercial 2-Tier Heavy Dumbbell Saddle Rack Matrix
 */
export function ShowcaseDumbbellRack({ stageMode = 'orbit' }: { stageMode?: StageMode }) {
  const groupRef = useRef<THREE.Group>(null);
  const featuredPairRef = useRef<THREE.Group>(null);
  const isXray = stageMode === 'xray';
  const isKinetic = stageMode === 'kinetic';

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    if (isKinetic) {
      // Dynamic Kinetic Float: The heavy 32kg pair lifts off the rack and curls in sync
      if (featuredPairRef.current) {
        featuredPairRef.current.position.y = 0.2 + Math.sin(t * 2.4) * 0.3;
        featuredPairRef.current.rotation.z = Math.sin(t * 2.4) * 0.4;
      }
      groupRef.current.rotation.y += delta * 0.25;
    } else {
      if (featuredPairRef.current) {
        featuredPairRef.current.position.y = 0;
        featuredPairRef.current.rotation.z = 0;
      }
      groupRef.current.position.set(0, -0.3, 0);
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={isKinetic ? 0 : 1.3} rotationIntensity={0.18} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, -0.3, 0]} rotation={[0.2, 0.35, 0]} scale={1.05}>
        {/* Heavy A-Frame Welded Tubular Steel Side Endplates */}
        {[-1.05, 1.05].map((x, idx) => (
          <group key={idx} position={[x, 0.1, 0]}>
            {/* Front Leg */}
            <mesh position={[0, -0.4, 0.3]} rotation={[Math.PI / 8, 0, 0]}>
              <boxGeometry args={[0.09, 1.1, 0.09]} />
              <meshStandardMaterial color={isXray ? '#047857' : '#141418'} metalness={0.92} roughness={0.3} wireframe={isXray} />
            </mesh>
            {/* Rear Leg */}
            <mesh position={[0, -0.35, -0.28]} rotation={[-Math.PI / 10, 0, 0]}>
              <boxGeometry args={[0.09, 1.25, 0.09]} />
              <meshStandardMaterial color={isXray ? '#047857' : '#141418'} metalness={0.92} roughness={0.3} wireframe={isXray} />
            </mesh>
            {/* Base Footpad */}
            <mesh position={[0, -0.9, 0]}>
              <boxGeometry args={[0.12, 0.06, 0.85]} />
              <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.2} wireframe={isXray} />
            </mesh>
          </group>
        ))}

        {/* Tier 1 (Lower Shelf Angled at 15°) */}
        <mesh position={[0, -0.15, 0.12]} rotation={[Math.PI / 12, 0, 0]}>
          <boxGeometry args={[2.1, 0.06, 0.34]} />
          <meshStandardMaterial color={isXray ? '#065f46' : '#1f1f23'} metalness={0.88} roughness={0.35} wireframe={isXray} />
        </mesh>

        {/* Tier 2 (Upper Shelf Angled at 15°) */}
        <mesh position={[0, 0.38, -0.12]} rotation={[Math.PI / 12, 0, 0]}>
          <boxGeometry args={[2.1, 0.06, 0.34]} />
          <meshStandardMaterial color={isXray ? '#065f46' : '#1f1f23'} metalness={0.88} roughness={0.35} wireframe={isXray} />
        </mesh>

        {/* Lower Shelf Array: 4 Pairs of Hex Dumbbells (12kg, 16kg, 20kg, 24kg) */}
        {[-0.75, -0.25, 0.25, 0.75].map((xPos, idx) => {
          const headRadius = 0.16 + idx * 0.025;
          return (
            <group key={idx} position={[xPos, -0.05, 0.14]} rotation={[Math.PI / 12, 0, 0]}>
              {/* Dumbbell Handle */}
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.022, 0.022, 0.32, 24]} />
                <meshStandardMaterial color="#f4f4f5" metalness={0.98} roughness={0.15} wireframe={isXray} />
              </mesh>
              {/* Dual Hex Heads */}
              {[-0.17, 0.17].map((hX, hIdx) => (
                <mesh key={hIdx} position={[hX, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[headRadius, headRadius, 0.09, 6]} />
                  <meshStandardMaterial color="#141416" metalness={0.5} roughness={0.4} wireframe={isXray} />
                </mesh>
              ))}
            </group>
          );
        })}

        {/* Upper Shelf Array: 3 Pairs + 1 Featured Kinetic Pair (28kg, 32kg, 36kg) */}
        {[-0.65, 0.65].map((xPos, idx) => (
          <group key={idx} position={[xPos, 0.48, -0.1]} rotation={[Math.PI / 12, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.024, 0.024, 0.34, 24]} />
              <meshStandardMaterial color="#f4f4f5" metalness={0.98} roughness={0.15} wireframe={isXray} />
            </mesh>
            {[-0.18, 0.18].map((hX, hIdx) => (
              <mesh key={hIdx} position={[hX, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.24, 0.24, 0.1, 6]} />
                <meshStandardMaterial color="#141416" metalness={0.5} roughness={0.4} wireframe={isXray} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Featured Center 32kg Pair that animates in Kinetic Mode */}
        <group ref={featuredPairRef} position={[0, 0.48, -0.1]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 0.36, 24]} />
            <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.08} wireframe={isXray} />
          </mesh>
          {[-0.19, 0.19].map((hX, hIdx) => (
            <group key={hIdx} position={[hX, 0, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.26, 0.26, 0.11, 6]} />
                <meshStandardMaterial color={isXray ? '#047857' : '#18181c'} metalness={0.5} roughness={0.4} wireframe={isXray} />
              </mesh>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.265, 0.265, 0.015, 6]} />
                <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.6} wireframe={isXray} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </Float>
  );
}

/**
 * Main Interactive Commercial Apparatus Viewer Component
 */
export function FloatingEquipment({ activeType = 'power_rack', stageMode = 'orbit' }: EquipmentViewerProps) {
  return (
    <group position={[0, 0, 0]}>
      {activeType === 'power_rack' && <ShowcasePowerRack stageMode={stageMode} />}
      {activeType === 'cable_crossover' && <ShowcaseCableCrossover stageMode={stageMode} />}
      {activeType === 'bench_press' && <ShowcaseBenchPress stageMode={stageMode} />}
      {activeType === 'leg_press' && <ShowcaseLegPress stageMode={stageMode} />}
      {activeType === 'dumbbell_rack' && <ShowcaseDumbbellRack stageMode={stageMode} />}
    </group>
  );
}

export default FloatingEquipment;
