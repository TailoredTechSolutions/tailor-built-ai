import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#terra", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#careers", label: "Careers" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[rgba(13,13,26,0.85)] backdrop-blur-xl border-b border-subtle" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[68px] flex items-center justify-between">
        <a href="#top" className="shrink-0"><Logo /></a>
        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] font-medium text-chrome-mid tracking-wide hover:text-chrome transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-5 py-2 rounded-lg border border-gold-dim text-gold text-[13px] font-semibold tracking-wide hover:bg-[var(--gold-glow)] hover:border-gold transition-all"
        >
          Get Started
        </a>
        <button onClick={() => setOpen((v) => !v)} className="md:hidden text-chrome p-2 -mr-2" aria-label="Menu">
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
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${open ? i * 60 : 0}ms` }}
              className={`font-display text-3xl font-bold tracking-tight text-chrome py-3 border-b border-subtle transition-all ${
                open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center px-6 py-4 rounded-lg bg-[var(--gold-bright)] text-[#09090f] font-bold"
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
}
