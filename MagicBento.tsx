'use client';
/**
 * MagicBento.tsx — TTS Services section
 * ─────────────────────────────────────────────────────────────────────────────
 * Magic Bento grid with gold border glow, global spotlight, 3D tilt,
 * particle system, and click ripple.
 *
 * No GSAP required — all interactions via:
 *   • CSS custom properties (--glow-x, --glow-y, --glow-intensity)
 *   • Inline style updates (tilt via transform)
 *   • requestAnimationFrame for particles
 *   • CSS transitions for everything else
 *
 * Drop into: src/components/tts/MagicBento.tsx
 * Replace <Services /> with <MagicBento /> in src/routes/index.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useCallback } from 'react';

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: '01',
    tag: 'Automate',
    name: 'AI Automation\n& Agents',
    body: 'Custom-trained agents that operate your workflows, qualify leads, and process data — without human bottlenecks.',
    accent: [201, 168, 76] as [number,number,number],
  },
  {
    num: '02',
    tag: 'Build',
    name: 'Product\nDevelopment',
    body: 'End-to-end product builds — from architecture to deployment. React, Supabase, Capacitor, production-grade.',
    accent: [79, 195, 247] as [number,number,number],
  },
  {
    num: '03',
    tag: 'Deploy',
    name: 'Web & Mobile\nPlatforms',
    body: 'Cross-platform apps that run on iOS, Android, and web from a single codebase. Ship fast. Scale further.',
    accent: [240, 204, 106] as [number,number,number],
  },
  {
    num: '04',
    tag: 'Analyze',
    name: 'Data &\nAnalytics',
    body: 'Pipelines, dashboards, and intelligence layers that turn raw data into decisions your team can act on.',
    accent: [201, 168, 76] as [number,number,number],
  },
  {
    num: '05',
    tag: 'Protect',
    name: 'Security &\nCompliance',
    body: 'Architecture audits, access controls, and compliance frameworks built into the stack from day one.',
    accent: [138, 111, 48] as [number,number,number],
  },
  {
    num: '06',
    tag: 'Advise',
    name: 'Strategy &\nAdvisory',
    body: 'Embedded technical leadership for founders and operators who need a chief architect — without the overhead.',
    accent: [79, 195, 247] as [number,number,number],
  },
] as const;

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

// ─── Card component ───────────────────────────────────────────────────────────
interface CardProps {
  service: typeof SERVICES[number];
  isMobile: boolean;
}

function BentoCard({ service, isMobile }: CardProps) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const particles  = useRef<Particle[]>([]);
  const rafRef     = useRef<number>(0);
  const hoveredRef = useRef(false);
  const [r, g, b]  = service.accent;

  const spawnParticles = useCallback(() => {
    if (isMobile || !cardRef.current) return;
    const card = cardRef.current;
    const { width, height } = card.getBoundingClientRect();

    for (let i = 0; i < 10; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position:absolute;width:3px;height:3px;border-radius:50%;pointer-events:none;z-index:100;
        background:rgba(${r},${g},${b},1);
        box-shadow:0 0 5px rgba(${r},${g},${b},0.5);
        left:${Math.random() * width}px;top:${Math.random() * height}px;
      `;
      card.appendChild(el);
      particles.current.push({
        el,
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top),
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        life: 0,
        maxLife: 80 + Math.random() * 60,
      });
    }
  }, [isMobile, r, g, b]);

  const clearParticles = useCallback(() => {
    particles.current.forEach(p => p.el.remove());
    particles.current = [];
  }, []);

  const tickParticles = useCallback(() => {
    rafRef.current = requestAnimationFrame(tickParticles);
    particles.current = particles.current.filter(p => {
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      const alpha = Math.max(0, 1 - p.life / p.maxLife);
      p.el.style.left    = `${p.x}px`;
      p.el.style.top     = `${p.y}px`;
      p.el.style.opacity = String(alpha);
      if (p.life >= p.maxLife) { p.el.remove(); return false; }
      return true;
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    hoveredRef.current = true;
    spawnParticles();
    tickParticles();
    const card = cardRef.current!;
    card.style.transform = 'perspective(1000px) rotateX(4deg) rotateY(4deg) translateY(-3px)';
    card.style.transition = 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease';
  }, [isMobile, spawnParticles, tickParticles]);

  const handleMouseLeave = useCallback(() => {
    hoveredRef.current = false;
    cancelAnimationFrame(rafRef.current);
    clearParticles();
    const card = cardRef.current!;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    card.style.setProperty('--glow-intensity', '0');
  }, [clearParticles]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    cardRef.current.style.transform =
      `perspective(1000px) rotateX(${((y - cy) / cy) * -8}deg) rotateY(${((x - cx) / cx) * 8}deg) translateX(${(x - cx) * 0.04}px) translateY(${(y - cy) * 0.04 - 3}px)`;
    cardRef.current.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
    cardRef.current.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
    cardRef.current.style.setProperty('--glow-intensity', '1');
  }, [isMobile]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const maxD = Math.max(
      Math.hypot(x, y), Math.hypot(x - rect.width, y),
      Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height),
    );
    const rip = document.createElement('div');
    rip.style.cssText = `
      position:absolute;width:${maxD*2}px;height:${maxD*2}px;border-radius:50%;pointer-events:none;z-index:50;
      left:${x - maxD}px;top:${y - maxD}px;
      background:radial-gradient(circle,rgba(${r},${g},${b},0.35) 0%,rgba(${r},${g},${b},0.15) 30%,transparent 70%);
      transform:scale(0);opacity:1;
      transition:transform 0.8s cubic-bezier(0.16,1,0.3,1),opacity 0.8s ease;
    `;
    card.appendChild(rip);
    requestAnimationFrame(() => {
      rip.style.transform = 'scale(1)';
      rip.style.opacity = '0';
    });
    setTimeout(() => rip.remove(), 900);
  }, [r, g, b]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="relative flex flex-col justify-between overflow-hidden rounded-[20px] p-6 cursor-pointer"
      style={{
        aspectRatio: '4/3',
        minHeight: '180px',
        background: '#0D1120',
        border: '1px solid rgba(201,168,76,0.12)',
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-intensity': '0',
        '--glow-radius': '280px',
      } as React.CSSProperties}
    >
      {/* Border glow ::after equivalent — inline div */}
      <div
        className="absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-300"
        style={{
          padding: '6px',
          background: `radial-gradient(var(--glow-radius, 280px) circle at var(--glow-x, 50%) var(--glow-y, 50%),
            rgba(${r},${g},${b},calc(var(--glow-intensity,0) * 0.75)) 0%,
            rgba(${r},${g},${b},calc(var(--glow-intensity,0) * 0.35)) 30%,
            transparent 65%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          zIndex: 1,
        }}
      />

      {/* Header */}
      <div className="flex justify-between items-start relative z-[2]">
        <span
          className="text-[9px] tracking-[0.18em] uppercase"
          style={{ color: '#C9A84C', fontFamily: "'Space Mono', monospace", opacity: 0.8 }}
        >
          {service.num} — {service.tag}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-[2]">
        <h3
          className="text-lg font-semibold uppercase tracking-wide mb-2 whitespace-pre-line"
          style={{ color: '#F0F2F8', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.04em' }}
        >
          {service.name}
        </h3>
        <p
          className="text-xs leading-relaxed"
          style={{ color: 'rgba(200,208,220,0.65)', fontFamily: "'Rajdhani', sans-serif", fontWeight: 300 }}
        >
          {service.body}
        </p>
      </div>
    </div>
  );
}

// ─── Global spotlight ─────────────────────────────────────────────────────────
function useGlobalSpotlight(gridRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia('(max-width:768px)').matches) return;

    const spot = document.createElement('div');
    spot.style.cssText = `
      position:fixed;width:700px;height:700px;border-radius:50%;pointer-events:none;
      background:radial-gradient(circle,rgba(201,168,76,0.12) 0%,rgba(201,168,76,0.06) 15%,
        rgba(201,168,76,0.03) 28%,rgba(201,168,76,0.01) 45%,transparent 65%);
      z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;
      transition:opacity 0.2s ease;
    `;
    document.body.appendChild(spot);

    const PROXIMITY = 140;
    const FADE_DIST = 210;

    let rafId = 0;
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let targetOpacity = 0, currentOpacity = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      currentX = lerp(currentX, targetX, 0.1);
      currentY = lerp(currentY, targetY, 0.1);
      currentOpacity = lerp(currentOpacity, targetOpacity, 0.1);
      spot.style.left    = `${currentX}px`;
      spot.style.top     = `${currentY}px`;
      spot.style.opacity = String(currentOpacity);
    };
    tick();

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const cards = grid.querySelectorAll<HTMLElement>('[data-bento-card]');
      let minDist = Infinity;
      cards.forEach(card => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top  + r.height / 2;
        const d = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2);
        minDist = Math.min(minDist, d);

        let glow = 0;
        if (d <= PROXIMITY) glow = 1;
        else if (d <= FADE_DIST) glow = (FADE_DIST - d) / (FADE_DIST - PROXIMITY);
        card.style.setProperty('--glow-x', `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty('--glow-y', `${((e.clientY - r.top) / r.height) * 100}%`);
        card.style.setProperty('--glow-intensity', String(glow.toFixed(3)));
      });

      targetOpacity = minDist <= PROXIMITY
        ? 0.75
        : minDist <= FADE_DIST
          ? ((FADE_DIST - minDist) / (FADE_DIST - PROXIMITY)) * 0.75
          : 0;
    };

    const onLeave = () => { targetOpacity = 0; };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      spot.remove();
    };
  }, [gridRef]);
}

