import Link from "next/link"
import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode
} from "react"

type Variant = "primary" | "secondary" | "terminal"

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  href?: string
  className?: string
  external?: boolean
  loading?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">

const Button = ({
  children,
  variant = "primary",
  href,
  className = "",
  external,
  loading = false,
  disabled,
  type = "button",
  onClick,
  ...props
}: ButtonProps) => {
  const classes = [
    "ui-button",
    `ui-button--${variant}`,
    loading ? "ui-button--loading" : "",
    className
  ]
    .filter(Boolean)
    .join(" ")

  if (href) {
    const isInternal = href.startsWith("/")

    if (!isInternal) {
      return (
        <a
          className={classes}
          href={href}
          onClick={onClick}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      )
    }

    return (
      <Link className={classes} href={href} scroll={false} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
      {...props}
    >
      {loading ? <span className="ui-button__spinner" aria-hidden="true" /> : null}
      <span className="ui-button__label">{children}</span>
    </button>
  )
}

export default Button
