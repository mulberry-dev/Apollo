import JsonLd from "@/components/JsonLd"
import ProjectDetails from "@/components/sections/ProjectDetails"
import { getMessages } from "@/i18n"
import { data as projects } from "@/data/projects"
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/jsonLd"
import { projectPageMetadata } from "@/lib/sectionMeta"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type PageProps = {
  params: { id: string }
}

export function generateStaticParams() {
  return projects.map(project => ({ id: String(project.id) }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  return projectPageMetadata(params.id, "en")
}

const Page = ({ params }: PageProps) => {
  const project = projects.find(item => String(item.id) === params.id)

  if (!project) {
    notFound()
  }

  const messages = getMessages("en")

  return (
    <>
      <JsonLd
        data={[
          projectJsonLd(params.id, "en"),
          breadcrumbJsonLd(
            [
              { name: messages.nav.home, path: "/" },
              { name: messages.nav.portfolio, path: "/portfolio" },
              { name: messages.projects[params.id]?.name ?? project.name, path: `/portfolio/${params.id}` }
            ],
            "en"
          )
        ]}
      />
      <ProjectDetails id={params.id} />
    </>
  )
}

export default Page
