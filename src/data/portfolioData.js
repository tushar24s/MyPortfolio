export const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact Me", href: "#contact" },
];

export const portfolioData = {
  name: "Tushar Singh",
  role: "Frontend and Full-Stack Developer",
  hero: {
    greeting: "Hello, I'm Tushar",
    avatar: "/tushar-avatar.png",
    eyebrow: "Open to work",
    titleLines: [
      "Building clean & scalable",
      "digital products.",
    ],
    summary:
      "Frontend-focused engineer blending product thinking, modern UI systems, and reliable full-stack delivery.",
    roleLine: "Product-minded developer",
    primaryCta: {
      label: "Explore Projects",
      href: "#projects",
    },
    secondaryCta: {
      label: "View Resume",
      href: "/Tushar_s_Resume.pdf",
    },
    visualBadge: "Frontend + Product Management",
    visualStack: "React, Next.js, FastAPI",
    visualCards: [
      {
        title: "Clean UI systems",
        body: "Clear hierarchy, motion, and polished interaction detail.",
      },
      {
        title: "Scalable delivery",
        body: "Reliable full-stack execution shaped by UX and product thinking.",
      },
    ],
  },
  about: {
    title:
      "Product-minded developer focused on frontend and real-world problem solving",
    summary:
      "Computer Science graduate building data-driven web products with a strong focus on clean frontend execution, practical engineering, and product thinking. I enjoy turning messy user and business problems into software that feels clear, useful, and reliable.",
    points: [
      "Built full-stack projects across AI compliance, finance, and e-commerce products.",
      "Work comfortably with React, Next.js, FastAPI, and modern web application flows.",
      "Contributed product testing experience through QA feedback, issue reporting, and UX improvements.",
      "Actively exploring Product Management, Agentic AI, and UI/UX to build stronger digital experiences.",
    ],
    skills: [
      {
        label: "Languages",
        items: "Java, C++, TypeScript, JavaScript, HTML/CSS",
      },
      {
        label: "Frontend",
        items: "React.js, Next.js, Tailwind CSS",
      },
      {
        label: "Backend",
        items: "Node.js, FastAPI, REST APIs",
      },
      {
        label: "Databases",
        items: "SQL, MongoDB, Supabase",
      },
      {
        label: "Tools & Platforms",
        items: "Git, GitHub, Jira, Power BI",
      },
      {
        label: "Tech Philosophy",
        items: "I focus on building products that are simple, useful, and actually solve something meaningful.",
      },
    ],
  },
  projects: [
    {
      slug: "track-aura",
      title: "TrackAura",
      type: "Tracking Dashboard",
      meta: "Live product experience",
      description:
        "Modern tracking dashboard with focused data views, practical workflows, and a clean product interface.",
      metrics: ["Live deployment", "Responsive UI"],
      stack: ["React", "Vite", "Framer Motion"],
      image: "/visuals/trackaura-dashboard.svg",
      live: "https://track-aura-jet.vercel.app/",
      github: "https://github.com/tushar24s/TrackAura",
      githubLabel: "GitHub",
    },
    {
      slug: "zen-finance",
      title: "Zen Finance",
      type: "Personal Finance Tracker",
      meta: "Sub-200ms API responses",
      description:
        "Finance dashboard with authentication, analytics, and secure API-powered money tracking.",
      metrics: ["Sub-200ms API", "Realtime analytics"],
      stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
      image: "/visuals/zen-finance.png",
      live: "https://zen-finance-flax.vercel.app/login",
      github: "https://github.com/tushar24s/ZenFinance",
      githubLabel: "GitHub",
    },
    {
      slug: "mern-commerce-store",
      title: "MERN eCommerce Store",
      type: "Full-Stack Commerce App",
      meta: "500+ products managed",
      description:
        "Commerce storefront with JWT auth, product discovery, and order-ready backend workflows.",
      metrics: ["500+ products", "15+ REST APIs"],
      stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
      image: "/visuals/velora-commerce-showcase.png",
      live: "https://veloraec.vercel.app/",
      github: "https://github.com/tushar24s/Velora",
      githubLabel: "GitHub",
    },
  ],
  resume: {
    file: "/Tushar_s_Resume.pdf",
    note:
      "This section uses your current one-page resume, covering education, technical skills, OnePlus testing experience, and project outcomes.",
    details: [
      "B.Tech in Computer Science from Amity University, Lucknow",
      "OnePlus India product tester selected from 500+ applicants",
      "Agentic AI and product management certification in progress",
    ],
    metrics: [
      { label: "Education", value: "B.Tech CSE, 2025" },
      { label: "Experience", value: "OnePlus India QA tester" },
      { label: "Projects", value: "AI, finance, commerce" },
      { label: "Achievement", value: "Google Hackfest Round 4" },
    ],
  },
  contact: {
    email: "tushar.singh0824@gmail.com",
    phone: "+91 7905148689",
    linkedin: "https://www.linkedin.com/in/tushar-singh-8a2b21226/",
    github: "https://github.com/tushar24s",
    note:
      "Open to Frontend, Data Analyst, and Product Manager roles. Reach out by email, LinkedIn, GitHub, or phone.",
  },
};
