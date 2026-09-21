"use client"

import PageTransition from "@/components/PageTransition"
import { isSectionPath } from "@/lib/sectionNav"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"

const SiteExperience = dynamic(() => import("@/components/SiteExperience"), {
  loading: () => <div className="site-experience is-aligned" aria-busy="true" />
})
const Footer = dynamic(() => import("@/components/layout/Footer"))

const SiteShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const onSite = isSectionPath(pathname)
  const [keepExperience, setKeepExperience] = useState(onSite)

  useEffect(() => {
    if (onSite) {
      setKeepExperience(true)
    }
  }, [onSite])

  return (
    <PageTransition>
      <main
        id={onSite ? "site-main" : undefined}
        className="site-main"
        tabIndex={onSite ? -1 : undefined}
        hidden={!onSite}
        aria-hidden={onSite ? undefined : true}
      >
        {keepExperience ? <SiteExperience /> : null}
      </main>
      {onSite ? null : (
        <main id="site-main" tabIndex={-1}>
          {children}
        </main>
      )}
      {keepExperience ? <Footer /> : null}
    </PageTransition>
  )
}

export default SiteShell
