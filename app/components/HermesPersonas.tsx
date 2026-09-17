"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import type { HermesPersona } from "@/content/hermes-personas/types";
import { PERSONA_THEME } from "@/app/lib/persona-theme";
import PersonaDossier from "./PersonaDossier";

interface HermesPersonasProps {
  personas: HermesPersona[];
}

export default function HermesPersonas({ personas }: HermesPersonasProps) {
  const t = useTranslations("hermesPersonas");
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const activePersona = personas[activeIndex] ?? personas[0];
  const theme = PERSONA_THEME[activePersona.accent];

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(
        ".hermes-squad-panel",
        {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 32,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const selectPersona = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="personas"
      className="section-deferred px-3.5 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-24 md:py-32 relative overflow-x-hidden"
    >
      {personas.map((p, idx) => {
        const pTheme = PERSONA_THEME[p.accent];
        const isActive = idx === activeIndex;
        return (
          <div
            key={p.id}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(960px,105vw)] h-[min(560px,75vh)] rounded-full blur-[100px] pointer-events-none transition-opacity duration-500 will-change-[opacity] ${isActive ? "opacity-100" : "opacity-0"
              }`}
            style={{
              background: `radial-gradient(ellipse at 35% 50%, ${pTheme.glow}, transparent 62%), radial-gradient(ellipse at 70% 60%, ${pTheme.soft}, transparent 55%)`,
            }}
          />
        );
      })}

      <div className="max-w-[1100px] mx-auto relative z-10 w-full">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 shadow-xs mb-2.5 sm:mb-3">
            <span
              className="w-1.5 h-1.5 rounded-full transition-colors duration-500"
              style={{ background: theme.accent }}
            />
            <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-text-secondary">
              AUTONOMOUS PARTNERS · {personas.length} OPERATIVES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold italic text-text-primary tracking-tight raised-text mb-2 sm:mb-4">
            {t("heading")}{" "}
            <span className="text-primary/80">{t("headingAccent")}</span>
          </h2>
          <p className="max-w-lg mx-auto text-text-secondary text-xs sm:text-sm font-medium opacity-70 leading-relaxed px-2">
            {t("subtitle")}
          </p>
        </div>

        <div className="hermes-squad-panel w-full min-w-0">
          <PersonaDossier
            persona={activePersona}
            personas={personas}
            activeIndex={activeIndex}
            onSelect={selectPersona}
            reducedMotion={reducedMotion}
          />
        </div>
      </div>
    </section>
  );
}
