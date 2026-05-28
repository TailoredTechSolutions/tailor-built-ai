export function HeroOrb() {
  return (
    <div className="relative aspect-square w-full max-w-[520px] mx-auto">
      {/* Outer rotating ring */}
      <div className="absolute inset-0 spin-slower">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="ringG" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#d4a843" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#8855ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d4a843" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="190" fill="none" stroke="url(#ringG)" strokeWidth="0.6" />
          <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(212,168,67,0.18)" strokeWidth="0.4" strokeDasharray="2 8" />
        </svg>
      </div>
      {/* Inner rotating circuit */}
      <div className="absolute inset-8 spin-slow">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(136,85,255,0.25)" strokeWidth="0.4" strokeDasharray="1 6" />
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const x1 = 200 + Math.cos(a) * 140;
            const y1 = 200 + Math.sin(a) * 140;
            const x2 = 200 + Math.cos(a) * 160;
            const y2 = 200 + Math.sin(a) * 160;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(212,168,67,0.4)" strokeWidth="0.8" />;
          })}
        </svg>
      </div>
      {/* Core orb */}
      <div className="absolute inset-[18%] rounded-full orb-gradient blur-[0.5px]" />
      <div className="absolute inset-[18%] rounded-full" style={{ boxShadow: "inset 0 0 60px rgba(255,255,255,0.15), inset 0 0 120px rgba(136,85,255,0.4), 0 0 80px rgba(212,168,67,0.25)" }} />
      {/* Highlight */}
      <div className="absolute left-[24%] top-[22%] w-[18%] h-[12%] rounded-full bg-white/40 blur-2xl" />
      {/* Circuit traces radiating */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none">
        <g stroke="rgba(212,168,67,0.5)" strokeWidth="0.6" fill="none">
          <path className="dash-flow" d="M 20 60 L 100 60 L 140 100" />
          <path className="dash-flow" d="M 380 80 L 300 80 L 260 120" />
          <path className="dash-flow" d="M 20 340 L 120 340 L 160 300" />
          <path className="dash-flow" d="M 380 320 L 280 320 L 240 280" />
        </g>
        <g fill="#d4a843">
          <circle cx="20" cy="60" r="2" />
          <circle cx="380" cy="80" r="2" />
          <circle cx="20" cy="340" r="2" />
          <circle cx="380" cy="320" r="2" />
        </g>
      </svg>
    </div>
  );
}
