"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import type { Project } from "@/content/projects/types";
import AppIcon from "./AppIcon";
import DemoClip from "./DemoClip";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClosed?: (project: Project) => void;
}

export default function ProjectModal({ project, isOpen, onClosed }: ProjectModalProps) {
    const t = useTranslations("projects");
    const overlayRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const activeElementRef = useRef<HTMLElement | null>(null);
    const unlockScrollRef = useRef<(() => void) | null>(null);
    const swipeStartX = useRef<number | null>(null);
    const closingRef = useRef(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

    useEffect(() => {
        if (!project || !isOpen || closingRef.current) return;
        activeElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const previousBodyOverflow = document.body.style.overflow;
        const previousDocumentOverflow = document.documentElement.style.overflow;
        const previousScrollY = window.scrollY;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const overlay = overlayRef.current;
        const dialog = dialogRef.current;
        const unlockScroll = () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousDocumentOverflow;
            window.lenis?.start();
            window.isModalOpen = false;
            window.dispatchEvent(new Event("modalToggle"));
            window.scrollTo({ top: previousScrollY, behavior: "auto" });
        };

        unlockScrollRef.current = unlockScroll;
        window.isModalOpen = true;
        window.lenis?.stop();
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        window.dispatchEvent(new Event("modalToggle"));

        if (overlay && dialog) {
            gsap.killTweensOf([overlay, dialog]);
            if (reducedMotion) gsap.set([overlay, dialog], { autoAlpha: 1, scale: 1, y: 0 });
            else {
                gsap.set(overlay, { autoAlpha: 0 });
                gsap.set(dialog, { autoAlpha: 0, y: 18, scale: 0.985 });
                gsap.to(overlay, { autoAlpha: 1, duration: 0.2, ease: "power2.out" });
                gsap.to(dialog, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" });
            }
        }

        const focusId = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
        return () => window.cancelAnimationFrame(focusId);
    }, [project, isOpen]);

    useEffect(() => {
        const overlay = overlayRef.current;
        const dialog = dialogRef.current;
        return () => {
            unlockScrollRef.current?.();
            gsap.killTweensOf([overlay, dialog]);
        };
    }, []);

    const finishClose = () => {
        if (!project) return;
        unlockScrollRef.current?.();
        unlockScrollRef.current = null;
        closingRef.current = false;
        activeElementRef.current?.focus();
        onClosed?.(project);
    };

    const handleClose = () => {
        if (!isOpen || closingRef.current) return;
        closingRef.current = true;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const overlay = overlayRef.current;
        const dialog = dialogRef.current;
        if (reducedMotion || !overlay || !dialog) {
            finishClose();
            return;
        }
        gsap.killTweensOf([overlay, dialog]);
        gsap.to(overlay, { autoAlpha: 0, duration: 0.18, ease: "power2.in" });
        gsap.to(dialog, { autoAlpha: 0, y: 12, scale: 0.985, duration: 0.22, ease: "power2.in", onComplete: finishClose });
    };

    const goToImage = (index: number, direction: "next" | "prev" = "next") => {
        if (!project) return;
        const total = project.images?.length ?? 0;
        if (total === 0) return;
        setSlideDirection(direction);
        setActiveIdx((index + total) % total);
    };
    const goNext = () => goToImage(activeIdx + 1, "next");
    const goPrevious = () => goToImage(activeIdx - 1, "prev");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") { event.preventDefault(); handleClose(); return; }
        if (event.key === "ArrowRight") { event.preventDefault(); goNext(); return; }
        if (event.key === "ArrowLeft") { event.preventDefault(); goPrevious(); return; }
        if (event.key !== "Tab" || !dialogRef.current) return;
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])")).filter((element) => !element.hasAttribute("disabled"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => { swipeStartX.current = event.clientX; };
    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
        if (swipeStartX.current === null) return;
        const distance = event.clientX - swipeStartX.current;
        swipeStartX.current = null;
        if (Math.abs(distance) < 40) return;
        if (distance < 0) goNext();
        else goPrevious();
    };

    if (typeof document === "undefined" || !isOpen || !project) return null;

    return createPortal(
        <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-end justify-center bg-[var(--navy)]/80 p-0 sm:items-center sm:p-4 lg:p-8" onClick={(event) => event.target === event.currentTarget && handleClose()} onKeyDown={handleKeyDown}>
            <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={`project-title-${project.id}`} aria-describedby={`project-description-${project.id}`} className="relative flex h-[100dvh] max-h-[100dvh] w-full max-w-[1180px] flex-col overflow-y-auto overscroll-contain bg-[var(--paper)] sm:h-[min(92dvh,900px)] sm:max-h-none sm:overflow-y-auto lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:overflow-hidden">
                <div className="absolute left-1/2 top-3 z-30 h-1 w-12 -translate-x-1/2 bg-[var(--line)] sm:hidden" aria-hidden="true" />
                <button ref={closeButtonRef} type="button" onClick={handleClose} aria-label={t("closeDetails")} className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--paper)] sm:right-6 sm:top-6"><AppIcon name="close" className="h-5 w-5" /></button>

                <div className="order-1 min-h-max shrink-0 border-b border-[var(--line)] p-5 pb-10 sm:p-8 lg:order-1 lg:min-h-0 lg:shrink lg:overflow-y-auto lg:border-b-0 lg:border-r lg:p-10">
                    <div className="flex items-start justify-between gap-5"><p className="archive-caption text-[var(--identity)]">{project.category}</p><span className="archive-caption">{project.version}</span></div>
                    <h2 id={`project-title-${project.id}`} className="mt-8 max-w-md font-serif text-5xl font-semibold leading-[0.84] tracking-[-0.05em] text-[var(--ink)] sm:text-6xl">{project.title}</h2>
                    <p id={`project-description-${project.id}`} className="mt-6 max-w-md text-sm leading-[1.75] text-[var(--ink-soft)] sm:text-base">{project.description}</p>
                    <div className="mt-9 border-t border-[var(--ink)] pt-4"><p className="archive-caption mb-5">{t("coreIdea")}</p><div className="space-y-5">{project.features.slice(0, 3).map((feature, index) => <div key={feature.text} className="grid grid-cols-[2rem_1fr] gap-3"><span className="font-serif text-2xl italic text-[var(--identity)]">0{index + 1}</span><div><div className="flex items-start gap-2"><AppIcon name={feature.icon} className="mt-0.5 h-4 w-4 shrink-0 text-[var(--identity)]" /><h3 className="text-sm font-bold text-[var(--ink)]">{feature.text}</h3></div>{feature.description && <p className="mt-1.5 text-xs leading-[1.65] text-[var(--ink-soft)]">{feature.description}</p>}</div></div>)}</div></div>
                    {project.features.length > 3 && <div className="mt-8 border-t border-[var(--line)] pt-4"><p className="archive-caption mb-3">{t("alsoIncludes")}</p><p className="text-xs font-bold leading-[1.8] text-[var(--ink-soft)]">{project.features.slice(3).map((feature) => feature.text).join(" / ")}</p></div>}
                    <div className="mt-8 border-t border-[var(--line)] pt-4"><p className="archive-caption mb-3">{t("builtWith")}</p><p className="text-sm font-bold leading-[1.8] text-[var(--ink)]">{project.tech.join(" / ")}</p></div>
                    {project.kind === "package" && project.packageMeta && <div className="mt-8 border-t border-[var(--line)] pt-4"><p className="archive-caption mb-5">{t("registryLabel")}</p><div className="grid grid-cols-2 gap-x-6 gap-y-5"><div><p className="archive-caption">{t("installLabel")}</p><p className="mt-2 font-mono text-xs font-bold text-[var(--ink)]">{project.packageMeta.install}</p></div><div><p className="archive-caption">{t("licenseLabel")}</p><p className="mt-2 text-xs font-bold text-[var(--ink)]">{project.packageMeta.license}</p></div><div><p className="archive-caption">{t("dependenciesLabel")}</p><p className="mt-2 text-xs font-bold text-[var(--ink)]">{project.packageMeta.dependencies}</p></div><div><p className="archive-caption">{t("platformsLabel")}</p><p className="mt-2 text-xs font-bold text-[var(--ink)]">{project.packageMeta.platforms.join(" / ")}</p></div></div></div>}
                    {project.kind === "package" && project.packageMeta && <div className="mt-8 border-t border-[var(--line)] pt-4"><p className="archive-caption mb-3">{t("usageLabel")}</p><pre className="overflow-x-auto font-mono text-[11px] leading-[1.9] text-[var(--ink-soft)] sm:text-xs">{project.packageMeta.snippet.join("\n")}</pre></div>}
                    {(project.playStoreUrl || project.appStoreUrl || project.pubDevUrl || project.repositoryUrl) && <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--line)] pt-5">{project.playStoreUrl && <a className="archive-link" href={project.playStoreUrl} target="_blank" rel="noopener noreferrer">{t("googlePlay")}</a>}{project.appStoreUrl && <a className="archive-link" href={project.appStoreUrl} target="_blank" rel="noopener noreferrer">{t("appStore")}</a>}{project.pubDevUrl && <a className="archive-link" href={project.pubDevUrl} target="_blank" rel="noopener noreferrer">{t("viewOnPubDev")}</a>}{project.repositoryUrl && <a className="archive-link" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">{t("viewRepository")}</a>}</div>}
                </div>

                {project.kind === "package" && project.demoVideo ? (
                    <div className="order-2 flex min-h-[clamp(300px,48dvh,560px)] flex-col bg-[var(--navy)] p-3 sm:p-6 lg:order-2 lg:min-h-0 lg:p-8" style={{ backgroundColor: project.color }}>
                        <div className="relative min-h-0 flex-1 overflow-hidden">
                            <DemoClip src={project.demoVideo} poster={project.mainImage ?? ""} label={t("slideAlt", { title: project.title, index: 1 })} className="absolute inset-0 h-full w-full px-[8%] py-8 sm:px-[12%] sm:py-10" />
                        </div>
                        <div className="flex items-center justify-center gap-2 pt-4"><span className="archive-caption text-white/70">{t("registryLabel")} / v{project.version}</span></div>
                    </div>
                ) : (
                    <div className="order-2 flex min-h-[clamp(300px,48dvh,560px)] flex-col bg-[var(--navy)] p-3 sm:p-6 lg:order-2 lg:min-h-0 lg:p-8" style={{ backgroundColor: project.color }}>
                        <div className="relative min-h-0 flex-1 overflow-hidden" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
                            {(project.images ?? []).map((image, index) => <div key={image} className={`absolute inset-0 flex items-center justify-center px-[8%] py-8 sm:px-[12%] sm:py-10 ${activeIdx === index ? (slideDirection === "next" ? "project-slide-enter-next" : "project-slide-enter-prev") : "pointer-events-none opacity-0"}`} aria-hidden={activeIdx !== index}><Image src={image} alt={t("slideAlt", { title: project.title, index: index + 1 })} fill sizes="(min-width: 1024px) 52vw, 92vw" priority={activeIdx === index} className="object-contain" /></div>)}
                            <button type="button" onClick={goPrevious} aria-label={t("previousImage")} className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/30 bg-[var(--navy)]/45 text-white sm:left-2"><AppIcon name="arrow_back" className="h-4 w-4" /></button>
                            <button type="button" onClick={goNext} aria-label={t("nextImage")} className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/30 bg-[var(--navy)]/45 text-white sm:right-2"><AppIcon name="arrow_forward_ios" className="h-4 w-4" /></button>
                        </div>
                        <div className="flex items-center justify-center gap-2 pt-4" role="tablist" aria-label={t("screenshots")}>{(project.images ?? []).map((image, index) => <button key={image} type="button" onClick={() => goToImage(index, index > activeIdx ? "next" : "prev")} aria-label={t("goToImage", { index: index + 1 })} aria-current={activeIdx === index ? "true" : undefined} className={`h-2 rounded-full transition-[width,opacity,background-color] duration-300 ${activeIdx === index ? "w-7 bg-white opacity-100" : "w-2 bg-white/45 opacity-70 hover:opacity-100"}`} />)}</div>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}
