"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy, MessageSquare, Sparkles } from "lucide-react";
import type { HermesPersona } from "@/content/hermes-personas/types";
import { PERSONA_THEME } from "@/app/lib/persona-theme";

interface PersonaDossierProps {
  persona: HermesPersona;
  personas: HermesPersona[];
  activeIndex: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
}

export default function PersonaDossier({ persona, personas, activeIndex, onSelect, reducedMotion }: PersonaDossierProps) {
  const t = useTranslations("hermesPersonas");
  const theme = PERSONA_THEME[persona.accent];
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"capabilities" | "transmission">("capabilities");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!contentRef.current || reducedMotion) return;
    contentRef.current.animate([{ opacity: 0.35, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 300, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
  }, [persona.id, reducedMotion]);

  const handleCopyPrompt = async () => {
    if (!persona.transmissionSample) return;
    await navigator.clipboard.writeText(persona.transmissionSample.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div ref={contentRef} className="mt-2 bg-[var(--paper-light)] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div>
          <p className="archive-caption mb-5" style={{ color: theme.accent }}>{persona.role}</p>
          <blockquote className="font-serif text-4xl font-semibold leading-[0.9] tracking-[-0.05em] text-[var(--ink)] sm:text-6xl">“{persona.voiceHook.replace(/[.!]+$/, "")}. ”</blockquote>
          <p className="mt-6 max-w-xl text-base leading-[1.7] text-[var(--ink-soft)] sm:text-lg">{persona.voiceQuote}</p>
          {persona.directive && <p className="mt-7 max-w-xl border-l-2 pl-4 text-sm font-bold leading-[1.65] text-[var(--ink)]" style={{ borderColor: theme.accent }}>{persona.directive}</p>}
        </div>

        <div className="lg:pt-2">
          <div className="flex items-center gap-5" role="tablist" aria-label={t("detailViews")}>
            <button type="button" role="tab" aria-selected={activeTab === "capabilities"} aria-controls={`capabilities-${persona.id}`} id={`capabilities-tab-${persona.id}`} onClick={() => setActiveTab("capabilities")} className={`min-h-12 border-b-2 text-sm font-bold transition-colors ${activeTab === "capabilities" ? "border-[var(--ink)] text-[var(--ink)]" : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"}`}><Sparkles className="mr-1.5 inline h-4 w-4" />{t("tabCapabilities")}</button>
            <button type="button" role="tab" aria-selected={activeTab === "transmission"} aria-controls={`transmission-${persona.id}`} id={`transmission-tab-${persona.id}`} onClick={() => setActiveTab("transmission")} className={`min-h-12 border-b-2 text-sm font-bold transition-colors ${activeTab === "transmission" ? "border-[var(--ink)] text-[var(--ink)]" : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"}`}><MessageSquare className="mr-1.5 inline h-4 w-4" />{t("tabTransmission")}</button>
          </div>

          {activeTab === "capabilities" && <div id={`capabilities-${persona.id}`} role="tabpanel" aria-labelledby={`capabilities-tab-${persona.id}`} className="pt-8"><p className="archive-caption mb-5">{t("usefulInstincts")}</p><div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">{persona.specialties.map((specialty, index) => <span key={specialty} className="flex items-baseline gap-3 text-sm font-bold text-[var(--ink)] sm:text-base"><span className="font-mono text-[10px] text-[var(--identity)]">{String(index + 1).padStart(2, "0")}</span>{specialty}</span>)}</div><div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3"><div><p className="archive-caption">{t("roleLabel")}</p><p className="mt-2 text-sm font-bold text-[var(--ink)]">{persona.personalityTag}</p></div><div><p className="archive-caption">{t("styleLabel")}</p><p className="mt-2 text-sm font-bold text-[var(--ink)]">{persona.styleTag ?? t("independentStyle")}</p></div><div><p className="archive-caption">{t("focusLabel")}</p><p className="mt-2 text-sm font-bold text-[var(--ink)]">{persona.specialties[0]}</p></div></div></div>}

          {activeTab === "transmission" && <div id={`transmission-${persona.id}`} role="tabpanel" aria-labelledby={`transmission-tab-${persona.id}`} className="space-y-6 pt-7">{persona.transmissionSample ? <><div><div className="mb-3 flex items-center justify-between"><p className="archive-caption">{t("promptLabel")}</p><button type="button" onClick={handleCopyPrompt} className="flex min-h-9 items-center gap-1.5 text-xs font-bold text-[var(--identity)]">{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? t("copiedPrompt") : t("copyPrompt")}</button></div><p className="border-l-2 border-[var(--line)] pl-4 text-sm leading-[1.7] text-[var(--ink)] sm:text-base">“{persona.transmissionSample.prompt}”</p></div><div><p className="archive-caption mb-3" style={{ color: theme.accent }}>{persona.name} / {t("responseLabel")}</p><p className="border-l-2 pl-4 text-sm leading-[1.7] text-[var(--ink)] sm:text-base" style={{ borderColor: theme.accent }}>“{persona.transmissionSample.response}”</p></div></> : <p className="text-sm text-[var(--ink-soft)]">{t("noResponse")}</p>}</div>}
        </div>
      </div>

      <div className="mt-10 flex gap-6 overflow-x-auto pt-2 lg:hidden">{personas.map((item, index) => <button key={item.id} type="button" onClick={() => onSelect(index)} aria-label={item.name} aria-pressed={index === activeIndex} className={`archive-caption shrink-0 ${index === activeIndex ? "text-[var(--ink)]" : "text-[var(--ink-soft)]"}`}>{item.name}</button>)}</div>
    </div>
  );
}
