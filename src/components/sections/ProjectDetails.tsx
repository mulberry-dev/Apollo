"use client"

import "@/styles/scss/sections/project-detail.scss"
import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import ProjectFlags from "@/components/terminal/ProjectFlags"
import ProjectType from "@/components/terminal/ProjectType"
import ProjectPreview from "@/components/sections/ProjectPreview"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SiteIcon from "@/components/ui/SiteIcon"
import TechBadge from "@/components/ui/TechBadge"
import TerminalPrompt from "@/components/terminal/TerminalPrompt"
import TypeCopy from "@/components/terminal/TypeCopy"
import { projectHighlights } from "@/data/projectHighlights"
import { data as projects } from "@/data/projects"
import { WORKSPACE } from "@/data/workspace"
import { useI18n } from "@/i18n/useI18n"
import { usePreviewAvailability } from "@/lib/previewAvailability"
import {
  builtWithAi,
  builtWithoutAi,
  extractYear,
  hasLivePreview,
  localizeProject,
  padCount,
  projectSlug
} from "@/lib/projects"
import { ConfirmLeaveSite, PrivateDeployment, SiteOffline } from "@/utils/alerts"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const ExternalIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M6.2 3.5H3.6A1.6 1.6 0 0 0 2 5.1v7.3A1.6 1.6 0 0 0 3.6 14h7.3a1.6 1.6 0 0 0 1.6-1.6V9.4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M8.8 2.5h4.7V7.2M7.2 8.8 13.5 2.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ProjectNavChevron = ({ direction }: { direction: "prev" | "next" }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {direction === "prev" ? (
      <path d="M15 6 9 12l6 6" />
    ) : (
      <path d="M9 6l6 6-6 6" />
    )}
  </svg>
)

