"use client"

import { observeReveal } from "@/lib/revealObserver"
import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode
} from "react"

export type RevealType =
  | "page"
  | "hero"
  | "eyebrow"
  | "heading"
  | "text"
  | "button"
  | "card"
  | "image"
  | "nav"
  | "decorative"
  | "chip"
  | "left"

export type RevealMode = "auto" | "fold" | "scroll"

const MAX_STAGGER_MS = 280
const DEFAULT_STAGGER_MS = 50

type RevealGroupValue = {
  take: () => number
  stagger: number
  mode: RevealMode
}

const RevealGroupContext = createContext<RevealGroupValue | null>(null)

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export const RevealGroup = ({
  as: Tag,
  className = "",
  stagger = DEFAULT_STAGGER_MS,
  mode = "auto",
  children
}: {
  as?: ElementType
  className?: string
  stagger?: number
  mode?: RevealMode
  children: ReactNode
}) => {
  const counter = useRef(0)
  counter.current = 0

  const value = useMemo(
    () => ({
      take: () => counter.current++,
      stagger,
      mode
    }),
    [mode, stagger]
  )

  const Wrapper = Tag ?? (className ? "div" : null)

  return (
    <RevealGroupContext.Provider value={value}>
      {Wrapper ? (
        <Wrapper className={className}>{children}</Wrapper>
      ) : (
        children
      )}
    </RevealGroupContext.Provider>
  )
}

const Reveal = ({
  as: Tag = "div",
  type = "text",
  mode,
  delay = 0,
  index,
  className = "",
  children,
  ...props
}: {
  as?: ElementType
  type?: RevealType
  mode?: RevealMode
  delay?: number
  index?: number
  className?: string
  children?: ReactNode
  "aria-hidden"?: boolean | "true" | "false"
}) => {
  const group = useContext(RevealGroupContext)
  const ref = useRef<HTMLElement | null>(null)
  const revealedRef = useRef(false)
  const [armed, setArmed] = useState(false)
  const [entered, setEntered] = useState(false)
  const assignedIndex = useRef<number | null>(index ?? null)

  if (assignedIndex.current === null) {
    assignedIndex.current = group ? group.take() : 0
  }

  const resolvedMode = mode ?? group?.mode ?? "auto"
  const resolvedIndex = assignedIndex.current
  const stagger = group?.stagger ?? DEFAULT_STAGGER_MS
  const delayMs = Math.min(MAX_STAGGER_MS, delay + resolvedIndex * stagger)

  const markVisible = () => {
    if (revealedRef.current) {
      return
    }

    revealedRef.current = true
    setEntered(true)
  }

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      setArmed(true)
      markVisible()
      return
    }

    let inner = 0
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => {
        setArmed(true)
      })
    })
    const fallback = window.setTimeout(() => setArmed(true), 80)

    return () => {
      window.cancelAnimationFrame(outer)
      window.cancelAnimationFrame(inner)
      window.clearTimeout(fallback)
    }
  }, [])

  useLayoutEffect(() => {
    if (revealedRef.current || entered) {
      return
    }

    if (prefersReducedMotion()) {
      markVisible()
      return
    }

    if (!armed) {
      return
    }

    const node = ref.current

    if (!node) {
      return
    }

    if (resolvedMode === "fold") {
      let inner = 0
      const outer = window.requestAnimationFrame(() => {
        inner = window.requestAnimationFrame(markVisible)
      })
      const fallback = window.setTimeout(markVisible, 80)

      return () => {
        window.cancelAnimationFrame(outer)
        window.cancelAnimationFrame(inner)
        window.clearTimeout(fallback)
      }
    }

    const stopObserving = observeReveal(node, markVisible)

    return () => {
      stopObserving()
    }
  }, [armed, entered, resolvedMode])

  const classNames = [
    "reveal",
    `reveal--${type}`,
    armed ? "is-armed" : "",
    entered ? "is-visible" : "",
    className
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Tag
      ref={ref}
      className={classNames}
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Reveal
