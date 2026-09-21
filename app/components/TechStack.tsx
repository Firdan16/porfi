"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const groups = [
    { key: "build", title: "Build", tools: ["Flutter", "Node.js", "NestJS", "Firebase", "Supabase"] },
    { key: "ship", title: "Ship", tools: ["RevenueCat", "Docker", "Git", "Postman"] },
    { key: "think", title: "Think", tools: ["Gemini", "Codex", "Claude", "n8n"] },
    { key: "collaborate", title: "Collaborate", tools: ["Figma", "Notion", "GitHub", "Hermes"] },
];

const logos: Record<string, string> = {
    Flutter: "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg",
    "Node.js": "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
    NestJS: "https://www.vectorlogo.zone/logos/nestjs/nestjs-icon.svg",
    Firebase: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
    Supabase: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg",
    RevenueCat: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/revenuecat.svg",
    Docker: "https://www.vectorlogo.zone/logos/docker/docker-tile.svg",
    Git: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
    Postman: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
    Gemini: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
    Codex: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/codex-color.svg",
    Claude: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/claudecode-color.svg",
    "n8n": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/n8n.svg",
    Figma: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg",
    Notion: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/notion.svg",
    GitHub: "https://www.vectorlogo.zone/logos/github/github-icon.svg",
    Hermes: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/hermesagent.svg",
};

export default function TechStack() {
    const t = useTranslations("techStack");
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo("[data-material-group]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 82%", toggleActions: "play none none none" } });
        }, section);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="stack" className="section-deferred border-y border-[var(--line)] bg-[var(--paper-deep)] px-4 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
                <div>
                    <p className="archive-caption mb-5 text-[var(--identity)]">{t("workflow.sectionEyebrow")}</p>
                    <h2 className="max-w-[420px] font-serif text-5xl font-semibold leading-[0.88] tracking-[-0.05em] text-[var(--ink)] sm:text-6xl">{t("workflow.statement")}</h2>
                    <p className="mt-6 max-w-sm text-sm leading-[1.75] text-[var(--ink-soft)] sm:text-base">{t("subtitle")}</p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12">
                    {groups.map((group) => (
                        <div key={group.key} data-material-group className="border-t border-[var(--ink)] pt-3">
                            <div className="mb-5 flex items-baseline justify-between gap-3">
                                <h3 className="font-serif text-3xl font-semibold italic text-[var(--ink)]">{group.title}</h3>
                                <span className="archive-caption">{group.tools.length} tools</span>
                            </div>
                            <ul className="space-y-3">
                                {group.tools.map((tool) => (
                                    <li key={tool} className="flex items-center gap-3 text-sm font-bold text-[var(--ink)]">
                                        <Image src={logos[tool]} alt="" aria-hidden="true" width={22} height={22} unoptimized className="h-5 w-5 object-contain grayscale" />
                                        <span>{tool}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
