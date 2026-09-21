"use client"

import LanguageSwitch from "@/components/LanguageSwitch"
import TypeCopy from "@/components/terminal/TypeCopy"
import StatusDot from "@/components/terminal/StatusDot"
import {
  AUTHOR_LOCATION,
  CONTACT_EMAIL,
  COPYRIGHT_NAME,
  SITE_NAME
} from "@/data/site"
import { CONTACT_OPTIONS } from "@/data/contact"
import { useI18n } from "@/i18n/useI18n"
import { isSectionPath } from "@/lib/sectionNav"
import { usePathname } from "next/navigation"

const Footer = () => {
  const pathname = usePathname()
  const { t } = useI18n()
  const year = new Date().getFullYear()
  const email = CONTACT_OPTIONS.find((option) => option.id === "email")
  const linkedin = CONTACT_OPTIONS.find((option) => option.id === "linkedin")
  const github = CONTACT_OPTIONS.find((option) => option.id === "github")
  const phone = CONTACT_OPTIONS.find((option) => option.id === "phone")

  if (!isSectionPath(pathname)) {
    return null
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">{SITE_NAME}</p>
          <p>{AUTHOR_LOCATION}</p>
        </div>
        <ul className="site-footer__links">
          {email ? (
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
          ) : null}
          {phone ? (
            <li>
              <a href={phone.href}>{phone.description}</a>
            </li>
          ) : null}
          {linkedin ? (
            <li>
              <a href={linkedin.href} target="_blank" rel="noopener noreferrer">
                {t.contact.options.linkedin.title}
              </a>
            </li>
          ) : null}
          {github ? (
            <li>
              <a href={github.href} target="_blank" rel="noopener noreferrer">
                {t.contact.options.github.title}
              </a>
            </li>
          ) : null}
        </ul>
        <div className="site-footer__copy">
          <p>
            © {year} {COPYRIGHT_NAME}
          </p>
          <LanguageSwitch className="language-switch language-switch--footer" />
        </div>
        <p className="site-footer__note">
          <TypeCopy text={t.footer.systemOnline} />
          <StatusDot pulse />
        </p>
      </div>
    </footer>
  )
}

export default Footer
