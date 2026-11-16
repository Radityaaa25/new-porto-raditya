import type { Metadata } from "next";

import { ArrowUpRightIcon, MailIcon } from "@/components/icons";
import { LiveClock } from "@/components/hud/LiveClock";
import { CopyEmail } from "@/components/hud/CopyEmail";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { getDictionary, isLocale, type Locale } from "@/content";
import { site } from "@/content/site";
import { SocialRows } from "@/components/socials/SocialLinks";
import { pageMetadata } from "@/lib/seo";

async function readLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) throw new Error("Unsupported locale");
  return locale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await readLocale(params);
  const content = getDictionary(locale);
  return pageMetadata(locale, "/contact", content.contact.meta.title, content.contact.meta.description);
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const content = getDictionary(locale);

  return (
    <section className="gutter-x section-y">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-14">
        <div className="flex flex-col gap-6">
          <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">
            {content.contact.label}
          </span>
          <SplitText
            as="h1"
            text={content.contact.title}
            mode="lines"
            trigger="mount"
            className="font-display text-display max-w-[16ch] tracking-[-0.035em]"
          />
          <p className="text-muted max-w-[var(--measure-wide)]">{content.contact.intro}</p>
        </div>

        <Reveal className="flex flex-col gap-6">
          <a
            href={`mailto:${site.email}`}
            className="border-line group flex flex-col gap-2 border-t pt-6"
          >
            <span className="text-subtle flex items-center gap-2 font-mono text-meta uppercase tracking-[0.14em]">
              <MailIcon size={14} />
              {content.contact.emailLabel}
            </span>
            <span className="text-h3 group-hover:text-accent tracking-[-0.02em] transition-colors">
              {site.email}
            </span>
            <span className="text-subtle mt-2 flex items-center gap-2 font-mono text-meta uppercase tracking-[0.14em]">
              {content.contact.write}
              <ArrowUpRightIcon size={14} />
            </span>
          </a>

          <div className="flex flex-wrap items-center gap-4">
            <CopyEmail email={site.email} />
            <LiveClock className="text-subtle uppercase tracking-[0.14em]" />
          </div>
        </Reveal>

        <SocialRows ariaLabel={content.home.contact.socialsLabel} />

        <div className="grid gap-6 md:grid-cols-12">
          <h2 className="text-muted font-mono text-meta uppercase tracking-[0.18em] md:col-span-3">
            {content.contact.baseLabel}
          </h2>
          <Reveal className="flex flex-col gap-2 md:col-span-7">
            <p className="text-h3 tracking-[-0.02em]">{content.contact.baseTitle}</p>
            <p className="text-muted">{content.contact.baseBody}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
