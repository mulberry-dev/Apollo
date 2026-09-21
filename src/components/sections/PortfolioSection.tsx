"use client"

import "@/styles/scss/sections/portfolio.scss"
import CommandLine from "@/components/terminal/CommandLine"
import TypeCopy from "@/components/terminal/TypeCopy"
import ProjectFlags from "@/components/terminal/ProjectFlags"
import ProjectType from "@/components/terminal/ProjectType"
import WorkspaceHeader from "@/components/terminal/WorkspaceHeader"
import Container from "@/components/ui/Container"
import FilterPills from "@/components/ui/FilterPills"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import { WORKSPACE } from "@/data/workspace"
import { useI18n } from "@/i18n/useI18n"
import {
  archiveProjects,
  builtWithoutAi,
  categoryCounts,
  extractYear,
  featuredProjects,
  localizeProject,
  padCount,
  techNames,
  type Project
} from "@/lib/projects"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type MouseEvent
} from "react"

const preloadedImages = new Set<string>()

const preloadProjectImage = (src: string) => {
  if (preloadedImages.has(src) || typeof window === "undefined") {
    return
  }

  preloadedImages.add(src)
  const image = new window.Image()
  image.decoding = "async"
  image.src = src
}

const useProjectLink = (project: Project) => {
  const router = useRouter()
  const pathname = usePathname()
  const { href: localize } = useI18n()
  const [loading, setLoading] = useState(false)
  const href = localize(`/portfolio/${project.id}`)

  useEffect(() => {
    setLoading(false)
  }, [pathname])

  const prefetchProject = () => {
    router.prefetch(href)
    preloadProjectImage(project.img)
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }

    setLoading(true)
    prefetchProject()
  }

  return { href, loading, prefetchProject, handleClick }
}

const FEATURED_LAYOUTS = ["visual-start", "visual-end", "visual-full"] as const
const FEATURED_ACCENTS = [
  "var(--brand-cyan)",
  "var(--brand-purple)",
  "var(--brand-blue)"
] as const

const FeaturedCard = ({
  project,
  index,
  total
}: {
  project: Project
  index: number
  total: number
}) => {
  const { t } = useI18n()
  const { href, loading, prefetchProject, handleClick } = useProjectLink(project)
  const year = extractYear(project.description)
  const stack = techNames(project.tech).slice(0, 4)
  const copy = t.projects[String(project.id)]
  const problem = copy?.problem
  const industry = copy?.industry
  const layout = FEATURED_LAYOUTS[index] ?? "visual-start"
  const visualFirst = layout !== "visual-end"

  const media = (
    <div className="work-card__media">
      <Image
        src={project.img}
        alt={`${project.name} — ${project.teaser}`}
        width={project.width || 1280}
        height={project.height || 800}
        sizes={
          layout === "visual-full"
            ? "(max-width: 1023px) 100vw, 1120px"
            : "(max-width: 1023px) 100vw, 62vw"
        }
        className="work-card__image"
        priority={index === 0}
        loading={index === 0 ? undefined : "lazy"}
        decoding="async"
      />
    </div>
  )

  const copyBlock = (
    <div className="work-card__copy">
      <header className="work-card__meta">
        <span className="work-card__index">
          {padCount(index + 1)}
          <span className="work-card__index-label">
            {" "}
            / {padCount(total)} · <TypeCopy text={t.portfolio.featured} caret={false} />
          </span>
        </span>
        <ProjectFlags project={project} />
      </header>
      <h3>{project.name}</h3>
      {industry ? (
        <p className="work-card__industry">
          <TypeCopy text={industry} caret={false} />
        </p>
      ) : null}
      <p className="work-card__teaser">
        <TypeCopy text={problem ?? project.teaser} />
      </p>
      <dl className="work-card__facts">
        {year ? (
          <div>
            <dt>
              <TypeCopy text={t.portfolio.year} caret={false} />
            </dt>
            <dd>{year}</dd>
          </div>
        ) : null}
        <div>
          <dt>
            <TypeCopy text={t.portfolio.type} caret={false} />
          </dt>
          <dd>
            <ProjectType project={project} />
          </dd>
        </div>
        <div className="work-card__facts-stack">
          <dt>
            <TypeCopy text={t.portfolio.stack} caret={false} />
          </dt>
          <dd>{stack.join(" · ")}</dd>
        </div>
      </dl>
      <span className="work-card__cta">
        <TypeCopy text={t.portfolio.viewCase} caret={false} />
        <span aria-hidden="true"> →</span>
      </span>
      {loading ? (
        <span className="portfolio-card__loader" role="status">
          <span className="portfolio-card__spinner" aria-hidden="true" />
          {t.portfolio.loading}
        </span>
      ) : null}
    </div>
  )

  return (
    <Link
      href={href}
      prefetch={false}
      className={`work-card-link${loading ? " is-loading" : ""}`}
      aria-busy={loading || undefined}
      onPointerEnter={prefetchProject}
      onFocus={prefetchProject}
      onClick={handleClick}
      style={
        {
          "--work-accent": FEATURED_ACCENTS[index % FEATURED_ACCENTS.length]
        } as CSSProperties
      }
    >
      <article className={`work-card work-card--${layout}`}>
        {visualFirst ? media : copyBlock}
        {visualFirst ? copyBlock : media}
      </article>
    </Link>
  )
}

