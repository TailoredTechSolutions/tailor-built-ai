import { useEffect, useRef, useState } from "react";

const IMAGES = [
  "/hero/Gemini_Generated_Image_31m5uu31m5uu31m5.jpeg",
  "/hero/Gemini_Generated_Image_5eb8nq5eb8nq5eb8.jpeg",
  "/hero/Gemini_Generated_Image_9q6xun9q6xun9q6x.jpeg",
  "/hero/Gemini_Generated_Image_kvdguxkvdguxkvdg.jpeg",
  "/hero/Gemini_Generated_Image_m862yym862yym862.jpeg",
  "/hero/Gemini_Generated_Image_whv98mwhv98mwhv9.jpeg",
  "/hero/Gemini_Generated_Image_wmwb6uwmwb6uwmwb.jpeg",
];

const SECTIONS = [
  { step: "Step 01 — Ignition", title: ["Initiating", "Tailoring"], sub: "Every transformation begins with a single point of contact. Your vision, our precision — the sequence starts now." },
  { step: "Step 02 — Build", title: ["Fabricating", "Circuits"], sub: "Precision-etched logic meets custom architecture. We construct the intelligence layer your business demands." },
  { step: "Step 03 — Power", title: ["Energizing", "Modules"], sub: "Core systems brought online. AI modules initialize, drawing power from a purpose-built infrastructure." },
  { step: "Step 04 — Deploy", title: ["Transporting", "Completed Module"], sub: "Finished systems moved into position. Deployment is not the end — it is the moment your product becomes real." },
  { step: "Step 05 — Install", title: ["Mounting", "Completed Module"], sub: "Integration executed. Your tailored solution locked into the environment it was built to serve." },
  { step: "Step 06 — Sync", title: ["Calibrating", "Biometric Link"], sub: "Signal integrity confirmed. System and operator achieve full synchronization — man and machine, aligned." },
  { step: "Step 07 — Ready", title: ["Calibration", "Complete"], sub: "Bio-gel matrix optimized and locked. Suit deployment readiness: optimal. Link stable at 100%. You are ready." },
];

export function SnapScrollHero() {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            if (entry.intersectionRatio > 0.5) setActive(idx);
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="snap-hero-root">
      <style>{CSS}</style>

      <nav className="progress-rail" aria-label="Section progress">
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            className={`progress-dot ${i === active ? "active" : ""}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </nav>

      <div className="section-counter">
        <span>{String(active + 1).padStart(2, "0")}</span> / {String(SECTIONS.length).padStart(2, "0")}
      </div>

      {SECTIONS.map((s, i) => (
        <section
          key={i}
          ref={(el) => { sectionRefs.current[i] = el; }}
          data-idx={i}
          className="section"
        >
          <div className="section__bg" style={{ backgroundImage: `url(${IMAGES[i]})` }} />
          <div className="section__content">
            <div className="section__step">{s.step}</div>
            <div className="section__line" />
            <h1 className="section__title">
              {s.title[0]}<br />{s.title[1]}
            </h1>
            <p className="section__sub">{s.sub}</p>
          </div>
          {i === 0 && (
            <div className={`scroll-hint ${active !== 0 ? "hidden" : ""}`}>
              <span className="scroll-hint__label">Scroll</span>
              <span className="scroll-hint__arrow" />
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

const CSS = `
.snap-hero-root { scroll-snap-type: y mandatory; height: 100vh; overflow-y: scroll; background:#020B18; }
.snap-hero-root .section { height: 100vh; scroll-snap-align: start; scroll-snap-stop: always; position: relative; display: flex; align-items: flex-end; overflow: hidden; }
.snap-hero-root .section__bg { position:absolute; inset:0; background-size:cover; background-position:center; transform:scale(1.04); transition:transform .9s cubic-bezier(.16,1,.3,1); will-change:transform; }
.snap-hero-root .section.in-view .section__bg { transform:scale(1); }
.snap-hero-root .section::after { content:''; position:absolute; inset:0; background:linear-gradient(to top, rgba(2,11,24,.88) 0%, rgba(2,11,24,.45) 40%, rgba(2,11,24,.10) 100%); z-index:1; }
.snap-hero-root .section__content { position:relative; z-index:2; padding:3rem 4rem; width:100%; max-width:900px; transform:translateY(20px); opacity:0; transition:transform .7s cubic-bezier(.16,1,.3,1) .15s, opacity .7s ease .15s; }
.snap-hero-root .section.in-view .section__content { transform:translateY(0); opacity:1; }
.snap-hero-root .section__step { font-size:11px; font-weight:500; letter-spacing:.18em; text-transform:uppercase; color:#C9A84C; margin-bottom:.6rem; }
.snap-hero-root .section__title { font-size:clamp(2rem,5vw,3.5rem); font-weight:700; color:#fff; letter-spacing:-.02em; line-height:1.1; margin-bottom:1rem; }
.snap-hero-root .section__sub { font-size:1rem; color:rgba(255,255,255,.6); font-weight:400; max-width:520px; line-height:1.6; }
.snap-hero-root .section__line { width:48px; height:2px; background:#C9A84C; margin-bottom:1.4rem; border-radius:2px; }
.snap-hero-root .progress-rail { position:fixed; right:2rem; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:10px; z-index:100; }
.snap-hero-root .progress-dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,.25); border:1px solid rgba(255,255,255,.3); transition:background .3s ease, transform .3s ease; cursor:pointer; padding:0; }
.snap-hero-root .progress-dot.active { background:#C9A84C; transform:scale(1.4); border-color:#C9A84C; }
.snap-hero-root .section-counter { position:fixed; bottom:2rem; right:2rem; z-index:100; font-size:11px; letter-spacing:.12em; color:rgba(255,255,255,.4); font-weight:500; }
.snap-hero-root .section-counter span { color:#C9A84C; font-weight:700; }
.snap-hero-root .scroll-hint { position:absolute; bottom:2rem; left:50%; transform:translateX(-50%); z-index:2; display:flex; flex-direction:column; align-items:center; gap:6px; opacity:1; transition:opacity .4s ease; pointer-events:none; }
.snap-hero-root .scroll-hint.hidden { opacity:0; }
.snap-hero-root .scroll-hint__label { font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.4); }
.snap-hero-root .scroll-hint__arrow { width:1px; height:36px; background:rgba(255,255,255,.2); position:relative; overflow:hidden; display:block; }
.snap-hero-root .scroll-hint__arrow::after { content:''; position:absolute; top:-100%; left:0; width:100%; height:100%; background:#C9A84C; animation:snapArrowDrop 1.6s ease infinite; }
@keyframes snapArrowDrop { 0% { top:-100%; } 100% { top:100%; } }
@media (max-width: 768px) {
  .snap-hero-root .section__content { padding:2rem 1.5rem; }
  .snap-hero-root .section__title { font-size:clamp(1.6rem,7vw,2.4rem); }
  .snap-hero-root .progress-rail { right:1rem; }
  .snap-hero-root .section-counter { right:1rem; bottom:1.5rem; }
}
@media (prefers-reduced-motion: reduce) {
  .snap-hero-root .section__bg { transition:none; }
  .snap-hero-root .section__content { transition:none; opacity:1; transform:none; }
  .snap-hero-root .scroll-hint__arrow::after { animation:none; }
}
`;