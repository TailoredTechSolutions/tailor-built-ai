import type { CSSProperties } from "react";

/**
 * Cartoon scene components for the Services section.
 * Chunky outlines, candy palette, big characters, sparkles, motion lines.
 */

const GOLD = "#f5c542";
const GOLD_DEEP = "#c9952a";
const INK = "#1a1226";
const SKIN = "#f3c79b";
const HAIR = "#3a2418";
const CREAM = "#fdf6e3";
const SKY = "#5ec8f5";
const MINT = "#5ddc9a";
const CORAL = "#ff6b6b";
const LILAC = "#a98cf0";
const PINK = "#ff90c4";

const S = {
  stroke: INK,
  strokeWidth: 2.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const Sthin = { ...S, strokeWidth: 2 };
const Sthick = { ...S, strokeWidth: 3.5 };

function Burst({ cx, cy, color = GOLD, r = 80 }: { cx: number; cy: number; color?: string; r?: number }) {
  return (
    <g className="fx-spin" style={{ transformOrigin: `${cx}px ${cy}px` }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = cx + Math.cos(a) * (r * 0.55);
        const y1 = cy + Math.sin(a) * (r * 0.55);
        const x2 = cx + Math.cos(a) * r;
        const y2 = cy + Math.sin(a) * r;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />;
      })}
    </g>
  );
}

function Sparkles({ points, color = GOLD }: { points: [number, number, number?][]; color?: string }) {
  return (
    <>
      {points.map(([x, y, d = 0], i) => (
        <g key={i} className="fx-sparkle" style={{ animationDelay: `${d}s`, transformOrigin: `${x}px ${y}px` }}>
          <path d={`M ${x} ${y - 6} L ${x + 1.5} ${y - 1.5} L ${x + 6} ${y} L ${x + 1.5} ${y + 1.5} L ${x} ${y + 6} L ${x - 1.5} ${y + 1.5} L ${x - 6} ${y} L ${x - 1.5} ${y - 1.5} Z`} fill={color} {...Sthin} />
        </g>
      ))}
    </>
  );
}

/* ============================================================
   1. ANALYTICS / CRM
   ============================================================ */
export function AnalyticsScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-analytics">
      <svg viewBox="0 0 400 240" className="w-[95%] h-[95%]" aria-hidden>
        <Burst cx={200} cy={120} color={GOLD} r={130} />
        <ellipse cx="200" cy="220" rx="150" ry="7" fill={INK} opacity="0.25" />

        <g className="cartoon-bounce" style={{ animationDuration: "3s" }}>
          <path d="M 50 200 L 350 200 L 372 218 L 28 218 Z" fill={CREAM} {...Sthick} />
          <rect x="180" y="200" width="40" height="6" rx="2" fill={INK} />
          <rect x="62" y="32" width="276" height="172" rx="14" fill={CREAM} {...Sthick} />
          <rect x="72" y="42" width="256" height="152" rx="8" fill={SKY} />
          <rect x="80" y="50" width="240" height="22" rx="6" fill={CREAM} />
          <text x="90" y="66" fontSize="12" fill={INK} fontFamily="Outfit, sans-serif" fontWeight="800">CRM DASHBOARD</text>
          <circle cx="296" cy="61" r="3" fill={INK} className="cartoon-blink" />
          <circle cx="306" cy="61" r="3" fill={INK} className="cartoon-blink" style={{ animationDelay: "0.2s" }} />

          {[{ c: MINT, l: "REVENUE", v: "$42K" }, { c: GOLD, l: "DEALS", v: "128" }, { c: CORAL, l: "WINRATE", v: "+34%" }].map((k, i) => (
            <g key={i} className="kpi-tile" style={{ animationDelay: `${0.2 + i * 0.2}s` }}>
              <rect x={80 + i * 82} y="80" width="74" height="34" rx="8" fill={k.c} {...S} />
              <text x={86 + i * 82} y="93" fontSize="7" fill={INK} fontFamily="monospace" fontWeight="800">{k.l}</text>
              <text x={86 + i * 82} y="108" fontSize="12" fill={INK} fontFamily="monospace" fontWeight="900">{k.v}</text>
            </g>
          ))}

          {[28, 44, 36, 58, 48, 70, 62, 80, 72].map((h, i) => (
            <rect key={i} x={84 + i * 26} y={188 - h} width="18" height={h} rx="4" fill={[GOLD, LILAC, MINT, CORAL][i % 4]} {...S}
              className="bar" style={{ animationDelay: `${0.8 + i * 0.07}s`, transformOrigin: "center 188px" }} />
          ))}
          <line x1="78" y1="188" x2="322" y2="188" {...Sthick} />
        </g>

        {[0, 1, 2, 3].map((i) => (
          <g key={i} className="coin-fall" style={{ animationDelay: `${i * 0.6}s` }} transform={`translate(${40 + i * 100}, 20)`}>
            <circle cx="0" cy="0" r="11" fill={GOLD} {...S} />
            <text x="0" y="4" fontSize="12" fill={INK} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">$</text>
          </g>
        ))}
        <Sparkles points={[[40, 40, 0], [360, 60, 0.6], [350, 180, 1.2], [30, 170, 0.3]]} />
      </svg>
    </div>
  );
}

/* ============================================================
   2. CYBERSECURITY
   ============================================================ */
