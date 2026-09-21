"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export type PreviewAvailability = "checking" | "live" | "offline" | "unknown"

type ProbeStatus = Exclude<PreviewAvailability, "checking">

type ProbeResult = {
  status: ProbeStatus
  embeddable: boolean
}

export async function fetchPreviewAvailability(
  url: string
): Promise<ProbeResult> {
  try {
    const response = await fetch(
      `/api/preview-status?url=${encodeURIComponent(url)}`
    )
    const data = await response.json()
    const embeddable = data.embeddable === true

    if (data.live) {
      return { status: "live", embeddable }
    }

    if (data.uncertain) {
      return { status: "unknown", embeddable: false }
    }

    return { status: "offline", embeddable: false }
  } catch {
    return { status: "unknown", embeddable: false }
  }
}

export function usePreviewAvailability(url?: string | null) {
  const [status, setStatus] = useState<PreviewAvailability>(
    url ? "checking" : "offline"
  )
  const [embeddable, setEmbeddable] = useState(false)
  const pendingRef = useRef<Promise<ProbeResult> | null>(null)

  useEffect(() => {
    if (!url) {
      setStatus("offline")
      setEmbeddable(false)
      pendingRef.current = Promise.resolve({
        status: "offline",
        embeddable: false
      })
      return
    }

    let cancelled = false
    setStatus("checking")
    setEmbeddable(false)

    const request = fetchPreviewAvailability(url)
    pendingRef.current = request
    request.then(next => {
      if (!cancelled) {
        setStatus(next.status)
        setEmbeddable(next.embeddable)
      }
    })

    return () => {
      cancelled = true
    }
  }, [url])

  const resolve = useCallback(async (): Promise<ProbeStatus> => {
    if (status !== "checking") {
      return status
    }

    return (await pendingRef.current)?.status ?? "unknown"
  }, [status])

  return { status, embeddable, resolve }
}
