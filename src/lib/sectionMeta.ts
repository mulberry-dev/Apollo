import { getMessages, isSectionMetaPath } from "@/i18n"
import { data as projects } from "@/data/projects"
import { DEFAULT_LOCALE, localizePath, type Locale } from "@/lib/locale"
import {
  AUTHOR_NAME,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_URL
} from "@/data/site"
import type { Metadata } from "next"

export const languageAlternates = (path: string) => {
  const en = localizePath(path, "en")
  const es = localizePath(path, "es")

  return {
    "en": `${SITE_URL}${en === "/" ? "" : en}`,
    "es": `${SITE_URL}${es}`,
    "x-default": `${SITE_URL}${en === "/" ? "" : en}`
  }
}

export const absoluteUrl = (path: string, locale: Locale = DEFAULT_LOCALE) => {
  const localized = localizePath(path, locale)
  return localized === "/" ? SITE_URL : `${SITE_URL}${localized}`
}

export const sectionPageMetadata = (
  path: string,
  locale: Locale = DEFAULT_LOCALE
): Metadata => {
  const messages = getMessages(locale)
  const section = isSectionMetaPath(path) ? messages.sections[path] : null
  const isHome = path === "/"
  const title = section?.title ?? messages.site.title
  const description = section?.description ?? messages.site.description
  const canonical = absoluteUrl(path, locale)
  const ogTitle = isHome ? title : `${title} | ${SITE_NAME}`

  return {
    title: isHome ? { absolute: title } : title,
    description,
    keywords: messages.site.keywords,
    authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
    creator: AUTHOR_NAME,
    alternates: {
      canonical,
      languages: languageAlternates(path)
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_MX" : "en_US",
      type: "website",
      images: [SITE_OG_IMAGE]
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [SITE_OG_IMAGE.url]
    }
  }
}

export const projectPageMetadata = (
  id: string,
  locale: Locale = DEFAULT_LOCALE
): Metadata => {
  const project = projects.find(item => String(item.id) === id)
  const messages = getMessages(locale)

  if (!project) {
    return { title: messages.project.notFound }
  }

  const copy = messages.projects[id]
  const description = copy?.description ?? project.description
  const canonical = absoluteUrl(`/portfolio/${id}`, locale)
  const title = copy?.name ?? project.name
  const ogTitle = `${title} | ${SITE_NAME}`
  const image = project.img

  return {
    title,
    description,
    authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
    creator: AUTHOR_NAME,
    alternates: {
      canonical,
      languages: languageAlternates(`/portfolio/${id}`)
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_MX" : "en_US",
      type: "article",
      images: [{ url: image }]
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image]
    }
  }
}
