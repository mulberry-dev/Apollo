"use client"

import SiteIcon from "@/components/ui/SiteIcon"
import { CONNECTED_NODES } from "@/data/whatIBuild"
import { type CSSProperties } from "react"
import { useHotScene } from "./useHotScene"

const LINES = [
  { d: "M200 168 V 72", delay: "0ms" },
  { d: "M200 168 H 80", delay: "90ms" },
  { d: "M200 168 H 320", delay: "160ms" },
  { d: "M200 168 V 264", delay: "230ms" }
]

const ConnectedScene = () => {
  const { ref, hot } = useHotScene(0.22)

  return (
    <div
      ref={ref}
      className={`connect-scene${hot ? " is-hot" : ""}`}
      role="img"
      aria-label="Product connected to identity, payments, APIs, and data"
    >
      <div className="connect-scene__canvas">
        <svg
          className="connect-scene__lines"
          viewBox="0 0 400 336"
          fill="none"
          role="presentation"
        >
          {LINES.map((line) => (
            <g key={line.d}>
              <path
                className="connect-scene__path"
                d={line.d}
                pathLength={1}
                style={{ "--connect-delay": line.delay } as CSSProperties}
              />
              <circle
                className="connect-scene__pulse"
                r="3.2"
                style={
                  {
                    "--connect-delay": line.delay,
                    offsetPath: `path("${line.d}")`
                  } as CSSProperties
                }
              />
            </g>
          ))}
        </svg>

        {CONNECTED_NODES.map((node) => (
          <div
            key={node.id}
            className={`connect-scene__node is-${node.slot} connect-scene__node--${node.tone}`}
          >
            <SiteIcon name={node.icon} />
            <span>{node.label}</span>
          </div>
        ))}

        <div className="connect-scene__core">
          <SiteIcon name="devices" />
          <span>PRODUCT</span>
        </div>
      </div>
    </div>
  )
}

export default ConnectedScene
