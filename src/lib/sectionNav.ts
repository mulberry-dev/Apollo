import { getMessages, navLabel } from "@/i18n"
import { sections } from "@/data/navegation"
import { SITE_NAME } from "@/data/site"
import { getLocale, stripLocale } from "@/lib/locale"

export const SECTION_PATHS = sections.map((section) => section.path)
export const SECTION_CHANGE_EVENT = "site:section-change"

export type SiteSection = {
  path: string
  name: string
  id: string
}

export const SECTIONS: SiteSection[] = sections.map((section) => ({
  path: section.path,
  name: section.name,
  id: section.path === "/" ? "index" : section.path.replace(/^\//, "")
}))

export const isSectionPath = (pathname: string) =>
  SECTION_PATHS.includes(stripLocale(pathname))

export const isProjectDetailPath = (pathname: string) => {
  const path = stripLocale(pathname)
  return path.startsWith("/portfolio/") && path !== "/portfolio"
}

export const getSectionIndex = (pathname: string) =>
  SECTION_PATHS.indexOf(stripLocale(pathname))

export const getSectionByPath = (pathname: string) =>
  SECTIONS.find((section) => section.path === stripLocale(pathname)) ?? null

export const sectionDocumentTitle = (pathname: string) => {
  const locale = getLocale(pathname)
  const messages = getMessages(locale)
  const section = getSectionByPath(pathname)

  if (!section || section.path === "/") {
    return messages.site.title
  }

  return `${navLabel(messages, section.path)} | ${SITE_NAME}`
}

export const applySectionTitle = (pathname: string) => {
  document.title = sectionDocumentTitle(pathname)
}

export const announceSection = (href: string) => {
  window.dispatchEvent(
    new CustomEvent(SECTION_CHANGE_EVENT, {
      detail: { path: href.split(/[?#]/)[0] }
    })
  )
}

type PrefetchFn = (path: string) => void

const prefetchers = new Set<PrefetchFn>()

export const subscribeSectionPrefetch = (fn: PrefetchFn) => {
  prefetchers.add(fn)
  return () => {
    prefetchers.delete(fn)
  }
}

export const prefetchSectionPath = (path: string) => {
  if (!isSectionPath(path)) {
    return
  }

  prefetchers.forEach((fn) => fn(path))
}

export const requiredSectionIds = (pathname: string) => {
  const index = Math.max(0, getSectionIndex(pathname))

  return SECTIONS.filter((_, position) => position <= index).map(
    (section) => section.id
  )
}

export const isSectionReady = (node: Element | null): node is HTMLElement =>
  Boolean(node instanceof HTMLElement && !node.classList.contains("is-deferred"))

export const waitForSection = (id: string, timeoutMs = 4000) =>
  new Promise<void>((resolve) => {
    const ready = () => isSectionReady(document.getElementById(id))

    if (ready()) {
      resolve()
      return
    }

    const finish = () => {
      observer.disconnect()
      window.clearTimeout(timeoutId)
      resolve()
    }

    const observer = new MutationObserver(() => {
      if (ready()) {
        finish()
      }
    })

    const timeoutId = window.setTimeout(finish, timeoutMs)
    observer.observe(document.body, { childList: true, subtree: true })
  })

export const waitForSections = async (ids: string[]) => {
  await Promise.all(ids.map((id) => waitForSection(id)))

  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve())
    })
  })
}

export const focusSection = (pathname: string) => {
  const section = getSectionByPath(pathname)
  const node = section ? document.getElementById(section.id) : null

  if (!isSectionReady(node) || document.activeElement === node) {
    return
  }

  if (!node.hasAttribute("tabindex")) {
    node.tabIndex = -1
  }

  node.focus({ preventScroll: true })
}

let programmaticUntil = 0

export const isProgrammaticSectionScroll = () =>
  performance.now() < programmaticUntil

export const markProgrammaticSectionScroll = (ms = 900) => {
  programmaticUntil = Math.max(programmaticUntil, performance.now() + ms)
}

const pinInstantScroll = (run: () => void) => {
  const html = document.documentElement
  const previous = html.style.scrollBehavior
  html.classList.add("is-pinning-scroll")
  html.style.scrollBehavior = "auto"
  run()
  html.style.scrollBehavior = previous
  html.classList.remove("is-pinning-scroll")
}

