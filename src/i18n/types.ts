import type { Locale } from "@/lib/locale"

export type ProjectHighlightCopy = {
  title: string
  text: string
}

export type ProjectCopy = {
  name?: string
  teaser: string
  description: string
  highlights: ProjectHighlightCopy[]
  industry?: string
  problem?: string
  solution?: string
  role?: string
  outcome?: string
}

export type Messages = {
  locale: Locale
  htmlLang: string
  skipToContent: string
  nav: {
    home: string
    about: string
    skills: string
    portfolio: string
    process: string
    certifications: string
    contact: string
    primary: string
    openMenu: string
    closeMenu: string
    onThisPage: string
  }
  language: {
    label: string
    en: string
    es: string
  }
  site: {
    title: string
    description: string
    keywords: string[]
    role: string
    location: string
  }
  sections: Record<
    | "/"
    | "/about"
    | "/skills"
    | "/portfolio"
    | "/process"
    | "/certifications"
    | "/contact",
    { title: string; description: string }
  >
  workspace: {
    home: string
    about: string
    skills: string
    work: string
    process: string
    certifications: string
    contact: string
  }
  home: {
    ariaLabel: string
    greeting: string
    name: string
    roleLead: string
    roleTrail: string
    headline: string
    body: string
    cta: string
    ctaSecondary: string
    valueEyebrow: string
    value: { title: string; text: string }[]
  }
  about: {
    ariaLabel: string
    command: string
    headline: string[]
    accentFrom: number
    body: string[]
    whoami: string
    passionsCommand: string
    passions: string[]
    historyCommand: string
    history: { title: string; text: string }[]
    whyEyebrow: string
    hook: string
    hookLead: string
    whyHeadline: string
    why: { title: string; text: string }[]
    footerQuestion: string
    footerAction: string
    rail: { why: string; intro: string; identity: string; path: string }
  }
  skills: {
    ariaLabel: string
    headline: string
    stackTitle: string
    stackLead: string
    stackEvidence: string
    viewMore: string
    viewLess: string
    capabilities: { title: string; text: string }[]
    interfaces: {
      kicker: string
      items: string[]
    }
    systems: {
      kicker: string
      items: string[]
    }
    connected: {
      kicker: string
      items: string[]
    }
    modernization: {
      kicker: string
      copy: string[]
      legacyLabel: string
      modernLabel: string
      legacy: string[]
      modern: string[]
    }
    groups: {
      frontend: string
      backend: string
      databases: string
      devops: string
      tools: string
      ai: string
    }
    rail: {
      intro: string
      frontend: string
      backend: string
      connected: string
      modernize: string
    }
  }
  process: {
    ariaLabel: string
    headline: string
    lead: string
    steps: { title: string; text: string }[]
    ctaQuestion: string
    ctaAction: string
  }
  portfolio: {
    ariaLabel: string
    command: string
    archiveCommand: string
    featured: string
    year: string
    type: string
    stack: string
    viewCase: string
    view: string
    loading: string
    meta: string
    archiveMeta: string
    archiveNoAi: string
    filters: { all: string; web: string; landing: string; api: string; ecommerce: string }
  }
  certifications: {
    ariaLabel: string
    kicker: string
    headline: string
    meta: string
    view: string
    close: string
    previous: string
    next: string
    metrics: { value: string; label: string }[]
    filters: { all: string; security: string; english: string; development: string }
    categories: {
      mobile: string
      security: string
      english: string
      development: string
    }
    items: Record<string, { title: string }>
  }
  contact: {
    ariaLabel: string
    command: string
    checking: string
    statusPrefix: string
    availability: string
    supporting: string
    headline: string
    startConversation: string
    selectChannel: string
    opensTab: string
    form: {
      name: string
      email: string
      company: string
      companyOptional: string
      project: string
      submit: string
      sending: string
      success: string
      partial: string
      error: string
      rateLimited: string
      next: string
      errors: {
        nameRequired: string
        nameShort: string
        nameLong: string
        emailRequired: string
        emailInvalid: string
        emailLong: string
        companyLong: string
        projectRequired: string
        projectShort: string
        projectLong: string
      }
    }
    mail: {
      path: string
      localeName: string
      briefLabel: string
      receivedAt: string
      timezone: string
      fields: {
        name: string
        email: string
        company: string
        project: string
      }
      visitor: {
        subject: string
        preheader: string
        kicker: string
        headline: string
        intro: string
        copyLabel: string
        signoff: string
        cta: string
        band: string
        footer: string
      }
      owner: {
        subject: string
        preheader: string
        kicker: string
        headline: string
        intro: string
        copyLabel: string
        replyCta: string
        replyHint: string
        footer: string
      }
    }
    options: {
      email: { title: string; description: string; cta: string }
      phone: { title: string; description: string; cta: string }
      linkedin: { title: string; description: string; cta: string }
      github: { title: string; description: string; cta: string }
      call: { title: string; description: string; cta: string }
    }
  }
  project: {
    notFound: string
    back: string
    kicker: string
    visit: string
    private: string
    offline: string
    github: string
    year: string
    type: string
    origin: string
    industry: string
    about: string
    challenge: string
    solution: string
    role: string
    outcome: string
    features: string
    technologies: string
    previous: string
    next: string
    navLabel: string
    similarQuestion: string
    similarAction: string
    privateTitle: string
    privateText: string
    privateConfirm: string
    offlineTitle: string
    offlineText: string
    leaveTitle: string
    leaveText: string
    leaveStay: string
    leaveGo: string
    preview: string
    previewInteract: string
    previewExit: string
  }
  footer: {
    systemOnline: string
  }
  notFound: {
    title: string
    heading: string
    body: string
    back: string
  }
  categories: {
    web: string
    landing: string
    api: string
    ecommerce: string
  }
  status: {
    live: string
    ongoing: string
    private: string
    offline: string
    noAi: string
    noAiTitle: string
    withAi: string
    withAiTitle: string
    handmade: string
    handmadeTitle: string
  }
  jsonLd: {
    jobTitle: string
    description: string
    organizationDescription: string
    catalogName: string
    areaServed: string
    services: { name: string; description: string }[]
  }
  projects: Record<string, ProjectCopy>
}

export const SECTION_PATHS = [
  "/",
  "/skills",
  "/portfolio",
  "/process",
  "/about",
  "/certifications",
  "/contact"
] as const

export type SectionPath = (typeof SECTION_PATHS)[number]
