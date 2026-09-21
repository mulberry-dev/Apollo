"use client"

import SiteIcon from "@/components/ui/SiteIcon"
import {
  PRODUCT_ACTIVITY,
  PRODUCT_LAYERS,
  PRODUCT_METRICS,
  PRODUCT_NAV
} from "@/data/whatIBuild"
import { useHotScene } from "./useHotScene"

const CHART = "M8 52 C 42 52, 48 34, 78 36 S 118 18, 148 22 S 188 44, 228 28 S 268 16, 300 20"

const ProductScene = () => {
  const { ref, hot } = useHotScene(0.2)

  return (
    <div
      ref={ref}
      className={`product-scene${hot ? " is-hot" : ""}`}
      aria-hidden="true"
    >
      <div className="product-scene__frame">
        <aside className="product-scene__rail">
          <span className="product-scene__mark">M</span>
          <nav className="product-scene__nav">
            {PRODUCT_NAV.map((item) => (
              <span
                key={item.label}
                className={
                  item.active
                    ? "product-scene__nav-item is-active"
                    : "product-scene__nav-item"
                }
              >
                <SiteIcon name={item.icon} />
                <span>{item.label}</span>
              </span>
            ))}
          </nav>
        </aside>

        <div className="product-scene__main">
          <header className="product-scene__top">
            <strong>Mulberry</strong>
            <span className="product-scene__search">Search</span>
            <span className="product-scene__user">SM</span>
          </header>

          <div className="product-scene__metrics">
            {PRODUCT_METRICS.map((metric, index) => (
              <article
                key={metric.label}
                className={`product-scene__metric product-scene__metric--${index}`}
              >
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <em>{metric.delta}</em>
              </article>
            ))}
          </div>

          <div className="product-scene__body">
            <div className="product-scene__chart">
              <div className="product-scene__chart-head">
                <span>Appointments</span>
                <span>7 days</span>
              </div>
              <svg viewBox="0 0 308 68" fill="none" role="presentation">
                <defs>
                  <linearGradient id="product-chart-line" x1="8" y1="20" x2="300" y2="20">
                    <stop offset="0%" stopColor="var(--brand-cyan)" />
                    <stop offset="55%" stopColor="var(--brand-blue)" />
                    <stop offset="100%" stopColor="var(--brand-purple)" />
                  </linearGradient>
                  <linearGradient id="product-chart-fill" x1="154" y1="16" x2="154" y2="68">
                    <stop offset="0%" stopColor="var(--brand-cyan)" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="var(--brand-purple)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  className="product-scene__chart-fill"
                  d={`${CHART} L 300 68 L 8 68 Z`}
                />
                <path
                  className="product-scene__chart-line"
                  d={CHART}
                  pathLength={1}
                />
              </svg>
            </div>

            <div className="product-scene__activity">
              <span>Recent activity</span>
              <ul>
                {PRODUCT_ACTIVITY.map((item, index) => (
                  <li
                    key={item.title}
                    className={`product-scene__event product-scene__event--${index}`}
                  >
                    <strong>{item.title}</strong>
                    <span>{item.meta}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <footer className="product-scene__layers">
            {PRODUCT_LAYERS.map((layer) => (
              <span
                key={layer.id}
                className={layer.active ? "is-active" : undefined}
              >
                {layer.label}
              </span>
            ))}
          </footer>
        </div>
      </div>
    </div>
  )
}

export default ProductScene
