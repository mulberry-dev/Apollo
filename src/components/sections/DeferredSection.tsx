"use client"

import { useEffect, useRef, type ReactNode } from "react"

const DeferredSection = ({
  id,
  path,
  mounted,
  onApproach,
  children
}: {
  id: string
  path: string
  mounted: boolean
  onApproach: (path: string) => void
  children: ReactNode
}) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (mounted) {
      return
    }

    const node = ref.current

    if (!node) {
      return
    }

    let observer: IntersectionObserver | null = null

    const watch = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return
          }

          observer?.disconnect()
          onApproach(path)
        },
        { root: null, rootMargin: "80px 0px", threshold: 0 }
      )
      observer.observe(node)
    }

    const onScroll = () => {
      if (window.scrollY < 48) {
        return
      }

      window.removeEventListener("scroll", onScroll)
      watch()
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      observer?.disconnect()
    }
  }, [mounted, onApproach, path])

  if (mounted) {
    return children
  }

  return (
    <section
      ref={ref}
      id={id}
      data-section-path={path}
      className="is-deferred"
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}

export default DeferredSection
