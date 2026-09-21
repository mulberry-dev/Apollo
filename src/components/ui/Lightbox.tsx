"use client"

import Image from "next/image"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

export type LightboxOrigin = {
  top: number
  left: number
  width: number
  height: number
}

type LightboxProps = {
  src: string
  alt: string
  origin: LightboxOrigin
  getOrigin?: () => LightboxOrigin | null
  aspectRatio?: number
  onClose: () => void
  onPrevious?: () => void
  onNext?: () => void
  hasPrevious?: boolean
  hasNext?: boolean
  counter?: string
  closeLabel?: string
  previousLabel?: string
  nextLabel?: string
}

const OPEN_MS = 540
const CLOSE_MS = 620
const OPEN_EASE = "cubic-bezier(0.4, 0, 0.2, 1)"
const CLOSE_EASE = "cubic-bezier(0.45, 0.02, 0.1, 1)"

const invertFromOrigin = (origin: LightboxOrigin, dest: DOMRect) => {
  const originX = origin.left + origin.width / 2
  const originY = origin.top + origin.height / 2
  const destX = dest.left + dest.width / 2
  const destY = dest.top + dest.height / 2
  const scaleX = origin.width / Math.max(dest.width, 1)
  const scaleY = origin.height / Math.max(dest.height, 1)

  return `translate(${originX - destX}px, ${originY - destY}px) scale(${scaleX}, ${scaleY})`
}

const fitFrame = (aspect: number, withNav: boolean) => {
  const sideGutter = withNav ? 120 : 32
  const maxW = Math.min(window.innerWidth - sideGutter * 2, 1280)
  const maxH = Math.min(window.innerHeight * 0.78, 860)
  let width = Math.max(maxW, 160)
  let height = width / aspect

  if (height > maxH) {
    height = maxH
    width = height * aspect
  }

  return { width, height }
}

const NavChevron = ({ direction }: { direction: "prev" | "next" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {direction === "prev" ? (
      <path d="M15 6 9 12l6 6" />
    ) : (
      <path d="M9 6l6 6-6 6" />
    )}
  </svg>
)

const Lightbox = ({
  src,
  alt,
  origin,
  getOrigin,
  aspectRatio = 1.5,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
  counter,
  closeLabel = "Close fullscreen certificate",
  previousLabel = "Previous certificate",
  nextLabel = "Next certificate"
}: LightboxProps) => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const closingRef = useRef(false)
  const openedRef = useRef(false)
  const swipeRef = useRef<{ x: number; y: number } | null>(null)
  const [ready, setReady] = useState(false)
  const [closing, setClosing] = useState(false)
  const [mounted, setMounted] = useState(false)
  const canNavigate = Boolean((hasPrevious && onPrevious) || (hasNext && onNext))

  useEffect(() => {
    setMounted(true)
  }, [])

  const reduceMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const playClose = useCallback(() => {
    if (closingRef.current) {
      return
    }

    closingRef.current = true
    setClosing(true)

    const frame = frameRef.current
    const reduced = reduceMotion()
    const target = getOrigin?.() ?? origin

    if (frame && !reduced && target) {
      const dest = frame.getBoundingClientRect()
      frame.style.transition = `transform ${CLOSE_MS}ms ${CLOSE_EASE}, opacity 140ms linear ${CLOSE_MS - 140}ms`
      frame.style.transform = invertFromOrigin(target, dest)
    }

    window.setTimeout(onClose, reduced ? 160 : CLOSE_MS)
  }, [getOrigin, onClose, origin])

  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame || !mounted) {
      return
    }

    const size = fitFrame(aspectRatio, canNavigate)
    frame.style.width = `${size.width}px`
    frame.style.height = `${size.height}px`

    const dest = frame.getBoundingClientRect()
    const reduced = reduceMotion()

    if (openedRef.current) {
      if (!reduced) {
        frame.style.transition = `width 280ms ${OPEN_EASE}, height 280ms ${OPEN_EASE}`
      }
      return
    }

    if (!reduced) {
      frame.style.transition = "none"
      frame.style.opacity = "1"
      frame.style.transform = invertFromOrigin(origin, dest)
    }

    const openId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (!reduced) {
          frame.style.transition = `transform ${OPEN_MS}ms ${OPEN_EASE}`
          frame.style.transform = "translate(0, 0) scale(1)"
        }
        openedRef.current = true
        setReady(true)
        closeRef.current?.focus()
      })
    })

    return () => window.cancelAnimationFrame(openId)
  }, [aspectRatio, canNavigate, mounted, origin])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        playClose()
        return
      }

      if (closingRef.current || !ready) {
        return
      }

      if (event.key === "ArrowLeft" && hasPrevious) {
        event.preventDefault()
        onPrevious?.()
      }

      if (event.key === "ArrowRight" && hasNext) {
        event.preventDefault()
        onNext?.()
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [hasNext, hasPrevious, onNext, onPrevious, playClose, ready])

  if (!mounted) {
    return null
  }

  const stateClass = [
    ready ? "is-ready" : "",
    closing ? "is-closing" : ""
  ]
    .filter(Boolean)
    .join(" ")

  return createPortal(
    <div
      className={`certs-lightbox ${stateClass}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        className="certs-lightbox__backdrop"
        onClick={playClose}
        aria-label={closeLabel}
      />
      <button
        ref={closeRef}
        type="button"
        className="certs-lightbox__close"
        onClick={playClose}
        aria-label={closeLabel}
      >
        ×
      </button>
      {hasPrevious && onPrevious ? (
        <button
          type="button"
          className="certs-lightbox__nav certs-lightbox__nav--prev"
          onClick={onPrevious}
          disabled={!ready}
          aria-label={previousLabel}
        >
          <NavChevron direction="prev" />
        </button>
      ) : null}
      {hasNext && onNext ? (
        <button
          type="button"
          className="certs-lightbox__nav certs-lightbox__nav--next"
          onClick={onNext}
          disabled={!ready}
          aria-label={nextLabel}
        >
          <NavChevron direction="next" />
        </button>
      ) : null}
      <div className="certs-lightbox__stage">
        <div
          ref={frameRef}
          className="certs-lightbox__frame"
          onPointerDown={event => {
            if (!canNavigate) {
              return
            }

            swipeRef.current = { x: event.clientX, y: event.clientY }
          }}
          onPointerUp={event => {
            if (!swipeRef.current || closingRef.current) {
              swipeRef.current = null
              return
            }

            const dx = event.clientX - swipeRef.current.x
            const dy = event.clientY - swipeRef.current.y
            swipeRef.current = null

            if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy)) {
              return
            }

            if (dx > 0 && hasPrevious) {
              onPrevious?.()
              return
            }

            if (dx < 0 && hasNext) {
              onNext?.()
            }
          }}
          onPointerCancel={() => {
            swipeRef.current = null
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="96vw"
            priority
            className="certs-lightbox__image"
          />
        </div>
      </div>
      <div className="certs-lightbox__meta">
        <p className="certs-lightbox__title">{alt}</p>
        {counter ? <p className="certs-lightbox__counter">{counter}</p> : null}
      </div>
    </div>,
    document.body
  )
}

export default Lightbox
