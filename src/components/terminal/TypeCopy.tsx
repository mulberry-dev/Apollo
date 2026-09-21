"use client"

import { useMotion } from "@/components/particles"
import {
  beginVisibleRewrite,
  endVisibleRewrite
} from "@/lib/localeRewrite"
import { useEffect, useRef, useState } from "react"

export type TypePart = {
  text: string
  className?: string
}

const joinParts = (parts: TypePart[]) => parts.map((part) => part.text).join("")

const sliceParts = (parts: TypePart[], length: number) => {
  let left = Math.max(0, length)
  const next: TypePart[] = []

  for (const part of parts) {
    if (left <= 0) {
      break
    }

    const take = Math.min(part.text.length, left)

    if (take > 0) {
      next.push({ text: part.text.slice(0, take), className: part.className })
    }

    left -= take
  }

  return next
}

const renderParts = (parts: TypePart[]) =>
  parts.map((part, index) =>
    part.className ? (
      <span key={index} className={part.className}>
        {part.text}
      </span>
    ) : (
      <span key={index}>{part.text}</span>
    )
  )

const isNearViewport = (node: Element | null) => {
  if (!node) {
    return false
  }

  const rect = node.getBoundingClientRect()
  return rect.bottom > -64 && rect.top < window.innerHeight + 64
}

const deleteStep = (len: number) => (len > 56 ? 4 : len > 22 ? 2 : 1)
const typeStep = (written: number, total: number) => {
  if (written < 16) {
    return 1
  }

  if (total > 90 && written > 32) {
    return 3
  }

  return written > 28 ? 2 : 1
}

const deleteDelay = (len: number) => (len > 48 ? 9 : 14)
const typeDelay = (written: number) =>
  (written < 18 ? 21 : 13) + (written % 7 === 0 ? 7 : 0)

const resolveParts = (parts?: TypePart[], text?: string) =>
  parts ?? [{ text: text ?? "" }]

const partBoundaries = (parts: TypePart[]) => {
  const ends = new Set<number>()
  let acc = 0

  for (const part of parts) {
    acc += part.text.length

    if (part.text.trim().length > 0) {
      ends.add(acc)
    }
  }

  return ends
}

const introStep = (
  written: number,
  total: number,
  swift: boolean,
  atPartStart: boolean
) => {
  if (atPartStart || written < 5) {
    return 1
  }

  if (!swift) {
    return written > 22 ? 2 : 1
  }

  if (written < 10) {
    return 1
  }

  if (total > 70 && written > 32) {
    return 3
  }

  return 2
}

const introBeatPause = (text: string, parts: TypePart[], length: number) => {
  if (length <= 0 || length >= text.length) {
    return 0
  }

  if (partBoundaries(parts).has(length)) {
    return 280
  }

  const mark = text.charAt(length - 1)

  if (mark === "—" || mark === "–") {
    return 200
  }

  if (mark === "." || mark === "!" || mark === "?") {
    return 170
  }

  return 0
}

const introDelay = (written: number, swift: boolean) => {
  if (swift) {
    return written < 14 ? 22 : 13
  }

  return (written < 16 ? 36 : 22) + (written % 9 === 0 ? 10 : 0)
}

const atPartStartDelay = (swift: boolean) => (swift ? 32 : 48)

