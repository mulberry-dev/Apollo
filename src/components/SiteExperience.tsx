"use client"

import { useParticles } from "@/components/particles"
import DeferredSection from "@/components/sections/DeferredSection"
import HomeSection from "@/components/sections/HomeSection"
import {
  announceSection,
  applySectionTitle,
  focusSection,
  isSectionPath,
  markProgrammaticSectionScroll,
  observeActiveSection,
  prefetchSectionPath,
  requiredSectionIds,
  scrollToSection,
  settleSectionInView,
  stabilizeSection,
  subscribeSectionPrefetch,
  waitForSections
} from "@/lib/sectionNav"
import { holdActiveSection } from "@/lib/localeRewrite"
import {
  getLocale,
  isHomePath,
  isLocaleOnlyPathChange,
  localizePath,
  stripLocale
} from "@/lib/locale"
import dynamic from "next/dynamic"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

const DeferredFallback = ({ id, path }: { id: string; path: string }) => (
  <section
    id={id}
    data-section-path={path}
    className="is-deferred"
    aria-hidden="true"
    tabIndex={-1}
  />
)

const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), {
  loading: () => <DeferredFallback id="skills" path="/skills" />
})

const PortfolioSection = dynamic(
  () => import("@/components/sections/PortfolioSection"),
  { loading: () => <DeferredFallback id="portfolio" path="/portfolio" /> }
)

const ProcessSection = dynamic(
  () => import("@/components/sections/ProcessSection"),
  { loading: () => <DeferredFallback id="process" path="/process" /> }
)

const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), {
  loading: () => <DeferredFallback id="about" path="/about" />
})

const CertificationsSection = dynamic(
  () => import("@/components/sections/CertificationsSection"),
  { loading: () => <DeferredFallback id="certifications" path="/certifications" /> }
)

const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  { loading: () => <DeferredFallback id="contact" path="/contact" /> }
)

const LAZY_SECTIONS = [
  { id: "skills", path: "/skills", Component: SkillsSection },
  { id: "portfolio", path: "/portfolio", Component: PortfolioSection },
  { id: "process", path: "/process", Component: ProcessSection },
  { id: "about", path: "/about", Component: AboutSection },
  { id: "certifications", path: "/certifications", Component: CertificationsSection },
  { id: "contact", path: "/contact", Component: ContactSection }
] as const

const readSectionHref = (anchor: Element) => {
  if (
    anchor.hasAttribute("download") ||
    anchor.getAttribute("target") === "_blank"
  ) {
    return null
  }

  try {
    const url = new URL(anchor.getAttribute("href") || "", window.location.href)

    if (url.origin !== window.location.origin || url.hash) {
      return null
    }

    return isSectionPath(url.pathname) ? url.pathname : null
  } catch {
    return null
  }
}

