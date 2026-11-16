import { cn } from "@/lib/utils/cn";

type TextureProps = {
  className?: string;
};

const base = "pointer-events-none";

export function GrainOverlay({ className }: TextureProps) {
  return <div aria-hidden="true" className={cn(base, "texture-grain fixed inset-0 z-below", className)} />;
}

export function DotGrid({ className }: TextureProps) {
  return <div aria-hidden="true" className={cn(base, "texture-dot-grid absolute inset-0", className)} />;
}

export function ContourField({ className }: TextureProps) {
  return <div aria-hidden="true" className={cn(base, "texture-contour absolute inset-0", className)} />;
}

export function Halftone({ className }: TextureProps) {
  return <div aria-hidden="true" className={cn(base, "texture-halftone absolute inset-0", className)} />;
}

export function Scanline({ className }: TextureProps) {
  return <div aria-hidden="true" className={cn(base, "texture-scanline absolute inset-0", className)} />;
}

export function PaperFibre({ className }: TextureProps) {
  return <div aria-hidden="true" className={cn(base, "texture-paper absolute inset-0", className)} />;
}
