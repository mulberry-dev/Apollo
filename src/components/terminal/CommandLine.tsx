import TypeCopy from "@/components/terminal/TypeCopy"

const CommandLine = ({
  command,
  cursor = false,
  className = ""
}: {
  command: string
  cursor?: boolean
  className?: string
}) => (
  <p className={`term-command${className ? ` ${className}` : ""}`}>
    <span className="term-command__cash">$</span>
    <span>
      {" "}
      <TypeCopy text={command} />
    </span>
    {cursor ? <span className="term-cursor" aria-hidden="true" /> : null}
  </p>
)

export default CommandLine
