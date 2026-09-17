"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import {
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Terminal,
} from "lucide-react";
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
  const t = useTranslations("hermesPersonas");
  const theme = PERSONA_THEME[persona.accent];

  const dossierRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<"capabilities" | "transmission">(
    "capabilities"
  );
  const [copied, setCopied] = useState(false);

  // 3D Portrait tilt & specular light: pure CSS variable update (ZERO React re-renders on mousemove)
  useEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait || reducedMotion || window.matchMedia("(hover: none)").matches) {
      return;
    }

    const inner = portrait.querySelector<HTMLElement>(".hero-frame-inner");

    const handleMouseMove = (event: MouseEvent) => {
      const rect = portrait.getBoundingClientRect();
      const rawX = (event.clientX - rect.left) / rect.width;
      const rawY = (event.clientY - rect.top) / rect.height;
      const x = rawX - 0.5;
      const y = rawY - 0.5;

      portrait.style.setProperty("--sheen-x", `${Math.round(rawX * 100)}%`);
      portrait.style.setProperty("--sheen-y", `${Math.round(rawY * 100)}%`);

      if (inner) {
        gsap.to(inner, {
          rotationY: x * 6,
          rotationX: -y * 6,
          duration: 0.3,
          ease: "power1.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      portrait.style.setProperty("--sheen-x", "50%");
      portrait.style.setProperty("--sheen-y", "50%");
      if (inner) {
        gsap.to(inner, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    portrait.addEventListener("mousemove", handleMouseMove);
    portrait.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      portrait.removeEventListener("mousemove", handleMouseMove);
      portrait.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reducedMotion]);

  // Persona switch smooth content entrance without blank jumps
  useEffect(() => {
    const container = contentRef.current;
    if (!container || reducedMotion) return;

    const items = container.querySelectorAll(".dossier-animate-item");
    gsap.fromTo(
      items,
      { opacity: 0.35, y: 6 },
      {
        opacity: 1,
        y: 0,
        duration: 0.28,
        stagger: 0.02,
        ease: "power2.out",
        overwrite: "auto",
      }
    );
  }, [persona.id, reducedMotion]);

  const handleCopyPrompt = () => {
    if (!persona.transmissionSample) return;
    navigator.clipboard.writeText(persona.transmissionSample.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      ref={dossierRef}
      className="relative w-full max-w-[1060px] mx-auto rounded-[1.75rem] sm:rounded-[2.5rem] bg-[#F8FAFC] border border-white/70 shadow-[8px_8px_20px_#ced4da,-8px_-8px_20px_#ffffff] sm:shadow-[12px_12px_28px_#ced4da,-12px_-12px_28px_#ffffff]"
    >
      {/* GPU-composited dynamic ambient glow behind card */}
      <div
        className="absolute -inset-1 rounded-[1.75rem] sm:rounded-[2.5rem] blur-2xl opacity-40 transition-colors duration-500 pointer-events-none -z-10 will-change-[background-color]"
        style={{ background: theme.glow }}
      />

      {/* Top Telemetry & Radio Signal Header */}
      <div
        className="relative flex items-center justify-between gap-2 sm:gap-3 px-4 sm:px-8 py-2.5 sm:py-3.5 border-b border-slate-200/70 rounded-t-[1.75rem] sm:rounded-t-[2.5rem] backdrop-blur-md transition-colors duration-500"
        style={{
          background: `linear-gradient(90deg, ${theme.ambient} 0%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.4) 100%)`,
        }}
      >
        {/* Left: Operative ID + Animated Equalizer */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative flex items-center justify-center shrink-0">
            <span
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors duration-500"
              style={{
                background: theme.accent,
                boxShadow: `0 0 10px ${theme.accent}`,
              }}
              aria-hidden
            />
            <span
              className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full opacity-40 animate-ping pointer-events-none"
              style={{ background: theme.accent }}
            />
          </div>

          <div className="min-w-0 flex flex-col">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-text-secondary truncate">
                {t("badgeLabel")}
              </span>
              <span className="text-slate-300">/</span>
              <span
                className="text-[8px] sm:text-[10px] font-mono font-bold tracking-wider shrink-0"
                style={{ color: theme.accent }}
              >
                {persona.channel}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-mono font-semibold text-text-primary/90 truncate flex items-center gap-1 sm:gap-1.5">
              <span>{persona.frequency.toFixed(1)} MHz</span>
              <span className="text-slate-300">·</span>
              <span className="font-sans font-medium text-text-secondary truncate">
                {persona.personalityTag}
              </span>
            </p>
          </div>

          {/* Micro Audio Equalizer Wave */}
          <div
            className="hidden xs:flex sm:flex items-center gap-0.5 sm:gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/70 border border-white/80 shadow-xs shrink-0"
            title="Channel Signal Activity"
          >
            <div
              className="w-[2.5px] sm:w-[3px] rounded-full eq-bar-1 transition-colors duration-500"
              style={{ background: theme.accent }}
            />
            <div
              className="w-[2.5px] sm:w-[3px] rounded-full eq-bar-2 transition-colors duration-500"
              style={{ background: theme.accent }}
            />
            <div
              className="w-[2.5px] sm:w-[3px] rounded-full eq-bar-3 transition-colors duration-500"
              style={{ background: theme.accent }}
            />
            <div
              className="w-[2.5px] sm:w-[3px] rounded-full eq-bar-4 transition-colors duration-500"
              style={{ background: theme.accent }}
            />
            <div
              className="w-[2.5px] sm:w-[3px] rounded-full eq-bar-5 transition-colors duration-500"
              style={{ background: theme.accent }}
            />
          </div>
        </div>

        {/* Right: Signal Sync Status */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold tracking-wider bg-white/80 border border-slate-200/80 text-text-secondary shadow-xs">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: theme.accent }}
            />
            <span className="hidden sm:inline">{t("statusSynced")}</span>
            <span className="sm:hidden">SYNCED</span>
          </div>
        </div>
      </div>

      {/* Tactile Operative Selector Bar (Segmented Controller) */}
      <div className="relative px-2.5 sm:px-8 pt-2.5 sm:pt-5 pb-1 sm:pb-2">
        <div
          className="grid grid-cols-3 gap-1 sm:gap-3 p-1 sm:p-2 rounded-xl sm:rounded-2xl bg-[#EEF2F6] border border-white/90 shadow-[inset_2px_2px_5px_#d1d9e6,inset_-2px_-2px_5px_#ffffff]"
          role="tablist"
          aria-label="Select Autonomous Operative"
        >
          {personas.map((p, index) => {
            const isActive = index === activeIndex;
            const pTheme = PERSONA_THEME[p.accent];

            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelect(index)}
                className={`relative flex items-center justify-center sm:justify-start gap-1.5 sm:gap-3 px-1.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer ${
                  isActive
                    ? "bg-white shadow-[2px_2px_6px_#d1d9e6,-2px_-2px_6px_#ffffff] sm:shadow-[3px_3px_8px_#d1d9e6,-3px_-3px_8px_#ffffff] border border-white"
                    : "hover:bg-white/40 opacity-70 hover:opacity-100 active:scale-[0.98]"
                }`}
                style={
                  isActive
                    ? {
                        borderColor: pTheme.border,
                      }
                    : undefined
                }
              >
                {/* Avatar miniature */}
                <div
                  className={`relative shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 transition-transform duration-200 ${
                    isActive ? "scale-105" : "grayscale-[30%]"
                  }`}
                  style={{
                    borderColor: isActive ? pTheme.accent : "#CBD5E1",
                    boxShadow: isActive ? `0 0 8px ${pTheme.glow}` : "none",
                  }}
                >
                  <Image
                    src={p.avatar}
                    alt={p.name}
                    fill
                    sizes="32px"
                    priority
                    className="object-cover"
                  />
                </div>

                {/* Name & Channel Info - Always visible on mobile too */}
                <div className="text-left min-w-0">
                  <p
                    className={`text-[11px] sm:text-sm font-display font-bold leading-tight truncate transition-colors duration-200 ${
                      isActive ? "text-text-primary" : "text-text-secondary"
                    }`}
                  >
                    {p.name}
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-mono text-text-secondary/70 truncate hidden sm:flex items-center gap-1">
                    <span>{p.channel}</span>
                    <span className="hidden md:inline">· {p.frequency.toFixed(1)}M</span>
                  </p>
                </div>

                {/* Active Indicator Dot */}
                {isActive && (
                  <span
                    className="ml-auto hidden md:block w-1.5 h-1.5 rounded-full"
                    style={{ background: pTheme.accent }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dossier Content Body */}
      <div className="relative flex flex-col md:flex-row gap-5 md:gap-8 p-3.5 sm:p-7 md:p-8">
        {/* Left Column: 3D Tactile Portrait Card with Pre-rendered Stack */}
        <div className="w-full max-w-[260px] sm:max-w-[300px] md:max-w-none md:w-[40%] lg:w-[38%] mx-auto shrink-0">
          <div
            ref={portraitRef}
            className="hero-frame w-full aspect-[4/5] sm:aspect-[3/4] relative select-none will-change-transform"
            style={{
              perspective: 1000,
            }}
          >
            <div className="hero-frame-inner h-full w-full relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/60">
              {/* Stacked Pre-rendered Images (ZERO decoding flash when switching) */}
              {personas.map((p, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <div
                    key={p.id}
                    className={`absolute inset-0 transition-opacity duration-300 ease-out will-change-[opacity] ${
                      isCurrent
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={p.avatar}
                      alt={p.name}
                      fill
                      priority
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 320px, 260px"
                      className="object-cover object-[center_12%]"
                    />
                  </div>
                );
              })}

              {/* Dynamic Specular Sheen Layer (Driven by CSS variables, 0 React re-renders) */}
              <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  background:
                    "radial-gradient(circle at var(--sheen-x, 50%) var(--sheen-y, 50%), rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.08) 35%, transparent 65%)",
                }}
              />

              {/* Theme color gradient overlays */}
              <div
                className="absolute inset-0 z-20 pointer-events-none transition-all duration-500"
                style={{
                  background: `linear-gradient(to top, ${theme.soft} 0%, transparent 40%), linear-gradient(to bottom, transparent 50%, rgba(15, 23, 42, 0.85) 100%)`,
                }}
              />

              {/* Top Floating Channel Tag */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-30">
                <span className="inline-flex items-center gap-1.5 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider bg-black/45 backdrop-blur-md border border-white/20 text-white shadow-sm">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: theme.accent }}
                  />
                  {persona.channel} · {persona.frequency.toFixed(1)} MHz
                </span>
              </div>

              {/* Bottom Identity Plaque */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-30 text-left">
                <span className="inline-flex items-center gap-1 rounded-full px-2 sm:px-2.5 py-0.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30 text-white mb-1.5 sm:mb-2 shadow-xs">
                  <span style={{ color: theme.accent }}>✦</span>
                  {persona.personalityTag}
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-none drop-shadow-sm">
                  {persona.name}
                </h3>
                <p className="font-display font-medium text-[11px] sm:text-xs md:text-sm text-slate-200/90 mt-1 sm:mt-1.5 leading-snug">
                  {persona.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Console Details & Interactive Tabs */}
        <div
          ref={contentRef}
          className="w-full md:w-[60%] lg:w-[62%] flex flex-col justify-between"
        >
          <div>
            {/* Persona Voice Hook & Crisp Modern Quote */}
            <div className="text-left space-y-2.5 sm:space-y-3">
              <div className="dossier-animate-item flex items-start gap-2 sm:gap-2.5">
                <span
                  className="text-2xl sm:text-3xl md:text-4xl font-serif font-black leading-none select-none transition-colors duration-300"
                  style={{ color: theme.accent }}
                >
                  “
                </span>
                <h4 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-text-primary tracking-tight leading-snug">
                  {persona.voiceHook}
                </h4>
              </div>

              <p className="dossier-animate-item font-display text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed pl-3.5 sm:pl-6 border-l-2 border-slate-200/80">
                {persona.voiceQuote}
              </p>
            </div>

            {/* Interactive View Mode Switcher (Capabilities vs Transmission) */}
            <div className="dossier-animate-item mt-4 sm:mt-6">
              <div className="flex items-center gap-1.5 sm:gap-2 border-b border-slate-200/80 pb-2.5 sm:pb-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("capabilities")}
                  className={`inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-display font-bold transition-all duration-200 cursor-pointer ${
                    activeTab === "capabilities"
                      ? "bg-white shadow-[2px_2px_5px_#d1d9e6,-2px_-2px_5px_#ffffff] text-text-primary border border-slate-200/80"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/50"
                  }`}
                  style={
                    activeTab === "capabilities"
                      ? { color: theme.accent }
                      : undefined
                  }
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{t("tabCapabilities")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("transmission")}
                  className={`inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-display font-bold transition-all duration-200 cursor-pointer ${
                    activeTab === "transmission"
                      ? "bg-white shadow-[2px_2px_5px_#d1d9e6,-2px_-2px_5px_#ffffff] text-text-primary border border-slate-200/80"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/50"
                  }`}
                  style={
                    activeTab === "transmission"
                      ? { color: theme.accent }
                      : undefined
                  }
                >
                  <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{t("tabTransmission")}</span>
                </button>
              </div>

              {/* Tab 1: Focus & Specialties View */}
              {activeTab === "capabilities" && (
                <div className="mt-3.5 sm:mt-4 space-y-3 sm:space-y-4 text-left transition-opacity duration-200">
                  {/* Interactive Specialties Tags */}
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-text-secondary mb-2">
                      // {t("tabCapabilities")}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {persona.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex items-center rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-display font-semibold bg-white border border-slate-200/80 text-text-primary shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm cursor-default"
                          style={{
                            borderLeftWidth: "3px",
                            borderLeftColor: theme.accent,
                          }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Directive Console Box */}
                  {persona.directive && (
                    <div className="console-inset-box p-3 sm:p-4 rounded-xl text-left mt-2.5 sm:mt-3">
                      <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-text-secondary mb-1">
                        <Terminal className="w-3 h-3" style={{ color: theme.accent }} />
                        <span>// {t("directiveLabel")}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-display text-slate-700 leading-normal">
                        {persona.directive}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Live Transmission Dialogue Sample */}
              {activeTab === "transmission" && (
                <div className="mt-3.5 sm:mt-4 space-y-2.5 sm:space-y-3 text-left transition-opacity duration-200">
                  {persona.transmissionSample ? (
                    <div className="console-inset-box p-3 sm:p-4 rounded-xl space-y-2.5 sm:space-y-3">
                      {/* User Prompt */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] sm:text-[9px] font-mono font-black uppercase tracking-wider text-text-secondary">
                            FIRDAN // DISPATCH
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyPrompt}
                            className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
                          >
                            {copied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600">{t("copiedPrompt")}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-slate-500" />
                                <span>{t("copyPrompt")}</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm font-display text-slate-800 bg-white/90 p-2.5 sm:p-3 rounded-lg border border-slate-200/80 leading-relaxed font-medium shadow-2xs">
                          &quot;{persona.transmissionSample.prompt}&quot;
                        </p>
                      </div>

                      {/* Agent Response */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[8px] sm:text-[9px] font-mono font-black uppercase tracking-wider" style={{ color: theme.accent }}>
                          <span>●</span>
                          <span>{persona.name.toUpperCase()} // INCOMING TRANSMISSION</span>
                        </div>
                        <p
                          className="text-xs sm:text-sm font-display text-slate-800 bg-white/90 p-2.5 sm:p-3 rounded-lg border border-slate-200/80 leading-relaxed shadow-2xs"
                          style={{
                            borderLeftWidth: "3px",
                            borderLeftColor: theme.accent,
                          }}
                        >
                          &quot;{persona.transmissionSample.response}&quot;
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="console-inset-box p-4 rounded-xl text-center text-xs text-text-secondary">
                      Transmission log unavailable.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Telemetry Status Widgets (3 Inset Tiles) */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200/80">
            <div className="dossier-animate-item console-inset-box p-2 sm:p-3 rounded-lg sm:rounded-xl text-left">
              <span className="block text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-text-secondary truncate">
                {t("telemetryRole")}
              </span>
              <span className="block text-[11px] sm:text-sm font-display font-bold text-text-primary mt-0.5 leading-snug line-clamp-2">
                {persona.personalityTag}
              </span>
            </div>

            <div className="dossier-animate-item console-inset-box p-2 sm:p-3 rounded-lg sm:rounded-xl text-left">
              <span className="block text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-text-secondary truncate">
                {t("telemetryFreq")}
              </span>
              <span
                className="block text-[11px] sm:text-sm font-mono font-bold mt-0.5 leading-snug truncate"
                style={{ color: theme.accent }}
              >
                {persona.frequency.toFixed(1)} MHz
              </span>
            </div>

            <div className="dossier-animate-item console-inset-box p-2 sm:p-3 rounded-lg sm:rounded-xl text-left">
              <span className="block text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-text-secondary truncate">
                {t("telemetryStyle")}
              </span>
              <span className="block text-[11px] sm:text-sm font-display font-bold text-text-primary mt-0.5 leading-snug line-clamp-2">
                {persona.styleTag ?? "Autonomous"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
