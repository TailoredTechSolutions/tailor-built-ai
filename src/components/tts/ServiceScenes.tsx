/**
 * Animated scene components for the Services section.
 * Pure SVG + CSS keyframes — no extra runtime deps.
 * Scenes loop subtly; intensified on group-hover.
 */

const GOLD = "#d4a843";
const GOLD_DIM = "#7a5e1a";
const CHROME = "#e8e8f0";

/* ============================================================
   1. ANALYTICS — Custom CRM & dashboards
   Laptop screen with bars, line chart, and KPI tiles assembling.
   ============================================================ */
export function AnalyticsScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-analytics">
      <svg viewBox="0 0 400 240" className="w-[88%] h-[88%]" aria-hidden>
        {/* laptop frame */}
        <rect x="50" y="30" width="300" height="180" rx="8" fill="#0a0a1e" stroke={GOLD_DIM} strokeWidth="1" />
        <rect x="58" y="38" width="284" height="164" rx="4" fill="#06060f" />
        {/* laptop base */}
        <path d="M 30 210 L 370 210 L 380 222 L 20 222 Z" fill="#1a1a2e" stroke={GOLD_DIM} strokeWidth="1" />
        <rect x="180" y="210" width="40" height="4" fill="#0a0a1e" />

        {/* screen content */}
        {/* KPI tiles */}
        <g className="kpi-tile" style={{ animationDelay: "0.1s" }}>
          <rect x="68" y="48" width="80" height="32" rx="3" fill="rgba(212,168,67,0.08)" stroke={GOLD_DIM} strokeWidth="0.5" />
          <text x="74" y="60" fontSize="6" fill={CHROME} fontFamily="monospace">REVENUE</text>
          <text x="74" y="74" fontSize="10" fill={GOLD} fontFamily="monospace" fontWeight="600">$42.8K</text>
        </g>
        <g className="kpi-tile" style={{ animationDelay: "0.3s" }}>
          <rect x="156" y="48" width="80" height="32" rx="3" fill="rgba(212,168,67,0.08)" stroke={GOLD_DIM} strokeWidth="0.5" />
          <text x="162" y="60" fontSize="6" fill={CHROME} fontFamily="monospace">DEALS</text>
          <text x="162" y="74" fontSize="10" fill={GOLD} fontFamily="monospace" fontWeight="600">128</text>
        </g>
        <g className="kpi-tile" style={{ animationDelay: "0.5s" }}>
          <rect x="244" y="48" width="88" height="32" rx="3" fill="rgba(212,168,67,0.08)" stroke={GOLD_DIM} strokeWidth="0.5" />
          <text x="250" y="60" fontSize="6" fill={CHROME} fontFamily="monospace">CONVERSION</text>
          <text x="250" y="74" fontSize="10" fill={GOLD} fontFamily="monospace" fontWeight="600">+34%</text>
        </g>

        {/* Bar chart */}
        <g className="chart-bars">
          {[28, 44, 36, 58, 48, 70, 62].map((h, i) => (
            <rect
              key={i}
              x={70 + i * 18}
              y={190 - h}
              width="10"
              height={h}
              fill={GOLD}
              opacity={0.85}
              className="bar"
              style={{ animationDelay: `${0.6 + i * 0.08}s`, transformOrigin: `center ${190}px` }}
            />
          ))}
        </g>

        {/* Line chart on right */}
        <g transform="translate(210, 90)">
          <polyline
            className="line-chart"
            points="0,80 18,60 36,68 54,40 72,50 90,28 108,32 120,12"
            fill="none"
            stroke={GOLD}
            strokeWidth="1.5"
          />
          {/* dots */}
          {[[0,80],[18,60],[36,68],[54,40],[72,50],[90,28],[108,32],[120,12]].map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r="2" fill={GOLD} className="line-dot" style={{ animationDelay: `${1 + i * 0.1}s` }} />
          ))}
        </g>

        {/* scan line */}
        <rect x="58" y="38" width="284" height="2" fill={GOLD} opacity="0.4" className="scan-bar" />
      </svg>
    </div>
  );
}

/* ============================================================
   2. CYBERSECURITY — shield, locks, packet stream, scan beam
   ============================================================ */
