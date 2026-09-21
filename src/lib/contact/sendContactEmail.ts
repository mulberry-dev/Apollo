import { CONTACT_EMAIL, SITE_NAME } from "@/data/site"
import { buildContactMail } from "@/lib/contact/contactEmail"
import type { ContactLead } from "@/lib/contact/validateContact"

/**
 * Sends contact emails via Resend's HTTP API.
 * Secrets stay on the server — never use NEXT_PUBLIC_* for API keys.
 */
export const sendContactEmail = async (lead: ContactLead) => {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const recipient =
    process.env.CONTACT_RECIPIENT_EMAIL?.trim() || CONTACT_EMAIL
  const from =
    process.env.EMAIL_FROM?.trim() || `${SITE_NAME} <onboarding@resend.dev>`

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured")
    return { ok: false as const, error: "email_not_configured" }
  }
  if (!recipient) {
    console.error("[contact] CONTACT_RECIPIENT_EMAIL is not configured")
    return { ok: false as const, error: "email_not_configured" }
  }

  const owner = buildContactMail("owner", lead)
  const ownerResult = await postResend({
    apiKey,
    from,
    to: recipient,
    replyTo: lead.email,
    subject: owner.subject,
    html: owner.html,
    text: owner.text
  })

  if (!ownerResult.ok) {
    return ownerResult
  }

  const visitor = buildContactMail("visitor", lead)
  const visitorResult = await postResend({
    apiKey,
    from,
    to: lead.email,
    replyTo: CONTACT_EMAIL,
    subject: visitor.subject,
    html: visitor.html,
    text: visitor.text
  })

  if (!visitorResult.ok) {
    console.error(
      "[contact] visitor confirmation skipped",
      visitorResult.error
    )
  }

  return {
    ok: true as const,
    id: ownerResult.id,
    confirmationSent: visitorResult.ok
  }
}

const postResend = async ({
  apiKey,
  from,
  to,
  replyTo,
  subject,
  html,
  text
}: {
  apiKey: string
  from: string
  to: string
  replyTo: string
  subject: string
  html: string
  text: string
}) => {
  let response: Response
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: replyTo,
        subject,
        html,
        text
      })
    })
  } catch (err) {
    console.error("[contact] Resend network error", err)
    return { ok: false as const, error: "email_send_failed" }
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "")
    console.error("[contact] Resend error", response.status, detail)
    return { ok: false as const, error: "email_send_failed" }
  }

  const payload = (await response.json().catch(() => ({}))) as { id?: string }
  return { ok: true as const, id: payload.id }
}
