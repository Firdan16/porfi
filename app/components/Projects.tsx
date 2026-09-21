"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import type { Project } from "@/content/projects/types";
import AppIcon from "./AppIcon";
import DemoClip from "./DemoClip";

const ProjectModal = dynamic(() => import("./ProjectModal"), { ssr: false });

interface ProjectsProps {
    projects: Project[];
}

const chapterAccents = ["#2459c4", "#c72f69", "#416b48", "#d66f58", "#7568d9", "#a98b47", "#2459c4", "#3f6fd8"];

export default function Projects({ projects }: ProjectsProps) {
    const t = useTranslations("projects");
    const stageRef = useRef<HTMLDivElement>(null);
    const triggerRefs = useRef<Record<number, HTMLButtonElement | null>>({});
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const activeProject = projects[activeIndex] ?? projects[0];
    const activeAccent = chapterAccents[activeIndex % chapterAccents.length];

    useEffect(() => {
        if (!stageRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.fromTo(stageRef.current, { opacity: 0.35, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" });
    }, [activeIndex]);

    const selectProject = (index: number) => setActiveIndex(index);
    const openProject = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    if (!activeProject) return null;

    return (
        <section id="projects" className="section-deferred bg-[var(--paper-deep)] px-4 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <div className="mx-auto max-w-[1200px]">
                <div className="mb-12 max-w-[700px] sm:mb-16">
                    <p className="archive-caption mb-5 text-[var(--identity)]">{t("sectionEyebrow")}</p>
                    <h2 className="font-serif text-6xl font-semibold leading-[0.82] tracking-[-0.06em] text-[var(--ink)] sm:text-8xl">{t("heading")} <em className="font-normal text-[var(--identity)]">{t("headingAccent")}</em></h2>
                    <p className="mt-7 max-w-xl text-sm leading-[1.75] text-[var(--ink-soft)] sm:text-base">{t("subtitle")}</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[minmax(230px,0.38fr)_minmax(0,0.62fr)] lg:gap-14">
                    <nav aria-label={t("projectIndex")} className="order-2 lg:order-1">
                        <p className="archive-caption mb-4">{t("projectIndex")}</p>
                        <div className="border-t border-[var(--ink)]">
                            {projects.map((project, index) => {
                                const active = index === activeIndex;
                                const accent = chapterAccents[index % chapterAccents.length];
                                return (
                                    <button key={project.id} type="button" ref={(element) => { triggerRefs.current[project.id] = element; }} onClick={() => selectProject(index)} aria-pressed={active} className={`group relative flex w-full items-start gap-3 border-b border-[var(--line)] py-4 pl-0 text-left transition-colors sm:py-5 ${active ? "text-[var(--ink)]" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"}`}>
                                        <span className={`absolute bottom-0 left-0 top-0 w-1 transition-transform ${active ? "scale-y-100" : "scale-y-0 group-hover:scale-y-50"}`} style={{ backgroundColor: accent }} aria-hidden="true" />
                                        <span className="archive-caption pl-3 pt-1" style={{ color: active ? accent : undefined }}>{String(index + 1).padStart(2, "0")}</span>
                                        <span className="min-w-0 flex-1"><span className={`block font-serif text-2xl leading-none sm:text-3xl ${active ? "font-semibold" : "font-normal"}`}>{project.title}</span><span className="mt-2 block text-[10px] font-bold uppercase tracking-[0.12em] opacity-65">{project.category}</span></span>
                                        <AppIcon name="arrow_forward_ios" className={`mt-1 h-3.5 w-3.5 shrink-0 transition-transform ${active ? "translate-x-1 opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                                    </button>
                                );
                            })}
                        </div>
                    </nav>

                    <div ref={stageRef} className="order-1 lg:order-2" style={{ ["--chapter" as string]: activeAccent }}>
                        <div className="relative overflow-hidden py-2 sm:py-4" style={{ backgroundColor: activeProject.color }}>
                            <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(135deg, ${activeAccent}, transparent 54%)` }} />
                            <button type="button" onClick={() => openProject(activeProject)} aria-label={t("openDetails", { title: activeProject.title })} className="group relative mx-auto block aspect-[1.12/1] w-[88%] text-left sm:aspect-[1.28/1] sm:w-[84%] lg:w-[82%]">
                                {activeProject.kind === "package" && activeProject.demoVideo ? (
                                    <DemoClip src={activeProject.demoVideo} poster={activeProject.mainImage ?? ""} label={t("interfaceAlt", { title: activeProject.title })} className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.02]" />
                                ) : (
                                    <Image src={activeProject.mainImage ?? ""} alt={t("interfaceAlt", { title: activeProject.title })} fill sizes="(min-width: 1024px) 48vw, 82vw" className="object-contain transition-transform duration-700 group-hover:scale-[1.025]" />
                                )}
                            </button>
                        </div>
                        <div className="grid gap-5 border-b border-[var(--ink)] py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-10 sm:py-8">
                            <div>
                                <p className="archive-caption mb-3" style={{ color: activeAccent }}>{activeProject.tech.slice(0, 3).join(" / ")}</p>
                                <h3 className="font-serif text-5xl font-semibold leading-[0.84] tracking-[-0.05em] text-[var(--ink)] sm:text-7xl">{activeProject.title}</h3>
                                <p className="mt-5 max-w-xl text-sm leading-[1.75] text-[var(--ink-soft)] sm:text-base">{activeProject.description}</p>
                            </div>
                            <div className="flex items-end sm:pb-1"><button type="button" onClick={() => openProject(activeProject)} className="archive-link">{t("viewProject")} <AppIcon name="arrow_forward_ios" className="h-3 w-3" /></button></div>
                        </div>
                        <div className="flex items-center justify-between gap-4 pt-4"><span className="archive-caption">{t("projectPosition", { current: String(activeIndex + 1).padStart(2, "0"), total: String(projects.length).padStart(2, "0") })}</span><div className="h-px flex-1 bg-[var(--line)]" /><span className="archive-caption" style={{ color: activeAccent }}>{activeProject.category}</span></div>
                    </div>
                </div>
            </div>

            <ProjectModal key={selectedProject?.id ?? "project-modal"} project={selectedProject} isOpen={isModalOpen} onClosed={(closedProject) => { setIsModalOpen(false); setSelectedProject(null); const index = projects.findIndex((project) => project.id === closedProject.id); if (index >= 0) setActiveIndex(index); triggerRefs.current[closedProject.id]?.focus(); }} />
        </section>
    );
}
