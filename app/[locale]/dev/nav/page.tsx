import type { Metadata } from "next";

import { NavVariantSwitcher } from "@/components/dev/NavVariantSwitcher";

export const metadata: Metadata = {
  title: "Navigation variants",
  robots: { index: false, follow: false },
};

export default function NavDevPage() {
  return (
    <section className="gutter-x section-y">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">
            Dev / Navigation
          </span>
          <h1 className="font-display text-h1 tracking-[-0.03em]">Floating nav variants</h1>
          <p className="text-muted max-w-[var(--measure-wide)]">
            Switch the floating navigation live. The default comes from navVariant in content/site.ts,
            while preview and development hosts also accept a ?nav= query parameter.
          </p>
        </div>
        <NavVariantSwitcher />
      </div>
    </section>
  );
}
