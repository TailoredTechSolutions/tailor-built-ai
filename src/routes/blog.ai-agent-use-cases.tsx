import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Home, Stethoscope, ShoppingCart, Briefcase, Scale, GraduationCap } from "lucide-react";
import { Nav } from "@/components/tts/Nav";
import { Footer } from "@/components/tts/Footer";

const URL = "https://tailoredtechsolutions.org/blog/ai-agent-use-cases";
const TITLE = "AI Agent Use Cases & Examples for Business Automation";
const DESC =
  "Practical AI agent examples and use cases by industry — real estate, healthcare, e-commerce, professional services, legal, and education — built as bespoke studio solutions.";

export const Route = createFileRoute("/blog/ai-agent-use-cases")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "ai agents examples, ai agent use cases, custom ai agents, business automation, ai agents for real estate, ai agents for healthcare, ai agents for ecommerce" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: TITLE,
          description: DESC,
          url: URL,
          inLanguage: "en-US",
          author: { "@type": "Organization", name: "Tailored Tech Solutions", url: "https://tailoredtechsolutions.org" },
          publisher: { "@type": "Organization", name: "Tailored Tech Solutions", url: "https://tailoredtechsolutions.org" },
          mainEntityOfPage: URL,
          about: [
            { "@type": "Thing", name: "AI agents" },
            { "@type": "Thing", name: "Business automation" },
            { "@type": "Thing", name: "Use cases" },
          ],
        }),
      },
    ],
  }),
  component: UseCasesPage,
});

const INDUSTRIES = [
  {
    icon: <Home className="w-5 h-5" />,
    industry: "Real Estate",
    examples: [
      "Inbound-lead qualifier that scores enquiries, books showings, and syncs notes to the CRM.",
      "Listing-description generator pulling MLS data, neighborhood comps, and brand voice.",
      "Tenant support agent for maintenance triage, scheduling, and status updates.",
    ],
  },
  {
    icon: <Stethoscope className="w-5 h-5" />,
    industry: "Healthcare",
    examples: [
      "Appointment-setting and reminder agent that confirms, reschedules, and reduces no-shows.",
      "Intake assistant that collects history, insurance, and consent before the visit.",
      "Clinical-note summariser that drafts SOAP notes for clinician review (HIPAA-aware).",
    ],
  },
  {
    icon: <ShoppingCart className="w-5 h-5" />,
    industry: "E-commerce",
    examples: [
      "Order-status and returns agent wired into Shopify, ShipStation, and your helpdesk.",
      "Product-discovery concierge that asks two questions and shortlists three SKUs.",
      "Abandoned-cart agent that messages with a reason-specific offer instead of a blanket discount.",
    ],
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    industry: "Professional Services",
    examples: [
      "Lead-qualification and proposal-drafting agent for agencies and consultancies.",
      "Internal research agent that summarises a client account before every meeting.",
      "Invoice-reconciliation agent that matches payments to projects and flags exceptions.",
    ],
  },
  {
    icon: <Scale className="w-5 h-5" />,
    industry: "Legal",
    examples: [
      "Contract-review agent that flags non-standard clauses against a firm playbook.",
      "Intake agent that screens prospective clients and routes by matter type.",
      "Discovery assistant that classifies documents and surfaces high-priority items.",
    ],
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    industry: "Education",
    examples: [
      "Student-support agent answering enrolment, schedule, and financial-aid questions 24/7.",
      "Tutoring agent that adapts to a student's level and reports progress to instructors.",
      "Course-ops agent that drafts syllabi, rubrics, and weekly comms from a curriculum brief.",
    ],
  },
];

function UseCasesPage() {
  return (
    <div className="text-chrome relative bg-[#0a0a0a] min-h-screen">
      <Nav />
      <main className="pt-32 pb-24 md:pt-40 md:pb-32">
        <article className="mx-auto max-w-3xl px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <header className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] opacity-60 mb-4">Guide · AI Agents</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              AI Agent Use Cases &amp; Examples for Business Automation
            </h1>
            <p className="text-lg opacity-80 leading-relaxed">
              The most useful AI agents are narrow, tool-using, and wired into the systems a business
              already runs. Below are concrete agent examples by industry — each one a job we'd scope
              as a bespoke build, not a generic chatbot. For the engineering behind these patterns,
              see our{" "}
              <Link to="/blog/how-to-build-custom-ai-agents" className="underline underline-offset-4">
                guide to building custom AI agents
              </Link>
              .
            </p>
          </header>

          {INDUSTRIES.map((row) => (
            <section key={row.industry} className="mb-10">
              <h2 className="flex items-center gap-3 text-2xl font-semibold mb-4">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
                  {row.icon}
                </span>
                {row.industry}
              </h2>
              <ul className="list-disc pl-6 space-y-2 opacity-85 leading-relaxed">
                {row.examples.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </section>
          ))}

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How to pick the right first agent</h2>
            <p className="opacity-85 leading-relaxed">
              Score candidates on three things: the work is repetitive enough to justify the build,
              the data the agent needs lives in a system we can integrate, and there's a clear human
              owner. Start with one agent, one team, one metric. Expand only after the first one
              earns its keep.
            </p>
          </section>

          <aside className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-2xl font-semibold mb-3">Have a use case in mind?</h2>
            <p className="opacity-80 mb-6">
              Tailored Tech Solutions designs, builds, and ships custom AI agents for the industries
              above — and ones that aren't on this page. Bring the job; we'll scope the agent.
            </p>
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition"
            >
              Talk to our team
            </Link>
          </aside>
        </article>
      </main>
      <Footer />
    </div>
  );
}