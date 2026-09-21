"use client"

import TypeCopy from "@/components/terminal/TypeCopy"
import { useI18n } from "@/i18n/useI18n"
import { useHotScene } from "./useHotScene"

const ARROWS = [0, 1, 2] as const

const ModernizeScene = () => {
  const { t } = useI18n()
  const { ref, hot } = useHotScene(0.2)

  return (
    <div
      ref={ref}
      className={`modern-scene${hot ? " is-hot" : ""}`}
      role="img"
      aria-label={`${t.skills.modernization.legacyLabel}: ${t.skills.modernization.legacy.join(", ")}. ${t.skills.modernization.modernLabel}: ${t.skills.modernization.modern.join(", ")}`}
    >
      <div className="modern-scene__pane modern-scene__pane--legacy">
        <p>
          <TypeCopy text={t.skills.modernization.legacyLabel} />
        </p>
        <ul>
          {t.skills.modernization.legacy.map((item, index) => (
            <li key={index}>
              <span className="modern-scene__mark" aria-hidden="true">
                ×
              </span>
              <span className="modern-scene__label">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="modern-scene__bridge" aria-hidden="true">
        {ARROWS.map((index) => (
          <span key={index} className="modern-scene__arrow">
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
        ))}
      </div>

      <div className="modern-scene__pane modern-scene__pane--modern">
        <p>
          <TypeCopy text={t.skills.modernization.modernLabel} />
        </p>
        <ul>
          {t.skills.modernization.modern.map((item, index) => (
            <li key={index}>
              <span className="modern-scene__mark" aria-hidden="true">
                ✓
              </span>
              <span className="modern-scene__label">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ModernizeScene