export function CyberScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-cyber">
      <svg viewBox="0 0 400 240" className="w-[95%] h-[95%]" aria-hidden>
        <Burst cx={240} cy={120} color={GOLD} r={120} />
        <ellipse cx="200" cy="222" rx="130" ry="6" fill={INK} opacity="0.2" />

        {[0, 1, 2, 3].map((i) => (
          <g key={i} className="bug-march" style={{ animationDelay: `${i * 0.9}s` }} transform={`translate(20, ${50 + i * 42})`}>
            <ellipse cx="0" cy="0" rx="16" ry="13" fill={CORAL} {...S} />
            <circle cx="-6" cy="-2" r="4" fill={CREAM} {...Sthin} />
            <circle cx="5" cy="-2" r="4" fill={CREAM} {...Sthin} />
            <circle cx="-6" cy="-1" r="2" fill={INK} />
            <circle cx="5" cy="-1" r="2" fill={INK} />
            <path d="M -7 -12 L -11 -19 M 7 -12 L 11 -19" {...S} />
            <circle cx="-11" cy="-20" r="2.2" fill={INK} />
            <circle cx="11" cy="-20" r="2.2" fill={INK} />
            <path d="M -12 8 L -17 14 M 0 10 L 0 16 M 12 8 L 17 14" {...S} />
            <path d="M -4 6 Q 0 3 4 6" fill="none" {...S} />
          </g>
        ))}

        <g className="cartoon-bounce" style={{ animationDuration: "2.2s" }} transform="translate(250, 120)">
          <circle cx="0" cy="0" r="78" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.4" className="pulse-ring" />
          <circle cx="0" cy="0" r="78" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.4" className="pulse-ring" style={{ animationDelay: "1.4s" }} />

          <path d="M 0 -60 L 54 -42 L 54 22 Q 54 56 0 78 Q -54 56 -54 22 L -54 -42 Z" fill={GOLD} {...Sthick} />
          <path d="M 0 -48 L 42 -34 L 42 18 Q 42 44 0 62 Q -42 44 -42 18 L -42 -34 Z" fill={CREAM} {...S} />

          <circle cx="-15" cy="-10" r="7" fill={CREAM} {...S} />
          <circle cx="15" cy="-10" r="7" fill={CREAM} {...S} />
          <circle cx="-13" cy="-8" r="3" fill={INK} className="cartoon-blink" />
          <circle cx="17" cy="-8" r="3" fill={INK} className="cartoon-blink" style={{ animationDelay: "0.3s" }} />

          <path d="M -12 14 Q 0 26 12 14" fill="none" {...Sthick} />
          <circle cx="-26" cy="12" r="4" fill={CORAL} opacity="0.55" />
          <circle cx="26" cy="12" r="4" fill={CORAL} opacity="0.55" />

          <g transform="translate(0, 38)">
            <rect x="-10" y="-5" width="20" height="16" rx="3" fill={INK} {...S} />
            <path d="M -6 -5 L -6 -11 Q -6 -17 0 -17 Q 6 -17 6 -11 L 6 -5" fill="none" {...S} />
            <circle cx="0" cy="3" r="2" fill={GOLD} />
          </g>
        </g>

        {[0, 1, 2, 3].map((i) => (
          <g key={`s${i}`} className="cartoon-wiggle" style={{ animationDelay: `${i * 0.4}s` }} transform={`translate(${185}, ${50 + i * 42})`}>
            <path d="M 0 -8 L 3 -2 L 9 0 L 3 2 L 0 8 L -3 2 L -9 0 L -3 -2 Z" fill={GOLD} {...S} />
          </g>
        ))}
        <Sparkles points={[[330, 40, 0.2], [340, 200, 0.8], [180, 30, 0.5]]} color={MINT} />
      </svg>
    </div>
  );
}

/* ============================================================
   3. SALES AGENT / LEAD GEN / APPT SETTING
   ============================================================ */
export function SalesAgentScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-sales">
      <svg viewBox="0 0 400 240" className="w-[95%] h-[95%]" aria-hidden>
        <Burst cx={245} cy={120} color={PINK} r={120} />
        <ellipse cx="200" cy="222" rx="150" ry="7" fill={INK} opacity="0.2" />

        <rect x="20" y="188" width="360" height="24" rx="5" fill={GOLD_DEEP} {...S} />
        <rect x="20" y="188" width="360" height="8" rx="4" fill={GOLD} />

        <g transform="translate(50, 100)">
          <rect x="0" y="0" width="90" height="68" rx="8" fill={CREAM} {...Sthick} />
          <rect x="6" y="6" width="78" height="56" rx="4" fill={SKY} />
          <rect x="12" y="14" width="66" height="10" rx="3" fill={CREAM} />
          <rect x="12" y="28" width="48" height="7" rx="2" fill={MINT} />
          <rect x="12" y="39" width="56" height="7" rx="2" fill={GOLD} />
          <rect x="12" y="50" width="40" height="7" rx="2" fill={CORAL} />
          <rect x="38" y="68" width="14" height="10" fill={CREAM} {...S} />
          <rect x="26" y="78" width="38" height="5" rx="2" fill={CREAM} {...S} />
        </g>

        <g transform="translate(168, 162)">
          <rect x="0" y="0" width="20" height="26" rx="3" fill={CORAL} {...S} />
          <path d="M 20 6 Q 30 6 30 14 Q 30 22 20 22" fill="none" {...S} />
          <path d="M 6 -6 Q 6 -12 9 -12 M 12 -6 Q 12 -12 15 -12" fill="none" {...Sthin} opacity="0.6" />
        </g>

        <g transform="translate(250, 40)" className="cartoon-bounce" style={{ animationDuration: "2.6s" }}>
          <path d="M -32 92 Q 0 76 32 92 L 42 148 L -42 148 Z" fill={LILAC} {...Sthick} />
          <path d="M 0 90 L -9 114 L 0 121 L 9 114 Z" fill={CREAM} {...S} />
          <circle cx="0" cy="125" r="2.5" fill={GOLD} {...S} />
          <rect x="-7" y="70" width="14" height="16" rx="3" fill={SKIN} {...S} />

          <path d="M -30 30 Q -42 64 -36 100 L -22 92 Q -30 65 -22 38 Z" fill={HAIR} {...S} />
          <path d="M 30 30 Q 42 64 36 100 L 22 92 Q 30 65 22 38 Z" fill={HAIR} {...S} />
          <circle cx="0" cy="38" r="30" fill={SKIN} {...Sthick} />
          <path d="M -26 24 Q -22 4 0 2 Q 22 4 26 24 Q 20 14 0 14 Q -20 14 -26 24 Z" fill={HAIR} {...S} />

          <ellipse cx="-10" cy="38" rx="4.5" ry="5.5" fill={CREAM} {...S} />
          <ellipse cx="10" cy="38" rx="4.5" ry="5.5" fill={CREAM} {...S} />
          <circle cx="-10" cy="39" r="2.4" fill={INK} className="cartoon-blink" />
          <circle cx="10" cy="39" r="2.4" fill={INK} className="cartoon-blink" style={{ animationDelay: "0.25s" }} />
          <circle cx="-17" cy="48" r="3.5" fill={CORAL} opacity="0.55" />
          <circle cx="17" cy="48" r="3.5" fill={CORAL} opacity="0.55" />
          <path d="M -7 50 Q 0 58 7 50" fill="none" {...S} />

          <path d="M -32 24 Q 0 -8 32 24" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <circle cx="-32" cy="32" r="7" fill={INK} {...S} />
          <circle cx="-32" cy="32" r="3" fill={GOLD} />
          <path d="M -32 38 Q -24 54 -8 58" fill="none" {...S} />
          <circle cx="-8" cy="59" r="3.5" fill={GOLD} {...S} />
        </g>

        {[0, 1, 2].map((i) => (
          <path key={i} d={`M 250 99 q -${12 + i * 8} -${5 + i * 4} 0 -${12 + i * 7}`}
            fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" opacity="0" className="call-wave"
            style={{ animationDelay: `${i * 0.3}s` }} />
        ))}

        {[
          { y: 20, c: MINT, t: "BOOKED!" },
          { y: 50, c: GOLD, t: "LEAD!" },
          { y: 84, c: CORAL, t: "APPT SET" },
        ].map((b, i) => (
          <g key={i} className="call-bubble" style={{ animationDelay: `${0.3 + i * 1.1}s` }}>
            <rect x="20" y={b.y} width="92" height="28" rx="14" fill={b.c} {...S} />
            <path d={`M 40 ${b.y + 28} L 36 ${b.y + 36} L 50 ${b.y + 28} Z`} fill={b.c} {...S} />
            <circle cx="34" cy={b.y + 14} r="4.5" fill={CREAM} {...S} />
            <text x="46" y={b.y + 18} fontSize="10" fill={INK} fontFamily="Outfit, sans-serif" fontWeight="900">{b.t}</text>
          </g>
        ))}
        <Sparkles points={[[160, 30, 0], [350, 50, 0.5], [350, 170, 1]]} color={PINK} />
      </svg>
    </div>
  );
}

