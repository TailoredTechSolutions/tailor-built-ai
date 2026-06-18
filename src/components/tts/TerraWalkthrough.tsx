import { useState, useEffect, useCallback } from "react";

const TERRA = {
  bg:       "#0c160e",
  surface:  "#111f14",
  green:    "#39d98a",
  greenDim: "#1e7a4a",
  greenGlow:"rgba(57,217,138,0.12)",
  gold:     "#C9A84C",
  cream:    "#f4e9d2",
  body:     "#a7bfad",
  muted:    "#6b7f72",
  border:   "rgba(57,217,138,0.12)",
  borderHi: "rgba(57,217,138,0.32)",
};

const SECTIONS = [
  { num:"01", screen:"LANDING PAGE — HERO", role:"Public", title:"From Dirt to Dessert",
    tagline:"Philippines\'first farm-to-table marketplace — connecting highland Benguet farmers to buyers nationwide.",
    chips:["100% Organic","Same-Day Delivery","KYC Verified","DA-Registered"], clip:"0:00–0:30",
    vo:`Welcome to Terra Farming — the Philippines\' first farm-to-table digital marketplace connecting highland Benguet farmers directly to businesses and consumers.\n\nThe hero positions Terra with its core promise: 100% organic, same-day delivery, real-time tracking, and quality guaranteed. Trust signals anchor the bottom — DA-Registered, SEC Compliant, and KYC Verified.\n\nThree headline stats tell the scale story: 50+ partner farms, 1K+ happy customers, and 24hr delivery time.`,
    callouts:["100% Organic · Same-Day Delivery — the two-line promise above the fold","Trust badges: DA-Registered · SEC Compliant · KYC Verified","Stats: 50+ Partner Farms · 1K+ Customers · 24hr Delivery"],
    next:"AI intelligence layer" },
  { num:"02", screen:"AI ASSISTANT — RECOMMENDATIONS", role:"All Users", title:"AI Intelligence Layer",
    tagline:"Conversational AI that knows your harvest calendar, your buyers, and your inventory — before you do.",
    chips:["Natural Language","Role-Aware","Harvest Prediction","Demand Forecast"], clip:"0:30–1:00",
    vo:`Terra\'s embedded AI assistant surfaces at every screen. Ask it anything: "What\'s in season from Benguet this week?" or "Which buyers ordered strawberries last month?"\n\nThe assistant cross-references live inventory, seasonal data, and order history to give precise, actionable answers. This isn\'t a chatbot — it\'s an agricultural intelligence layer built directly into the platform.\n\nFarmers get harvest predictions. Buyers get availability alerts. Admins get demand forecasting. One model, three different outputs depending on your role.`,
    callouts:["Natural language query bar — accessible from any screen","Role-aware output: different answer for Farmer vs Buyer vs Admin","30-day demand forecast powered by 12 months of order history"],
    next:"Buyer Dashboard" },
  { num:"03", screen:"BUYER DASHBOARD — ORDER CENTER", role:"Buyer", title:"Order at Scale, Delivered by Morning",
    tagline:"Your complete procurement dashboard — browse, order, track, and reorder from every partner farm in one screen.",
    chips:["50+ Farms","Smart Reorder","MOQ Filters","Freshness Score"], clip:"1:00–1:30",
    vo:`The Buyer Dashboard is designed for volume. Restaurants, hotels, and supermarkets browse live inventory from 50+ partner farms, filter by certification, minimum order quantity, or delivery window, and place orders in under three minutes.\n\nSmart reorder detection flags your top recurring items the moment stock is available. Every order card shows per-item freshness ratings, farm origin, harvest date, and estimated arrival.\n\nOne tap dispatches the order. A driver is assigned within seconds.`,
    callouts:["Live inventory with DA cert, MOQ, and delivery window filters","Smart reorder: top recurring SKUs flagged when in stock","Per-item card: freshness score + farm origin + harvest date + ETA"],
    next:"real-time tracking" },
  { num:"04", screen:"REAL-TIME ORDER TRACKING", role:"Buyer / Farmer", title:"Live Farm Gate to Your Door",
    tagline:"GPS-pinned tracking updated every 90 seconds — from harvest confirmation to final delivery.",
    chips:["GPS 90s Update","5-Stage Milestones","Push Alerts","QR Manifest"], clip:"1:30–2:00",
    vo:`Once an order is dispatched, Terra\'s tracking layer activates. A live map shows the driver\'s position updated every 90 seconds, with a dynamic ETA recalculating based on traffic and route conditions.\n\nStatus milestones fire in sequence: Order Confirmed, Harvested, Packed, In Transit, Delivered. Each step triggers a push notification and an in-app status card.\n\nFor buyers receiving large orders, the delivery manifest is auto-generated at packing — itemized, weight-verified, and QR-coded for receiving.`,
    callouts:["Live GPS map — driver position every 90 seconds, ETA auto-updates","5-stage milestone system with push notifications at every step","Auto-generated QR manifest: weight + item count locked at packing"],
    next:"Farmer Dashboard" },
  { num:"05", screen:"FARMER / PARTNER DASHBOARD", role:"Farmer", title:"Your Farm. Your Schedule.",
    tagline:"Full inventory control, order management, and earnings visibility — built for highland farmers.",
    chips:["40s Listing","One-Tap Accept","GCash Payout","Offline-Ready"], clip:"2:00–2:30",
    vo:`The Farmer Dashboard gives growers complete control without complexity. Add produce with a photo and a weight estimate, set your price, toggle availability — forty seconds.\n\nIncoming orders arrive as job cards with all delivery details pre-populated. One tap to accept. Another to mark harvested. The platform handles driver dispatch, buyer notification, and payment release.\n\nEarnings track in real time. Payouts hit GCash or bank within 24 hours of confirmed delivery.`,
    callouts:["40-second listing: photo + weight + price + availability toggle","Job card: one-tap accept → mark harvested → platform dispatches","Real-time earnings with GCash and bank payout integration"],
    next:"Admin Panel" },
  { num:"06", screen:"ADMIN PANEL — OPERATIONS HQ", role:"Admin", title:"Full Visibility. Total Control.",
    tagline:"The operations command center — manage every farmer, buyer, driver, and order from one panel.",
    chips:["KYC Status","Dispute Tools","No-Code Config","Inventory Flags"], clip:"2:30–3:00",
    vo:`The Admin Panel is where Terra\'s operators manage the entire marketplace. Every farmer\'s KYC status, every buyer\'s order history, every driver\'s active route — all visible from one dashboard.\n\nDispute resolution tools let admins mediate order issues, issue partial refunds, or escalate to quality control with a single workflow.\n\nPlatform-wide announcements, delivery fee structures, and delivery zones are all configurable here — no code required.`,
    callouts:["Master view: all KYC statuses, buyer orders, driver routes in one grid","Dispute workflow: mediate → partial refund → escalate, single flow","No-code config: fees, delivery zones, platform announcements"],
    next:"Driver Dashboard" },
  { num:"07", screen:"DRIVER DASHBOARD — DELIVERY", role:"Driver", title:"Pick Up. Deliver. Get Paid.",
    tagline:"Proximity-sorted job cards, live route optimization, and instant earnings on confirmation.",
    chips:["Proximity Sort","QR Scan","Route Optimize","Instant Pay"], clip:"3:00–3:30",
    vo:`Drivers open Terra to a live feed of pickup jobs sorted by proximity and payout. Accept a job, get the farm\'s GPS pin, navigate directly from the app.\n\nAt pickup, a QR scan locks the manifest — weight, item count, and buyer details confirmed. During delivery, the route is optimized in real time. On arrival, the buyer scans to confirm receipt.\n\nEarnings credit instantly on confirmation. Daily summaries show completed runs, total weight hauled, and gross earnings.`,
    callouts:["Job feed: proximity-sorted, tap to accept, GPS nav launches immediately","QR scan at pickup locks manifest weight and item count","Instant earnings credit the moment buyer confirms receipt"],
    next:"the Marketplace catalog" },
  { num:"08", screen:"MARKETPLACE — PRODUCT CATALOG", role:"Buyer / Public", title:"Highland Produce, Priced at Source",
    tagline:"Browse 200+ SKUs from certified Benguet farms — filtered by availability, certification, and price.",
    chips:["200+ SKUs","DA Certified","Tiered Pricing","Daily 6AM Refresh"], clip:"3:30–4:00",
    vo:`The Marketplace is the public-facing storefront. Buyers browse over 200 active SKUs organized by category: Leafy Greens, Root Crops, Fruits, Herbs, and Specialty Produce.\n\nEvery listing shows the farm name, DA certification badge, current availability in kilos, price per kilo, and minimum order quantity. Freshness scores are calculated from harvest date.\n\nBulk ordering triggers tiered pricing. The catalog refreshes every morning at 6AM from live farm harvest logs.`,
    callouts:["200+ SKUs: Leafy Greens · Root Crops · Fruits · Herbs · Specialty","Freshness score from actual harvest date — not estimated","Tiered pricing at bulk MOQ; recurring buyers get preferred windows"],
    next:"Quality Control" },
  { num:"09", screen:"QUALITY CONTROL — PHOTO VERIFY", role:"Admin / Farmer", title:"Every Box. Verified.",
    tagline:"Mandatory photo capture at packing creates a verifiable quality trail from farm gate to delivery.",
    chips:["Mandatory Photo","Timestamped","Geotagged","Quality Score"], clip:"4:00–4:30",
    vo:`Terra\'s quality layer is built into the packing step — not bolted on afterward. When a farmer marks an order packed, they must photograph the produce: weight verified, items counted, packaging intact.\n\nThese photos are timestamped, geotagged, and permanently attached to the order record. If a buyer raises a quality dispute, the photo evidence is already in the system.\n\nQuality scores feed back into the farmer\'s platform rating, which affects their search ranking and payout tier.`,
    callouts:["Mandatory photo: timestamped, geotagged, locked to order permanently","Dispute evidence pre-built — photos exist before any complaint is filed","Quality score → farmer search ranking and payout tier recalculation"],
    next:"HQ Analytics" },
  { num:"10", screen:"ANALYTICS — HQ VIEW", role:"Admin / HQ", title:"Data That Grows the Business",
    tagline:"Live GMV, farm performance rankings, route efficiency, and 30-day demand forecasting.",
    chips:["Live GMV","Farm Rankings","Route Efficiency","30-Day Forecast"], clip:"4:30–5:00",
    vo:`The HQ Analytics view gives leadership a live pulse on the entire marketplace. Gross Merchandise Value, order count, average basket size, and delivery success rate all update in real time.\n\nFarm performance rankings let admins identify top producers and flag underperformers. Route efficiency metrics expose delivery bottlenecks.\n\nDemand forecasting models surface produce categories most likely to spike in the next 30 days, giving farming partners advance notice.`,
    callouts:["Live: GMV · order count · basket size · delivery success rate","Farm performance leaderboard with underperformer flags","30-day demand spike forecast from 12 months of historical data"],
    next:"KYC & Compliance" },
  { num:"11", screen:"KYC & COMPLIANCE CENTER", role:"Admin", title:"Verified at Every Level",
    tagline:"Built-in KYC for farmers, buyers, and drivers — SEC-compliant, DA-registered, audit-ready.",
    chips:["Gov ID Verify","DA Registration","BIR Check","Auto-Freeze"], clip:"5:00–5:30",
    vo:`Terra is built to operate within Philippine regulatory requirements from day one. Every farmer completes KYC: government ID, DA farm registration, and barangay clearance — all stored on-platform.\n\nBuyers verify business registration and tax ID before accessing wholesale pricing. Drivers submit license and vehicle registration before accepting jobs.\n\nExpired documents trigger automatic account freeze and re-verification requests.`,
    callouts:["Farmer KYC: Government ID + DA registration + barangay clearance","Buyer: DTI/SEC registration + BIR TIN for wholesale pricing","Auto-freeze on expired docs — re-verification sent automatically"],
    next:"the mobile app" },
  { num:"12", screen:"MOBILE APP — CAPACITOR NATIVE", role:"All Users (iOS & Android)", title:"Terra in Your Pocket",
    tagline:"Full platform functionality on iOS and Android — offline-capable for highland farmers.",
    chips:["Offline Queue","Native Push","Native Camera","GPS Native"], clip:"5:30–6:00",
    vo:`Terra ships as a native iOS and Android app built on Capacitor, giving highland farmers full platform access even in low-connectivity areas. The app queues actions locally when offline and syncs automatically when signal returns.\n\nPush notifications, camera for photo verification, and GPS tracking all run natively. One codebase. Three role-based experiences: Farmer, Buyer, Driver.`,
    callouts:["Offline-first: actions queued locally, synced on reconnect — no lost data","Native push, camera, and GPS via Capacitor — full device integration","Role-based mobile nav: Farmer / Buyer / Driver UIs from one codebase"],
    next:"Payments & Payouts" },
  { num:"13", screen:"PAYMENTS & PAYOUTS", role:"All Users", title:"Fast Money. Trusted Flow.",
    tagline:"GCash, Maya, bank transfer, and COD — farmers paid within 24 hours of confirmed delivery.",
    chips:["GCash + Maya","Escrow Hold","24hr Payout","Instant Driver Pay"], clip:"6:00–6:30",
    vo:`Terra closes the loop with a fully integrated payment and payout system. Buyers pay via GCash, Maya, bank transfer, or Cash on Delivery. All payments hold in escrow until delivery is confirmed.\n\nOn buyer confirmation, funds release automatically. Farmers receive their payout within 24 hours. Drivers receive their delivery fee instantly.\n\nEvery transaction is logged with a full audit trail.`,
    callouts:["Buyer: GCash · Maya · Bank Transfer · Cash on Delivery","Escrow hold until delivery confirmed — automatic release on buyer scan","Farmer 24hr payout · Driver instant credit · Full audit trail"],
    next:null },
];

