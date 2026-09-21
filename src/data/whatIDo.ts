import type { SiteIconName } from "@/components/ui/SiteIcon"
import type { BuildAccent } from "@/data/whatIBuild"

export const CAPABILITIES: {
  icon: SiteIconName
  title: string
  text: string
  accent: BuildAccent
}[] = [
  {
    icon: "app",
    title: "Custom web applications",
    text: "Products designed around a specific workflow, audience, and business constraint.",
    accent: "cyan"
  },
  {
    icon: "globe",
    title: "Business websites",
    text: "Fast sites that explain the offer, build trust, and support commercial goals.",
    accent: "blue"
  },
  {
    icon: "bulb",
    title: "MVP and product development",
    text: "Turn an idea into a working product you can put in front of real users.",
    accent: "indigo"
  },
  {
    icon: "connect",
    title: "Systems and integrations",
    text: "APIs, databases, and third-party services connected into one reliable system.",
    accent: "purple"
  },
  {
    icon: "layers",
    title: "Full-stack delivery",
    text: "Frontend, backend, and supporting infrastructure owned as one engagement.",
    accent: "orange"
  }
]