/* ============================================================
   4. AUTOMATION — Robot + pipes + balls
   ============================================================ */
export function AutomationScene() {
  const pipes = [
    { d: "M 30 70 Q 120 50 200 120 T 370 120", fill: GOLD },
    { d: "M 30 130 Q 120 130 200 120 T 370 70", fill: MINT },
    { d: "M 30 190 Q 120 210 200 120 T 370 170", fill: CORAL },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-automation">
      <svg viewBox="0 0 400 240" className="w-[95%] h-[95%]" aria-hidden>
        <Burst cx={200} cy={120} color={LILAC} r={120} />
        <ellipse cx="200" cy="222" rx="140" ry="7" fill={INK} opacity="0.2" />

        {pipes.map((p, i) => (
          <path key={i} d={p.d} fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
        ))}
        {pipes.map((p, i) => (
          <path key={`l${i}`} d={p.d} fill="none" stroke={CREAM} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 7" opacity="0.7" />
        ))}
        {pipes.map((p, i) => (
          <circle key={`b${i}`} r="7" fill={p.fill} stroke={INK} strokeWidth="2.5" className="pipe-ball"
            style={{ offsetPath: `path('${p.d}')`, animationDelay: `${i * 0.5}s` } as CSSProperties} />
        ))}

        <g transform="translate(200, 120)" className="cartoon-bounce" style={{ animationDuration: "2.2s" }}>
          <line x1="0" y1="-44" x2="0" y2="-54" {...S} />
          <circle cx="0" cy="-58" r="5" fill={CORAL} {...S} className="cartoon-wiggle" />
          <rect x="-38" y="-44" width="76" height="58" rx="14" fill={LILAC} {...Sthick} />
          <rect x="-26" y="-32" width="52" height="32" rx="6" fill={INK} {...S} />
          <circle cx="-12" cy="-18" r="5" fill={GOLD} className="cartoon-blink" />
          <circle cx="12" cy="-18" r="5" fill={GOLD} className="cartoon-blink" style={{ animationDelay: "0.4s" }} />
          <path d="M -9 -8 Q 0 -2 9 -8" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
          <rect x="-26" y="16" width="52" height="26" rx="7" fill={SKY} {...Sthick} />
          <circle cx="-12" cy="29" r="3" fill={MINT} />
          <circle cx="0" cy="29" r="3" fill={GOLD} />
          <circle cx="12" cy="29" r="3" fill={CORAL} />
        </g>

        <text x="20" y="228" fontSize="10" fill={INK} fontFamily="Outfit, sans-serif" fontWeight="900">INPUT</text>
        <text x="335" y="228" fontSize="10" fill={INK} fontFamily="Outfit, sans-serif" fontWeight="900">OUTPUT</text>
        <Sparkles points={[[60, 30, 0], [340, 40, 0.5], [60, 200, 1]]} />
      </svg>
    </div>
  );
}

/* ============================================================
   5. MOBILE — Phone character
   ============================================================ */
export function MobileScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-mobile">
      <svg viewBox="0 0 400 240" className="w-[95%] h-[95%]" aria-hidden>
        <Burst cx={200} cy={120} color={SKY} r={120} />
        <ellipse cx="200" cy="222" rx="120" ry="7" fill={INK} opacity="0.2" />

        <g transform="translate(160, 22)" className="cartoon-bounce" style={{ animationDuration: "2.4s" }}>
          <path d="M -4 70 Q -28 80 -28 102" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 84 70 Q 108 80 108 102" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="-28" cy="104" r="7" fill={SKIN} {...S} />
          <circle cx="108" cy="104" r="7" fill={SKIN} {...S} />

          <rect x="0" y="0" width="80" height="170" rx="16" fill={LILAC} {...Sthick} />
          <rect x="7" y="16" width="66" height="132" rx="6" fill={CREAM} {...S} />
          <rect x="32" y="7" width="16" height="4" rx="2" fill={INK} />

          <circle cx="28" cy="42" r="3.5" fill={INK} className="cartoon-blink" />
          <circle cx="52" cy="42" r="3.5" fill={INK} className="cartoon-blink" style={{ animationDelay: "0.3s" }} />
          <path d="M 26 56 Q 40 66 54 56" fill="none" {...S} />

          {[0, 1, 2].map((i) => (
            <g key={i} className="phone-card" style={{ animationDelay: `${0.5 + i * 0.4}s` }}>
              <rect x="14" y={76 + i * 20} width="52" height="16" rx="4" fill={[MINT, GOLD, CORAL][i]} {...S} />
            </g>
          ))}

          <rect x="28" y="155" width="24" height="3.5" rx="2" fill={INK} />
          <path d="M 24 170 L 24 184" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 56 170 L 56 184" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
          <ellipse cx="24" cy="186" rx="9" ry="3.5" fill={INK} />
          <ellipse cx="56" cy="186" rx="9" ry="3.5" fill={INK} />
        </g>

        <g className="ui-float" style={{ animationDelay: "0.2s" }}>
          <rect x="32" y="40" width="60" height="36" rx="9" fill={MINT} {...Sthick} />
          <circle cx="48" cy="58" r="6" fill={CREAM} {...S} />
          <rect x="58" y="52" width="28" height="4" rx="2" fill={CREAM} />
          <rect x="58" y="60" width="20" height="4" rx="2" fill={CREAM} opacity="0.7" />
        </g>
        <g className="ui-float" style={{ animationDelay: "1s" }}>
          <rect x="308" y="50" width="60" height="36" rx="9" fill={GOLD} {...Sthick} />
          <rect x="316" y="60" width="44" height="5" rx="2" fill={INK} />
          <rect x="316" y="72" width="28" height="4" rx="2" fill={INK} opacity="0.7" />
        </g>
        <g className="ui-float" style={{ animationDelay: "1.8s" }}>
          <circle cx="328" cy="170" r="18" fill={CORAL} {...Sthick} />
          <path d="M 320 170 L 326 178 L 338 162" fill="none" stroke={CREAM} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <Sparkles points={[[40, 200, 0], [360, 30, 0.5], [40, 100, 0.9]]} />
      </svg>
    </div>
  );
}

