export type Locale = "en" | "id";

export type ProjectRole = "Personal" | "Team";

export type ProjectBase = {
  slug: string;
  url: string;
  role: ProjectRole;
  year: string;
  stack: ReadonlyArray<string>;
  details: boolean;
};

export type ProjectCopy = {
  title: string;
  category: string;
  summary: string;
  description: ReadonlyArray<string>;
  imageAlt: string;
};

export type Project = ProjectBase & ProjectCopy;

export type ExperienceItem = {
  role: string;
  organization: string;
  period: string;
  summary: string;
};

export type SkillItem = {
  name: string;
  icon: string;
  level: string;
};

export type SkillGroup = {
  label: string;
  items: ReadonlyArray<SkillItem>;
};

export type Fact = {
  label: string;
  value: string;
};

export type NavItem = {
  key: "work" | "about" | "contact";
  href: string;
  label: string;
};

export type Counter = {
  value: number;
  suffix?: string;
  label: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogAlt: string;
  };
  nav: ReadonlyArray<NavItem>;
  ui: {
    primary: string;
    footerNav: string;
    menu: string;
    openMenu: string;
    closeMenu: string;
    siteMenu: string;
    language: string;
    languageHint: string;
    themeDark: string;
    themeLight: string;
    copyEmail: string;
    copied: string;
    copyFailed: string;
    view: string;
    visitSite: string;
    externalNote: string;
    all: string;
    personal: string;
    team: string;
    close: string;
    backHome: string;
    nextProject: string;
    backToWork: string;
    role: string;
    year: string;
    stack: string;
    index: string;
    loading: string;
    skipToContent: string;
  };
  preloader: {
    statuses: ReadonlyArray<string>;
    sign: string;
  };
  hero: {
    kicker: string;
    lines: readonly [string, string];
    accent: string;
    intro: string;
    selectedWork: string;
    shippedLabel: string;
    scroll: string;
    socials: string;
    photoAlt: string;
  };
  home: {
    statement: { label: string; title: string; body: string };
    work: {
      label: string;
      title: string;
      intro: string;
      viewAll: string;
      featured: string;
      index: string;
      previewHint: string;
    };
    about: {
      label: string;
      title: string;
      body: ReadonlyArray<string>;
      cta: string;
      factsLabel: string;
      facts: ReadonlyArray<Fact>;
    };
    process: {
      label: string;
      title: string;
      intro: string;
      steps: ReadonlyArray<{ title: string; body: string }>;
    };
    aboutTeaser: {
      label: string;
      title: string;
      body: string;
      cta: string;
      currentlyLabel: string;
      currently: ReadonlyArray<string>;
    };
    capabilities: {
      label: string;
      title: string;
      intro: string;
      items: ReadonlyArray<{ title: string; body: string }>;
    };
    marquee: ReadonlyArray<string>;
    closing: { label: string; title: string; body: string; cta: string };
    toolbox: { label: string; title: string; intro: string };
    experience: { label: string; title: string; intro: string };
    highlights: { label: string; title: string; intro: string; counters: ReadonlyArray<Counter> };
    contact: {
      label: string;
      title: string;
      body: string;
      cta: string;
      emailLabel: string;
      socialsLabel: string;
    };
  };
  about: {
    meta: { title: string; description: string };
    label: string;
    title: string;
    intro: string;
    profileLabel: string;
    profile: ReadonlyArray<string>;
    experienceLabel: string;
    educationLabel: string;
    skillsLabel: string;
    languagesLabel: string;
    photoAlt: string;
    photoLabel: string;
    photoCaption: string;
    factsLabel: string;
    facts: ReadonlyArray<Fact>;
    cvNote: string;
  };
  work: {
    meta: { title: string; description: string };
    label: string;
    title: string;
    intro: string;
    filterLabel: string;
    featuredLabel: string;
    detail: {
      overview: string;
      brief: string;
      problem: string;
      approach: string;
      stackLabel: string;
      roleLabel: string;
      yearLabel: string;
      liveLabel: string;
      screensLabel: string;
      nextLabel: string;
    };
  };
  contact: {
    meta: { title: string; description: string };
    label: string;
    title: string;
    intro: string;
    emailLabel: string;
    write: string;
    baseLabel: string;
    baseTitle: string;
    baseBody: string;
    form: {
      label: string;
      title: string;
      name: string;
      email: string;
      message: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      send: string;
      sending: string;
      successTitle: string;
      successBody: string;
      error: string;
      fallback: string;
      required: string;
      invalidEmail: string;
    };
  };
  footer: {
    backToTop: string;
    note: string;
    rights: string;
    socials: string;
  };
  notFound: {
    label: string;
    title: string;
    body: string;
    back: string;
    work: string;
  };
  command: {
    label: string;
    placeholder: string;
    empty: string;
    pages: string;
    actions: string;
    socials: string;
    theme: string;
    language: string;
    copyEmail: string;
    copied: string;
    hint: string;
  };
  projectCopy: Record<string, ProjectCopy>;
  experience: ReadonlyArray<ExperienceItem>;
  education: ReadonlyArray<ExperienceItem>;
  skillGroups: ReadonlyArray<SkillGroup>;
  languages: ReadonlyArray<{ label: string; level: string }>;
  educationFact: string;
  focusFact: string;
};