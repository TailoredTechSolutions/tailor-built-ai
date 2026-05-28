import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Sphere, Points, PointMaterial } from "@react-three/drei";
import { Pointer, Smartphone } from "lucide-react";
import * as THREE from "three";
import { useDeviceTier } from "@/hooks/use-device-tier";

function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!);
  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
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
    // Mouse / touch parallax — ease toward pointer
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

function Scene({
  pointer,
  onInteract,
  particleCount,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  onInteract?: () => void;
  particleCount: number;
}) {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      onInteract?.();
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointer, onInteract]);

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 4]} intensity={1.4} color="#d4a843" />
      <pointLight position={[-5, -3, -3]} intensity={1.2} color="#8855ff" />
      <pointLight position={[0, 0, 3]} intensity={0.6} color="#3aa0ff" />
      <ParticleField count={particleCount} />
      <Core pointer={pointer} />
    </>
  );
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const [interacted, setInteracted] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { dpr, particleCount, isTouch } = useDeviceTier();

  useEffect(() => setMounted(true), []);

  // Auto-hide hint after 5s
  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => setHintVisible(false), 5200);
    return () => clearTimeout(t);
  }, [mounted]);

  const handleInteract = () => {
    if (!interacted) setInteracted(true);
  };

  // Touch drag drives parallax
  useEffect(() => {
    if (!isTouch || !containerRef.current) return;
    const el = containerRef.current;
    let startX = 0;
    let startY = 0;
    let active = false;

    const onStart = (e: TouchEvent) => {
      active = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      handleInteract();
    };
    const onMove = (e: TouchEvent) => {
      if (!active) return;
      const dx = (e.touches[0].clientX - startX) / window.innerWidth;
      const dy = (e.touches[0].clientY - startY) / window.innerHeight;
      pointer.current.x = dx * 3;
      pointer.current.y = dy * 3;
    };
    const onEnd = () => {
      active = false;
      // gentle decay back to center
      const decay = () => {
        pointer.current.x *= 0.92;
        pointer.current.y *= 0.92;
        if (Math.abs(pointer.current.x) > 0.01 || Math.abs(pointer.current.y) > 0.01) {
          requestAnimationFrame(decay);
        }
      };
      decay();
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [isTouch]);

  const showHint = hintVisible && !interacted;

  return (
    <div ref={containerRef} className="relative aspect-square w-full max-w-[560px] mx-auto select-none">
      {/* Glow halo */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(212,168,67,0.28),transparent_65%)] blur-2xl pointer-events-none" />
      <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(136,85,255,0.18),transparent_70%)] blur-2xl pointer-events-none" />

      {mounted && (
        <Canvas
          className="!absolute inset-0"
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          dpr={dpr}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene pointer={pointer} onInteract={handleInteract} particleCount={particleCount} />
          </Suspense>
        </Canvas>
      )}

      {/* Desktop cursor hint */}
      <div
        className={`hidden md:flex absolute -bottom-2 left-1/2 -translate-x-1/2 items-center gap-1.5 px-3 py-1.5 rounded-full glass pointer-events-none transition-all duration-700 ${
          showHint ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <Pointer size={13} className="text-gold" />
        <span className="text-[11px] font-mono tracking-wider text-gold-dim">Move your cursor</span>
      </div>

      {/* Mobile touch hint */}
      <div
        className={`flex md:hidden absolute -bottom-2 left-1/2 -translate-x-1/2 items-center gap-1.5 px-3 py-1.5 rounded-full glass pointer-events-none transition-all duration-700 ${
          showHint ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <Smartphone size={13} className="text-gold" />
        <span className="text-[11px] font-mono tracking-wider text-gold-dim">Drag to explore</span>
        <span className="tap-ring ml-0.5" />
      </div>

      {/* Invisible interaction catcher for desktop hover awareness */}
      <div className="absolute inset-0 cursor-crosshair" onMouseMove={handleInteract} />
    </div>
  );
}
