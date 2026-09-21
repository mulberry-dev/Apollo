import { ReactElement, SVGProps } from "react"

export type SiteIconName =
  | "frontend"
  | "detail"
  | "design"
  | "user"
  | "craft"
  | "ruler"
  | "clarity"
  | "search"
  | "code"
  | "brackets"
  | "bolt"
  | "interface"
  | "app"
  | "systems"
  | "layers"
  | "connect"
  | "route"
  | "modernize"
  | "thinking"
  | "performance"
  | "cube"
  | "shield"
  | "database"
  | "rocket"
  | "swap"
  | "cycle"
  | "gauge"
  | "target"
  | "puzzle"
  | "cursor"
  | "compass"
  | "mail"
  | "calendar"
  | "leaf"
  | "globe"
  | "bulb"
  | "devices"
  | "lock"
  | "storage"
  | "bell"
  | "payment"
  | "gears"
  | "github"
  | "linkedin"
  | "phone"

const iconProps: SVGProps<SVGSVGElement> = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true
}

const ICONS: Record<SiteIconName, ReactElement> = {
  frontend: (
    <svg {...iconProps}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8.5h18" />
      <path d="M7 14h4M7 16.5h7" />
    </svg>
  ),
  detail: (
    <svg {...iconProps}>
      <path d="M12 3.5 14.2 9l5.8.4-4.4 3.8 1.4 5.8L12 16.2 6.9 19l1.4-5.8L4 9.4 9.8 9Z" />
    </svg>
  ),
  design: (
    <svg {...iconProps}>
      <path d="M13.5 4.2 19.8 10.5 10 20.3H3.7v-6.3Z" />
      <path d="M12.2 5.5 18.5 11.8" />
    </svg>
  ),
  user: (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.2c.8-3.2 3.3-5 6.5-5s5.7 1.8 6.5 5" />
    </svg>
  ),
  craft: (
    <svg {...iconProps}>
      <path d="M4 20 14.5 9.5" />
      <path d="M12.8 7.8c1.6-1.6 4.4-1.4 5.7.4 1.2 1.6.8 4.1-.8 5.6L16 15.5" />
      <path d="M8.5 15.2 4 20" />
    </svg>
  ),
  ruler: (
    <svg {...iconProps}>
      <path d="M20.6 14.7a2.1 2.1 0 0 1 0 3l-2.3 2.3a2.1 2.1 0 0 1-3.1 0L3.5 8.5a2.1 2.1 0 0 1 0-3l2.3-2.3a2.1 2.1 0 0 1 3.1 0Z" />
      <path d="m8.1 6.2 1.9-1.9M11.1 9.2 13 7.3M14.1 12.2 16 10.3M17.1 15.2 19 13.3" />
    </svg>
  ),
  clarity: (
    <svg {...iconProps}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16.5 20.2 20.7" />
    </svg>
  ),
  search: (
    <svg {...iconProps}>
      <circle cx="11" cy="11" r="6.25" />
      <path d="M16 16.2 20.4 20.6" />
    </svg>
  ),
  code: (
    <svg {...iconProps}>
      <path d="M8.2 7.2 3.8 12l4.4 4.8" />
      <path d="M15.8 7.2 20.2 12l-4.4 4.8" />
    </svg>
  ),
  brackets: (
    <svg {...iconProps}>
      <path d="M8 6.6 3.6 12 8 17.4" />
      <path d="M16 6.6 20.4 12 16 17.4" />
      <path d="M13.6 6.5 10.4 17.5" />
    </svg>
  ),
  bolt: (
    <svg {...iconProps}>
      <path d="M13 3 5.5 13.5H12L11 21l7.5-10.5H12L13 3Z" />
    </svg>
  ),
  interface: (
    <svg {...iconProps}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8.5h18" />
    </svg>
  ),
  app: (
    <svg {...iconProps}>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M3.5 8.5h17" />
      <path d="M8.8 8.5v11.5" />
    </svg>
  ),
  systems: (
    <svg {...iconProps}>
      <rect x="4" y="3.5" width="16" height="4.5" rx="1" />
      <rect x="4" y="9.75" width="16" height="4.5" rx="1" />
      <rect x="4" y="16" width="16" height="4.5" rx="1" />
    </svg>
  ),
  layers: (
    <svg {...iconProps}>
      <path d="M12 3.6 4.6 7.8 12 12l7.4-4.2L12 3.6Z" />
      <path d="M4.6 12 12 16.2 19.4 12" />
      <path d="M4.6 16.2 12 20.4 19.4 16.2" />
    </svg>
  ),
  connect: (
    <svg {...iconProps}>
      <circle cx="6" cy="12" r="2.25" />
      <circle cx="18" cy="6" r="2.25" />
      <circle cx="18" cy="18" r="2.25" />
      <path d="M8.1 10.7l5.8-3.4" />
      <path d="M8.1 13.3l5.8 3.4" />
    </svg>
  ),
  route: (
    <svg {...iconProps}>
      <circle cx="5.6" cy="16.8" r="2.15" />
      <circle cx="18.4" cy="7.2" r="2.15" />
      <path d="M7.5 15.6c2.4-.4 3.5-2.2 3.5-4.2S12.6 7.8 16.2 7.4" />
    </svg>
  ),
  modernize: (
    <svg {...iconProps}>
      <path d="M3.5 16.5 8 11l3.5 3.5 4.5-7 4.5 3" />
    </svg>
  ),
  thinking: (
    <svg {...iconProps}>
      <circle cx="12" cy="11" r="6" />
      <path d="M12 17v3M9.5 21h5" />
      <path d="M10 10.5h.01M12 10.5h.01M14 10.5h.01" />
    </svg>
  ),
  performance: (
    <svg {...iconProps}>
      <path d="M4 16.5 9 11l3.2 3.2L20 7" />
      <path d="M14.5 7H20v5.5" />
    </svg>
  ),
  cube: (
    <svg {...iconProps}>
      <path d="M12 3.2 20 7.6v8.8L12 20.8 4 16.4V7.6L12 3.2Z" />
      <path d="M12 20.8V12" />
      <path d="M20 7.6 12 12 4 7.6" />
    </svg>
  ),
  shield: (
    <svg {...iconProps}>
      <path d="M12 3.2 5 6.2v5.4c0 4.1 2.9 6.8 7 8.2 4.1-1.4 7-4.1 7-8.2V6.2L12 3.2Z" />
    </svg>
  ),
  database: (
    <svg {...iconProps}>
      <ellipse cx="12" cy="6" rx="7" ry="2.4" />
      <path d="M5 6v4.2c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4V6" />
      <path d="M5 10.2v4.2c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4v-4.2" />
    </svg>
  ),
  rocket: (
    <svg {...iconProps}>
      <path d="M12 3.4c2.6 2.8 4.7 6.8 4.7 10.5 0 1.4-.4 2.5-1.1 3.4H8.4c-.7-.9-1.1-2-1.1-3.4 0-3.7 2.1-7.7 4.7-10.5Z" />
      <circle cx="12" cy="11.2" r="1.45" />
      <path d="M8.6 16.4 6 20.4" />
      <path d="M15.4 16.4 18 20.4" />
    </svg>
  ),
  swap: (
    <svg {...iconProps}>
      <path d="M7 8h12M16 5l3 3-3 3" />
      <path d="M17 16H5M8 13l-3 3 3 3" />
    </svg>
  ),
  cycle: (
    <svg {...iconProps}>
      <path d="M20.2 12A8.2 8.2 0 0 0 12 3.8a8.6 8.6 0 0 0-6.1 2.5L4 8.2" />
      <path d="M4 3.6v5h5" />
      <path d="M3.8 12A8.2 8.2 0 0 0 12 20.2a8.6 8.6 0 0 0 6.1-2.5L20 15.8" />
      <path d="M20 20.4v-5h-5" />
    </svg>
  ),
  gauge: (
    <svg {...iconProps}>
      <path d="M5.2 16.2a8 8 0 1 1 13.6 0" />
      <path d="M12 13.5 16.2 8.8" />
      <circle cx="12" cy="13.5" r="1.1" />
    </svg>
  ),
  target: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1.25" />
    </svg>
  ),
  puzzle: (
    <svg {...iconProps}>
      <path d="M10 3.5h4v2.1a1.7 1.7 0 1 0 1.7 1.7H18.5v4h-2.1a1.7 1.7 0 1 0-1.7 1.7V16H10v-2.3A1.7 1.7 0 1 0 8.3 12H5.5V8H7.8A1.7 1.7 0 1 0 10 6.3V3.5Z" />
    </svg>
  ),
  cursor: (
    <svg {...iconProps}>
      <path d="M8.15 5.2 16.55 13.85l-3.85.55 2.2 5.15-2.05.85-2.2-5.2-3.4 2.55Z" />
    </svg>
  ),
  compass: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.8 8.2-2.2 6.6-6.6 2.2 2.2-6.6 6.6-2.2Z" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  mail: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  ),
  calendar: (
    <svg {...iconProps}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </svg>
  ),
  leaf: (
    <svg {...iconProps}>
      <path d="M5 14c3.8-7.4 9.2-9.2 14.5-9.5-1.2 6.4-4.4 12.4-11.8 13.2C5.2 18 4.2 16 5 14Z" />
      <path d="M8.2 15.2 16.5 7.4" />
    </svg>
  ),
  globe: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M3.6 12h16.8M12 3.6c-2.4 2.6-3.6 5.4-3.6 8.4s1.2 5.8 3.6 8.4M12 3.6c2.4 2.6 3.6 5.4 3.6 8.4s-1.2 5.8-3.6 8.4" />
    </svg>
  ),
  bulb: (
    <svg {...iconProps}>
      <path d="M12 3.4a5.1 5.1 0 0 1 5.1 5.2c0 2.05-1.15 3.5-2.25 4.5-.55.5-.85 1.15-.85 1.9H10c0-.75-.3-1.4-.85-1.9-1.1-1-2.25-2.45-2.25-4.5A5.1 5.1 0 0 1 12 3.4Z" />
      <path d="M9.2 18.15h5.6M10.25 20.4h3.5" />
    </svg>
  ),
  devices: (
    <svg {...iconProps}>
      <rect x="2.5" y="4.5" width="13" height="10" rx="1.4" />
      <path d="M7 16.2h4" />
      <rect x="14.2" y="9.2" width="7.3" height="10.3" rx="1.4" />
    </svg>
  ),
  lock: (
    <svg {...iconProps}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8.2a4 4 0 0 1 8 0V11" />
    </svg>
  ),
  storage: (
    <svg {...iconProps}>
      <path d="M4.5 8.5 12 4.5l7.5 4-7.5 4-7.5-4Z" />
      <path d="M4.5 12.2 12 16.2l7.5-4" />
      <path d="M4.5 15.8 12 19.8l7.5-4" />
    </svg>
  ),
  bell: (
    <svg {...iconProps}>
      <path d="M6.5 16.5V11a5.5 5.5 0 1 1 11 0v5.5L19 18.5H5l1.5-2Z" />
      <path d="M10 18.5a2 2 0 0 0 4 0" />
    </svg>
  ),
  payment: (
    <svg {...iconProps}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 14.5h4" />
    </svg>
  ),
  gears: (
    <svg {...iconProps}>
      <circle cx="9" cy="13" r="2.2" />
      <path d="M9 8.2v1.4M9 16.4v1.4M4.8 10.6l1.2.7M12 14.7l1.2.7M4.8 15.4l1.2-.7M12 11.3l1.2-.7" />
      <circle cx="16" cy="8.2" r="1.7" />
      <path d="M16 4.6v1.1M16 10.7v1.1M12.8 6.4l.9.5M18.3 9.5l.9.5M12.8 10l.9-.5M18.3 6.9l.9-.5" />
    </svg>
  ),
  github: (
    <svg {...iconProps}>
      <path d="M9 19c-4.3 1.4-4.3-2.1-6-2.5" />
      <path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" />
    </svg>
  ),
  linkedin: (
    <svg {...iconProps}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 11.2V16.5" />
      <path d="M8 8.2v.01" />
      <path d="M12 16.5v-3.2a2 2 0 0 1 4 0v3.2" />
    </svg>
  ),
  phone: (
    <svg {...iconProps}>
      <path d="M7.2 3.8h3.1l1.2 3.4-2.1 1.2a12.4 12.4 0 0 0 6.2 6.2l1.2-2.1 3.4 1.2v3.1c0 .9-.8 2.4-5.4 2.4C8.4 19.2 4.8 13.8 4.8 8.4c0-4.6 1.5-4.6 2.4-4.6Z" />
    </svg>
  )
}

const SiteIcon = ({ name }: { name: SiteIconName }) => ICONS[name]

export default SiteIcon
