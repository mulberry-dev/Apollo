"use client"

import ProjectStatus from "@/components/terminal/ProjectStatus"
import TypeCopy from "@/components/terminal/TypeCopy"
import { useI18n } from "@/i18n/useI18n"
import type { PreviewAvailability } from "@/lib/previewAvailability"
import { builtWithAi, builtWithoutAi, type Project } from "@/lib/projects"

const ProjectFlags = ({
  project,
  availability
}: {
  project: Project
  availability?: PreviewAvailability
}) => {
  const { t } = useI18n()
  const handmade = builtWithoutAi(project)
  const withAi = builtWithAi(project)

  return (
    <span className="project-flags">
      <ProjectStatus project={project} availability={availability} />
      {handmade || withAi ? (
        <span
          className={`term-status ${handmade ? "term-status--pre-ai" : "term-status--with-ai"}`}
          title={handmade ? t.status.handmadeTitle : t.status.withAiTitle}
        >
          <TypeCopy
            text={handmade ? t.status.noAi : t.status.withAi}
            caret={false}
          />
        </span>
      ) : null}
    </span>
  )
}

export default ProjectFlags
