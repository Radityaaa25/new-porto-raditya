"use client";

import { useState, type ComponentType } from "react";

import {
  BotIcon,
  CameraIcon,
  CloudinaryIcon,
  CodeIcon,
  CpuIcon,
  FilmIcon,
  GridIcon,
  LaravelIcon,
  NextIcon,
  ReactIcon,
  ResendIcon,
  SupabaseIcon,
  TicketIcon,
  WhatsAppIcon,
  XenditIcon,
  type IconProps,
} from "@/components/icons";

const icons: Record<string, ComponentType<IconProps>> = {
  "Next.js": NextIcon,
  React: ReactIcon,
  AI: BotIcon,
  IoT: CpuIcon,
  Video: FilmIcon,
  Photo: CameraIcon,
  Tickets: TicketIcon,
  WhatsApp: WhatsAppIcon,
  Laravel: LaravelIcon,
  Supabase: SupabaseIcon,
  Xendit: XenditIcon,
  Cloudinary: CloudinaryIcon,
  Resend: ResendIcon,
};

export function StackIcons({
  items,
  label,
  className = "",
  visible = false,
}: {
  items: ReadonlyArray<string>;
  label: string;
  className?: string;
  visible?: boolean;
}) {
  const [touchOpen, setTouchOpen] = useState(false);

  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        aria-label={label}
        aria-expanded={touchOpen}
        onClick={() => setTouchOpen((value) => !value)}
        className="border-line text-muted hover:text-fg duration-ui ease-expo hidden size-8 shrink-0 items-center justify-center rounded-full border transition-colors [@media(pointer:coarse)]:inline-flex"
      >
        <GridIcon size={14} />
      </button>
      <span
        data-open={touchOpen ? "true" : "false"}
        className={`flex items-center gap-1 transition-[opacity,transform] duration-ui ease-expo ${
          visible
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-1 scale-95 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 data-[open=true]:pointer-events-auto data-[open=true]:translate-y-0 data-[open=true]:scale-100 data-[open=true]:opacity-100"
        }`}
      >
        {items.map((item, index) => {
          const Icon = icons[item] ?? CodeIcon;
          return (
            <span
              key={item}
              tabIndex={0}
              role="img"
              aria-label={item}
              style={{ transitionDelay: `${index * 40}ms` }}
              className="group/item border-line bg-surface text-muted hover:text-fg focus:text-fg relative flex size-8 items-center justify-center rounded-full border outline-none transition-colors"
            >
              <Icon size={14} />
              <span
                role="tooltip"
                className="border-line bg-surface text-muted pointer-events-none absolute -top-8 left-1/2 z-hud -translate-x-1/2 whitespace-nowrap rounded-pill border px-2 py-1 font-mono text-meta opacity-0 transition-opacity group-hover/item:opacity-100 group-focus/item:opacity-100"
              >
                {item}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
