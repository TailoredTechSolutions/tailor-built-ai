import { useEffect, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Products" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
  // Update hash without jumping
  history.replaceState(null, "", id);
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  /* Scroll-spy with IntersectionObserver */
  useEffect(() => {
    if (!onHome) {
      setActive("");
      return;
    }
    const ids = [...LINKS.map((l) => l.href), "#top"];
    const targets = ids
      .map((id) => document.querySelector(id) as HTMLElement | null)
      .filter((el): el is HTMLElement => !!el);
    if (targets.length === 0) return;

    // Activation line sits just below the fixed header (68px) so the
    // underline switches as a section's top crosses under the nav.
    const NAV_H = 68;
    const computeActive = () => {
      const line = NAV_H + 1;
      let current: HTMLElement | null = null;
      for (const el of targets) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) {
          current = el;
          break;
        }
      }
      // Fallback: last section whose top is above the line
      if (!current) {
        let bestTop = -Infinity;
        for (const el of targets) {
          const top = el.getBoundingClientRect().top;
          if (top <= line && top > bestTop) {
            bestTop = top;
            current = el;
          }
        }
      }
      // Near page bottom: force last section active so trailing links light up
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = targets[targets.length - 1];
      }
      setActive(current ? `#${current.id}` : "");
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        computeActive();
      });
    };

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [onHome]);

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
      const delay = open ? 280 : 0;
      if (!onHome) {
        // Route home first, then scroll once the section is mounted
        navigate({ to: "/" }).then(() => {
          // Wait for sections to render
          const tryScroll = (attempt = 0) => {
            const el = document.querySelector(href);
            if (el) {
              scrollToId(href);
            } else if (attempt < 20) {
              setTimeout(() => tryScroll(attempt + 1), 50);
            }
          };
          setTimeout(tryScroll, 60);
        });
        return;
      }
      setTimeout(() => scrollToId(href), delay);
    },
    [open, onHome, navigate]
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
        className={`md:hidden fixed inset-0 top-[68px] bg-[#09090f] transition-opacity duration-300 z-50 overflow-y-auto ${
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
