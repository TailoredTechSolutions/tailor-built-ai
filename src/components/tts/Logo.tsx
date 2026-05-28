import logoImg from "@/assets/tailored-tech-logo.jpeg";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex items-center justify-center overflow-hidden rounded-lg border"
        style={{
          width: size,
          height: size,
          borderColor: "var(--gold-bright)",
          background: "rgba(212,168,67,0.08)",
          boxShadow: "inset 0 0 12px rgba(212,168,67,0.2)",
        }}
      >
        <img
          src={logoImg}
          alt="Tailored Tech Solutions logo"
          width={size}
          height={size}
          className="h-full w-full object-cover object-left"
        />
      </div>
      <span className="font-display text-[15px] font-extrabold tracking-tight text-chrome">
        Tailored<span className="text-gold">Tech</span>
      </span>
    </div>
  );
}
