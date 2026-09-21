import Image from "next/image"
import Link from "next/link"

const TechBadge = ({
  name,
  icon,
  href
}: {
  name: string
  icon?: string
  href?: string
}) => {
  const content = (
    <>
      {icon ? (
        <Image src={icon} alt="" width={16} height={16} loading="lazy" decoding="async" aria-hidden="true" />
      ) : null}
      <span>{name}</span>
    </>
  )

  if (href) {
    return (
      <Link className="ui-tech-badge" href={href}>
        {content}
      </Link>
    )
  }

  return <span className="ui-tech-badge">{content}</span>
}

export default TechBadge
