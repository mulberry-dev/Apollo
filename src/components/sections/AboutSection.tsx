"use client"

import "@/styles/scss/sections/about.scss"
import Container from "@/components/ui/Container"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SiteIcon from "@/components/ui/SiteIcon"
import TypeCopy from "@/components/terminal/TypeCopy"
import WorkspaceHeader from "@/components/terminal/WorkspaceHeader"
import dynamic from "next/dynamic"
import { WORKSPACE } from "@/data/workspace"
import {
  ABOUT_FOOTER,
  ABOUT_HOST,
  ABOUT_INITIALS,
  ABOUT_LOCATION_SHORT,
  ABOUT_NAME,
  ABOUT_ORIGIN,
  ABOUT_PASSIONS,
  ABOUT_PATH,
  ABOUT_HISTORY,
  ABOUT_SECTIONS,
  ABOUT_WHY
} from "@/data/about"
import { useI18n } from "@/i18n/useI18n"
import Link from "next/link"
import { useEffect, useState } from "react"

const AboutPortrait = dynamic(() => import("@/components/about/AboutPortrait"))

const Prompt = ({
  command,
  cursor = false
}: {
  command: string
  cursor?: boolean
}) => (
  <p className="about-prompt">
    <span className="about-prompt__cash">$</span>
    <span>
      {" "}
      <TypeCopy text={command} />
    </span>
    {cursor ? <span className="about-cursor" aria-hidden="true" /> : null}
  </p>
)

const SessionPrompt = ({ cursor = false }: { cursor?: boolean }) => (
  <p className="about-session">
    <span className="about-session__host">{ABOUT_HOST}</span>
    <span className="about-session__colon">:</span>
    <span className="about-session__path">{ABOUT_PATH}</span>
    <span className="about-session__cash">$</span>
    {cursor ? <span className="about-cursor" aria-hidden="true" /> : null}
  </p>
)

