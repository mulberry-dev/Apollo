import { getMessages } from "@/i18n"
import { FEATURED_PROJECT_IDS } from "@/data/workspace"
import { data as projects } from "@/data/projects"
import type { Locale } from "@/lib/locale"

export type Project = (typeof projects)[number]

export const CATEGORY_LABEL: Record<string, string> = {
  web: "Web App",
  landing: "Landing Page",
  api: "API",
  ecommerce: "eCommerce"
}

export const padCount = (value: number) => String(value).padStart(2, "0")

export const extractYear = (description: string) => {
  const match = description.match(/\((\d{4}(?:[–-]\d{4})?)\)/)
  return match?.[1]
}

export const extractStartYear = (description: string) => {
  const year = extractYear(description)
  const start = year?.match(/^\d{4}/)?.[0]
  return start ? Number(start) : undefined
}

export const builtWithoutAi = (project: Project) => {
  const source = projects.find(item => String(item.id) === String(project.id)) ?? project
  const year = extractStartYear(source.description)
  return year !== undefined && year <= 2023
}

export const builtWithAi = (project: Project) => {
  const source = projects.find(item => String(item.id) === String(project.id)) ?? project
  const year = extractStartYear(source.description)
  return year !== undefined && year > 2023
}

export const projectSlug = (id: string | number) =>
  String(id)
    .replace(/([a-z\d])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase()

export const techNames = (tech: Project["tech"]) =>
  tech.map(item => (typeof item === "string" ? item : item.tech))

export const localizeProject = (project: Project, locale: Locale): Project => {
  const copy = getMessages(locale).projects[String(project.id)]

  if (!copy) {
    return project
  }

  return {
    ...project,
    name: copy.name ?? project.name,
    teaser: copy.teaser,
    description: copy.description
  }
}

export const projectStatus = (project: Project) => {
  const source = projects.find(item => String(item.id) === String(project.id)) ?? project
  const copy = `${source.teaser} ${source.description}`

  if (!project.url) {
    return { id: "private" as const, label: "Private" }
  }

  if (/ongoing/i.test(copy)) {
    return { id: "ongoing" as const, label: "Ongoing" }
  }

  return { id: "live" as const, label: "Live" }
}

export const hasLivePreview = (
  project: Project
): project is Project & { url: string } =>
  typeof project.url === "string" &&
  (project as { preview?: boolean }).preview !== false

export const featuredProjects = FEATURED_PROJECT_IDS.map(id =>
  projects.find(project => String(project.id) === id)
).filter((project): project is Project => Boolean(project))

const featuredIdSet = new Set<string>(FEATURED_PROJECT_IDS)

export const archiveProjects = projects
  .filter(project => !featuredIdSet.has(String(project.id)))
  .slice()
  .sort((left, right) => Number(right.category === "api") - Number(left.category === "api"))

export const categoryCounts = projects.reduce<Record<string, number>>(
  (counts, project) => {
    counts.all += 1
    counts[project.category] = (counts[project.category] || 0) + 1
    return counts
  },
  { all: 0 }
)
