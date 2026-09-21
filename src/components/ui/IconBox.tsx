import { ReactNode } from "react"

const IconBox = ({
  children,
  tone = "teal",
  round
}: {
  children: ReactNode
  tone?: "teal" | "purple"
  round?: boolean
}) =>
  <span
    className={`ui-icon-box${tone === "purple" ? " ui-icon-box--purple" : ""}${round ? " ui-icon-box--round" : ""}`}
  >
    {children}
  </span>

export default IconBox