// ─── Root component ───────────────────────────────────────────────────────────
export function MagicBento() {
  const gridRef   = useRef<HTMLDivElement>(null);
  const ruleRef   = useRef<HTMLDivElement>(null);
  const isMobile  = typeof window !== 'undefined' && window.innerWidth <= 768;

  useGlobalSpotlight(gridRef);

  // Gold rule reveal
  useEffect(() => {
    const rule = ruleRef.current;
    if (!rule) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        rule.style.width = '120px';
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(rule);
    return () => observer.disconnect();
  }, []);

  // Staggered card entry
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-bento-card]'));
    cards.forEach(c => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(24px)';
      c.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    });
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        cards.forEach((c, i) => {
          setTimeout(() => {
            c.style.opacity = '1';
            c.style.transform = 'translateY(0)';
          }, i * 80);
        });
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  // Load fonts
  useEffect(() => {
    if (document.querySelector('[data-tts-fonts]')) return;
    const link = document.createElement('link');
    link.setAttribute('data-tts-fonts', '');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;600;700&family=Space+Mono:wght@400&family=Inter:wght@300;400&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <section
      id="services"
      className="relative py-24 px-4"
      style={{ background: '#0A0D1A' }}
    >
      {/* Section header */}
      <div className="text-center mb-14">
        <p
          className="text-[10px] tracking-[0.22em] uppercase mb-4"
          style={{ color: '#C9A84C', fontFamily: "'Space Mono', monospace" }}
        >
          What We Build
        </p>

        {/* Animated gold rule */}
        <div
          ref={ruleRef}
          className="mx-auto mb-5 h-px rounded-sm"
          style={{
            width: 0,
            background: '#C9A84C',
            transition: 'width 1s cubic-bezier(0.16,1,0.3,1)',
          }}
        />

        <h2
          className="text-4xl md:text-5xl font-bold uppercase leading-none mb-4"
          style={{
            color: '#F0F2F8',
            fontFamily: "'Rajdhani', sans-serif",
            letterSpacing: '0.03em',
          }}
        >
          Six Disciplines.<br />One Studio.
        </h2>
        <p
          className="mx-auto text-sm leading-relaxed max-w-md"
          style={{
            color: 'rgba(200,208,220,0.6)',
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 300,
          }}
        >
          Every engagement begins with your operation — not a template. We architect
          the exact capability your business demands.
        </p>
      </div>

      {/* Bento grid */}
      <div
        ref={gridRef}
        className="mx-auto"
        style={{
          display: 'grid',
          gap: '0.6em',
          padding: '0.75em',
          maxWidth: '62em',
          gridTemplateColumns: 'repeat(1, 1fr)',
        }}
      >
        {SERVICES.map((service, i) => (
          <div key={i} data-bento-card="" style={{ display: 'contents' }}>
            <BentoCard service={service} isMobile={isMobile} />
          </div>
        ))}
      </div>

      {/* Responsive grid CSS */}
      <style>{`
        @media (min-width: 600px) {
          #services .bento-grid-inner { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          #services .bento-grid-inner { grid-template-columns: repeat(4, 1fr); }
          #services [data-bento-card]:nth-child(3) > div { grid-column: span 2; grid-row: span 2; }
          #services [data-bento-card]:nth-child(4) > div { grid-column: 1 / span 2; grid-row: 2 / span 2; }
          #services [data-bento-card]:nth-child(6) > div { grid-column: 4; grid-row: 3; }
        }
      `}</style>
    </section>
  );
}
