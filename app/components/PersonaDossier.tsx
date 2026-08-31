"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import type { HermesPersona } from "@/content/hermes-personas/types";
import { PERSONA_THEME } from "@/app/lib/persona-theme";

interface PersonaDossierProps {
  persona: HermesPersona;
  personas: HermesPersona[];
  activeIndex: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
}

export default function PersonaDossier({
  persona,
  personas,
  activeIndex,
  onSelect,
  reducedMotion,
}: PersonaDossierProps) {
  const theme = PERSONA_THEME[persona.accent];
  const dossierRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const voiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait || reducedMotion || window.matchMedia("(hover: none)").matches) {
      return;
    }

    const inner = portrait.querySelector(".hero-frame-inner");
    const img = portrait.querySelector("img");

    const handleMouseMove = (event: MouseEvent) => {
      const rect = portrait.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      if (inner) {
        gsap.to(inner, {
          rotationY: x * 5,
          rotationX: -y * 5,
          duration: 0.5,
          ease: "power1.out",
        });
      }
      if (img) {
        gsap.to(img, {
          scale: 1.03,
          x: x * 6,
          y: y * 6,
          duration: 0.5,
          ease: "power1.out",
        });
      }
    };

    const handleMouseLeave = () => {
      const targets = [inner, img].filter(Boolean);
      if (targets.length) {
        gsap.to(targets, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
        });
      }
    };

    portrait.addEventListener("mousemove", handleMouseMove);
    portrait.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      portrait.removeEventListener("mousemove", handleMouseMove);
      portrait.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reducedMotion, persona.id]);

  useEffect(() => {
    const voice = voiceRef.current;
    if (!voice || reducedMotion) return;

    gsap.fromTo(
      voice,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
    );
  }, [persona.id, reducedMotion]);

  return (
    <div
      ref={dossierRef}
      className="relative w-full max-w-[1040px] mx-auto rounded-[1.75rem] sm:rounded-[2.25rem] overflow-hidden tech-switch border border-white/50 transition-shadow duration-700"
      style={{ boxShadow: `0 24px 48px ${theme.glow}, var(--shadow-skeuo-float)` }}
    >
      {/* Ambient layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-700">
        <div
          className="absolute -left-[10%] top-[5%] w-[55%] h-[90%] rounded-full blur-3xl opacity-90"
          style={{ background: `radial-gradient(circle, ${theme.glow}, transparent 68%)` }}
        />
        <div
          className="absolute -right-[5%] bottom-[0%] w-[45%] h-[70%] rounded-full blur-3xl opacity-80"
          style={{ background: `radial-gradient(circle, ${theme.soft}, transparent 70%)` }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `linear-gradient(135deg, ${theme.ambient} 0%, transparent 45%, ${theme.soft} 100%)`,
          }}
        />
      </div>

      {/* Header */}
      <div
        className="relative flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-white/40 backdrop-blur-sm transition-colors duration-700"
        style={{ background: `linear-gradient(90deg, ${theme.ambient}, transparent 60%)` }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="shrink-0 w-2 h-2 rounded-full transition-colors duration-500"
            style={{ background: theme.accent, boxShadow: `0 0 10px ${theme.accent}` }}
            aria-hidden
          />
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
              Agent File
            </p>
            <p className="text-[10px] sm:text-xs font-mono text-text-secondary/70 truncate">
              {persona.channel} · {persona.frequency.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0" role="tablist" aria-label="Select partner">
          {personas.map((p, index) => {
            const isActive = index === activeIndex;
            const pTheme = PERSONA_THEME[p.accent];
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={p.name}
                onClick={() => onSelect(index)}
                className={`relative rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                  isActive ? "scale-105" : "opacity-55 hover:opacity-90 hover:scale-100"
                }`}
                style={
                  isActive
                    ? { boxShadow: `0 0 0 2px ${pTheme.accent}, 0 4px 16px ${pTheme.glow}` }
                    : undefined
                }
              >
                <span className="block w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/80 bg-background-light shadow-skeuo-inset">
                  <Image src={p.avatar} alt="" width={40} height={40} className="object-cover w-full h-full" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div className="relative flex flex-col md:flex-row">
        <div className="md:w-[44%] lg:w-[42%] p-5 sm:p-7 md:py-8 md:pl-7 md:pr-4 lg:pl-8 lg:pr-5">
          <div
            ref={portraitRef}
            className="hero-frame w-full max-w-[300px] mx-auto md:max-w-none aspect-[3/4]"
          >
            <div className="hero-frame-inner h-full w-full relative">
              <Image
                key={persona.id}
                src={persona.avatar}
                alt={persona.name}
                fill
                priority={activeIndex === 0}
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 340px, 300px"
                className="object-cover object-[center_12%] rounded-[2rem]"
              />
              <div
                className="absolute inset-0 z-10 rounded-[2rem] pointer-events-none"
                style={{
                  background: `linear-gradient(to top, ${theme.soft} 0%, transparent 35%), linear-gradient(to bottom, transparent 55%, ${theme.glow} 100%)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/80 via-text-primary/15 to-transparent z-10 rounded-[2rem]" />
              <div className="absolute top-3 right-3 w-1/3 h-2/5 bg-gradient-to-b from-white/25 to-transparent rounded-tr-[2rem] pointer-events-none z-20 opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20 text-left">
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-white/15 backdrop-blur-sm border border-white/25 text-white mb-2">
                  <span style={{ color: theme.accent }}>✦</span>
                  {persona.personalityTag}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-none">
                  {persona.name}
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-white/80 mt-1.5 leading-snug">
                  {persona.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={voiceRef}
          className="md:w-[56%] lg:w-[58%] flex flex-col justify-center px-5 sm:px-8 md:px-6 lg:px-9 py-5 sm:py-7 md:py-8 border-t md:border-t-0 md:border-l border-white/30"
        >
          <blockquote className="space-y-3 sm:space-y-4 text-left">
            <p className="font-display font-bold text-xl sm:text-2xl lg:text-[1.65rem] text-text-primary leading-snug tracking-tight">
              {persona.voiceHook}
            </p>
            <p className="font-serif italic text-sm sm:text-base text-text-secondary leading-relaxed">
              {persona.voiceQuote}
            </p>
          </blockquote>

          <div className="flex flex-wrap gap-2 mt-5 sm:mt-6 pt-5 border-t border-white/30">
            {persona.specialties.map((specialty) => (
              <span
                key={specialty}
                className="rounded-full px-3 py-1.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-background-light/90 shadow-skeuo-btn border text-text-secondary backdrop-blur-sm transition-colors duration-500"
                style={{ borderColor: theme.soft }}
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