export const getSectionScrollTop = (pathname: string) => {
  if (stripLocale(pathname) === "/") {
    return 0
  }

  const section = getSectionByPath(pathname)
  const node = section ? document.getElementById(section.id) : null

  if (!isSectionReady(node)) {
    return null
  }

  const margin = Number.parseFloat(getComputedStyle(node).scrollMarginTop) || 0
  const padding =
    Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
    0
  const offset = margin || padding

  return Math.max(
    0,
    Math.round(node.getBoundingClientRect().top + window.scrollY - offset)
  )
}

export const isSectionInViewport = (pathname: string, slack = 28) => {
  if (stripLocale(pathname) === "/") {
    return window.scrollY <= slack
  }

  const section = getSectionByPath(pathname)
  const node = section ? document.getElementById(section.id) : null

  if (!isSectionReady(node)) {
    return false
  }

  const top = node.getBoundingClientRect().top
  const margin = Number.parseFloat(getComputedStyle(node).scrollMarginTop) || 0
  const expected = margin || 0

  return Math.abs(top - expected) <= slack
}

export const scrollToSection = (
  pathname: string,
  behavior: ScrollBehavior = "smooth"
) => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const nextBehavior: ScrollBehavior = reduced ? "auto" : behavior
  markProgrammaticSectionScroll(nextBehavior === "smooth" ? 1100 : 240)

  const top = getSectionScrollTop(pathname)
  const scroller = document.scrollingElement || document.documentElement

  const run = () => {
    if (top === null) {
      return
    }

    scroller.scrollTo({ top, behavior: nextBehavior })
  }

  if (nextBehavior === "auto") {
    pinInstantScroll(run)
    return
  }

  run()
}

export const settleSectionInView = (pathname: string) => {
  markProgrammaticSectionScroll(1800)
  scrollToSection(pathname, "auto")

  window.requestAnimationFrame(() => {
    if (!isSectionInViewport(pathname)) {
      scrollToSection(pathname, "auto")
    }

    window.requestAnimationFrame(() => {
      if (!isSectionInViewport(pathname)) {
        scrollToSection(pathname, "auto")
      }
    })
  })
}

export const stabilizeSection = (pathname: string, durationMs = 1100) => {
  markProgrammaticSectionScroll(durationMs)
  let lastDocTop = getSectionScrollTop(pathname)

  const correct = () => {
    const top = getSectionScrollTop(pathname)

    if (top === null) {
      return
    }

    if (lastDocTop !== null && Math.abs(top - lastDocTop) <= 2) {
      return
    }

    lastDocTop = top
    scrollToSection(pathname, "auto")
  }

  const observer = new ResizeObserver(() => {
    markProgrammaticSectionScroll(200)
    correct()
  })

  document.querySelectorAll(".site-experience > section").forEach((node) => {
    observer.observe(node)
  })

  window.setTimeout(() => observer.disconnect(), durationMs)
  return () => observer.disconnect()
}

export const readActiveSectionPath = () => {
  const line = Math.min(window.innerHeight * 0.3, 200)
  let current = SECTIONS[0]?.path ?? "/"

  for (const section of SECTIONS) {
    const node = document.getElementById(section.id)

    if (!node) {
      continue
    }

    if (node.getBoundingClientRect().top <= line) {
      current = section.path
    }
  }

  const scroller = document.scrollingElement || document.documentElement
  const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight)

  if (max > 0 && scroller.scrollTop >= max - 4) {
    return SECTIONS[SECTIONS.length - 1]?.path ?? current
  }

  return current
}

export const observeActiveSection = (onPath: (path: string) => void) => {
  let frame = 0

  const sync = () => {
    if (isProgrammaticSectionScroll()) {
      return
    }

    onPath(readActiveSectionPath())
  }

  const schedule = () => {
    if (frame) {
      return
    }

    frame = window.requestAnimationFrame(() => {
      frame = 0
      sync()
    })
  }

  const observer = new IntersectionObserver(schedule, {
    root: null,
    rootMargin: "-10% 0px -72% 0px",
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
  })

  SECTIONS.forEach((section) => {
    const node = document.getElementById(section.id)

    if (node) {
      observer.observe(node)
    }
  })

  return () => {
    observer.disconnect()

    if (frame) {
      window.cancelAnimationFrame(frame)
    }
  }
}
