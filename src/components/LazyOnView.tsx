"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

const LazyOnView = ({
  children,
  className,
  rootMargin = "220px 0px",
  minHeight
}: {
  children: ReactNode
  className?: string
  rootMargin?: string
  minHeight?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) {
      return
    }

    const node = ref.current

    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        observer.disconnect()
        setVisible(true)
      },
      { root: null, rootMargin, threshold: 0 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, visible])

  const style: CSSProperties | undefined =
    visible || !minHeight ? undefined : { minHeight }

  return (
    <div ref={ref} className={className} style={style}>
      {visible ? children : null}
    </div>
  )
}

export default LazyOnView
