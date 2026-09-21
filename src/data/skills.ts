export type SkillCategory =
  | "frontend"
  | "backend"
  | "databases"
  | "devops"
  | "tools"
  | "ai"

export type Skill = {
  id: number
  name: string
  imageSrc: string
  experience: number
  unite: string
  progress: number
  category: SkillCategory
}

export const skills: Skill[] = [
  {
    id: 1,
    name: "React",
    imageSrc: "/images/Icons/svg/react.svg",
    experience: 5,
    unite: "Years",
    progress: 90,
    category: "frontend"
  },
  {
    id: 3,
    name: "Redux",
    imageSrc: "/images/Icons/svg/redux.svg",
    experience: 5,
    unite: "Years",
    progress: 90,
    category: "frontend"
  },
  {
    id: 4,
    name: "Next",
    imageSrc: "/images/Icons/svg/Next.js.svg",
    experience: 3,
    unite: "Years",
    progress: 80,
    category: "frontend"
  },
  {
    id: 5,
    name: "TypeScript",
    imageSrc: "/images/Icons/svg/Typescript.svg",
    experience: 3,
    unite: "Years",
    progress: 70,
    category: "frontend"
  },
  {
    id: 6,
    name: "JavaScript",
    imageSrc: "/images/Icons/svg/JavaScript.svg",
    experience: 5,
    unite: "Years",
    progress: 80,
    category: "frontend"
  },
  {
    id: 7,
    name: "HTML5",
    imageSrc: "/images/Icons/svg/HTML5.svg",
    experience: 6,
    unite: "Years",
    progress: 95,
    category: "frontend"
  },
  {
    id: 8,
    name: "CSS3",
    imageSrc: "/images/Icons/svg/CSS3.svg",
    experience: 6,
    unite: "Years",
    progress: 95,
    category: "frontend"
  },
  {
    id: 9,
    name: "Sass",
    imageSrc: "/images/Icons/tech/Sass.svg",
    experience: 6,
    unite: "Years",
    progress: 95,
    category: "frontend"
  },
  {
    id: 10,
    name: "Material UI",
    imageSrc: "/images/Icons/svg/mui.svg",
    experience: 3,
    unite: "Years",
    progress: 90,
    category: "frontend"
  },
  {
    id: 11,
    name: "TailwindCSS",
    imageSrc: "/images/Icons/svg/Tailwind.svg",
    experience: 1,
    unite: "Year",
    progress: 70,
    category: "frontend"
  },
  {
    id: 12,
    name: "Bootstrap",
    imageSrc: "/images/Icons/svg/bootstrap.svg",
    experience: 5,
    unite: "Years",
    progress: 80,
    category: "frontend"
  },
  {
    id: 13,
    name: "Ant Design",
    imageSrc: "/images/Icons/svg/ant.svg",
    experience: 1,
    unite: "Year",
    progress: 75,
    category: "frontend"
  },
  {
    id: 14,
    name: "React Native",
    imageSrc: "/images/Icons/svg/react.svg",
    experience: 1,
    unite: "Year",
    progress: 50,
    category: "frontend"
  },
  {
    id: 49,
    name: "Jest",
    imageSrc: "/images/Icons/svg/jest.svg",
    experience: 4,
    unite: "Years",
    progress: 75,
    category: "frontend"
  },
  {
    id: 50,
    name: "Playwright",
    imageSrc: "/images/Icons/svg/playwright.svg",
    experience: 2,
    unite: "Years",
    progress: 65,
    category: "frontend"
  },
  {
    id: 31,
    name: "Node",
    imageSrc: "/images/Icons/svg/node.svg",
    experience: 5,
    unite: "Years",
    progress: 85,
    category: "backend"
  },
  {
    id: 32,
    name: "Express",
    imageSrc: "/images/Icons/svg/express.svg",
    experience: 4,
    unite: "Years",
    progress: 80,
    category: "backend"
  },
  {
    id: 33,
    name: "Passport",
    imageSrc: "/images/Icons/svg/passport.svg",
    experience: 3,
    unite: "Years",
    progress: 70,
    category: "backend"
  },
  {
    id: 38,
    name: "SAML",
    imageSrc: "/images/Icons/svg/saml.svg",
    experience: 2,
    unite: "Years",
    progress: 65,
    category: "backend"
  },
  {
    id: 16,
    name: "Apollo GraphQL",
    imageSrc: "/images/Icons/svg/grapql.svg",
    experience: 2,
    unite: "Years",
    progress: 70,
    category: "backend"
  },
  {
    id: 17,
    name: "TypeORM",
    imageSrc: "/images/Icons/svg/typeorm-seeklogo.svg",
    experience: 2,
    unite: "Years",
    progress: 60,
    category: "backend"
  },
  {
    id: 18,
    name: "PHP",
    imageSrc: "/images/Icons/svg/PHP.svg",
    experience: 2,
    unite: "Years",
    progress: 50,
    category: "backend"
  },
  {
    id: 20,
    name: "SQL",
    imageSrc: "/images/Icons/svg/sql.svg",
    experience: 4,
    unite: "Years",
    progress: 70,
    category: "databases"
  },
  {
    id: 19,
    name: "MongoDB",
    imageSrc: "/images/Icons/svg/mongo.svg",
    experience: 4,
    unite: "Years",
    progress: 80,
    category: "databases"
  },
  {
    id: 21,
    name: "Firebase",
    imageSrc: "/images/Icons/svg/firebase.svg",
    experience: 3,
    unite: "Years",
    progress: 80,
    category: "databases"
  },
  {
    id: 22,
    name: "Git - Github",
    imageSrc: "/images/Icons/svg/github-icon-seeklogo.svg",
    experience: 5,
    unite: "Years",
    progress: 80,
    category: "devops"
  },
  {
    id: 23,
    name: "Docker",
    imageSrc: "/images/Icons/svg/docker.svg",
    experience: 3,
    unite: "Years",
    progress: 60,
    category: "devops"
  },
  {
    id: 24,
    name: "Jenkins",
    imageSrc: "/images/Icons/svg/jenkins.svg",
    experience: 3,
    unite: "Years",
    progress: 60,
    category: "devops"
  },
  {
    id: 25,
    name: "AWS",
    imageSrc: "/images/Icons/svg/aws.svg",
    experience: 2,
    unite: "Years",
    progress: 35,
    category: "devops"
  },
  {
    id: 26,
    name: "Linux",
    imageSrc: "/images/Icons/svg/ubuntu.svg",
    experience: 3,
    unite: "Years",
    progress: 40,
    category: "devops"
  },
  {
    id: 27,
    name: "WordPress",
    imageSrc: "/images/Icons/svg/WordPress.svg",
    experience: 6,
    unite: "Years",
    progress: 80,
    category: "tools"
  },
  {
    id: 28,
    name: "Jira",
    imageSrc: "/images/Icons/svg/jira.svg",
    experience: 1,
    unite: "Year",
    progress: 50,
    category: "tools"
  },
  {
    id: 29,
    name: "Photoshop",
    imageSrc: "/images/Icons/svg/psd.svg",
    experience: 15,
    unite: "Years",
    progress: 90,
    category: "tools"
  },
  {
    id: 30,
    name: "Premiere Pro",
    imageSrc: "/images/Icons/svg/ppro.svg",
    experience: 6,
    unite: "Years",
    progress: 85,
    category: "tools"
  },
  {
    id: 34,
    name: "Slack",
    imageSrc: "/images/Icons/svg/slack.svg",
    experience: 3,
    unite: "Years",
    progress: 75,
    category: "tools"
  },
  {
    id: 35,
    name: "Cursor",
    imageSrc: "/images/Icons/svg/cursor.svg",
    experience: 1,
    unite: "Year",
    progress: 80,
    category: "tools"
  },
  {
    id: 36,
    name: "Windsurf",
    imageSrc: "/images/Icons/svg/windsurf.svg",
    experience: 1,
    unite: "Year",
    progress: 55,
    category: "tools"
  },
  {
    id: 37,
    name: "Visual Studio",
    imageSrc: "/images/Icons/svg/visual-studio.svg",
    experience: 4,
    unite: "Years",
    progress: 65,
    category: "tools"
  },
  {
    id: 39,
    name: "Cursor Grok 4.6",
    imageSrc: "/images/Icons/svg/grok.svg",
    experience: 3,
    unite: "Days",
    progress: 90,
    category: "ai"
  },
  {
    id: 40,
    name: "Composer 2.5",
    imageSrc: "/images/Icons/svg/composer.svg",
    experience: 2,
    unite: "Months",
    progress: 85,
    category: "ai"
  },
  {
    id: 41,
    name: "Opus 5",
    imageSrc: "/images/Icons/svg/anthropic.svg",
    experience: 3,
    unite: "Weeks",
    progress: 80,
    category: "ai"
  },
  {
    id: 42,
    name: "GPT-5.6 Sol",
    imageSrc: "/images/Icons/svg/openai.svg",
    experience: 1,
    unite: "Month",
    progress: 80,
    category: "ai"
  },
  {
    id: 43,
    name: "GPT-5.5",
    imageSrc: "/images/Icons/svg/openai.svg",
    experience: 3,
    unite: "Months",
    progress: 85,
    category: "ai"
  },
  {
    id: 44,
    name: "Fable 5",
    imageSrc: "/images/Icons/svg/anthropic.svg",
    experience: 2,
    unite: "Months",
    progress: 80,
    category: "ai"
  },
  {
    id: 45,
    name: "Cursor Grok 4.5",
    imageSrc: "/images/Icons/svg/grok.svg",
    experience: 1,
    unite: "Month",
    progress: 75,
    category: "ai"
  },
  {
    id: 46,
    name: "GPT-5.6 Terra",
    imageSrc: "/images/Icons/svg/openai.svg",
    experience: 1,
    unite: "Month",
    progress: 75,
    category: "ai"
  },
  {
    id: 47,
    name: "Sonnet 5",
    imageSrc: "/images/Icons/svg/anthropic.svg",
    experience: 1,
    unite: "Month",
    progress: 80,
    category: "ai"
  },
  {
    id: 48,
    name: "Kimi K3",
    imageSrc: "/images/Icons/svg/kimi.svg",
    experience: 1,
    unite: "Month",
    progress: 70,
    category: "ai"
  }
]
