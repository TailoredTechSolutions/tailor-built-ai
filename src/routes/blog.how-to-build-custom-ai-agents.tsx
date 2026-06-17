import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Bot, Workflow, Database, ShieldCheck, Zap, GitBranch } from "lucide-react";
import { Nav } from "@/components/tts/Nav";
import { Footer } from "@/components/tts/Footer";

const URL = "https://tailoredtechsolutions.org/blog/how-to-build-custom-ai-agents";
const TITLE = "How to Build an AI Agent: A Practical Guide";
const DESC =
  "A technical guide to building custom AI agents for business automation — architecture, tools, memory, and shipping to production.";

export const Route = createFileRoute("/blog/how-to-build-custom-ai-agents")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "how to build an ai agent, custom ai solutions, ai agent architecture, business automation, ai sales agent, lead generation agent" },
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
            { "@type": "Thing", name: "Custom AI solutions" },
          ],
        }),
      },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <div className="text-chrome relative bg-[#0a0a0a] min-h-screen">
      <Nav />
      <main className="pt-32 pb-24 md:pt-40 md:pb-32">
        <article className="mx-auto max-w-3xl px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <header className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] opacity-60 mb-4">Guide · Engineering</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              How to Build an AI Agent: A Practical Guide to Custom AI Solutions
            </h1>
            <p className="text-lg opacity-80 leading-relaxed">
              An AI agent is a system that uses a language model to plan, call tools, and act on a goal —
              not just answer a question. This guide walks through how we design and ship custom AI agents
              for business automation, drawn from the architecture behind our{" "}
              <Link to="/" hash="contact" className="underline underline-offset-4">
                AI Sales &amp; Lead Generation Agents
              </Link>
              .
            </p>
          </header>

          <Section icon={<Bot className="w-5 h-5" />} title="1. Define the job, not the model">
            <p>
              Every successful agent starts with a narrow, measurable job: <em>qualify inbound leads</em>,{" "}
              <em>draft outbound replies</em>, <em>reconcile invoices</em>. Write the goal as an outcome
              with a success metric (reply rate, qualified-lead count, hours saved). Pick the model after —
              capability, latency, and cost only matter once the job is concrete.
            </p>
          </Section>

          <Section icon={<Workflow className="w-5 h-5" />} title="2. Choose an architecture">
            <p>
              Most production agents fall into one of three shapes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Workflow</strong> — deterministic steps with an LLM in one or two slots. Best for predictable, audited business processes.</li>
              <li><strong>Tool-using agent</strong> — a single LLM loop with a small set of tools (search, CRM, email). Great for sales and support.</li>
              <li><strong>Multi-agent</strong> — a planner delegates to specialists. Use only when subtasks are genuinely independent; complexity grows fast.</li>
            </ul>
          </Section>

          <Section icon={<GitBranch className="w-5 h-5" />} title="3. Design the tool surface">
            <p>
              Tools are the agent's hands. Give each tool a single responsibility, a tight JSON schema,
              and a clear description — the model picks tools by reading them. For business automation we
              typically wire: CRM read/write, calendar, email send, knowledge-base search, and an
              escalate-to-human action. Anything that mutates data should require explicit approval or run
              behind an idempotency key.
            </p>
          </Section>

          <Section icon={<Database className="w-5 h-5" />} title="4. Give it memory">
            <p>
              Stateless agents repeat themselves and lose context across sessions. We layer three kinds of
              memory: <strong>conversation</strong> (recent turns), <strong>episodic</strong> (per-customer
              summaries persisted to your DB), and <strong>semantic</strong> (a vector index of your docs,
              transcripts, and playbooks). Retrieval feeds the prompt — the model never holds your business
              knowledge by itself.
            </p>
          </Section>

          <Section icon={<ShieldCheck className="w-5 h-5" />} title="5. Guardrails and evaluation">
            <p>
              Before an agent touches production: write an eval set of 20–50 real cases with expected
              outcomes, run it on every prompt or model change, and add runtime guardrails (input
              validation, output schema checks, rate limits, PII redaction, a human-in-the-loop for
              high-stakes actions). Logs and traces are non-negotiable — you cannot improve what you cannot
              replay.
            </p>
          </Section>

          <Section icon={<Zap className="w-5 h-5" />} title="6. Ship, measure, iterate">
            <p>
              Launch behind a feature flag to a single team or customer segment. Track the business metric
              you defined in step 1 weekly, not the model metric. Most of the lift after launch comes from
              better tools and better retrieval, not a bigger model.
            </p>
          </Section>

          <aside className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-2xl font-semibold mb-3">Need a custom AI agent for your business?</h2>
            <p className="opacity-80 mb-6">
              Tailored Tech Solutions designs and ships production AI agents — sales qualification,
              lead generation, support automation, and bespoke internal tools. We handle architecture,
              evaluation, and integration with the systems you already run.
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

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="flex items-center gap-3 text-2xl font-semibold mb-4">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">{icon}</span>
        {title}
      </h2>
      <div className="opacity-85 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}