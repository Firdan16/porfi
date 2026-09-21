"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import type { HermesPersona } from "@/content/hermes-personas/types";
import { PERSONA_THEME } from "@/app/lib/persona-theme";
import PersonaDossier from "./PersonaDossier";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function HermesPersonas({ personas }: { personas: HermesPersona[] }) {
  const t = useTranslations("hermesPersonas");
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
  const activePersona = personas[activeIndex] ?? personas[0];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-cast-reveal]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 82%", toggleActions: "play none none none" } });
    }, section);
    return () => ctx.revert();
  }, [reducedMotion]);

  const selectPersona = useCallback((index: number) => setActiveIndex(index), []);

  return (
    <section ref={sectionRef} id="personas" className="section-deferred bg-[var(--paper)] px-4 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div data-cast-reveal className="mb-10 max-w-[680px] sm:mb-14">
          <p className="archive-caption mb-5 text-[var(--identity)]">{t("sectionEyebrow")}</p>
          <h2 className="font-serif text-5xl font-semibold leading-[0.88] tracking-[-0.05em] text-[var(--ink)] sm:text-7xl">{t("headingStatement")}</h2>
          <p className="mt-6 max-w-xl text-sm leading-[1.75] text-[var(--ink-soft)] sm:text-base">{t("subtitle")}</p>
        </div>

        <div data-cast-reveal className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-7">
          {personas.map((persona, index) => {
            const active = index === activeIndex;
            const theme = PERSONA_THEME[persona.accent];
            return (
              <button key={persona.id} type="button" onClick={() => selectPersona(index)} aria-pressed={active} className={`group relative min-h-[280px] overflow-hidden text-left transition-all duration-500 sm:min-h-[330px] ${active ? "translate-y-0" : "translate-y-2 opacity-55 hover:translate-y-0 hover:opacity-85"}`}>
                <div className="absolute inset-0 bg-[var(--navy)]" />
                <Image src={persona.avatar} alt={persona.name} fill sizes="(min-width: 1024px) 32vw, 92vw" className={`object-cover object-[center_18%] transition duration-700 ${active ? "scale-100" : "scale-105 grayscale-[35%] group-hover:scale-100"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-[var(--navy)]/15 to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-2 sm:left-5 sm:top-5"><span className="font-mono text-xs font-bold text-white/75">0{index + 1}</span><span className="h-px w-8" style={{ backgroundColor: active ? theme.accent : "rgba(255,255,255,0.45)" }} /></div>
                <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5"><p className="archive-caption text-white/65">{persona.personalityTag}</p><h3 className="mt-1 font-serif text-4xl font-semibold leading-[0.84] text-white sm:text-5xl">{persona.name}</h3><p className="mt-3 max-w-[220px] text-xs font-bold leading-[1.45] text-white/75">{persona.role}</p></div>
                <span className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${active ? "w-full" : "w-0 group-hover:w-1/2"}`} style={{ backgroundColor: theme.accent }} />
              </button>
            );
          })}
        </div>

        <div data-cast-reveal className="mt-8 sm:mt-12"><PersonaDossier persona={activePersona} personas={personas} activeIndex={activeIndex} onSelect={selectPersona} reducedMotion={reducedMotion} /></div>
      </div>
    </section>
  );
}
