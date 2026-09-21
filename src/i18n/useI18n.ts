"use client"

import { getMessages, navLabel } from "@/i18n"
import {
  getLocale,
  localizePath,
  stripLocale,
  type Locale
} from "@/lib/locale"
import { usePathname } from "next/navigation"

export const useI18n = () => {
  const pathname = usePathname()
  const locale: Locale = getLocale(pathname)
  const messages = getMessages(locale)
  const href = (path: string) => localizePath(path, locale)

  return {
    locale,
    messages,
    t: messages,
    href,
    pathname,
    sectionPath: stripLocale(pathname),
    navLabel: (path: string) => navLabel(messages, path)
  }
}
