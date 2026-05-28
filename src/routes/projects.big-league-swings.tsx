import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Smartphone, Activity, MapPin, Users } from "lucide-react";
import { Nav } from "@/components/tts/Nav";
import { Footer } from "@/components/tts/Footer";
import blsLogo from "@/assets/big-league-swings-logo.png";

const BLS = {
  navy: "#0a1b4d",
  navyDeep: "#06102e",
  blue: "#3b82f6",
  blueLight: "#60a5fa",
  red: "#dc2626",
  cream: "#f8fafc",
};

export const Route = createFileRoute("/projects/big-league-swings")({
  head: () => ({
    meta: [
      { title: "Big League Swings — Tailored Tech Solutions" },
      { name: "description", content: "Big League Swings — a mobile Hit Trax experience built by Tailored Tech Solutions. Pro-grade batting analytics, on the road." },
      { property: "og:title", content: "Big League Swings — Mobile Hit Trax Experience" },
      { property: "og:description", content: "Mobile batting-cage platform with Hit Trax integration. Built by Tailored Tech Solutions." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://tailoredtechsolutions.org/projects/big-league-swings" },
      { name: "twitter:title", content: "Big League Swings — Mobile Hit Trax Experience" },
      { name: "twitter:description", content: "Mobile batting-cage platform with Hit Trax integration. Built by Tailored Tech Solutions." },
    ],
    links: [
      { rel: "canonical", href: "https://tailoredtechsolutions.org/projects/big-league-swings" },
    ],
  }),
  component: BigLeagueSwingsPage,
});

function BigLeagueSwingsPage() {
  return (
    <div className="text-chrome relative" style={{ background: BLS.navyDeep, minHeight: "100vh" }}>
      <Nav />
      <main>
        <section
          className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden"
          style={{ background: `linear-gradient(160deg, ${BLS.navy} 0%, ${BLS.navyDeep} 60%, #03081f 100%)` }}
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: `radial-gradient(circle at 80% 20%, ${BLS.red}55, transparent 50%), radial-gradient(circle at 20% 80%, ${BLS.blue}55, transparent 50%)` }}
          />
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-12">
            <Link
              to="/"
              hash="projects"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest"
              style={{ color: BLS.blueLight }}
            >
              <ArrowLeft size={14} /> All projects
            </Link>

            <div className="mt-10 grid md:grid-cols-[1.1fr_1fr] gap-12 items-center">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest" style={{ color: BLS.red }}>
                  Case Study · Sports Tech
                </div>
                <h1
                  className="mt-4 font-display text-5xl md:text-7xl font-extrabold tracking-tighter"
                  style={{ color: BLS.cream }}
                >
                  Big League <span style={{ color: BLS.blueLight }}>Swings</span>
                </h1>
                <p className="mt-5 text-lg" style={{ color: "#cbd5e1" }}>
                  A mobile Hit Trax experience — pro-grade batting analytics delivered anywhere the field can be set up.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "Hit Trax Integration",
                    "Mobile-First",
                    "Live Leaderboards",
                    "Event Booking",
                  ].map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-3 py-1.5 rounded-full"
                      style={{ border: `1px solid ${BLS.blue}66`, color: BLS.cream, background: `${BLS.blue}14` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative flex justify-center">
                <div
                  className="rounded-3xl p-10 border-2 shadow-[0_30px_60px_-20px_rgba(59,130,246,0.45)]"
                  style={{ background: `linear-gradient(140deg, ${BLS.navy} 0%, ${BLS.navyDeep} 100%)`, borderColor: `${BLS.blue}55` }}
                >
                  <img src={blsLogo} alt="Big League Swings logo" className="w-full max-w-sm h-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-28" style={{ background: BLS.navyDeep }}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="eyebrow" style={{ color: BLS.red }}>The Brief</div>
                <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold" style={{ color: BLS.cream }}>
                  Turn a stadium-grade experience into a mobile one.
                </h2>
                <p className="mt-5 leading-relaxed" style={{ color: "#cbd5e1" }}>
                  Big League Swings brings the Hit Trax batting analytics experience out of the cage and onto the road —
                  for clinics, corporate events, leagues, and pop-up activations. The platform handles booking,
                  on-site session management, live leaderboards, and post-event recaps for every player.
                </p>
              </div>
              <div>
                <div className="eyebrow" style={{ color: BLS.red }}>What We Built</div>
                <ul className="mt-3 space-y-4">
                  {[
                    { Icon: Smartphone, t: "Mobile booking & check-in", s: "Self-serve event reservations and on-site QR check-in." },
                    { Icon: Activity, t: "Hit Trax data pipeline", s: "Live exit velocity, launch angle, distance — synced per player." },
                    { Icon: Users, t: "Player profiles & leaderboards", s: "Persistent IDs, session history, and live event leaderboards." },
                    { Icon: MapPin, t: "Event ops dashboard", s: "Travel-day scheduling, equipment routing, and post-event recaps." },
                  ].map(({ Icon, t, s }) => (
                    <li key={t} className="flex items-start gap-4">
                      <span
                        className="shrink-0 w-10 h-10 rounded-md flex items-center justify-center"
                        style={{ background: `${BLS.blue}1f`, border: `1px solid ${BLS.blue}66` }}
                      >
                        <Icon size={16} style={{ color: BLS.blueLight }} />
                      </span>
                      <div>
                        <div className="font-medium" style={{ color: BLS.cream }}>{t}</div>
                        <div className="text-sm" style={{ color: "#94a3b8" }}>{s}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl p-8" style={{ background: `${BLS.blue}10`, border: `1px solid ${BLS.blue}55` }}>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest" style={{ color: BLS.red }}>Engagement</div>
                <div className="mt-1 font-display text-2xl md:text-3xl font-bold" style={{ color: BLS.cream }}>
                  Built and shipped by Tailored Tech Solutions
                </div>
              </div>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all"
                style={{ background: BLS.red, color: BLS.cream }}
              >
                Start a project
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}