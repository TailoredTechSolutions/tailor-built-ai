const ITEMS = [
  "AI Integration",
  "Mobile Applications",
  "Web Platforms",
  "Embedded Systems",
  "UI/UX Engineering",
  "Cloud Infrastructure",
  "Technology Consulting",
  "Custom AI Models",
];

export function Marquee() {
  const all = [...ITEMS, ...ITEMS];
  return (
    <section className="bg-card-soft border-y border-subtle py-6 overflow-hidden">
      <div className="marquee-track flex gap-12 whitespace-nowrap will-change-transform">
        {all.map((t, i) => (
          <span key={i} className={`flex items-center gap-12 font-display text-2xl md:text-3xl tracking-tight ${i % 2 === 0 ? "text-gold" : "text-chrome-mid"}`}>
            {t}
            <span className="text-gold-dim">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
