"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const GoogleAnalytics = dynamic(
  () =>
    import("@next/third-parties/google").then((mod) => mod.GoogleAnalytics),
  { ssr: false }
)

const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((mod) => mod.Analytics),
  { ssr: false }
)

const SpeedInsights = dynamic(
  () =>
    import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  { ssr: false }
)

const DeferredAnalytics = ({ gaId }: { gaId: string }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (ready) {
      return
    }

    const enable = () => setReady(true)
    const timeoutId = window.setTimeout(enable, 20000)

    window.addEventListener("pointerdown", enable, { once: true, passive: true })
    window.addEventListener("keydown", enable, { once: true })

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener("pointerdown", enable)
      window.removeEventListener("keydown", enable)
    }
  }, [ready])

  if (!ready) {
    return null
  }

  return (
    <>
      <GoogleAnalytics gaId={gaId} />
      {process.env.NEXT_PUBLIC_VERCEL_ENV ? (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      ) : null}
    </>
  )
}

export default DeferredAnalytics
