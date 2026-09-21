"use client"

import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SiteIcon, { type SiteIconName } from "@/components/ui/SiteIcon"
import TerminalPrompt from "@/components/terminal/TerminalPrompt"
import TypeCopy from "@/components/terminal/TypeCopy"
import { useParticles } from "@/components/particles"
import { links } from "@/data/navegation"
import { SITE_LOGO, SITE_NAME } from "@/data/site"
import { WORKSPACE } from "@/data/workspace"
import { useI18n } from "@/i18n/useI18n"
import { isHomePath } from "@/lib/locale"
import Image from "next/image"
import { SECTION_CHANGE_EVENT } from "@/lib/sectionNav"
import {
  didLeaveHome,
  HOME_CHROME_REVEALED_EVENT,
  isHomeChromeRevealed,
  markHomeChromeRevealed,
  shouldRevealHomeChrome
} from "@/lib/siteSession"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useLayoutEffect, useState } from "react"

const ORBIT_HOVER_RATE = 0.35
const VALUE_ICONS: SiteIconName[] = ["ruler", "layers", "target", "route"]
const NEXT_SECTION_PATH = links.find((link) => link.path !== "/")?.path ?? "/skills"
const TYPE_PAUSE_MS = 240
const TYPE_START_MS = 420

const splitIntroCopy = (text: string) => {
  const dash = text.search(/ — |—/)

  if (dash > 12) {
    const gap = text.slice(dash).startsWith(" — ") ? 3 : 1
    const at = dash + gap
    return [{ text: text.slice(0, at) }, { text: text.slice(at) }]
  }

  const pivot = text.match(/ (that|que) /i)

  if (pivot?.index && pivot.index > 12) {
    const at = pivot.index + 1
    return [{ text: text.slice(0, at) }, { text: text.slice(at) }]
  }

  return [{ text }]
}

const setOrbitRate = (node: HTMLDivElement, rate: number) => {
  node.getAnimations().forEach((animation) => {
    animation.playbackRate = rate
  })
}

