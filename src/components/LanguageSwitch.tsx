"use client"

import { useI18n } from "@/i18n/useI18n"
import { localizePath, writeStoredLocale } from "@/lib/locale"
import Link from "next/link"

const LanguageSwitch = ({ className }: { className?: string }) => {
  const { locale, sectionPath, t } = useI18n()
  const enHref = localizePath(sectionPath, "en")
  const esHref = localizePath(sectionPath, "es")

  return (
    <nav className={className ?? "language-switch"} aria-label={t.language.label}>
      <Link
        href={enHref}
        hrefLang="en"
        lang="en"
        scroll={false}
        prefetch={false}
        data-locale-switch=""
        aria-current={locale === "en" ? "page" : undefined}
        onClick={() => writeStoredLocale("en")}
      >
        {t.language.en}
      </Link>
      <span aria-hidden="true">/</span>
      <Link
        href={esHref}
        hrefLang="es"
        lang="es"
        scroll={false}
        prefetch={false}
        data-locale-switch=""
        aria-current={locale === "es" ? "page" : undefined}
        onClick={() => writeStoredLocale("es")}
      >
        {t.language.es}
      </Link>
    </nav>
  )
}

export default LanguageSwitch
