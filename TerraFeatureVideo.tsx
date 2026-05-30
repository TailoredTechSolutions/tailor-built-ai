import { useRef, useEffect, useState } from "react";
import { Play } from "@phosphor-icons/react";

/**
 * FeatureVideo
 * ---------------------------------------------------------------------------
 * Desktop  : mouse enters -> plays. Mouse leaves -> pauses.
 * Mobile   : tap toggles play/pause (no hover exists on touch devices).
 * Always   : when the card scrolls out of view (<40% visible) it pauses AND
 *            resets the mobile tap state, so it won't resume on its own.
 * Battery  : pauses if the browser tab is hidden.
 *
 * Stack: React + TypeScript + Tailwind + Phosphor icons (lovable default).
 * Drop one <FeatureVideo /> per highlight beat from terra-voiceover-script.md.
 */

interface FeatureVideoProps {
  /** Path/URL to the mp4 (narrated clip). */
  src: string;
  /** Optional poster image shown before playback. */
  poster?: string;
  /** Slide index label, e.g. "01". */
  index: string;
  /** Feature title, e.g. "Multi-Farm Price Compare". */
  title: string;
  /** Optional one-line caption under the title. */
  caption?: string;
}

export function FeatureVideo({ src, poster, index, title, caption }: FeatureVideoProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [hover, setHover] = useState(false);
  const [toggled, setToggled] = useState(false); // mobile tap state
  const [inView, setInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Detect a no-hover (touch) device once on mount.
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  // Single source of truth: play only when in view AND (hovered or tapped-on).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const shouldPlay = inView && (hover || toggled);

    if (shouldPlay) {
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.then(() => setIsPlaying(true)).catch((err: DOMException) => {
          // AbortError just means a newer play/pause interrupted us — ignore.
          if (err?.name !== "AbortError") setIsPlaying(false);
        });
      } else {
        setIsPlaying(true);
      }
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, [inView, hover, toggled]);

  // Pause + reset state when the card leaves the viewport.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.intersectionRatio >= 0.4;
        setInView(visible);
        if (!visible) {
          setHover(false);
          setToggled(false);
        }
      },
      { threshold: [0, 0.4, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pause when the tab is backgrounded.
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        setHover(false);
        setToggled(false);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => !isTouch && setHover(true)}
      onMouseLeave={() => !isTouch && setHover(false)}
      onClick={() => isTouch && setToggled((t) => !t)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setToggled((t) => !t);
        }
      }}
      aria-label={`${title} — ${isTouch ? "tap" : "hover"} to play`}
      className={[
        "group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-3xl",
        "border bg-[#0a0f1c] transition-all duration-500 ease-out",
        "hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
        isPlaying ? "border-cyan-300/50 shadow-[0_30px_60px_-28px_rgba(92,198,255,0.45)]" : "border-white/10",
      ].join(" ")}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Hint pill */}
      <div className="absolute left-3 top-3 z-20 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-300 backdrop-blur">
        {isTouch ? "Tap" : "Hover"} &middot; Play
      </div>

      {/* Poster / play overlay (fades out while playing) */}
      <div
        className={[
          "pointer-events-none absolute inset-0 flex items-center justify-center",
          "bg-gradient-to-b from-black/10 to-black/50 transition-opacity duration-300",
          isPlaying ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/40 bg-black/40 backdrop-blur">
          <Play weight="fill" className="h-5 w-5 text-cyan-200" />
        </span>
      </div>

      {/* Label */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#05070d]/95 to-transparent p-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">{index}</div>
        <div className="mt-1 text-[15px] font-medium leading-tight text-slate-100">{title}</div>
        {caption ? <div className="mt-1 text-xs text-slate-400">{caption}</div> : null}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Example grid — drop into your Terra Farming section.
 * Replace the src paths with your narrated clips (see terra-voiceover-script.md).
 * ------------------------------------------------------------------------- */
export function TerraFeatureGrid() {
  const features: FeatureVideoProps[] = [
    { index: "01", title: "From Dirt to Dessert", caption: "PH's first farm-to-table marketplace", src: "/videos/terra-01.mp4" },
    { index: "02", title: "Multi-Farm Price Compare", caption: "Every farm, side by side, Best Price badge", src: "/videos/terra-02.mp4" },
    { index: "03", title: "Compliance-First", caption: "KYC/KYB + PhilGAP on every card", src: "/videos/terra-03.mp4" },
    { index: "04", title: "The Terra Journey", caption: "Soil to table in four steps", src: "/videos/terra-04.mp4" },
    { index: "05", title: "Business Centre", caption: "Super Admin, one pane of glass", src: "/videos/terra-05.mp4" },
    { index: "06", title: "The Fail-Safe", caption: "Mathematical payout guarantee", src: "/videos/terra-06.mp4" },
    { index: "07", title: "Multi-Role System", caption: "One account, seven roles", src: "/videos/terra-07.mp4" },
    { index: "08", title: "Commission Engine", caption: "BV rules hardcoded, not policy", src: "/videos/terra-08.mp4" },
    { index: "09", title: "Financial Control", caption: "Append-only ledger, dual approval", src: "/videos/terra-09.mp4" },
    { index: "10", title: "Network & Growth", caption: "Binary tree + referral funnel", src: "/videos/terra-10.mp4" },
  ];

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {features.map((f) => (
        <FeatureVideo key={f.index} {...f} />
      ))}
    </div>
  );
}