const SiteExperience = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { boostParticles } = useParticles()
  const locale = getLocale(pathname)
  const toHref = useCallback(
    (path: string) => localizePath(stripLocale(path), locale),
    [locale]
  )
  const ignorePathRef = useRef<string | null>(null)
  const readyRef = useRef(false)
  const revealTokenRef = useRef(0)
  const activePathRef = useRef(pathname)
  const pathnameRef = useRef(pathname)
  const prevPathnameRef = useRef(pathname)
  const offSiteRef = useRef(!isSectionPath(pathname))
  const [aligned, setAligned] = useState(isHomePath(pathname))
  const [mountedIds, setMountedIds] = useState(
    () => new Set(requiredSectionIds(pathname))
  )
  const mountedKey = Array.from(mountedIds).join("|")

  pathnameRef.current = pathname

  const mountThrough = useCallback((path: string) => {
    const needed = requiredSectionIds(path)

    setMountedIds((current) => {
      let changed = false
      const next = new Set(current)

      for (const id of needed) {
        if (!next.has(id)) {
          next.add(id)
          changed = true
        }
      }

      return changed ? next : current
    })
  }, [])

  const revealPath = useCallback(
    async (path: string, behavior: ScrollBehavior, moveFocus = false) => {
      const token = ++revealTokenRef.current
      mountThrough(path)
      await waitForSections(requiredSectionIds(path))

      if (token !== revealTokenRef.current) {
        return false
      }

      if (behavior === "auto") {
        settleSectionInView(path)
        stabilizeSection(path, 900)
      } else {
        scrollToSection(path, behavior)
        stabilizeSection(path, 1400)
      }

      if (moveFocus) {
        focusSection(path)
      }

      return true
    },
    [mountThrough]
  )

  useEffect(() => subscribeSectionPrefetch(mountThrough), [mountThrough])

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"

    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  useLayoutEffect(() => {
    if (!isSectionPath(pathname)) {
      offSiteRef.current = true
      prevPathnameRef.current = pathname
      return
    }

    const fromOffSite = offSiteRef.current
    const previousPath = prevPathnameRef.current
    prevPathnameRef.current = pathname
    offSiteRef.current = false
    let cancelled = false

    applySectionTitle(pathname)
    announceSection(pathname)
    activePathRef.current = pathname

    if (!fromOffSite && isLocaleOnlyPathChange(previousPath, pathname)) {
      if (ignorePathRef.current === pathname) {
        ignorePathRef.current = null
      }

      holdActiveSection(pathname, 2200)
      return
    }

    if (readyRef.current && fromOffSite) {
      mountThrough(pathname)
      scrollToSection(pathname, "auto")
      setAligned(true)
    }

    const run = async () => {
      if (!readyRef.current) {
        readyRef.current = true

        if (!isHomePath(pathname)) {
          await revealPath(pathname, "auto", true)
        }

        if (!cancelled) {
          setAligned(true)
        }

        return
      }

      if (fromOffSite) {
        await revealPath(pathname, "auto", true)
        return
      }

      if (ignorePathRef.current) {
        if (ignorePathRef.current === pathname) {
          ignorePathRef.current = null
        }

        return
      }

      await revealPath(pathname, "smooth")
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [mountThrough, pathname, revealPath])

  useEffect(() => {
    if (aligned) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setAligned(true)
    }, 700)

    return () => window.clearTimeout(timeoutId)
  }, [aligned])

  useEffect(() => {
    if (!isSectionPath(pathname)) {
      return
    }

    const syncFromScroll = (nextPath: string) => {
      if (stripLocale(nextPath) === stripLocale(activePathRef.current)) {
        return
      }

      const href = toHref(nextPath)
      activePathRef.current = href
      ignorePathRef.current = href
      applySectionTitle(href)
      announceSection(href)
      mountThrough(nextPath)
      router.replace(href, { scroll: false })
    }

    return observeActiveSection(syncFromScroll)
  }, [mountedKey, mountThrough, pathname, router, toHref])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target
      const anchor =
        target instanceof Element ? target.closest("a[href]") : null

      if (!anchor) {
        return
      }

      const nextPath = readSectionHref(anchor)

      if (!nextPath) {
        return
      }

      if (isLocaleOnlyPathChange(pathnameRef.current, nextPath)) {
        event.preventDefault()
        markProgrammaticSectionScroll(2200)
        activePathRef.current = nextPath
        ignorePathRef.current = nextPath
        applySectionTitle(nextPath)
        announceSection(nextPath)
        router.push(nextPath, { scroll: false })
        holdActiveSection(nextPath, 2200)
        return
      }

      event.preventDefault()
      markProgrammaticSectionScroll(1800)
      activePathRef.current = nextPath
      applySectionTitle(nextPath)
      announceSection(nextPath)

      const fromMenu = document.body.classList.contains("nav-menu-open")
      const pathChanged = pathnameRef.current !== nextPath

      if (pathChanged) {
        ignorePathRef.current = nextPath
        router.push(nextPath, { scroll: false })
        boostParticles()
      }

      void revealPath(nextPath, fromMenu ? "auto" : "smooth")
    }

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target
      const anchor =
        target instanceof Element ? target.closest("a[href]") : null

      if (!anchor) {
        return
      }

      const nextPath = readSectionHref(anchor)

      if (nextPath) {
        prefetchSectionPath(nextPath)
      }
    }

    document.addEventListener("click", onClick, true)
    document.addEventListener("pointerover", onPointerOver)
    return () => {
      document.removeEventListener("click", onClick, true)
      document.removeEventListener("pointerover", onPointerOver)
    }
  }, [boostParticles, revealPath, router])

  return (
    <div className={`site-experience${aligned ? " is-aligned" : ""}`}>
      <HomeSection />
      {LAZY_SECTIONS.map(({ id, path, Component }) => (
        <DeferredSection
          key={id}
          id={id}
          path={path}
          mounted={mountedIds.has(id)}
          onApproach={mountThrough}
        >
          <Component />
        </DeferredSection>
      ))}
    </div>
  )
}

export default SiteExperience
