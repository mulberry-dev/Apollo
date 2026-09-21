"use client"

import "@/styles/scss/sections/contact.scss"
import Button from "@/components/ui/Button"
import CommandLine from "@/components/terminal/CommandLine"
import TypeCopy from "@/components/terminal/TypeCopy"
import Container from "@/components/ui/Container"
import Reveal, { RevealGroup } from "@/components/ui/Reveal"
import SiteIcon from "@/components/ui/SiteIcon"
import StatusDot from "@/components/terminal/StatusDot"
import WorkspaceHeader from "@/components/terminal/WorkspaceHeader"
import { CONTACT_OPTIONS } from "@/data/contact"
import { WORKSPACE } from "@/data/workspace"
import { useI18n } from "@/i18n/useI18n"
import type { Messages } from "@/i18n/types"
import { contactMailtoHref, sendContactMails } from "@/lib/contactMail"
import {
  CONTACT_LIMITS,
  FIELD_ERROR_TO_FIELD,
  getContactFieldError,
  getContactFieldErrors,
  type ContactField,
  type ContactFieldErrors
} from "@/lib/contact/validateContact"
import { padCount } from "@/lib/projects"
import { FormEvent, useRef, useState } from "react"

type FormStatus = "idle" | "sending" | "success" | "partial" | "error" | "rateLimited"

const FIELD_ORDER: ContactField[] = ["name", "email", "company", "project"]

const fieldErrorCopy = (
  errors: {
    nameRequired: string
    nameShort: string
    nameLong: string
    emailRequired: string
    emailInvalid: string
    emailLong: string
    companyLong: string
    projectRequired: string
    projectShort: string
    projectLong: string
  },
  fallback: string,
  code: string | undefined
) => {
  if (!code) return ""
  const map: Record<string, string> = {
    name_required: errors.nameRequired,
    name_short: errors.nameShort,
    name_long: errors.nameLong,
    email_required: errors.emailRequired,
    email_invalid: errors.emailInvalid,
    email_long: errors.emailLong,
    company_long: errors.companyLong,
    project_required: errors.projectRequired,
    project_short: errors.projectShort,
    project_long: errors.projectLong
  }
  return map[code] || fallback
}

const optionCopy = (options: Messages["contact"]["options"], id: string) => {
  if (id === "email") return options.email
  if (id === "phone") return options.phone
  if (id === "linkedin") return options.linkedin
  if (id === "github") return options.github
  if (id === "call") return options.call
  return options.email
}

