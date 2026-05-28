import { useEffect, useId, useRef, useState } from "react";

/**
 * FuseText — renders a word whose outline is traced by a bright ignition spark,
 * like a lit fuse racing across the lettering. Built with SVG strokes + a
 * filter-based glow + ember particles. Auto-loops with a brief flash at the end.
 */
type FuseTextProps = {
  text: string;
  className?: string;
  /** seconds for one full trace cycle */
  duration?: number;
  /** seconds between loops */
  pauseBetween?: number;
  italic?: boolean;
};

export function FuseText({
  text,
  className,
  duration = 3.2,
  pauseBetween = 2.4,
  italic = true,
}: FuseTextProps) {
  const uid = useId().replace(/[:]/g, "");
  const textRef = useRef<SVGTextElement>(null);
  const [len, setLen] = useState(2400);
  const [tick, setTick] = useState(0);
  const [flash, setFlash] = useState(false);

  // Measure rendered text outline length so the dash math is exact.
  useEffect(() => {
    if (!textRef.current) return;
    try {
      const measured = (textRef.current as unknown as SVGGeometryElement).getComputedTextLength?.();
      if (measured && measured > 0) setLen(Math.max(measured * 2.2, 800));
    } catch {
      /* ignore */
    }
  }, [text]);

  // Loop: run trace, flash at the end, wait, restart.
  useEffect(() => {
    const totalMs = duration * 1000;
    const flashTimer = setTimeout(() => setFlash(true), totalMs - 220);
    const resetTimer = setTimeout(() => setFlash(false), totalMs + 600);
    const loopTimer = setTimeout(() => setTick((t) => t + 1), totalMs + pauseBetween * 1000);
    return () => {
      clearTimeout(flashTimer);
      clearTimeout(resetTimer);
      clearTimeout(loopTimer);
    };
  }, [tick, duration, pauseBetween]);

  const glowId = `fuse-glow-${uid}`;
  const gradId = `fuse-grad-${uid}`;
  const sparkId = `fuse-spark-${uid}`;

  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        lineHeight: 1,
        fontStyle: italic ? "italic" : "normal",
      }}
    >
      {/* Invisible sizer — keeps layout identical to a normal span */}
      <span aria-hidden style={{ visibility: "hidden", whiteSpace: "pre" }}>{text}</span>

      <svg
        key={tick}
        aria-hidden
        viewBox="0 0 1000 220"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <defs>
          <filter id={glowId} x="-30%" y="-60%" width="160%" height="220%">
            <feGaussianBlur stdDeviation="3.2" result="b1" />
            <feGaussianBlur stdDeviation="8" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={sparkId} x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffe8a8" />
            <stop offset="45%" stopColor="#ffb347" />
            <stop offset="100%" stopColor="#ff5a1f" />
          </linearGradient>
        </defs>

        {/* Cold metallic base outline (always visible) */}
        <text
          ref={textRef}
          x="500"
          y="160"
          textAnchor="middle"
          fontFamily="'Cabinet Grotesk', system-ui, sans-serif"
          fontWeight={800}
          fontStyle={italic ? "italic" : "normal"}
          fontSize="180"
          fill="url(#tts-gold-grad)"
          stroke="rgba(212,168,67,0.35)"
          strokeWidth="1.5"
          style={{ letterSpacing: "-0.04em" }}
        >
          {text}
        </text>

        {/* Cooled trail — red-hot remnant of the burn */}
        <text
          x="500"
          y="160"
          textAnchor="middle"
          fontFamily="'Cabinet Grotesk', system-ui, sans-serif"
          fontWeight={800}
          fontStyle={italic ? "italic" : "normal"}
          fontSize="180"
          fill="none"
          stroke="#ff5a1f"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
          style={{
            letterSpacing: "-0.04em",
            strokeDasharray: `${len} ${len}`,
            strokeDashoffset: len,
            animation: `fuse-trail-${uid} ${duration}s cubic-bezier(0.55,0.05,0.45,0.95) forwards`,
            opacity: 0.55,
          }}
        >
          {text}
        </text>

        {/* Bright ignition stroke — the spark itself */}
        <text
          x="500"
          y="160"
          textAnchor="middle"
          fontFamily="'Cabinet Grotesk', system-ui, sans-serif"
          fontWeight={800}
          fontStyle={italic ? "italic" : "normal"}
          fontSize="180"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
          style={{
            letterSpacing: "-0.04em",
            strokeDasharray: `38 ${len}`,
            strokeDashoffset: len,
            animation: `fuse-spark-${uid} ${duration}s cubic-bezier(0.55,0.05,0.45,0.95) forwards`,
          }}
        >
          {text}
        </text>

        <style>{`
          @keyframes fuse-spark-${uid} {
            0%   { stroke-dashoffset: ${len}; opacity: 0; }
            6%   { opacity: 1; }
            96%  { opacity: 1; }
            100% { stroke-dashoffset: ${len * 0.05}; opacity: 0; }
          }
          @keyframes fuse-trail-${uid} {
            0%   { stroke-dashoffset: ${len}; opacity: 0; }
            8%   { opacity: 0.7; }
            100% { stroke-dashoffset: 0; opacity: 0; }
          }
        `}</style>
      </svg>

      {/* Flash burst at the end of each loop */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: "-20% -8%",
          background: "radial-gradient(ellipse at center, rgba(255,235,180,0.55), rgba(255,150,60,0.25) 35%, transparent 70%)",
          opacity: flash ? 1 : 0,
          transform: flash ? "scale(1)" : "scale(0.85)",
          transition: "opacity 220ms ease-out, transform 320ms ease-out",
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      {/* One-time SVG gold gradient def shared across instances */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <linearGradient id="tts-gold-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5d27a" />
            <stop offset="55%" stopColor="#d4a843" />
            <stop offset="100%" stopColor="#8a6a1f" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}