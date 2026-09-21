"use client"

import LanguageSwitch from "@/components/LanguageSwitch"
import TypeCopy from "@/components/terminal/TypeCopy"
import { SITE_LOGO, SITE_NAME } from "@/data/site"
import { links } from "@/data/navegation"
import { useI18n } from "@/i18n/useI18n"
import { isHomePath, stripLocale } from "@/lib/locale"
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scrollLock"
import { SECTION_CHANGE_EVENT } from "@/lib/sectionNav"
import {
  HOME_CHROME_REVEALED_EVENT,
  isHomeChromeRevealed,
  markHomeChromeRevealed,
  markLeftHome,
  shouldPlayNavIntro,
  shouldRevealHomeChrome,
  syncHomeNavWaitClass
} from "@/lib/siteSession"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type TransitionEvent
} from "react"

type MenuPhase = "closed" | "open" | "closing"
type ChromePhase = "wait" | "nav" | "shown"

const MOBILE_INDICATOR_DELAY_MS = 420
const HOME_CHROME_NAV_MS = 480
const INDICATOR_HEIGHT = 2

const isActivePath = (pathname: string, path: string) => {
  const current = stripLocale(pathname)

  if (path === "/") {
    return current === "/"
  }

  if (path === "/about" && current === "/certifications") {
    return true
  }

  return current === path || current.startsWith(`${path}/`)
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const Navigation = () => {
  const pathname = usePathname()
  const { href, t, navLabel, locale } = useI18n()
  const menuId = useId()
  const [menu, setMenu] = useState<MenuPhase>("closed")
  const toggleRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const lastFocusRef = useRef<HTMLElement | null>(null)
  const menuWasOpenRef = useRef(false)

  if (!isHomePath(pathname)) {
    markLeftHome()
  }

  const [playNavIntro, setPlayNavIntro] = useState(false)
  const [playToggleIntro, setPlayToggleIntro] = useState(false)
  const [chromePhase, setChromePhase] = useState<ChromePhase>(() =>
    isHomePath(pathname) && !shouldRevealHomeChrome() ? "wait" : "shown"
  )
  const [isCompact, setIsCompact] = useState(false)
  const [activePath, setActivePath] = useState(pathname)
  const [indicatorReady, setIndicatorReady] = useState(false)
  const [mobileLinksSettled, setMobileLinksSettled] = useState(false)
  const menuOpen = menu !== "closed"
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const skipIndicatorMotionRef = useRef(true)
  const indicatorReadyRef = useRef(false)
  const localeRef = useRef(locale)

  useEffect(() => {
    if (shouldPlayNavIntro()) {
      setPlayNavIntro(true)
    }
  }, [])

  useEffect(() => {
    if (chromePhase !== "wait") {
      setPlayToggleIntro(false)
      return
    }

    const timeoutId = window.setTimeout(() => {
      setPlayToggleIntro(true)
    }, 560)

    return () => window.clearTimeout(timeoutId)
  }, [chromePhase])

  useLayoutEffect(() => {
    const shouldWait = isHomePath(pathname) && !shouldRevealHomeChrome()

    if (!shouldWait) {
      if (!isHomePath(pathname)) {
        markHomeChromeRevealed()
      }

      setChromePhase("shown")
      syncHomeNavWaitClass(false)
      return
    }

    setChromePhase("wait")
    syncHomeNavWaitClass(true)

    const onReveal = () => {
      markHomeChromeRevealed()
      syncHomeNavWaitClass(false)
      setChromePhase(prefersReducedMotion() ? "shown" : "nav")
    }

    window.addEventListener(HOME_CHROME_REVEALED_EVENT, onReveal)

    if (isHomeChromeRevealed()) {
      onReveal()
    }

    return () => window.removeEventListener(HOME_CHROME_REVEALED_EVENT, onReveal)
  }, [pathname])

  useEffect(() => {
    if (chromePhase !== "nav") {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setChromePhase("shown")
    }, HOME_CHROME_NAV_MS)

    return () => window.clearTimeout(timeoutId)
  }, [chromePhase])

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)")
    const sync = () => {
      skipIndicatorMotionRef.current = true
      setIsCompact(media.matches)
    }
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const node = navRef.current

    if (!node) {
      return
    }

    if (isCompact && menu !== "open") {
      node.setAttribute("inert", "")
    } else {
      node.removeAttribute("inert")
    }
  }, [isCompact, menu])

  useEffect(() => {
    if (!isCompact && menu !== "closed") {
      setMenu("closed")
    }
  }, [isCompact, menu])

  useEffect(() => {
    setActivePath(pathname)
  }, [pathname])

  useEffect(() => {
    const onSectionChange = (event: Event) => {
      const path = (event as CustomEvent<{ path?: string }>).detail?.path

      if (path) {
        setActivePath(path)
      }
    }

    window.addEventListener(SECTION_CHANGE_EVENT, onSectionChange)
    return () => window.removeEventListener(SECTION_CHANGE_EVENT, onSectionChange)
  }, [])

  useEffect(() => {
    if (!isHomePath(pathname)) {
      document.body.classList.add("nav-intro-done")
    }

    setMenu((current) => (current === "open" ? "closing" : current))
  }, [pathname])

  useEffect(() => {
    if (!playNavIntro) {
      document.body.classList.add("nav-intro-done")
      return
    }

    const timeoutId = window.setTimeout(() => {
      document.body.classList.add("nav-intro-done")
    }, 1850)

    return () => window.clearTimeout(timeoutId)
  }, [playNavIntro])

  useLayoutEffect(() => {
    if (menu !== "open") {
      document.body.classList.remove("nav-menu-open")
      return
    }

    document.body.classList.add("nav-menu-open")
    lockBodyScroll()

    return () => {
      document.body.classList.remove("nav-menu-open")
      unlockBodyScroll()
    }
  }, [menu])

  useEffect(() => {
    if (menu !== "open") {
      return
    }

    lastFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : toggleRef.current
    menuWasOpenRef.current = true

    const getFocusable = () => {
      const items = [
        toggleRef.current,
        ...(navRef.current
          ? Array.from(
              navRef.current.querySelectorAll<HTMLElement>("a[href], button")
            )
          : [])
      ]
      return items.filter((item): item is HTMLElement => Boolean(item))
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setMenu("closing")
        return
      }

      if (event.key !== "Tab") {
        return
      }

      const focusable = getFocusable()

      if (focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    const firstLink = navRef.current?.querySelector<HTMLElement>("a[href]")
    firstLink?.focus()

    return () => window.removeEventListener("keydown", onKeyDown)
  }, [menu])

  useEffect(() => {
    if (menu !== "closed" || !menuWasOpenRef.current) {
      return
    }

    const restore = lastFocusRef.current || toggleRef.current
    restore?.focus()
  }, [menu])

  useEffect(() => {
    if (menu !== "closing") {
      return
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      setMenu("closed")
      return
    }

    const fallbackId = window.setTimeout(() => {
      setMenu("closed")
    }, 480)

    return () => window.clearTimeout(fallbackId)
  }, [menu])

  const closeMenu = () => {
    if (menu === "open") {
      setMenu("closing")
    }
  }

  const showIndicator = !isCompact || (menu === "open" && mobileLinksSettled)

  useEffect(() => {
    if (!isCompact || menu !== "open") {
      setMobileLinksSettled(false)
      return
    }

    if (prefersReducedMotion()) {
      setMobileLinksSettled(true)
      return
    }

    const timeoutId = window.setTimeout(() => {
      setMobileLinksSettled(true)
    }, MOBILE_INDICATOR_DELAY_MS)

    return () => window.clearTimeout(timeoutId)
  }, [isCompact, menu])

  const placeIndicator = useCallback((animate: boolean) => {
    const nav = navRef.current
    const indicator = indicatorRef.current

    if (!nav || !indicator) {
      return
    }

    if (!showIndicator) {
      skipIndicatorMotionRef.current = true

      if (indicatorReadyRef.current) {
        indicatorReadyRef.current = false
        setIndicatorReady(false)
      }

      return
    }

    const activeIndex = links.findIndex((link) => isActivePath(activePath, link.path))
    const activeLink = activeIndex >= 0 ? linkRefs.current[activeIndex] : null

    if (!activeLink) {
      if (indicatorReadyRef.current) {
        indicatorReadyRef.current = false
        setIndicatorReady(false)
      }
      return
    }

    const navRect = nav.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()
    const x = linkRect.left - navRect.left
    const y = linkRect.bottom - navRect.top - INDICATOR_HEIGHT
    const width = linkRect.width
    const reduced = prefersReducedMotion()
    const motion =
      animate &&
      indicatorReadyRef.current &&
      !skipIndicatorMotionRef.current &&
      !reduced

    if (motion) {
      indicator.style.removeProperty("transition")
    } else {
      indicator.style.transition = "none"
    }

    indicator.style.transform = `translate3d(${x}px, ${y}px, 0)`
    indicator.style.width = `${width}px`

    if (!motion) {
      void indicator.offsetWidth
      indicator.style.removeProperty("transition")
    }

    skipIndicatorMotionRef.current = false

    if (!indicatorReadyRef.current) {
      indicatorReadyRef.current = true
      setIndicatorReady(true)
    }
  }, [activePath, showIndicator])

  useLayoutEffect(() => {
    const localeChanged = localeRef.current !== locale
    localeRef.current = locale

    if (localeChanged) {
      skipIndicatorMotionRef.current = true
    }

    placeIndicator(true)
  }, [placeIndicator, activePath, menu, isCompact, playNavIntro, locale])

  useEffect(() => {
    const nav = navRef.current

    if (!nav) {
      return
    }

    const onResize = () => {
      skipIndicatorMotionRef.current = true
      placeIndicator(false)
    }

    window.addEventListener("resize", onResize)
    nav.addEventListener("scroll", onResize, { passive: true })
    void document.fonts?.ready.then(() => {
      skipIndicatorMotionRef.current = true
      placeIndicator(false)
    })

    const observer = new ResizeObserver(onResize)

    observer.observe(nav)
    linkRefs.current.forEach((link) => {
      if (link) {
        observer.observe(link)
      }
    })

    return () => {
      window.removeEventListener("resize", onResize)
      nav.removeEventListener("scroll", onResize)
      observer.disconnect()
    }
  }, [placeIndicator])

  const onMenuTransitionEnd = (event: TransitionEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (event.propertyName !== "opacity") {
      return
    }

    if (menu === "closing") {
      setMenu("closed")
    }
  }

  return (
    <>
      <svg className="site-nav__filters" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id="siteNavRefract"
            x="0%"
            y="-55%"
            width="100%"
            height="210%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0065 0.028"
              numOctaves="2"
              seed="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="0.7" result="waves" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="waves"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter
            id="siteNavRefractSoft"
            x="0%"
            y="-35%"
            width="100%"
            height="170%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.04"
              numOctaves="1"
              seed="4"
              stitchTiles="stitch"
              result="waves"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="waves"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={`site-nav__lens${chromePhase === "wait" ? " is-chrome-wait" : ""}${chromePhase === "nav" ? " is-chrome-nav" : ""}`}
        aria-hidden="true"
      />

      <header
        ref={headerRef}
        className={`site-nav${chromePhase === "wait" ? " is-chrome-wait" : ""}${chromePhase === "nav" ? " is-chrome-nav" : ""}`}
      >
        <div
          className={`site-nav__backdrop${menuOpen ? " is-visible" : ""}${menu === "open" ? " is-open" : ""}`}
          aria-hidden="true"
          onClick={closeMenu}
          onTransitionEnd={(event) => {
            if (event.propertyName === "opacity" && menu === "closing") {
              setMenu("closed")
            }
          }}
        />
        <div className="site-nav__chrome" aria-hidden="true" />
        <div className="site-nav__inner">
          <div
            className="site-nav__brand"
            aria-hidden={chromePhase === "wait" || undefined}
            inert={chromePhase === "wait" || undefined}
          >
            <Link href={href("/")} className="site-nav__logo" scroll={false} prefetch={false}>
              <Image
                className="site-logo"
                src={SITE_LOGO}
                width={40}
                height={28}
                alt=""
                sizes="40px"
                quality={75}
                loading="lazy"
              />
              <span>{SITE_NAME}</span>
            </Link>
          </div>

          <nav
            ref={navRef}
            id={menuId}
            className={`site-nav__links${menuOpen ? " is-open" : ""}${menu === "closing" ? " is-closing" : ""}`}
            aria-label={t.nav.primary}
            onTransitionEnd={onMenuTransitionEnd}
          >
            <span
              ref={indicatorRef}
              className={`site-nav__indicator${indicatorReady && showIndicator ? " is-ready" : ""}`}
              aria-hidden="true"
            />
            {links.map((link, index) =>
              <Link
                key={link.id}
                href={href(link.path)}
                scroll={false}
                prefetch={false}
                ref={(node) => {
                  linkRefs.current[index] = node
                }}
                className={`site-nav__link${playNavIntro ? ` menuitem-${index}` : ""}${isActivePath(activePath, link.path) ? " is-active" : ""}`}
                style={{ "--i": index } as CSSProperties}
                aria-current={isActivePath(activePath, link.path) ? "page" : undefined}
                onClick={() => {
                  setActivePath(link.path)

                  if (menu === "open") {
                    setMenu("closing")
                  }
                }}
              >
                <TypeCopy text={navLabel(link.path)} caret={false} />
              </Link>
            )}
          </nav>

          <div className="site-nav__actions">
            <LanguageSwitch />
            <button
              ref={toggleRef}
              className={`site-nav__toggle${menu === "open" ? " is-open" : ""}${playToggleIntro ? " is-intro" : ""}`}
              type="button"
              aria-label={menu === "open" ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menu === "open"}
              aria-controls={menuId}
              onClick={() => setMenu((value) => (value === "open" ? "closing" : "open"))}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navigation