/* ============================================================
   6. WEB — Browser
   ============================================================ */
export function WebScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-web">
      <svg viewBox="0 0 400 240" className="w-[95%] h-[95%]" aria-hidden>
        <Burst cx={200} cy={120} color={MINT} r={140} />
        <ellipse cx="200" cy="222" rx="150" ry="7" fill={INK} opacity="0.2" />

        <g className="cartoon-bounce" style={{ animationDuration: "3s" }}>
          <rect x="32" y="24" width="336" height="192" rx="14" fill={CREAM} {...Sthick} />
          <rect x="32" y="24" width="336" height="32" rx="14" fill={LILAC} {...Sthick} />
          <rect x="32" y="46" width="336" height="12" fill={LILAC} />
          <circle cx="54" cy="40" r="6" fill={CORAL} {...S} />
          <circle cx="72" cy="40" r="6" fill={GOLD} {...S} />
          <circle cx="90" cy="40" r="6" fill={MINT} {...S} />
          <rect x="120" y="32" width="220" height="18" rx="9" fill={CREAM} {...S} />
          <text x="156" y="44" fontSize="9" fill={INK} fontFamily="monospace" fontWeight="800">tailoredtechsolutions.org</text>

          <g className="web-block" style={{ animationDelay: "0.2s" }}>
            <rect x="48" y="68" width="196" height="54" rx="9" fill={SKY} {...Sthick} />
            <rect x="58" y="78" width="110" height="10" rx="4" fill={CREAM} />
            <rect x="58" y="94" width="148" height="6" rx="3" fill={CREAM} opacity="0.8" />
            <rect x="58" y="106" width="66" height="12" rx="6" fill={GOLD} {...S} />
          </g>

          <g className="web-block" style={{ animationDelay: "0.5s" }}>
            <rect x="252" y="68" width="100" height="54" rx="9" fill={MINT} {...Sthick} />
            <circle cx="276" cy="92" r="13" fill={CREAM} {...S} />
            <circle cx="272" cy="90" r="2.5" fill={INK} className="cartoon-blink" />
            <circle cx="280" cy="90" r="2.5" fill={INK} className="cartoon-blink" style={{ animationDelay: "0.4s" }} />
            <path d="M 270 96 Q 276 100 282 96" fill="none" {...S} />
            <rect x="296" y="86" width="46" height="6" rx="3" fill={INK} opacity="0.7" />
            <rect x="296" y="98" width="36" height="5" rx="2" fill={INK} opacity="0.5" />
          </g>

          {[0, 1, 2].map((i) => (
            <g key={i} className="web-block" style={{ animationDelay: `${0.7 + i * 0.2}s` }}>
              <rect x={48 + i * 104} y="134" width="92" height="68" rx="9" fill={[GOLD, CORAL, LILAC][i]} {...Sthick} />
              <rect x={58 + i * 104} y="144" width="38" height="6" rx="3" fill={CREAM} />
              <rect x={58 + i * 104} y="156" width="72" height="5" rx="2" fill={CREAM} opacity="0.8" />
              <rect x={58 + i * 104} y="166" width="60" height="5" rx="2" fill={CREAM} opacity="0.8" />
              <rect x={58 + i * 104} y="178" width="48" height="5" rx="2" fill={CREAM} opacity="0.8" />
            </g>
          ))}
        </g>

        <g className="web-cursor">
          <path d="M 0 0 L 0 16 L 4.5 12.5 L 8 19 L 11 18 L 8 11.5 L 13.5 10 Z" fill={INK} stroke={CREAM} strokeWidth="1.3" strokeLinejoin="round" />
        </g>
        <Sparkles points={[[40, 20, 0], [370, 220, 0.5]]} />
      </svg>
    </div>
  );
}

/* ============================================================
   7. SOCIAL MEDIA — Phone with floating hearts, likes, +1
   ============================================================ */
