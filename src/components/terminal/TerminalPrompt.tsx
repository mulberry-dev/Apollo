import { WORKSPACE_HOST } from "@/data/workspace"

const TerminalPrompt = ({
  path = "~",
  cursor = false,
  className = ""
}: {
  path?: string
  cursor?: boolean
  className?: string
}) => (
  <p className={`term-prompt${className ? ` ${className}` : ""}`}>
    <span className="term-prompt__host">{WORKSPACE_HOST}</span>
    <span className="term-prompt__colon">:</span>
    <span className="term-prompt__path">{path}</span>
    <span className="term-prompt__cash">$</span>
    {cursor ? <span className="term-cursor" aria-hidden="true" /> : null}
  </p>
)

export default TerminalPrompt
