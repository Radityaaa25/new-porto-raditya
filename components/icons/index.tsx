import type { ReactNode, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

function IconBase({ size = 24, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </IconBase>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />
    </IconBase>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </IconBase>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </IconBase>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </IconBase>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4v16M6 14l6 6 6-6" />
    </IconBase>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20 12H4M10 6l-6 6 6 6" />
    </IconBase>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </IconBase>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </IconBase>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </IconBase>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </IconBase>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </IconBase>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 5.5v13l11-6.5Z" />
    </IconBase>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9 5v14M15 5v14" />
    </IconBase>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 5v14M5 12h14" />
    </IconBase>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="4" width="6" height="6" />
      <rect x="14" y="4" width="6" height="6" />
      <rect x="4" y="14" width="6" height="6" />
      <rect x="14" y="14" width="6" height="6" />
    </IconBase>
  );
}

export function ListIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
    </IconBase>
  );
}

export function CrosshairIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </IconBase>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m5 13 4 4L19 7" />
    </IconBase>
  );
}

export function DotIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4c.7 4.2 3.8 7.3 8 8-4.2.7-7.3 3.8-8 8-.7-4.2-3.8-7.3-8-8 4.2-.7 7.3-3.8 8-8Z" />
    </IconBase>
  );
}

export function MonitorIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M9 20h6M12 16v4" />
    </IconBase>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
    </IconBase>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4v11M7 10l5 5 5-5M5 19h14" />
    </IconBase>
  );
}

export function SendIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M21 3 3 10.5l7 2.5 2.5 7Z" />
      <path d="m10 13 5-5" />
    </IconBase>
  );
}

export function ReactIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
    </IconBase>
  );
}

export function NextIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 16V8l7 9V8" />
    </IconBase>
  );
}

export function TypeScriptIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 9h5M9.5 9v7M17.5 10a2 2 0 0 0-3 1.7c0 2.3 3 1.4 3 3.3a2 2 0 0 1-3 1.4" />
    </IconBase>
  );
}

export function JavaScriptIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M10 9v5a2 2 0 0 1-3.5 1.4M16.5 10a2 2 0 0 0-3 1.7c0 2.3 3 1.4 3 3.3a2 2 0 0 1-3 1.4" />
    </IconBase>
  );
}

export function HtmlIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 3.5 5.5 19 12 21l6.5-2L20 3.5Z" />
      <path d="M8 8h8l-.4 4H8.4L9 17l3 .8 3-.8.3-3" />
    </IconBase>
  );
}

export function CssIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 3.5 5.5 19 12 21l6.5-2L20 3.5Z" />
      <path d="M8.5 8h7l-.3 3H9M9.6 14h4.2l-.4 3-1.4.4-1.4-.4" />
    </IconBase>
  );
}

export function LaravelIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 5v9l6 4 4-2.4" />
      <path d="m10 18 4-2.4V10M14 10l4-2.4V13l2 1.2V9" />
      <path d="m9 9 2 1.2" />
    </IconBase>
  );
}

export function PhpIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <ellipse cx="12" cy="12" rx="9" ry="6" />
      <path d="M8 15V9h2.2a2 2 0 0 1 0 4H8M13 15V9M13 12h2a1.5 1.5 0 0 1 0 3h-2" />
    </IconBase>
  );
}

export function PythonIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9a2 2 0 0 0-2 2v2" />
      <path d="M12 21H9a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h6a2 2 0 0 0 2-2V7" />
      <path d="M10.5 3v2M13.5 19v2" />
    </IconBase>
  );
}

export function MySqlIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <ellipse cx="12" cy="6.5" rx="7" ry="2.5" />
      <path d="M5 6.5v11c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-11" />
      <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </IconBase>
  );
}

export function GitIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 8v8M8 6h4a6 6 0 0 1 6 6v0" />
    </IconBase>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9 20c-3 .8-4-1.4-4-3v-2.2a5.5 5.5 0 0 1 1.5-4 4.6 4.6 0 0 1 .1-4s1.3-.4 4.2 1.6a12 12 0 0 1 4.4 0C18.1 6.4 19.4 6.8 19.4 6.8a4.6 4.6 0 0 1 .1 4 5.5 5.5 0 0 1 1.5 4V17c0 1.6-1 3.8-4 3v-2" />
      <path d="M9 17.5c-1.8.4-3.4-.3-4-1.7" />
    </IconBase>
  );
}

export function FigmaIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9 3h3v6H9a3 3 0 0 1 0-6Z" />
      <path d="M12 3h3a3 3 0 0 1 0 6h-3Z" />
      <path d="M9 9h3v6H9a3 3 0 0 1 0-6Z" />
      <path d="M12 9h3a3 3 0 1 1-3 3Z" />
      <path d="M9 15h3v3a3 3 0 1 1-3-3Z" />
    </IconBase>
  );
}

export function VercelIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4 21 20H3Z" />
    </IconBase>
  );
}

export function TailwindIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 10c1.2-3 3.2-4.5 6-4.5 4.2 0 4.5 3 6.5 3.5 1.4.3 2.6-.5 3.5-1.8" />
      <path d="M5 17c1.2-3 3.2-4.5 6-4.5 4.2 0 4.5 3 6.5 3.5 1.4.3 2.6-.5 3.5-1.8" />
    </IconBase>
  );
}

