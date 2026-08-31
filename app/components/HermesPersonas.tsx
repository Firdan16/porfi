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
      gsap.fromTo(
        ".hermes-squad-panel",
        { y: 36, opacity: 0 },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 0.9,
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
      className="section-deferred px-4 sm:px-6 md:px-20 lg:px-40 py-20 sm:py-28 md:py-32 relative overflow-x-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(960px,105vw)] h-[min(560px,75vh)] rounded-full blur-[130px] pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 35% 50%, ${theme.glow}, transparent 62%), radial-gradient(ellipse at 70% 60%, ${theme.soft}, transparent 55%)`,
        }}
      />

      <div className="max-w-[1100px] mx-auto relative z-10 w-full">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-semibold italic text-text-primary tracking-tight raised-text mb-3 sm:mb-4">
            {t("heading")}{" "}
            <span className="text-primary/80">{t("headingAccent")}</span>
          </h2>
          <p className="max-w-lg mx-auto text-text-secondary text-xs sm:text-sm font-medium opacity-60 leading-relaxed px-2">
            {t("subtitle")}
          </p>
        </div>

        <div className="hermes-squad-panel opacity-0 w-full min-w-0">
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
