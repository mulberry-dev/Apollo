import type { SiteIconName } from "@/components/ui/SiteIcon"

export type BuildAccent = "cyan" | "blue" | "indigo" | "purple" | "orange"

export const BUILD_HOST = "santiago@dev"
export const BUILD_PATH = "~/services"
export const BUILD_STACK_PATH = "~/stack"

export const BUILD_INTRO = {
  headline: "How I ship products."
} as const

export const BUILD_INTERFACES = {
  index: "01",
  title: "FRONTEND",
  accent: "cyan" as const,
  kicker: "WHAT PEOPLE SEE",
  items: [
    { icon: "interface" as const, label: "UI components" },
    { icon: "cursor" as const, label: "Interactions" },
    { icon: "user" as const, label: "UX & accessibility" },
    { icon: "performance" as const, label: "Performance & Testing" }
  ],
  tech: ["React", "Next.js", "TypeScript"]
} as const

export const BUILD_SYSTEMS = {
  index: "02",
  title: "BACKEND",
  accent: "blue" as const,
  kicker: "HOW IT WORKS",
  items: [
    { icon: "systems" as const, label: "APIs" },
    { icon: "connect" as const, label: "Services" },
    { icon: "database" as const, label: "Databases" },
    { icon: "cube" as const, label: "Architecture" },
    { icon: "thinking" as const, label: "Business logic" }
  ],
  tech: ["Node.js", "Express", "GraphQL"]
} as const

export const BUILD_MODERNIZATION = {
  index: "04",
  title: "MODERNIZATION",
  accent: "purple" as const,
  kicker: "EVOLVE WITHOUT BREAKING",
  copy: [
    "I don't replace working businesses.",
    "I modernize the systems behind them."
  ],
  legacy: {
    label: "LEGACY",
    items: ["PHP", "Old UI", "Monolith", "Disconnected", "Hard to scale"]
  },
  modern: {
    label: "MODERN",
    items: [
      "React / TypeScript",
      "Node.js / GraphQL",
      "Modular Architecture",
      "Connected Systems",
      "Scalable & Maintainable"
    ]
  }
} as const

export const BUILD_CONNECTED = {
  index: "03",
  title: "DATA & INTEGRATIONS",
  accent: "indigo" as const,
  kicker: "EVERYTHING WORKS TOGETHER",
  items: [
    { icon: "lock" as const, label: "Identity" },
    { icon: "payment" as const, label: "Payments" },
    { icon: "database" as const, label: "Data" },
    { icon: "connect" as const, label: "APIs" }
  ]
} as const

export const BUILD_APPROACH = {
  index: "05",
  title: "STAR METHOD",
  accent: "orange" as const,
  kicker: "THIS IS MY DEVELOPMENT METHOD",
  stages: [
    {
      letter: "S",
      title: "SITUATION",
      text: "The context I start from.",
      tone: "orange"
    },
    {
      letter: "T",
      title: "TASK",
      text: "What I take on.",
      tone: "orange"
    },
    {
      letter: "A",
      title: "ACTION",
      text: "The decisions I make.",
      tone: "orange"
    },
    {
      letter: "R",
      title: "RESULT",
      text: "The impact I deliver.",
      tone: "orange"
    }
  ]
} as const

export const BUILD_STACK = {
  groups: [
    {
      key: "frontend",
      label: "Frontend",
      tone: "cyan",
      names: [
        "React",
        "React Native",
        "Redux",
        "TypeScript",
        "Jest",
        "Playwright",
        "Sass"
      ]
    },
    {
      key: "backend",
      label: "Backend",
      tone: "blue",
      names: ["Node", "Express", "Apollo GraphQL"]
    },
    {
      key: "databases",
      label: "Data",
      tone: "indigo",
      names: ["SQL", "TypeORM", "MongoDB", "Firebase"]
    },
    {
      key: "devops",
      label: "DevOps",
      tone: "purple",
      names: ["Git - Github", "Docker", "Jenkins", "AWS"]
    },
    {
      key: "tools",
      label: "Tools",
      tone: "orange",
      names: ["Cursor", "WordPress", "Jira", "Slack"]
    },
    {
      key: "ai",
      label: "AI",
      tone: "teal",
      names: [
        "Cursor Grok 4.6",
        "Composer 2.5",
        "Opus 5",
        "Sonnet 5",
        "Fable 5"
      ]
    }
  ]
} as const

export const ARCH_REQUEST = {
  method: "POST",
  path: "/graphql",
  status: "200 OK"
} as const

export const ARCH_LAYERS = [
  { id: "client", label: "CLIENT", icon: "frontend" as const, tone: "cyan" },
  { id: "api", label: "API", icon: "connect" as const, tone: "blue", tag: "Auth" },
  { id: "services", label: "SERVICES", icon: "cube" as const, tone: "indigo", tag: "Logic" },
  { id: "data", label: "DATA", icon: "database" as const, tone: "purple", tag: "S3" }
] as const

export const CONNECTED_NODES: {
  id: string
  label: string
  icon: SiteIconName
  slot: "n" | "w" | "e" | "s"
  tone: "cyan" | "blue" | "indigo" | "purple" | "orange"
}[] = [
  { id: "identity", label: "IDENTITY", icon: "lock", slot: "n", tone: "cyan" },
  { id: "payments", label: "PAYMENTS", icon: "payment", slot: "w", tone: "orange" },
  { id: "apis", label: "APIs", icon: "connect", slot: "e", tone: "blue" },
  { id: "data", label: "DATA", icon: "database", slot: "s", tone: "purple" }
]

export const PRODUCT_METRICS = [
  { label: "Appointments", value: "128", delta: "+12%" },
  { label: "New clients", value: "36", delta: "+8%" },
  { label: "Revenue", value: "$12,456", delta: "+18%" }
] as const

export const PRODUCT_ACTIVITY = [
  { title: "New booking", meta: "Ana R. · 10:30" },
  { title: "Payment received", meta: "$180 · card" },
  { title: "Client added", meta: "Luis M." },
  { title: "Reminder sent", meta: "Tomorrow 9:00" }
] as const

export const PRODUCT_NAV = [
  { icon: "gauge" as const, label: "Overview", active: true },
  { icon: "calendar" as const, label: "Appointments", active: false },
  { icon: "user" as const, label: "Clients", active: false },
  { icon: "payment" as const, label: "Payments", active: false },
  { icon: "systems" as const, label: "Settings", active: false }
] as const

export const PRODUCT_LAYERS = [
  { id: "structure", label: "01 STRUCTURE", active: false },
  { id: "components", label: "02 COMPONENTS", active: false },
  { id: "interaction", label: "03 INTERACTION", active: false },
  { id: "interface", label: "04 INTERFACE", active: true }
] as const

export const BUILD_SECTIONS = [
  { id: "build-intro", index: "00", label: "SOLUTIONS" },
  { id: "build-interfaces", index: "01", label: "INTERFACES", accent: BUILD_INTERFACES.accent },
  { id: "build-systems", index: "02", label: "SYSTEMS", accent: BUILD_SYSTEMS.accent },
  { id: "build-connected", index: "03", label: "INTEGRATIONS", accent: BUILD_CONNECTED.accent },
  { id: "build-modernize", index: "04", label: "MODERNIZE", accent: BUILD_MODERNIZATION.accent }
] as const
