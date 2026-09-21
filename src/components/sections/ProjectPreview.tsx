"use client"

import StatusDot from "@/components/terminal/StatusDot"
import { useI18n } from "@/i18n/useI18n"
import type { PreviewAvailability } from "@/lib/previewAvailability"
import { ConfirmLeaveSite, SiteOffline } from "@/utils/alerts"
import Image from "next/image"
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"

const FRAME_WIDTH = 1440
const FRAME_HEIGHT = 900
const LOAD_TIMEOUT_MS = 8000

const previewHost = (url: string) => {
  try {
    return new URL(url).host
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "")
  }
}

const ExternalIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M6.2 3.5H3.6A1.6 1.6 0 0 0 2 5.1v7.3A1.6 1.6 0 0 0 3.6 14h7.3a1.6 1.6 0 0 0 1.6-1.6V9.4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M8.8 2.5h4.7V7.2M7.2 8.8 13.5 2.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const LockIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <rect x="3.2" y="7.2" width="9.6" height="6.4" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M5.2 7.2V5.4a2.8 2.8 0 0 1 5.6 0v1.8"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
)

const ProjectPreview = ({
  url,
  poster,
  name,
  teaser,
  availability,
  embeddable = false
}: {
  url: string
  poster: string
  name: string
  teaser: string
  availability: PreviewAvailability
  embeddable?: boolean
}) => {
  const { t } = useI18n()
  const rootRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [inView, setInView] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [active, setActive] = useState(false)
  const host = previewHost(url)
  const offline = availability === "offline"
  const live = availability === "live"
  const canEmbed =
    embeddable && (availability === "live" || availability === "unknown")
  const showFrame = inView && canEmbed && !failed
  const interacting = showFrame && ready && active
  const alt = `${name} — ${teaser}`

  useEffect(() => {
    const node = rootRef.current

    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        observer.disconnect()
        setInView(true)
      },
      { root: null, rootMargin: "160px 0px", threshold: 0 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const node = screenRef.current

    if (!node) {
      return
    }

    const update = () => {
      const next = node.clientWidth / FRAME_WIDTH
      if (next > 0) {
        setScale(next)
      }
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (canEmbed && !offline) {
      return
    }

    setFailed(false)
    setReady(false)
    setActive(false)
  }, [canEmbed, offline])

  useEffect(() => {
    if (!showFrame || ready) {
      return
    }

    const timer = window.setTimeout(() => {
      setFailed(true)
    }, LOAD_TIMEOUT_MS)

    return () => window.clearTimeout(timer)
  }, [ready, showFrame])

  useEffect(() => {
    if (!interacting) {
      return
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setActive(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false)
      }
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [interacting])

  const openLive = async () => {
    if (offline) {
      SiteOffline(name, t.project)
      return
    }

    const leave = await ConfirmLeaveSite(t.project)
    if (leave) {
      window.open(url, "_blank", "noreferrer")
    }
  }

  const showLiveBadge = live || ready
  let previewTone: "warning" | "success" | "muted" = "muted"
  if (offline) {
    previewTone = "warning"
  } else if (showLiveBadge) {
    previewTone = "success"
  }
  let screenVeil: ReactNode = null

  if (offline) {
    screenVeil = (
      <div className="project-preview__veil is-static">
        <span>{t.project.offline}</span>
      </div>
    )
  } else if (!canEmbed && live) {
    screenVeil = (
      <button type="button" className="project-preview__veil" onClick={openLive}>
        <span>{t.project.visit}</span>
      </button>
    )
  } else if (ready && !interacting) {
    screenVeil = (
      <button
        type="button"
        className="project-preview__veil"
        onClick={() => setActive(true)}
      >
        <span>{t.project.previewInteract}</span>
      </button>
    )
  }

  return (
    <div
      ref={rootRef}
      className={`project-preview${interacting ? " is-active" : ""}${ready ? " is-ready" : ""}${offline ? " is-offline" : ""}`}
    >
      <div className="project-preview__bar">
        <p className="project-preview__place">
          <StatusDot tone={previewTone} pulse={showLiveBadge} />
          {t.project.preview}
        </p>
        {offline ? (
          <p className="project-preview__url is-static" title={url}>
            <LockIcon />
            <span>{host}</span>
          </p>
        ) : (
          <button
            type="button"
            className="project-preview__url"
            onClick={openLive}
            title={url}
          >
            <LockIcon />
            <span>{host}</span>
          </button>
        )}
        <div className="project-preview__tools">
          {offline ? (
            <span className="project-preview__live is-offline">{t.status.offline}</span>
          ) : showLiveBadge ? (
            <span className="project-preview__live">{t.status.live}</span>
          ) : null}
          {offline ? null : (
            <button
              type="button"
              className="project-preview__open"
              onClick={openLive}
              aria-label={t.project.visit}
            >
              <ExternalIcon />
            </button>
          )}
        </div>
      </div>

      <div ref={screenRef} className="project-preview__screen">
        <Image
          className="project-preview__poster"
          src={poster}
          alt={ready ? "" : alt}
          fill
          sizes="(max-width: 899px) 100vw, 58vw"
          priority
        />
        {showFrame ? (
          <iframe
            className="project-preview__frame"
            src={url}
            title={`${t.project.preview}: ${name}`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            tabIndex={interacting ? 0 : -1}
            style={{
              width: FRAME_WIDTH,
              height: FRAME_HEIGHT,
              transform: `scale(${scale})`
            }}
            onLoad={() => {
              setFailed(false)
              setReady(true)
            }}
            onError={() => {
              setFailed(true)
              setReady(false)
            }}
          />
        ) : null}
        {screenVeil}
        {interacting ? (
          <button
            type="button"
            className="project-preview__exit"
            onClick={() => setActive(false)}
          >
            {t.project.previewExit}
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default ProjectPreview
