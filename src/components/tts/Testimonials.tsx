import { Reveal } from "./Reveal";

const T = [
  { q: "TTS rebuilt our entire data pipeline and integrated an AI forecasting layer in six weeks. The quality of their TypeScript architecture alone saved us months of technical debt.", a: "R. Matsuda", r: "VP Engineering · AgriData Systems" },
  { q: "Andrew's structural engineering background shows in his software work — everything is load-bearing. No fluff, no shortcuts.", a: "D. Okonkwo", r: "Operations Director · LogiChain Co." },
  { q: "We handed them a requirements doc and got back a production app. The Terra Farming case study should be in every product school curriculum.", a: "C. Reza", r: "Founding Partner · Meridian Ventures" },
  { q: "Their engineering instincts are sharp. Edge cases we hadn't even articulated showed up handled in the first review.", a: "M. Halvorsen", r: "Head of Product · Northwind Robotics" },
];

export function Testimonials() {
  const all = [...T, ...T];
  return (
    <section className="py-24 md:py-32 bg-void overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-14">
        <Reveal>
          <div className="eyebrow">Field Reports</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight text-chrome">
            What clients <span className="gold-text-gradient">say.</span>
          </h2>
        </Reveal>
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-6 marquee-track will-change-transform" style={{ animationDuration: "60s" }}>
          {all.map((t, i) => (
            <figure key={i} className="shrink-0 w-[360px] md:w-[460px] glass rounded-2xl p-6 md:p-7">
              <div className="text-gold font-display text-3xl leading-none">"</div>
              <blockquote className="mt-2 text-chrome leading-relaxed text-[15px]">{t.q}</blockquote>
              <figcaption className="mt-6 pt-4 border-t border-subtle">
                <div className="text-sm font-semibold text-chrome">{t.a}</div>
                <div className="text-xs font-mono text-gold-dim uppercase tracking-widest mt-0.5">{t.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
