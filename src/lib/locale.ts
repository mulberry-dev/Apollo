export const LOCALES = ["en", "es"] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "en"
export const LOCALE_PREFIX = "es"
export const LOCALE_STORAGE_KEY = "mulberry-locale"

export const isLocale = (value: string | null | undefined): value is Locale =>
  value === "en" || value === "es"

export const writeStoredLocale = (locale: Locale) => {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // Ignore quota errors and private-mode blocks.
  }
}

export const detectBrowserLocale = (language: string | undefined): Locale => {
  const code = (language ?? "").toLowerCase().replace("_", "-")
  return code === "es" || code.startsWith("es-") ? "es" : DEFAULT_LOCALE
}

export const LOCALE_BOOTSTRAP_SCRIPT = `(function(){var k=${JSON.stringify(LOCALE_STORAGE_KEY)};var p=location.pathname;var isEs=p==="/es"||p.indexOf("/es/")===0;var current=isEs?"es":"en";var stored=null;try{stored=localStorage.getItem(k)}catch(e){}function toPath(l){if(l==="es")return p==="/"||p===""?"/es":isEs?p:"/es"+p;if(p==="/es"||p==="/es/")return "/";return isEs?(p.slice(3)||"/"):p}if(stored==="en"||stored==="es"){if(stored!==current){location.replace(toPath(stored)+location.search+location.hash);return}current=stored}else{var bot=/bot|crawl|spider|slurp|bingpreview|facebookexternalhit/i.test(navigator.userAgent||"");if(!bot){var lang=(navigator.languages&&navigator.languages.length?navigator.languages[0]:navigator.language)||"";var code=String(lang).toLowerCase().replace("_","-");current=code==="es"||code.indexOf("es-")===0?"es":"en";if(current!==(isEs?"es":"en")){try{localStorage.setItem(k,current)}catch(e){}location.replace(toPath(current)+location.search+location.hash);return}}}try{localStorage.setItem(k,current)}catch(e){}document.documentElement.lang=current;if(p==="/"||p===""||p==="/es"||p==="/es/")document.documentElement.classList.add("home-nav-wait")})()`

export const getLocale = (pathname: string): Locale => {
  const first = pathname.split("/").filter(Boolean)[0]
  return first === LOCALE_PREFIX ? "es" : DEFAULT_LOCALE
}

export const stripLocale = (pathname: string): string => {
  if (pathname === `/${LOCALE_PREFIX}` || pathname === `/${LOCALE_PREFIX}/`) {
    return "/"
  }

  if (pathname.startsWith(`/${LOCALE_PREFIX}/`)) {
    const stripped = pathname.slice(LOCALE_PREFIX.length + 1)
    return stripped.startsWith("/") ? stripped : `/${stripped}`
  }

  return pathname || "/"
}

export const localizePath = (path: string, locale: Locale): string => {
  const normalized = path.startsWith("/") ? path : `/${path}`

  if (locale === DEFAULT_LOCALE) {
    return normalized
  }

  return normalized === "/" ? `/${LOCALE_PREFIX}` : `/${LOCALE_PREFIX}${normalized}`
}

export const isHomePath = (pathname: string) => stripLocale(pathname) === "/"

export const isLocaleOnlyPathChange = (from: string, to: string) =>
  stripLocale(from) === stripLocale(to) && getLocale(from) !== getLocale(to)

export const localeHrefLang = (locale: Locale) => (locale === "es" ? "es" : "en")

export const ogLocale = (locale: Locale) => (locale === "es" ? "es_MX" : "en_US")
