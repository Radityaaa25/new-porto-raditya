"use client";

import { OrbitMark } from "@/components/graphics/OrbitMark";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { useSiteContent } from "@/components/providers/LocaleProvider";

export function Capabilities() {
  const capabilities = useSiteContent().home.capabilities;

  return (
    <section className="gutter-x section-y" aria-labelledby="capabilities-title">
      <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-12 md:grid-cols-12">
        <div className="flex flex-col gap-5 md:col-span-5">
          <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">
            {capabilities.label}
          </span>
          <SplitText
            as="h2"
            text={capabilities.title}
            mode="words"
            className="font-display text-h2 max-w-[18ch] tracking-[-0.03em]"
          />
          <p className="text-muted max-w-[var(--measure)]">{capabilities.intro}</p>
          <OrbitMark className="mt-6 hidden aspect-square w-full max-w-[22rem] opacity-70 md:block" />
        </div>

        <ol className="flex flex-col md:col-span-7">
          {capabilities.items.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 0.06}>
              <div className="border-line grid gap-4 border-t py-8 sm:grid-cols-[4rem_1fr]">
                <span className="text-accent font-mono text-meta uppercase tracking-[0.14em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-h3 tracking-[-0.02em]">{item.title}</h3>
                  <p className="text-muted max-w-[var(--measure-wide)]">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
