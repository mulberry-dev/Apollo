import { getMessages } from "@/i18n"
import { projectHighlights } from "@/data/projectHighlights"
import { data as projects } from "@/data/projects"
import {
  AUTHOR_COUNTRY,
  AUTHOR_LOCATION_LOCALITY,
  AUTHOR_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE_TEL,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_URL
} from "@/data/site"
import { absoluteUrl } from "@/lib/sectionMeta"
import type { Locale } from "@/lib/locale"

const personId = `${SITE_URL}/#person`
const organizationId = `${SITE_URL}/#organization`
const websiteId = `${SITE_URL}/#website`

const postalAddress = {
  "@type": "PostalAddress",
  addressLocality: AUTHOR_LOCATION_LOCALITY,
  addressCountry: AUTHOR_COUNTRY
}

export const personJsonLd = (locale: Locale) => {
  const messages = getMessages(locale)

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: AUTHOR_NAME,
    alternateName: SITE_NAME,
    url: absoluteUrl("/", locale),
    image: `${SITE_URL}${SITE_OG_IMAGE.url}`,
    jobTitle: messages.jsonLd.jobTitle,
    description: messages.jsonLd.description,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_TEL,
    address: postalAddress,
    knowsLanguage: ["en", "es"],
    knowsAbout: [
      "Custom web applications",
      "Business websites",
      "MVP development",
      "Systems and integrations",
      "Full stack development",
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "GraphQL",
      "Legacy modernization"
    ],
    sameAs: [LINKEDIN_URL, GITHUB_URL],
    worksFor: { "@id": organizationId },
    founderOf: { "@id": organizationId }
  }
}

export const organizationJsonLd = (locale: Locale) => {
  const messages = getMessages(locale)

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: SITE_NAME,
    alternateName: AUTHOR_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${SITE_OG_IMAGE.url}`,
    image: `${SITE_URL}${SITE_OG_IMAGE.url}`,
    description: messages.jsonLd.organizationDescription,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_TEL,
    address: postalAddress,
    areaServed: {
      "@type": "City",
      name: messages.jsonLd.areaServed
    },
    availableLanguage: ["English", "Spanish"],
    founder: { "@id": personId },
    employee: { "@id": personId },
    sameAs: [LINKEDIN_URL, GITHUB_URL],
    knowsAbout: [
      "Custom web applications",
      "Business websites",
      "MVP development",
      "Software integrations",
      "Legacy modernization"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: messages.jsonLd.catalogName,
      itemListElement: messages.jsonLd.services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: { "@id": organizationId },
          areaServed: messages.jsonLd.areaServed,
          availableLanguage: ["English", "Spanish"]
        }
      }))
    }
  }
}

export const websiteJsonLd = (locale: Locale) => {
  const messages = getMessages(locale)

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: SITE_NAME,
    alternateName: AUTHOR_NAME,
    url: absoluteUrl("/", locale),
    description: messages.site.description,
    inLanguage: locale === "es" ? ["es", "en"] : ["en", "es"],
    publisher: { "@id": organizationId },
    author: { "@id": personId }
  }
}

export const projectJsonLd = (id: string, locale: Locale) => {
  const project = projects.find(item => String(item.id) === id)
  const messages = getMessages(locale)
  const copy = messages.projects[id]

  if (!project) {
    return null
  }

  const highlights = copy?.highlights ?? projectHighlights[id] ?? []
  const url = absoluteUrl(`/portfolio/${id}`, locale)

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: copy?.name ?? project.name,
    description: copy?.description ?? project.description,
    url,
    image: project.img.startsWith("http") ? project.img : `${SITE_URL}${project.img}`,
    creator: { "@id": personId },
    inLanguage: locale,
    keywords: project.tech.map(item =>
      typeof item === "string" ? item : item.tech
    ),
    about: highlights.map(item => item.title)
  }
}

export const breadcrumbJsonLd = (
  items: { name: string; path: string }[],
  locale: Locale
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path, locale)
  }))
})