export function SocialScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 400 240" className="w-[95%] h-[95%]" aria-hidden>
        <Burst cx={200} cy={130} color={PINK} r={130} />
        <ellipse cx="200" cy="222" rx="130" ry="7" fill={INK} opacity="0.2" />

        <g className="cartoon-bounce" style={{ animationDuration: "2.4s" }}>
          <rect x="155" y="30" width="90" height="180" rx="16" fill={PINK} {...Sthick} />
          <rect x="162" y="46" width="76" height="144" rx="6" fill={CREAM} {...S} />
          <rect x="186" y="36" width="18" height="4" rx="2" fill={INK} />

          {/* post header */}
          <circle cx="174" cy="60" r="6" fill={GOLD} {...S} />
          <circle cx="172" cy="58" r="1.5" fill={INK} />
          <circle cx="176" cy="58" r="1.5" fill={INK} />
          <rect x="184" y="56" width="34" height="4" rx="2" fill={INK} />
          <rect x="184" y="62" width="22" height="3" rx="1.5" fill={INK} opacity="0.6" />

          {/* post image */}
          <rect x="168" y="72" width="64" height="48" rx="5" fill={SKY} {...S} />
          <circle cx="186" cy="92" r="6" fill={GOLD} {...S} />
          <path d="M 168 116 L 184 102 L 198 112 L 212 96 L 232 116 Z" fill={MINT} {...S} />

          {/* actions */}
          <path d="M 174 134 q -4 -5 0 -8 q 4 -3 4 4 q 0 -7 4 -4 q 4 3 0 8 q -4 4 -8 0 z" fill={CORAL} {...S} />
          <circle cx="196" cy="132" r="4.5" fill="none" {...S} />
          <path d="M 192 138 L 195 135" {...S} />
          <path d="M 210 130 L 218 130 L 214 138 Z" fill={GOLD} {...S} />

          <rect x="168" y="148" width="64" height="3" rx="1.5" fill={INK} opacity="0.6" />
          <rect x="168" y="156" width="44" height="3" rx="1.5" fill={INK} opacity="0.4" />

          {/* comments */}
          <rect x="168" y="168" width="64" height="14" rx="3" fill={MINT} {...S} />
          <rect x="172" y="173" width="38" height="2.5" rx="1.5" fill={INK} opacity="0.6" />
        </g>

        {/* floating hearts */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i} className="fx-heart" style={{ animationDelay: `${i * 0.7}s` }} transform={`translate(${110 + i * 60}, 200)`}>
            <path d="M 0 -4 q -8 -10 -14 -2 q -4 8 14 18 q 18 -10 14 -18 q -6 -8 -14 2 z" fill={CORAL} {...S} />
          </g>
        ))}

        {/* +1 likes / camera / chat */}
        <g className="fx-float-up" style={{ animationDelay: "0.5s" }} transform="translate(80, 180)">
          <rect x="-18" y="-12" width="36" height="22" rx="11" fill={GOLD} {...S} />
          <text x="0" y="3" fontSize="11" fill={INK} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">+1K</text>
        </g>
        <g className="fx-float-up" style={{ animationDelay: "1.4s" }} transform="translate(320, 200)">
          <rect x="-22" y="-12" width="44" height="22" rx="11" fill={MINT} {...S} />
          <text x="0" y="3" fontSize="10" fill={INK} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">VIRAL</text>
        </g>

        {/* camera icon top-left */}
        <g transform="translate(55, 70)" className="cartoon-wiggle">
          <rect x="-18" y="-12" width="36" height="26" rx="5" fill={LILAC} {...Sthick} />
          <circle cx="0" cy="1" r="8" fill={CREAM} {...S} />
          <circle cx="0" cy="1" r="4" fill={INK} />
          <rect x="-14" y="-16" width="10" height="6" rx="2" fill={LILAC} {...S} />
        </g>

        {/* play button bottom right */}
        <g transform="translate(345, 80)" className="cartoon-bounce" style={{ animationDuration: "1.8s" }}>
          <circle cx="0" cy="0" r="20" fill={CORAL} {...Sthick} />
          <path d="M -6 -8 L 10 0 L -6 8 Z" fill={CREAM} {...S} />
        </g>
        <Sparkles points={[[60, 30, 0], [350, 40, 0.6], [50, 200, 1.2]]} color={PINK} />
      </svg>
    </div>
  );
}

/* ============================================================
   8. CONTENT CREATION — Easel + paint + camera + pencil
   ============================================================ */
export function ContentScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 400 240" className="w-[95%] h-[95%]" aria-hidden>
        <Burst cx={200} cy={120} color={GOLD} r={130} />
        <ellipse cx="200" cy="222" rx="140" ry="7" fill={INK} opacity="0.2" />

        {/* easel */}
        <g className="cartoon-bounce" style={{ animationDuration: "2.6s" }}>
          <path d="M 200 50 L 130 210" {...Sthick} stroke={GOLD_DEEP} />
          <path d="M 200 50 L 270 210" {...Sthick} stroke={GOLD_DEEP} />
          <path d="M 145 170 L 255 170" {...Sthick} stroke={GOLD_DEEP} />
          <rect x="120" y="60" width="160" height="110" rx="6" fill={CREAM} {...Sthick} />

          {/* artwork */}
          <circle cx="170" cy="100" r="18" fill={GOLD} {...S} />
          <path d="M 120 170 L 160 130 L 200 150 L 240 110 L 280 170 Z" fill={MINT} {...S} />
          <rect x="200" y="80" width="50" height="34" rx="4" fill={CORAL} {...S} />
          <circle cx="210" cy="92" r="2" fill={CREAM} />
          <circle cx="240" cy="92" r="2" fill={CREAM} />
          <path d="M 212 102 Q 225 110 238 102" fill="none" stroke={CREAM} strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* paint palette */}
        <g transform="translate(60, 165)" className="cartoon-wiggle">
          <path d="M 0 0 q 0 -28 30 -28 q 30 0 30 22 q 0 14 -14 14 q -8 0 -8 8 q 0 12 -16 12 q -22 0 -22 -28 z" fill={CREAM} {...Sthick} />
          <circle cx="14" cy="-12" r="4" fill={CORAL} {...Sthin} />
          <circle cx="28" cy="-18" r="4" fill={GOLD} {...Sthin} />
          <circle cx="42" cy="-12" r="4" fill={MINT} {...Sthin} />
          <circle cx="36" cy="2" r="4" fill={SKY} {...Sthin} />
        </g>

        {/* pencil */}
        <g transform="translate(310, 60)" className="cartoon-bounce" style={{ animationDuration: "2s" }}>
          <rect x="0" y="0" width="14" height="80" rx="2" fill={GOLD} {...S} />
          <path d="M 0 80 L 7 96 L 14 80 Z" fill={SKIN} {...S} />
          <path d="M 4 90 L 10 90" {...S} />
          <rect x="0" y="0" width="14" height="10" fill={CORAL} {...S} />
        </g>

        {/* video reel ribbon */}
        <g transform="translate(60, 60)" className="fx-spin" style={{ animationDuration: "8s" }}>
          <circle cx="0" cy="0" r="18" fill={INK} {...S} />
          <circle cx="0" cy="0" r="14" fill="none" stroke={GOLD} strokeWidth="2" />
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const x = Math.cos((a * Math.PI) / 180) * 11;
            const y = Math.sin((a * Math.PI) / 180) * 11;
            return <circle key={a} cx={x} cy={y} r="2.5" fill={GOLD} />;
          })}
        </g>

        {/* sparkle words */}
        <g className="fx-float-up" style={{ animationDelay: "0.3s" }} transform="translate(110, 50)">
          <rect x="-22" y="-10" width="44" height="20" rx="10" fill={MINT} {...S} />
          <text x="0" y="4" fontSize="9" fill={INK} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">IDEA!</text>
        </g>
        <g className="fx-float-up" style={{ animationDelay: "1.5s" }} transform="translate(330, 180)">
          <rect x="-22" y="-10" width="44" height="20" rx="10" fill={CORAL} {...S} />
          <text x="0" y="4" fontSize="9" fill={INK} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">POST!</text>
        </g>
        <Sparkles points={[[30, 30, 0], [370, 30, 0.4], [370, 210, 0.8], [30, 210, 1.2]]} />
      </svg>
    </div>
  );
}

