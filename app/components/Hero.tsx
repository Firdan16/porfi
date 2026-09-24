"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import MagneticElement from "./MagneticElement";
import AppIcon from "./AppIcon";
import BrandIcon from "./BrandIcon";
import portraitImg from "@/public/assets/foto_formal.jpg";
import mark from "@/public/assets/logo-nonbg.png";

export default function Hero() {
    const t = useTranslations("hero");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const portrait = container?.querySelector<HTMLElement>("[data-portrait]");
        const image = portrait?.querySelector<HTMLElement>("img");
        if (!container || !portrait || !image) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const handleMove = (event: MouseEvent) => {
            const rect = portrait.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            gsap.to(image, { x: x * 8, y: y * 8, scale: 1.025, duration: 0.4, ease: "power2.out", overwrite: true });
        };
        const handleLeave = () => gsap.to(image, { x: 0, y: 0, scale: 1, duration: 0.45, ease: "power2.out", overwrite: true });

        if (finePointer && !reducedMotion) {
            portrait.addEventListener("mousemove", handleMove);
            portrait.addEventListener("mouseleave", handleLeave);
        }

        const ctx = gsap.context(() => {
            if (reducedMotion) return;
            gsap.fromTo("[data-hero-reveal]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: "power3.out" });
        }, container);

        return () => {
            portrait.removeEventListener("mousemove", handleMove);
            portrait.removeEventListener("mouseleave", handleLeave);
            ctx.revert();
        };
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[calc(100dvh-4rem)] overflow-hidden px-4 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28 lg:px-12">
            <Image src={mark} alt="" aria-hidden="true" sizes="(min-width: 1200px) 560px, 48vw" className="pointer-events-none absolute -right-24 top-24 z-0 w-[min(48vw,560px)] opacity-[0.07] sm:-right-16 sm:top-28" />
            <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-end gap-10 md:grid-cols-[0.92fr_1.08fr] md:gap-12 lg:grid-cols-[minmax(300px,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
                <div data-portrait className="artifact-frame relative mx-auto aspect-[4/5] w-full max-w-[320px] rotate-[-2deg] md:mx-0 md:max-w-[390px]">
                    <div className="absolute -bottom-3 -right-3 h-full w-full border border-[var(--identity)] bg-[var(--identity-soft)]" aria-hidden="true" />
                    <div className="relative h-full w-full overflow-hidden bg-[var(--navy)]">
                        <Image src={portraitImg} alt={t("portraitAlt")} fill priority sizes="(min-width: 768px) 390px, 320px" className="object-cover grayscale-[20%] contrast-105" />
                    </div>
                    <span className="archive-caption absolute -bottom-8 left-0">Portrait / Firdan Umar / creative technologist</span>
                </div>

                <div className="relative pb-2 md:pb-10">
                    <p data-hero-reveal className="archive-caption mb-5 text-[var(--identity)]">Portfolio / mobile products / AI tools</p>
                    <h1 data-hero-reveal className="max-w-[760px] font-serif text-[clamp(4.8rem,12vw,10rem)] font-semibold leading-[0.78] tracking-[-0.075em] text-[var(--ink)] sm:text-[clamp(5.5rem,11vw,9rem)]">{t("name")}</h1>
                    <p data-hero-reveal className="mt-7 max-w-[520px] font-serif text-3xl italic leading-[0.98] text-[var(--identity)] sm:text-4xl md:text-5xl">{t("role")}, building digital products with a point of view.</p>
                    <div data-hero-reveal className="mt-8 max-w-[470px] border-t border-[var(--line)] pt-5 sm:mt-10">
                        <p className="text-sm leading-[1.75] text-[var(--ink-soft)] sm:text-base">{t("bioPrefix")} <strong className="font-bold text-[var(--ink)]">{t("bioHighlight")}</strong> {t("bioSuffix")}</p>
                    </div>
                    <div data-hero-reveal className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-9">
                        <MagneticElement as="a" href="mailto:firdanmaru@gmail.com" aria-label={t("gmailTitle")} className="archive-link"><AppIcon name="alternate_email" className="h-4 w-4 shrink-0" /> Email</MagneticElement>
                        <MagneticElement as="a" href="https://github.com/Firdan16" target="_blank" rel="noopener noreferrer" aria-label={t("githubTitle")} className="archive-link"><BrandIcon name="github" className="h-4 w-4 shrink-0" /> GitHub</MagneticElement>
                        <MagneticElement as="a" href="https://www.linkedin.com/in/firdan-umar-arisyawal-132b11282" target="_blank" rel="noopener noreferrer" aria-label={t("linkedinTitle")} className="archive-link"><BrandIcon name="linkedin" className="h-4 w-4 shrink-0" /> LinkedIn</MagneticElement>
                    </div>
                </div>
            </div>
        </section>
    );
}
