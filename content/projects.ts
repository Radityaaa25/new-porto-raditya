export type ProjectRole = "Personal" | "Team";

export type Project = {
  slug: string;
  title: string;
  url: string;
  role: ProjectRole;
  summary: string;
  stack?: ReadonlyArray<string>;
};

// TODO: summaries are drafted from AGENTS.md and need Raditya's approval.
// TODO: team projects: confirm whether teammates are named.
export const projects: ReadonlyArray<Project> = [
  {
    slug: "clarise",
    title: "Clarise",
    url: "https://clarise.my.id",
    role: "Personal",
    summary:
      "AI-powered adaptive learning platform with interactive courses, an AI tutor, gamification, and an AI course builder.",
    stack: ["Next.js"],
  },
  {
    slug: "safetrack-depin",
    title: "SafeTrack Depin",
    url: "https://safetrack-depin.vercel.app",
    role: "Team",
    summary:
      "IoT and AI logistics system for real-time shipment security monitoring, built for the 0G hackathon DePIN track.",
  },
  {
    slug: "vascode",
    title: "VasCode Creative",
    url: "https://vascode.vercel.app",
    role: "Team",
    summary:
      "Company profile for a creative agency and production house covering web, video, photography, and graphic design.",
  },
  {
    slug: "pentas-seni",
    title: "Pentas Seni TK Aisyiyah 21",
    url: "https://pentas-seni-tk-v2.vercel.app",
    role: "Personal",
    summary:
      "Registration and digital e-ticket app for a school performance event, used by real attendees.",
  },
  {
    slug: "nana-bites",
    title: "Nana Bites",
    url: "https://nana-bites.vercel.app",
    role: "Personal",
    summary: "Landing page and pre-order system for a snack business, integrated with WhatsApp ordering.",
  },
  {
    slug: "joy-reminder",
    title: "Joy Reminder",
    url: "https://joy-reminder.vercel.app",
    role: "Personal",
    summary: "Archive management and tax-expiry reminder app for business customers.",
  },
];
