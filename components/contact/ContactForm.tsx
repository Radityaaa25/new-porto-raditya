"use client";

import { useState } from "react";

import { ArrowUpRightIcon } from "@/components/icons";
import { useSiteContent } from "@/components/providers/LocaleProvider";
import { site } from "@/content/site";

export function ContactForm() {
  const form = useSiteContent().contact.form;
  const [state, setState] = useState<"idle" | "error" | "ready">("idle");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !message) {
      setError(form.required);
      setState("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(form.invalidEmail);
      setState("error");
      return;
    }

    setSending(true);
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSending(false);
    setState("ready");
  }

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div className="flex flex-col gap-3 md:col-span-4">
        <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">{form.label}</span>
        <h2 className="font-display text-h2 tracking-[-0.03em]">{form.title}</h2>
        <p className="text-subtle max-w-[var(--measure)]">{form.fallback}</p>
      </div>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 md:col-span-7">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">{form.name}</span>
            <input name="name" autoComplete="name" placeholder={form.namePlaceholder} className="border-line bg-surface rounded-sm border px-4 py-3 outline-none focus:border-accent" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">{form.email}</span>
            <input name="email" type="email" autoComplete="email" placeholder={form.emailPlaceholder} className="border-line bg-surface rounded-sm border px-4 py-3 outline-none focus:border-accent" />
          </label>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">{form.message}</span>
          <textarea name="message" rows={6} placeholder={form.messagePlaceholder} className="border-line bg-surface resize-y rounded-sm border px-4 py-3 outline-none focus:border-accent" />
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" disabled={sending} className="border-line hover:border-accent inline-flex items-center gap-2 rounded-pill border px-5 py-2 font-mono text-meta uppercase tracking-[0.14em] transition-colors disabled:opacity-60">
            {sending ? form.sending : form.send}
            <ArrowUpRightIcon size={14} />
          </button>
          <p aria-live="polite" className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
            {state === "error" ? error : state === "ready" ? form.successBody : ""}
          </p>
        </div>
      </form>
    </div>
  );
}
