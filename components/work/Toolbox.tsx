"use client";

import { useRef, type ComponentType } from "react";
import gsap from "gsap";

import {
  CameraIcon,
  CanvaIcon,
  CodeIcon,
  CssIcon,
  FigmaIcon,
  FilmIcon,
  GitIcon,
  GitHubIcon,
  HtmlIcon,
  JavaScriptIcon,
  LaravelIcon,
  MySqlIcon,
  NextIcon,
  PhpIcon,
  PythonIcon,
  ReactIcon,
  TailwindIcon,
  VercelIcon,
  type IconProps,
} from "@/components/icons";
import type { SkillGroup } from "@/content/types";

const icons: Record<string, ComponentType<IconProps>> = {
  react: ReactIcon,
  next: NextIcon,
  html: HtmlIcon,
  css: CssIcon,
  js: JavaScriptIcon,
  python: PythonIcon,
  php: PhpIcon,
  laravel: LaravelIcon,
  mysql: MySqlIcon,
  figma: FigmaIcon,
  canva: CanvaIcon,
  tailwind: TailwindIcon,
  capcut: FilmIcon,
  film: FilmIcon,
  camera: CameraIcon,
  git: GitIcon,
  github: GitHubIcon,
  vercel: VercelIcon,
};

function ToolItem({
  name,
  icon,
  level,
}: {
  name: string;
  icon: string;
  level: string;
}) {
  const markRef = useRef<HTMLSpanElement>(null);
  const Icon = icons[icon] ?? CodeIcon;

  function handleMove(event: React.PointerEvent<HTMLLIElement>) {
    const mark = markRef.current;
    if (!mark || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.18;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.24;
    gsap.to(mark, { x, y, rotate: x * 1.8, duration: 0.4, ease: "power3.out", overwrite: "auto" });
  }

  function reset() {
    const mark = markRef.current;
    if (!mark) return;
    gsap.to(mark, { x: 0, y: 0, rotate: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
  }

  return (
    <li
      tabIndex={0}
      aria-label={`${name}, ${level}`}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
      className="group/tool border-line relative flex items-center justify-between gap-3 border-t py-2 focus-visible:underline"
    >
      <span className="text-body">{name}</span>
      <span
        ref={markRef}
        aria-hidden="true"
        className="text-muted group-hover/tool:text-accent group-focus/tool:text-accent pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 scale-50 opacity-0 transition-[opacity,transform,color] duration-ui ease-expo group-hover/tool:scale-100 group-hover/tool:opacity-100 group-focus/tool:scale-100 group-focus/tool:opacity-100"
      >
        <Icon size={18} />
      </span>
    </li>
  );
}

export function Toolbox({ groups }: { groups: ReadonlyArray<SkillGroup> }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-3">
          <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
            {group.label}
          </span>
          <ul className="flex flex-col">
            {group.items.map((item) => (
              <ToolItem key={item.name} {...item} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
