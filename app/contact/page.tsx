import type { Metadata } from "next";

import { ArrowUpRightIcon, MailIcon } from "@/components/icons";
import { LiveClock } from "@/components/hud/LiveClock";
import { CopyEmail } from "@/components/hud/CopyEmail";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Raditya Ananda Satria by email.",
};

export default function ContactPage() {
  return (
    <section className="gutter-x section-y">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-14">
        <div className="flex flex-col gap-6">
          <span className="font-mono text-meta uppercase tracking-[0.18em] text-muted">Contact</span>
          <SplitText
            as="h1"
            text="Let us build something."
            mode="lines"
            trigger="mount"
            className="font-display text-display max-w-[16ch] tracking-[-0.035em]"
          />
        </div>

        <Reveal className="flex flex-col gap-6">
          <a
            href={`mailto:${site.email}`}
            className="group flex flex-col gap-2 border-line border-t pt-6"
          >
            <span className="flex items-center gap-2 font-mono text-meta uppercase tracking-[0.14em] text-subtle">
              <MailIcon size={14} />
              Email
            </span>
            <span className="text-h3 tracking-[-0.02em] transition-colors group-hover:text-accent">
              {site.email}
            </span>
            <span className="mt-2 flex items-center gap-2 font-mono text-meta uppercase tracking-[0.14em] text-subtle">
              Write directly
              <ArrowUpRightIcon size={14} />
            </span>
          </a>

          <div className="flex flex-wrap items-center gap-4">
            <CopyEmail email={site.email} />
            <LiveClock className="text-subtle uppercase tracking-[0.14em]" />
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-12">
          <h2 className="font-mono text-meta uppercase tracking-[0.18em] text-muted md:col-span-3">
            Base
          </h2>
          <Reveal className="flex flex-col gap-2 md:col-span-7">
            <p className="text-h3 tracking-[-0.02em]">{site.location}</p>
            <p className="text-muted">
              Based in Jakarta, {site.timeZoneLabel}. Email is the fastest way to reach me.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
