"use client"

import { ABOUT_NAME } from "@/data/about"
import { useI18n } from "@/i18n/useI18n"
import Image from "next/image"

const AboutPortrait = () => {
  const { t } = useI18n()

  return (
    <div className="about-portrait">
      <Image
        src="/images/about/mexico-map.png"
        alt=""
        width={1024}
        height={682}
        unoptimized
        loading="lazy"
        decoding="async"
        className="about-portrait__map"
        aria-hidden="true"
      />
      <Image
        src="/images/Webp/about-me.webp"
        alt={`${ABOUT_NAME}, ${t.site.role}, ${t.site.location}`}
        width={1254}
        height={1254}
        unoptimized
        loading="lazy"
        decoding="async"
        className="about-portrait__img"
      />
    </div>
  )
}

export default AboutPortrait
