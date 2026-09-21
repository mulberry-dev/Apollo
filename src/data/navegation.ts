export type SiteSectionLink = {
  id: number
  name: string
  path: string
  nav: boolean
}

export const sections: SiteSectionLink[] = [
  { id: 1, name: "Home", path: "/", nav: true },
  { id: 2, name: "Services", path: "/skills", nav: true },
  { id: 3, name: "Work", path: "/portfolio", nav: true },
  { id: 4, name: "Process", path: "/process", nav: true },
  { id: 5, name: "About", path: "/about", nav: true },
  { id: 6, name: "Certifications", path: "/certifications", nav: false },
  { id: 7, name: "Contact", path: "/contact", nav: true }
]

export const links = sections.filter((section) => section.nav)
