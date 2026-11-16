"use client";

import { ArrowUpRightIcon, GitHubIcon, InstagramIcon, MailIcon } from "@/components/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { socials, type Social, type SocialKey } from "@/content/site";
import { cn } from "@/lib/utils/cn";

const ICONS: Record<SocialKey, typeof GitHubIcon> = {
  github: GitHubIcon,
  instagram: InstagramIcon,
  email: MailIcon,
};

const isExternal = (social: Social) => social.key !== "email";
const visibleHandle = (social: Social) =>
  social.handle && social.handle !== "TODO" ? social.handle : social.label;

function linkProps(social: Social) {
  if (!isExternal(social)) return { href: social.href };
  return { href: social.href, target: "_blank", rel: "noopener noreferrer" };
}

type SocialIconsProps = {
  className?: string;
  labelled?: boolean;
  ariaLabel?: string;
};

export function SocialIcons({ className, labelled = false, ariaLabel }: SocialIconsProps) {
  return (
    <ul aria-label={ariaLabel} className={cn("flex flex-wrap items-center gap-2", className)}>
      {socials.map((social) => {
        const Icon = ICONS[social.key];
        return (
          <li key={social.key}>
            <a
              {...linkProps(social)}
              aria-label={`${social.label}: ${visibleHandle(social)}`}
              className={cn(
                "border-line hover:border-accent hover:text-accent focus-visible:border-accent group inline-flex h-10 items-center justify-center gap-2 rounded-full border transition-colors",
                labelled ? "px-4" : "w-10",
              )}
            >
              <Icon size={16} className="shrink-0" />
              {labelled ? (
                <span className="font-mono text-meta uppercase tracking-[0.12em]">{social.label}</span>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function SocialRows({ className, ariaLabel }: { className?: string; ariaLabel?: string }) {
  return (
    <ul aria-label={ariaLabel} className={cn("border-line border-t", className)}>
      {socials.map((social, index) => {
        const Icon = ICONS[social.key];
        return (
          <li key={social.key} className="border-line border-b">
            <Magnetic strength={0.045} className="block w-full">
              <a
                {...linkProps(social)}
                aria-label={`${social.label}: ${visibleHandle(social)}`}
                className="group flex items-center justify-between gap-4 py-6 md:py-8"
              >
                <span className="flex min-w-0 items-baseline gap-4 md:gap-8">
                  <span className="text-subtle font-mono text-meta tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="text-subtle flex items-center gap-2 font-mono text-meta uppercase tracking-[0.14em]">
                      <Icon size={14} />
                      {social.label}
                    </span>
                    <span className="font-display text-h2 group-hover:text-accent truncate tracking-[-0.02em] transition-colors">
                      {visibleHandle(social)}
                    </span>
                  </span>
                </span>
                <span className="border-line group-hover:border-accent relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-colors md:size-12">
                  <ArrowUpRightIcon
                    size={20}
                    className="duration-ui ease-expo absolute transition-transform group-hover:translate-x-4 group-hover:-translate-y-4"
                  />
                  <ArrowUpRightIcon
                    size={20}
                    className="duration-ui ease-expo absolute -translate-x-4 translate-y-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </span>
              </a>
            </Magnetic>
          </li>
        );
      })}
    </ul>
  );
}
