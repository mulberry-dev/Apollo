import { ReactNode } from "react"

const Container = ({
  children,
  className = ""
}: {
  children: ReactNode
  className?: string
}) => <div className={`ui-container ${className}`.trim()}>{children}</div>

export default Container
