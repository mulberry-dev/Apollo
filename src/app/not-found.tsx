import "@/styles/scss/components/_login.scss"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import IconBox from "@/components/ui/IconBox"
import Reveal from "@/components/ui/Reveal"
import SiteIcon from "@/components/ui/SiteIcon"
import { getMessages } from "@/i18n"
import { isLocale, localizePath } from "@/lib/locale"
import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const headerLocale = headers().get("x-locale")
  const locale = isLocale(headerLocale) ? headerLocale : "en"
  const t = getMessages(locale)

  return {
    title: t.notFound.title,
    description: t.notFound.body,
    robots: {
      index: false,
      follow: false
    },
    twitter: {
      title: t.notFound.title,
      description: t.notFound.body
    }
  }
}

export default function NotFound() {
  const headerLocale = headers().get("x-locale")
  const locale = isLocale(headerLocale) ? headerLocale : "en"
  const t = getMessages(locale)

  return (
    <section className="not-found-page">
      <Container className="auth-page auth-page--missing">
        <Reveal type="card" mode="fold">
        <Card className="auth-card">
          <div className="not-found-card__icon" aria-hidden="true">
            <IconBox round tone="purple">
              <SiteIcon name="compass" />
            </IconBox>
          </div>
          <div className="not-found-card__copy">
            <h1>{t.notFound.heading}</h1>
            <p>{t.notFound.body}</p>
          </div>
          <div className="not-found-card__actions">
            <Button href={localizePath("/", locale)}>{t.notFound.back}</Button>
          </div>
        </Card>
        </Reveal>
      </Container>
    </section>
  )
}