export function CyberScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-cyber">
      {/* hex grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      <svg viewBox="0 0 400 240" className="w-[88%] h-[88%]" aria-hidden>
        {/* outer pulse rings */}
        <circle cx="200" cy="120" r="70" fill="none" stroke={GOLD} strokeWidth="0.5" className="pulse-ring" />
        <circle cx="200" cy="120" r="70" fill="none" stroke={GOLD} strokeWidth="0.5" className="pulse-ring" style={{ animationDelay: "1s" }} />
        <circle cx="200" cy="120" r="70" fill="none" stroke={GOLD} strokeWidth="0.5" className="pulse-ring" style={{ animationDelay: "2s" }} />

        {/* shield */}
        <g className="shield-group">
          <path
            d="M 200 60 L 245 78 L 245 130 Q 245 165 200 185 Q 155 165 155 130 L 155 78 Z"
            fill="rgba(212,168,67,0.06)"
            stroke={GOLD}
            strokeWidth="1.5"
          />
          {/* padlock inside */}
          <rect x="188" y="118" width="24" height="22" rx="2" fill="#0a0a1e" stroke={GOLD} strokeWidth="1" />
          <path d="M 192 118 L 192 110 Q 192 102 200 102 Q 208 102 208 110 L 208 118" fill="none" stroke={GOLD} strokeWidth="1.5" />
          <circle cx="200" cy="128" r="2" fill={GOLD} />
          <line x1="200" y1="128" x2="200" y2="134" stroke={GOLD} strokeWidth="1.5" />
        </g>

        {/* incoming threat packets (red) that get blocked */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i} className="packet" style={{ animationDelay: `${i * 0.8}s` }}>
            <rect x="20" y={40 + i * 45} width="8" height="4" fill="#ff5544" rx="1" />
          </g>
        ))}
        {/* outgoing safe packets (gold) */}
        {[0, 1, 2].map((i) => (
          <g key={i} className="packet-safe" style={{ animationDelay: `${i * 0.9 + 0.4}s` }}>
            <rect x="372" y={60 + i * 50} width="8" height="4" fill={GOLD} rx="1" />
          </g>
        ))}

        {/* scan beam */}
        <line x1="155" y1="60" x2="245" y2="60" stroke={GOLD} strokeWidth="1" opacity="0.6" className="scan-beam" />

        {/* corner brackets */}
        <g stroke={GOLD_DIM} strokeWidth="1" fill="none">
          <path d="M 20 20 L 20 35 M 20 20 L 35 20" />
          <path d="M 380 20 L 380 35 M 380 20 L 365 20" />
          <path d="M 20 220 L 20 205 M 20 220 L 35 220" />
          <path d="M 380 220 L 380 205 M 380 220 L 365 220" />
        </g>
      </svg>
    </div>
  );
}

/* ============================================================
   3. SALES AGENT — woman silhouette with headset + call waves
   ============================================================ */
