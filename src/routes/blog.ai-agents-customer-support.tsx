import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Bot, Clock, CalendarCheck, TrendingDown, ShieldCheck, Workflow } from "lucide-react";
import { Nav } from "@/components/tts/Nav";
import { Footer } from "@/components/tts/Footer";

const URL = "https://tailoredtechsolutions.org/blog/ai-agents-customer-support";
const TITLE = "AI Agents for Customer Support & Appointment Setting";
const DESC =
  "How AI agents help in customer support — deflecting tickets, confirming appointments, and reminding customers — with the architectures we ship in production.";

export const Route = createFileRoute("/blog/ai-agents-customer-support")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "how do ai agents help in customer support, ai agents customer support, ai appointment reminders, ai appointment confirmation, customer support automation" },
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
            { "@type": "Thing", name: "Customer support automation" },
            { "@type": "Thing", name: "Appointment setting" },
            { "@type": "Thing", name: "AI agents" },
          ],
        }),
      },
    ],
  }),
  component: CaseStudy,
});

function CaseStudy() {
  return (
    <div className="text-chrome relative bg-[#0a0a0a] min-h-screen">
      <Nav />
      <main className="pt-32 pb-24 md:pt-40 md:pb-32">
        <article className="mx-auto max-w-3xl px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <header className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] opacity-60 mb-4">Case Study · Customer Support</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              AI Agents for Customer Support &amp; Appointment Setting
            </h1>
            <p className="text-lg opacity-80 leading-relaxed">
              How do AI agents help in customer support? In production, they deflect repetitive tickets,
              confirm and remind customers about appointments, and route the cases that genuinely need a
              human — cutting response times and ticket volume without sacrificing CSAT. Below is the
              architecture we ship for support and scheduling teams.
            </p>
          </header>

          <Section icon={<Bot className="w-5 h-5" />} title="The problem we keep being hired to solve">
            <p>
              Most support backlogs are made of the same 15–20 questions answered hundreds of times,
              plus a steady drip of appointment confirmations, reschedules, and no-show reminders. A
              well-scoped AI agent handles both — not by replacing the team, but by closing the easy
              tickets and prepping the hard ones before a human opens them.
            </p>
          </Section>

          <Section icon={<Workflow className="w-5 h-5" />} title="Architecture: workflow + tool-using agent">
            <p>
              We mirror the two shapes from our{" "}
              <Link to="/blog/how-to-build-custom-ai-agents" className="underline underline-offset-4">
                guide to building custom AI agents
              </Link>
              :
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Workflow agent</strong> drives deterministic flows — appointment confirmation,
              24-hour and 1-hour reminders, reschedule offers when a slot opens.</li>
              <li><strong>Tool-using agent</strong> handles inbound support — searches your knowledge
              base, reads the customer's order history, drafts a reply, and escalates with a summary
              when it isn't confident.</li>
            </ul>
          </Section>

          <Section icon={<CalendarCheck className="w-5 h-5" />} title="How AI agents confirm and remind customers about appointments">
            <p>
              The scheduling agent owns four tools: read calendar, send SMS/email, write a booking note,
              and offer alternate slots. The loop is simple — fire a confirmation on booking, a reminder
              24 hours out, and a final nudge an hour before. If the customer replies "can't make it",
              the agent reads the calendar, proposes two new times, and rebooks on confirmation. Every
              action is idempotent and logged.
            </p>
          </Section>

          <Section icon={<TrendingDown className="w-5 h-5" />} title="ROI: ticket volume down, response time down">
            <p>
              The metrics that move when this lands: first-response time drops from hours to seconds on
              deflected tickets, ticket volume hitting human agents falls 30–60% on the long tail, and
              appointment no-shows drop materially once reminders are reliable. Track the business
              metric — tickets closed without escalation, no-show rate — not the model metric.
            </p>
          </Section>

          <Section icon={<ShieldCheck className="w-5 h-5" />} title="Guardrails that keep CSAT up">
            <p>
              Three rules we never ship without: a confidence threshold that escalates to a human with
              full context attached, a hard block on refund/cancel/billing-change actions unless a human
              approves, and an eval set of real past tickets the agent has to pass on every prompt
              change. The agent gets faster over time — never riskier.
            </p>
          </Section>

          <Section icon={<Clock className="w-5 h-5" />} title="Timeline to production">
            <p>
              A scoped support + scheduling agent typically goes from kickoff to a flagged pilot in
              4–6 weeks: week 1 discovery and tool surface, weeks 2–3 build and eval set, week 4
              shadow mode on real traffic, weeks 5–6 staged rollout. The team keeps full control of
              tone, escalation rules, and which actions are autonomous.
            </p>
          </Section>

          <aside className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-2xl font-semibold mb-3">Want an agent like this for your support or scheduling team?</h2>
            <p className="opacity-80 mb-6">
              We design, build, and integrate custom AI agents for customer support and appointment
              setting — wired into your CRM, helpdesk, and calendar. Same architecture, tailored to
              your team's playbooks.
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