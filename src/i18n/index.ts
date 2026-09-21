import { en } from "@/i18n/en"
import { es } from "@/i18n/es"
import { SECTION_PATHS, type Messages, type SectionPath } from "@/i18n/types"
import { DEFAULT_LOCALE, type Locale } from "@/lib/locale"

const dictionaries: Record<Locale, Messages> = { en, es }

export const getMessages = (locale: Locale = DEFAULT_LOCALE): Messages =>
  dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE]

export const navLabel = (messages: Messages, path: string) => {
  switch (path) {
    case "/":
      return messages.nav.home
    case "/about":
      return messages.nav.about
    case "/skills":
      return messages.nav.skills
    case "/portfolio":
      return messages.nav.portfolio
    case "/process":
      return messages.nav.process
    case "/certifications":
      return messages.nav.certifications
    case "/contact":
      return messages.nav.contact
    default:
      return messages.nav.home
  }
}

export const isSectionMetaPath = (path: string): path is SectionPath =>
  (SECTION_PATHS as readonly string[]).includes(path)

export type { Messages, ProjectCopy, SectionPath } from "@/i18n/types"
