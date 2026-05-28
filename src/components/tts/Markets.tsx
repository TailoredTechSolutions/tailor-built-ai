import { Reveal } from "./Reveal";

export function Markets() {
  return (
    <section className="py-24 md:py-32 bg-deep">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="eyebrow">Global Footprint</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight text-chrome">
            Where we <span className="gold-text-gradient">operate.</span>
          </h2>
          <div className="mt-10 space-y-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-gold pulse-dot" />
                <div className="text-xs font-mono uppercase tracking-widest text-gold">USA · Primary</div>
              </div>
              <p className="mt-3 text-secondary-soft max-w-md">
                Headquartered in California. Serving clients across North America with full-stack AI and software engagements.
              </p>
              <a href="mailto:athie@tailoredtechsolutions.org" className="mt-2 inline-block text-sm font-mono text-chrome hover:text-gold">athie@tailoredtechsolutions.org</a>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] pulse-dot" />
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--neon-cyan)]">Asia-Pacific · Active</div>
              </div>
              <p className="mt-3 text-secondary-soft max-w-md">
                Regional focus across Southeast and East Asia — mobile-first markets with high demand for custom platform engineering.
              </p>
              <a href="mailto:gwaltney@tailoredtechsolutions.org" className="mt-2 inline-block text-sm font-mono text-chrome hover:text-gold">gwaltney@tailoredtechsolutions.org</a>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] pulse-dot" />
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--neon-cyan)]">EMEA · Strategic</div>
              </div>
              <p className="mt-3 text-secondary-soft max-w-md">
                Partnerships across the Middle East and Europe — led by co-founder Ameer Al Saati.
              </p>
              <a href="mailto:alsaati@tailoredtechsolutions.org" className="mt-2 inline-block text-sm font-mono text-chrome hover:text-gold">alsaati@tailoredtechsolutions.org</a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-[4/3] rounded-2xl border border-subtle bg-card-soft overflow-hidden">
            <div className="absolute inset-0 circuit-grid opacity-[0.6]" />
            <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
              {/* Stylized continents - dots */}
              {Array.from({ length: 320 }).map((_, i) => {
                const x = (i * 37) % 800;
                const y = (i * 71) % 500;
                const land = (Math.sin(x * 0.02) + Math.cos(y * 0.025)) > 0.2;
                if (!land) return null;
                return <circle key={i} cx={x} cy={y} r="1.4" fill="rgba(212,168,67,0.25)" />;
              })}
              {/* USA pulse */}
              <g>
                <circle cx="180" cy="200" r="6" fill="#d4a843" />
                <circle cx="180" cy="200" r="14" fill="none" stroke="#d4a843" strokeWidth="1" className="pulse-dot" />
              </g>
              {/* APAC pulse */}
              <g>
                <circle cx="600" cy="240" r="6" fill="#00ffcc" />
                <circle cx="600" cy="240" r="14" fill="none" stroke="#00ffcc" strokeWidth="1" className="pulse-dot" />
              </g>
              {/* Trace */}
              <path d="M 180 200 Q 400 80 600 240" fill="none" stroke="url(#mapG)" strokeWidth="1.2" className="dash-flow" />
              <defs>
                <linearGradient id="mapG" x1="0" x2="1">
                  <stop offset="0%" stopColor="#d4a843" />
                  <stop offset="100%" stopColor="#00ffcc" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
