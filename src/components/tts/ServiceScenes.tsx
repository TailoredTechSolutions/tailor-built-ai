import type { CSSProperties } from "react";

/**
 * Cartoonish animated scene components for the Services section.
 * Chunky rounded strokes, candy palette, character faces, bouncy motion.
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

const strokeProps = {
  stroke: INK,
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ============================================================
   1. ANALYTICS — Cartoon laptop CRM with smiley, bars & coins
   ============================================================ */
export function AnalyticsScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-analytics">
      <svg viewBox="0 0 400 240" className="w-[90%] h-[90%]" aria-hidden>
        {/* laptop base shadow */}
        <ellipse cx="200" cy="220" rx="140" ry="6" fill={INK} opacity="0.25" />

        {/* laptop body */}
        <g className="cartoon-bounce" style={{ animationDuration: "3.2s" }}>
          {/* base */}
          <path d="M 60 200 L 340 200 L 360 215 L 40 215 Z" fill={CREAM} {...strokeProps} />
          <rect x="180" y="200" width="40" height="5" rx="2" fill={INK} />
          {/* screen */}
          <rect x="70" y="40" width="260" height="165" rx="10" fill={CREAM} {...strokeProps} />
          <rect x="80" y="50" width="240" height="145" rx="6" fill={SKY} />

          {/* CRM dashboard header smile */}
          <rect x="88" y="58" width="224" height="22" rx="5" fill={CREAM} />
          <text x="98" y="73" fontSize="11" fill={INK} fontFamily="Outfit, sans-serif" fontWeight="700">CRM</text>
          {/* tiny eyes */}
          <circle cx="290" cy="69" r="2.5" fill={INK} className="cartoon-blink" />
          <circle cx="300" cy="69" r="2.5" fill={INK} className="cartoon-blink" style={{ animationDelay: "0.2s" }} />

          {/* KPI tiles */}
          <g className="kpi-tile" style={{ animationDelay: "0.2s" }}>
            <rect x="88" y="88" width="64" height="30" rx="6" fill={MINT} {...strokeProps} />
            <text x="96" y="100" fontSize="6" fill={INK} fontFamily="monospace" fontWeight="700">REVENUE</text>
            <text x="96" y="113" fontSize="11" fill={INK} fontFamily="monospace" fontWeight="800">$42K</text>
          </g>
          <g className="kpi-tile" style={{ animationDelay: "0.4s" }}>
            <rect x="160" y="88" width="64" height="30" rx="6" fill={GOLD} {...strokeProps} />
            <text x="168" y="100" fontSize="6" fill={INK} fontFamily="monospace" fontWeight="700">DEALS</text>
            <text x="168" y="113" fontSize="11" fill={INK} fontFamily="monospace" fontWeight="800">128</text>
          </g>
          <g className="kpi-tile" style={{ animationDelay: "0.6s" }}>
            <rect x="232" y="88" width="80" height="30" rx="6" fill={CORAL} {...strokeProps} />
            <text x="240" y="100" fontSize="6" fill={INK} fontFamily="monospace" fontWeight="700">CONVERT</text>
            <text x="240" y="113" fontSize="11" fill={INK} fontFamily="monospace" fontWeight="800">+34%</text>
          </g>

          {/* Bouncy bar chart */}
          <g className="chart-bars">
            {[24, 38, 30, 50, 42, 62, 56].map((h, i) => (
              <rect
                key={i}
                x={92 + i * 18}
                y={188 - h}
                width="12"
                height={h}
                rx="3"
                fill={i % 2 ? LILAC : GOLD}
                {...strokeProps}
                className="bar"
                style={{ animationDelay: `${0.7 + i * 0.08}s`, transformOrigin: `center 188px` }}
              />
            ))}
          </g>

          {/* baseline */}
          <line x1="86" y1="188" x2="316" y2="188" {...strokeProps} />
        </g>

        {/* falling coins */}
        {[0, 1, 2].map((i) => (
          <g key={i} className="coin-fall" style={{ animationDelay: `${i * 0.7}s` }} transform={`translate(${60 + i * 130}, 30)`}>
            <circle cx="0" cy="0" r="9" fill={GOLD} {...strokeProps} />
            <text x="0" y="3" fontSize="10" fill={INK} fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">$</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ============================================================
   2. CYBERSECURITY — Cartoon shield character vs bug monsters
   ============================================================ */
export function CyberScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-cyber">
      <svg viewBox="0 0 400 240" className="w-[90%] h-[90%]" aria-hidden>
        <ellipse cx="200" cy="220" rx="120" ry="6" fill={INK} opacity="0.2" />

        {/* incoming bug monsters from the left */}
        {[0, 1, 2].map((i) => (
          <g key={i} className="bug-march" style={{ animationDelay: `${i * 1.1}s` }} transform={`translate(20, ${70 + i * 50})`}>
            <ellipse cx="0" cy="0" rx="14" ry="11" fill={CORAL} {...strokeProps} />
            {/* eyes */}
            <circle cx="-5" cy="-2" r="3" fill={CREAM} />
            <circle cx="4" cy="-2" r="3" fill={CREAM} />
            <circle cx="-5" cy="-2" r="1.5" fill={INK} />
            <circle cx="4" cy="-2" r="1.5" fill={INK} />
            {/* antennae */}
            <path d="M -6 -10 L -9 -16" {...strokeProps} />
            <path d="M 6 -10 L 9 -16" {...strokeProps} />
            <circle cx="-9" cy="-17" r="1.8" fill={INK} />
            <circle cx="9" cy="-17" r="1.8" fill={INK} />
            {/* legs */}
            <path d="M -10 6 L -14 12 M 0 8 L 0 14 M 10 6 L 14 12" {...strokeProps} />
            {/* frown */}
            <path d="M -3 5 Q 0 3 3 5" {...strokeProps} fill="none" />
          </g>
        ))}

        {/* Shield character (centered-right) */}
        <g className="cartoon-bounce" style={{ animationDuration: "2.4s" }} transform="translate(240, 120)">
          {/* glow rings */}
          <circle cx="0" cy="0" r="70" fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.4" className="pulse-ring" />
          <circle cx="0" cy="0" r="70" fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.4" className="pulse-ring" style={{ animationDelay: "1.4s" }} />

          {/* shield body */}
          <path
            d="M 0 -55 L 48 -38 L 48 18 Q 48 50 0 70 Q -48 50 -48 18 L -48 -38 Z"
            fill={GOLD}
            {...strokeProps}
          />
          {/* inner panel */}
          <path
            d="M 0 -45 L 38 -32 L 38 14 Q 38 40 0 56 Q -38 40 -38 14 L -38 -32 Z"
            fill={CREAM}
            {...strokeProps}
          />
          {/* eyes */}
          <g>
            <circle cx="-13" cy="-8" r="6" fill={CREAM} {...strokeProps} />
            <circle cx="13" cy="-8" r="6" fill={CREAM} {...strokeProps} />
            <circle cx="-12" cy="-7" r="2.5" fill={INK} className="cartoon-blink" />
            <circle cx="14" cy="-7" r="2.5" fill={INK} className="cartoon-blink" style={{ animationDelay: "0.3s" }} />
          </g>
          {/* confident smile */}
          <path d="M -10 12 Q 0 22 10 12" fill="none" {...strokeProps} />
          {/* cheek blush */}
          <circle cx="-22" cy="10" r="3.5" fill={CORAL} opacity="0.55" />
          <circle cx="22" cy="10" r="3.5" fill={CORAL} opacity="0.55" />
          {/* tiny padlock badge */}
          <g transform="translate(0, 35)">
            <rect x="-8" y="-4" width="16" height="14" rx="2.5" fill={INK} {...strokeProps} />
            <path d="M -5 -4 L -5 -9 Q -5 -14 0 -14 Q 5 -14 5 -9 L 5 -4" fill="none" {...strokeProps} />
          </g>
        </g>

        {/* deflected sparks */}
        {[0, 1, 2].map((i) => (
          <g key={`s${i}`} className="cartoon-wiggle" style={{ animationDelay: `${i * 0.5}s` }} transform={`translate(${180}, ${60 + i * 45})`}>
            <path d="M 0 -6 L 2 -2 L 6 0 L 2 2 L 0 6 L -2 2 L -6 0 L -2 -2 Z" fill={GOLD} {...strokeProps} />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ============================================================
   3. SALES AGENT — Cartoon lady with headset, lead/booked bubbles
   ============================================================ */
export function SalesAgentScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-sales">
      <svg viewBox="0 0 400 240" className="w-[90%] h-[90%]" aria-hidden>
        <ellipse cx="200" cy="220" rx="150" ry="6" fill={INK} opacity="0.2" />

        {/* desk */}
        <rect x="20" y="190" width="360" height="20" rx="4" fill={GOLD_DEEP} {...strokeProps} />
        <rect x="20" y="190" width="360" height="6" rx="3" fill={GOLD} />

        {/* monitor */}
        <g transform="translate(60, 105)">
          <rect x="0" y="0" width="80" height="60" rx="6" fill={CREAM} {...strokeProps} />
          <rect x="6" y="6" width="68" height="48" rx="3" fill={SKY} />
          {/* call list */}
          <rect x="10" y="12" width="60" height="8" rx="2" fill={CREAM} />
          <rect x="10" y="24" width="42" height="6" rx="2" fill={MINT} />
          <rect x="10" y="34" width="50" height="6" rx="2" fill={GOLD} />
          <rect x="10" y="44" width="36" height="6" rx="2" fill={CORAL} />
          {/* stand */}
          <rect x="34" y="60" width="12" height="8" fill={CREAM} {...strokeProps} />
          <rect x="24" y="68" width="32" height="4" rx="2" fill={CREAM} {...strokeProps} />
        </g>

        {/* coffee */}
        <g transform="translate(160, 165)">
          <rect x="0" y="0" width="18" height="22" rx="2" fill={CORAL} {...strokeProps} />
          <path d="M 18 5 Q 26 5 26 12 Q 26 18 18 18" fill="none" {...strokeProps} />
          <path d="M 6 -5 Q 6 -10 9 -10 M 12 -5 Q 12 -10 15 -10" fill="none" {...strokeProps} opacity="0.6" />
        </g>

        {/* Lady — cartoon style */}
        <g transform="translate(245, 50)" className="cartoon-bounce" style={{ animationDuration: "2.8s" }}>
          {/* body / blazer */}
          <path d="M -28 90 Q 0 75 28 90 L 38 145 L -38 145 Z" fill={LILAC} {...strokeProps} />
          {/* lapel V */}
          <path d="M 0 88 L -8 110 L 0 116 L 8 110 Z" fill={CREAM} {...strokeProps} />
          <circle cx="0" cy="120" r="2" fill={GOLD} {...strokeProps} />

          {/* neck */}
          <rect x="-6" y="70" width="12" height="14" rx="3" fill={SKIN} {...strokeProps} />

          {/* hair back */}
          <path d="M -28 30 Q -38 60 -34 95 L -22 90 Q -28 65 -22 40 Z" fill={HAIR} {...strokeProps} />
          <path d="M 28 30 Q 38 60 34 95 L 22 90 Q 28 65 22 40 Z" fill={HAIR} {...strokeProps} />

          {/* head */}
          <circle cx="0" cy="35" r="26" fill={SKIN} {...strokeProps} />

          {/* hair top */}
          <path d="M -24 22 Q -22 4 0 2 Q 22 4 24 22 Q 18 14 0 14 Q -18 14 -24 22 Z" fill={HAIR} {...strokeProps} />

          {/* eyes */}
          <ellipse cx="-9" cy="35" rx="3.5" ry="4.5" fill={CREAM} {...strokeProps} />
          <ellipse cx="9" cy="35" rx="3.5" ry="4.5" fill={CREAM} {...strokeProps} />
          <circle cx="-9" cy="36" r="2" fill={INK} className="cartoon-blink" />
          <circle cx="9" cy="36" r="2" fill={INK} className="cartoon-blink" style={{ animationDelay: "0.25s" }} />

          {/* blush */}
          <circle cx="-15" cy="44" r="3" fill={CORAL} opacity="0.55" />
          <circle cx="15" cy="44" r="3" fill={CORAL} opacity="0.55" />

          {/* smile */}
          <path d="M -6 46 Q 0 52 6 46" fill="none" {...strokeProps} />

          {/* headset band */}
          <path d="M -28 22 Q 0 -6 28 22" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          {/* ear cup */}
          <circle cx="-28" cy="30" r="6" fill={INK} {...strokeProps} />
          <circle cx="-28" cy="30" r="2.5" fill={GOLD} />
          {/* mic arm */}
          <path d="M -28 36 Q -22 50 -8 54" fill="none" {...strokeProps} />
          <circle cx="-8" cy="55" r="3" fill={GOLD} {...strokeProps} />
        </g>

        {/* call waves */}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M 245 105 q -${10 + i * 7} -${4 + i * 3} 0 -${10 + i * 6}`}
            fill="none"
            stroke={GOLD}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0"
            className="call-wave"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}

        {/* speech bubbles */}
        <g className="call-bubble" style={{ animationDelay: "0.3s" }}>
          <rect x="20" y="30" width="80" height="26" rx="13" fill={MINT} {...strokeProps} />
          <path d="M 40 56 L 36 64 L 50 56 Z" fill={MINT} {...strokeProps} />
          <circle cx="34" cy="43" r="4" fill={CREAM} {...strokeProps} />
          <text x="44" y="47" fontSize="9" fill={INK} fontFamily="Outfit, sans-serif" fontWeight="800">BOOKED!</text>
        </g>
        <g className="call-bubble" style={{ animationDelay: "1.5s" }}>
          <rect x="130" y="40" width="70" height="26" rx="13" fill={GOLD} {...strokeProps} />
          <path d="M 150 66 L 146 74 L 160 66 Z" fill={GOLD} {...strokeProps} />
          <circle cx="144" cy="53" r="4" fill={CREAM} {...strokeProps} />
          <text x="154" y="57" fontSize="9" fill={INK} fontFamily="Outfit, sans-serif" fontWeight="800">LEAD!</text>
        </g>
        <g className="call-bubble" style={{ animationDelay: "2.6s" }}>
          <rect x="60" y="76" width="90" height="26" rx="13" fill={CORAL} {...strokeProps} />
          <path d="M 80 102 L 76 110 L 90 102 Z" fill={CORAL} {...strokeProps} />
          <circle cx="74" cy="89" r="4" fill={CREAM} {...strokeProps} />
          <text x="84" y="93" fontSize="9" fill={CREAM} fontFamily="Outfit, sans-serif" fontWeight="800">APPT SET</text>
        </g>
      </svg>
    </div>
  );
}

/* ============================================================
   4. AUTOMATION — Friendly robot routing colored balls via pipes
   ============================================================ */
export function AutomationScene() {
  const pipes = [
    { d: "M 30 80 Q 120 60 200 120 T 370 120", fill: GOLD },
    { d: "M 30 130 Q 120 130 200 120 T 370 80", fill: MINT },
    { d: "M 30 180 Q 120 200 200 120 T 370 160", fill: CORAL },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-automation">
      <svg viewBox="0 0 400 240" className="w-[90%] h-[90%]" aria-hidden>
        <ellipse cx="200" cy="220" rx="130" ry="6" fill={INK} opacity="0.2" />

        {/* pipes */}
        {pipes.map((p, i) => (
          <path key={i} d={p.d} fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        ))}
        {pipes.map((p, i) => (
          <path key={`l${i}`} d={p.d} fill="none" stroke={CREAM} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 6" opacity="0.7" />
        ))}

        {/* balls traveling along pipes */}
        {pipes.map((p, i) => (
          <circle
            key={`b${i}`}
            r="6"
            fill={p.fill}
            stroke={INK}
            strokeWidth="2"
            className="pipe-ball"
            style={{ offsetPath: `path('${p.d}')`, animationDelay: `${i * 0.6}s` } as CSSProperties}
          />
        ))}

        {/* Robot center */}
        <g transform="translate(200, 120)" className="cartoon-bounce" style={{ animationDuration: "2.4s" }}>
          {/* antenna */}
          <line x1="0" y1="-38" x2="0" y2="-48" {...strokeProps} />
          <circle cx="0" cy="-52" r="4" fill={CORAL} {...strokeProps} className="cartoon-wiggle" />
          {/* head */}
          <rect x="-32" y="-38" width="64" height="50" rx="12" fill={LILAC} {...strokeProps} />
          {/* face screen */}
          <rect x="-22" y="-28" width="44" height="26" rx="6" fill={INK} {...strokeProps} />
          {/* eyes */}
          <circle cx="-10" cy="-16" r="4" fill={GOLD} className="cartoon-blink" />
          <circle cx="10" cy="-16" r="4" fill={GOLD} className="cartoon-blink" style={{ animationDelay: "0.4s" }} />
          {/* smile */}
          <path d="M -8 -8 Q 0 -4 8 -8" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
          {/* body */}
          <rect x="-22" y="14" width="44" height="22" rx="6" fill={SKY} {...strokeProps} />
          {/* body lights */}
          <circle cx="-10" cy="25" r="2.5" fill={MINT} />
          <circle cx="0" cy="25" r="2.5" fill={GOLD} />
          <circle cx="10" cy="25" r="2.5" fill={CORAL} />
        </g>

        {/* IN / OUT labels */}
        <text x="20" y="225" fontSize="9" fill={INK} fontFamily="Outfit, sans-serif" fontWeight="800">INPUT</text>
        <text x="340" y="225" fontSize="9" fill={INK} fontFamily="Outfit, sans-serif" fontWeight="800">OUTPUT</text>
      </svg>
    </div>
  );
}

/* ============================================================
   5. MOBILE — Chunky phone character with floating cards
   ============================================================ */
export function MobileScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-mobile">
      <svg viewBox="0 0 400 240" className="w-[90%] h-[90%]" aria-hidden>
        <ellipse cx="200" cy="220" rx="120" ry="6" fill={INK} opacity="0.2" />

        {/* Phone character */}
        <g transform="translate(165, 30)" className="cartoon-bounce" style={{ animationDuration: "2.6s" }}>
          {/* arms */}
          <path d="M -6 70 Q -28 80 -26 100" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <path d="M 76 70 Q 98 80 96 100" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <circle cx="-26" cy="102" r="6" fill={SKIN} {...strokeProps} />
          <circle cx="96" cy="102" r="6" fill={SKIN} {...strokeProps} />

          {/* body */}
          <rect x="0" y="0" width="70" height="155" rx="14" fill={LILAC} {...strokeProps} />
          <rect x="6" y="14" width="58" height="120" rx="6" fill={CREAM} {...strokeProps} />
          {/* notch */}
          <rect x="28" y="6" width="14" height="3" rx="1.5" fill={INK} />

          {/* face on screen */}
          <circle cx="24" cy="38" r="3" fill={INK} className="cartoon-blink" />
          <circle cx="46" cy="38" r="3" fill={INK} className="cartoon-blink" style={{ animationDelay: "0.3s" }} />
          <path d="M 22 50 Q 35 60 48 50" fill="none" {...strokeProps} />

          {/* cards inside */}
          {[0, 1, 2].map((i) => (
            <g key={i} className="phone-card" style={{ animationDelay: `${0.4 + i * 0.4}s` }}>
              <rect x="12" y={70 + i * 18} width="46" height="14" rx="4" fill={[MINT, GOLD, CORAL][i]} {...strokeProps} />
            </g>
          ))}

          {/* home pill */}
          <rect x="25" y="142" width="20" height="3" rx="1.5" fill={INK} />
          {/* legs */}
          <path d="M 22 155 L 22 168" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <path d="M 48 155 L 48 168" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="22" cy="170" rx="8" ry="3" fill={INK} />
          <ellipse cx="48" cy="170" rx="8" ry="3" fill={INK} />
        </g>

        {/* floating UI bits */}
        <g className="ui-float" style={{ animationDelay: "0.2s" }}>
          <rect x="40" y="50" width="54" height="32" rx="8" fill={MINT} {...strokeProps} />
          <circle cx="54" cy="66" r="5" fill={CREAM} {...strokeProps} />
          <rect x="62" y="60" width="26" height="3" rx="1.5" fill={CREAM} />
          <rect x="62" y="68" width="18" height="3" rx="1.5" fill={CREAM} opacity="0.7" />
        </g>
        <g className="ui-float" style={{ animationDelay: "1s" }}>
          <rect x="310" y="60" width="56" height="32" rx="8" fill={GOLD} {...strokeProps} />
          <rect x="316" y="68" width="44" height="4" rx="2" fill={INK} />
          <rect x="316" y="78" width="28" height="3" rx="1.5" fill={INK} opacity="0.7" />
        </g>
        <g className="ui-float" style={{ animationDelay: "1.8s" }}>
          <circle cx="330" cy="170" r="16" fill={CORAL} {...strokeProps} />
          <path d="M 322 170 L 328 176 L 338 164" fill="none" stroke={CREAM} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

/* ============================================================
   6. WEB — Browser character with assembling blocks
   ============================================================ */
export function WebScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-web">
      <svg viewBox="0 0 400 240" className="w-[90%] h-[90%]" aria-hidden>
        <ellipse cx="200" cy="220" rx="140" ry="6" fill={INK} opacity="0.2" />

        <g className="cartoon-bounce" style={{ animationDuration: "3s" }}>
          {/* browser */}
          <rect x="40" y="30" width="320" height="180" rx="12" fill={CREAM} {...strokeProps} />
          {/* title bar */}
          <rect x="40" y="30" width="320" height="28" rx="12" fill={LILAC} {...strokeProps} />
          <rect x="40" y="48" width="320" height="10" fill={LILAC} />
          <circle cx="58" cy="44" r="5" fill={CORAL} {...strokeProps} />
          <circle cx="74" cy="44" r="5" fill={GOLD} {...strokeProps} />
          <circle cx="90" cy="44" r="5" fill={MINT} {...strokeProps} />
          <rect x="120" y="36" width="200" height="16" rx="8" fill={CREAM} {...strokeProps} />
          <text x="160" y="47" fontSize="8" fill={INK} fontFamily="monospace" fontWeight="700">tailoredtechsolutions.org</text>

          {/* hero block */}
          <g className="web-block" style={{ animationDelay: "0.2s" }}>
            <rect x="56" y="72" width="180" height="48" rx="8" fill={SKY} {...strokeProps} />
            <rect x="66" y="82" width="100" height="8" rx="4" fill={CREAM} />
            <rect x="66" y="96" width="140" height="5" rx="2.5" fill={CREAM} opacity="0.8" />
            <rect x="66" y="106" width="60" height="10" rx="5" fill={GOLD} {...strokeProps} />
          </g>

          {/* side card */}
          <g className="web-block" style={{ animationDelay: "0.5s" }}>
            <rect x="248" y="72" width="96" height="48" rx="8" fill={MINT} {...strokeProps} />
            <circle cx="272" cy="96" r="11" fill={CREAM} {...strokeProps} />
            <circle cx="269" cy="94" r="2" fill={INK} className="cartoon-blink" />
            <circle cx="275" cy="94" r="2" fill={INK} className="cartoon-blink" style={{ animationDelay: "0.4s" }} />
            <path d="M 268 99 Q 272 102 276 99" fill="none" {...strokeProps} />
            <rect x="290" y="88" width="46" height="5" rx="2.5" fill={INK} opacity="0.7" />
            <rect x="290" y="98" width="36" height="4" rx="2" fill={INK} opacity="0.5" />
          </g>

          {/* feature grid */}
          {[0, 1, 2].map((i) => (
            <g key={i} className="web-block" style={{ animationDelay: `${0.7 + i * 0.2}s` }}>
              <rect x={56 + i * 100} y="132" width="88" height="60" rx="8" fill={[GOLD, CORAL, LILAC][i]} {...strokeProps} />
              <rect x={66 + i * 100} y="142" width="36" height="6" rx="3" fill={CREAM} />
              <rect x={66 + i * 100} y="154" width="68" height="4" rx="2" fill={CREAM} opacity="0.8" />
              <rect x={66 + i * 100} y="162" width="56" height="4" rx="2" fill={CREAM} opacity="0.8" />
              <rect x={66 + i * 100} y="170" width="48" height="4" rx="2" fill={CREAM} opacity="0.8" />
            </g>
          ))}
        </g>

        {/* roaming cursor */}
        <g className="web-cursor">
          <path d="M 0 0 L 0 14 L 4 11 L 7 17 L 10 16 L 7 10 L 12 9 Z" fill={INK} stroke={CREAM} strokeWidth="1.2" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
