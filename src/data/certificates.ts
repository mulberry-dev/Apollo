export const certificateCategories = [
  "mobile",
  "security",
  "english",
  "development"
] as const

export type CertificateCategory = (typeof certificateCategories)[number]

export type Certificate = {
  id: number
  url: string
  category: CertificateCategory
}

export const certificates: Certificate[] = [
  {
    id: 9,
    url: "/images/Certificates/DesarrolloMobileReactNative.webp",
    category: "mobile"
  },
  {
    id: 0,
    url: "/images/Certificates/CarreraDesarrolloFullStack.webp",
    category: "development"
  },
  {
    id: 1,
    url: "/images/Certificates/CarreraDesarrolloFrontEnd.webp",
    category: "development"
  },
  {
    id: 2,
    url: "/images/Certificates/CarreraDesarrolloDeAplicaciones.webp",
    category: "development"
  },
  {
    id: 3,
    url: "/images/Certificates/ProgramacionBackend.webp",
    category: "development"
  },
  {
    id: 4,
    url: "/images/Certificates/ReactJs.webp",
    category: "development"
  },
  {
    id: 5,
    url: "/images/Certificates/Ingles.webp",
    category: "english"
  },
  {
    id: 6,
    url: "/images/Certificates/JavaScript.webp",
    category: "development"
  },
  {
    id: 7,
    url: "/images/Certificates/DesarrolloWeb.webp",
    category: "development"
  },
  {
    id: 8,
    url: "/images/Certificates/Ciberseguridad.webp",
    category: "security"
  }
]
