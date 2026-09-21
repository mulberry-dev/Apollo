type ScrollLockSnapshot = {
  htmlOverflow: string
  bodyOverflow: string
  htmlOverscroll: string
  bodyOverscroll: string
  bodyPaddingRight: string
}

let snapshot: ScrollLockSnapshot | null = null
let lockCount = 0

export const lockBodyScroll = () => {
  lockCount += 1

  if (snapshot) {
    return
  }

  const html = document.documentElement
  const { body } = document
  const scrollbar = window.innerWidth - html.clientWidth

  snapshot = {
    htmlOverflow: html.style.overflow,
    bodyOverflow: body.style.overflow,
    htmlOverscroll: html.style.overscrollBehavior,
    bodyOverscroll: body.style.overscrollBehavior,
    bodyPaddingRight: body.style.paddingRight
  }

  html.style.overflow = "hidden"
  body.style.overflow = "hidden"
  html.style.overscrollBehavior = "none"
  body.style.overscrollBehavior = "none"

  if (scrollbar > 0) {
    body.style.paddingRight = `${scrollbar}px`
  }
}

export const unlockBodyScroll = () => {
  lockCount = Math.max(0, lockCount - 1)

  if (lockCount > 0 || !snapshot) {
    return
  }

  const html = document.documentElement
  const { body } = document

  html.style.overflow = snapshot.htmlOverflow
  body.style.overflow = snapshot.bodyOverflow
  html.style.overscrollBehavior = snapshot.htmlOverscroll
  body.style.overscrollBehavior = snapshot.bodyOverscroll
  body.style.paddingRight = snapshot.bodyPaddingRight
  snapshot = null
}
