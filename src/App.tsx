import React, { useState } from 'react';
import {
  Receipt,
  RotateCw,
  Octagon,
  Plug,
  Percent,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Logo } from './components/Logo';
import { HeroVisual } from './components/HeroVisual';
import { EmailCaptureForm } from './components/EmailCaptureForm';
import { PricingModal } from './components/PricingModal';

export default function App() {
  const [selectedTier, setSelectedTier] = useState<{ name: string; price: string } | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqData = [
    {
      q: "How hard is setup, honestly?",
      a: "One line of config. You change your API base URL to our proxy and add a task-ID header. No SDK, no agent framework lock-in, no code rewrite. If you can set an environment variable, you can set this up."
    },
    {
      q: "We already use Langfuse / Helicone / Datadog. Why add this?",
      a: "Keep them — they're great at traces and tokens per request. They don't answer what one finished business task cost, with retries, model switches, and failed attempts rolled in, and they don't stop a task at a dollar limit. That's the whole product here."
    },
    {
      q: "Won't a hard cap kill a valuable task mid-run?",
      a: "Only if you turn caps on, and only at the limit you set. Everything starts observe-only. When you enable a cap, calls past it return a standard error your agent handles like any API failure — you decide the threshold per workflow, and you can route expensive tasks to a higher cap."
    },
    {
      q: "Is $499 a month worth it?",
      a: "If you spend $5K a month on agents and retry loops eat even 15% of it — our sample audit found far more — Team pays for itself before the first week closes. The free audit tells you your real number before you pay anything."
    },
    {
      q: "Do you store my prompts?",
      a: "Cost math only needs token counts, model names, and timing. Request bodies are not stored by default; you can opt in per workflow if you want loop diagnostics that quote the repeated calls."
    },
    {
      q: "Is this available yet?",
      a: "Not yet — we're onboarding founding users in small batches. Signing up reserves your spot and a free seven-day Agent Spend Audit of one workflow at launch. You'll see your real cost per finished task before you're asked to pay for anything."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3] flex flex-col font-sans">
      {/* 
        NAV
        wordmark "AgentGuard" in Space Grotesk 600.
        Anchor links: "How it works · Pricing · FAQ".
        One CTA button (primary, small: padding 10px 20px): "Get my free spend audit".
        Nothing else.
      */}
      <nav className="sticky top-0 z-40 w-full border-b border-[#30363D] bg-[#0D1117]/95 backdrop-blur-xs">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <div className="shrink-0 flex items-center">
            <Logo size={20} showWordmark={true} />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-[14px] text-[#8B949E] hover:text-[#E6EDF3] transition-colors cursor-pointer"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-[14px] text-[#8B949E] hover:text-[#E6EDF3] transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-[14px] text-[#8B949E] hover:text-[#E6EDF3] transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </div>

          <div className="shrink-0 flex items-center">
            <button
              onClick={() => scrollToSection('hero-form')}
              className="h-[34px] sm:h-[38px] px-3 sm:px-4 text-[12px] sm:text-[13px] font-semibold rounded-[6px] sm:rounded-[8px] bg-[#F5A524] text-[#0D1117] hover:bg-[#FFBC47] active:scale-[0.97] transition-all flex items-center justify-center shrink-0 whitespace-nowrap cursor-pointer shadow-none"
            >
              Get my free spend audit
            </button>
          </div>
        </div>
      </nav>

      {/* 
        1. HERO SECTION
        Rhythm: background token (#0D1117)
        Layout: open split layout (copy left, hero image right), no card.
      */}
      <section className="py-[96px] bg-[#0D1117]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Copy Left */}
            <div className="lg:col-span-6 space-y-6">
              <h1 className="text-[34px] sm:text-[48px] font-bold leading-[1.1] text-[#E6EDF3]">
                Know what every finished agent task actually costs
              </h1>

              <p className="text-[17px] text-[#8B949E] leading-[1.6] max-w-[60ch]">
                Per-task cost tracking and budget caps for teams spending $5K–$50K a month on AI agents in production.
              </p>

              {/* Email capture in hero */}
              <div id="hero-form" className="pt-2">
                <EmailCaptureForm source="hero" />
              </div>

              {/* Credibility line */}
              <div className="pt-2">
                <p className="text-[14px] text-[#8B949E] leading-[1.5]">
                  67% of teams running AI agents overran their budget by more than 10% last year (IDC, July 2026).
                </p>
              </div>
            </div>

            {/* Hero Image Right */}
            <div className="lg:col-span-6">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 
        2. PROBLEM SECTION
        Rhythm: surface token (#161B22) full-bleed band
        Layout: 4 pains as open text rows with a thin border-top divider each — no cards.
      */}
      <section className="py-[96px] bg-[#161B22]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="max-w-[780px]">
            <h2 className="text-[26px] sm:text-[32px] font-bold leading-[1.2] text-[#E6EDF3] mb-12">
              Your token dashboard is hiding the real bill
            </h2>

            <div className="space-y-0">
              <div className="py-6 border-t border-[#30363D]">
                <p className="text-[17px] text-[#E6EDF3] leading-[1.6]">
                  An agent got stuck in a retry loop and made 200 API calls in four minutes. The dashboard just logged "usage."
                </p>
              </div>

              <div className="py-6 border-t border-[#30363D]">
                <p className="text-[17px] text-[#E6EDF3] leading-[1.6]">
                  The same overnight run cost $200 one night and $7 the next — for the same output. Nobody can say why.
                </p>
              </div>

              <div className="py-6 border-t border-[#30363D]">
                <p className="text-[17px] text-[#E6EDF3] leading-[1.6]">
                  Agents burn 5–30x more tokens per task than a chatbot, because they loop, retry, and resend full context (Gartner).
                </p>
              </div>

              <div className="py-6 border-t border-[#30363D]">
                <p className="text-[17px] text-[#E6EDF3] leading-[1.6]">
                  Your CFO asks what one closed ticket costs. Your observability tool shows tokens per request. Those are different questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        3. HOW IT WORKS SECTION
        Rhythm: background token (#0D1117)
        Layout: 3 numbered open columns, no cards.
      */}
      <section id="how-it-works" className="py-[96px] bg-[#0D1117]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <h2 className="text-[26px] sm:text-[32px] font-bold leading-[1.2] text-[#E6EDF3] mb-16">
            One config change. One header. One number.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="font-mono text-[14px] text-[#8B949E] tracking-wider uppercase">
                Step 1
              </div>
              <h3 className="text-[20px] font-semibold text-[#E6EDF3]">
                Swap your base URL.
              </h3>
              <p className="text-[17px] text-[#8B949E] leading-[1.6]">
                Point your agent's API calls at the Taskfuse proxy — one line of config, no SDK, works with any OpenAI-compatible endpoint.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="font-mono text-[14px] text-[#8B949E] tracking-wider uppercase">
                Step 2
              </div>
              <h3 className="text-[20px] font-semibold text-[#E6EDF3]">
                Tag the task.
              </h3>
              <p className="text-[17px] text-[#8B949E] leading-[1.6]">
                Add one header with a task ID. Every call, retry, model switch, and failure gets attributed to the business task it belongs to.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="font-mono text-[14px] text-[#8B949E] tracking-wider uppercase">
                Step 3
              </div>
              <h3 className="text-[20px] font-semibold text-[#E6EDF3]">
                Read the number.
              </h3>
              <p className="text-[17px] text-[#8B949E] leading-[1.6]">
                Each finished task shows its real dollar cost — and you can cap any task so a runaway loop stops at your price, not the provider's.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        4. DEMO MOMENT SECTION
        Rhythm: surface token band (#161B22)
        Form: worked-example
        Two panels: bordered cards on background token (#0D1117)
        The "after" card gets a 1px #F5A524 top border.
        The "Cost per completed task: $2.02" line and the "~$4,700/month" line render in amber accent.
        An email capture form sits directly below the right panel.
      */}
      <section className="py-[96px] bg-[#161B22]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <p className="text-[17px] text-[#8B949E] mb-8">
            This is the audit founding users get in week one — sample numbers from a support-triage workflow.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT PANEL: The "before" */}
            <div className="lg:col-span-5 rounded-[8px] bg-[#0D1117] border border-[#30363D] p-6 space-y-4">
              <div className="text-[14px] text-[#8B949E] font-mono uppercase tracking-wider">
                Your provider dashboard
              </div>
              <div className="text-[17px] text-[#E6EDF3] font-mono tabular-nums">
                API usage this week: $2,847.14
              </div>
            </div>

            {/* RIGHT PANEL: The "after" */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-[8px] bg-[#0D1117] border border-[#30363D] border-t-[#F5A524] p-6 sm:p-8 space-y-6">
                {/* Header */}
                <div className="space-y-1 border-b border-[#30363D] pb-4">
                  <div className="font-mono text-[14px] text-[#8B949E] tracking-wider uppercase">
                    AGENT SPEND AUDIT — SAMPLE
                  </div>
                  <div className="text-[14px] text-[#8B949E]">
                    Workflow: Support ticket triage agent · Period: 7 days
                  </div>
                </div>

                {/* Core metrics */}
                <div className="space-y-2 font-mono text-[15px] tabular-nums">
                  <div className="text-[#E6EDF3]">
                    Completed tasks: 1,412
                  </div>
                  <div className="text-[#E6EDF3]">
                    Total spend: $2,847
                  </div>
                  <div className="text-[#F5A524] font-semibold text-[17px]">
                    Cost per completed task: $2.02
                  </div>
                </div>

                {/* Task breakdown */}
                <div className="space-y-2 font-mono text-[15px] tabular-nums pt-2 border-t border-[#30363D]">
                  <div className="text-[#E6EDF3]">
                    Clean tasks (1,198): $1.18 avg
                  </div>
                  <div className="text-[#E6EDF3]">
                    Tasks with retry loops (214): $6.70 avg — 5.7x the clean rate
                  </div>
                </div>

                {/* Top waste sources */}
                <div className="space-y-2 pt-2 border-t border-[#30363D]">
                  <div className="text-[14px] text-[#8B949E] font-mono uppercase tracking-wider">
                    Top waste sources this week:
                  </div>
                  <ol className="space-y-1.5 text-[15px] text-[#E6EDF3] font-mono tabular-nums list-decimal list-inside">
                    <li>Retry loops resending full 38K-token context — $1,181</li>
                    <li>Frontier model used on classification steps a small model passes — $346</li>
                    <li>61 failed tasks, billed in full, delivered nothing — $188</li>
                  </ol>
                </div>

                {/* Recoverable estimate in amber */}
                <div className="pt-4 border-t border-[#30363D]">
                  <div className="text-[16px] text-[#F5A524] font-semibold font-mono tabular-nums">
                    Estimated recoverable with a $4 per-task cap + model right-sizing: ~$4,700/month
                  </div>
                </div>
              </div>

              {/* Email capture form directly below right panel */}
              <div className="p-1">
                <EmailCaptureForm source="demo-moment" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        5. BENEFITS SECTION
        Rhythm: background token (#0D1117)
        Layout: 5 bordered surface cards in grid (3 cols desktop, 1 col mobile).
      */}
      <section className="py-[96px] bg-[#0D1117]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Benefit 1 */}
            <div className="rounded-[8px] bg-[#161B22] border border-[#30363D] p-6 space-y-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <Receipt className="w-5 h-5 text-[#8B949E]" strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h3 className="text-[18px] font-semibold text-[#E6EDF3]">
                  One number for the CFO
                </h3>
                <p className="text-[15px] text-[#8B949E] leading-[1.6]">
                  Report the cost of one closed ticket, one enriched lead, one processed document — not a token count.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="rounded-[8px] bg-[#161B22] border border-[#30363D] p-6 space-y-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="relative">
                  <RotateCw className="w-5 h-5 text-[#8B949E]" strokeWidth={1.5} />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#8B949E]" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-[18px] font-semibold text-[#E6EDF3]">
                  Catch loops while they're cheap
                </h3>
                <p className="text-[15px] text-[#8B949E] leading-[1.6]">
                  Repeated near-identical calls get flagged with their wasted spend totaled, before the invoice does it for you.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="rounded-[8px] bg-[#161B22] border border-[#30363D] p-6 space-y-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <Octagon className="w-5 h-5 text-[#8B949E]" strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h3 className="text-[18px] font-semibold text-[#E6EDF3]">
                  A hard stop at your price
                </h3>
                <p className="text-[15px] text-[#8B949E] leading-[1.6]">
                  Set a dollar cap per task; past it, calls return a clean error your agent can handle.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="rounded-[8px] bg-[#161B22] border border-[#30363D] p-6 space-y-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <Plug className="w-5 h-5 text-[#8B949E]" strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h3 className="text-[18px] font-semibold text-[#E6EDF3]">
                  No rewrite, no SDK
                </h3>
                <p className="text-[15px] text-[#8B949E] leading-[1.6]">
                  A base-URL swap and a header. Your agent code doesn't know we exist.
                </p>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="rounded-[8px] bg-[#161B22] border border-[#30363D] p-6 space-y-4 md:col-span-2 lg:col-span-1">
              <div className="w-8 h-8 flex items-center justify-center">
                <Percent className="w-5 h-5 text-[#8B949E]" strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h3 className="text-[18px] font-semibold text-[#E6EDF3]">
                  Margin per workflow
                </h3>
                <p className="text-[15px] text-[#8B949E] leading-[1.6]">
                  See which workflows make money at current model prices and which quietly don't.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        6. PRICING SECTION
        Rhythm: surface token band (#161B22)
        Headline: Priced per completed task, not per token
        3 bordered cards on background token (#0D1117)
        The recommended Team tier gets a 2px #F5A524 border and small amber badge "Recommended" top-center.
      */}
      <section id="pricing" className="py-[96px] bg-[#161B22]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-[700px] mx-auto mb-16 space-y-3">
            <h2 className="text-[26px] sm:text-[32px] font-bold leading-[1.2] text-[#E6EDF3]">
              Priced per completed task, not per token
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Tier 1: Starter */}
            <div className="rounded-[8px] bg-[#0D1117] border border-[#30363D] p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-[20px] font-semibold text-[#E6EDF3]">Starter</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-[32px] font-bold text-[#E6EDF3] font-mono tabular-nums">$149</span>
                    <span className="text-[#8B949E] text-[14px]">/mo</span>
                  </div>
                </div>

                <div className="space-y-3 text-[15px] text-[#8B949E] leading-[1.6] border-t border-[#30363D] pt-6">
                  <p className="text-[#E6EDF3]">
                    Up to 100K completed tasks/month · 3 workflows · Cost-per-task dashboard + retry-loop detection · Weekly audit report by email.
                  </p>
                  <p className="text-[14px] text-[#8B949E] pt-2">
                    <span className="text-[#E6EDF3]">Best for:</span> one production agent and a founder watching the bill.
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => setSelectedTier({ name: 'Starter', price: '$149/mo' })}
                  className="btn-secondary w-full"
                >
                  Reserve Starter pricing
                </button>
              </div>
            </div>

            {/* Tier 2: Team (Recommended) */}
            <div className="relative rounded-[8px] bg-[#0D1117] border-2 border-[#F5A524] p-8 flex flex-col justify-between">
              {/* Recommended Badge top-center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-0.5 rounded-[4px] bg-[#F5A524] text-[#0D1117] font-semibold text-[12px] uppercase tracking-wider font-mono">
                  Recommended
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-[20px] font-semibold text-[#E6EDF3]">Team</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-[32px] font-bold text-[#E6EDF3] font-mono tabular-nums">$499</span>
                    <span className="text-[#8B949E] text-[14px]">/mo</span>
                  </div>
                </div>

                <div className="space-y-3 text-[15px] text-[#8B949E] leading-[1.6] border-t border-[#30363D] pt-6">
                  <p className="text-[#E6EDF3]">
                    Up to 500K completed tasks/month · Unlimited workflows · Per-task budget caps with hard stops · 5 seats + priority support.
                  </p>
                  <p className="text-[14px] text-[#8B949E] pt-2">
                    <span className="text-[#E6EDF3]">Best for:</span> AI-native teams spending $5K–$50K a month on agents.
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => setSelectedTier({ name: 'Team', price: '$499/mo' })}
                  className="btn-primary w-full"
                >
                  Reserve Team pricing
                </button>
              </div>
            </div>

            {/* Tier 3: Scale */}
            <div className="rounded-[8px] bg-[#0D1117] border border-[#30363D] p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-[20px] font-semibold text-[#E6EDF3]">Scale</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-[32px] font-bold text-[#E6EDF3] font-mono tabular-nums">$1,499</span>
                    <span className="text-[#8B949E] text-[14px]">/mo</span>
                  </div>
                </div>

                <div className="space-y-3 text-[15px] text-[#8B949E] leading-[1.6] border-t border-[#30363D] pt-6">
                  <p className="text-[#E6EDF3]">
                    Up to 2M completed tasks/month · 15 seats · 12-month history + CSV export · Onboarding call + Slack support.
                  </p>
                  <p className="text-[14px] text-[#8B949E] pt-2">
                    <span className="text-[#E6EDF3]">Best for:</span> ops leads running agents across several teams.
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => setSelectedTier({ name: 'Scale', price: '$1,499/mo' })}
                  className="btn-secondary w-full"
                >
                  Reserve Scale pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        7. FAQ SECTION
        Rhythm: background token (#0D1117)
        Layout: single-column accordion with border dividers, open layout.
      */}
      <section id="faq" className="py-[96px] bg-[#0D1117]">
        <div className="max-w-[780px] mx-auto px-4 sm:px-6">
          <h2 className="text-[26px] sm:text-[32px] font-bold leading-[1.2] text-[#E6EDF3] mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-0">
            {faqData.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="border-t border-[#30363D]">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-6 flex items-center justify-between text-left gap-4 cursor-pointer group"
                  >
                    <span className="text-[18px] font-semibold text-[#E6EDF3] group-hover:text-[#F5A524] transition-colors">
                      {item.q}
                    </span>
                    <span className="text-[#8B949E] shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#8B949E]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#8B949E]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-6 pr-6">
                      <p className="text-[17px] text-[#8B949E] leading-[1.6]">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="border-t border-[#30363D]" />
          </div>
        </div>
      </section>

      {/* 
        8. FINAL CTA SECTION
        Rhythm: surface token band (#161B22)
        Layout: centered open layout, primary button.
      */}
      <section className="py-[96px] bg-[#161B22]">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-[28px] sm:text-[36px] font-bold leading-[1.2] text-[#E6EDF3]">
            Know your cost per finished task before the next invoice teaches it to you.
          </h2>

          <p className="text-[17px] text-[#8B949E] leading-[1.6] max-w-[60ch] mx-auto">
            Founding users get a free seven-day Agent Spend Audit of one workflow — no card, no commitment, your real numbers first.
          </p>

          <div className="pt-4 max-w-[480px] mx-auto text-left">
            <EmailCaptureForm source="final-cta" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#30363D] bg-[#0D1117] py-12">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size={20} showWordmark={true} />
            <span className="text-[14px] text-[#8B949E]">
              © {new Date().getFullYear()} Taskfuse. All rights reserved.
            </span>
          </div>
          <div className="text-[14px] text-[#8B949E]">
            Cost-per-task tracking & budget caps for production AI agents.
          </div>
        </div>
      </footer>

      {/* Pricing Reservation Modal */}
      {selectedTier && (
        <PricingModal
          isOpen={!!selectedTier}
          onClose={() => setSelectedTier(null)}
          tierName={selectedTier.name}
          tierPrice={selectedTier.price}
        />
      )}
    </div>
  );
}
