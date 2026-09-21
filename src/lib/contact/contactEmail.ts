import {
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL
} from "@/data/site"
import { getMessages } from "@/i18n"
import type { Locale } from "@/lib/locale"
import type { ContactLead } from "@/lib/contact/validateContact"

type MailRole = "visitor" | "owner"

const C = {
  canvasDeep: "#0a1224",
  canvas: "#0f172a",
  surface: "#151d2e",
  elevated: "#1b2438",
  border: "#2a3548",
  cyan: "#20e0d2",
  blue: "#3d7bff",
  purple: "#ab55f7",
  teal: "#17c3b2",
  text: "#f8fafc",
  secondary: "#cbd5e1",
  muted: "#94a3b8",
  dim: "#8b9cb3",
  slate: "#475569"
} as const

const FONT_SANS = "'Segoe UI','Helvetica Neue',Arial,sans-serif"
const FONT_MONO =
  "'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace"

const interpolate = (template: string, vars: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "")

const escapeHtml = (value: string) =>
  String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")

const textBlock = (value: string) =>
  escapeHtml(value).replace(/\r\n|\r|\n/g, "<br />")

const formatReceivedAt = (iso: string, locale: Locale) => {
  try {
    return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/Mexico_City"
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

const VALUE_CELL = `padding:14px 16px;font-family:${FONT_SANS};font-size:15px;line-height:1.55;color:${C.text};background-color:${C.surface};border:1px solid ${C.border};border-left:3px solid ${C.cyan};word-break:break-word;overflow-wrap:anywhere;`

const fieldRow = (label: string, valueHtml: string) => {
  if (!valueHtml) return ""

  return `
    <tr>
      <td style="padding:0 0 16px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
          <tr>
            <td style="padding:0 0 6px 0;font-family:${FONT_MONO};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.teal};">
              ${escapeHtml(label)}
            </td>
          </tr>
          <tr>
            <td style="${VALUE_CELL}">
              ${valueHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>`
}

const brandRail = () => `
  <tr>
    <td style="padding:0;font-size:0;line-height:0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td width="33%" height="4" style="height:4px;line-height:4px;font-size:0;background-color:${C.cyan};">&nbsp;</td>
          <td width="34%" height="4" style="height:4px;line-height:4px;font-size:0;background-color:${C.blue};">&nbsp;</td>
          <td width="33%" height="4" style="height:4px;line-height:4px;font-size:0;background-color:${C.purple};">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>`

const logoUrl = () =>
  (
    process.env.EMAIL_LOGO_URL || `${SITE_URL}${SITE_LOGO}`
  ).replace(/\/$/, "")

export const buildContactMail = (role: MailRole, lead: ContactLead) => {
  const t = getMessages(lead.locale).contact.mail
  const vars = {
    name: lead.name,
    email: lead.email,
    locale: t.localeName,
    when: formatReceivedAt(lead.submittedAt, lead.locale)
  }
  const copy = role === "visitor" ? t.visitor : t.owner
  const homeHref = lead.locale === "es" ? `${SITE_URL}/es` : SITE_URL
  const siteHost = SITE_URL.replace(/^https?:\/\//, "")
  const logoSrc = logoUrl()
  const intro = interpolate(copy.intro, vars)
  const headline = copy.headline
  const preheader = interpolate(copy.preheader, vars)
  const subject = interpolate(copy.subject, vars)
  const ctaHref = role === "owner" ? `mailto:${lead.email}` : homeHref
  const ctaLabel =
    role === "owner" ? interpolate(t.owner.replyCta, vars) : t.visitor.cta
  const signoff = role === "visitor" ? t.visitor.signoff : undefined
  const bandCopy =
    role === "owner"
      ? interpolate(t.owner.replyHint, vars)
      : interpolate(t.visitor.band, vars)

  const fieldsHtml = [
    fieldRow(t.fields.name, escapeHtml(lead.name)),
    fieldRow(
      t.fields.email,
      `<a href="mailto:${escapeHtml(lead.email)}" style="color:${C.cyan};text-decoration:underline;word-break:break-all;">${escapeHtml(lead.email)}</a>`
    ),
    lead.company ? fieldRow(t.fields.company, escapeHtml(lead.company)) : "",
    fieldRow(t.fields.project, textBlock(lead.project))
  ].join("")

  const fieldLines = [
    `${t.fields.name}: ${lead.name}`,
    `${t.fields.email}: ${lead.email}`,
    lead.company ? `${t.fields.company}: ${lead.company}` : "",
    `${t.fields.project}:`,
    lead.project
  ].filter(Boolean)

  const html = `<!DOCTYPE html>
<html lang="${lead.locale}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>${escapeHtml(headline)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${C.canvasDeep};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background-color:${C.canvasDeep};">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;max-width:600px;width:100%;background-color:${C.canvas};border:1px solid ${C.border};">
          ${brandRail()}

          <tr>
            <td style="padding:24px 24px 18px 24px;background-color:${C.canvas};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td valign="middle" style="padding:0 14px 0 0;width:48px;">
                    <a href="${homeHref}" style="text-decoration:none;">
                      <img src="${escapeHtml(logoSrc)}" width="40" height="40" alt="${escapeHtml(SITE_NAME)}" style="display:block;border:0;outline:none;text-decoration:none;width:40px;height:40px;max-width:40px;border-radius:10px;background-color:#000000;" />
                    </a>
                  </td>
                  <td valign="middle">
                    <div style="font-family:${FONT_SANS};font-size:16px;line-height:1.2;color:${C.text};font-weight:700;letter-spacing:-0.02em;">
                      ${escapeHtml(SITE_NAME)}
                    </div>
                    <div style="font-family:${FONT_MONO};font-size:12px;color:${C.cyan};padding-top:4px;">
                      santiago@dev · ${escapeHtml(t.path)}
                    </div>
                  </td>
                  <td valign="middle" align="right" style="font-family:${FONT_MONO};font-size:11px;line-height:1.4;color:${C.dim};padding-left:12px;letter-spacing:0.08em;text-transform:uppercase;">
                    ${escapeHtml(t.briefLabel)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 24px;background-color:${C.canvas};">
              <div style="height:1px;line-height:1px;font-size:0;background-color:${C.border};">&nbsp;</div>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 24px 8px 24px;background-color:${C.canvas};">
              <div style="font-family:${FONT_MONO};font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${C.teal};padding-bottom:8px;">
                ● ${escapeHtml(copy.kicker)}
              </div>
              <div style="font-family:${FONT_SANS};font-size:26px;line-height:1.25;color:${C.text};font-weight:800;letter-spacing:-0.03em;">
                ${escapeHtml(headline)}
              </div>
              <div style="font-family:${FONT_SANS};font-size:15px;line-height:1.6;color:${C.secondary};padding-top:10px;">
                ${escapeHtml(intro)}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 24px 4px 24px;background-color:${C.canvasDeep};">
              <div style="font-family:${FONT_MONO};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${C.dim};padding-bottom:14px;">
                ${escapeHtml(copy.copyLabel)}
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                ${fieldsHtml}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:4px 24px 22px 24px;background-color:${C.canvasDeep};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td style="border-top:1px solid ${C.border};padding-top:16px;font-family:${FONT_SANS};font-size:12px;line-height:1.5;color:${C.muted};">
                    ${escapeHtml(interpolate(t.receivedAt, vars))}
                    <br />
                    ${escapeHtml(t.timezone)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            signoff
              ? `<tr>
            <td style="padding:0 24px 8px 24px;background-color:${C.canvasDeep};font-family:${FONT_SANS};font-size:15px;color:${C.muted};">
              — ${escapeHtml(signoff)}
            </td>
          </tr>`
              : ""
          }

          <tr>
            <td style="padding:0;background-color:${C.elevated};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:20px 24px;">
                    <a href="${ctaHref}" style="display:inline-block;padding:12px 20px;background-color:${C.teal};color:${C.canvasDeep};font-family:${FONT_SANS};font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;">${escapeHtml(ctaLabel)}</a>
                    <div style="font-family:${FONT_SANS};font-size:12px;line-height:1.6;color:${C.dim};padding-top:12px;">
                      ${escapeHtml(bandCopy)}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 24px 20px 24px;background-color:${C.canvas};border-top:1px solid ${C.border};">
              <div style="font-family:${FONT_SANS};font-size:13px;line-height:1.6;color:${C.dim};padding-bottom:8px;">
                ${escapeHtml(copy.footer)}
              </div>
              <div style="font-family:${FONT_MONO};font-size:12px;line-height:1.6;">
                <a href="${LINKEDIN_URL}" style="color:${C.cyan};text-decoration:none;">LinkedIn</a>
                <span style="color:${C.slate};"> · </span>
                <a href="${GITHUB_URL}" style="color:${C.cyan};text-decoration:none;">GitHub</a>
                <span style="color:${C.slate};"> · </span>
                <a href="${homeHref}" style="color:${C.cyan};text-decoration:none;">${escapeHtml(siteHost)}</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const text = [
    SITE_NAME,
    `santiago@dev · ${t.path} · ${copy.kicker}`,
    "",
    headline,
    intro,
    "",
    copy.copyLabel,
    ...fieldLines,
    "",
    interpolate(t.receivedAt, vars),
    t.timezone,
    signoff ? `— ${signoff}` : "",
    ctaHref,
    bandCopy,
    copy.footer
  ]
    .filter(line => line !== "")
    .join("\n")

  return { subject, html, text }
}
