/**
 * Lightweight anti-spam checks for the contact form.
 * Honeypot + minimum fill time — silent "success" for bots so they get no signal.
 */

export const MIN_SUBMIT_MS = 300

/**
 * True when a honeypot field was filled (bots often auto-complete hidden inputs).
 */
export const isHoneypotTriggered = (raw: unknown) => {
  if (!raw || typeof raw !== "object") return false
  const body = raw as Record<string, unknown>
  return String(body.website ?? "").trim().length > 0
}

/**
 * True when the client claims an unrealistically fast submit.
 * Missing/invalid timestamps are ignored (retries / older clients).
 */
export const isTooFastSubmission = (raw: unknown) => {
  if (!raw || typeof raw !== "object") return false
  const body = raw as Record<string, unknown>
  const openedAt = body.formOpenedAt
  if (typeof openedAt !== "string" || !openedAt) return false

  const opened = Date.parse(openedAt)
  if (Number.isNaN(opened)) return false

  const elapsed = Date.now() - opened
  if (elapsed < 0) return false
  return elapsed < MIN_SUBMIT_MS
}
