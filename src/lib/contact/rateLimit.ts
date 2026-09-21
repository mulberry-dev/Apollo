/**
 * Best-effort in-memory rate limiter for contact submissions.
 * On Vercel each isolate has its own map (still useful against burst spam).
 */

const WINDOW_MS = 15 * 60 * 1000
const MAX_HITS = 8

const hitsByKey = new Map<string, number[]>()

export const checkRateLimit = (key: string) => {
  const now = Date.now()
  const prior = (hitsByKey.get(key) || []).filter(ts => now - ts < WINDOW_MS)

  if (prior.length >= MAX_HITS) {
    const oldest = prior[0]
    const retryAfterSec = Math.max(
      1,
      Math.ceil((WINDOW_MS - (now - oldest)) / 1000)
    )
    hitsByKey.set(key, prior)
    return { allowed: false as const, retryAfterSec }
  }

  prior.push(now)
  hitsByKey.set(key, prior)
  return { allowed: true as const }
}