const TypeCopy = ({
  text,
  parts,
  className = "",
  caret = true,
  block = false,
  intro = false,
  play = true,
  pace = "line",
  onTyped
}: {
  text?: string
  parts?: TypePart[]
  className?: string
  caret?: boolean
  block?: boolean
  intro?: boolean
  play?: boolean
  pace?: "line" | "swift"
  onTyped?: () => void
}) => {
  const motion = useMotion()
  const reduced = motion?.reducedMotion ?? false
  const latestRef = useRef({ parts, text })
  latestRef.current = { parts, text }
  const targetKey = resolveParts(parts, text)
    .map((part) => `${part.className ?? ""}:${part.text}`)
    .join("\0")
  const targetParts = resolveParts(parts, text)
  const target = joinParts(targetParts)
  const [shownParts, setShownParts] = useState(targetParts)
  const [length, setLength] = useState(intro ? 0 : target.length)
  const [busy, setBusy] = useState(false)
  const [ghosts, setGhosts] = useState<[TypePart[], TypePart[]]>([
    targetParts,
    targetParts
  ])
  const slotRef = useRef<HTMLSpanElement>(null)
  const shownRef = useRef(targetParts)
  const lengthRef = useRef(intro ? 0 : target.length)
  const firstRef = useRef(true)
  const runRef = useRef(0)
  const typedRef = useRef(false)
  const onTypedRef = useRef(onTyped)
  onTypedRef.current = onTyped

  const finishIntro = (nextParts: TypePart[], next: string) => {
    shownRef.current = nextParts
    lengthRef.current = next.length
    setShownParts(nextParts)
    setLength(next.length)
    setGhosts([nextParts, nextParts])
    setBusy(false)

    if (!typedRef.current) {
      typedRef.current = true
      onTypedRef.current?.()
    }
  }

  useEffect(() => {
    if (!intro) {
      return
    }

    const nextParts = resolveParts(latestRef.current.parts, latestRef.current.text)
    const next = joinParts(nextParts)
    const swift = pace === "swift"

    if (
      reduced ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      finishIntro(nextParts, next)
      return
    }

    if (!play) {
      shownRef.current = nextParts
      lengthRef.current = 0
      setShownParts(nextParts)
      setLength(0)
      setGhosts([nextParts, nextParts])
      setBusy(false)
      return
    }

    if (typedRef.current && lengthRef.current >= next.length) {
      return
    }

    const token = ++runRef.current
    let cancelled = false
    let timer = 0
    let currentLen = 0
    const beats = partBoundaries(nextParts)
    shownRef.current = nextParts
    lengthRef.current = 0
    setShownParts(nextParts)
    setLength(0)
    setGhosts([nextParts, nextParts])
    setBusy(true)

    const schedule = (fn: () => void, ms: number) => {
      timer = window.setTimeout(fn, ms)
    }

    const step = () => {
      if (cancelled || token !== runRef.current) {
        return
      }

      const atPartStart = currentLen === 0 || beats.has(currentLen)
      currentLen = Math.min(
        next.length,
        currentLen + introStep(currentLen, next.length, swift, atPartStart)
      )
      lengthRef.current = currentLen
      setLength(currentLen)

      if (currentLen >= next.length) {
        finishIntro(nextParts, next)
        return
      }

      schedule(
        step,
        introDelay(currentLen, swift) + introBeatPause(next, nextParts, currentLen)
      )
    }

    schedule(step, atPartStartDelay(swift))

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [intro, pace, play, reduced, targetKey])

  useEffect(() => {
    const nextParts = resolveParts(latestRef.current.parts, latestRef.current.text)
    const next = joinParts(nextParts)

    if (firstRef.current) {
      firstRef.current = false
      shownRef.current = nextParts

      if (intro) {
        return
      }

      lengthRef.current = next.length
      setShownParts(nextParts)
      setLength(next.length)
      return
    }

    if (joinParts(shownRef.current) === next) {
      shownRef.current = nextParts
      setShownParts(nextParts)
      return
    }

    const node = slotRef.current
    const skip =
      reduced ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !isNearViewport(node)

    if (skip) {
      shownRef.current = nextParts
      lengthRef.current = next.length
      setShownParts(nextParts)
      setLength(next.length)
      setGhosts([nextParts, nextParts])
      setBusy(false)
      return
    }

    const token = ++runRef.current
    const fromParts = shownRef.current
    setGhosts([fromParts, nextParts])
    setBusy(true)

    let holding = false

    if (node) {
      beginVisibleRewrite(node)
      holding = true
    }

    let cancelled = false
    let timer = 0
    let currentLen = lengthRef.current
    let phase: "out" | "pause" | "in" = "out"

    const release = () => {
      if (!holding) {
        return
      }

      holding = false
      endVisibleRewrite()
    }

    const schedule = (fn: () => void, ms: number) => {
      timer = window.setTimeout(fn, ms)
    }

    const finish = () => {
      shownRef.current = nextParts
      lengthRef.current = next.length
      setShownParts(nextParts)
      setLength(next.length)
      setGhosts([nextParts, nextParts])
      setBusy(false)
      release()
    }

    const step = () => {
      if (cancelled || token !== runRef.current) {
        return
      }

      if (phase === "out") {
        currentLen = Math.max(0, currentLen - deleteStep(currentLen))
        lengthRef.current = currentLen
        setLength(currentLen)

        if (currentLen === 0) {
          phase = "pause"
          schedule(step, 48)
          return
        }

        schedule(step, deleteDelay(currentLen))
        return
      }

      if (phase === "pause") {
        shownRef.current = nextParts
        setShownParts(nextParts)
        phase = "in"
        schedule(step, 12)
        return
      }

      currentLen = Math.min(next.length, currentLen + typeStep(currentLen, next.length))
      lengthRef.current = currentLen
      setLength(currentLen)

      if (currentLen >= next.length) {
        finish()
        return
      }

      schedule(step, typeDelay(currentLen))
    }

    const top = node?.getBoundingClientRect().top ?? 0
    schedule(step, 16 + Math.min(140, Math.max(0, Math.round(top * 0.08))))

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      release()
    }
  }, [intro, reduced, targetKey])

  const live = sliceParts(shownParts, length)
  const classes = [
    "type-copy",
    block ? "type-copy--block" : "",
    busy ? "is-busy" : "",
    className
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <span className={classes}>
      <span className="sr-only">{target}</span>
      <span ref={slotRef} className="type-copy__slot" aria-hidden="true">
        <span className="type-copy__ghost">{renderParts(ghosts[0])}</span>
        <span className="type-copy__ghost">{renderParts(ghosts[1])}</span>
        <span className="type-copy__live">
          {renderParts(live)}
          {busy && caret ? <span className="type-copy__caret" /> : null}
        </span>
      </span>
    </span>
  )
}

export default TypeCopy
