import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDeviceTier } from "@/hooks/use-device-tier";

/**
 * SilkRibbon
 * Full-page fixed background. A long undulating silk ribbon that morphs
 * through six stylized "knot" configurations as the user scrolls — a
 * tailor-at-work motif (Four-in-Hand → Half Windsor → Full Windsor →
 * Pratt → Kelvin → Eldredge). Each preset has its own twist/wave/coil
 * signature; we lerp between them based on normalized page scroll.
 * pointer-events: none, z-index: -1, SSR-safe.
 */

// Per-knot signature: [waveAmp, waveFreq, swirlAmp, twistAmp, coil, rotZ]
// These are hand-tuned to feel visibly distinct as you scroll.
const KNOTS: Array<[number, number, number, number, number, number]> = [
  [0.45, 0.55, 0.35, 1.10, 0.00, 0.00],  // Four-in-Hand — simple, asymmetric
  [0.55, 0.70, 0.55, 1.30, 0.25, 0.12],  // Half Windsor — balanced
  [0.65, 0.85, 0.75, 1.55, 0.55, 0.18],  // Full Windsor — wide, symmetric
  [0.50, 1.05, 0.60, 1.20, 0.35, -0.10], // Pratt/Shelby — medium, clean
  [0.60, 1.25, 0.85, 1.40, 0.70, 0.22],  // Kelvin — tight, doubled
  [0.75, 1.60, 1.05, 1.65, 0.95, 0.28],  // Eldredge — intricate, woven
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function lerpKnot(
  a: (typeof KNOTS)[number],
  b: (typeof KNOTS)[number],
  t: number,
): (typeof KNOTS)[number] {
  return [
    lerp(a[0], b[0], t),
    lerp(a[1], b[1], t),
    lerp(a[2], b[2], t),
    lerp(a[3], b[3], t),
    lerp(a[4], b[4], t),
    lerp(a[5], b[5], t),
  ];
}
// Smoothstep for non-linear ease between sections
function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function Ribbon({ segments }: { segments: [number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const scrollRef = useRef(0);

  // Long, dense plane so displacement reads as flowing silk.
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(24, 1.8, segments[0], segments[1]);
    g.rotateY(-Math.PI / 12);
    return g;
  }, [segments]);

  const basePositions = useMemo(() => {
    const arr = geometry.attributes.position.array as Float32Array;
    return new Float32Array(arr);
  }, [geometry]);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = Math.min(0.9999, Math.max(0, scrollRef.current));

    // Map scroll [0..1] across the 6 knot presets and lerp between neighbors
    const slots = KNOTS.length - 1;
    const f = scroll * slots;
    const i = Math.floor(f);
    const localT = smooth(f - i);
    const k = lerpKnot(KNOTS[i], KNOTS[Math.min(i + 1, slots)], localT);
    const [waveAmp, waveFreq, swirlAmp, twistAmp, coil, rotZBias] = k;

    const pos = geometry.attributes.position;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < arr.length; i += 3) {
      const x = basePositions[i];
      const y = basePositions[i + 1];
      // Travelling wave + per-knot swirl + twist + coil (a slow loop along length)
      const wave = Math.sin(x * waveFreq + t * 0.85) * waveAmp;
      const swirl = Math.cos(x * 0.22 - t * 0.35 + scroll * 6.0) * swirlAmp;
      const twist = Math.sin(x * 0.18 + t * 0.4) * y * twistAmp;
      const loopY = Math.sin(x * 0.5 + t * 0.6) * coil * 0.6;
      const loopZ = Math.cos(x * 0.5 + t * 0.6) * coil * 0.6;
      arr[i + 1] = y + wave * 0.25 + loopY;
      arr[i + 2] = wave + swirl + twist + loopZ;
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();

    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(t * 0.15) * 0.08 + scroll * 0.3 + rotZBias;
      meshRef.current.rotation.x = -0.15 + Math.sin(t * 0.1) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhysicalMaterial
        color={new THREE.Color("#d4a843")}
        metalness={0.30}
        roughness={0.22}
        clearcoat={1}
        clearcoatRoughness={0.12}
        sheen={1}
        sheenColor={new THREE.Color("#ffe6a8")}
        sheenRoughness={0.35}
        side={THREE.DoubleSide}
        envMapIntensity={1.0}
      />
    </mesh>
  );
}

function OrbitingCamera() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const radius = 7.5;
    state.camera.position.x = Math.sin(t * 0.08) * radius * 0.35;
    state.camera.position.y = 3.2 + Math.sin(t * 0.12) * 0.25;
    state.camera.position.z = radius;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function SilkRibbon() {
  const [mounted, setMounted] = useState(false);
  const { dpr, ribbonSegments, prefersReducedMotion } = useDeviceTier();
  useEffect(() => setMounted(true), []);
  if (!mounted || prefersReducedMotion) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse at 70% 25%, #2a2335 0%, #161423 45%, #0c0c14 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 3.2, 7.5], fov: 38 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: false }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#15131f"]} />
        <fog attach="fog" args={["#15131f", 10, 22]} />

        {/* Warm spotlight from above-right, brighter so the silk reads */}
        <spotLight
          position={[6, 8, 4]}
          angle={0.55}
          penumbra={0.85}
          intensity={42}
          color="#ffd9a0"
          distance={22}
          castShadow={false}
        />
        <pointLight position={[-5, -2, 3]} intensity={4.0} color="#7a64b8" />
        <ambientLight intensity={0.35} color="#2a2438" />

        <OrbitingCamera />
        <Ribbon segments={ribbonSegments} />
      </Canvas>
    </div>
  );
}