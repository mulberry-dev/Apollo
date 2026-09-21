import type { SiteIconName } from "@/components/ui/SiteIcon"

export const ABOUT_HOST = "santiago@dev"
export const ABOUT_PATH = "~/about-me"
export const ABOUT_INITIALS = "SM"
export const ABOUT_NAME = "Santiago Morera"
export const ABOUT_ROLE = "Senior Full Stack Engineer"
export const ABOUT_LOCATION_SHORT = "MEXICO CITY, MX"

export const ABOUT_INTRO = {
  command: "cat about-me.txt",
  headline: ["I BUILD WHAT YOU SEE.", "AND I MAKE IT WORK."],
  accentFrom: 1,
  body: [
    "I came to software through design.",
    "Senior Full Stack Engineer in Mexico City — React, TypeScript, Next.js, and Node.js.",
    "I work in English and Spanish. Available for new opportunities."
  ]
} as const

export const ABOUT_WHOAMI = {
  command: "whoami",
  name: ABOUT_NAME
} as const

export const ABOUT_ORIGIN = {
  code: "MX",
  coords: "19.43°N  99.13°W"
} as const

export const ABOUT_HISTORY = {
  command: "git log --oneline",
  items: [
    {
      step: "01",
      title: "I care about how products feel",
      text: "Clear interfaces, small details, and experiences that make people feel confident."
    },
    {
      step: "02",
      title: "I want the work to last",
      text: "Decisions a team can keep building on — not a demo that falls apart a year later."
    }
  ]
} as const

export const ABOUT_PASSIONS: {
  icon: SiteIconName
  label: string
}[] = [
  { icon: "puzzle", label: "Solving problems" },
  { icon: "design", label: "Interface design" },
  { icon: "devices", label: "Mobile apps & PWAs" }
]

export const ABOUT_FOOTER = {
  question: "have a project in mind?",
  action: "start a project",
  href: "/contact"
} as const

export const ABOUT_WHY: {
  icon: SiteIconName
}[] = [
  { icon: "craft" },
  { icon: "thinking" },
  { icon: "user" },
  { icon: "puzzle" },
  { icon: "globe" }
]

export const ABOUT_SECTIONS = [
  { id: "about-why", index: "01", label: "WHY" },
  { id: "about-intro", index: "02", label: "INTRO" },
  { id: "about-identity", index: "03", label: "IDENTITY" },
  { id: "about-path", index: "04", label: "PATH" }
] as const