/* ============================================================
   9. PERSONALIZED BOTS — Chat bot character with bubbles
   ============================================================ */
export function ChatBotScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 400 240" className="w-[95%] h-[95%]" aria-hidden>
        <Burst cx={130} cy={130} color={MINT} r={120} />
        <ellipse cx="200" cy="222" rx="140" ry="7" fill={INK} opacity="0.2" />

        {/* Bot character */}
        <g transform="translate(110, 90)" className="cartoon-bounce" style={{ animationDuration: "2.2s" }}>
          <line x1="0" y1="-50" x2="0" y2="-62" {...Sthick} />
          <circle cx="0" cy="-66" r="6" fill={GOLD} {...S} className="cartoon-wiggle" />
          <rect x="-44" y="-50" width="88" height="80" rx="20" fill={MINT} {...Sthick} />
          <rect x="-32" y="-36" width="64" height="44" rx="8" fill={INK} {...S} />
          <circle cx="-14" cy="-18" r="6" fill={SKY} className="cartoon-blink" />
          <circle cx="14" cy="-18" r="6" fill={SKY} className="cartoon-blink" style={{ animationDelay: "0.4s" }} />
          <circle cx="-13" cy="-17" r="2" fill={CREAM} />
          <circle cx="15" cy="-17" r="2" fill={CREAM} />
          <path d="M -10 -2 Q 0 8 10 -2" fill="none" stroke={SKY} strokeWidth="3" strokeLinecap="round" />
          {/* ears */}
          <circle cx="-44" cy="-14" r="6" fill={MINT} {...S} />
          <circle cx="44" cy="-14" r="6" fill={MINT} {...S} />

          {/* body */}
          <rect x="-32" y="32" width="64" height="44" rx="10" fill={LILAC} {...Sthick} />
          <circle cx="0" cy="54" r="6" fill={GOLD} {...S} />
          <rect x="-4" y="54" width="8" height="14" fill={INK} />
        </g>

        {/* chat bubbles flowing out */}
        <g className="fx-slide-x" style={{ animationDelay: "0.2s" }}>
          <rect x="210" y="50" width="140" height="36" rx="14" fill={CREAM} {...Sthick} />
          <path d="M 220 86 L 215 96 L 234 86 Z" fill={CREAM} {...S} />
          <circle cx="226" cy="68" r="3" fill={CORAL} className="cartoon-blink" />
          <rect x="236" y="58" width="100" height="6" rx="3" fill={INK} opacity="0.75" />
          <rect x="236" y="70" width="76" height="5" rx="2.5" fill={INK} opacity="0.5" />
        </g>

        <g className="fx-slide-x" style={{ animationDelay: "0.6s" }}>
          <rect x="230" y="100" width="130" height="32" rx="14" fill={GOLD} {...Sthick} />
          <path d="M 240 132 L 235 142 L 254 132 Z" fill={GOLD} {...S} />
          <rect x="244" y="110" width="90" height="6" rx="3" fill={INK} opacity="0.85" />
          <rect x="244" y="120" width="68" height="4" rx="2" fill={INK} opacity="0.6" />
        </g>

        <g className="fx-slide-x" style={{ animationDelay: "1s" }}>
          <rect x="220" y="148" width="118" height="32" rx="14" fill={MINT} {...Sthick} />
          <path d="M 230 180 L 225 190 L 244 180 Z" fill={MINT} {...S} />
          <rect x="234" y="158" width="80" height="6" rx="3" fill={INK} opacity="0.85" />
          <rect x="234" y="168" width="58" height="4" rx="2" fill={INK} opacity="0.6" />
        </g>

        <Sparkles points={[[60, 50, 0], [180, 200, 0.4], [370, 30, 0.8]]} color={MINT} />
      </svg>
    </div>
  );
}

/* ============================================================
   10. SUPER AGENTS / VOICE FLOW — Voice orb with waveforms
   ============================================================ */
export function VoiceAgentScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 400 240" className="w-[95%] h-[95%]" aria-hidden>
        <Burst cx={200} cy={120} color={LILAC} r={140} />
        <ellipse cx="200" cy="222" rx="130" ry="7" fill={INK} opacity="0.2" />

        {/* pulse rings */}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx="200" cy="120" r="60" fill="none" stroke={LILAC} strokeWidth="2.5" opacity="0.5"
            className="pulse-ring" style={{ animationDelay: `${i * 0.8}s` }} />
        ))}

        {/* central orb */}
        <g className="cartoon-bounce" style={{ animationDuration: "2s" }}>
          <circle cx="200" cy="120" r="50" fill={LILAC} {...Sthick} />
          <circle cx="200" cy="120" r="38" fill={INK} {...S} />
          {/* eyes */}
          <ellipse cx="186" cy="113" rx="5" ry="6" fill={SKY} className="cartoon-blink" />
          <ellipse cx="214" cy="113" rx="5" ry="6" fill={SKY} className="cartoon-blink" style={{ animationDelay: "0.3s" }} />
          <circle cx="186" cy="113" r="2" fill={CREAM} />
          <circle cx="214" cy="113" r="2" fill={CREAM} />
          {/* mic mouth */}
          <rect x="192" y="132" width="16" height="14" rx="6" fill={GOLD} {...S} />
          <line x1="200" y1="146" x2="200" y2="152" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
          <line x1="194" y1="152" x2="206" y2="152" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* voice bars left and right */}
        {[0, 1, 2, 3, 4].map((i) => {
          const h = [16, 28, 40, 28, 16][i];
          return (
            <g key={`l${i}`}>
              <rect x={30 + i * 18} y={120 - h / 2} width="10" height={h} rx="4" fill={GOLD} {...S}
                className="fx-wave" style={{ animationDelay: `${i * 0.1}s`, animationDuration: "0.9s" }} />
            </g>
          );
        })}
        {[0, 1, 2, 3, 4].map((i) => {
          const h = [16, 28, 40, 28, 16][i];
          return (
            <rect key={`r${i}`} x={280 + i * 18} y={120 - h / 2} width="10" height={h} rx="4" fill={MINT} {...S}
              className="fx-wave" style={{ animationDelay: `${0.2 + i * 0.1}s`, animationDuration: "0.9s" }} />
          );
        })}

        {/* call status pills */}
        <g className="fx-float-up" style={{ animationDelay: "0.4s" }} transform="translate(90, 200)">
          <rect x="-30" y="-12" width="60" height="22" rx="11" fill={CORAL} {...S} />
          <text x="0" y="3" fontSize="9" fill={CREAM} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">LIVE</text>
        </g>
        <g className="fx-float-up" style={{ animationDelay: "1.4s" }} transform="translate(310, 210)">
          <rect x="-34" y="-12" width="68" height="22" rx="11" fill={GOLD} {...S} />
          <text x="0" y="3" fontSize="9" fill={INK} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">FLUENT</text>
        </g>

        <Sparkles points={[[50, 40, 0], [350, 40, 0.5], [200, 30, 1], [200, 200, 1.4]]} color={LILAC} />
      </svg>
    </div>
  );
}

