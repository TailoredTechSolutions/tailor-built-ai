export function Logo({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex items-center justify-center rounded-lg border"
        style={{
          width: size,
          height: size,
          borderColor: "var(--gold-bright)",
          background: "rgba(212,168,67,0.08)",
          boxShadow: "inset 0 0 12px rgba(212,168,67,0.2)",
        }}
      >
        <svg viewBox="0 0 24 24" className="text-gold" width={size * 0.55} height={size * 0.55} fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2 L20 5 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V5 Z" />
          <path d="M12 8 L14 10 L12 14 L10 10 Z" fill="currentColor" stroke="none" />
          <path d="M9 14 L9 18 M15 14 L15 18" />
        </svg>
      </div>
      <span className="font-display text-[15px] font-extrabold tracking-tight text-chrome">
        Tailored<span className="text-gold">Tech</span>
      </span>
    </div>
  );
}
