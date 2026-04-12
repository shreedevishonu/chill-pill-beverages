import { Environment, Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type React from "react";
import { useRef } from "react";
import type * as THREE from "three";

/* ─── Beverage Can Mesh ────────────────────────────────────────────── */
function BeverageCan({ primaryColor = "#FF6B35", accentColor = "#FFD700" }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.8}>
      <group ref={groupRef}>
        {/* Main can body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.52, 0.52, 2.6, 48, 1]} />
          <meshPhysicalMaterial
            color="#1a1a1a"
            metalness={0.95}
            roughness={0.08}
            reflectivity={1}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Label band — brand orange */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.525, 0.525, 1.8, 48]} />
          <meshPhysicalMaterial
            color={primaryColor}
            metalness={0.6}
            roughness={0.15}
            clearcoat={0.8}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Label accent stripe — yellow */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.527, 0.527, 0.2, 48]} />
          <meshPhysicalMaterial
            color={accentColor}
            metalness={0.7}
            roughness={0.1}
            clearcoat={1}
          />
        </mesh>

        {/* Label accent stripe bottom — green */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.527, 0.527, 0.2, 48]} />
          <meshPhysicalMaterial
            color="#7CB518"
            metalness={0.7}
            roughness={0.1}
            clearcoat={1}
          />
        </mesh>

        {/* Label highlight reflection */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.528, 0.528, 1.82, 48]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0}
            roughness={0.6}
            transparent
            opacity={0.07}
          />
        </mesh>

        {/* Top dome cap */}
        <mesh position={[0, 1.3, 0]}>
          <cylinderGeometry args={[0.52, 0.52, 0.04, 48]} />
          <meshPhysicalMaterial
            color="#888888"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* Top taper */}
        <mesh position={[0, 1.42, 0]}>
          <cylinderGeometry args={[0.32, 0.52, 0.25, 48]} />
          <meshPhysicalMaterial
            color="#aaaaaa"
            metalness={0.92}
            roughness={0.08}
          />
        </mesh>

        {/* Rim ring */}
        <mesh position={[0, 1.56, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.06, 48]} />
          <meshPhysicalMaterial
            color="#cccccc"
            metalness={0.98}
            roughness={0.05}
          />
        </mesh>

        {/* Pull tab base */}
        <mesh position={[0.1, 1.6, 0]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.18, 0.04, 0.32]} />
          <meshPhysicalMaterial
            color="#c0c0c0"
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

        {/* Pull tab ring */}
        <mesh position={[0.1, 1.64, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.06, 0.015, 12, 24]} />
          <meshPhysicalMaterial
            color="#dddddd"
            metalness={0.85}
            roughness={0.1}
          />
        </mesh>

        {/* Bottom cap */}
        <mesh position={[0, -1.3, 0]}>
          <cylinderGeometry args={[0.52, 0.52, 0.04, 48]} />
          <meshPhysicalMaterial
            color="#888888"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* Bottom inner dome */}
        <mesh position={[0, -1.38, 0]}>
          <cylinderGeometry args={[0.42, 0.52, 0.18, 48]} />
          <meshPhysicalMaterial
            color="#777777"
            metalness={0.92}
            roughness={0.12}
          />
        </mesh>

        {/* Brand text disc */}
        <mesh position={[0, 0.2, 0.53]} rotation={[0, 0, 0]}>
          <circleGeometry args={[0.28, 32]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0}
            roughness={0.5}
            transparent
            opacity={0.18}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Bottle component (kept for backwards compat) ─────────────────── */
interface BottleProps {
  color: string;
  speed?: number;
}

function Bottle({ color, speed = 1 }: BottleProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.38, 2.0, 32, 1]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.1}
            roughness={0.05}
            transmission={0.6}
            thickness={1.5}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.2, 0.34, 0.5, 32]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.1}
            roughness={0.05}
            transmission={0.6}
            thickness={1}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[0, 1.55, 0]}>
          <cylinderGeometry args={[0.21, 0.21, 0.2, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, -1.0, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.05, 32]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.36, 0.39, 1.4, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0}
            roughness={0.7}
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Hero Can Canvas ───────────────────────────────────────────────── */
export function HeroCanCanvas({ className = "" }: { className?: string }) {
  return (
    <div
      className={className}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        {/* Key light — warm orange from top left */}
        <pointLight
          position={[-4, 6, 4]}
          intensity={80}
          color="#FF6B35"
          decay={2}
        />
        {/* Fill light — cool blue from right */}
        <pointLight
          position={[5, 0, 3]}
          intensity={40}
          color="#00B4D8"
          decay={2}
        />
        {/* Rim light — purple from behind */}
        <pointLight
          position={[0, -4, -5]}
          intensity={30}
          color="#9B5DE5"
          decay={2}
        />
        {/* Top accent */}
        <spotLight
          position={[0, 10, 2]}
          intensity={60}
          angle={0.35}
          penumbra={0.7}
          color="#FFD700"
          decay={2}
        />
        <BeverageCan primaryColor="#FF6B35" accentColor="#FFD700" />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

/* ─── BottleCanvas (default export for backward compat) ─────────────── */
interface BottleCanvasProps {
  color: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
}

export default function BottleCanvas({
  color,
  className = "",
  style,
  speed = 1,
}: BottleCanvasProps) {
  return (
    <div className={className} style={{ background: "transparent", ...style }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={0.4} color={color} />
        <spotLight
          position={[0, 8, 0]}
          intensity={0.8}
          angle={0.4}
          penumbra={0.5}
        />
        <Bottle color={color} speed={speed} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