const About = () => {
  const { t, href } = useI18n()
  const [active, setActive] = useState<string>(ABOUT_SECTIONS[0].id)

  useEffect(() => {
    const nodes = ABOUT_SECTIONS.map((section) =>
      document.getElementById(section.id)
    ).filter((node): node is HTMLElement => Boolean(node))

    if (!nodes.length) {
      return
    }

    const update = () => {
      const about = document.getElementById("about")

      if (about && about.getBoundingClientRect().top >= -24) {
        setActive(ABOUT_SECTIONS[0].id)
        return
      }

      const marker = window.innerHeight * 0.34
      let current = nodes[0].id

      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= marker) {
          current = node.id
        }
      }

      setActive(current)
    }

    let frame = 0
    const schedule = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    update()

    const observer = new IntersectionObserver(schedule, {
      root: null,
      rootMargin: "-22% 0px -52% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1]
    })

    nodes.forEach((node) => observer.observe(node))
    window.addEventListener("resize", schedule)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", schedule)

      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  const railCopy = (id: string) => {
    if (id === "about-why") {
      return t.about.rail.why
    }

    if (id === "about-intro") {
      return t.about.rail.intro
    }

    if (id === "about-identity") {
      return t.about.rail.identity
    }

    return t.about.rail.path
  }

  const goToBlock = (id: string) => {
    const node = document.getElementById(id)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    node?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start"
    })
    if (node) {
      node.classList.remove("is-targeted")
      void node.offsetWidth
      node.classList.add("is-targeted")
    }
    setActive(id)
  }

  return (
    <section
      id="about"
      data-section-path="/about"
      aria-label={t.about.ariaLabel}
      tabIndex={-1}
    >
      <Container className="about-page">
        <WorkspaceHeader
          index={WORKSPACE.about.index}
          path={WORKSPACE.about.path}
          title={t.workspace.about}
        />
        <div className="about-terminal">
          <nav className="about-rail" aria-label={t.nav.onThisPage}>
            {ABOUT_SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                className={
                  active === section.id
                    ? "about-rail__item is-active"
                    : "about-rail__item"
                }
                onClick={() => goToBlock(section.id)}
                aria-current={active === section.id ? "true" : undefined}
              >
                <span className="about-rail__index">{section.index}</span>
                <span className="about-rail__label">
                  <TypeCopy
                    text={railCopy(section.id)}
                    caret={false}
                  />
                </span>
              </button>
            ))}
          </nav>

          <header className="about-chrome">
            <SessionPrompt />
            <p className="about-chrome__place">
              <span className="about-chrome__dot" aria-hidden="true" />
              {ABOUT_LOCATION_SHORT}
            </p>
          </header>

          <RevealGroup className="about-why" mode="auto" stagger={56}>
            <div id="about-why" data-about-section="why">
              <Reveal type="eyebrow">
                <Prompt command={t.about.whyEyebrow} />
              </Reveal>
              <Reveal type="heading" as="h2" className="about-why__hook">
                <TypeCopy text={t.about.hook} />
              </Reveal>
              <Reveal type="text" as="p" className="about-why__lead">
                <TypeCopy text={t.about.hookLead} />
              </Reveal>
              <Reveal type="heading" as="h3" className="about-why__headline">
                <TypeCopy text={t.about.whyHeadline} />
              </Reveal>
              <ul className="about-why__list">
                {ABOUT_WHY.map((item, index) => (
                  <Reveal key={item.icon} as="li" type="chip">
                    <span className="about-why__icon" aria-hidden="true">
                      <SiteIcon name={item.icon} />
                    </span>
                    <span>
                      <strong>
                        <TypeCopy text={t.about.why[index]?.title ?? ""} />
                      </strong>
                      <TypeCopy text={t.about.why[index]?.text ?? ""} />
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </RevealGroup>

          <div className="about-identity">
            <RevealGroup className="about-intro" mode="auto" stagger={70}>
              <div id="about-intro" data-about-section="intro">
                <Reveal type="eyebrow">
                  <Prompt command={t.about.command} cursor />
                </Reveal>
                <Reveal type="heading" as="h2" className="about-headline">
                  {t.about.headline.map((line, index) => (
                    <span
                      key={index}
                      className={
                        index >= t.about.accentFrom
                          ? "about-headline__line is-accent"
                          : "about-headline__line"
                      }
                    >
                      <TypeCopy text={line} block />
                    </span>
                  ))}
                </Reveal>
                <Reveal type="text" className="about-intro__body" as="p">
                  {t.about.body.map((line, index) => (
                    <TypeCopy key={index} text={line} block />
                  ))}
                </Reveal>
              </div>
            </RevealGroup>

            <Reveal type="image" mode="auto" delay={120} className="about-photo">
              <AboutPortrait />
            </Reveal>

            <RevealGroup className="about-meta" mode="auto" stagger={56}>
              <div id="about-identity" data-about-section="identity">
                <Reveal type="eyebrow">
                  <Prompt command={t.about.whoami} cursor />
                </Reveal>
                <Reveal type="text" as="p" className="about-whoami__name">
                  {ABOUT_NAME}
                </Reveal>
                <Reveal type="text" as="p" className="about-whoami__origin">
                  <span>{ABOUT_ORIGIN.code}</span>
                  <span>{ABOUT_ORIGIN.coords}</span>
                </Reveal>
              </div>

              <div className="about-passions">
                <Reveal type="eyebrow">
                  <Prompt command={t.about.passionsCommand} />
                </Reveal>
                <ul>
                  {ABOUT_PASSIONS.map((item, index) => (
                    <Reveal key={item.icon} as="li" type="chip">
                      <span className="about-passions__icon" aria-hidden="true">
                        <SiteIcon name={item.icon} />
                      </span>
                      <TypeCopy text={t.about.passions[index] ?? item.label} />
                    </Reveal>
                  ))}
                </ul>
              </div>
            </RevealGroup>
          </div>

          <RevealGroup className="about-path" mode="scroll" stagger={48}>
            <div id="about-path" data-about-section="path">
              <Reveal type="eyebrow">
                <Prompt command={t.about.historyCommand} />
              </Reveal>
              <ol className="about-log">
                {ABOUT_HISTORY.items.map((item, index) => (
                  <Reveal key={item.step} as="li" type="chip">
                    <span className="about-log__step">{item.step}</span>
                    <span>
                      <strong>
                        <TypeCopy text={t.about.history[index]?.title ?? item.title} />
                      </strong>
                      <TypeCopy text={t.about.history[index]?.text ?? item.text} />
                    </span>
                  </Reveal>
                ))}
              </ol>
            </div>
          </RevealGroup>

          <footer className="about-foot">
            <span className="about-foot__mark">{ABOUT_INITIALS}</span>
            <Link href={href(ABOUT_FOOTER.href)} className="about-talk" scroll={false}>
              <TypeCopy text={t.about.footerQuestion} />
              <span className="about-talk__arrow" aria-hidden="true">
                -&gt;
              </span>
              <span className="about-talk__cmd">
                [ <TypeCopy text={t.about.footerAction} /> ]
              </span>
            </Link>
          </footer>
        </div>
      </Container>
    </section>
  )
}

export default About
