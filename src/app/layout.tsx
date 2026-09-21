import DeferredAnalytics from "@/components/DeferredAnalytics"
import Navigation from "@/components/navigation"
import SiteShell from "@/components/SiteShell"
import { ParticlesProvider } from "@/components/particles"
import { getMessages } from "@/i18n"
import LocaleJsonLd from "@/components/LocaleJsonLd"
import {
  AUTHOR_NAME,
  COPYRIGHT_NAME,
  GOOGLE_SITE_VERIFICATION,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TITLE,
  SITE_URL
} from "@/data/site"
import { LOCALE_BOOTSTRAP_SCRIPT } from "@/lib/locale"
import "@/styles/scss/styles.scss"
import { JetBrains_Mono, Sora, Space_Grotesk } from "next/font/google"
import type { Metadata, Viewport } from "next"

const sora = Sora({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-sora",
  display: "swap",
  preload: true,
  adjustFontFallback: true
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-grotesk",
  display: "optional",
  preload: false,
  adjustFontFallback: true
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: true,
  adjustFontFallback: true
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: "/icon.png",
    apple: "/apple-icon.png"
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    alternateLocale: ["es_MX"],
    type: "website",
    images: [SITE_OG_IMAGE]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE.url]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION
  },
  other: {
    copyright: COPYRIGHT_NAME
  }
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const messages = getMessages("en")

  return (
    <html
      lang={messages.htmlLang}
      className={`${sora.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="dark" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: LOCALE_BOOTSTRAP_SCRIPT
          }}
        />
        <LocaleJsonLd />
        <a className="skip-link" href="#site-main">
          {messages.skipToContent}
        </a>
        <div className="site-atmosphere" aria-hidden="true" />
        <ParticlesProvider>
          <Navigation />
          <div className="site-shell">
            <SiteShell>{children}</SiteShell>
          </div>
        </ParticlesProvider>
        <DeferredAnalytics gaId="G-HP85BC1BKY" />
      </body>
    </html>
  )
}
