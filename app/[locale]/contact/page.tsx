import type { Metadata } from "next";

import { ArrowUpRightIcon, MailIcon } from "@/components/icons";
import { LiveClock } from "@/components/hud/LiveClock";
import { CopyEmail } from "@/components/hud/CopyEmail";
import { ContactForm } from "@/components/contact/ContactForm";
import { OrbitMark } from "@/components/graphics/OrbitMark";
import { Parallax } from "@/components/motion/Parallax";
import { ScrollScrubText } from "@/components/motion/ScrollScrubText";
import { Moni } from "@/components/mascot/Moni";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { SocialRows } from "@/components/socials/SocialLinks";
import { getDictionary, isLocale, type Locale } from "@/content";
import { site } from "@/content/site";
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
    <article>
      <section className="gutter-x section-y relative isolate overflow-hidden" aria-label={content.contact.label}>
        <OrbitMark className="absolute -right-24 top-10 z-below hidden h-[32rem] w-[32rem] opacity-25 lg:block" />
        <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-6">
          <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">{content.contact.label}</span>
          <SplitText as="h1" text={content.contact.title} mode="lines" trigger="mount" className="font-display text-display max-w-[16ch] tracking-[-0.035em]" />
          <ScrollScrubText text={content.contact.intro} className="text-muted max-w-[var(--measure-wide)]" />
        </div>
      </section>

      <section className="gutter-x section-y" aria-label={content.contact.emailLabel}>
        <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-8">
          <Reveal className="flex flex-col gap-6">
            <a href={`mailto:${site.email}`} className="border-line group flex flex-col gap-2 border-t pt-6">
              <span className="text-subtle flex items-center gap-2 font-mono text-meta uppercase tracking-[0.14em]">
                <MailIcon size={14} /> {content.contact.emailLabel}
              </span>
              <span className="text-h3 group-hover:text-accent tracking-[-0.02em] transition-colors">{site.email}</span>
              <span className="text-subtle mt-2 flex items-center gap-2 font-mono text-meta uppercase tracking-[0.14em]">
                {content.contact.write} <ArrowUpRightIcon size={14} />
              </span>
            </a>
            <div className="flex flex-wrap items-center gap-4">
              <CopyEmail email={site.email} />
              <LiveClock className="text-subtle uppercase tracking-[0.14em]" />
            </div>
          </Reveal>
          <SocialRows ariaLabel={content.home.contact.socialsLabel} />
        </div>
      </section>

      <section className="gutter-x section-y" aria-label={content.contact.form.label}>
        <div className="mx-auto w-full max-w-[var(--container-max)]">
          <ContactForm />
        </div>
      </section>

      <section className="gutter-x section-y border-line border-t" aria-label={content.contact.baseLabel}>
        <div className="mx-auto grid w-full max-w-[var(--container-max)] items-end gap-8 md:grid-cols-12">
          <div className="flex flex-col gap-2 md:col-span-7">
            <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">{content.contact.baseLabel}</span>
            <p className="font-display text-h1 tracking-[-0.03em]">{content.contact.baseTitle}</p>
            <ScrollScrubText text={content.contact.baseBody} className="text-muted max-w-[var(--measure-wide)]" />
          </div>
          <Parallax className="md:col-span-5" amount={10}>
            <Moni pose="celebrate" className="mx-auto w-full max-w-[220px]" />
          </Parallax>
        </div>
      </section>
    </article>
  );
}
