import { ArrowRight, ChevronDown } from "lucide-react";
import { Hero3D } from "./Hero3D";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden min-h-[100dvh] pt-32 pb-20 bg-grad-hero">
      {/* Background mesh + grid */}
      <div className="absolute inset-0 circuit-grid opacity-[0.5] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[680px] h-[680px] rounded-full bg-[radial-gradient(circle,rgba(212,168,67,0.18),transparent_60%)] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-[680px] h-[680px] rounded-full bg-[radial-gradient(circle,rgba(136,85,255,0.22),transparent_60%)] blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-[55%_45%] gap-12 md:gap-8 items-center">
        {/* Left */}
        <div>
          <div className="eyebrow mb-6">[ AI Product Studio ]</div>
          <h1 className="font-display text-[44px] leading-[0.95] sm:text-6xl md:text-[88px] font-extrabold tracking-tighter text-chrome">
            We Build Intelligence —{" "}
            <span className="gold-text-gradient italic">Tailored.</span>
          </h1>
          <p className="mt-8 max-w-[58ch] text-base md:text-lg text-secondary-soft leading-relaxed">
            Custom AI applications, embedded systems, and product experiences designed for the companies that refuse to be generic.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#terra"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[var(--gold-bright)] text-[#09090f] font-semibold hover:bg-[var(--gold-mid)] active:scale-[0.98] active:-translate-y-[1px] transition-all"
            >
              Explore Our Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-gold-dim text-gold font-semibold hover:border-gold hover:bg-[var(--gold-glow)] active:scale-[0.98] transition-all"
            >
              Talk to Us
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-4 max-w-xl">
            {[
              { v: "12+", l: "Projects Deployed" },
              { v: "2", l: "Markets · USA · APAC" },
              { v: "100%", l: "Custom · No Templates" },
            ].map((s) => (
              <div key={s.l} className="border-l border-gold-dim pl-3">
                <div className="font-display text-2xl md:text-3xl font-bold text-gold">{s.v}</div>
                <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-muted-soft leading-tight">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <Hero3D />

          {/* Floating glass cards */}
          <div className="hidden sm:block absolute -left-2 top-6 glass rounded-xl px-4 py-3 float-y" style={{ animationDelay: "0s" }}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] pulse-dot" />
              <span className="text-xs font-mono tracking-wider text-chrome">AI Integration</span>
            </div>
          </div>
          <div className="hidden sm:block absolute -right-4 top-1/3 glass rounded-xl px-4 py-3 float-y" style={{ animationDelay: "1.2s" }}>
            <div className="text-[10px] font-mono uppercase tracking-widest text-gold-dim">Stack</div>
            <div className="text-xs font-mono text-chrome mt-1">React · TS · Supabase</div>
          </div>
          <div className="hidden sm:block absolute left-4 bottom-4 glass rounded-xl px-4 py-3 float-y" style={{ animationDelay: "2.1s" }}>
            <div className="text-[10px] font-mono uppercase tracking-widest text-gold-dim">Avg Build → Deploy</div>
            <div className="text-base font-mono text-gold mt-0.5">4.9s</div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#services" className="absolute left-1/2 -translate-x-1/2 bottom-6 text-gold-dim hover:text-gold transition-colors float-y" aria-label="Scroll">
        <ChevronDown size={22} />
      </a>
    </section>
  );
}
