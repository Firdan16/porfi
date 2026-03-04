"use client";
import React, { useEffect } from "react";
import MagneticElement from "./MagneticElement";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TechStack() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const techCards = document.querySelectorAll(".tech-switch");
        const stackLabel = document.getElementById("stack-label-text");
        const defaultLabel = "Synchronized Core";

        if (techCards.length > 0) {
            gsap.fromTo(
                techCards,
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: ".artifact-scroll-container",
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: "back.out(1.7)",
                }
            );
        }

        const handleMouseEnter = (card: Element) => {
            const techName = card.getAttribute("data-tech-name");
            if (techName && stackLabel) {
                stackLabel.style.opacity = "0";
                stackLabel.style.transform = "translateY(-2px)";
                setTimeout(() => {
                    stackLabel.innerText = techName;
                    stackLabel.style.opacity = "1";
                    stackLabel.style.transform = "translateY(0)";
                }, 150);
            }
        };

        const handleMouseLeave = () => {
            if (stackLabel) {
                stackLabel.style.opacity = "0";
                stackLabel.style.transform = "translateY(2px)";
                setTimeout(() => {
                    stackLabel.innerText = defaultLabel;
                    stackLabel.style.opacity = "1";
                    stackLabel.style.transform = "translateY(0)";
                }, 150);
            }
        };

        techCards.forEach((card) => {
            card.addEventListener("mouseenter", () => handleMouseEnter(card));
            card.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            techCards.forEach((card) => {
                card.removeEventListener("mouseenter", () => handleMouseEnter(card));
                card.removeEventListener("mouseleave", handleMouseLeave);
            });
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section
            className="py-32 bg-[#E9ECEF] shadow-[inset_0_20px_40px_rgba(0,0,0,0.03)] border-t border-white relative overflow-hidden stack-grid-bg"
            id="stack"
        >
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1100px] mx-auto flex flex-col items-center justify-center gap-20 relative z-10 px-6 md:px-12">
                <div className="text-center relative">
                    <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full module-badge">
                        <div className="w-2 h-2 rounded-full bg-primary pulse-blue"></div>
                        <span
                            className="text-text-primary text-[10px] font-mono uppercase tracking-[0.2em] font-black opacity-80"
                            id="stack-label-text"
                        >
                            Synchronized Core
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-serif font-semibold italic text-text-primary tracking-tight raised-text mb-4">
                        Technical <span className="text-primary/80">Modules</span>
                    </h2>
                    <p className="max-w-md mx-auto text-text-secondary text-sm font-medium opacity-60 leading-relaxed font-sans mt-4">
                        Precision-engineered software components designed for scalability and performance.
                    </p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 artifact-scroll-container">
                    {/* Flutter */}
                    <MagneticElement
                        className="tech-switch p-10 flex flex-col items-start justify-between gap-8 cursor-pointer group hover:bg-white/10"
                        as="div"
                        // @ts-ignore
                        data-tech-name="Flutter Framework"
                    >
                        <div className="flex flex-col gap-6 relative z-10 pointer-events-none w-full">
                            <div className="h-20 w-20 rounded-[1.75rem] icon-container-premium flex items-center justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="Flutter"
                                    className="w-12 h-12 object-contain drop-shadow-xl"
                                    src="https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h4 className="font-extrabold text-3xl text-text-primary font-display tracking-tighter group-hover:text-primary transition-colors duration-300">
                                    Flutter
                                </h4>
                                <span className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.15em] font-black opacity-40 group-hover:opacity-100 transition-opacity">
                                    Core Engine
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="led-indicator scale-125"></div>
                        </div>
                    </MagneticElement>

                    {/* Firebase */}
                    <MagneticElement
                        className="tech-switch p-10 flex flex-col items-start justify-between gap-8 cursor-pointer group hover:bg-white/10"
                        as="div"
                        // @ts-ignore
                        data-tech-name="Firebase Core"
                    >
                        <div className="flex flex-col gap-6 relative z-10 pointer-events-none w-full">
                            <div className="h-20 w-20 rounded-[1.75rem] icon-container-premium flex items-center justify-center p-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="Firebase"
                                    className="w-full h-full object-contain drop-shadow-xl"
                                    src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h4 className="font-extrabold text-3xl text-text-primary font-display tracking-tighter group-hover:text-primary transition-colors duration-300">
                                    Firebase
                                </h4>
                                <span className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.15em] font-black opacity-40 group-hover:opacity-100 transition-opacity">
                                    Cloud Logic
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="led-indicator scale-125"></div>
                        </div>
                    </MagneticElement>

                    {/* Dart */}
                    <MagneticElement
                        className="tech-switch p-10 flex flex-col items-start justify-between gap-8 cursor-pointer group hover:bg-white/10"
                        as="div"
                        // @ts-ignore
                        data-tech-name="Dart Language"
                    >
                        <div className="flex flex-col gap-6 relative z-10 pointer-events-none w-full">
                            <div className="h-20 w-20 rounded-[1.75rem] icon-container-premium flex items-center justify-center p-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="Dart"
                                    className="w-full h-full object-contain drop-shadow-xl"
                                    src="https://www.vectorlogo.zone/logos/dartlang/dartlang-icon.svg"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h4 className="font-extrabold text-3xl text-text-primary font-display tracking-tighter group-hover:text-primary transition-colors duration-300">
                                    Dart
                                </h4>
                                <span className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.15em] font-black opacity-40 group-hover:opacity-100 transition-opacity">
                                    Type Safe
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="led-indicator scale-125"></div>
                        </div>
                    </MagneticElement>

                    {/* Node.js */}
                    <MagneticElement
                        className="tech-switch p-10 flex flex-col items-start justify-between gap-8 cursor-pointer group hover:bg-white/10"
                        as="div"
                        // @ts-ignore
                        data-tech-name="Node.js Runtime"
                    >
                        <div className="flex flex-col gap-6 relative z-10 pointer-events-none w-full">
                            <div className="h-20 w-20 rounded-[1.75rem] icon-container-premium flex items-center justify-center p-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="Node.js"
                                    className="w-full h-full object-contain drop-shadow-xl"
                                    src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h4 className="font-extrabold text-3xl text-text-primary font-display tracking-tighter group-hover:text-primary transition-colors duration-300">
                                    Node.js
                                </h4>
                                <span className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.15em] font-black opacity-40 group-hover:opacity-100 transition-opacity">
                                    JS Runtime
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="led-indicator scale-125"></div>
                        </div>
                    </MagneticElement>

                    {/* NestJS */}
                    <MagneticElement
                        className="tech-switch p-10 flex flex-col items-start justify-between gap-8 cursor-pointer group hover:bg-white/10"
                        as="div"
                        // @ts-ignore
                        data-tech-name="NestJS Framework"
                    >
                        <div className="flex flex-col gap-6 relative z-10 pointer-events-none w-full">
                            <div className="h-20 w-20 rounded-[1.75rem] icon-container-premium flex items-center justify-center p-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="NestJS"
                                    className="w-full h-full object-contain drop-shadow-xl"
                                    src="https://www.vectorlogo.zone/logos/nestjs/nestjs-icon.svg"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h4 className="font-extrabold text-3xl text-text-primary font-display tracking-tighter group-hover:text-primary transition-colors duration-300">
                                    NestJS
                                </h4>
                                <span className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.15em] font-black opacity-40 group-hover:opacity-100 transition-opacity">
                                    Backend Arch
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="led-indicator scale-125"></div>
                        </div>
                    </MagneticElement>

                    {/* Supabase */}
                    <MagneticElement
                        className="tech-switch p-10 flex flex-col items-start justify-between gap-8 cursor-pointer group hover:bg-white/10"
                        as="div"
                        // @ts-ignore
                        data-tech-name="Supabase Backend"
                    >
                        <div className="flex flex-col gap-6 relative z-10 pointer-events-none w-full">
                            <div className="h-20 w-20 rounded-[1.75rem] icon-container-premium flex items-center justify-center p-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="Supabase"
                                    className="w-full h-full object-contain drop-shadow-xl"
                                    src="https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h4 className="font-extrabold text-3xl text-text-primary font-display tracking-tighter group-hover:text-primary transition-colors duration-300">
                                    Supabase
                                </h4>
                                <span className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.15em] font-black opacity-40 group-hover:opacity-100 transition-opacity">
                                    Postgres DB
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="led-indicator scale-125"></div>
                        </div>
                    </MagneticElement>
                </div>

                {/* Workflow Toolchain Section */}
                <div className="w-full mt-12 pt-12 border-t border-white/40">
                    <div className="flex flex-col items-center gap-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full module-badge scale-90 opacity-60">
                            <span className="text-text-primary text-[9px] font-mono uppercase tracking-[0.2em] font-black">
                                Auxiliary Systems
                            </span>
                        </div>

                        <div className="w-full flex flex-wrap justify-center gap-6">
                            {/* Figma */}
                            <MagneticElement
                                className="tech-switch px-8 py-5 flex items-center gap-4 cursor-pointer group hover:bg-white/10"
                                as="div"
                                // @ts-ignore
                                data-tech-name="Figma Design"
                            >
                                <div className="h-10 w-10 icon-container-premium flex items-center justify-center p-2 rounded-xl">
                                    <img
                                        alt="Figma"
                                        className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                        src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-lg text-text-primary font-display tracking-tight">Figma</h5>
                                </div>
                            </MagneticElement>

                            {/* GitHub */}
                            <MagneticElement
                                className="tech-switch px-8 py-5 flex items-center gap-4 cursor-pointer group hover:bg-white/10"
                                as="div"
                                // @ts-ignore
                                data-tech-name="GitHub Versioning"
                            >
                                <div className="h-10 w-10 icon-container-premium flex items-center justify-center p-2 rounded-xl">
                                    <img
                                        alt="GitHub"
                                        className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                        src="https://www.vectorlogo.zone/logos/github/github-icon.svg"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-lg text-text-primary font-display tracking-tight">GitHub</h5>
                                </div>
                            </MagneticElement>

                            {/* Postman */}
                            <MagneticElement
                                className="tech-switch px-8 py-5 flex items-center gap-4 cursor-pointer group hover:bg-white/10"
                                as="div"
                                // @ts-ignore
                                data-tech-name="Postman Testing"
                            >
                                <div className="h-10 w-10 icon-container-premium flex items-center justify-center p-2 rounded-xl">
                                    <img
                                        alt="Postman"
                                        className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                        src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-lg text-text-primary font-display tracking-tight">Postman</h5>
                                </div>
                            </MagneticElement>

                            {/* Git */}
                            <MagneticElement
                                className="tech-switch px-8 py-5 flex items-center gap-4 cursor-pointer group hover:bg-white/10"
                                as="div"
                                // @ts-ignore
                                data-tech-name="Git SCM"
                            >
                                <div className="h-10 w-10 icon-container-premium flex items-center justify-center p-2 rounded-xl">
                                    <img
                                        alt="Git"
                                        className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                        src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-lg text-text-primary font-display tracking-tight">Git</h5>
                                </div>
                            </MagneticElement>

                            {/* Notion */}
                            <MagneticElement
                                className="tech-switch px-8 py-5 flex items-center gap-4 cursor-pointer group hover:bg-white/10"
                                as="div"
                                // @ts-ignore
                                data-tech-name="Notion Workspace"
                            >
                                <div className="h-10 w-10 icon-container-premium flex items-center justify-center p-2 rounded-xl">
                                    <img
                                        alt="Notion"
                                        className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                        src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-lg text-text-primary font-display tracking-tight">Notion</h5>
                                </div>
                            </MagneticElement>

                            {/* GPT */}
                            <MagneticElement
                                className="tech-switch px-8 py-5 flex items-center gap-4 cursor-pointer group hover:bg-white/10"
                                as="div"
                                // @ts-ignore
                                data-tech-name="OpenAI GPT"
                            >
                                <div className="h-10 w-10 icon-container-premium flex items-center justify-center p-2 rounded-xl">
                                    <img
                                        alt="GPT"
                                        className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                        src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-lg text-text-primary font-display tracking-tight">GPT</h5>
                                </div>
                            </MagneticElement>

                            {/* Gemini */}
                            <MagneticElement
                                className="tech-switch px-8 py-5 flex items-center gap-4 cursor-pointer group hover:bg-white/10"
                                as="div"
                                // @ts-ignore
                                data-tech-name="Google Gemini"
                            >
                                <div className="h-10 w-10 icon-container-premium flex items-center justify-center p-2 rounded-xl">
                                    <img
                                        alt="Gemini"
                                        className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity scale-125"
                                        src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-lg text-text-primary font-display tracking-tight">Gemini</h5>
                                </div>
                            </MagneticElement>

                            {/* Docker */}
                            <MagneticElement
                                className="tech-switch px-8 py-5 flex items-center gap-4 cursor-pointer group hover:bg-white/10"
                                as="div"
                                // @ts-ignore
                                data-tech-name="Docker Container"
                            >
                                <div className="h-10 w-10 icon-container-premium flex items-center justify-center p-2 rounded-xl">
                                    <img
                                        alt="Docker"
                                        className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                        src="https://www.vectorlogo.zone/logos/docker/docker-tile.svg"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-lg text-text-primary font-display tracking-tight">Docker</h5>
                                </div>
                            </MagneticElement>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
