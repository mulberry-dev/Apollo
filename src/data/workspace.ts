export const WORKSPACE_HOST = "santiago@dev"

export const WORKSPACE = {
  home: {
    path: "~",
    index: "",
    title: "Home"
  },
  skills: {
    path: "~/services",
    index: "01",
    title: "Services"
  },
  work: {
    path: "~/work",
    index: "02",
    title: "Selected Work"
  },
  process: {
    path: "~/process",
    index: "03",
    title: "Process"
  },
  about: {
    path: "~/about-me",
    index: "04",
    title: "About Me"
  },
  certifications: {
    path: "~/credentials",
    index: "05",
    title: "Credentials"
  },
  contact: {
    path: "~/contact",
    index: "06",
    title: "Start a project"
  }
} as const

export const FEATURED_PROJECT_IDS = [
  "FuenteDeVidaResidencial",
  "MulberryMarketing",
  "SaasProject"
] as const