/* ============================================================
   11. VIRTUAL ASSISTANT — Friendly assistant juggling tasks
   ============================================================ */
export function VirtualAssistantScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 400 240" className="w-[95%] h-[95%]" aria-hidden>
        <Burst cx={200} cy={130} color={SKY} r={130} />
        <ellipse cx="200" cy="222" rx="130" ry="7" fill={INK} opacity="0.2" />

        {/* assistant body */}
        <g transform="translate(200, 70)" className="cartoon-bounce" style={{ animationDuration: "2.4s" }}>
          {/* body */}
          <path d="M -38 90 Q 0 72 38 90 L 48 150 L -48 150 Z" fill={SKY} {...Sthick} />
          <rect x="-7" y="68" width="14" height="14" rx="3" fill={SKIN} {...S} />

          {/* hair short */}
          <path d="M -28 24 Q -34 60 -30 92 L -20 88 Q -24 60 -20 38 Z" fill={INK} {...S} />
          <path d="M 28 24 Q 34 60 30 92 L 20 88 Q 24 60 20 38 Z" fill={INK} {...S} />

          {/* head */}
          <circle cx="0" cy="36" r="28" fill={SKIN} {...Sthick} />
          <path d="M -24 22 Q -22 0 0 -2 Q 22 0 24 22 Q 18 10 0 10 Q -18 10 -24 22 Z" fill={INK} {...S} />

          {/* glasses */}
          <circle cx="-10" cy="38" r="7" fill="none" {...S} />
          <circle cx="10" cy="38" r="7" fill="none" {...S} />
          <line x1="-3" y1="38" x2="3" y2="38" {...S} />
          <circle cx="-10" cy="39" r="2" fill={INK} className="cartoon-blink" />
          <circle cx="10" cy="39" r="2" fill={INK} className="cartoon-blink" style={{ animationDelay: "0.3s" }} />

          {/* smile */}
          <path d="M -7 50 Q 0 56 7 50" fill="none" {...S} />

          {/* arms raised — juggling */}
          <path d="M -38 96 Q -64 70 -56 50" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <path d="M 38 96 Q 64 70 56 50" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <circle cx="-56" cy="48" r="6" fill={SKIN} {...S} />
          <circle cx="56" cy="48" r="6" fill={SKIN} {...S} />

          {/* tablet */}
          <rect x="-22" y="100" width="44" height="32" rx="4" fill={CREAM} {...S} />
          <rect x="-18" y="106" width="36" height="20" rx="2" fill={MINT} />
        </g>

        {/* floating tasks */}
        <g className="cartoon-bounce" style={{ animationDuration: "2.6s" }} transform="translate(110, 50)">
          <rect x="-18" y="-14" width="36" height="28" rx="6" fill={GOLD} {...S} />
          <text x="0" y="4" fontSize="14" fill={INK} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">📅</text>
        </g>
        <g className="cartoon-bounce" style={{ animationDuration: "2.2s", animationDelay: "0.3s" }} transform="translate(300, 60)">
          <rect x="-18" y="-14" width="36" height="28" rx="6" fill={CORAL} {...S} />
          <text x="0" y="4" fontSize="14" fill={CREAM} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">✉</text>
        </g>
        <g className="cartoon-bounce" style={{ animationDuration: "2.8s", animationDelay: "0.6s" }} transform="translate(80, 150)">
          <rect x="-18" y="-14" width="36" height="28" rx="6" fill={MINT} {...S} />
          <text x="0" y="4" fontSize="14" fill={INK} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">☎</text>
        </g>
        <g className="cartoon-bounce" style={{ animationDuration: "2.4s", animationDelay: "0.9s" }} transform="translate(320, 160)">
          <rect x="-18" y="-14" width="36" height="28" rx="6" fill={LILAC} {...S} />
          <text x="0" y="4" fontSize="13" fill={INK} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">✓</text>
        </g>

        <Sparkles points={[[40, 30, 0], [360, 30, 0.5], [40, 200, 1], [360, 200, 1.4]]} color={SKY} />
      </svg>
    </div>
  );
}

/* ============================================================
   12. MARKETING TEAM — Cartoon team around a giant chart
   ============================================================ */
