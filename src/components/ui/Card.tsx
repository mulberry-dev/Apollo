import { ReactNode } from "react"

const Card = ({
  children,
  className = ""
}: {
  children: ReactNode
  className?: string
}) => <div className={`ui-card ${className}`.trim()}>{children}</div>

export default Card
