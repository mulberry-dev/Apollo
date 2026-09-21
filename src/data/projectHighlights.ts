import type { SiteIconName } from "@/components/ui/SiteIcon"

export type ProjectHighlight = {
  icon: SiteIconName
  title: string
  text: string
}

export const projectHighlights: Record<string, ProjectHighlight[]> = {
  FuenteDeVidaResidencial: [
    {
      icon: "leaf",
      title: "Nature-first brand",
      text: "Visual identity inspired by the landscape"
    },
    {
      icon: "globe",
      title: "Bilingual experience",
      text: "Content in Spanish and English"
    },
    {
      icon: "calendar",
      title: "Visit scheduling",
      text: "CTAs that convert interest into appointments"
    },
    {
      icon: "compass",
      title: "Interactive masterplan",
      text: "Lightbox tour of lots from 1,000 m²"
    }
  ],
  MulberryMarketing: [
    {
      icon: "interface",
      title: "Service deep-dives",
      text: "Social, content, ads, UX/UI, web, and e-commerce"
    },
    {
      icon: "performance",
      title: "Case studies",
      text: "Work presented with measurable outcomes"
    },
    {
      icon: "cube",
      title: "Conversion flow",
      text: "Contact path with a 3D brand moment"
    }
  ],
  CeciliaRodriguez: [
    {
      icon: "bolt",
      title: "One-tap actions",
      text: "Call, WhatsApp, email, and contact saving"
    },
    {
      icon: "compass",
      title: "Clear client paths",
      text: "Buy, sell, and rent journeys"
    },
    {
      icon: "shield",
      title: "Trust signals",
      text: "International-backed transactions"
    }
  ],
  ThisIsSantiOriginal: [
    {
      icon: "design",
      title: "Signature visual",
      text: "Gradient type, particle sky, and theme toggle"
    },
    {
      icon: "devices",
      title: "Still live",
      text: "Previous public version, kept online"
    }
  ],
  SaasProject: [
    {
      icon: "modernize",
      title: "Legacy migration",
      text: "PHP and Node.js moving to React and GraphQL"
    },
    {
      icon: "code",
      title: "Maintainable stack",
      text: "Apollo GraphQL and TypeORM"
    },
    {
      icon: "swap",
      title: "Payments upgrade",
      text: "New processor with banking terminals"
    }
  ],
  SsoSamlOkta: [
    {
      icon: "connect",
      title: "Okta integration",
      text: "Identity through a leading platform"
    },
    {
      icon: "puzzle",
      title: "Unified access",
      text: "One sign-on across multiple applications"
    },
    {
      icon: "shield",
      title: "Built end to end",
      text: "Custom SAML flow, not a plugin wrapper"
    }
  ],
  ManagerProxy: [
    {
      icon: "globe",
      title: "No VPN required",
      text: "Reach private services from a public network"
    },
    {
      icon: "shield",
      title: "Private domain intact",
      text: "Retrieval without exposing the internal network"
    },
    {
      icon: "database",
      title: "AWS-hosted",
      text: "Orchestrated on a private cloud domain"
    }
  ],
  ElectronicBilling: [
    {
      icon: "systems",
      title: "15+ microservices",
      text: "Node.js backend on AWS"
    },
    {
      icon: "shield",
      title: "Okta SSO",
      text: "Single sign-on for authenticated access"
    },
    {
      icon: "frontend",
      title: "React + Ant Design",
      text: "Staff-facing invoice interface"
    }
  ],
  MiBlog: [
    {
      icon: "frontend",
      title: "Admin panel",
      text: "Add and delete posts from the dashboard"
    },
    {
      icon: "database",
      title: "Offline mode",
      text: "Local Storage when the network is down"
    }
  ],
  eCommerce: [
    {
      icon: "mail",
      title: "Transactional email",
      text: "Registration and purchase details"
    },
    {
      icon: "gauge",
      title: "Mocha coverage",
      text: "Core flows tested with Mocha"
    },
    {
      icon: "shield",
      title: "Auth and profiles",
      text: "Login, personal data, and confirmation mail"
    }
  ],
  TreeHug: [
    {
      icon: "code",
      title: "Vanilla JavaScript",
      text: "Built without a frontend framework"
    },
    {
      icon: "cube",
      title: "Courses and products",
      text: "Both available to buy on one page"
    }
  ],
  TecnoShop: [
    {
      icon: "compass",
      title: "Category browsing",
      text: "Shop by product type"
    },
    {
      icon: "swap",
      title: "Live stock",
      text: "Inventory decreases after each purchase"
    },
    {
      icon: "code",
      title: "Firebase",
      text: "Client-side storefront with live data"
    }
  ],
  eCommerceJs: [
    {
      icon: "cube",
      title: "Cart and checkout",
      text: "Add products and complete a purchase"
    },
    {
      icon: "design",
      title: "Theme switch",
      text: "Dark and light modes included"
    }
  ],
  LiveChatApp: [
    {
      icon: "calendar",
      title: "Message timestamps",
      text: "Every message shows when it was sent"
    },
    {
      icon: "cursor",
      title: "Easy exit",
      text: "Leave a room and return to home"
    },
    {
      icon: "code",
      title: "Socket.io",
      text: "Realtime rooms on Node.js"
    }
  ],
  Pokedex: [
    {
      icon: "detail",
      title: "Favorites list",
      text: "Save and remove Pokémon from a personal list"
    },
    {
      icon: "clarity",
      title: "Full search",
      text: "Look up any Pokémon and its characteristics"
    },
    {
      icon: "shield",
      title: "Authentication",
      text: "Login-protected experience"
    }
  ],
  Naturatours: [
    {
      icon: "frontend",
      title: "Product showcase",
      text: "Tours presented on a dedicated landing"
    },
    {
      icon: "calendar",
      title: "Reservations",
      text: "Visitors can book directly from the site"
    },
    {
      icon: "cube",
      title: "Gutenberg",
      text: "Content managed in WordPress"
    }
  ]
}
