"use client"

import SiteIcon from "@/components/ui/SiteIcon"
import { ARCH_LAYERS, ARCH_REQUEST } from "@/data/whatIBuild"
import { useHotScene } from "./useHotScene"

const ArchitectureScene = () => {
  const { ref, hot } = useHotScene(0.22)

  return (
    <div
      ref={ref}
      className={`arch-scene${hot ? " is-hot" : ""}`}
      role="img"
      aria-label="Request flowing from the client through the API and services to data"
    >
      <div className="arch-scene__frame">
        <header className="arch-scene__top">
          <span className="arch-scene__method">{ARCH_REQUEST.method}</span>
          <strong>{ARCH_REQUEST.path}</strong>
          <span className="arch-scene__ok">{ARCH_REQUEST.status}</span>
        </header>

        <ol className="arch-scene__flow">
          {ARCH_LAYERS.map((node, index) => (
            <li key={node.id} className={`arch-scene__step is-${node.id}`}>
              {index > 0 ? (
                <span className="arch-scene__arrow" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M5 3.2 11 8 5 12.8"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : null}
              <div className={`arch-scene__node arch-scene__node--${node.tone}`}>
                <span className="arch-scene__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <SiteIcon name={node.icon} />
                <span>{node.label}</span>
                {"tag" in node ? <em>{node.tag}</em> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default ArchitectureScene
