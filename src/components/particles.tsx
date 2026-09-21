"use client"

import { ParticlesEngine, type ParticlePhase } from "@/lib/particlesEngine"
import { usePathname } from "next/navigation"
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react"

type ParticlesContextValue = {
  phase: ParticlePhase
  reducedMotion: boolean
  canTransition: boolean
  contentReady: boolean
  beginRouteTransition: () => Promise<void>
  completeRouteTransition: () => void
  boostParticles: () => void
  holdContent: () => void
  releaseContent: () => void
}

const ParticlesContext = createContext<ParticlesContextValue | null>(null)

export const useParticles = () => {
  const context = useContext(ParticlesContext)

  if (!context) {
    throw new Error("useParticles must be used within ParticlesProvider")
  }

  return context
}

export const useMotion = () => useContext(ParticlesContext)

export const ParticlesProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const engineRef = useRef<ParticlesEngine | null>(null)
  const [phase, setPhase] = useState<ParticlePhase>("idle")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [contentReady, setContentReady] = useState(true)
  const [layerMounted, setLayerMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const prevPathRef = useRef(pathname)

  const holdContent = useCallback(() => {
    setContentReady(false)
  }, [])

  const releaseContent = useCallback(() => {
    setContentReady(true)
  }, [])

  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncMotion = () => {
      const reduced = media.matches
      setReducedMotion(reduced)
      engineRef.current?.setReducedMotion(reduced)

      if (reduced) {
        setPhase("active")
        setLayerMounted(false)
        return
      }

      setLayerMounted(true)
    }

    syncMotion()
    media.addEventListener("change", syncMotion)

    return () => media.removeEventListener("change", syncMotion)
  }, [])

  useLayoutEffect(() => {
    if (prevPathRef.current === pathname) {
      return
    }

    prevPathRef.current = pathname
    releaseContent()
  }, [pathname, releaseContent])

  useLayoutEffect(() => {
    if (!layerMounted) {
      return
    }

    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const engine = engineRef.current ?? new ParticlesEngine()
    engineRef.current = engine
    engine.setPhaseListener(setPhase)
    engine.setContentRevealListener(releaseContent)
    engine.setReducedMotion(reducedMotion)

    if (!engine.mount(canvas)) {
      return
    }

    engine.setEmberMode(true, true)

    const currentPhase = engine.getPhase()

    if (currentPhase === "idle") {
      engine.startEnter()
    } else if (
      currentPhase === "active" ||
      currentPhase === "transitioning"
    ) {
      engine.startActive()
    } else {
      engine.armContentReveal()
    }

    return () => {
      engine.setPhaseListener(null)
      engine.setContentRevealListener(null)
      engine.unmount()
    }
  }, [layerMounted, reducedMotion, releaseContent])

  const beginRouteTransition = useCallback(
    () => engineRef.current?.beginRouteTransition() ?? Promise.resolve(),
    []
  )

  const completeRouteTransition = useCallback(() => {
    engineRef.current?.completeRouteTransition()
  }, [])

  const boostParticles = useCallback(() => {
    engineRef.current?.boost()
  }, [])

  const canTransition =
    !reducedMotion &&
    (phase === "entering" || phase === "active" || phase === "transitioning")

  const value = useMemo(
    () => ({
      phase,
      reducedMotion,
      canTransition,
      contentReady,
      beginRouteTransition,
      completeRouteTransition,
      boostParticles,
      holdContent,
      releaseContent
    }),
    [
      beginRouteTransition,
      boostParticles,
      canTransition,
      completeRouteTransition,
      contentReady,
      holdContent,
      phase,
      reducedMotion,
      releaseContent
    ]
  )

  return (
    <ParticlesContext.Provider value={value}>
      {layerMounted ? (
        <div
          className="particles-layer"
          data-phase={phase}
          aria-hidden="true"
        >
          <canvas ref={canvasRef} className="particles-layer__canvas" />
        </div>
      ) : null}

      {children}
    </ParticlesContext.Provider>
  )
}
