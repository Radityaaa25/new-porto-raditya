import { getLocale } from "next-intl/server";

import { ArrowLeftIcon } from "@/components/icons";
import { getDictionary, isLocale } from "@/content";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const locale = await getLocale();
  const content = getDictionary(isLocale(locale) ? locale : "en");

  return (
    <section className="gutter-x section-y">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-6">
        <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">
          {content.notFound.label}
        </span>
        <h1 className="font-display text-h1 max-w-[16ch] tracking-[-0.03em]">
          {content.notFound.title}
        </h1>
        <p className="text-muted max-w-[var(--measure-wide)]">{content.notFound.body}</p>
        <Link
          href="/"
          className="group inline-flex w-fit items-center gap-2 font-mono text-meta uppercase tracking-[0.14em]"
        >
          <ArrowLeftIcon
            size={16}
            className="duration-ui ease-expo group-hover:-translate-x-0.5 transition-transform"
          />
          {content.notFound.back}
        </Link>
      </div>
    </section>
  );
}
