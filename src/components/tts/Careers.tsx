import { Code2, BrainCircuit, Smartphone, Palette, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const ROLES = [
  { Icon: Code2, t: "Senior Full-Stack Engineer", s: "React · TypeScript · Supabase" },
  { Icon: BrainCircuit, t: "AI/ML Integration Engineer", s: "Python · LLM APIs" },
  { Icon: Smartphone, t: "Mobile Developer", s: "React Native · Capacitor" },
  { Icon: Palette, t: "UI/UX Engineer", s: "Design systems · Figma · Production code" },
];

export function Careers() {
  return (
    <section id="careers" className="py-24 md:py-32 bg-deep">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12">
        <Reveal className="md:col-span-5">
          <div className="eyebrow">Open Roles</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight text-chrome leading-tight">
            We're building something rare. <span className="gold-text-gradient">Join us.</span>
          </h2>
          <p className="mt-6 text-secondary-soft max-w-md">
            TTS is a small, extremely high-output team. We don't hire for headcount — we hire for capability. If you build things that last and think in systems, we want to talk.
          </p>
          <a href="mailto:gwaltney@tailoredtechsolutions.org" className="mt-8 inline-block text-sm text-gold hover:text-[var(--gold-mid)] font-mono">
            gwaltney@tailoredtechsolutions.org
          </a>
          <p className="mt-2 text-xs text-muted-soft max-w-sm">
            No resume required — just show us what you've built.
          </p>
        </Reveal>
        <Reveal delay={120} className="md:col-span-7">
          <ul className="divide-y divide-[var(--border-subtle)] border-y border-subtle">
            {ROLES.map((r) => (
              <li key={r.t}>
                <a href="mailto:gwaltney@tailoredtechsolutions.org" className="flex items-center justify-between gap-4 py-6 group">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-md border border-gold-dim bg-[var(--gold-glow)] flex items-center justify-center">
                      <r.Icon size={18} className="text-gold" />
                    </span>
                    <div>
                      <div className="text-chrome font-medium">{r.t}</div>
                      <div className="text-xs font-mono text-chrome-mid tracking-wide mt-0.5">{r.s}</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-gold-dim group-hover:text-gold transition-colors">
                    Apply <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
