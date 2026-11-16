"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

import { ArrowUpRightIcon } from "@/components/icons";
import { StackIcons } from "@/components/work/StackIcons";
import { Link } from "@/i18n/navigation";

type WorkItem = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: ReadonlyArray<string>;
  index: string;
};

export function WorkIndex({
  projects,
  hint,
  stackLabel,
}: {
  projects: ReadonlyArray<WorkItem>;
  hint: string;
  stackLabel: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [canPreview, setCanPreview] = useState(false);
  const portal = useSyncExternalStore(
    () => () => {},
    () => document.body,
    () => null,
  );
  const previewRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<{
    x: (value: number) => void;
    y: (value: number) => void;
    rotation: (value: number) => void;
  } | null>(null);
  const point = useRef({ x: 0, y: 0, previousX: 0 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanPreview(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!canPreview) return;
    for (const project of projects) {
      const image = new window.Image();
      image.src = `/media/projects/${project.slug}/cover-800.webp`;
    }
  }, [canPreview, projects]);

  useEffect(() => {
    const preview = previewRef.current;
    if (!active || !preview) {
      followRef.current = null;
      return;
    }

    const x = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3.out" });
    const y = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3.out" });
    const rotation = gsap.quickTo(preview, "rotation", { duration: 0.5, ease: "power3.out" });
    followRef.current = { x, y, rotation };

    gsap.fromTo(
      preview,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.32, ease: "power3.out" },
    );

    const halfWidth = 160;
    const halfHeight = 100;
    const initialX = Math.min(Math.max(point.current.x + 28, halfWidth), window.innerWidth - halfWidth);
    const initialY = Math.min(Math.max(point.current.y + 28, halfHeight), window.innerHeight - halfHeight);
    gsap.set(preview, { x: initialX - halfWidth, y: initialY - halfHeight });

    return () => {
      followRef.current = null;
      gsap.killTweensOf(preview);
    };
  }, [active]);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!canPreview) return;
    point.current.x = event.clientX;
    point.current.y = event.clientY;
    const width = 320;
    const height = 200;
    const x = Math.min(Math.max(event.clientX + 28, width / 2), window.innerWidth - width / 2);
    const y = Math.min(Math.max(event.clientY + 28, height / 2), window.innerHeight - height / 2);
    followRef.current?.x(x - width / 2);
    followRef.current?.y(y - height / 2);
    followRef.current?.rotation(
      Math.min(Math.max((event.clientX - point.current.previousX) * 0.6, -7), 7),
    );
    point.current.previousX = event.clientX;
  }

  const activeProject = projects.find((project) => project.slug === active);

  return (
    <div onPointerMove={handleMove} onPointerLeave={() => setActive(null)}>
      <p className="text-subtle mb-4 font-mono text-meta uppercase tracking-[0.14em] [@media(hover:none)]:hidden">
        {hint}
      </p>

      <ul className="border-line border-t">
        {projects.map((project) => (
          <li key={project.slug} className="border-line group relative border-b">
            <Link
              data-cursor="view"
              href={`/work/${project.slug}`}
              aria-label={project.title}
              onPointerEnter={() => setActive(project.slug)}
              onFocus={() => setActive(project.slug)}
              onBlur={() => setActive(null)}
              className="absolute inset-0 z-base rounded-sm outline-offset-4"
            />
            <div className="pointer-events-none relative z-content grid gap-4 py-8 md:grid-cols-12 md:items-baseline">
              <span className="text-subtle font-mono text-meta md:col-span-1">{project.index}</span>
              <span className="font-display text-h3 group-hover:text-accent tracking-[-0.02em] transition-colors md:col-span-4">
                {project.title}
              </span>
              <span className="text-muted md:col-span-4">{project.summary}</span>
              <span className="text-subtle flex items-center justify-between gap-4 font-mono text-meta uppercase tracking-[0.14em] md:col-span-3 md:justify-end">
                <span className="flex flex-col items-start gap-2 md:items-end">
                  <span>{project.role}</span>
                  <StackIcons
                    items={project.stack}
                    label={stackLabel}
                    className="pointer-events-auto"
                  />
                </span>
                <ArrowUpRightIcon
                  size={16}
                  className="duration-ui ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0 transition-transform"
                />
              </span>
            </div>
          </li>
        ))}
      </ul>

      {portal && canPreview && activeProject
        ? createPortal(
            <div
              ref={previewRef}
              aria-hidden="true"
              className="border-line bg-surface pointer-events-none fixed left-0 top-0 z-hud h-[200px] w-[320px] overflow-hidden rounded-sm border opacity-0 shadow-lg"
            >
              <Image
                src={`/media/projects/${activeProject.slug}/cover-800.webp`}
                alt=""
                width={800}
                height={500}
                sizes="320px"
                className="h-full w-full object-cover"
              />
            </div>,
            portal,
          )
        : null}
    </div>
  );
}
