import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/tts/Nav";
import { Hero } from "@/components/tts/Hero";
import { SilkRibbon } from "@/components/tts/SilkRibbon";
import { Marquee } from "@/components/tts/Marquee";
import { Services } from "@/components/tts/Services";
import { Terra } from "@/components/tts/Terra";
import { Stack } from "@/components/tts/Stack";
import { Founders } from "@/components/tts/Founders";
import { Frameworks } from "@/components/tts/Frameworks";
import { Markets } from "@/components/tts/Markets";
import { Testimonials } from "@/components/tts/Testimonials";
import { Contact } from "@/components/tts/Contact";
import { Footer } from "@/components/tts/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tailored Tech Solutions — AI Software Studio" },
      { name: "description", content: "Tailored Tech Solutions builds production AI products, mobile apps, and bespoke engineering software. Studio of Andrew Gwaltney & Ameer Al Saati." },
      { property: "og:title", content: "Tailored Tech Solutions — AI Software Studio" },
      { property: "og:description", content: "Custom AI applications, embedded systems, and product experiences designed for the companies that refuse to be generic." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="text-chrome relative">
      <SilkRibbon />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Terra />
        <Stack />
        <Founders />
        <Frameworks />
        <Markets />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
