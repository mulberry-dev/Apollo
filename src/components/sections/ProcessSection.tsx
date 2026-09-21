"use client"

import "@/styles/scss/sections/process.scss"
import { BuildSession } from "@/components/build/BuildChrome"
import TypeCopy from "@/components/terminal/TypeCopy"
import WorkspaceHeader from "@/components/terminal/WorkspaceHeader"
import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SiteIcon from "@/components/ui/SiteIcon"
import { PROCESS_PATH, PROCESS_STEPS } from "@/data/process"
import { WORKSPACE } from "@/data/workspace"
import { useI18n } from "@/i18n/useI18n"
import { useEffect, useState, type CSSProperties } from "react"

const Process = () => {
  const { t, href } = useI18n()
  const [active, setActive] = useState(PROCESS_STEPS[0]?.id ?? "")

  useEffect(() => {
    const nodes = PROCESS_STEPS.map((step) =>
      document.getElementById(`process-${step.id}`)
    ).filter((node): node is HTMLElement => Boolean(node))

    if (!nodes.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        const id = visible?.target.getAttribute("data-step-id")

        if (id) {
          setActive(id)
        }
      },
      { root: null, rootMargin: "-28% 0px -48% 0px", threshold: [0, 0.35, 0.7] }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const activeIndex = Math.max(
    0,
    PROCESS_STEPS.findIndex((step) => step.id === active)
  )

  return (
    <section
      id="process"
      data-section-path="/process"
      aria-label={t.process.ariaLabel}
      tabIndex={-1}
    >
      <Container className="process-page">
        <WorkspaceHeader
          index={WORKSPACE.process.index}
          path={WORKSPACE.process.path}
          title={t.workspace.process}
        />
        <div className="process-story">
          <header className="process-story__intro">
            <BuildSession path={PROCESS_PATH} />
            <RevealGroup className="process-intro" mode="auto" stagger={70}>
              <Reveal type="heading" as="h2" className="process-headline">
                <TypeCopy text={t.process.headline} />
              </Reveal>
              <Reveal type="text" as="p" className="process-lead">
                <TypeCopy text={t.process.lead} />
              </Reveal>
            </RevealGroup>
            <p className="process-story__active" aria-hidden="true">
              {PROCESS_STEPS[activeIndex]?.index} / {PROCESS_STEPS.length}
            </p>
          </header>

          <ol
            className="process-steps"
            style={{ "--process-progress": (activeIndex + 1) / PROCESS_STEPS.length } as CSSProperties}
          >
            {PROCESS_STEPS.map((step, index) => {
              const copy = t.process.steps[index]

              return (
                <Reveal
                  key={step.id}
                  as="li"
                  type="text"
                  className={`process-step process-step--${step.accent}${
                    active === step.id ? " is-active" : ""
                  }`}
                >
                  <article
                    id={`process-${step.id}`}
                    data-step-id={step.id}
                    className="process-step__body"
                  >
                    <span className="process-step__index">{step.index}</span>
                    <span className="process-step__icon" aria-hidden="true">
                      <SiteIcon name={step.icon} />
                    </span>
                    <div className="process-step__copy">
                      <h3>
                        <TypeCopy text={copy?.title ?? step.id} />
                      </h3>
                      <p>
                        <TypeCopy text={copy?.text ?? ""} />
                      </p>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </ol>
        </div>

        <footer className="process-foot">
          <p>
            <TypeCopy text={t.process.ctaQuestion} />
          </p>
          <Button href={href("/contact")} variant="terminal">
            <TypeCopy text={t.process.ctaAction} />
          </Button>
        </footer>
      </Container>
    </section>
  )
}

export default Process
