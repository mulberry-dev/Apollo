import { getSectionByPath, isSectionPath, markProgrammaticSectionScroll } from "@/lib/sectionNav"

const pinInstantScroll = (run: () => void) => {
  const html = document.documentElement
  const previous = html.style.scrollBehavior
  html.classList.add("is-pinning-scroll")
  html.style.scrollBehavior = "auto"
  run()
  html.style.scrollBehavior = previous
  html.classList.remove("is-pinning-scroll")
}

export const holdElementAnchor = (node: HTMLElement, durationMs = 2000) => {
  const scroller = document.scrollingElement || document.documentElement
  const sectionTop = () => node.getBoundingClientRect().top + window.scrollY
  const offset = window.scrollY - sectionTop()

  markProgrammaticSectionScroll(durationMs)

  const pin = () => {
    if (!node.isConnected) {
      return
    }

    const next = Math.max(0, Math.round(sectionTop() + offset))

    if (Math.abs(window.scrollY - next) > 1) {
      pinInstantScroll(() => {
        scroller.scrollTo({ top: next, behavior: "auto" })
      })
    }
  }

  const started = performance.now()
  let frame = 0

  const loop = () => {
    pin()

    if (performance.now() - started < durationMs) {
      frame = window.requestAnimationFrame(loop)
    }
  }

  const observer = new ResizeObserver(() => {
    markProgrammaticSectionScroll(180)
    pin()
  })

  observer.observe(node)

  const parent = node.parentElement

  if (parent) {
    observer.observe(parent)
  }

  loop()

  const stop = () => {
    window.cancelAnimationFrame(frame)
    observer.disconnect()
  }

  window.setTimeout(stop, durationMs + 32)
  return stop
}

export const holdActiveSection = (pathname: string, durationMs = 2000) => {
  if (!isSectionPath(pathname)) {
    const page = document.querySelector<HTMLElement>(".project-page")
    return page ? holdElementAnchor(page, durationMs) : () => {}
  }

  const section = getSectionByPath(pathname)
  const node = section ? document.getElementById(section.id) : null

  if (!(node instanceof HTMLElement)) {
    return () => {}
  }

  return holdElementAnchor(node, durationMs)
}

let rewriteCount = 0
let rewriteHold: (() => void) | null = null

export const beginVisibleRewrite = (node: HTMLElement) => {
  if (rewriteCount === 0) {
    const anchor =
      node.closest<HTMLElement>("[data-section-path], .project-page, #site-main") ??
      node
    rewriteHold = holdElementAnchor(anchor, 4200)
    document.documentElement.classList.add("is-locale-rewriting")
  }

  rewriteCount += 1
}

export const endVisibleRewrite = () => {
  rewriteCount = Math.max(0, rewriteCount - 1)

  if (rewriteCount === 0) {
    rewriteHold?.()
    rewriteHold = null
    document.documentElement.classList.remove("is-locale-rewriting")
  }
}
