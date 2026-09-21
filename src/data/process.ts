import type { SiteIconName } from "@/components/ui/SiteIcon"
import type { BuildAccent } from "@/data/whatIBuild"

export const PROCESS_PATH = "~/process"

export const PROCESS_STEPS: {
  id: string
  index: string
  icon: SiteIconName
  accent: BuildAccent
}[] = [
  { id: "discover", index: "01", icon: "search", accent: "cyan" },
  { id: "strategy", index: "02", icon: "layers", accent: "blue" },
  { id: "build", index: "03", icon: "brackets", accent: "indigo" },
  { id: "launch", index: "04", icon: "rocket", accent: "purple" },
  { id: "evolve", index: "05", icon: "cycle", accent: "orange" }
]
