import type { Metadata } from "next";

import { DevPlayground } from "@/components/dev/DevPlayground";

export const metadata: Metadata = {
  title: "Motion dev",
  robots: { index: false, follow: false },
};

export default function DevPage() {
  return (
    <section className="gutter-x section-y">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-meta uppercase tracking-[0.18em] text-muted">Dev</span>
          <h1 className="font-display text-h1 tracking-[-0.03em]">Motion playground</h1>
          <p className="max-w-[var(--measure-wide)] text-muted">
            Internal check page for tokens and primitives. Not part of the public site.
          </p>
        </div>
        <DevPlayground />
      </div>
    </section>
  );
}