export function SalesAgentScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-sales">
      <svg viewBox="0 0 400 240" className="w-[88%] h-[88%]" aria-hidden>
        {/* desk surface */}
        <rect x="0" y="180" width="400" height="60" fill="#0a0a1e" />
        <line x1="0" y1="180" x2="400" y2="180" stroke={GOLD_DIM} strokeWidth="0.5" />

        {/* monitor on desk */}
        <rect x="50" y="120" width="80" height="55" rx="2" fill="#06060f" stroke={GOLD_DIM} strokeWidth="0.8" />
        <rect x="55" y="125" width="70" height="45" fill="#0d0d24" />
        {/* monitor content - tiny waveform */}
        <polyline points="58,148 65,142 72,150 79,140 86,152 93,144 100,148 107,140 114,150 121,146" fill="none" stroke={GOLD} strokeWidth="0.8" className="mini-wave" />
        <rect x="55" y="160" width="40" height="2" fill={GOLD} opacity="0.6" />
        <rect x="55" y="164" width="28" height="2" fill={GOLD_DIM} />
        {/* monitor stand */}
        <rect x="85" y="175" width="10" height="5" fill="#1a1a2e" />

        {/* coffee cup */}
        <rect x="150" y="160" width="14" height="18" rx="1" fill="#1a1a2e" stroke={GOLD_DIM} strokeWidth="0.5" />
        <path d="M 164 165 Q 170 165 170 170 Q 170 175 164 175" fill="none" stroke={GOLD_DIM} strokeWidth="0.5" />

        {/* woman silhouette (centered/right) */}
        <g transform="translate(220, 0)">
          {/* hair back */}
          <path d="M 35 55 Q 20 60 22 95 L 28 110 Q 25 90 30 70 Z" fill={GOLD_DIM} opacity="0.7" />
          {/* head */}
          <circle cx="50" cy="70" r="22" fill="#2a2230" />
          {/* hair top */}
          <path d="M 30 65 Q 32 48 50 46 Q 70 48 72 68 Q 65 56 50 56 Q 38 58 30 65 Z" fill={GOLD_DIM} opacity="0.85" />
          {/* hair side cascade */}
          <path d="M 70 70 Q 76 90 72 110 L 66 108 Q 70 90 68 75 Z" fill={GOLD_DIM} opacity="0.7" />

          {/* face highlight */}
          <ellipse cx="50" cy="74" rx="14" ry="16" fill="#3a2f3a" opacity="0.6" />

          {/* headset band */}
          <path d="M 28 62 Q 50 40 72 62" fill="none" stroke={CHROME} strokeWidth="2" />
          {/* headset ear cup */}
          <ellipse cx="28" cy="70" rx="5" ry="7" fill={CHROME} />
          <ellipse cx="28" cy="70" rx="3" ry="5" fill={GOLD} />
          {/* mic arm */}
          <path d="M 28 75 Q 32 88 42 90" fill="none" stroke={CHROME} strokeWidth="1.5" />
          <circle cx="43" cy="91" r="2" fill={GOLD} />

          {/* body / blazer */}
          <path d="M 25 110 Q 50 95 75 110 L 85 180 L 15 180 Z" fill="#1a1a2e" stroke={GOLD_DIM} strokeWidth="0.8" />
          {/* lapel V */}
          <path d="M 50 110 L 42 140 L 50 145 L 58 140 Z" fill="#0a0a1e" />
          {/* neck */}
          <rect x="44" y="92" width="12" height="10" fill="#2a2230" />
        </g>

        {/* call waves emanating from mic */}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M 270 ${91} q ${8 + i * 6} -${6 + i * 4} 0 -${12 + i * 8}`}
            fill="none"
            stroke={GOLD}
            strokeWidth="1"
            opacity="0"
            className="call-wave"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <path
            key={`r${i}`}
            d={`M 270 ${91} q ${8 + i * 6} ${6 + i * 4} 0 ${12 + i * 8}`}
            fill="none"
            stroke={GOLD}
            strokeWidth="1"
            opacity="0"
            className="call-wave"
            style={{ animationDelay: `${i * 0.3 + 0.15}s` }}
          />
        ))}

        {/* floating call bubbles */}
        <g className="call-bubble" style={{ animationDelay: "0.2s" }}>
          <rect x="320" y="40" width="60" height="20" rx="10" fill="rgba(212,168,67,0.12)" stroke={GOLD_DIM} strokeWidth="0.5" />
          <circle cx="330" cy="50" r="3" fill={GOLD} />
          <text x="338" y="53" fontSize="7" fill={CHROME} fontFamily="monospace">+1 CALL</text>
        </g>
        <g className="call-bubble" style={{ animationDelay: "1.4s" }}>
          <rect x="310" y="115" width="70" height="20" rx="10" fill="rgba(212,168,67,0.12)" stroke={GOLD_DIM} strokeWidth="0.5" />
          <circle cx="320" cy="125" r="3" fill="#4ade80" />
          <text x="328" y="128" fontSize="7" fill={CHROME} fontFamily="monospace">BOOKED</text>
        </g>
        <g className="call-bubble" style={{ animationDelay: "2.6s" }}>
          <rect x="325" y="155" width="55" height="20" rx="10" fill="rgba(212,168,67,0.12)" stroke={GOLD_DIM} strokeWidth="0.5" />
          <circle cx="335" cy="165" r="3" fill={GOLD} />
          <text x="343" y="168" fontSize="7" fill={CHROME} fontFamily="monospace">LEAD</text>
        </g>
      </svg>
    </div>
  );
}

/* ============================================================
   4. AUTOMATION — neural network nodes & connections
   ============================================================ */
export function AutomationScene() {
  const nodes = [
    { x: 60, y: 60 }, { x: 60, y: 120 }, { x: 60, y: 180 },
    { x: 180, y: 50 }, { x: 180, y: 120 }, { x: 180, y: 190 },
    { x: 300, y: 80 }, { x: 300, y: 160 },
    { x: 360, y: 120 },
  ];
  const edges = [
    [0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],
    [3,6],[4,6],[4,7],[5,7],[6,8],[7,8],
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-automation">
      <svg viewBox="0 0 400 240" className="w-[88%] h-[88%]" aria-hidden>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke={GOLD_DIM} strokeWidth="0.8"
            className="nn-edge"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
        {edges.map(([a, b], i) => (
          <circle key={`p${i}`} r="2" fill={GOLD} className="nn-packet" style={{ animationDelay: `${i * 0.4}s`, offsetPath: `path('M ${nodes[a].x} ${nodes[a].y} L ${nodes[b].x} ${nodes[b].y}')` } as React.CSSProperties} />
        ))}
        {nodes.map((n, i) => (
          <g key={i} className="nn-node" style={{ animationDelay: `${i * 0.1}s` }}>
            <circle cx={n.x} cy={n.y} r="6" fill="#0a0a1e" stroke={GOLD} strokeWidth="1.5" />
            <circle cx={n.x} cy={n.y} r="2" fill={GOLD} />
          </g>
        ))}
        <text x="20" y="225" fontSize="8" fill={GOLD_DIM} fontFamily="monospace">INPUT</text>
        <text x="170" y="225" fontSize="8" fill={GOLD_DIM} fontFamily="monospace">PROCESS</text>
        <text x="340" y="225" fontSize="8" fill={GOLD_DIM} fontFamily="monospace">OUTPUT</text>
      </svg>
    </div>
  );
}

/* ============================================================
   5. MOBILE — phone with stacking cards
   ============================================================ */
export function MobileScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-mobile">
      <svg viewBox="0 0 400 240" className="w-[88%] h-[88%]" aria-hidden>
        {/* phone */}
        <g transform="translate(160, 20)">
          <rect x="0" y="0" width="80" height="160" rx="12" fill="#0a0a1e" stroke={GOLD_DIM} strokeWidth="1.5" />
          <rect x="4" y="14" width="72" height="138" rx="2" fill="#06060f" />
          <rect x="32" y="6" width="16" height="3" rx="1.5" fill="#1a1a2e" />
          {/* status bar */}
          <circle cx="68" cy="20" r="1" fill={GOLD} />
          <text x="8" y="23" fontSize="5" fill={CHROME} fontFamily="monospace">9:41</text>
          {/* stacking cards */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i} className="phone-card" style={{ animationDelay: `${0.3 + i * 0.4}s` }}>
              <rect x="8" y={32 + i * 26} width="64" height="22" rx="3" fill="rgba(212,168,67,0.1)" stroke={GOLD_DIM} strokeWidth="0.5" />
              <circle cx="16" cy={43 + i * 26} r="3" fill={GOLD} />
              <rect x="22" y={40 + i * 26} width="30" height="2" fill={CHROME} opacity="0.7" />
              <rect x="22" y={45 + i * 26} width="22" height="1.5" fill={GOLD_DIM} />
              <rect x="58" y={40 + i * 26} width="10" height="6" rx="3" fill={GOLD} opacity="0.4" />
            </g>
          ))}
          {/* home indicator */}
          <rect x="30" y="148" width="20" height="2" rx="1" fill={CHROME} opacity="0.5" />
        </g>

        {/* floating UI components flying in */}
        <g className="ui-float" style={{ animationDelay: "0.2s" }}>
          <rect x="40" y="50" width="50" height="30" rx="4" fill="rgba(212,168,67,0.08)" stroke={GOLD_DIM} strokeWidth="0.5" />
          <circle cx="50" cy="65" r="5" fill={GOLD} opacity="0.5" />
          <rect x="58" y="60" width="26" height="2" fill={CHROME} opacity="0.6" />
          <rect x="58" y="66" width="18" height="2" fill={GOLD_DIM} />
        </g>
        <g className="ui-float" style={{ animationDelay: "0.8s" }}>
          <rect x="310" y="80" width="50" height="30" rx="4" fill="rgba(212,168,67,0.08)" stroke={GOLD_DIM} strokeWidth="0.5" />
          <rect x="316" y="86" width="38" height="3" fill={GOLD} />
          <rect x="316" y="92" width="24" height="2" fill={CHROME} opacity="0.6" />
          <rect x="316" y="98" width="30" height="2" fill={GOLD_DIM} />
        </g>
        <g className="ui-float" style={{ animationDelay: "1.4s" }}>
          <rect x="50" y="160" width="60" height="24" rx="12" fill="rgba(212,168,67,0.12)" stroke={GOLD} strokeWidth="0.5" />
          <text x="60" y="175" fontSize="7" fill={GOLD} fontFamily="monospace">SUBMIT</text>
        </g>
        <g className="ui-float" style={{ animationDelay: "2s" }}>
          <circle cx="330" cy="170" r="14" fill="rgba(212,168,67,0.1)" stroke={GOLD} strokeWidth="0.8" />
          <path d="M 324 170 L 328 174 L 336 166" fill="none" stroke={GOLD} strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

/* ============================================================
   6. WEB — browser window assembling components
   ============================================================ */
export function WebScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center scene-web">
      <svg viewBox="0 0 400 240" className="w-[88%] h-[88%]" aria-hidden>
        {/* browser frame */}
        <rect x="30" y="30" width="340" height="180" rx="6" fill="#0a0a1e" stroke={GOLD_DIM} strokeWidth="1" />
        {/* title bar */}
        <rect x="30" y="30" width="340" height="20" rx="6" fill="#06060f" />
        <circle cx="44" cy="40" r="3" fill="#ff5f57" opacity="0.7" />
        <circle cx="54" cy="40" r="3" fill="#febc2e" opacity="0.7" />
        <circle cx="64" cy="40" r="3" fill="#28c840" opacity="0.7" />
        <rect x="100" y="34" width="200" height="12" rx="6" fill="#1a1a2e" />
        <text x="170" y="43" fontSize="6" fill={GOLD_DIM} fontFamily="monospace">tailoredtechsolutions.org</text>

        {/* nav row */}
        <g className="web-block" style={{ animationDelay: "0.1s" }}>
          <rect x="40" y="58" width="40" height="6" rx="1" fill={GOLD} />
          <rect x="240" y="58" width="20" height="6" rx="1" fill={CHROME} opacity="0.5" />
          <rect x="266" y="58" width="20" height="6" rx="1" fill={CHROME} opacity="0.5" />
          <rect x="292" y="58" width="20" height="6" rx="1" fill={CHROME} opacity="0.5" />
          <rect x="320" y="55" width="40" height="12" rx="6" fill="rgba(212,168,67,0.2)" stroke={GOLD} strokeWidth="0.5" />
        </g>

        {/* hero block */}
        <g className="web-block" style={{ animationDelay: "0.5s" }}>
          <rect x="40" y="78" width="160" height="8" rx="1" fill={CHROME} opacity="0.9" />
          <rect x="40" y="90" width="120" height="6" rx="1" fill={CHROME} opacity="0.6" />
          <rect x="40" y="100" width="200" height="4" rx="1" fill={GOLD_DIM} />
          <rect x="40" y="108" width="180" height="4" rx="1" fill={GOLD_DIM} />
          <rect x="40" y="120" width="60" height="14" rx="3" fill={GOLD} />
        </g>
        {/* hero image */}
        <g className="web-block" style={{ animationDelay: "0.9s" }}>
          <rect x="260" y="78" width="100" height="60" rx="4" fill="rgba(212,168,67,0.12)" stroke={GOLD_DIM} strokeWidth="0.5" />
          <circle cx="280" cy="100" r="6" fill={GOLD} opacity="0.6" />
          <path d="M 270 130 L 290 110 L 310 125 L 340 95 L 350 130 Z" fill={GOLD_DIM} opacity="0.5" />
        </g>

        {/* card grid */}
        {[0, 1, 2].map((i) => (
          <g key={i} className="web-block" style={{ animationDelay: `${1.2 + i * 0.2}s` }}>
            <rect x={40 + i * 110} y="150" width="100" height="50" rx="3" fill="rgba(212,168,67,0.06)" stroke={GOLD_DIM} strokeWidth="0.5" />
            <rect x={48 + i * 110} y="158" width="20" height="20" rx="2" fill={GOLD} opacity="0.4" />
            <rect x={72 + i * 110} y="162" width="60" height="3" fill={CHROME} opacity="0.7" />
            <rect x={72 + i * 110} y="170" width="48" height="2" fill={GOLD_DIM} />
            <rect x={72 + i * 110} y="176" width="52" height="2" fill={GOLD_DIM} />
          </g>
        ))}

        {/* cursor */}
        <g className="web-cursor">
          <path d="M 0 0 L 0 12 L 3 9 L 5 13 L 7 12 L 5 8 L 9 8 Z" fill={CHROME} stroke="#000" strokeWidth="0.3" />
        </g>
      </svg>
    </div>
  );
}