const ProjectDetails = ({ id }: { id: string }) => {
  const router = useRouter()
  const { t, locale, href } = useI18n()
  const index = projects.findIndex(item => String(item.id) === id)
  const source = index >= 0 ? projects[index] : undefined
  const project = source ? localizeProject(source, locale) : undefined
  const previous = index > 0 ? projects[index - 1] : null
  const next =
    index >= 0 && index < projects.length - 1 ? projects[index + 1] : null
  const highlightSource = project ? projectHighlights[String(project.id)] : undefined
  const highlightCopy = project ? t.projects[String(project.id)]?.highlights : undefined
  const caseCopy = project ? t.projects[String(project.id)] : undefined
  const highlights = highlightSource?.map((item, highlightIndex) => ({
    ...item,
    title: highlightCopy?.[highlightIndex]?.title ?? item.title,
    text: highlightCopy?.[highlightIndex]?.text ?? item.text
  }))
  const github = project && "github" in project ? project.github : null
  const year = source ? extractYear(source.description) : undefined
  const handmade = source ? builtWithoutAi(source) : false
  const withAi = source ? builtWithAi(source) : false
  const {
    status: availability,
    embeddable,
    resolve: resolveAvailability
  } = usePreviewAvailability(project?.url ?? null)
  const siteOffline = availability === "offline"

  useEffect(() => {
    if (previous) {
      router.prefetch(href(`/portfolio/${previous.id}`))
    }

    if (next) {
      router.prefetch(href(`/portfolio/${next.id}`))
    }
  }, [href, next, previous, router])

  if (!project) {
    return (
      <section>
        <Container className="project-page">
          <RevealGroup mode="fold" stagger={24}>
            <Reveal type="heading" as="h1">
              <TypeCopy text={t.project.notFound} />
            </Reveal>
            <Reveal type="button">
              <Button href={href("/portfolio")} variant="secondary">
                <TypeCopy text={t.project.back} />
              </Button>
            </Reveal>
          </RevealGroup>
        </Container>
      </section>
    )
  }

  return (
    <section id="portfolio">
      <Container className="project-page">
        <div className="project-overview">
          <Reveal type="nav" mode="fold" className="project-context">
            <TerminalPrompt path={`${WORKSPACE.work.path}/${projectSlug(project.id)}`} />
            <Link href={href("/portfolio")} className="project-back">
              ← <TypeCopy text={t.project.back} />
            </Link>
          </Reveal>

          <div className="project-hero">
            <RevealGroup className="project-hero__copy" mode="fold" stagger={28}>
              <div className="project-hero__identity">
                <Reveal type="eyebrow" className="project-hero__kicker">
                  <span>
                    {padCount(index + 1)} / <TypeCopy text={t.project.kicker} caret={false} />
                  </span>
                  <ProjectFlags
                    project={project}
                    availability={project.url ? availability : undefined}
                  />
                </Reveal>
                <Reveal type="heading" as="h1" className="project-hero__title">
                  {project.name}
                </Reveal>
                {caseCopy?.industry ? (
                  <Reveal type="text" className="project-hero__industry">
                    <TypeCopy text={caseCopy.industry} caret={false} />
                  </Reveal>
                ) : null}
                <Reveal type="text" className="project-hero__facts-wrap">
                  <dl className="project-hero__facts">
                    {year ? (
                      <div>
                        <dt>
                          <TypeCopy text={t.project.year} caret={false} />
                        </dt>
                        <dd>{year}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt>
                        <TypeCopy text={t.project.type} caret={false} />
                      </dt>
                      <dd>
                        <ProjectType project={project} />
                      </dd>
                    </div>
                    {handmade || withAi ? (
                      <div>
                        <dt>
                          <TypeCopy text={t.project.origin} caret={false} />
                        </dt>
                        <dd
                          title={
                            handmade
                              ? t.status.handmadeTitle
                              : t.status.withAiTitle
                          }
                        >
                          <TypeCopy
                            text={handmade ? t.status.handmade : t.status.withAi}
                            caret={false}
                          />
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                </Reveal>
              </div>
              <Reveal type="text" className="project-hero__about">
                <h2 className="project-hero__label">
                  <TypeCopy text={t.project.about} />
                </h2>
                <p>
                  <TypeCopy text={project.description} />
                </p>
              </Reveal>
              {caseCopy?.problem ? (
                <Reveal type="text" className="project-hero__about">
                  <h2 className="project-hero__label">
                    <TypeCopy text={t.project.challenge} />
                  </h2>
                  <p>
                    <TypeCopy text={caseCopy.problem} />
                  </p>
                </Reveal>
              ) : null}
              {caseCopy?.solution ? (
                <Reveal type="text" className="project-hero__about">
                  <h2 className="project-hero__label">
                    <TypeCopy text={t.project.solution} />
                  </h2>
                  <p>
                    <TypeCopy text={caseCopy.solution} />
                  </p>
                </Reveal>
              ) : null}
              {caseCopy?.role ? (
                <Reveal type="text" className="project-hero__about">
                  <h2 className="project-hero__label">
                    <TypeCopy text={t.project.role} />
                  </h2>
                  <p>
                    <TypeCopy text={caseCopy.role} />
                  </p>
                </Reveal>
              ) : null}
              {caseCopy?.outcome ? (
                <Reveal type="text" className="project-hero__about">
                  <h2 className="project-hero__label">
                    <TypeCopy text={t.project.outcome} />
                  </h2>
                  <p>
                    <TypeCopy text={caseCopy.outcome} />
                  </p>
                </Reveal>
              ) : null}
              {highlights?.length ? (
                <Reveal type="text" className="project-hero__features">
                  <h2 className="project-hero__label">
                    <TypeCopy text={t.project.features} />
                  </h2>
                  <ul className="project-highlights">
                    {highlights.map((item, highlightIndex) => (
                      <li key={item.icon ?? highlightIndex}>
                        <span className="project-highlights__icon">
                          <SiteIcon name={item.icon} />
                        </span>
                        <span className="project-highlights__copy">
                          <strong>
                            <TypeCopy text={item.title} />
                          </strong>
                          <TypeCopy text={item.text} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
              <Reveal type="button" className="project-hero__actions">
                {project.url ? (
                  siteOffline ? (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => SiteOffline(project.name, t.project)}
                    >
                      <TypeCopy text={t.project.offline} />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={async () => {
                        const next = await resolveAvailability()
                        if (next === "offline") {
                          SiteOffline(project.name, t.project)
                          return
                        }

                        const leave = await ConfirmLeaveSite(t.project)
                        if (leave) {
                          window.location.assign(project.url)
                        }
                      }}
                    >
                      <TypeCopy text={t.project.visit} />
                      <ExternalIcon />
                    </Button>
                  )
                ) : (
                  <Button
                    type="button"
                    onClick={() => PrivateDeployment(project.name, t.project)}
                  >
                    <TypeCopy text={t.project.private} />
                  </Button>
                )}
                {github ? (
                  <Button href={github} variant="secondary" external>
                    <TypeCopy text={t.project.github} />
                  </Button>
                ) : null}
              </Reveal>
            </RevealGroup>

            <Reveal type="image" className="project-hero__visual" mode="fold">
              {hasLivePreview(project) ? (
                <ProjectPreview
                  url={project.url}
                  poster={project.img}
                  name={project.name}
                  teaser={project.teaser}
                  availability={availability}
                  embeddable={embeddable}
                />
              ) : (
                <Image
                  className="project-hero__image"
                  src={project.img}
                  alt={`${project.name} — ${project.teaser}`}
                  width={project.width || 1280}
                  height={project.height || 800}
                  sizes="(max-width: 899px) 100vw, 58vw"
                  priority
                />
              )}
            </Reveal>
          </div>
        </div>

        <div className="project-stack">
          <Reveal type="text" mode="scroll" as="h2" className="project-stack__title">
            <TypeCopy text={t.project.technologies} />
          </Reveal>
          <RevealGroup className="project-tech" mode="scroll" stagger={28}>
            {project.tech.map((tech, techIndex) =>
              typeof tech === "string" ? (
                <Reveal key={`${tech}-${techIndex}`} type="button">
                  <TechBadge name={tech} />
                </Reveal>
              ) : (
                <Reveal key={tech.tech} type="button">
                  <TechBadge name={tech.tech} icon={tech.icon} />
                </Reveal>
              )
            )}
          </RevealGroup>
        </div>

        <div className="project-convert">
          <p>
            <TypeCopy text={t.project.similarQuestion} />
          </p>
          <Button href={href("/contact")} variant="terminal">
            <TypeCopy text={t.project.similarAction} />
          </Button>
        </div>

        <div className="project-nav-wrap">
          <Reveal type="nav" mode="fold">
            <nav className="project-nav" aria-label={t.project.navLabel}>
              {previous ? (
                <Link
                  className="project-nav__link"
                  href={href(`/portfolio/${previous.id}`)}
                  prefetch
                  aria-label={`${t.project.previous}: ${previous.name}`}
                >
                  <ProjectNavChevron direction="prev" />
                  <span className="project-nav__copy">
                    <span className="project-nav__dir">
                      <TypeCopy text={t.project.previous} caret={false} />
                    </span>
                    <span className="project-nav__name">{previous.name}</span>
                  </span>
                </Link>
              ) : (
                <span className="project-nav__link is-disabled">
                  <ProjectNavChevron direction="prev" />
                  <TypeCopy text={t.project.previous} caret={false} />
                </span>
              )}
              {next ? (
                <Link
                  className="project-nav__link project-nav__link--next"
                  href={href(`/portfolio/${next.id}`)}
                  prefetch
                  aria-label={`${t.project.next}: ${next.name}`}
                >
                  <span className="project-nav__copy">
                    <span className="project-nav__dir">
                      <TypeCopy text={t.project.next} caret={false} />
                    </span>
                    <span className="project-nav__name">{next.name}</span>
                  </span>
                  <ProjectNavChevron direction="next" />
                </Link>
              ) : (
                <span className="project-nav__link project-nav__link--next is-disabled">
                  <TypeCopy text={t.project.next} caret={false} />
                  <ProjectNavChevron direction="next" />
                </span>
              )}
            </nav>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

export default ProjectDetails
