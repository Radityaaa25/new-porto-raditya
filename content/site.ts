export const site = {
  name: "Raditya Ananda Satria",
  shortName: "Raditya",
  initials: "RA",
  role: "Web developer and designer",
  location: "Jakarta, Indonesia",
  timeZone: "Asia/Jakarta",
  timeZoneLabel: "GMT+7",
  email: "radityaanandasatria@gmail.com",
  githubUrl: "https://github.com/Radityaaa25",
  instagramUrl: "https://instagram.com/rdityaas",
  instagramHandle: "rdityaas",
} as const;

export type SocialKey = "github" | "instagram" | "email";

export type Social = {
  key: SocialKey;
  label: string;
  href: string;
  handle?: string;
};

export const socials: ReadonlyArray<Social> = [
  { key: "github", label: "GitHub", href: site.githubUrl, handle: "Radityaaa25" },
  { key: "instagram", label: "Instagram", href: site.instagramUrl, handle: site.instagramHandle },
  { key: "email", label: "Email", href: `mailto:${site.email}`, handle: site.email },
];

export const socialByKey = (key: SocialKey): Social =>
  socials.find((social) => social.key === key) ?? socials[0];

export const instagramConfigured = !site.instagramUrl.endsWith("instagram.com/");