"use client"

import TypeCopy from "@/components/terminal/TypeCopy"
import { CategoryIcon } from "@/components/ui/CategoryIcon"
import { useI18n } from "@/i18n/useI18n"
import { type Project } from "@/lib/projects"

const ProjectType = ({ project }: { project: Project }) => {
  const { t } = useI18n()
  const label =
    t.categories[project.category as keyof typeof t.categories] ?? project.category

  return (
    <span
      className={`project-type project-type--${project.category}`}
      title={label}
    >
      <CategoryIcon variant={project.category} />
      <TypeCopy text={label} caret={false} />
    </span>
  )
}

export default ProjectType
