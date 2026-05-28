import { useEffect, useState } from "react";

export type DeviceTier = "low" | "mid" | "high";

export interface DeviceCaps {
  tier: DeviceTier;
  isMobile: boolean;
  isTouch: boolean;
  prefersReducedMotion: boolean;
  dpr: [number, number];
  particleCount: number;
  ribbonSegments: [number, number]; // [length, width]
}

function detect(): DeviceCaps {
  if (typeof window === "undefined") {
    return {
      tier: "high",
      isMobile: false,
      isTouch: false,
      prefersReducedMotion: false,
      dpr: [1, 2],
      particleCount: 1200,
      ribbonSegments: [240, 24],
    };
  }

  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) || window.innerWidth < 768;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // deviceMemory is Chromium-only; navigator.hardwareConcurrency is broader.
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;

  let tier: DeviceTier = "high";
  if (isMobile || mem <= 2 || cores <= 2 || prefersReducedMotion) tier = "low";
  else if (mem <= 4 || cores <= 4) tier = "mid";

  const presets: Record<DeviceTier, Pick<DeviceCaps, "dpr" | "particleCount" | "ribbonSegments">> = {
    low: { dpr: [1, 1.25], particleCount: 350, ribbonSegments: [110, 12] },
    mid: { dpr: [1, 1.5], particleCount: 750, ribbonSegments: [170, 18] },
    high: { dpr: [1, 2], particleCount: 1200, ribbonSegments: [240, 24] },
  };

  return { tier, isMobile, isTouch, prefersReducedMotion, ...presets[tier] };
}

export function useDeviceTier(): DeviceCaps {
  const [caps, setCaps] = useState<DeviceCaps>(() => detect());
  useEffect(() => {
    // Re-detect once on mount (covers SSR-default path)
    setCaps(detect());
  }, []);
  return caps;
}