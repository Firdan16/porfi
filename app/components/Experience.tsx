"use client";

import { useTranslations } from "next-intl";

const entries = [
  { key: "moon", period: "2025-2026" },
  { key: "bengkel", period: "2023-2025" },
  { key: "langgeng", period: "2022" },
] as const;

export default function Experience() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="section-deferred bg-[var(--paper)] px-4 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="archive-caption mb-5 text-[var(--identity)]">{t("eyebrow")}</p>
            <h2 className="font-serif text-5xl font-semibold leading-[0.86] tracking-[-0.05em] text-[var(--ink)] sm:text-7xl">{t("heading")}</h2>
            <p className="mt-6 max-w-sm text-sm leading-[1.75] text-[var(--ink-soft)] sm:text-base">{t("subtitle")}</p>
          </div>

          <div className="space-y-12 sm:space-y-16">
            {entries.map((entry, index) => (
              <article key={entry.key} className="relative grid gap-5 border-t border-[var(--line)] pt-5 sm:grid-cols-[92px_1fr] sm:gap-8">
                <div className="flex items-start justify-between sm:block">
                  <span className="font-mono text-xs font-bold text-[var(--identity)]">0{index + 1}</span>
                  <span className="archive-caption sm:mt-4 sm:block">{entry.period}</span>
                </div>
                <div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h3 className="font-serif text-3xl font-semibold leading-none text-[var(--ink)] sm:text-4xl">{t(`entries.${entry.key}.company`)}</h3>
                    <p className="text-xs font-bold text-[var(--ink-soft)]">{t(`entries.${entry.key}.location`)}</p>
                  </div>
                  <p className="mt-2 text-sm font-bold text-[var(--identity)]">{t(`entries.${entry.key}.role`)}</p>
                  <p className="mt-5 max-w-2xl text-sm leading-[1.75] text-[var(--ink-soft)] sm:text-base">{t(`entries.${entry.key}.summary`)}</p>
                  <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {["one", "two", "three", "four"].map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-xs leading-[1.7] text-[var(--ink)] sm:text-sm"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--identity)]" />{t(`entries.${entry.key}.bullets.${bullet}`)}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
