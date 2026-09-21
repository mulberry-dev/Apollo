import { BUILD_HOST, BUILD_PATH, BUILD_STACK_PATH } from "@/data/whatIBuild"

export const BuildCursor = () => (
  <span className="skills-cursor" aria-hidden="true" />
)

export const BuildPrompt = ({
  command,
  cursor = false
}: {
  command: string
  cursor?: boolean
}) => (
  <p className="skills-prompt">
    <span className="skills-prompt__cash">$</span>
    <span> {command}</span>
    {cursor ? <BuildCursor /> : null}
  </p>
)

export const BuildSession = ({
  path = BUILD_PATH,
  cursor = false
}: {
  path?: string
  cursor?: boolean
}) => (
  <p className="skills-session">
    <span className="skills-session__host">{BUILD_HOST}</span>
    <span className="skills-session__colon">:</span>
    <span className="skills-session__path">{path}</span>
    <span className="skills-session__cash">$</span>
    {cursor ? <BuildCursor /> : null}
  </p>
)

export const StackSession = ({ cursor = false }: { cursor?: boolean }) => (
  <BuildSession path={BUILD_STACK_PATH} cursor={cursor} />
)
