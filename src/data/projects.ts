export type ProjectCategory = "web" | "landing" | "api" | "ecommerce"

export const data = [
  {
    id: "FuenteDeVidaResidencial",
    name: "Fuente de Vida Residencial",
    category: "landing",
    teaser: "Residential marketing site with bilingual content and visit booking.",
    description:
      "Marketing website for a residential development in Comitán de Domínguez, Chiapas. (2026)",
    img: "/images/Webp/fuente-de-vida.webp",
    tech: [
      {
        tech: "React.js",
        icon: "/images/Icons/svg/react.svg"
      },
      {
        tech: "Material UI",
        icon: "/images/Icons/svg/mui.svg"
      },
      {
        tech: "JavaScript",
        icon: "/images/Icons/svg/JavaScript.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      }
    ],
    url: "https://fuente-de-vida-residencial.vercel.app/",
    thumbnail: "/images/thumbnails/fuente-de-vida.webp",
    github: null
  },
  {
    id: "MulberryMarketing",
    name: "Mulberry Marketing",
    category: "web",
    teaser: "Agency site for strategy, content, and custom web.",
    description:
      "Boutique agency site that unifies strategy, creativity, and technology. (2026)",
    img: "/images/Webp/mulberry-marketing.webp",
    tech: [
      {
        tech: "React.js",
        icon: "/images/Icons/svg/react.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      },
      {
        tech: "JavaScript",
        icon: "/images/Icons/svg/JavaScript.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      }
    ],
    url: "https://mulberry-marketing.vercel.app/",
    thumbnail: "/images/thumbnails/mulberry-marketing.webp",
    github: null
  },
  {
    id: "CeciliaRodriguez",
    name: "Business Card",
    category: "landing",
    teaser: "Mobile-first digital card for an eXp Realty agent in CDMX.",
    description:
      "Digital business card for an eXp Realty México agent in CDMX. (2026)",
    img: "/images/Webp/cecilia-rodriguez.webp",
    width: 1024,
    height: 640,
    tech: [
      {
        tech: "React.js",
        icon: "/images/Icons/svg/react.svg"
      },
      {
        tech: "JavaScript",
        icon: "/images/Icons/svg/JavaScript.svg"
      },
      {
        tech: "HTML5",
        icon: "/images/Icons/svg/HTML5.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      }
    ],
    url: "https://cecilia-rodriguez.vercel.app/",
    thumbnail: "/images/thumbnails/cecilia-rodriguez.webp",
    github: null
  },
  {
    id: "ThisIsSantiOriginal",
    name: "ThisIsSanti.dev (Original)",
    category: "landing",
    teaser: "The original ThisIsSanti.dev portfolio, still live.",
    description:
      "Original personal portfolio for ThisIsSanti.dev. (2024)",
    img: "/images/Webp/thisissanti-original.webp",
    tech: [
      {
        tech: "Next.js",
        icon: "/images/Icons/svg/Next.js.svg"
      },
      {
        tech: "React.js",
        icon: "/images/Icons/svg/react.svg"
      },
      {
        tech: "Bootstrap",
        icon: "/images/Icons/svg/bootstrap.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      }
    ],
    url: "https://thisissantidev.vercel.app/",
    thumbnail: "/images/thumbnails/thisissanti-original.webp",
    github: null
  },
  {
    id: "SaasProject",
    name: "SaaS Project",
    category: "web",
    teaser: "Modernizing an all-in-one SaaS platform for salons and spas.",
    description:
      "Ongoing modernization of a SaaS platform for salon and spa operations. (2025–2026)",
    img: "/images/Webp/salon-target.webp",
    tech: [
      {
        tech: "React.js",
        icon: "/images/Icons/svg/react.svg"
      },
      {
        tech: "Apollo GraphQL",
        icon: "/images/Icons/svg/grapql.svg"
      },
      {
        tech: "TypeORM",
        icon: "/images/Icons/svg/typeorm-seeklogo.svg"
      },
      {
        tech: "Node.js",
        icon: "/images/Icons/svg/node.svg"
      },
      {
        tech: "TypeScript",
        icon: "/images/Icons/svg/Typescript.svg"
      },
      {
        tech: "Material UI",
        icon: "/images/Icons/svg/mui.svg"
      }
    ],
    url: null,
    thumbnail: "/images/thumbnails/salon-target.webp",
    github: null
  },
  {
    id: "SsoSamlOkta",
    name: "SSO SAML Okta API",
    category: "api",
    teaser: "Custom SAML SSO API integrated with Okta.",
    description:
      "Authentication and SAML SSO API built with Node.js and TypeScript. (2023)",
    img: "/images/thumbnails/sso-saml-okta.png",
    tech: [
      {
        tech: "Node.js",
        icon: "/images/Icons/svg/node.svg"
      },
      {
        tech: "TypeScript",
        icon: "/images/Icons/svg/Typescript.svg"
      },
      {
        tech: "Okta",
        icon: "/images/Icons/svg/okta.svg"
      },
      {
        tech: "Amazon Web Services",
        icon: "/images/Icons/svg/aws.svg"
      },
      {
        tech: "Passport",
        icon: "/images/Icons/svg/passport.svg"
      }
    ],
    url: null,
    thumbnail: "/images/thumbnails/auth0-okta.png",
    width: 1024,
    height: 561
  },
  {
    id: "ManagerProxy",
    name: "Proxy Manager API",
    category: "api",
    teaser: "Public gateway to eight private AWS microservices.",
    description:
      "API that exposes eight private AWS microservices without a VPN. (2023)",
    img: "/images/thumbnails/proxy-manager-aws.png",
    tech: [
      {
        tech: "Node.js",
        icon: "/images/Icons/svg/node.svg"
      },
      {
        tech: "TypeScript",
        icon: "/images/Icons/svg/Typescript.svg"
      },
      {
        tech: "Amazon Web Services",
        icon: "/images/Icons/svg/aws.svg"
      }
    ],
    url: null,
    thumbnail: "/images/thumbnails/proxy-manager-api.png",
    width: 1024,
    height: 682
  },
  {
    id: "ElectronicBilling",
    name: "Electronic Billing GS",
    category: "web",
    teaser: "Invoice platform for Grupo Salinas, connected to SAT.",
    description:
      "Invoice issuance platform for Grupo Salinas, connected to the SAT API. (2024)",
    img: "/images/Webp/FacturacionElectronica.webp",
    tech: [
      {
        tech: "React.js",
        icon: "/images/Icons/svg/react.svg"
      },
      {
        tech: "Node.js",
        icon: "/images/Icons/svg/node.svg"
      },
      {
        tech: "Okta",
        icon: "/images/Icons/svg/okta.svg"
      },
      {
        tech: "Redux",
        icon: "/images/Icons/svg/redux.svg"
      },
      {
        tech: "Amazon Web Services",
        icon: "/images/Icons/svg/aws.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      },
      {
        tech: "Passport",
        icon: "/images/Icons/svg/passport.svg"
      },
      {
        tech: "Ant Design",
        icon: "/images/Icons/svg/ant.svg"
      },
      {
        tech: "Docker",
        icon: "/images/Icons/svg/docker.svg"
      }
    ],
    thumbnail: "/images/thumbnails/Thumbnail-PIFE.webp",
    url: null,
    github: null
  },
  {
    id: "MiBlog",
    name: "Mi Blog",
    category: "web",
    teaser: "Next.js blog with admin, auth, and offline mode.",
    description:
      "Next.js blog with an admin panel and authentication. (2023)",
    img: "/images/Webp/mi-blog.webp",
    width: 1586,
    height: 992,

    tech: [
      {
        tech: "Next.js",
        icon: "/images/Icons/svg/Next.js.svg"
      },
      {
        tech: "TypeScript",
        icon: "/images/Icons/svg/Typescript.svg"
      },
      {
        tech: "MongoDB",
        icon: "/images/Icons/svg/mongo.svg"
      },
      {
        tech: "SQL",
        icon: "/images/Icons/svg/sql.svg"
      }
    ],
    url: null,
    thumbnail: "/images/thumbnails/mi-blog.webp",
    github: "https://github.com/oneriddle/My-Blog"
  },
  {
    id: "eCommerce",
    name: "eCommerce",
    category: "ecommerce",
    img: "/images/thumbnails/ecommerce-backend.png",
    teaser: "Node.js store with cart, chat, and email confirmations.",
    description:
      "Node.js store with cart, live chat, and purchase emails. (2023)",
    tech: [
      {
        tech: "Node.js",
        icon: "/images/Icons/svg/node.svg"
      },
      {
        tech: "Handlebars",
        icon: "/images/Icons/svg/handlebars.svg"
      },
      {
        tech: "Socket.io",
        icon: "/images/Icons/svg/socket-io.svg"
      },
      {
        tech: "MongoDB",
        icon: "/images/Icons/svg/mongo.svg"
      },
      {
        tech: "Redis",
        icon: "/images/Icons/svg/redis.svg"
      },
      {
        tech: "Passport",
        icon: "/images/Icons/svg/passport.svg"
      },
      {
        tech: "Node Mailer",
        icon: "https://nodemailer.com/nm_logo_200x136.png"
      },
      {
        tech: "Mocha testing",
        icon: "/images/Icons/svg/mocha.svg"
      },
      {
        tech: "Twilio",
        icon: "/images/Icons/svg/twilio.svg"
      },
      {
        tech: "HTML5",
        icon: "/images/Icons/svg/HTML5.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      },
      {
        tech: "Bootstrap",
        icon: "/images/Icons/svg/bootstrap.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      }
    ],
    thumbnail: "/images/thumbnails/ecommerce-backend.png",
    url: null,
    github: null,
    width: 1024,
    height: 682
  },
  {
    id: "TreeHug",
    name: "Tree Hug",
    category: "landing",
    teaser: "Martial arts school landing with Mercado Pago.",
    description:
      "Landing page for a martial arts school with Mercado Pago checkout. (2023)",
    img: "/images/Webp/AbrazoDelArbol.webp",
    tech: [
      {
        tech: "Mercado pago",
        icon: "/images/Icons/svg/mercado-pago.svg"
      },
      {
        tech: "HTML5",
        icon: "/images/Icons/svg/HTML5.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      },
      {
        tech: "JavaScript",
        icon: "/images/Icons/svg/JavaScript.svg"
      }
    ],
    url: "https://landing-page-pi-lemon.vercel.app",
    thumbnail: "/images/thumbnails/www-abrazodelarbol-com.webp",
    github: null
  },
  {
    id: "TecnoShop",
    name: "Tecno Shop",
    category: "ecommerce",
    teaser: "React computer store with cart and live stock.",
    description:
      "React.js computer store with cart and live inventory.",
    img: "/images/Webp/TecnoShop.webp",
    tech: [
      {
        tech: "React.js",
        icon: "/images/Icons/svg/react.svg"
      },
      {
        tech: "HTML5",
        icon: "/images/Icons/svg/HTML5.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      },
      {
        tech: "JavaScript",
        icon: "/images/Icons/svg/JavaScript.svg"
      },
      {
        tech: "Firebase",
        icon: "/images/Icons/svg/firebase.svg"
      }
    ],
    url: "https://tech-shop-tau.vercel.app",
    thumbnail: "/images/thumbnails/tecnotienda.webp",
    github: null
  },
  {
    id: "eCommerceJs",
    name: "eCommerce Js",
    category: "ecommerce",
    img: "/images/Webp/eCommerceJs.webp",
    teaser: "Vanilla JavaScript storefront with dark mode.",
    description:
      "Vanilla JavaScript storefront built as a course final project. (2022)",
    tech: [
      {
        tech: "HTML5",
        icon: "/images/Icons/svg/HTML5.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      },
      {
        tech: "Bootstrap",
        icon: "/images/Icons/svg/bootstrap.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      },
      {
        tech: "JavaScript",
        icon: "/images/Icons/svg/JavaScript.svg"
      }
    ],
    url: "https://proyecto-js-mu.vercel.app",
    thumbnail: "/images/thumbnails/Thumbnail-e-Commerce-JS.webp",
    github: null
  },
  /* {
    id: 5,
    name: "Invitation",
    description:
    "This is an invitation for a wedding, where guests can confirm attendance, as well as know all the details of the event. (2023)",
    img: "/images/Webp/Invitation.webp",
    tech: [
      "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902",
      "https://sass-lang.com/assets/img/logos/logo.svg",
    ],
    url: "https://santiagomorera.github.io/DeliaYSantiagoInvi/",
    thumbnail: "/images/thumbnails/invitacion-thumbnail.webp",
  }, */
  {
    id: "LiveChatApp",
    name: "Live Chat App",
    category: "web",
    img: "/images/Webp/LiveChatApp.webp",
    teaser: "Realtime chat rooms built with Node.js.",
    description:
      "Node.js chat app where you pick a room and talk in realtime. (2023)",
    tech: [
      {
        tech: "Node.js",
        icon: "/images/Icons/svg/node.svg"
      },
      {
        tech: "Socket.io",
        icon: "/images/Icons/svg/socket-io.svg"
      },
      {
        tech: "HTML5",
        icon: "/images/Icons/svg/HTML5.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      }
    ],
    url: "https://livechat-by-santi-dev.fly.dev",
    thumbnail: "/images/thumbnails/Thumbnail-Chat-App.webp",
    github: "https://github.com/oneriddle/LiveChat"
  },
  {
    id: "Pokedex",
    name: "Pokedex",
    category: "web",
    img: "/images/Webp/Pokedex.webp",
    teaser: "Browse and favorite 1,000 Pokémon with auth.",
    description:
      "Node.js app to browse 1,000 Pokémon, search, and save favorites. (2023)",
    tech: [
      {
        tech: "Node.js",
        icon: "/images/Icons/svg/node.svg"
      },
      {
        tech: "Handlebars",
        icon: "/images/Icons/svg/handlebars.svg"
      },
      {
        tech: "Socket.io",
        icon: "/images/Icons/svg/socket-io.svg"
      },
      {
        tech: "MongoDB",
        icon: "/images/Icons/svg/mongo.svg"
      },
      {
        tech: "Redis",
        icon: "/images/Icons/svg/redis.svg"
      },
      {
        tech: "Passport",
        icon: "/images/Icons/svg/passport.svg"
      },
      {
        tech: "Node Mailer",
        icon: "https://nodemailer.com/nm_logo_200x136.png"
      },
      {
        tech: "Mocha testing",
        icon: "/images/Icons/svg/mocha.svg"
      },
      {
        tech: "Bootstrap",
        icon: "/images/Icons/svg/bootstrap.svg"
      },
      {
        tech: "HTML5",
        icon: "/images/Icons/svg/HTML5.svg"
      },
      {
        tech: "Sass",
        icon: "/images/Icons/svg/Sass.svg"
      },
      {
        tech: "CSS3",
        icon: "/images/Icons/svg/CSS3.svg"
      }
    ],
    url: null,
    thumbnail: "/images/thumbnails/Thumbnail-Screenshot-Pokedex.webp",
    github: null
  },
  {
    id: "Naturatours",
    name: "Naturatours",
    category: "landing",
    teaser: "WordPress site for a Puerto Vallarta tour agency.",
    description:
      "WordPress site for a tour agency in Puerto Vallarta. (2020)",
    img: "https://i.ibb.co/VTrr8C7/Natura-Tours.webp",
    tech: [
      {
        tech: "WordPress",
        icon: "/images/Icons/svg/WordPress.svg"
      },
      {
        tech: "Gutenberg",
        icon: "/images/Icons/svg/gutenberg.svg"
      }
    ],
    url: null,
    thumbnail: "/images/thumbnails/Thumbnail-naturatours.webp"
  }
]
