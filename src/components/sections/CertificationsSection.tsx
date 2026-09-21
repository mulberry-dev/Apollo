"use client"

import "@/styles/scss/sections/certifications.scss"
import Badge from "@/components/ui/Badge"
import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import FilterPills from "@/components/ui/FilterPills"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import TypeCopy from "@/components/terminal/TypeCopy"
import WorkspaceHeader from "@/components/terminal/WorkspaceHeader"
import { certificates, type Certificate } from "@/data/certificates"
import { WORKSPACE } from "@/data/workspace"
import { useI18n } from "@/i18n/useI18n"
import type { LightboxOrigin } from "@/components/ui/Lightbox"
import dynamic from "next/dynamic"
import Image from "next/image"
import { MouseEvent, useCallback, useMemo, useRef, useState } from "react"

const Lightbox = dynamic(() => import("@/components/ui/Lightbox"), {
  ssr: false
})

const categoryOrder = ["mobile", "security", "english", "development"]

const Certifications = () => {
  const { t } = useI18n()
  const titleOf = (certificate: Certificate) =>
    t.certifications.items[String(certificate.id)]?.title ?? ""
  const categoryOf = (certificate: Certificate) =>
    t.certifications.categories[certificate.category]
  const filters = [
    { id: "all", label: t.certifications.filters.all },
    { id: "security", label: t.certifications.filters.security },
    { id: "english", label: t.certifications.filters.english },
    { id: "development", label: t.certifications.filters.development }
  ]
  const [active, setActive] = useState("all")
  const [viewer, setViewer] = useState<{
    id: number
    origin: LightboxOrigin
  } | null>(null)
  const imageRefs = useRef<Map<number, HTMLImageElement>>(new Map())
  const visible = useMemo(
    () =>
      certificates
        .filter(item => {
          if (active === "all") {
            return true
          }

          if (active === "development") {
            return item.category === "development" || item.category === "mobile"
          }

          return item.category === active
        })
        .sort(
          (a, b) =>
            categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
        ),
    [active]
  )
  const openCertificate = certificates.find(item => item.id === viewer?.id)
  const currentIndex = viewer
    ? visible.findIndex(item => item.id === viewer.id)
    : -1
  const canNavigate = visible.length > 1 && currentIndex >= 0
  const sourceImage = openCertificate
    ? imageRefs.current.get(openCertificate.id)
    : undefined
  const aspectRatio =
    sourceImage && sourceImage.naturalWidth
      ? sourceImage.naturalWidth / sourceImage.naturalHeight
      : 640 / 420

  const readOrigin = (node: Element | null): LightboxOrigin | null => {
    if (!node) {
      return null
    }

    const rect = node.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  }

  const getOrigin = useCallback(() => {
    if (!viewer) {
      return null
    }

    return readOrigin(imageRefs.current.get(viewer.id) ?? null)
  }, [viewer])

  const openViewer = (
    id: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    const image = imageRefs.current.get(id) ?? event.currentTarget.querySelector("img")
    const origin = readOrigin(image)
    if (!origin) {
      return
    }

    setViewer({ id, origin })
  }

  const goByOffset = useCallback((offset: number) => {
    setViewer(current => {
      if (!current) {
        return current
      }

      const index = visible.findIndex(item => item.id === current.id)
      if (index < 0 || visible.length < 2) {
        return current
      }

      const next = visible[(index + offset + visible.length) % visible.length]
      return { ...current, id: next.id }
    })
  }, [visible])

  const goPrevious = useCallback(() => goByOffset(-1), [goByOffset])
  const goNext = useCallback(() => goByOffset(1), [goByOffset])

  return (
    <section
      id="certifications"
      data-section-path="/certifications"
      aria-label={t.certifications.ariaLabel}
      tabIndex={-1}
    >
      <Container className="certs-page">
        <RevealGroup mode="auto" stagger={64}>
          <WorkspaceHeader
            index={WORKSPACE.certifications.index}
            path={WORKSPACE.certifications.path}
            title={t.workspace.certifications}
            meta={t.certifications.meta.replace("{count}", String(certificates.length))}
          />
          <Reveal type="text" className="certs-trust">
            <p className="certs-trust__kicker">
              {t.certifications.kicker}
            </p>
            <h2 className="certs-trust__headline">{t.certifications.headline}</h2>
            <ul className="certs-metrics">
              {t.certifications.metrics.map((metric) => (
                <li key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal type="nav">
            <FilterPills options={filters} active={active} onChange={setActive} />
          </Reveal>
        </RevealGroup>
        <RevealGroup className="certs-grid" mode="auto" stagger={52} key={active}>
          {visible.map(certificate =>
            <Reveal key={certificate.id} type="image">
            <Card
              className={`certs-card${certificate.category === "mobile" ? " certs-card--mobile" : ""}${viewer?.id === certificate.id ? " is-expanded" : ""}`}
            >
              <button
                type="button"
                className="certs-card__open"
                onClick={event => openViewer(certificate.id, event)}
                aria-label={t.certifications.view.replace("{title}", titleOf(certificate))}
              >
                <Image
                  ref={node => {
                    if (node) {
                      imageRefs.current.set(certificate.id, node)
                    } else {
                      imageRefs.current.delete(certificate.id)
                    }
                  }}
                  src={certificate.url}
                  alt={titleOf(certificate)}
                  width={640}
                  height={420}
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  loading="lazy"
                  decoding="async"
                  className="certs-card__image"
                />
                <Badge variant={certificate.category}>
                  <TypeCopy text={categoryOf(certificate)} caret={false} />
                </Badge>
                <h3>
                  <TypeCopy text={titleOf(certificate)} caret={false} />
                </h3>
              </button>
            </Card>
            </Reveal>
          )}
        </RevealGroup>
      </Container>
      {openCertificate && viewer ? (
        <Lightbox
          src={openCertificate.url}
          alt={titleOf(openCertificate)}
          origin={viewer.origin}
          getOrigin={getOrigin}
          aspectRatio={aspectRatio}
          onClose={() => setViewer(null)}
          onPrevious={canNavigate ? goPrevious : undefined}
          onNext={canNavigate ? goNext : undefined}
          hasPrevious={canNavigate}
          hasNext={canNavigate}
          closeLabel={t.certifications.close}
          previousLabel={t.certifications.previous}
          nextLabel={t.certifications.next}
          counter={
            currentIndex >= 0
              ? `${currentIndex + 1} / ${visible.length}`
              : undefined
          }
        />
      ) : null}
    </section>
  )
}

export default Certifications
