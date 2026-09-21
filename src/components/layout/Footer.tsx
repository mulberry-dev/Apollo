"use client"

import LanguageSwitch from "@/components/LanguageSwitch"
import TypeCopy from "@/components/terminal/TypeCopy"
import StatusDot from "@/components/terminal/StatusDot"
import TerminalPrompt from "@/components/terminal/TerminalPrompt"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import { COPYRIGHT_NAME } from "@/data/site"
import { WORKSPACE } from "@/data/workspace"
import { useI18n } from "@/i18n/useI18n"
import { isSectionPath } from "@/lib/sectionNav"
import { usePathname } from "next/navigation"

const Footer = () => {
  const pathname = usePathname()
  const { t } = useI18n()
  const year = new Date().getFullYear()

  if (!isSectionPath(pathname)) {
    return null
  }

  return (
    <footer className="site-footer">
      <RevealGroup className="site-footer__inner" mode="scroll" stagger={50}>
        <Reveal type="eyebrow">
          <TerminalPrompt path={WORKSPACE.home.path} cursor className="site-footer__prompt" />
        </Reveal>
        <Reveal type="text" className="site-footer__copy">
          <p>
            © {year} {COPYRIGHT_NAME}
          </p>
          <LanguageSwitch className="language-switch language-switch--footer" />
        </Reveal>
        <Reveal type="text" as="p" className="site-footer__note">
          <TypeCopy text={t.footer.systemOnline} />
          <StatusDot pulse />
        </Reveal>
      </RevealGroup>
    </footer>
  )
}

export default Footer
