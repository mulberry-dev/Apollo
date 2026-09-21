"use client"

import TypeCopy from "@/components/terminal/TypeCopy"
import { CategoryIcon } from "@/components/ui/CategoryIcon"

export type FilterOption = {
  id: string
  label: string
  count?: number
}

const FilterPills = ({
  options,
  active,
  onChange,
  variant = "pills",
  labelledBy
}: {
  options: FilterOption[]
  active: string
  onChange: (id: string) => void
  variant?: "pills" | "command"
  labelledBy?: string
}) =>
  <div
    className={`ui-filter-pills${variant === "command" ? " ui-filter-pills--command" : ""}`}
    role="tablist"
    aria-labelledby={labelledBy}
  >
    {options.map(option =>
      <button
        key={option.id}
        type="button"
        role="tab"
        aria-selected={active === option.id}
        aria-label={
          option.count !== undefined
            ? `${option.label}, ${option.count} projects`
            : option.label
        }
        className={`ui-filter-pill ui-filter-pill--${option.id}${active === option.id ? " is-active" : ""}`}
        onClick={() => onChange(option.id)}
      >
        {variant === "pills" ? <CategoryIcon variant={option.id} /> : null}
        <span>
          {variant === "command" ? "[ " : null}
          <TypeCopy text={option.label} caret={false} />
          {option.count !== undefined ? (
            <span className="ui-filter-count">
              {" "}
              {String(option.count).padStart(2, "0")}
            </span>
          ) : null}
          {variant === "command" ? " ]" : null}
        </span>
      </button>
    )}
  </div>

export default FilterPills
