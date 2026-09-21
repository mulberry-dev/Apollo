"use client"

import { useParticles } from "@/components/particles"
import { holdActiveSection } from "@/lib/localeRewrite"
import { isLocaleOnlyPathChange } from "@/lib/locale"
import { isProjectDetailPath, isSectionPath } from "@/lib/sectionNav"
import { usePathname } from "next/navigation"
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react"

const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const {
    canTransition,
    beginRouteTransition,
    completeRouteTransition,
    releaseContent
  } = useParticles()
  const prevPathRef = useRef(pathname)
  const generationRef = useRef(0)
  const apiRef = useRef({
    canTransition,
    beginRouteTransition,
    completeRouteTransition,
    releaseContent
  })

  apiRef.current = {
    canTransition,
    beginRouteTransition,
    completeRouteTransition,
    releaseContent
  }

  useLayoutEffect(() => {
    if (prevPathRef.current === pathname) {
      return
    }

    const fromPath = prevPathRef.current
    prevPathRef.current = pathname
    const token = ++generationRef.current

    apiRef.current.releaseContent()
    document.body.classList.remove("particles-route-transition")

    if (isSectionPath(fromPath) && isSectionPath(pathname)) {
      return
    }

    if (isLocaleOnlyPathChange(fromPath, pathname)) {
      holdActiveSection(pathname, 2200)
      return
    }

    const html = document.documentElement
    const previous = html.style.scrollBehavior
    html.classList.add("is-pinning-scroll")
    html.style.scrollBehavior = "auto"
    window.scrollTo(0, 0)
    html.style.scrollBehavior = previous
    html.classList.remove("is-pinning-scroll")

    if (isProjectDetailPath(fromPath) || isProjectDetailPath(pathname)) {
      return
    }

    if (apiRef.current.canTransition) {
      void apiRef.current.beginRouteTransition().then(() => {
        if (token !== generationRef.current) {
          return
        }

        apiRef.current.completeRouteTransition()
      })
    }
  }, [pathname])

  useEffect(() => {
    if (canTransition) {
      return
    }

    generationRef.current += 1
    document.body.classList.remove("particles-route-transition")
  }, [canTransition])

  useEffect(
    () => () => {
      document.body.classList.remove("particles-route-transition")
    },
    []
  )

  return <div className="page-transition-view">{children}</div>
}

export default PageTransition
