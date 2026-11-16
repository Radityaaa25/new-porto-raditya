import type { Dictionary } from "./types";

export const en = {
  meta: {
    title: "Raditya Ananda Satria - Web developer and designer",
    description:
      "Front-end developer in Jakarta working in Next.js, React, and a multimedia background.",
    ogAlt: "Raditya Ananda Satria, web developer and designer in Jakarta",
  },
  nav: [
    { key: "work", href: "/work", label: "Work" },
    { key: "about", href: "/about", label: "About" },
    { key: "contact", href: "/contact", label: "Contact" },
  ],
  ui: {
    primary: "Primary",
    footerNav: "Footer",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    siteMenu: "Site menu",
    language: "Language",
    languageHint: "Switch language",
    themeDark: "Switch to light theme",
    themeLight: "Switch to dark theme",
    copyEmail: "Copy email",
    copied: "Copied",
    copyFailed: "Copy failed",
    view: "View",
    visitSite: "Visit site",
    externalNote: "Opens in a new tab",
    all: "All",
    personal: "Personal",
    team: "Team",
    close: "Close",
    backHome: "Back home",
    nextProject: "Next project",
    backToWork: "Back to work",
    role: "Role",
    year: "Year",
    stack: "Stack",
    index: "Index",
    loading: "Loading",
    skipToContent: "Skip to content",
  },
  preloader: {
    statuses: [
      "Warming up the grid",
      "Measuring the margins",
      "Setting the type",
      "Ready when you are",
    ],
    sign: "Cut with care.",
  },
  hero: {
    kicker: "Front-end / Design engineer",
    lines: ["I design the interface.", "Then I build it."],
    accent: "build",
    intro:
      "Front-end developer in Jakarta working in Next.js, React, and a multimedia background.",
    selectedWork: "Selected work",
    shippedLabel: "shipped projects",
    scroll: "Scroll",
    socials: "Elsewhere",
    photoAlt: "Portrait of Raditya Ananda Satria against a red background",
  },
  home: {
    statement: {
      label: "Statement",
      title: "How I work",
      body:
        "I care about how an interface feels before it is explained. Type, rhythm, and motion carry the message; the code underneath keeps it fast, accessible, and easy to maintain.",
    },
    work: {
      label: "Selected work",
      title: "Projects with a pulse.",
      intro:
        "Shipped sites: personal tools, team builds, and a hackathon entry. Screenshots are real, links are live.",
      viewAll: "View all work",
      featured: "Featured",
      index: "Full index",
      previewHint: "Hover an index row to preview",
    },
    about: {
      label: "About",
      title: "Designer by training. Developer by practice.",
      body: [
        "I am Raditya, based in Jakarta. I build web interfaces with Next.js and React, and I design them too. My path started in multimedia: graphic design, video editing, and content production.",
        "Today I study Sistem Informasi at Universitas Bina Sarana Informatika and keep shipping personal and team projects, from AI learning tools to event ticketing and business apps.",
      ],
      cta: "More about me",
      factsLabel: "Quick facts",
      facts: [
        { label: "Base", value: "Jakarta, Indonesia / GMT+7" },
        { label: "Education", value: "Sistem Informasi, UBSI (2025 - now)" },
        { label: "Languages", value: "Indonesian active, English and Korean passive" },
        { label: "Focus", value: "React, Next.js, interface design, motion" },
      ],
    },
    capabilities: {
      label: "Capabilities",
      title: "One loop: design, build, ship.",
      intro: "Three things I actually do on a project, in the order they happen.",
      items: [
        {
          title: "Design",
          body: "Interface layout, type, and motion decided in Figma and in the browser.",
        },
        {
          title: "Build",
          body: "Next.js and React front ends, component by component, with code I can maintain.",
        },
        {
          title: "Ship",
          body: "Git, Vercel, real domains. Every project on this site is live and linked.",
        },
      ],
    },
    marquee: ["Web developer", "Interface designer", "Multimedia background", "Next.js", "React"],
    closing: {
      label: "Next",
      title: "Need a site that feels considered?",
      body: "Email is the fastest route. Jakarta, GMT+7.",
      cta: "Start a conversation",
    },
    toolbox: {
      label: "Toolbox",
      title: "The working set.",
      intro: "Grouped by how I actually use them. Familiar first, basic where I am still learning.",
    },
    experience: {
      label: "Experience",
      title: "Where I learned the craft.",
      intro: "Production work, student organising, and a multimedia foundation.",
    },
    highlights: {
      label: "Highlights",
      title: "Facts, not vanity metrics.",
      intro: "Numbers taken from what is actually on this site and in my CV.",
      counters: [
        { value: 6, label: "Shipped projects" },
        { value: 3, label: "Experience entries" },
        { value: 2, label: "Education entries" },
        { value: 3, label: "Languages" },
      ],
    },
    contact: {
      label: "Contact",
      title: "Let us build something.",
      body: "Email is the fastest way to reach me. I read everything and reply when I can.",
      cta: "Start a conversation",
      emailLabel: "Email",
      socialsLabel: "Find me",
    },
  },
  about: {
    meta: {
      title: "About",
      description: "Background, education, skills, and experience of Raditya Ananda Satria.",
    },
    label: "About",
    title: "Designer by training. Developer by practice.",
    intro:
      "I am Raditya Ananda Satria, a front-end developer and designer in Jakarta. I build with Next.js and React, and I bring a multimedia background to the details.",
    profileLabel: "Profile",
    profile: [
      "I am Raditya Ananda Satria, based in Jakarta, Indonesia. I build web interfaces with Next.js and React, and I design them too. My path started in multimedia: graphic design, video editing, and content production, which still shapes how I approach layout, rhythm, and detail.",
      "Today I study Sistem Informasi at Universitas Bina Sarana Informatika and keep shipping personal and team projects, from AI learning tools to event ticketing and business apps.",
    ],
    experienceLabel: "Experience",
    educationLabel: "Education",
    skillsLabel: "Skills",
    languagesLabel: "Languages",
    photoAlt: "Portrait of Raditya Ananda Satria against a deep red backdrop",
    photoLabel: "RA / 001",
    photoCaption: "Jakarta / 6.2088 S, 106.8456 E",
    factsLabel: "At a glance",
    facts: [
      { label: "Location", value: "Jakarta, Indonesia" },
      { label: "Education", value: "Sistem Informasi, UBSI (2025 - now)" },
      { label: "Languages", value: "Indonesian active, English and Korean passive" },
      { label: "Focus", value: "React, Next.js, interface design, motion" },
    ],
    cvNote: "Full CV available on request.",
  },
  work: {
    meta: {
      title: "Work",
      description: "Selected projects by Raditya Ananda Satria.",
    },
    label: "Index / Work",
    title: "Selected projects",
    intro: "Personal and team projects shipped on the web. Every entry has a detail page and a live link.",
    filterLabel: "Filter projects",
    featuredLabel: "Featured projects",
    detail: {
      overview: "Overview",
      brief: "What it is",
      stackLabel: "Stack",
      roleLabel: "Role",
      yearLabel: "Year",
      liveLabel: "Live site",
      screensLabel: "Screens",
      nextLabel: "Next project",
    },
  },
  contact: {
    meta: {
      title: "Contact",
      description: "Contact Raditya Ananda Satria by email.",
    },
    label: "Contact",
    title: "Let us build something.",
    intro: "Tell me what you are making. Email is the fastest route; the form opens your mail client if no delivery channel is configured.",
    emailLabel: "Email",
    write: "Write directly",
    baseLabel: "Base",
    baseTitle: "Jakarta, Indonesia",
    baseBody: "Based in Jakarta, GMT+7. Email is the fastest way to reach me.",
    form: {
      label: "Message",
      title: "Send a note",
      name: "Name",
      email: "Email",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@example.com",
      messagePlaceholder: "What are you building?",
      send: "Send message",
      sending: "Sending",
      successTitle: "Message ready.",
      successBody: "Your mail client should open with the message. If it does not, copy the email address above.",
      error: "Something went wrong. Email me directly instead.",
      fallback: "This form uses your mail client because no delivery service is configured yet.",
      required: "This field is required.",
      invalidEmail: "Enter a valid email address.",
    },
  },
  footer: {
    note: "Made in Jakarta",
    rights: "All rights reserved",
    socials: "Social links",
  },
  notFound: {
    label: "404",
    title: "This page went off-grid.",
    body: "The link might be old, or the page has moved. The work index is a good place to restart.",
    back: "Back home",
    work: "Browse work",
  },
  command: {
    label: "Command palette",
    placeholder: "Jump to a page, switch theme, copy email",
    empty: "No matches.",
    pages: "Pages",
    actions: "Actions",
    socials: "Socials",
    theme: "Toggle theme",
    language: "Switch language",
    copyEmail: "Copy email address",
    copied: "Email copied",
    hint: "Cmd/Ctrl + K",
  },
  projectCopy: {
    clarise: {
      title: "Clarise",
      category: "Product / Learning",
      summary:
        "AI-powered adaptive learning platform with interactive courses, an AI tutor, gamification, and an AI course builder.",
      description: [
        "Clarise is an AI-powered adaptive learning platform. It combines interactive courses with an AI tutor, gamification through XP, badges, and streaks, and an AI Course Builder.",
        "Built with Next.js on a custom domain. The interface has to stay clear while the product carries a lot of learning state.",
      ],
      imageAlt: "Clarise landing page with a dark interface and course cards",
    },
    "safetrack-depin": {
      title: "SafeTrack Depin",
      category: "Hackathon / DePIN",
      summary:
        "IoT and AI logistics system for real-time shipment security monitoring, built for the 0G hackathon DePIN track.",
      description: [
        "SafeTrack is an IoT and AI logistics system for real-time shipment security monitoring, built for the 0G hackathon DePIN track.",
        "The project pairs live tracking with an interface that surfaces shipment state and security events as they happen.",
      ],
      imageAlt: "SafeTrack Depin landing page with shipment clarity messaging",
    },
    vascode: {
      title: "VasCode Creative",
      category: "Agency / Web",
      summary:
        "Company profile for a creative agency and production house covering web, video, photography, and graphic design.",
      description: [
        "VasCode Creative is a company profile for a creative agency and production house. The work spans web development, video, photography, and graphic design.",
        "The site had to present several production disciplines without losing one clear identity.",
      ],
      imageAlt: "VasCode Creative company profile landing page",
    },
    "pentas-seni": {
      title: "Pentas Seni TK Aisyiyah 21",
      category: "Event / Ticketing",
      summary:
        "Registration and digital e-ticket app for a school performance event, used by real attendees.",
      description: [
        "A registration and digital e-ticket app for the Pentas Seni TK Aisyiyah 21 school performance.",
        "It was used by real attendees, so the flow had to work on a phone, in a queue, without confusion.",
      ],
      imageAlt: "Pentas Seni registration and e-ticket landing page",
    },
    "nana-bites": {
      title: "Nana Bites",
      category: "Commerce / Pre-order",
      summary:
        "Landing page and pre-order system for a snack business, integrated with WhatsApp ordering.",
      description: [
        "Nana Bites is a landing page and pre-order system for a snack business.",
        "Orders route into WhatsApp, keeping the flow close to how the business already talks to customers.",
      ],
      imageAlt: "Nana Bites snack landing page with pre-order section",
    },
    scaffdev: {
      title: "Scaffdev",
      category: "Tooling / Dev",
      summary:
        "Scaffolding generator for Indonesian developers: ready-to-run Next.js and Laravel starters with prebuilt UI, best-practice folder structure, and curated local integrations.",
      description: [
        "Scaffdev generates a new project from one npx command: prebuilt UI, best-practice folder structure, an .env.example, and a SETUP.md guide. It currently ships Next.js and Laravel templates.",
        "The site lists six ready-to-generate templates, a Builder for custom integration combinations, and curated integrations: Supabase, Xendit, Cloudinary, and Resend. The source is available under the Shield licence.",
      ],
      imageAlt: "Scaffdev landing page for the Next.js and Laravel starter kit generator",
    },
  },
  experience: [
    {
      role: "Graphic Design Staff",
      organization: "Kominfo Division, Himpunan Mahasiswa Sistem Informasi UBSI",
      period: "2025 - now",
      summary: "Posters, banners, Instagram feeds, and flyers.",
    },
    {
      role: "Content Design and Editor",
      organization: "PKL at KFT",
      period: "Apr - Sep 2023",
      summary:
        "Social media visuals, photo and video editing in a professional production environment.",
    },
    {
      role: "Videographer and Editor",
      organization: "SMK Pusaka 1 Jakarta competency exam",
      period: "2024",
      summary: "Full video production for the competency exam.",
    },
  ],
  education: [
    {
      role: "Sistem Informasi",
      organization: "Universitas Bina Sarana Informatika",
      period: "2025 - now",
      summary: "Current degree.",
    },
    {
      role: "Multimedia",
      organization: "SMK Pusaka 1 Jakarta",
      period: "2021 - 2024",
      summary: "Vocational foundation in multimedia.",
    },
  ],
  skillGroups: [
    {
      label: "Web",
      items: [
        { name: "React", icon: "react", level: "Familiar" },
        { name: "Next.js", icon: "next", level: "Familiar" },
        { name: "HTML", icon: "html", level: "Familiar" },
        { name: "CSS", icon: "css", level: "Familiar" },
        { name: "JavaScript", icon: "js", level: "Familiar" },
        { name: "Python", icon: "python", level: "Basic" },
        { name: "PHP", icon: "php", level: "Basic" },
        { name: "Laravel", icon: "laravel", level: "Basic" },
        { name: "MySQL", icon: "mysql", level: "Basic" },
      ],
    },
    {
      label: "Design",
      items: [
        { name: "Figma", icon: "figma", level: "Familiar" },
        { name: "Canva", icon: "canva", level: "Familiar" },
        { name: "Tailwind CSS", icon: "tailwind", level: "Familiar" },
      ],
    },
    {
      label: "Content",
      items: [
        { name: "CapCut", icon: "capcut", level: "Familiar" },
        { name: "Video", icon: "film", level: "Familiar" },
        { name: "Photography", icon: "camera", level: "Familiar" },
      ],
    },
    {
      label: "Ship",
      items: [
        { name: "Git", icon: "git", level: "Familiar" },
        { name: "GitHub", icon: "github", level: "Familiar" },
        { name: "Vercel", icon: "vercel", level: "Familiar" },
      ],
    },
  ],
  languages: [
    { label: "Indonesian", level: "Active" },
    { label: "English", level: "Passive" },
    { label: "Korean", level: "Passive" },
  ],
  educationFact: "Sistem Informasi, UBSI (2025 - now)",
  focusFact: "React, Next.js, interface design, motion",
} satisfies Dictionary;