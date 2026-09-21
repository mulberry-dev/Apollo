export const HOME_CHROME_REVEALED_EVENT = "site:home-chrome-revealed"
export const HOME_NAV_WAIT_CLASS = "home-nav-wait"

let hasLeftHome = false
let navIntroPlayed = false
let homeChromeRevealed = false

export const markLeftHome = () => {
  hasLeftHome = true
}

export const syncHomeNavWaitClass = (hidden: boolean) => {
  if (typeof document === "undefined") {
    return
  }

  document.documentElement.classList.toggle(HOME_NAV_WAIT_CLASS, hidden)
}

export const didLeaveHome = () => hasLeftHome

export const shouldPlayNavIntro = () => {
  if (navIntroPlayed) {
    return false
  }

  navIntroPlayed = true
  return true
}

export const isHomeChromeRevealed = () => homeChromeRevealed

export const markHomeChromeRevealed = () => {
  homeChromeRevealed = true
}

export const shouldRevealHomeChrome = () =>
  homeChromeRevealed || hasLeftHome
