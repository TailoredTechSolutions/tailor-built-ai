# Terra Farming — Master Voiceover Script
**Version:** 2.0 | **Reconciled:** 11-beat highlight reel + 13-section platform walkthrough
**Built by:** Tailored Tech Solutions | **Voices:** ElevenLabs Rachel (buyer) · Antoni (admin/farmer)

---

## 01 — Opening / Hero
**Clip:** 0:00–0:30 | **Screen:** Landing Page — Hero

Terra Farming is the Philippines' first farm-to-table digital marketplace — connecting highland Benguet farmers directly to buyers nationwide. From dirt to dessert. Fifty-plus partner farms, a thousand-plus customers, twenty-four-hour delivery. DA-Registered, SEC-Compliant, KYC-Verified — trust built into the foundation.

---

## 02 — Multi-Farm Price Compare
**Clip:** 0:30–1:00 | **Screen:** Marketplace — Product Catalog

Here's what makes Terra different. Most marketplaces show you one price. Terra shows you every farm supplying the same product — side by side — with a Best Price badge. Two hundred-plus active SKUs, refreshed every morning at 6AM from live farm harvest logs. The buyer compares, then chooses. Wholesale-grade transparency for any order size.

---

## 03 — Compliance-First / KYC
**Clip:** 1:00–1:30 | **Screen:** KYC & Compliance Center

Terra is built for a regulated market from day one. Every farmer completes KYC: government ID, DA farm registration, and barangay clearance — all stored on-platform. Buyers verify DTI and BIR registration before accessing wholesale pricing. Expired documents trigger an automatic account freeze and re-verification request. Full traceability — soil to shelf.

---

## 04 — Real-Time Tracking
**Clip:** 1:30–2:00 | **Screen:** Real-Time Order Tracking

Soil to table in four steps. Partner farms sit fifteen hundred meters up in the Benguet highlands. Produce harvested at dawn, at peak freshness — no cold storage, no warehouses. Live GPS tracks the driver every ninety seconds. Status milestones fire in sequence: Harvested, Packed, In Transit, Delivered — each triggering a push notification.

---

## 05 — Buyer Dashboard
**Clip:** 2:00–2:30 | **Screen:** Buyer Dashboard — Order Center

The Buyer Dashboard is designed for volume. Restaurants, hotels, and supermarkets browse live inventory from fifty-plus partner farms and place orders in under three minutes. Smart reorder detection flags your top recurring items the moment stock is available. One tap dispatches the order. A driver assigned within seconds.

---

## 06 — Farmer Dashboard
**Clip:** 2:30–3:00 | **Screen:** Farmer / Partner Dashboard

The Farmer Dashboard gives growers complete control without complexity. Add produce with a photo and a weight estimate, set your price, toggle availability — forty seconds. One tap to accept an order. Another to mark harvested. The platform handles the rest. Payouts hit GCash or bank within twenty-four hours of confirmed delivery.

---

## 07 — Multi-Role System / Admin
**Clip:** 3:00–3:30 | **Screen:** Admin Panel — Operations HQ

One account, many roles. A single user can be a buyer, a farmer, a driver, an admin, and an affiliate — all at once, with no re-registration. The Admin Panel sits above all of it: every farmer's KYC status, every buyer's order history, every driver's active route — visible from one dashboard.

---

## 08 — Driver Dashboard
**Clip:** 3:30–4:00 | **Screen:** Driver Dashboard — Delivery Management

Drivers open Terra to a live feed of pickup jobs sorted by proximity and payout. At pickup, a QR scan locks the manifest — weight, item count, buyer details confirmed. Route optimization runs in real time. On arrival, the buyer scans to confirm receipt. Earnings credit instantly.

---

## 09 — Quality Control
**Clip:** 4:00–4:30 | **Screen:** Quality Control — Photo Verification

Terra's quality layer is built into the packing step. When a farmer marks an order packed, they photograph the produce: weight verified, items counted, packaging intact. Photos are timestamped, geotagged, and permanently attached to the order. If a buyer raises a dispute, the evidence is already in the system.

---

## 10 — Financial Control
**Clip:** 4:30–5:00 | **Screen:** Payments & Payouts

Every peso is auditable. An append-only ledger — no hard deletes, ever. Funds hold in escrow until delivery is confirmed, then release automatically. Farmers paid within twenty-four hours. Drivers paid instantly. Every transaction traces back to its source event.

---

## 11 — HQ Analytics
**Clip:** 5:00–5:30 | **Screen:** Analytics — HQ View

The HQ Analytics view gives leadership a live pulse on the entire marketplace. GMV, order count, basket size, and delivery success rate — all real time. Demand forecasting models surface produce categories most likely to spike in the next thirty days, giving farming partners advance notice.

---

## 12 — Mobile App
**Clip:** 5:30–6:00 | **Screen:** Mobile App — Capacitor Native

Terra ships as a native iOS and Android app built on Capacitor — full platform access even in low-connectivity highland areas. The app queues actions locally when offline and syncs automatically when signal returns. One codebase. Three role-based experiences: Farmer, Buyer, Driver.

---

## 13 — Close
**Clip:** 6:00–6:30 | **Screen:** Outro

Terra Farming. Built for the highlands. Designed for scale. Live in production. Designed, built, and shipped end-to-end by Tailored Tech Solutions.

---

## ElevenLabs Settings
- **Rachel** (01, 02, 04, 05, 08, 12, 13): Stability 30 · Similarity 75 · Style 70 · Speaker Boost ON
- **Antoni** (03, 06, 07, 09, 10, 11): Stability 40 · Similarity 70 · Style 60 · Speaker Boost ON

---

## ffmpeg — Export All 13 Clips
```bash
ffmpeg -i terra_walkthrough.mp4 -ss 00:00:00 -t 30 -c copy clip_01_hero.mp4
ffmpeg -i terra_walkthrough.mp4 -ss 00:00:30 -t 30 -c copy clip_02_marketplace.mp4
ffmpeg -i terra_walkthrough.mp4 -ss 00:01:00 -t 30 -c copy clip_03_kyc.mp4
ffmpeg -i terra_walkthrough.mp4 -ss 00:01:30 -t 30 -c copy clip_04_tracking.mp4
ffmpeg -i terra_walkthrough.mp4 -ss 00:02:00 -t 30 -c copy clip_05_buyer.mp4
ffmpeg -i terra_walkthrough.mp4 -ss 00:02:30 -t 30 -c copy clip_06_farmer.mp4
ffmpeg -i terra_walkthrough.mp4 -ss 00:03:00 -t 30 -c copy clip_07_admin.mp4
ffmpeg -i terra_walkthrough.mp4 -ss 00:03:30 -t 30 -c copy clip_08_driver.mp4
ffmpeg -i terra_walkthrough.mp4 -ss 00:04:00 -t 30 -c copy clip_09_quality.mp4
ffmpeg -i terra_walkthrough.mp4 -ss 00:04:30 -t 30 -c copy clip_10_financial.mp4
ffmpeg -i terra_walkthrough.mp4 -ss 00:05:00 -t 30 -c copy clip_11_analytics.mp4
ffmpeg -i terra_walkthrough.mp4 -ss 00:05:30 -t 30 -c copy clip_12_mobile.mp4
ffmpeg -i terra_walkthrough.mp4 -ss 00:06:00 -t 30 -c copy clip_13_close.mp4
```

## ffmpeg — Mux voiceover onto clip
```bash
ffmpeg -i clip_01_hero.mp4 -i clip_01_voice.mp3 -c:v copy -c:a aac -shortest clip_01_final.mp4
```
