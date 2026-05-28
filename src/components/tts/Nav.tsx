import { useEffect, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#terra", label: "Products" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  /* Scroll-spy with IntersectionObserver */
  useEffect(() => {
    const handle = (entries: IntersectionObserverEntry[]) => {
      // Find the entry with the largest intersectionRatio
      let best = entries[0];
      for (const e of entries) {
        if (e.intersectionRatio > (best?.intersectionRatio ?? 0)) {
          best = e;
        }
      }
      if (best && best.isIntersecting) {
        setActive(`#${best.target.id}`);
      }
    };

    const observer = new IntersectionObserver(handle, {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    });

    for (const l of LINKS) {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    }

    // Also observe #top (Hero) even though it's not in LINKS
    const topEl = document.querySelector("#top");
    if (topEl) observer.observe(topEl);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      if (open) setOpen(false);
      // Small delay on mobile so the menu closing animation doesn't fight the scroll
      const delay = open ? 250 : 0;
      setTimeout(() => scrollToId(href), delay);
    },
    [open]
  );

  const linkBase =
    "text-[13px] font-medium tracking-wide transition-colors relative";
  const linkInactive = "text-chrome-mid hover:text-chrome";
  const linkActive = "text-gold";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(13,13,26,0.85)] backdrop-blur-xl border-b border-subtle"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[68px] flex items-center justify-between">
        <a href="#top" onClick={(e) => onLinkClick(e, "#top")} className="shrink-0">
          <Logo />
        </a>
        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => onLinkClick(e, l.href)}
                className={`${linkBase} ${isActive ? linkActive : linkInactive}`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold rounded-full" />
                )}
              </a>
            );
          })}
        </nav>
        <a
          href="#contact"
          onClick={(e) => onLinkClick(e, "#contact")}
          className="hidden md:inline-flex items-center px-5 py-2 rounded-lg border border-gold-dim text-gold text-[13px] font-semibold tracking-wide hover:bg-[var(--gold-glow)] hover:border-gold transition-all"
        >
          Get Started
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-chrome p-2 -mr-2"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile */}
      <div
        className={`md:hidden fixed inset-0 top-[68px] bg-[rgba(9,9,15,0.97)] backdrop-blur-xl transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-8 pt-10 gap-2">
          {LINKS.map((l, i) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => onLinkClick(e, l.href)}
                style={{ transitionDelay: `${open ? i * 60 : 0}ms` }}
                className={`font-display text-3xl font-bold tracking-tight py-3 border-b border-subtle transition-all ${
                  open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                } ${isActive ? "text-gold" : "text-chrome"}`}
              >
                {l.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => onLinkClick(e, "#contact")}
            className="mt-8 inline-flex items-center justify-center px-6 py-4 rounded-lg bg-[var(--gold-bright)] text-[#09090f] font-bold"
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
}