export function MarketingTeamScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 400 240" className="w-[95%] h-[95%]" aria-hidden>
        <Burst cx={200} cy={120} color={CORAL} r={140} />
        <ellipse cx="200" cy="222" rx="150" ry="7" fill={INK} opacity="0.2" />

        {/* whiteboard */}
        <rect x="100" y="38" width="200" height="120" rx="8" fill={CREAM} {...Sthick} />
        <rect x="92" y="158" width="216" height="6" rx="3" fill={INK} />

        {/* big up arrow */}
        <path d="M 130 140 L 170 100 L 200 120 L 250 70" fill="none" stroke={CORAL} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        {[130, 170, 200, 250].map((x, i) => {
          const ys = [140, 100, 120, 70];
          return <circle key={i} cx={x} cy={ys[i]} r="5" fill={CORAL} {...S} />;
        })}
        <path d="M 250 70 L 240 78 M 250 70 L 258 80" {...S} stroke={CORAL} strokeWidth="4" />

        {/* growth text */}
        <text x="270" y="58" fontSize="20" fill={MINT} fontFamily="Outfit, sans-serif" fontWeight="900">+200%</text>

        {/* Three avatars at the bottom */}
        {[
          { x: 90, color: GOLD, hair: HAIR },
          { x: 200, color: MINT, hair: INK },
          { x: 310, color: LILAC, hair: HAIR },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x}, 175)`} className="cartoon-bounce" style={{ animationDuration: "2.4s", animationDelay: `${i * 0.2}s` }}>
            <path d="M -18 30 Q 0 18 18 30 L 24 50 L -24 50 Z" fill={p.color} {...S} />
            <rect x="-4" y="14" width="8" height="8" rx="2" fill={SKIN} {...Sthin} />
            <circle cx="0" cy="0" r="14" fill={SKIN} {...S} />
            <path d="M -12 -4 Q -10 -14 0 -14 Q 10 -14 12 -4 Q 8 -10 0 -10 Q -8 -10 -12 -4 Z" fill={p.hair} {...Sthin} />
            <circle cx="-4" cy="2" r="1.5" fill={INK} className="cartoon-blink" />
            <circle cx="4" cy="2" r="1.5" fill={INK} className="cartoon-blink" style={{ animationDelay: `${i * 0.2}s` }} />
            <path d="M -3 7 Q 0 10 3 7" fill="none" {...Sthin} />
          </g>
        ))}

        {/* megaphone in corner */}
        <g transform="translate(50, 70)" className="cartoon-wiggle">
          <path d="M 0 0 L 30 -16 L 30 16 Z" fill={CORAL} {...Sthick} />
          <rect x="30" y="-8" width="14" height="16" rx="3" fill={GOLD} {...S} />
          <path d="M 48 -16 Q 56 -8 56 0 Q 56 8 48 16" fill="none" {...S} />
          <path d="M 52 -22 Q 64 -10 64 0 Q 64 10 52 22" fill="none" {...S} opacity="0.6" />
        </g>

        {/* speech burst */}
        <g className="fx-float-up" style={{ animationDelay: "0.5s" }} transform="translate(360, 130)">
          <rect x="-22" y="-12" width="44" height="22" rx="11" fill={MINT} {...S} />
          <text x="0" y="3" fontSize="9" fill={INK} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">WIN!</text>
        </g>
        <Sparkles points={[[30, 30, 0], [370, 30, 0.5], [200, 200, 1]]} color={CORAL} />
      </svg>
    </div>
  );
}

/* ============================================================
   13. CALL CENTER — Grid of agents with headsets
   ============================================================ */
export function CallCenterScene() {
  const agents = [
    { x: 90, y: 110, c: GOLD, hair: HAIR },
    { x: 200, y: 90, c: MINT, hair: INK },
    { x: 310, y: 110, c: CORAL, hair: HAIR },
    { x: 145, y: 165, c: LILAC, hair: INK },
    { x: 255, y: 165, c: SKY, hair: HAIR },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 400 240" className="w-[95%] h-[95%]" aria-hidden>
        <Burst cx={200} cy={120} color={GOLD} r={140} />
        <ellipse cx="200" cy="222" rx="160" ry="7" fill={INK} opacity="0.2" />

        {/* desk strips */}
        <rect x="40" y="135" width="320" height="10" rx="4" fill={GOLD_DEEP} {...S} />
        <rect x="40" y="195" width="320" height="10" rx="4" fill={GOLD_DEEP} {...S} />

        {agents.map((a, i) => (
          <g key={i} transform={`translate(${a.x}, ${a.y})`} className="cartoon-bounce"
            style={{ animationDuration: "2.4s", animationDelay: `${i * 0.18}s` }}>
            {/* monitor behind */}
            <rect x="-22" y="-2" width="44" height="22" rx="3" fill={CREAM} {...Sthin} opacity="0.6" />
            {/* body */}
            <path d="M -16 26 Q 0 16 16 26 L 22 42 L -22 42 Z" fill={a.c} {...S} />
            {/* neck */}
            <rect x="-3" y="10" width="6" height="8" fill={SKIN} {...Sthin} />
            {/* head */}
            <circle cx="0" cy="0" r="13" fill={SKIN} {...S} />
            {/* hair */}
            <path d="M -11 -4 Q -9 -13 0 -14 Q 9 -13 11 -4 Q 7 -10 0 -10 Q -7 -10 -11 -4 Z" fill={a.hair} {...Sthin} />
            {/* eyes */}
            <circle cx="-4" cy="1" r="1.6" fill={INK} className="cartoon-blink" style={{ animationDelay: `${i * 0.15}s` }} />
            <circle cx="4" cy="1" r="1.6" fill={INK} className="cartoon-blink" style={{ animationDelay: `${i * 0.15 + 0.1}s` }} />
            <path d="M -3 6 Q 0 8 3 6" fill="none" {...Sthin} />
            {/* headset band */}
            <path d="M -13 -6 Q 0 -18 13 -6" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="-13" cy="-2" r="3" fill={INK} />
            <circle cx="13" cy="-2" r="3" fill={INK} />
            {/* mic */}
            <path d="M -13 1 Q -10 8 -2 9" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="-2" cy="9" r="1.8" fill={GOLD} />
            {/* call waves */}
            {[0, 1].map((w) => (
              <path key={w} d={`M 16 -2 q ${4 + w * 3} -${2 + w * 2} 0 -${6 + w * 3}`} fill="none"
                stroke={a.c} strokeWidth="1.5" strokeLinecap="round" opacity="0" className="call-wave"
                style={{ animationDelay: `${i * 0.2 + w * 0.3}s` }} />
            ))}
          </g>
        ))}

        {/* Floating call bubbles */}
        <g className="fx-float-up" style={{ animationDelay: "0.3s" }} transform="translate(60, 220)">
          <rect x="-20" y="-10" width="40" height="20" rx="10" fill={MINT} {...S} />
          <text x="0" y="3" fontSize="8" fill={INK} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">+12</text>
        </g>
        <g className="fx-float-up" style={{ animationDelay: "1.2s" }} transform="translate(340, 220)">
          <rect x="-26" y="-10" width="52" height="20" rx="10" fill={CORAL} {...S} />
          <text x="0" y="3" fontSize="8" fill={CREAM} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">24/7</text>
        </g>
        <Sparkles points={[[40, 30, 0], [360, 30, 0.5], [200, 30, 1]]} color={GOLD} />
      </svg>
    </div>
  );
}
