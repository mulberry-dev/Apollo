import type { SiteIconName } from "@/components/ui/SiteIcon"
import {
  CALENDLY_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  GITHUB_URL,
  LINKEDIN_URL
} from "@/data/site"

export const CONTACT_INTRO = {
  availability: "Available for new opportunities"
} as const

export const CONTACT_OPTIONS_COPY = {
  supporting: "I usually respond within 24 hours."
} as const

export type ContactOption = {
  id: string
  title: string
  description?: string
  cta: string
  href: string
  icon: SiteIconName
  external: boolean
  featured?: boolean
}

const CALL_OPTION: ContactOption | null = CALENDLY_URL
  ? {
      id: "call",
      title: "Call",
      description: "30 minutes to talk through a project.",
      cta: "Book a call",
      href: CALENDLY_URL,
      icon: "phone",
      external: true
    }
  : null

export const CONTACT_OPTIONS: ContactOption[] = [
  {
    id: "email",
    title: "Email",
    description: "Best for project briefs.",
    cta: "Send email",
    href: `mailto:${CONTACT_EMAIL}`,
    icon: "mail",
    external: false,
    featured: true
  },
  {
    id: "phone",
    title: "Phone",
    description: CONTACT_PHONE,
    cta: "Call",
    href: `tel:${CONTACT_PHONE_TEL}`,
    icon: "phone",
    external: false
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Work and opportunities.",
    cta: "View profile",
    href: LINKEDIN_URL,
    icon: "linkedin",
    external: true
  },
  ...(CALL_OPTION ? [CALL_OPTION] : []),
  {
    id: "github",
    title: "GitHub",
    description: "Code and public repos.",
    cta: "View GitHub",
    href: GITHUB_URL,
    icon: "github",
    external: true
  }
]
