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

const Process = () => {
  const { t, href } = useI18n()

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
        <div className="process-terminal">
          <header className="process-chrome">
            <BuildSession path={PROCESS_PATH} />
          </header>

          <RevealGroup className="process-intro" mode="auto" stagger={70}>
            <Reveal type="heading" as="h2" className="process-headline">
              <TypeCopy text={t.process.headline} />
            </Reveal>
            <Reveal type="text" as="p" className="process-lead">
              <TypeCopy text={t.process.lead} />
            </Reveal>
          </RevealGroup>

          <RevealGroup as="ol" className="process-steps" mode="scroll" stagger={48}>
            {PROCESS_STEPS.map((step, index) => {
              const copy = t.process.steps[index]

              return (
                <Reveal key={step.id} as="li" type="card" className={`process-step process-step--${step.accent}`}>
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
                </Reveal>
              )
            })}
          </RevealGroup>

          <RevealGroup as="footer" className="process-foot" mode="scroll" stagger={50}>
            <Reveal type="text" as="p">
              <TypeCopy text={t.process.ctaQuestion} />
            </Reveal>
            <Reveal type="button">
              <Button href={href("/contact")} variant="terminal">
                <TypeCopy text={t.process.ctaAction} />
              </Button>
            </Reveal>
          </RevealGroup>
        </div>
      </Container>
    </section>
  )
}

export default Process
