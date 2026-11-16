import type { Metadata } from "next";

import { AssetGallery } from "@/components/dev/AssetGallery";

export const metadata: Metadata = {
  title: "Asset archive",
  robots: { index: false, follow: false },
};

export default function AssetsPage() {
  return (
    <section className="gutter-x section-y">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
            Dev / Phase 4
          </span>
          <h1 className="font-display text-h1 tracking-[-0.03em]">Asset archive</h1>
          <p className="max-w-[var(--measure-wide)] text-muted">
            Production check for the icon set, Moni, procedural textures, live project captures,
            social icons, and UI sounds. Internal page, not part of the public site.
          </p>
        </div>
        <AssetGallery />
      </div>
    </section>
  );
}
