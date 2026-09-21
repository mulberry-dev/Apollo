import { isLocale, type Locale } from "@/lib/locale"

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 120,
  emailMax: 254,
  companyMax: 120,
  projectMin: 12,
  projectMax: 4000
} as const

export type ContactLead = {
  name: string
  email: string
  company: string
  project: string
  locale: Locale
  submittedAt: string
}

export type ContactField = "name" | "email" | "company" | "project"

export type ContactFieldValues = Record<ContactField, string>

export type ContactFieldErrors = Partial<Record<ContactField, string>>

const asContactString = (value: unknown) =>
  typeof value === "string" ? value : ""

const resolveSubmittedAt = (value: unknown) => {
  if (typeof value !== "string" || value.length > 40) {
    return new Date().toISOString()
  }
  const parsed = Date.parse(value)
  if (Number.isNaN(parsed)) {
    return new Date().toISOString()
  }
  return new Date(parsed).toISOString()
}

const errorForName = (value: string) => {
  if (!value) return "name_required"
  if (value.length < CONTACT_LIMITS.nameMin) return "name_short"
  if (value.length > CONTACT_LIMITS.nameMax) return "name_long"
  return null
}

const errorForEmail = (value: string) => {
  const email = value.toLowerCase()
  if (!email) return "email_required"
  if (email.length > CONTACT_LIMITS.emailMax) return "email_long"
  if (!EMAIL_PATTERN.test(email)) return "email_invalid"
  return null
}

const errorForCompany = (value: string) =>
  value.length > CONTACT_LIMITS.companyMax ? "company_long" : null

const errorForProject = (value: string) => {
  if (!value) return "project_required"
  if (value.length < CONTACT_LIMITS.projectMin) return "project_short"
  if (value.length > CONTACT_LIMITS.projectMax) return "project_long"
  return null
}

export const getContactFieldError = (
  field: ContactField,
  raw: string
): string | null => {
  const value = raw.trim()
  if (field === "name") return errorForName(value)
  if (field === "email") return errorForEmail(value)
  if (field === "company") return errorForCompany(value)
  return errorForProject(value)
}

export const getContactFieldErrors = (
  values: ContactFieldValues
): ContactFieldErrors => {
  const errors: ContactFieldErrors = {}
  const fields: ContactField[] = ["name", "email", "company", "project"]

  for (const field of fields) {
    const error = getContactFieldError(field, values[field])
    if (error) errors[field] = error
  }

  return errors
}

export const FIELD_ERROR_TO_FIELD: Record<string, ContactField> = {
  invalid_name: "name",
  name_required: "name",
  name_short: "name",
  name_long: "name",
  invalid_email: "email",
  email_required: "email",
  email_invalid: "email",
  email_long: "email",
  invalid_company: "company",
  company_long: "company",
  invalid_project: "project",
  project_required: "project",
  project_short: "project",
  project_long: "project"
}

export const validateContact = (
  raw: unknown
): { ok: true; data: ContactLead } | { ok: false; error: string } => {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "invalid_payload" }
  }

  const body = raw as Record<string, unknown>
  const name = asContactString(body.name)
  const email = asContactString(body.email)
  const company = asContactString(body.company)
  const project = asContactString(body.project)
  const localeRaw = asContactString(body.locale).trim()
  const locale: Locale = isLocale(localeRaw) ? localeRaw : "en"
  const submittedAt = resolveSubmittedAt(body.submittedAt)

  const fieldErrors = getContactFieldErrors({ name, email, company, project })
  const firstError = fieldErrors.name
    || fieldErrors.email
    || fieldErrors.company
    || fieldErrors.project

  if (firstError) {
    return { ok: false, error: firstError }
  }

  return {
    ok: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      project: project.trim(),
      locale,
      submittedAt
    }
  }
}
