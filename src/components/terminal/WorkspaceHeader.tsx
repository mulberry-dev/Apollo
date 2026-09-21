import CommandLine from "@/components/terminal/CommandLine"
import TypeCopy from "@/components/terminal/TypeCopy"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import TerminalPrompt from "@/components/terminal/TerminalPrompt"

const WorkspaceHeader = ({
  index,
  path,
  title,
  as = "h2",
  command,
  meta
}: {
  index: string
  path: string
  title: string
  as?: "h1" | "h2"
  command?: string
  meta?: string
}) => {
  const Heading = as

  return (
    <RevealGroup className="workspace-header" mode="auto" stagger={48}>
      <Reveal type="eyebrow" className="workspace-header__context">
        <span className="workspace-header__index" aria-hidden="true">
          {index}.
        </span>
        <TerminalPrompt path={path} />
      </Reveal>
      <Reveal type="heading" as={Heading} className="workspace-header__title">
        <TypeCopy text={title} />
      </Reveal>
      {command ? (
        <Reveal type="text">
          <CommandLine command={command} />
        </Reveal>
      ) : null}
      {meta ? (
        <Reveal type="text" as="p" className="workspace-header__meta">
          <TypeCopy text={meta} />
        </Reveal>
      ) : null}
    </RevealGroup>
  )
}

export default WorkspaceHeader
