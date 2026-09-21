"use client"

import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SiteIcon, { type SiteIconName } from "@/components/ui/SiteIcon"
import TerminalPrompt from "@/components/terminal/TerminalPrompt"
import TypeCopy from "@/components/terminal/TypeCopy"
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
import { useCallback, useEffect, useState } from "react"

const ORBIT_HOVER_RATE = 0.35
const VALUE_ICONS: SiteIconName[] = ["ruler", "layers", "target", "route"]
const NEXT_SECTION_PATH = links.find((link) => link.path !== "/")?.path ?? "/skills"

const setOrbitRate = (node: HTMLDivElement, rate: number) => {
  node.getAnimations().forEach((animation) => {
    animation.playbackRate = rate
  })
}

const IndexPage = () => {
  const pathname = usePathname()
  const { t, href } = useI18n()
  const [isFirstHome] = useState(() => !didLeaveHome())

  const revealChrome = useCallback(() => {
    if (isHomeChromeRevealed()) {
      return false
    }

    markHomeChromeRevealed()
    window.dispatchEvent(new Event(HOME_CHROME_REVEALED_EVENT))
    return true
  }, [])

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

  const introClass = ["home-intro", isFirstHome ? "" : "is-return"]
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
          <RevealGroup className="home-hero__copy" mode="fold" stagger={45}>
            <Reveal type="eyebrow">
              <TerminalPrompt path={WORKSPACE.home.path} className="home-hero__prompt" />
            </Reveal>
            <Reveal type="hero" className="home-hero__brand">
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
            </Reveal>
            <Reveal type="heading" as="p" className="home-hero__hello">
              <TypeCopy
                parts={[
                  { text: `${t.home.greeting} ` },
                  { text: t.home.name, className: "gradient-text home-hero__name" }
                ]}
              />
            </Reveal>
            <Reveal type="text" as="p" className="home-hero__role">
              <span className="home-hero__bracket">&lt;</span>{" "}
              <TypeCopy
                parts={[
                  { text: t.home.roleLead, className: "home-hero__teal" },
                  { text: " " },
                  { text: t.home.roleTrail, className: "home-hero__purple" }
                ]}
              />{" "}
              <span className="home-hero__bracket">/ &gt;</span>
            </Reveal>
            <Reveal type="heading" as="h1" className="home-hero__headline">
              <TypeCopy text={t.home.headline} />
            </Reveal>
            <Reveal type="text" as="p" className="home-hero__body">
              <TypeCopy text={t.home.body} />
              <span className="home-hero__caret" aria-hidden="true">
                _
              </span>
            </Reveal>
            <Reveal type="button" className="home-hero__actions">
              <Button href={href(NEXT_SECTION_PATH)} variant="terminal">
                <TypeCopy text={t.home.cta} />
              </Button>
              <Button href={href("/portfolio")} variant="secondary">
                <TypeCopy text={t.home.ctaSecondary} />
              </Button>
            </Reveal>
          </RevealGroup>

          <Reveal type="image" mode="fold" delay={200} className="home-hero__visual" aria-hidden="true">
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
          </Reveal>
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
