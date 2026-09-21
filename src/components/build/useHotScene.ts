"use client"

import { useMotion } from "@/components/particles"
import { useLayoutEffect, useRef, useState } from "react"

export const useHotScene = (threshold = 0.18) => {
  const ref = useRef<HTMLDivElement>(null)
  const motion = useMotion()
  const reducedMotion = motion?.reducedMotion ?? false
  const contentReady = motion?.contentReady ?? true
  const [inView, setInView] = useState(false)

  useLayoutEffect(() => {
    const node = ref.current

    if (reducedMotion) {
      setInView(true)
      return
    }

    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion, threshold])

  return {
    ref,
    hot: reducedMotion || (inView && contentReady)
  }
}