const ArchiveCard = ({ project }: { project: Project }) => {
  const { t } = useI18n()
  const { href, loading, prefetchProject, handleClick } = useProjectLink(project)
  const stack = techNames(project.tech).slice(0, 3)

  return (
    <Link
      href={href}
      prefetch={false}
      className={`archive-card-link${loading ? " is-loading" : ""}`}
      aria-busy={loading || undefined}
      onPointerEnter={prefetchProject}
      onFocus={prefetchProject}
      onClick={handleClick}
    >
      <article className="archive-card">
        <div className="archive-card__copy">
          <header className="archive-card__meta">
            <ProjectType project={project} />
            <ProjectFlags project={project} />
          </header>
          <h3>{project.name}</h3>
          <p>
            <TypeCopy text={project.teaser} />
          </p>
          <p className="archive-card__stack">{stack.join(" · ")}</p>
          <span className="archive-card__cta">
            <TypeCopy text={t.portfolio.view} caret={false} />
            <span aria-hidden="true"> →</span>
          </span>
          {loading ? (
            <span className="portfolio-card__loader" role="status">
              <span className="portfolio-card__spinner" aria-hidden="true" />
              {t.portfolio.loading}
            </span>
          ) : null}
        </div>
        <div className="archive-card__media">
          <Image
            src={project.thumbnail}
            alt={`${project.name} — ${project.teaser}`}
            width={400}
            height={220}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            loading="lazy"
            decoding="async"
            className="archive-card__image"
          />
        </div>
      </article>
    </Link>
  )
}

const Portfolio = () => {
  const { t, locale } = useI18n()
  const [active, setActive] = useState("all")
  const filters = [
    { id: "all", label: t.portfolio.filters.all },
    { id: "web", label: t.portfolio.filters.web },
    { id: "landing", label: t.portfolio.filters.landing },
    { id: "api", label: t.portfolio.filters.api },
    { id: "ecommerce", label: t.portfolio.filters.ecommerce }
  ] as const

  const featuredVisible = useMemo(
    () =>
      featuredProjects.filter(project =>
        active === "all" ? true : project.category === active
      ),
    [active]
  )

  const archiveVisible = useMemo(
    () =>
      archiveProjects.filter(project =>
        active === "all" ? true : project.category === active
      ),
    [active]
  )

  const filterOptions = filters.map(filter => ({
    ...filter,
    count: categoryCounts[filter.id] || 0
  }))

  return (
    <section
      id="portfolio"
      data-section-path="/portfolio"
      aria-label={t.portfolio.ariaLabel}
      tabIndex={-1}
    >
      <Container className="portfolio-page">
        <WorkspaceHeader
          index={WORKSPACE.work.index}
          path={WORKSPACE.work.path}
          title={t.workspace.work}
          command={t.portfolio.command}
          meta={t.portfolio.meta
            .replace("{all}", padCount(categoryCounts.all))
            .replace("{featured}", padCount(featuredProjects.length))
            .replace("{archive}", padCount(archiveProjects.length))}
        />

        <Reveal type="nav">
          <FilterPills
            options={filterOptions}
            active={active}
            onChange={setActive}
            variant="command"
          />
        </Reveal>

        {featuredVisible.length ? (
          <RevealGroup className="work-featured" mode="scroll" stagger={80} key={active}>
            {featuredVisible.map((project, index) => (
              <Reveal key={String(project.id)} type="image">
                <FeaturedCard
                  project={localizeProject(project, locale)}
                  index={index}
                  total={featuredVisible.length}
                />
              </Reveal>
            ))}
          </RevealGroup>
        ) : null}

        <div className="work-archive">
          <CommandLine command={t.portfolio.archiveCommand} />
          <p className="workspace-header__meta">
            <TypeCopy
              text={`${t.portfolio.archiveMeta.replace("{count}", padCount(archiveVisible.length))}${
                archiveVisible.some(builtWithoutAi)
                  ? t.portfolio.archiveNoAi.replace(
                      "{count}",
                      padCount(archiveVisible.filter(builtWithoutAi).length)
                    )
                  : ""
              }`}
            />
          </p>
          <RevealGroup className="archive-grid" mode="auto" stagger={48} key={active}>
            {archiveVisible.map(project => (
              <Reveal key={String(project.id)} type="image">
                <ArchiveCard project={localizeProject(project, locale)} />
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  )
}

export default Portfolio
