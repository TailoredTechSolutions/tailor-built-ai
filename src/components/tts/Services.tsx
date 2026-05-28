import { Brain, Smartphone, Globe, Cpu, Palette, Compass, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const SERVICES = [
  {
    Icon: Brain,
    name: "AI Integration & Automation",
    body: "Deploy intelligent systems into existing business workflows. We connect models, pipelines, and APIs into coherent, production-grade AI infrastructure.",
  },
  {
    Icon: Smartphone,
    name: "Mobile Application Development",
    body: "Cross-platform mobile apps built with React Native and Capacitor. App Store–ready. Scalable from day one.",
  },
  {
    Icon: Globe,
    name: "Web Platform Engineering",
    body: "Full-stack web applications from architecture to deployment. React, TypeScript, Supabase, Netlify — modern stacks that don't rot.",
  },
  {
    Icon: Cpu,
    name: "Embedded Systems & IoT",
    body: "Hardware-level firmware engineering meets software product thinking. From sensor integration to data pipelines.",
  },
  {
    Icon: Palette,
    name: "UI/UX Engineering",
    body: "Interfaces that don't look like AI built them. Design systems, component libraries, and user flows grounded in human factors research.",
  },
  {
    Icon: Compass,
    name: "Technology Consulting",
    body: "Strategic advisory for companies navigating AI adoption, cloud migration, and technology stack decisions.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-void">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Reveal>
          <div className="eyebrow">What we build</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight text-chrome max-w-3xl">
            Every engagement is custom. Zero templates.
          </h2>
        </Reveal>

        <div className="mt-20 space-y-6">
          {SERVICES.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <Reveal key={s.name} delay={i * 60}>
                <div className={`grid md:grid-cols-12 gap-6 items-stretch`}>
                  <div className={`md:col-span-7 ${left ? "" : "md:col-start-6"}`}>
                    <a
                      href="#contact"
                      className="group relative block bg-card-soft border border-subtle rounded-2xl p-7 md:p-9 gold-diffuse hover:border-l-2 hover:border-l-[var(--gold-bright)] transition-all"
                    >
                      <div className="flex items-start gap-5">
                        <div className="shrink-0 w-12 h-12 rounded-lg border border-gold-dim flex items-center justify-center bg-[var(--gold-glow)]">
                          <s.Icon size={22} className="text-gold" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="font-display text-xl md:text-2xl font-semibold text-chrome leading-tight">
                              {s.name}
                            </h3>
                            <span className="text-[10px] font-mono text-gold-dim mt-1">0{i + 1}</span>
                          </div>
                          <p className="mt-3 text-secondary-soft leading-relaxed max-w-[55ch]">{s.body}</p>
                          <div className="mt-5 inline-flex items-center gap-1.5 text-gold text-xs font-mono uppercase tracking-widest">
                            Learn more <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