export function CanvaIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9.5a4 4 0 1 0 .3 4.6" />
    </IconBase>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20 11.5A8 8 0 0 1 7.6 18.4L4 20l1.7-3.5A8 8 0 1 1 20 11.5Z" />
      <path d="M9.2 8.5c-.5 0-.9.4-.9.9 0 2.4 2.9 5.3 5.3 5.3.5 0 .9-.4.9-.9v-.7l-1.7-.8-.8.8a5 5 0 0 1-2.1-2.1l.8-.8-.8-1.7Z" />
    </IconBase>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10v7M7.5 7.2v.1M11.5 17v-7M11.5 13c0-1.7 1-3 2.7-3s2.8 1.2 2.8 3v4" />
    </IconBase>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8v.1" />
    </IconBase>
  );
}

export function CpuIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </IconBase>
  );
}

export function BotIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="8" width="16" height="11" rx="2" />
      <path d="M12 4v4M9 13v1M15 13v1M9 16h6M2 12v3M22 12v3" />
    </IconBase>
  );
}

export function FilmIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4" />
    </IconBase>
  );
}

export function CameraIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 8h3l2-3h8l2 3h3v11H3Z" />
      <circle cx="12" cy="13" r="3.5" />
    </IconBase>
  );
}

export function BrushIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 4l6 6-7 7-6-6Z" />
      <path d="m7 11-3 7 2 2 7-3M14 4l-2 2 6 6 2-2" />
    </IconBase>
  );
}

export function TicketIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4Z" />
      <path d="M13 7v2M13 11v2M13 15v2" />
    </IconBase>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 8h14l1 12H4Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </IconBase>
  );
}

export function ArchiveIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <path d="M5 8v12h14V8M10 12h4" />
    </IconBase>
  );
}

export function SupabaseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"
        fill="currentColor"
        stroke="none"
      />
    </IconBase>
  );
}

export function XenditIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M11.781 2.743H7.965l-5.341 9.264 5.341 9.263-1.312 2.266L0 12.007 6.653.464h6.454l-1.326 2.279Zm-5.128 2.28 1.312-2.28L9.873 6.03 8.561 8.296 6.653 5.023Zm9.382-2.28 1.312 2.28L7.965 21.27l-1.312-2.279 9.382-16.248Zm-5.128 20.793 1.298-2.279h3.83L14.1 17.931l1.312-2.267 1.926 3.337 4.038-6.994-5.341-9.264L17.347.464 24 12.007l-6.653 11.529h-6.44Z"
        fill="currentColor"
        stroke="none"
      />
    </IconBase>
  );
}

export function CloudinaryIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M24 14.86c0 2.173-1.376 3.974-3.59 4.7l-.1.031V17.99c1.378-.58 2.187-1.728 2.187-3.13-.007-2-1.609-3.628-3.608-3.67h-.596l-.144-.568c-.702-2.9-3.288-4.949-6.272-4.97a6.392 6.392 0 0 0-5.81 3.664l-.183.376-.418.043a4.431 4.431 0 0 0-3.305 2.088c-1.28 2.086-.627 4.815 1.458 6.095v1.69h-.01l-.149-.068a5.94 5.94 0 0 1-3.366-4.35c-.578-3.229 1.57-6.316 4.8-6.895a7.877 7.877 0 0 1 6.983-4.149c3.473.025 6.535 2.28 7.59 5.589 2.58.336 4.514 2.524 4.533 5.125zm-15.317-1.322h.565a.066.066 0 0 0 .045-.111L7.084 11.216a.066.066 0 0 0-.093 0L4.78 13.427a.066.066 0 0 0 .048.111h.556a.066.066 0 0 1 .066.066v5.057c0 .66.534 1.193 1.193 1.193H9.247a.066.066 0 0 0 .046-.111l-.33-.33a1.193 1.193 0 0 1-.348-.84v-4.97a.068.068 0 0 1 .068-.065zm9.769 2.547h.567a.066.066 0 0 0 .045-.114l-2.21-2.208a.064.064 0 0 0-.09.001l-2.21 2.206a.066.066 0 0 0 .046.114h.557a.066.066 0 0 1 .065.065v2.511c0 .66.534 1.193 1.193 1.193h2.606a.066.066 0 0 0 .046-.111l-.33-.33a1.193 1.193 0 0 1-.348-.84V16.15a.066.066 0 0 1 .065-.065zm-4.884-1.274h.564a.066.066 0 0 0 .048-.111l-2.211-2.203a.066.066 0 0 0-.093 0L4.667 14.704a.066.066 0 0 0 .046.111h.563a.068.068 0 0 1 .065.068v3.779c0 .659.534 1.193 1.193 1.193h2.598a.066.066 0 0 0 .048-.111l-.332-.33a1.193 1.193 0 0 1-.346-.84v-3.695c0-.037.029-.067.066-.068z"
        fill="currentColor"
        stroke="none"
      />
    </IconBase>
  );
}

export function ResendIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M14.679 0c4.648 0 7.413 2.765 7.413 6.434s-2.765 6.434-7.413 6.434H12.33L24 24h-8.245l-8.88-8.44c-.636-.588-.93-1.273-.93-1.86 0-.831.587-1.565 1.713-1.883l4.574-1.224c1.737-.465 2.936-1.81 2.936-3.572 0-2.153-1.761-3.4-3.939-3.4H0V0z"
        fill="currentColor"
        stroke="none"
      />
    </IconBase>
  );
}
