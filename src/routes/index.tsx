import { createFileRoute } from "@tanstack/react-router";
import { SnapScrollHero } from "@/components/SnapScrollHero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tailored Tech Solutions — AI Software Studio" },
      { name: "description", content: "Tailored Tech Solutions builds production AI products, mobile apps, and bespoke engineering software. Studio of Andrew Gwaltney & Ameer Al Saati." },
      { property: "og:title", content: "Tailored Tech Solutions — AI Software Studio" },
      { property: "og:description", content: "Custom AI applications, embedded systems, and product experiences designed for the companies that refuse to be generic." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tailoredtechsolutions.org/" },
      { name: "twitter:title", content: "Tailored Tech Solutions — AI Software Studio" },
      { name: "twitter:description", content: "Custom AI applications, embedded systems, and product experiences designed for the companies that refuse to be generic." },
    ],
    links: [
      { rel: "canonical", href: "https://tailoredtechsolutions.org/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Tailored Tech Solutions",
          url: "https://tailoredtechsolutions.org",
          telephone: "+1-940-601-5260",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Nipomo",
            addressRegion: "CA",
            postalCode: "93444",
            addressCountry: "US",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <SnapScrollHero />;
}
