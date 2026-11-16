import Link from "next/link";

import { ArrowLeftIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="gutter-x section-y">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-6">
        <span className="font-mono text-meta uppercase tracking-[0.18em] text-muted">404</span>
        <h1 className="font-display text-h1 max-w-[16ch] tracking-[-0.03em]">
          This page went off-grid.
        </h1>
        <p className="max-w-[var(--measure-wide)] text-muted">
          The link might be old, or the page has moved. The work index is a good place to restart.
        </p>
        <Link
          href="/"
          className="group inline-flex w-fit items-center gap-2 font-mono text-meta uppercase tracking-[0.14em]"
        >
          <ArrowLeftIcon
            size={16}
            className="transition-transform duration-ui ease-expo group-hover:-translate-x-0.5"
          />
          Back home
        </Link>
      </div>
    </section>
  );
}