const IndexPage = () => {
  const pathname = usePathname()
  const { t, href } = useI18n()
  const { reducedMotion } = useParticles()
  const [isFirstHome] = useState(() => !didLeaveHome())
  const [ready, setReady] = useState(false)
  const [typeStep, setTypeStep] = useState(isFirstHome ? -1 : 4)

  const revealChrome = useCallback(() => {
    if (isHomeChromeRevealed()) {
      return false
    }

    markHomeChromeRevealed()
    window.dispatchEvent(new Event(HOME_CHROME_REVEALED_EVENT))
    return true
  }, [])

  useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setTypeStep(4)
      return
    }

    if (!isFirstHome || typeStep !== -1) {
      return
    }

    const timeoutId = window.setTimeout(() => setTypeStep(0), TYPE_START_MS)
    return () => window.clearTimeout(timeoutId)
  }, [isFirstHome, reducedMotion, typeStep])

  const advanceType = (next: number) => () => {
    window.setTimeout(() => {
      setTypeStep((current) => (current < next ? next : current))
    }, TYPE_PAUSE_MS)
  }

  useEffect(() => {
    const onSectionChange = (event: Event) => {
      const path = (event as CustomEvent<{ path?: string }>).detail?.path

      if (path && path !== "/") {
        revealChrome()
      }
    }

    window.addEventListener(SECTION_CHANGE_EVENT, onSectionChange)
    return () => window.removeEventListener(SECTION_CHANGE_EVENT, onSectionChange)
  }, [revealChrome])

  useEffect(() => {
    if (!isHomePath(pathname) || shouldRevealHomeChrome() || window.scrollY > 1) {
      revealChrome()
      return
    }

    let armed = false
    const armId = window.requestAnimationFrame(() => {
      armed = true
    })

    const onFirstScroll = (event: Event) => {
      if (!armed || !event.isTrusted) {
        return
      }

      revealAndDetach()
    }

    const onFirstKeyScroll = (event: KeyboardEvent) => {
      if (!armed || !event.isTrusted) {
        return
      }

      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "PageDown" ||
        event.key === "PageUp" ||
        event.key === "Home" ||
        event.key === "End" ||
        event.key === " "
      ) {
        revealAndDetach()
      }
    }

    const revealAndDetach = () => {
      if (!revealChrome()) {
        return
      }

      window.removeEventListener("wheel", onFirstScroll)
      window.removeEventListener("touchmove", onFirstScroll)
      window.removeEventListener("scroll", onFirstScroll)
      window.removeEventListener("keydown", onFirstKeyScroll)
    }

    const scrollListener: AddEventListenerOptions = { passive: true }
    window.addEventListener("wheel", onFirstScroll, scrollListener)
    window.addEventListener("touchmove", onFirstScroll, scrollListener)
    window.addEventListener("scroll", onFirstScroll, scrollListener)
    window.addEventListener("keydown", onFirstKeyScroll)

    return () => {
      window.cancelAnimationFrame(armId)
      window.removeEventListener("wheel", onFirstScroll)
      window.removeEventListener("touchmove", onFirstScroll)
      window.removeEventListener("scroll", onFirstScroll)
      window.removeEventListener("keydown", onFirstKeyScroll)
    }
  }, [pathname, revealChrome])

  const introClass = [
    "home-intro",
    isFirstHome ? "is-first" : "is-return",
    ready ? "is-ready" : "",
    typeStep >= 4 ? "is-complete" : ""
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      id="index"
      className={introClass || undefined}
      data-section-path="/"
      aria-label={t.home.ariaLabel}
      tabIndex={-1}
    >
      <Container className="home-page">
        <div className="home-hero">
          <div className="home-hero__copy">
            <TerminalPrompt path={WORKSPACE.home.path} className="home-hero__prompt" />
            <div className="home-hero__brand">
              <Image
                className="home-hero__logo site-logo"
                src={SITE_LOGO}
                width={127}
                height={88}
                alt=""
                sizes="88px"
                quality={70}
                loading="eager"
              />
              <p className="home-hero__brand-name gradient-text">{SITE_NAME}</p>
            </div>
            <p className="home-hero__hello">
              <TypeCopy
                intro={isFirstHome}
                play={typeStep >= 0}
                onTyped={advanceType(1)}
                parts={[
                  { text: `${t.home.greeting} ` },
                  { text: t.home.name, className: "gradient-text home-hero__name" }
                ]}
              />
            </p>
            <p className={`home-hero__role${typeStep >= 1 ? " is-live" : ""}`}>
              <span className="home-hero__bracket">&lt;</span>{" "}
              <TypeCopy
                intro={isFirstHome}
                play={typeStep >= 1}
                onTyped={advanceType(2)}
                parts={[
                  { text: t.home.roleLead, className: "home-hero__teal" },
                  { text: " " },
                  { text: t.home.roleTrail, className: "home-hero__purple" }
                ]}
              />{" "}
              <span className="home-hero__bracket">/ &gt;</span>
            </p>
            <h1 className="home-hero__headline">
              <TypeCopy
                intro={isFirstHome}
                play={typeStep >= 2}
                pace="swift"
                onTyped={advanceType(3)}
                parts={splitIntroCopy(t.home.headline)}
              />
            </h1>
            <p className="home-hero__body">
              <TypeCopy
                intro={isFirstHome}
                play={typeStep >= 3}
                pace="swift"
                onTyped={advanceType(4)}
                parts={splitIntroCopy(t.home.body)}
              />
              <span className="home-hero__caret" aria-hidden="true">
                _
              </span>
            </p>
            <div className="home-hero__actions">
              <Button href={href(NEXT_SECTION_PATH)} variant="terminal">
                <TypeCopy text={t.home.cta} />
              </Button>
              <Button href={href("/portfolio")} variant="secondary">
                <TypeCopy text={t.home.ctaSecondary} />
              </Button>
            </div>
          </div>

          <div className="home-hero__visual" aria-hidden="true">
            <div
              className="home-orbit"
              onPointerEnter={(event) =>
                setOrbitRate(event.currentTarget, ORBIT_HOVER_RATE)
              }
              onPointerLeave={(event) => setOrbitRate(event.currentTarget, 1)}
            >
              <span className="home-orbit__node" />
            </div>
            <div
              className="home-orbit home-orbit--inner"
              onPointerEnter={(event) =>
                setOrbitRate(event.currentTarget, ORBIT_HOVER_RATE)
              }
              onPointerLeave={(event) => setOrbitRate(event.currentTarget, 1)}
            >
              <span className="home-orbit__node home-orbit__node--purple" />
            </div>
          </div>
        </div>

        <div className="home-value">
          <Reveal type="eyebrow" as="p" className="home-value__eyebrow">
            <TypeCopy text={t.home.valueEyebrow} />
          </Reveal>
          <RevealGroup as="ul" className="home-value__grid" mode="scroll" stagger={50}>
            {t.home.value.map((item, index) => (
              <Reveal key={item.title} as="li" type="card" className="home-value__item">
                <span className="home-value__icon" aria-hidden="true">
                  <SiteIcon name={VALUE_ICONS[index] ?? "puzzle"} />
                </span>
                <h2>
                  <TypeCopy text={item.title} />
                </h2>
                <p>
                  <TypeCopy text={item.text} />
                </p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  )
}

export default IndexPage
