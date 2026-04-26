// English landing-page copy.
//
// This file is the source of truth for the EN content shown across the
// public-facing landing. It is written in plain object form so dropping in
// another locale is just adding a structurally identical sibling file.
//
// Do NOT use this for app-UI strings. The product app lives in another repo.

export const en = {
  // ─── Locale switcher ───────────────────────────────────────────────────────
  locale: {
    label: "Language",
    en: "EN",
    es: "ES",
    enLong: "English",
    esLong: "Español",
  },

  // ─── Header ────────────────────────────────────────────────────────────────
  header: {
    nav: {
      product: "Product",
      whoItsBuiltFor: "Who it's built for",
      about: "About",
    },
    cta: "Request Demo",
    mobile: {
      open: "Open menu",
      close: "Close menu",
    },
    productMenu: {
      eyebrow: "Platform capabilities",
      pillars: {
        capture: {
          label: "Capture & Organise",
          description:
            "Turn meetings, reports, and conversations into connected institutional knowledge, with a strong review layer that keeps everything accurate.",
        },
        prepare: {
          label: "Prepare & Sell",
          description:
            "Enter every deal with sharper context. Account history, relationship visibility, and commercial intelligence, ready before the meeting starts.",
        },
        activate: {
          label: "Activate & Publish",
          description:
            "Turn internal intelligence into outbound content: reports, newsletters, stakeholder briefings, and targeted communication assets.",
        },
        connect: {
          label: "Connect Your Workflow",
          description:
            "Bring CRM, email, operational context, and commercial targets into one working environment. Aksum fits the tools your team already uses.",
        },
      },
    },
    aboutMenu: {
      ourStory: "Our Story",
      contact: "Contact",
    },
  },

  // ─── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    badge: "Intelligence for the organisations that move markets",
    headline: "What your organisation knows, finally put to work.",
    subheadline:
      "Aksum transforms internal knowledge into sales advantage, strategic clarity, and targeted communication, at the speed decisions actually need.",
    primaryCta: "Request Demo",
  },

  // ─── Integrations band ─────────────────────────────────────────────────────
  integrations: {
    eyebrow: "Platform compatibility",
    headline: "Connect with the tools your team already uses",
    description:
      "Designed to fit the commercial and operational stack your team already runs on (CRM, email, calendar, documents, and collaboration), brought into one intelligence layer.",
  },

  // ─── Features (three editorial blocks) ─────────────────────────────────────
  features: {
    salesIntelligence: {
      eyebrow: "01. Sales Intelligence",
      title: "Harness what's already yours.",
      description:
        "Aksum aggregates every prior interaction, signal, and mention across your organization, so no opportunity starts from zero.",
    },
    strategicIntelligence: {
      eyebrow: "02. Strategic Intelligence",
      title: "Surface the signals your team is too busy to read.",
      description:
        "Aksum identifies patterns, emerging themes, and underserved opportunities across your internal information, turning information overload into strategic clarity.",
    },
    marketingActivation: {
      eyebrow: "03. Marketing Activation",
      title: "Publish with purpose.",
      description:
        "Aksum turns processed intelligence into targeted outbound content, reaching the right people at the right moment, across sales outreach, newsletters, and stakeholder communication.",
    },
  },

  // ─── Closing CTA + footer ──────────────────────────────────────────────────
  ctaFooter: {
    headline: "Ready to put your intelligence to work?",
    cta: "Request Demo",
    copyright: "© 2026 Aksum Data",
    nav: {
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },

  // ─── Shared subpage chrome ─────────────────────────────────────────────────
  // Strings that repeat across multiple subpages (back links, CTA strips, etc.)
  // live here so we translate them once.
  shared: {
    breadcrumb: {
      platform: "Platform",
    },
    ctaStrip: {
      requestDemo: "Request a demo",
      explorePlatform: "Explore the platform",
    },
    footerNav: {
      back: "← Back to Aksum",
      requestDemo: "Request a demo →",
    },
    panelExplain: {
      whatYouAreLookingAt: "What you are looking at",
    },
    closing: {
      whatChanges: "What changes",
      whyItMatters: "Why it matters",
    },
  },

  // ─── Who it's built for (use-cases) ────────────────────────────────────────
  useCases: {
    metaTitle: "Who it's built for | Aksum",
    metaDescription:
      "Aksum is built for teams where context matters and information fragments easily: sales, editorial, marketing, and leadership.",
    eyebrow: "Use Cases",
    headline: "Who it's built for.",
    intro:
      "Aksum is built for teams where context matters and information fragments easily, where what is known inside the organisation rarely makes it to the people who need it most.",
    sales: {
      label: "01. Sales Teams",
      headline: "Walk into every meeting with the full picture.",
      body:
        "Account history, prior conversations, relationship context, and open commitments, all surfaced before the call starts. Aksum gives commercial teams the preparation layer that turns meetings from introductions into advances.",
      imageAlt: "Savannah landscape at sunset, Sales Teams",
    },
    editorial: {
      label: "02. Editorial Teams",
      headline: "Preserve the nuance. Surface the pattern.",
      body:
        "Interviews, field conversations, and expert exchanges contain far more than what ends up in the final piece. Aksum helps editorial teams hold onto what was said, surface recurring themes across sources, and prepare for the next conversation with the full weight of what came before it.",
      points: [
        "Thematic continuity across interviews and projects",
        "Better preparation, drawn from prior exchanges",
        "Nothing important lost between a conversation and its output",
      ] as readonly string[],
      imageAlt: "African city at golden hour, Editorial Teams",
    },
    marketing: {
      label: "03. Marketing Teams",
      headline: "Publish with authority, not approximation.",
      body:
        "The most credible outbound communication is grounded in what an organisation actually knows, not assembled from public sources at the last minute. Aksum turns internal intelligence into newsletters, briefings, and stakeholder content that carries real weight because it comes from real context.",
      points: [
        "One internal knowledge base, many audience-specific outputs",
        "Content that reflects genuine organisational intelligence",
        "From scattered signals to finished communication assets",
      ] as readonly string[],
      imageAlt: "Tropical intelligence hub at dusk, Marketing Teams",
    },
    leadership: {
      label: "04. Leadership & Strategy",
      headline: "The right information, exactly when it matters.",
      body:
        "Leadership teams rarely lack information; they lack the infrastructure to make it usable at the moment it matters. Aksum gives strategy directors and executives connected visibility across projects, relationships, and signals, so the decisions they make are informed by the full depth of what the organisation has gathered.",
      cards: [
        {
          label: "Strategic clarity",
          body: "See patterns across projects and markets before they become obvious.",
        },
        {
          label: "Connected context",
          body: "Every relationship, account, and signal in one accessible view.",
        },
        {
          label: "Faster decisions",
          body: "From fragmented knowledge to an informed position, without a briefing team.",
        },
      ],
      imageAlt: "Asian steppe data outpost, Leadership & Strategy",
    },
    summary: [
      { audience: "Sales Teams",          short: "Context before the meeting." },
      { audience: "Editorial Teams",       short: "Patterns across every conversation." },
      { audience: "Marketing Teams",       short: "Authority from internal intelligence." },
      { audience: "Leadership & Strategy", short: "Visibility that supports decisions." },
    ],
    cta: {
      headline: "See it in your context.",
      body: "Request a demo and we will show you what Aksum looks like for your team.",
    },
  },

  // ─── About / Our Story ─────────────────────────────────────────────────────
  about: {
    metaTitle: "Our Story | Aksum",
    metaDescription:
      "Aksum began with a simple observation: the most important knowledge inside an organisation is almost never the most accessible. It exists in the people who've been there longest, in decisions that left no record, in commercial conversations that never made it into any system, but it doesn't compound. It doesn't travel and it doesn't work.",
    eyebrow: "Our Story",
    headlineLine1: "Built on instict.",
    headlineLine2: "Sharpened by reality.",
    intro:
      "Aksum began with a simple observation: the most valuable information inside an organisation is often the least usable.",
    sections: {
      instinct: {
        label: "Instinct",
        body:
          "We've always been drawn to what's next. Not for novelty's sake, but because it's usually when something new arrives that you see most clearly what's broken.",
      },
      field: {
        label: "Field",
        body:
          "Our story began on a trip through Mozambique, where we saw firsthand how ambitious teams operate under pressure, constantly creating critical knowledge and almost never capturing it",
      },
      shift: {
        label: "Shift",
        body:
          "That was the moment Aksum took shape. We didn't think organisations needed more noise, more dashboards, or more complexity. They needed a system that could turn what they already know into something connected, usable, and commercially meaningful.",
      },
      pattern: {
        label: "Pattern",
        body:
          "We kept seeing the same problem in different forms. Important signals lived across meetings, interviews, emails, commercial conversations, and internal documents. Everyone sensed their value, but almost none of it compounded. Knowledge remained fragmented. Context stayed local. Teams moved slower than they should have.",
      },
      purpose: {
        label: "Purpose",
        body:
          "That is what we are building. Aksum transforms fragmented internal information into a usable layer of intelligence, helping teams sell with more context, communicate with more authority, and make decisions with far greater clarity.",
      },
    },
    imageQuote: "The signal was always there.",
    imageAlt: "A complex port at dusk: the kind of environment where Aksum was born",
    founders: {
      bodyMuted:
        "We're three builders with a shared instinct for finding leverage in complexity. ",
      bodyEmphasis:
        "Aksum is our way of turning that instinct into something useful for the teams operating where information matters most.",
      caption: "Co-Founders: Pablo, Carlos, Ventura",
      imageAlt: "The Aksum founding team: Pablo, Carlos, Ventura",
    },
  },

  // ─── Contact ───────────────────────────────────────────────────────────────
  contact: {
    metaTitle: "Contact | Aksum",
    metaDescription: "Get in touch with the Aksum team.",
    eyebrow: "Contact",
    headline: "Get in touch.",
    body:
      "For demos, partnerships, press, or general enquiries.",
    requestDemo: "Request a demo",
    back: "← Back to Aksum",
  },

  // ─── Request a demo ────────────────────────────────────────────────────────
  requestDemo: {
    metaTitle: "Request a Demo | Aksum",
    metaDescription:
      "See how Aksum transforms your organisation's knowledge into intelligence that drives decisions. Book a personalised demo.",
    eyebrow: "Request a demo",
    headline: "See Aksum in action.",
    body:
      "Tell us about your team and what you're working through. We'll tailor the session to your exact context.",
    questions: "Questions?",
    sideCallout: {
      headline: "Ready to shape the future?",
      body:
        "The organisations operating at the edge of complexity need intelligence that moves as fast as they do.",
      imageAlt: "Aksum: built for the frontier",
    },
    form: {
      firstName: "First name *",
      lastName: "Last name *",
      email: "Work email *",
      emailPlaceholder: "you@company.com",
      phone: "Phone number",
      phonePlaceholder: "Phone number",
      countrySearch: "Search country or code…",
      noResults: "No results",
      company: "Company *",
      role: "Role *",
      problem: "What are you looking to solve? *",
      problemPlaceholder:
        "Tell us about your current challenges and what you hope Aksum can help with.",
      message: "Anything else you'd like to add",
      messagePlaceholder:
        "Preferred timing, team size, or any specific questions (optional).",
      sending: "Sending…",
      submit: "Request demo",
      footnote: "We'll respond within one business day.",
    },
    success: {
      title: "Request received.",
      body:
        "We'll be in touch within one business day to confirm your demo and tailor the session to your context.",
    },
  },

  // ─── Product subpages ──────────────────────────────────────────────────────
  product: {
    capture: {
      metaTitle: "Capture & Organise | Aksum",
      metaDescription:
        "Bring every conversation, report, and recording into one connected working memory. Aksum turns raw material into reusable organisational knowledge.",
      crumb: "Capture & Organise",
      eyebrow: "Capture & Organise",
      headlineLine1: "Everything your team knows,",
      headlineLine2: "in one place that works.",
      lead:
        "Aksum brings recordings, reports, and conversations into a single connected system, so nothing important gets left behind, and everything becomes easier to find, use, and build on.",
      step1: {
        eyebrow: "01. Bring it in",
        title: "Every format your team works with.",
        body:
          "Audio recordings, PDF reports, written transcripts, meeting notes: Aksum accepts the formats your team already produces. No reformatting required before the value starts.",
      },
      step2: {
        eyebrow: "02. Review & refine",
        title: "Precision where it matters most.",
        body:
          "Aksum is designed to preserve nuance. When the details matter, the platform gives your team a clear, fast way to verify what has been captured, so you can trust what you're working with.",
      },
      step3: {
        eyebrow: "03. Connect & link",
        title: "New information, connected to everything.",
        body:
          "Every source you add becomes part of a growing organisational memory. People, organisations, and themes are recognised and linked to what your team already knows, so context compounds over time.",
      },
      benefits: [
        {
          title: "Bring every conversation into one working memory",
          body:
            "Meetings, field recordings, written reports, and expert interviews: all structured, searchable, and connected to everything else your team already knows.",
        },
        {
          title: "Preserve what matters before it gets lost",
          body:
            "Critical context rarely survives in email threads or personal notes. Aksum captures it at the source and keeps it available for whoever needs it next.",
        },
        {
          title: "Review with confidence when the details matter",
          body:
            "When precision is important, Aksum makes it easy to verify and refine what has been captured, so your team can trust what they're working with.",
        },
        {
          title: "Turn raw material into connected context",
          body:
            "Every source you bring in becomes part of a growing organisational memory, linked to the people, organisations, and themes that already exist in your system.",
        },
      ],
      cta: {
        headline: "Ready to put your knowledge to work?",
        body: "See how Aksum captures and connects what your team already knows.",
      },
    },
    prepare: {
      metaTitle: "Prepare & Sell | Aksum",
      metaDescription:
        "Enter every meeting with more context. Aksum surfaces what your team already knows about accounts, relationships, and prior conversations, so you can prepare with real intelligence.",
      crumb: "Prepare & Sell",
      eyebrow: "Prepare & Sell",
      headlineLine1: "Better preparation",
      headlineLine2: "leads to better",
      headlineLine3: "conversations.",
      lead:
        "The most important work happens before the meeting. Aksum gives commercial teams the context, account memory, and relationship visibility they need to enter every conversation with a stronger position.",
      copilot: {
        eyebrow: "01. Aksum Copilot",
        title: "Account memory, on demand.",
        body:
          "The Copilot reasons over everything your team has captured (meetings, briefs, follow-up threads, recorded conversations) and surfaces what is relevant to the account, the relationship, or the moment.",
        benefits: [
          {
            title: "Account memory that compounds",
            body:
              "Every conversation, brief, and follow-up thread becomes part of a growing record. Aksum surfaces what is relevant before you ask.",
          },
          {
            title: "What not to repeat",
            body:
              "Know what the account has already heard, what landed, and what fell flat, so every approach adds something new.",
          },
          {
            title: "Open loops, surfaced automatically",
            body:
              "Unanswered requests, unresolved threads, and commitments that were never followed up. Aksum finds them before the meeting does.",
          },
          {
            title: "Intelligence grounded in prior context",
            body:
              "Every answer is anchored in what your team has actually recorded: not broad advice, but specific signals from real conversations.",
          },
        ],
      },
      graph: {
        eyebrow: "02. Network Explorer",
        titleLine1: "The structure behind",
        titleLine2: "every relationship.",
        body:
          "The Network Explorer maps every entity your team has encountered (people, companies, governments, regions, and internal documents) and shows how they connect. The graph is the structural backbone behind the Copilot's answers.",
        explainBody:
          "Every node in this graph corresponds to a real entity that appears in internal sources: interviews, briefs, meeting notes, and follow-up threads. The connections are not inferred from public data. They are drawn from what your team has actually recorded. Click any node to see what it connects to.",
        benefits: [
          {
            title: "See what connects before it is obvious",
            body:
              "Relationships between people, companies, and institutions are rarely visible in a single document. The graph makes the structure legible.",
          },
          {
            title: "The bridge that changes the conversation",
            body:
              "A shared contact, a prior relationship, a connected institution: the graph surfaces the path that makes the approach stronger.",
          },
          {
            title: "Context across the whole account",
            body:
              "Every entity in your workspace is connected to everything else it touches. The graph is the map of what your organisation actually knows.",
          },
          {
            title: "Structural memory behind every answer",
            body:
              "When the Copilot surfaces an insight, the graph shows you why it matters, and who else is connected to it.",
          },
        ],
      },
      closing: [
        {
          stat: "Every meeting",
          label: "entered with full account context",
          body:
            "Not a summary from the last call. The full picture, across every conversation, document, and relationship your team has ever recorded.",
        },
        {
          stat: "Less guesswork",
          label: "before high-value conversations",
          body:
            "Know what the account cares about, what they have already heard, and where the real opportunity sits, before the conversation starts.",
        },
        {
          stat: "Scattered memory",
          label: "turned into commercial readiness",
          body:
            "Information that lives in inboxes, personal notes, and forgotten briefs becomes a shared, searchable, and commercially useful asset.",
        },
      ],
      cta: {
        headline: "Ready to enter every meeting prepared?",
        body: "See how Aksum surfaces what your team already knows.",
      },
    },
    activate: {
      metaTitle: "Activate & Publish | Aksum",
      metaDescription:
        "Turn internal intelligence into polished, circulation-ready outputs. Aksum transforms what your organisation knows into newsletters, board briefs, investor memos, and strategic reports, structured for the audience and grounded in internal context.",
      crumb: "Activate & Publish",
      eyebrow: "Activate & Publish",
      headlineLine1: "Intelligence that",
      headlineLine2: "is ready to circulate.",
      lead:
        "Aksum transforms what your organisation knows into polished, structured outputs (newsletters, board briefs, investor memos, and strategic reports), each shaped for the audience and grounded in internal context.",
      output: {
        eyebrow: "01. Output formats",
        titleLine1: "The same intelligence,",
        titleLine2: "shaped for every audience.",
        body:
          "From a concise intelligence brief to a detailed board pack, Aksum structures internal knowledge into the format the audience actually needs, without losing the rigour of the underlying source material.",
        benefits: [
          {
            title: "One knowledge base, many audiences",
            body:
              "The same internal intelligence can be shaped into a board brief, an investor memo, a stakeholder newsletter, or an internal review. Each is structured for a different reader, without starting from scratch.",
          },
          {
            title: "Publish with authority, not improvisation",
            body:
              "Every output is grounded in what your organisation has actually recorded. The structure, the language, and the claims all trace back to real internal sources.",
          },
          {
            title: "Reduce the distance between signal and communication",
            body:
              "Intelligence that sits in internal documents and meeting notes rarely reaches the people who need it. Aksum closes that gap, from captured context to finished output.",
          },
          {
            title: "Documents your team can actually send",
            body:
              "Not drafts that need rewriting. Not summaries that lose the nuance. Outputs that are ready to circulate, internally or externally, without a second pass.",
          },
        ],
      },
      report: {
        eyebrow: "02. Strategic reports",
        titleLine1: "Documents that carry",
        titleLine2: "the weight of what you know.",
        body:
          "Aksum produces substantial, structured intelligence reports (annual reviews, sector outlooks, investment memoranda) that are grounded in internal sources and ready to share with boards, investors, or senior stakeholders.",
        explainBody:
          "Every section of this report, from the executive summary and the key signals to the implications, the recommended actions, and the appendix, is drawn from real internal sources. The document is not a template filled with placeholder text. It is a structured synthesis of what an organisation has actually gathered, formatted for circulation.",
        benefits: [
          {
            title: "Strategic depth, not surface coverage",
            body:
              "A Aksum report is not a summary of public information. It is a synthesis of what your team has gathered (conversations, filings, briefs, and internal analysis), structured into a document that communicates authority.",
          },
          {
            title: "Adapted to the reader, not the source",
            body:
              "The same intelligence can be presented as an executive summary for the board, a detailed review for the investment committee, or a sector outlook for external stakeholders. Each version is calibrated to the audience.",
          },
          {
            title: "Source-referenced and traceable",
            body:
              "Every claim in a Aksum report points back to a specific internal source. The appendix is not decoration; it is the foundation of credibility.",
          },
          {
            title: "Ready to circulate without revision",
            body:
              "The report surface produces documents that are structurally complete, editorially consistent, and ready to share, not raw material that requires a communications team to finish.",
          },
        ],
      },
      closing: [
        {
          stat: "From signal",
          label: "to finished output",
          body:
            "Intelligence that sits in internal documents and meeting notes rarely reaches the people who need it. Aksum closes the distance between what your team knows and what it can communicate.",
        },
        {
          stat: "One source",
          label: "many audiences",
          body:
            "The same internal knowledge base produces a board brief, an investor memo, and a stakeholder newsletter. Each is structured for a different reader, without rebuilding from scratch.",
        },
        {
          stat: "Grounded",
          label: "in internal context",
          body:
            "Every output traces back to a real internal source. The authority comes not from the format, but from the depth of what your organisation has actually gathered.",
        },
      ],
      cta: {
        headline: "Ready to put your intelligence to work?",
        body: "See how Aksum turns internal knowledge into outputs your team can actually use.",
      },
    },
    connect: {
      metaTitle: "Connect Your Workflow | Aksum",
      metaDescription:
        "Bring commercial context, communication threads, and project intelligence into one shared operating environment. Aksum connects the signals teams already work with, so intelligence is not isolated from execution.",
      crumb: "Connect Your Workflow",
      eyebrow: "Connect Your Workflow",
      headlineLine1: "Intelligence connected",
      headlineLine2: "to how you work.",
      lead:
        "Aksum brings together the conversations, targets, and context that commercial teams already rely on, so intelligence is not isolated from the decisions and execution it is supposed to support.",
      comms: {
        eyebrow: "01. Communications",
        titleLine1: "Every conversation,",
        titleLine2: "connected to its context.",
        body:
          "Account threads, follow-up commitments, and decisions made over email are part of the same working context as your intelligence: visible to the whole team, linked to the account, and ready before the next conversation.",
        benefits: [
          {
            title: "Continuity across every conversation",
            body:
              "Email threads, follow-up commitments, and account decisions are part of the same working context as your intelligence, not a separate inbox that no one checks before a meeting.",
          },
          {
            title: "Shared context, not personal memory",
            body:
              "When a team member picks up a thread, they see what has already been discussed, what was promised, and what the account has said, without asking someone else to brief them.",
          },
          {
            title: "Follow-ups that do not fall through",
            body:
              "Open commitments, unanswered questions, and pending requests are visible in the account context, not buried in someone's sent folder.",
          },
          {
            title: "Communication connected to what matters",
            body:
              "Every thread is linked to the account, the project, and the intelligence your team has gathered. Context does not have to be reconstructed before every call.",
          },
        ],
      },
      dashboard: {
        eyebrow: "02. Project context",
        titleLine1: "Targets, signals, and",
        titleLine2: "sources in one view.",
        body:
          "A Aksum project view shows not just what has been agreed, but what has been gathered: revenue targets, deal progress, team context, and the full range of sources feeding the project. One shared view of operational reality.",
        explainBody:
          "This is a working project view, not a reporting dashboard. The revenue figures, deal stages, team members, and source counts are all live context from the Angola 2025 project. The Sources tab shows every interview, email, meeting note, and report that feeds the project intelligence. Nothing is static or decorative.",
        benefits: [
          {
            title: "Targets and signals in the same place",
            body:
              "Revenue goals, deal progress, and the intelligence feeding the project sit in one view, not across a CRM, a spreadsheet, and a folder of documents that no one keeps in sync.",
          },
          {
            title: "Project visibility beyond static fields",
            body:
              "A Aksum project view shows not just what has been agreed, but what has been gathered: meetings, emails, interviews, and notes, so the team works from a complete picture.",
          },
          {
            title: "One shared view of project reality",
            body:
              "Every team member sees the same context: the deals, the activity, the sources, and the people. Operational knowledge does not live in one person's head.",
          },
          {
            title: "Intelligence connected to execution",
            body:
              "The information your team captures feeds directly into the project view, so the distance between what you know and what you act on is as short as possible.",
          },
        ],
      },
      closing: [
        {
          stat: "One context",
          label: "not five separate tools",
          body:
            "Conversations, targets, intelligence, and team context sit in the same environment. The operational picture is complete without switching between systems.",
        },
        {
          stat: "Less fragmentation",
          label: "across teams and sources",
          body:
            "When everyone works from the same project view, decisions are grounded in shared context, not in whoever happened to be on the last call.",
        },
        {
          stat: "Closer to execution",
          label: "from signal to action",
          body:
            "The distance between what your team knows and what it acts on shrinks when intelligence, communication, and commercial targets are connected.",
        },
      ],
      cta: {
        headline: "Ready to connect your operating context?",
        body: "See how Aksum brings intelligence and execution into one shared environment.",
      },
    },
  },
}

// Inferred from the EN object, with strings widened (no `as const`). This
// gives the dictionary a structural shape: every locale must provide the
// same keys, but the literal text is free to vary.
export type Dictionary = typeof en
