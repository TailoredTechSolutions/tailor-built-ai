import { useRef, useEffect, useState } from "react";
import { Play } from "lucide-react";

export interface FeatureVideoProps {
  src: string;
  poster?: string;
  index: string;
  title: string;
  caption?: string;
}

export function FeatureVideo({ src, poster, index, title, caption }: FeatureVideoProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [hover, setHover] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [inView, setInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // FIX 1: React JSX `muted` prop does NOT reliably set the DOM .muted property.
  // React calls setAttribute internally, but the browser autoplay policy checks
  // the DOM property element.muted — not the HTML attribute. Without this useEffect,
  // play() throws NotAllowedError and the video never plays on hover.
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  // Detect touch-only device (no hover capability)
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  // FIX 2: Play / pause + voiceover audio management.
  // Sequence:
  //   1. Always start muted so autoplay policy allows play()
  //   2. After play() resolves successfully, unmute -> voiceover starts
  //   3. On hover-end OR scroll-out: mute first, then pause (prevents audio pop)
  // The `cancelled` flag guards the race where the mouse leaves before play() resolves.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const shouldPlay = inView && (hover || toggled);
    let cancelled = false;

    if (shouldPlay) {
      v.muted = true;
      const promise = v.play();

      if (promise && typeof promise.then === "function") {
        promise
          .then(() => {
            if (cancelled) return;
            setIsPlaying(true);
            v.muted = false;
          })
          .catch((err: DOMException) => {
            if (cancelled) return;
            if (err?.name !== "AbortError") {
              setIsPlaying(false);
            }
          });
      } else {
        if (!cancelled) {
          setIsPlaying(true);
          v.muted = false;
        }
      }
    } else {
      v.muted = true;
      v.pause();
      setIsPlaying(false);
    }

    return () => {
      cancelled = true;
    };
  }, [inView, hover, toggled]);

  // FIX 3: Lower IntersectionObserver threshold from 0.4 to 0.2.
  // Bottom-row cards in the 5-col grid are typically 25-35% visible on hover.
  // At 0.4 threshold, inView stayed false -> play() was never called.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.intersectionRatio >= 0.2;
        setInView(visible);
        if (!visible) {
          if (videoRef.current) {
            videoRef.current.muted = true;
          }
          setHover(false);
          setToggled(false);
        }
      },
      { threshold: [0, 0.2, 0.4, 1] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mute + stop when tab is hidden
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        if (videoRef.current) {
          videoRef.current.muted = true;
        }
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
        "hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-bright)]/60",
        isPlaying
          ? "border-[var(--gold-bright)]/50 shadow-[0_30px_60px_-28px_rgba(212,168,67,0.45)]"
          : "border-white/10",
      ].join(" ")}
    >
      {/* NOTE: muted is intentionally NOT set as a JSX prop here.
          It is set via DOM property in the useEffect above (Fix 1).
          The JSX muted prop silently fails in React and breaks autoplay. */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Hint pill */}
      <div className="absolute right-3 top-3 z-20 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-chrome backdrop-blur-md">
        {isTouch ? "Tap" : "Hover"} · Play
      </div>

      {/* Play overlay — hidden while playing */}
      <div
        className={[
          "absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-opacity duration-500",
          isPlaying ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--gold-bright)]/40 bg-black/40 backdrop-blur-md">
          <Play size={22} className="text-[var(--gold-bright)]" fill="currentColor" />
        </div>
      </div>

      {/* Label */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-gold-dim">{index}</div>
        <div className="mt-1 text-sm font-semibold text-chrome">{title}</div>
        {caption ? <div className="mt-0.5 text-xs text-muted-soft">{caption}</div> : null}
      </div>
    </div>
  );
}

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
    <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 mt-20">
      <div className="eyebrow mb-4">[ Feature Reel ]</div>
      <h3 className="font-display text-3xl md:text-5xl font-extrabold tracking-tighter text-chrome mb-10">
        Ten beats. <span className="gold-text-gradient italic">Hover to play.</span>
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
        {features.map((f) => (
          <FeatureVideo key={f.index} {...f} />
        ))}
      </div>
    </div>
  );
}
