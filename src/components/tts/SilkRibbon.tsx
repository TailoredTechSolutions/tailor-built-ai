import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDeviceTier } from "@/hooks/use-device-tier";

/**
 * SilkRibbon
 * Full-page fixed background. A long undulating ribbon with a silk-sheen
 * physical material, slowly orbited by the camera. SSR-safe.
 * pointer-events: none, z-index: -1.
 */
function Ribbon({ segments }: { segments: [number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const scrollRef = useRef(0);

  // Long, dense plane so the sinusoidal displacement reads as flowing silk.
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(22, 1.6, segments[0], segments[1]);
    g.rotateY(-Math.PI / 12);
    return g;
  }, [segments]);

  // Cache original positions so we displace from the rest pose each frame.
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
    const scroll = scrollRef.current;
    const pos = geometry.attributes.position;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < arr.length; i += 3) {
      const x = basePositions[i];
      const y = basePositions[i + 1];
      // Travelling wave along the ribbon length + a slow twist driven by scroll.
      const wave = Math.sin(x * 0.55 + t * 0.9) * 0.45;
      const swirl = Math.cos(x * 0.22 - t * 0.35 + scroll * 6.0) * 0.35;
      const twist = Math.sin(x * 0.18 + t * 0.4) * y * 1.1;
      arr[i + 1] = y + wave * 0.2;
      arr[i + 2] = wave + swirl + twist;
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();

    // Gentle drift + scroll-linked rotation so the ribbon "responds" to the page.
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(t * 0.15) * 0.08 + scroll * 0.3;
      meshRef.current.rotation.x = -0.15 + Math.sin(t * 0.1) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhysicalMaterial
        color={new THREE.Color("#d4a843")}
        metalness={0.35}
        roughness={0.18}
        clearcoat={1}
        clearcoatRoughness={0.12}
        sheen={1}
        sheenColor={new THREE.Color("#ffe6a8")}
        sheenRoughness={0.35}
        side={THREE.DoubleSide}
        envMapIntensity={0.7}
      />
    </mesh>
  );
}

function OrbitingCamera() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const radius = 7.5;
    // ~30deg elevation, slow horizontal orbit.
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
        background: "#09090f",
      }}
    >
      <Canvas
        camera={{ position: [0, 3.2, 7.5], fov: 38 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: false }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#09090f"]} />
        <fog attach="fog" args={["#09090f", 8, 16]} />

        {/* Warm spotlight from above-right, per spec */}
        <spotLight
          position={[6, 8, 4]}
          angle={0.55}
          penumbra={0.85}
          intensity={28}
          color="#ffd9a0"
          distance={22}
          castShadow={false}
        />
        <pointLight position={[-5, -2, 3]} intensity={2.5} color="#5b4a8a" />
        <ambientLight intensity={0.18} color="#1a1626" />

        <OrbitingCamera />
        <Ribbon segments={ribbonSegments} />
      </Canvas>
    </div>
  );
}