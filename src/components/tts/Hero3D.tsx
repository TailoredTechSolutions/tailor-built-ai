import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Sphere, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const [positions] = useState(() => {
    const arr = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      const r = 2.4 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  });

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.04;
    ref.current.rotation.x += dt * 0.015;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#d4a843"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

function Core({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Mesh>(null!);

  useFrame((state, dt) => {
    if (!group.current) return;
    // Slow auto-rotate
    group.current.rotation.y += dt * 0.25;
    group.current.rotation.x += dt * 0.06;
    // Mouse parallax — ease toward pointer
    const tx = pointer.current.x * 0.35;
    const ty = pointer.current.y * 0.35;
    group.current.position.x += (tx - group.current.position.x) * 0.04;
    group.current.position.y += (-ty - group.current.position.y) * 0.04;

    if (inner.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.04;
      inner.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      {/* Outer wireframe shell — gold */}
      <Icosahedron args={[1.55, 1]}>
        <meshBasicMaterial color="#d4a843" wireframe transparent opacity={0.55} />
      </Icosahedron>

      {/* Mid ring — subtle */}
      <Icosahedron args={[1.95, 2]}>
        <meshBasicMaterial color="#8855ff" wireframe transparent opacity={0.18} />
      </Icosahedron>

      {/* Inner glowing core */}
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.4}>
        <Sphere ref={inner} args={[0.78, 64, 64]}>
          <meshStandardMaterial
            color="#0d1a3a"
            emissive="#d4a843"
            emissiveIntensity={0.85}
            roughness={0.25}
            metalness={0.9}
          />
        </Sphere>
      </Float>

      {/* Inner refraction sphere */}
      <Sphere args={[1.18, 48, 48]}>
        <meshPhysicalMaterial
          color="#1a0d3a"
          transmission={0.9}
          thickness={1.2}
          roughness={0.15}
          ior={1.45}
          transparent
          opacity={0.35}
          metalness={0.2}
        />
      </Sphere>
    </group>
  );
}

function Scene() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 4]} intensity={1.4} color="#d4a843" />
      <pointLight position={[-5, -3, -3]} intensity={1.2} color="#8855ff" />
      <pointLight position={[0, 0, 3]} intensity={0.6} color="#3aa0ff" />
      <ParticleField />
      <Core pointer={pointer} />
    </>
  );
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative aspect-square w-full max-w-[560px] mx-auto">
      {/* Glow halo */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(212,168,67,0.28),transparent_65%)] blur-2xl pointer-events-none" />
      <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(136,85,255,0.18),transparent_70%)] blur-2xl pointer-events-none" />

      {mounted && (
        <Canvas
          className="!absolute inset-0"
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}