# Taskfuse

> **Know what every finished agent task actually costs.**  
> Per-task cost tracking and budget caps for teams spending $5K–$50K a month on AI agents in production.

---

## ⚡ Overview

Existing observability platforms (Langfuse, Helicone, Datadog) show token counts per API request. They cannot tell you what a single completed business task actually cost — one closed support ticket, one enriched lead, or one processed document — with retry loops, model fallbacks, and failed runs included.

**Taskfuse** acts as a drop-in proxy for agent API calls:
1. **Swap your base URL:** Point your agent at the Taskfuse proxy (`proxy.taskfuse.io/v1`).
2. **Tag the task:** Send an `x-task-id` header with each business task run.
3. **Read the number & cap runaway loops:** See dollar costs per completed task and enforce hard budget caps (e.g. $4.00/task) that halt infinite loops at HTTP 429 before provider bills explode.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Motion:** Custom GPU-accelerated transforms & transitions (prefers-reduced-motion compliant)
- **Database / Backend:** [Firebase Firestore](https://firebase.google.com/docs/firestore) with hardened Attribute-Based Access Control (ABAC) rules
- **Hosting:** Google Cloud Run (via Google AI Studio)

---

## 🎨 Design System

Designed around the calm, high-legibility vibe of on-call monitoring consoles (GitHub and Grafana):

| Token | Hex | Usage |
|---|---|---|
| `background` | `#0D1117` | Canvas background, dark cards, footer |
| `surface` | `#161B22` | Alternating bands, cards, modals |
| `border` | `#30363D` | 1px dividers, card boundaries, inputs |
| `text-primary` | `#E6EDF3` | Headings, high-contrast values, primary labels |
| `text-muted` | `#8B949E` | Body copy, secondary metadata, inactive metrics |
| `accent` | `#F5A524` | CTA buttons, recommended tier border, key dollar figures |
| `accent-hover` | `#FFBC47` | Hover states on interactive amber controls |

- **Headings:** *Space Grotesk* (700 for h1/h2, 600 for h3) with balanced text wrapping.
- **Body & Telemetry:** *Inter* with tabular numerals for dollar figures and token counts.
- **Emblem:** Handcrafted SVG flat-vector circuit breaker switch in the tripped position, shared as the brand mark and favicon.

---

## 📁 Project Structure

```text
├── index.html                   # HTML shell with Google Fonts, SEO meta, OG/Twitter tags, & SVG favicon
├── metadata.json                # AI Studio application metadata
├── package.json                 # Project dependencies and scripts
├── firestore.rules              # Zero-trust ABAC security rules for lead capture
├── firebase-blueprint.json      # Schema definition for the Firestore data model
├── src/
│   ├── main.tsx                 # React entry point
│   ├── App.tsx                  # Single-page validation landing page with all 8 sections
│   ├── index.css                # CSS variables, typography scale, buttons, and animations
│   ├── components/
│   │   ├── Logo.tsx             # Responsive circuit breaker vector emblem & wordmark
│   │   ├── HeroVisual.tsx       # Live isometric monitoring dashboard visual with climbing cost line
│   │   ├── EmailCaptureForm.tsx # Honeypot-guarded email capture with animated success state
│   │   └── PricingModal.tsx     # Tier reservation modal for Starter, Team, and Scale tiers
│   └── lib/
│       └── leadService.ts       # Lead persistence service with Firestore & localStorage fallback
```

---

## 🔒 Security & Firestore Rules

Lead capture is protected with strict zero-trust rules:

- **Create-Only Public Access:** Visitors can submit leads containing an email, source, and optional tier.
- **No Public Reads:** Captured email addresses cannot be queried, listed, or scraped from the client app.
- **Temporal & Regex Guards:** Requires valid email formatting, strict character boundaries, and matches `request.time`.
- **Honeypot Bot Defense:** Visually hidden form input silently drops automated bot submissions.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm`

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the local Vite development server (port 3000)
npm run dev

# 3. Type-check with TypeScript
npm run lint

# 4. Create a production build
npm run build
```

---

## 📢 Distribution & Share Kit

Ready-to-post copy for validating the value proposition:

### 1. Reddit — `r/AI_Agents`
**Title:** Token dashboards tell you what you spent. Not what one finished task cost.  
**Body:**  
> I've been researching agent cost blowups for a few months — the 200-calls-in-four-minutes retry loops, the $19K surprise bills, the run that costs $200 one night and $7 the next. The pattern I keep seeing: every tool reports tokens per request, but nobody can say what one completed task cost — one closed ticket, one enriched lead — with retries and failures rolled in. IDC found 67% of enterprises overran their agent budget by 10%+ last year, and AWS just wrote cost-per-task into the Agentic AI Lens as a target KPI. I put together a page for a per-task cost tracker with hard dollar caps per task, and I'd genuinely like this sub to poke holes in it before I build further. Is cost-per-completed-task the number you'd actually use, or is your current setup enough? [YOUR LINK]

### 2. X / Twitter
> Agents burn 5–30x more tokens per task than a chatbot (Gartner). Uber blew its entire 2026 AI budget by April. 67% of teams overran agent budgets last year (IDC). Everyone measures tokens per request. Nobody measures cost per finished task — which is the only number a margin cares about. I put together a page for a tool that tracks exactly that and hard-caps any task at a dollar limit. Would honestly value takes from anyone running agents in production: [YOUR LINK]

### 3. Reddit — `r/AIToolsPerformance`
**Title:** You already track cost per successful task by hand. Should that be automatic?  
**Body:**  
> This sub is one of the only places I've seen people track first-try success rate, retries needed, and total cost per successful task — which is exactly the metric the rest of the agent world ignores. I've been talking to teams running production agents, and the gap between "what the provider bill says" and "what a clean completed task costs" is routinely 3–6x once retry loops are counted. I put together a page for a proxy that attributes every call to a task ID and reports cost per completed task automatically, with optional per-task dollar caps. Since you all live in this data manually, I'd rather hear what's wrong with the approach now than after building: [YOUR LINK]

### 4. Direct Message (DM)
> Saw your post about agent costs getting unpredictable — I've been researching that exact problem and put together a page for a tool that tracks cost per completed task (retries included) and hard-caps any task at a dollar limit. Would you take 60 seconds and tell me if this would actually help, or what's missing? [YOUR LINK]

---

## 📄 License

Apache-2.0
