"use client";

import { useState } from "react";

import { CheckIcon, CopyIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";
import { useSiteContent } from "@/components/providers/LocaleProvider";

type CopyEmailProps = {
  email: string;
  className?: string;
};

export function CopyEmail({ email, className }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const content = useSiteContent();

  const onCopy = async () => {
    let done = false;
    try {
      await navigator.clipboard.writeText(email);
      done = true;
    } catch {
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.append(field);
      field.select();
      done = document.execCommand("copy");
      field.remove();
    }
    setCopied(done);
    if (done) {
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        "border-line hover:border-fg group inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-meta uppercase tracking-[0.14em] transition-colors",
        className,
      )}
      aria-live="polite"
    >
      {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
      <span>{copied ? content.ui.copied : content.ui.copyEmail}</span>
    </button>
  );
}
