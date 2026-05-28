import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Users, Truck, Network, RefreshCw, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/tts/Nav";
import { Footer } from "@/components/tts/Footer";
import { TerraFeatureGrid } from "@/components/tts/FeatureVideo";
import terraLogo from "@/assets/terra-logo.png";

const TERRA = {
  brown: "#3b2410",
  brownDeep: "#1a0f06",
  brownMid: "#241608",
  cream: "#f4e9d2",
  green: "#7ac462",
  greenLight: "#9bd98a",
  tan: "#c9a47a",
  clay: "#8b5a2b",
};

export const Route = createFileRoute("/projects/terra-farming")({
  head: () => ({
    meta: [
      { title: "Terra Farming — Tailored Tech Solutions" },
      { name: "description", content: "Terra Farming — agriculture intelligence platform connecting farmers, buyers, drivers, and HQ. Built by Tailored Tech Solutions." },
      { property: "og:title", content: "Terra Farming — Agriculture Intelligence Platform" },
      { property: "og:description", content: "Multi-role farm-to-table marketplace with real-time logistics, compliance, and commission engine. Built by Tailored Tech Solutions." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://tailoredtechsolutions.org/projects/terra-farming" },
      { name: "twitter:title", content: "Terra Farming — Agriculture Intelligence Platform" },
      { name: "twitter:description", content: "Multi-role farm-to-table marketplace with real-time logistics, compliance, and commission engine. Built by Tailored Tech Solutions." },
    ],
    links: [
      { rel: "canonical", href: "https://tailoredtechsolutions.org/projects/terra-farming" },
    ],
  }),
  component: TerraFarmingPage,
});

function TerraFarmingPage() {
  return (
    <div className="text-chrome relative" style={{ background: TERRA.brownDeep, minHeight: "100vh" }}>
      <Nav />
      <main>
        <section
          className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden"
          style={{ background: `linear-gradient(160deg, ${TERRA.brown} 0%, ${TERRA.brownDeep} 60%, #0a0502 100%)` }}
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: `radial-gradient(circle at 80% 20%, ${TERRA.green}55, transparent 50%), radial-gradient(circle at 20% 80%, ${TERRA.tan}55, transparent 50%)` }}
          />
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-12">
            <Link
              to="/"
              hash="projects"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest"
              style={{ color: TERRA.tan }}
            >
              <ArrowLeft size={14} /> All projects
            </Link>

            <div className="mt-10 grid md:grid-cols-[1.1fr_1fr] gap-12 items-center">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest" style={{ color: TERRA.green }}>
                  Case Study · Agriculture Intelligence
                </div>
                <h1
                  className="mt-4 font-display text-5xl md:text-7xl font-extrabold tracking-tighter"
                  style={{ color: TERRA.cream }}
                >
                  Terra <span style={{ color: TERRA.greenLight }}>Farming</span>
                </h1>
                <p className="mt-5 text-lg" style={{ color: "#d8c9ad" }}>
                  Multi-role farm-to-table marketplace with real-time logistics, compliance, and commission engine.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "Multi-Role Platform",
                    "Real-Time Logistics",
                    "Direct Market",
                    "Commission Engine",
                  ].map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-3 py-1.5 rounded-full"
                      style={{ border: `1px solid ${TERRA.green}66`, color: TERRA.cream, background: `${TERRA.green}14` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative flex justify-center">
                <div
                  className="rounded-3xl p-10 border-2 shadow-[0_30px_60px_-20px_rgba(122,196,98,0.35)]"
                  style={{ background: `linear-gradient(140deg, ${TERRA.brown} 0%, ${TERRA.brownDeep} 100%)`, borderColor: `${TERRA.green}55` }}
                >
                  <img src={terraLogo} alt="Terra Farming logo" className="w-full max-w-sm h-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-28" style={{ background: TERRA.brownDeep }}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="eyebrow" style={{ color: TERRA.green }}>The Brief</div>
                <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold" style={{ color: TERRA.cream }}>
                  Unify the agricultural supply chain under one intelligent platform.
                </h2>
                <p className="mt-5 leading-relaxed" style={{ color: "#d8c9ad" }}>
                  Terra Farming connects every stakeholder in the agricultural value chain — from field to fork.
                  Farmers list produce, buyers place orders, drivers manage deliveries, and HQ oversees
                  inventory and compliance — all in real time, on any device.
                </p>
              </div>
              <div>
                <div className="eyebrow" style={{ color: TERRA.green }}>What We Built</div>
                <ul className="mt-3 space-y-4">
                  {[
                    { Icon: Users, t: "Multi-role dashboards", s: "Dedicated interfaces for Farmer, Buyer, Driver, Admin, and HQ." },
                    { Icon: Truck, t: "Real-time logistics", s: "Live GPS tracking, route optimization, and delivery notifications." },
                    { Icon: Network, t: "Direct market connections", s: "Peer-to-peer trading with no intermediaries or hidden fees." },
                    { Icon: RefreshCw, t: "Supabase-powered sync", s: "Instant data propagation across all roles and devices." },
                    { Icon: ShieldCheck, t: "Compliance & reporting", s: "Automated documentation, audits, and commission calculations." },
                  ].map(({ Icon, t, s }) => (
                    <li key={t} className="flex items-start gap-4">
                      <span
                        className="shrink-0 w-10 h-10 rounded-md flex items-center justify-center"
                        style={{ background: `${TERRA.green}1f`, border: `1px solid ${TERRA.green}66` }}
                      >
                        <Icon size={16} style={{ color: TERRA.greenLight }} />
                      </span>
                      <div>
                        <div className="font-medium" style={{ color: TERRA.cream }}>{t}</div>
                        <div className="text-sm" style={{ color: "#a89a82" }}>{s}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl p-8" style={{ background: `${TERRA.green}10`, border: `1px solid ${TERRA.green}55` }}>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest" style={{ color: TERRA.green }}>Engagement</div>
                <div className="mt-1 font-display text-2xl md:text-3xl font-bold" style={{ color: TERRA.cream }}>
                  Built and shipped by Tailored Tech Solutions
                </div>
              </div>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all"
                style={{ background: TERRA.green, color: TERRA.brownDeep }}
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
