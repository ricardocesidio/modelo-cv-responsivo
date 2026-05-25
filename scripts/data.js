const DEFAULT_CV_DATA = {
  personal: {
    fullName: "JOHN DOE",
    title: "Front-End Developer",
    location: "London, United Kingdom",
    phone: "+44 7700 900000",
    email: "john.doe@email.com",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    portfolio: "https://johndoe.dev"
  },
  image: {
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23333'/%3E%3Ccircle cx='100' cy='80' r='40' fill='%23555'/%3E%3Cpath d='M30 200 Q30 120 100 120 Q170 120 170 200' fill='%23555'/%3E%3C/svg%3E",
    alt: "Profile picture",
    shape: "circle",
    size: "medium"
  },
  profile: {
    visible: true,
    title: "PROFILE",
    text: "Front-End Developer with 5+ years of experience building modern, responsive web applications. Passionate about clean UI, design systems, and delivering exceptional user experiences. Proficient in React, TypeScript, and modern CSS architecture."
  },
  skills: {
    visible: true,
    title: "SKILLS",
    categories: [
      {
        id: "skill-frontend",
        category: "Frontend",
        items: ["React", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3 / SCSS", "Next.js", "Vite", "React Router", "CSS Grid", "Flexbox", "Tailwind CSS"]
      },
      {
        id: "skill-backend",
        category: "Backend & Tools",
        items: ["Node.js", "REST APIs", "PostgreSQL", "MongoDB", "Git / GitHub", "Docker", "CI/CD", "Storybook", "Playwright", "Jest"]
      },
      {
        id: "skill-design",
        category: "Design & UX",
        items: ["Responsive Design", "Design Systems", "Figma", "Accessibility (a11y)", "Performance Optimization", "PWA"]
      }
    ]
  },
  education: {
    visible: true,
    title: "EDUCATION",
    items: [
      {
        id: "edu-cs-degree",
        title: "B.Sc. in Computer Science",
        school: "University of London",
        description: "Graduated with Honours. Focus on web technologies, algorithms, and software engineering."
      },
      {
        id: "edu-meta-cert",
        title: "Meta Front-End Developer Certificate",
        school: "Coursera / Meta",
        description: "9 courses: HTML5, CSS3, JavaScript, React, Git/GitHub. Component-based projects."
      },
      {
        id: "edu-aws-cert",
        title: "AWS Cloud Practitioner",
        school: "Amazon Web Services",
        description: "Cloud fundamentals, architecture, security, and core AWS services."
      }
    ]
  },
  experience: {
    visible: true,
    title: "EXPERIENCE",
    items: [
      {
        id: "exp-techcorp",
        role: "Senior Front-End Developer",
        company: "TechCorp Ltd.",
        location: "London, UK",
        period: "2023 \u2013 Present",
        bullets: [
          "Led migration of legacy jQuery application to React 18 with TypeScript, reducing page load time by 45%",
          "Architected a centralized design system with 200+ reusable components used across 4 product teams",
          "Implemented CI/CD pipeline with GitHub Actions and automated visual regression testing with Playwright",
          "Mentored 3 junior developers through code reviews, pair programming, and weekly knowledge-sharing sessions"
        ]
      },
      {
        id: "exp-startupxyz",
        role: "Front-End Developer",
        company: "StartupXYZ",
        location: "Manchester, UK",
        period: "2021 \u2013 2023",
        bullets: [
          "Built a real-time analytics dashboard with React, D3.js, and WebSocket integration, handling 50K+ events per day",
          "Developed responsive landing pages and email templates that improved conversion rates by 28%",
          "Optimised Core Web Vitals, achieving 95+ Lighthouse scores across all pages",
          "Collaborated with UX designers to create accessible, mobile-first interfaces following WCAG 2.1 AA guidelines"
        ]
      },
      {
        id: "exp-webagency",
        role: "Junior Front-End Developer",
        company: "WebAgency Co.",
        location: "Birmingham, UK",
        period: "2019 \u2013 2021",
        bullets: [
          "Developed and maintained 15+ client websites using HTML5, CSS3, JavaScript, and WordPress",
          "Implemented responsive layouts with CSS Grid and Flexbox, ensuring cross-browser compatibility",
          "Reduced build times by 60% by migrating from Gulp to Vite and optimising asset pipelines",
          "Wrote unit and integration tests with Jest and React Testing Library, achieving 85% code coverage"
        ]
      }
    ]
  },
  projects: {
    visible: true,
    title: "PROJECTS",
    items: [
      {
        id: "proj-ecommerce",
        title: "E-Commerce Platform",
        role: "Full-Stack Developer",
        year: "2025",
        bullets: [
          "Full-stack e-commerce platform built with Next.js 15, TypeScript, and PostgreSQL",
          "Integrated Stripe payments, product search with Algolia, and admin dashboard with real-time analytics",
          "Server-side rendering with automatic static optimisation for 90+ Lighthouse performance score",
          "Tech: Next.js, TypeScript, Tailwind, Prisma, PostgreSQL, Stripe, Algolia, Docker"
        ],
        liveDemo: "https://example.com/demo",
        sourceCode: "https://github.com/johndoe/ecommerce"
      },
      {
        id: "proj-taskapp",
        title: "Task Management App",
        role: "Front-End Developer",
        year: "2024",
        bullets: [
          "Collaborative task management SPA with drag-and-drop boards, real-time updates, and team chat",
          "State management with Zustand and server synchronisation via REST API",
          "PWA support with offline capabilities, push notifications, and install prompt",
          "Tech: React, TypeScript, Vite, Zustand, Tailwind, Vitest, Playwright"
        ],
        liveDemo: "https://example.com/tasks",
        sourceCode: "https://github.com/johndoe/task-app"
      },
      {
        id: "proj-weather",
        title: "Weather Dashboard",
        role: "Front-End Developer",
        year: "2024",
        bullets: [
          "Real-time weather dashboard consuming OpenWeatherMap API with interactive charts and geolocation",
          "Data visualisation with Chart.js, responsive map integration, and 7-day forecast view",
          "Tech: React, JavaScript, Chart.js, Leaflet, CSS Modules, Vite"
        ],
        liveDemo: "",
        sourceCode: "https://github.com/johndoe/weather"
      }
    ]
  },
  theme: {
    preset: "classic-dark",
    colors: {
      bodyBg: "#bcbcbc",
      pageBg: "#ffffff",
      sidebarBg: "#000000",
      sidebarCardBg: "#313131",
      sidebarBorder: "#282828",
      textLight: "#ffffff",
      textDark: "#000000",
      heading: "#4c4c4c",
      accent: "#7d7dbb",
      sectionTitleBg: "#eaeaea",
      linkColor: "#7d7dbb",
      titleInfoBg: "#2c3e50",
      titlePerfilBg: "#34495e",
      titleSkillsBg: "#2d3e3f",
      titleEduBg: "#3a2e3e"
    },
    fonts: {
      body: "Arial, Helvetica, sans-serif",
      heading: "Arial, Helvetica, sans-serif",
      name: "Arial, Helvetica, sans-serif",
      size: "normal"
    }
  }
};
