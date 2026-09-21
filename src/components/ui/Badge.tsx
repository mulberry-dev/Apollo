import { CategoryIcon } from "@/components/ui/CategoryIcon"
import { ReactNode } from "react"

const Badge = ({
  children,
  variant
}: {
  children: ReactNode
  variant?: string
}) => (
  <span className={`ui-badge${variant ? ` ui-badge--${variant}` : ""}`.trim()}>
    <CategoryIcon variant={variant} />
    {children}
  </span>
)

export default Badge