export function TerraWalkthrough() {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState<"next"|"prev">("next");
  const [animKey, setAnimKey] = useState(0);
  const s = SECTIONS[current];
  const total = SECTIONS.length;

  const go = useCallback((dir: 1 | -1) => {
    const next = current + dir;
    if (next < 0 || next >= total) return;
    setAnimDir(dir > 0 ? "next" : "prev");
    setAnimKey(k => k + 1);
    setCurrent(next);
  }, [current, total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  const pct = Math.round(((current + 1) / total) * 100);

  return (
    <div style={{ background: TERRA.bg, border: `1px solid ${TERRA.border}`, borderRadius: 16, overflow: "hidden", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{ background: TERRA.surface, borderBottom: `1px solid ${TERRA.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, background: TERRA.green, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🌱</div>
          <div>
            <div style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.06em", color: TERRA.cream }}>TERRA FARMING</div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: TERRA.muted, letterSpacing: "0.15em", textTransform: "uppercase" }}>Platform Walkthrough</div>
          </div>
        </div>
        <div style={{ flex: 1, maxWidth: 320 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: "monospace", fontSize: 9, color: TERRA.muted, letterSpacing: "0.1em" }}>Section {current + 1} of {total}</span>
            <span style={{ fontFamily: "monospace", fontSize: 9, color: TERRA.green }}>{pct}%</span>
          </div>
          <div style={{ height: 3, background: TERRA.bg, borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: pct + "%", background: TERRA.green, borderRadius: 2, transition: "width 0.4s ease", boxShadow: `0 0 8px ${TERRA.greenGlow}` }} />
          </div>
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: TERRA.muted }}>
          <span style={{ color: TERRA.green, fontWeight: 700 }}>{s.num}</span> / {total}
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", minHeight: 420 }}>
        {/* Left — visual */}
        <div style={{ borderRight: `1px solid ${TERRA.border}`, display: "flex", flexDirection: "column" }}>
          {/* Badge row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderBottom: `1px solid ${TERRA.border}`, background: TERRA.surface, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "monospace", fontSize: 10, color: TERRA.green, background: TERRA.greenGlow, border: `1px solid ${TERRA.borderHi}`, padding: "2px 8px", borderRadius: 3 }}>{s.num}</span>
            <span style={{ fontFamily: "monospace", fontSize: 9, color: TERRA.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.screen}</span>
            <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 9, color: TERRA.gold, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", padding: "2px 8px", borderRadius: 3 }}>{s.role}</span>
            <span style={{ fontFamily: "monospace", fontSize: 9, color: TERRA.muted }}>⏱ {s.clip}</span>
          </div>
          {/* Visual area */}
          <div
            key={animKey}
            style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: "32px 24px", gap: 16, position: "relative", overflow: "hidden",
              backgroundImage: "linear-gradient(rgba(57,217,138,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(57,217,138,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              animation: "terraFadeIn 0.35s ease forwards",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(57,217,138,0.08), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", textAlign: "center" }}>
              <div style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(22px,3.5vw,38px)", color: "#fff", lineHeight: 1.1, marginBottom: 12 }}>
                {s.title}
              </div>
              <div style={{ fontSize: 13, color: TERRA.muted, maxWidth: 380, lineHeight: 1.6, marginBottom: 16 }}>{s.tagline}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                {s.chips.map(c => (
                  <span key={c} style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.1em", color: TERRA.green, background: TERRA.greenGlow, border: `1px solid ${TERRA.borderHi}`, padding: "3px 10px", borderRadius: 3, textTransform: "uppercase" }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — script */}
        <div style={{ display: "flex", flexDirection: "column", background: TERRA.surface, overflow: "hidden" }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "18px 20px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: TERRA.green, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
              🎙 Voiceover Script
              <div style={{ flex: 1, height: 1, background: TERRA.border }} />
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.8, color: TERRA.body, marginBottom: 20, whiteSpace: "pre-line" }}>{s.vo}</div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: TERRA.gold, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
              📍 Key Visual Beats
              <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.12)" }} />
            </div>
            {s.callouts.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: `1px solid ${TERRA.border}`, fontSize: 11, color: TERRA.body, lineHeight: 1.5 }}>
                <span style={{ color: TERRA.gold, fontFamily: "monospace", flexShrink: 0 }}>→</span>
                <span>{c}</span>
              </div>
            ))}
            {s.next && (
              <div style={{ marginTop: 16, padding: "8px 12px", background: TERRA.greenGlow, borderLeft: `2px solid ${TERRA.green}`, borderRadius: "0 4px 4px 0", fontSize: 11, color: TERRA.green, fontStyle: "italic", lineHeight: 1.5 }}>
                Next: {s.next}...
              </div>
            )}
          </div>
          {/* ffmpeg strip */}
          <div style={{ padding: "8px 20px", borderTop: `1px solid ${TERRA.border}`, background: TERRA.bg }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: TERRA.muted, letterSpacing: "0.12em", marginBottom: 3 }}>FFMPEG EXPORT</div>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: TERRA.greenDim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {`ffmpeg -i terra_walkthrough.mp4 -ss 00:${s.clip.split("–")[0]}:00 -t 30 -c copy clip_${s.num}.mp4`}
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", borderTop: `1px solid ${TERRA.border}`, background: TERRA.surface, height: 60, gap: 16 }}>
        <button
          onClick={() => go(-1)}
          disabled={current === 0}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: TERRA.bg, border: `1px solid ${TERRA.border}`, borderRadius: 6, color: current === 0 ? TERRA.muted : TERRA.body, fontFamily: "monospace", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", cursor: current === 0 ? "not-allowed" : "pointer", opacity: current === 0 ? 0.3 : 1, transition: "all 0.2s" }}
        >◀ Prev</button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", letterSpacing: "0.04em" }}>{s.screen}</div>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: TERRA.muted, marginTop: 2 }}>← → arrow keys</div>
        </div>
        <button
          onClick={() => go(1)}
          disabled={current === total - 1}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: current === total - 1 ? TERRA.bg : TERRA.green, border: `1px solid ${current === total - 1 ? TERRA.border : TERRA.green}`, borderRadius: 6, color: current === total - 1 ? TERRA.muted : "#0c160e", fontFamily: "monospace", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", cursor: current === total - 1 ? "not-allowed" : "pointer", opacity: current === total - 1 ? 0.3 : 1, fontWeight: 700, transition: "all 0.2s" }}
        >Next ▶</button>
      </div>
      <style>{`@keyframes terraFadeIn { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  );
}