const Contact = () => {
  const { t, locale } = useI18n()
  const [active, setActive] = useState(CONTACT_OPTIONS[0]?.id ?? "")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [project, setProject] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({})
  const formOpenedAtRef = useRef(new Date().toISOString())
  const selected =
    CONTACT_OPTIONS.find(option => option.id === active) ?? CONTACT_OPTIONS[0]
  const fieldMessage = (code: string | undefined) =>
    fieldErrorCopy(t.contact.form.errors, t.contact.form.error, code)

  const values = { name, email, company, project }

  const setFieldValue = (field: ContactField, value: string) => {
    if (field === "name") setName(value)
    if (field === "email") setEmail(value)
    if (field === "company") setCompany(value)
    if (field === "project") setProject(value)
    setFieldErrors(current => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
    if (status === "error" || status === "partial" || status === "rateLimited") {
      setStatus("idle")
    }
  }

  const showFieldError = (field: ContactField, raw: string) => {
    const error = getContactFieldError(field, raw)
    setFieldErrors(current => {
      if (!error) {
        if (!current[field]) return current
        const next = { ...current }
        delete next[field]
        return next
      }
      return { ...current, [field]: error }
    })
  }

  const focusField = (field: ContactField) => {
    document.getElementById(`contact-${field}`)?.focus()
  }

  const resetForm = () => {
    setName("")
    setEmail("")
    setCompany("")
    setProject("")
    setHoneypot("")
    formOpenedAtRef.current = new Date().toISOString()
  }

  const applySendResult = (
    result: Awaited<ReturnType<typeof sendContactMails>>,
    payload: Parameters<typeof contactMailtoHref>[0]
  ) => {
    if (result === "fallback") {
      window.location.assign(contactMailtoHref(payload))
      setStatus("idle")
      return
    }
    if (result === "rate_limited") {
      setStatus("rateLimited")
      return
    }
    if (typeof result === "object") {
      const field = FIELD_ERROR_TO_FIELD[result.error]
      if (field) {
        setFieldErrors({ [field]: result.error })
        focusField(field)
        setStatus("idle")
        return
      }
      setStatus("error")
      return
    }
    if (result === "partial") {
      setStatus("partial")
      resetForm()
      return
    }
    if (result === "sent") {
      setStatus("success")
      resetForm()
      return
    }
    setStatus("error")
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      project: project.trim(),
      locale,
      website: honeypot,
      formOpenedAt: formOpenedAtRef.current
    }

    const errors = getContactFieldErrors(values)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setStatus("idle")
      const firstInvalid = FIELD_ORDER.find(field => errors[field])
      if (firstInvalid) focusField(firstInvalid)
      return
    }

    setStatus("sending")
    setFieldErrors({})

    try {
      applySendResult(await sendContactMails(payload), payload)
    } catch {
      setStatus("error")
    }
  }

  return (
    <section
      id="contact"
      data-section-path="/contact"
      aria-label={t.contact.ariaLabel}
      tabIndex={-1}
    >
      <Container className="contact-page">
        <WorkspaceHeader
          index={WORKSPACE.contact.index}
          path={WORKSPACE.contact.path}
          title={t.workspace.contact}
        />

        <div className="contact-stage">
          <RevealGroup className="contact-monument" mode="auto" stagger={48}>
            <Reveal type="heading" as="h2" className="contact-headline">
              <TypeCopy text={t.contact.headline} />
            </Reveal>
            <Reveal type="text" className="contact-monument__status">
              <p>
                <span className="contact-log__prefix">&gt;</span>{" "}
                <TypeCopy text={t.contact.statusPrefix} />{" "}
                <span className="contact-log__ok">
                  <StatusDot pulse />
                  <TypeCopy text={t.contact.availability} />
                </span>
              </p>
              <p className="contact-monument__note">
                <TypeCopy text={t.contact.supporting} />
              </p>
            </Reveal>
          </RevealGroup>

          <div className="contact-workspace">
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="contact-hp" aria-hidden="true">
                <input
                  type="text"
                  name="contact_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={event => setHoneypot(event.target.value)}
                />
              </div>
              <label
                className={`contact-field${fieldErrors.name ? " is-invalid" : ""}`}
                htmlFor="contact-name"
              >
                <span>{t.contact.form.name}</span>
                <input
                  id="contact-name"
                  type="text"
                  name="from_name"
                  autoComplete="name"
                  required
                  minLength={CONTACT_LIMITS.nameMin}
                  maxLength={CONTACT_LIMITS.nameMax}
                  value={name}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                  onChange={event => setFieldValue("name", event.target.value)}
                  onBlur={event => showFieldError("name", event.target.value)}
                />
                {fieldErrors.name ? (
                  <span className="contact-field__error" id="contact-name-error" role="alert">
                    {fieldMessage(fieldErrors.name)}
                  </span>
                ) : null}
              </label>
              <label
                className={`contact-field${fieldErrors.email ? " is-invalid" : ""}`}
                htmlFor="contact-email"
              >
                <span>{t.contact.form.email}</span>
                <input
                  id="contact-email"
                  type="email"
                  name="user_email"
                  autoComplete="email"
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  required
                  maxLength={CONTACT_LIMITS.emailMax}
                  value={email}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                  onChange={event => setFieldValue("email", event.target.value)}
                  onBlur={event => showFieldError("email", event.target.value)}
                />
                {fieldErrors.email ? (
                  <span className="contact-field__error" id="contact-email-error" role="alert">
                    {fieldMessage(fieldErrors.email)}
                  </span>
                ) : null}
              </label>
              <label
                className={`contact-field${fieldErrors.company ? " is-invalid" : ""}`}
                htmlFor="contact-company"
              >
                <span>
                  {t.contact.form.company}{" "}
                  <em>({t.contact.form.companyOptional})</em>
                </span>
                <input
                  id="contact-company"
                  type="text"
                  name="user_company"
                  autoComplete="organization"
                  maxLength={CONTACT_LIMITS.companyMax}
                  value={company}
                  aria-invalid={Boolean(fieldErrors.company)}
                  aria-describedby={
                    fieldErrors.company ? "contact-company-error" : undefined
                  }
                  onChange={event => setFieldValue("company", event.target.value)}
                  onBlur={event => showFieldError("company", event.target.value)}
                />
                {fieldErrors.company ? (
                  <span className="contact-field__error" id="contact-company-error" role="alert">
                    {fieldMessage(fieldErrors.company)}
                  </span>
                ) : null}
              </label>
              <label
                className={`contact-field contact-field--area${fieldErrors.project ? " is-invalid" : ""}`}
                htmlFor="contact-project"
              >
                <span>{t.contact.form.project}</span>
                <textarea
                  id="contact-project"
                  name="message"
                  required
                  rows={5}
                  minLength={CONTACT_LIMITS.projectMin}
                  maxLength={CONTACT_LIMITS.projectMax}
                  value={project}
                  aria-invalid={Boolean(fieldErrors.project)}
                  aria-describedby={
                    fieldErrors.project ? "contact-project-error" : undefined
                  }
                  onChange={event => setFieldValue("project", event.target.value)}
                  onBlur={event => showFieldError("project", event.target.value)}
                />
                {fieldErrors.project ? (
                  <span className="contact-field__error" id="contact-project-error" role="alert">
                    {fieldMessage(fieldErrors.project)}
                  </span>
                ) : null}
              </label>
              <p className="contact-form__next">
                <TypeCopy text={t.contact.form.next} />
              </p>
              {status === "success" ? (
                <output className="contact-form__status is-ok">
                  {t.contact.form.success}
                </output>
              ) : null}
              {status === "partial" ? (
                <output className="contact-form__status is-warn">
                  {t.contact.form.partial}
                </output>
              ) : null}
              {status === "error" ? (
                <p className="contact-form__status is-error" role="alert">
                  {t.contact.form.error}
                </p>
              ) : null}
              {status === "rateLimited" ? (
                <p className="contact-form__status is-error" role="alert">
                  {t.contact.form.rateLimited}
                </p>
              ) : null}
              <Button type="submit" variant="terminal" loading={status === "sending"}>
                <TypeCopy
                  text={
                    status === "sending"
                      ? t.contact.form.sending
                      : t.contact.form.submit
                  }
                  caret={false}
                />
              </Button>
            </form>

            <div className="contact-aside">
              <RevealGroup className="contact-log" mode="auto" stagger={48}>
                <CommandLine command={t.contact.command} />
                <p>
                  <span className="contact-log__prefix">&gt;</span>{" "}
                  <TypeCopy text={t.contact.checking} />
                </p>
                <p>
                  <span className="contact-log__prefix">&gt;</span>{" "}
                  <TypeCopy text={t.contact.statusPrefix} />{" "}
                  <span className="contact-log__ok">
                    <StatusDot pulse />
                    <TypeCopy text={t.contact.availability} />
                  </span>
                </p>
                <p>
                  <span className="contact-log__prefix">&gt;</span>{" "}
                  <TypeCopy text={t.contact.supporting} />
                </p>
              </RevealGroup>

              <div className="contact-channels">
                <h3>
                  <TypeCopy text={t.contact.selectChannel} />
                </h3>
                <ul>
                  {CONTACT_OPTIONS.map((option, index) => {
                    const copy = optionCopy(t.contact.options, option.id)

                    return (
                    <li key={option.id}>
                      <a
                        className={`contact-channel${option.id === selected?.id ? " is-active" : ""}`}
                        href={option.href}
                        {...(option.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        onFocus={() => setActive(option.id)}
                        onMouseEnter={() => setActive(option.id)}
                      >
                        <span className="contact-channel__index">
                          {padCount(index + 1)}
                        </span>
                        <span className="contact-channel__icon" aria-hidden="true">
                          <SiteIcon name={option.icon} />
                        </span>
                        <span className="contact-channel__copy">
                          <strong>
                            <TypeCopy text={copy.title} />
                          </strong>
                          {copy.description ? (
                            <TypeCopy text={copy.description} />
                          ) : null}
                        </span>
                        {option.external ? (
                          <span className="sr-only"> {t.contact.opensTab}</span>
                        ) : null}
                      </a>
                    </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Contact
