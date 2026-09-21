"use client"

import JsonLd from "@/components/JsonLd"
import { organizationJsonLd, personJsonLd, websiteJsonLd } from "@/lib/jsonLd"
import { getLocale } from "@/lib/locale"
import { usePathname } from "next/navigation"

const LocaleJsonLd = () => {
  const locale = getLocale(usePathname())

  return (
    <JsonLd
      data={[
        personJsonLd(locale),
        organizationJsonLd(locale),
        websiteJsonLd(locale)
      ]}
    />
  )
}

export default LocaleJsonLd
