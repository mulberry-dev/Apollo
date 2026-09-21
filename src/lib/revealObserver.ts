type RevealHandler = () => void

const handlers = new WeakMap<Element, RevealHandler>()

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: [0, 0.12],
  rootMargin: "0px 0px -5% 0px"
}

let observer: IntersectionObserver | null = null

const getObserver = () => {
  if (observer) {
    return observer
  }

  if (typeof IntersectionObserver === "undefined") {
    return null
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return
      }

      const reveal = handlers.get(entry.target)

      if (reveal) {
        reveal()
        handlers.delete(entry.target)
      }

      observer?.unobserve(entry.target)
    })
  }, OBSERVER_OPTIONS)

  return observer
}

export const observeReveal = (node: Element, onReveal: RevealHandler) => {
  const shared = getObserver()

  if (!shared) {
    onReveal()
    return () => {}
  }

  handlers.set(node, onReveal)
  shared.observe(node)

  return () => {
    handlers.delete(node)
    shared.unobserve(node)
  }
}
