"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import MagneticElement from "./MagneticElement";
import AppIcon from "./AppIcon";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function TechLogo({
    alt,
    src,
    className,
    width = 48,
    height = 48,
}: {
    alt: string;
    src: string;
    className: string;
    width?: number;
    height?: number;
}) {
    return <Image alt={alt} src={src} className={className} width={width} height={height} />;
}

export default function TechStack() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const techCards = document.querySelectorAll(".tech-switch");
        const stackLabel = document.getElementById("stack-label-text");
        const defaultLabel = "Synchronized Core";
        const isTouch = window.matchMedia("(hover: none)").matches;

        if (isTouch) {
            // Early return for entrance animations only, skip hover logic
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
            return;
        }

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
            className="section-deferred py-32 bg-[#E9ECEF] shadow-[inset_0_20px_40px_rgba(0,0,0,0.03)] border-t border-white relative overflow-hidden stack-grid-bg"
            id="stack"
        >
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1100px] mx-auto flex flex-col items-center justify-center gap-20 relative z-10 px-6 md:px-12">
                <div className="text-center relative">
                    <h2 className="text-5xl md:text-7xl font-serif font-semibold italic text-text-primary tracking-tight raised-text mb-4">
                        Technical <span className="text-primary/80">Modules</span>
                    </h2>
                    <p className="max-w-md mx-auto text-text-secondary text-sm font-medium opacity-60 leading-relaxed font-sans mt-4">
                        Precision-engineered software components designed for scalability and performance.
                    </p>
                </div>

                <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 artifact-scroll-container">
                    {/* Flutter */}
                    <MagneticElement
                        className="tech-switch p-5 md:p-10 flex flex-col items-start justify-between gap-6 md:gap-8 md:cursor-pointer group md:hover:bg-white/10"
                        as="div"
                        data-tech-name="Flutter Framework"
                    >
                        <div className="flex flex-col gap-4 relative z-10 pointer-events-none w-full">
                            <div className="h-16 w-16 md:h-20 md:w-20 flex items-center justify-center">
                                <TechLogo alt="Flutter" className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-xl" src="https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-extrabold text-2xl md:text-3xl text-text-primary font-display tracking-tighter group-hover:text-primary transition-colors duration-300">
                                    Flutter
                                </h4>
                                <span className="text-[9px] md:text-[10px] font-mono text-text-secondary uppercase tracking-[0.1em] md:tracking-[0.15em] font-black opacity-40 group-hover:opacity-100 transition-opacity">
                                    Core Engine
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="led-indicator scale-110 md:scale-125"></div>
                        </div>
                    </MagneticElement>

                    {/* Firebase */}
                    <MagneticElement
                        className="tech-switch p-5 md:p-10 flex flex-col items-start justify-between gap-6 md:gap-8 md:cursor-pointer group md:hover:bg-white/10"
                        as="div"
                        data-tech-name="Firebase Core"
                    >
                        <div className="flex flex-col gap-4 relative z-10 pointer-events-none w-full">
                            <div className="h-16 w-16 md:h-20 md:w-20 flex items-center justify-center p-1 md:p-2">
                                <TechLogo alt="Firebase" className="w-full h-full object-contain drop-shadow-xl" src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-extrabold text-2xl md:text-3xl text-text-primary font-display tracking-tighter group-hover:text-primary transition-colors duration-300">
                                    Firebase
                                </h4>
                                <span className="text-[9px] md:text-[10px] font-mono text-text-secondary uppercase tracking-[0.1em] md:tracking-[0.15em] font-black opacity-40 group-hover:opacity-100 transition-opacity">
                                    Cloud Logic
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="led-indicator scale-110 md:scale-125"></div>
                        </div>
                    </MagneticElement>

                    {/* RevenueCat */}
                    <MagneticElement
                        className="tech-switch p-5 md:p-10 flex flex-col items-start justify-between gap-6 md:gap-8 md:cursor-pointer group md:hover:bg-white/10"
                        as="div"
                        data-tech-name="RevenueCat Subscriptions"
                    >
                        <div className="flex flex-col gap-4 relative z-10 pointer-events-none w-full">
                            <div className="h-16 w-16 md:h-20 md:w-20 flex items-center justify-center p-1 md:p-2">
                                <img 
                                    alt="RevenueCat" 
                                    className="w-full h-full object-contain drop-shadow-xl" 
                                    src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/revenuecat.svg"
                                    style={{ filter: "invert(22%) sepia(100%) saturate(1538%) hue-rotate(357deg)" }}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-extrabold text-2xl md:text-3xl text-text-primary font-display tracking-tighter group-hover:text-primary transition-colors duration-300">
                                    RevenueCat
                                </h4>
                                <span className="text-[9px] md:text-[10px] font-mono text-text-secondary uppercase tracking-[0.1em] md:tracking-[0.15em] font-black opacity-40 group-hover:opacity-100 transition-opacity">
                                    In-App Purchase
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="led-indicator scale-110 md:scale-125"></div>
                        </div>
                    </MagneticElement>

                    {/* Node.js */}
                    <MagneticElement
                        className="tech-switch p-5 md:p-10 flex flex-col items-start justify-between gap-6 md:gap-8 md:cursor-pointer group md:hover:bg-white/10"
                        as="div"
                        data-tech-name="Node.js Runtime"
                    >
                        <div className="flex flex-col gap-4 relative z-10 pointer-events-none w-full">
                            <div className="h-16 w-16 md:h-20 md:w-20 flex items-center justify-center p-1 md:p-2">
                                <TechLogo alt="Node.js" className="w-full h-full object-contain drop-shadow-xl" src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-extrabold text-2xl md:text-3xl text-text-primary font-display tracking-tighter group-hover:text-primary transition-colors duration-300">
                                    Node.js
                                </h4>
                                <span className="text-[9px] md:text-[10px] font-mono text-text-secondary uppercase tracking-[0.1em] md:tracking-[0.15em] font-black opacity-40 group-hover:opacity-100 transition-opacity">
                                    JS Runtime
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="led-indicator scale-110 md:scale-125"></div>
                        </div>
                    </MagneticElement>

                    {/* NestJS */}
                    <MagneticElement
                        className="tech-switch p-5 md:p-10 flex flex-col items-start justify-between gap-6 md:gap-8 md:cursor-pointer group md:hover:bg-white/10"
                        as="div"
                        data-tech-name="NestJS Framework"
                    >
                        <div className="flex flex-col gap-4 relative z-10 pointer-events-none w-full">
                            <div className="h-16 w-16 md:h-20 md:w-20 flex items-center justify-center p-1 md:p-2">
                                <TechLogo alt="NestJS" className="w-full h-full object-contain drop-shadow-xl" src="https://www.vectorlogo.zone/logos/nestjs/nestjs-icon.svg" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-extrabold text-2xl md:text-3xl text-text-primary font-display tracking-tighter group-hover:text-primary transition-colors duration-300">
                                    NestJS
                                </h4>
                                <span className="text-[9px] md:text-[10px] font-mono text-text-secondary uppercase tracking-[0.1em] md:tracking-[0.15em] font-black opacity-40 group-hover:opacity-100 transition-opacity">
                                    Backend Arch
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="led-indicator scale-110 md:scale-125"></div>
                        </div>
                    </MagneticElement>

                    {/* Supabase */}
                    <MagneticElement
                        className="tech-switch p-5 md:p-10 flex flex-col items-start justify-between gap-6 md:gap-8 md:cursor-pointer group md:hover:bg-white/10"
                        as="div"
                        data-tech-name="Supabase Backend"
                    >
                        <div className="flex flex-col gap-4 relative z-10 pointer-events-none w-full">
                            <div className="h-16 w-16 md:h-20 md:w-20 flex items-center justify-center p-1 md:p-2">
                                <TechLogo alt="Supabase" className="w-full h-full object-contain drop-shadow-xl" src="https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-extrabold text-2xl md:text-3xl text-text-primary font-display tracking-tighter group-hover:text-primary transition-colors duration-300">
                                    Supabase
                                </h4>
                                <span className="text-[9px] md:text-[10px] font-mono text-text-secondary uppercase tracking-[0.1em] md:tracking-[0.15em] font-black opacity-40 group-hover:opacity-100 transition-opacity">
                                    Postgres DB
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="led-indicator scale-110 md:scale-125"></div>
                        </div>
                    </MagneticElement>
                </div>

                {/* Workflow Toolchain Section */}
                <div className="w-full mt-10 pt-10 border-t border-white/40">
                    <div className="flex flex-col items-center gap-10">
                        <div className="text-center group cursor-default">
                            <span className="text-[10px] md:text-xs font-mono text-primary font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity duration-500 block mb-2">
                                Collaborative Logic
                            </span>
                            <h3 className="text-2xl md:text-4xl font-serif font-semibold italic text-text-primary tracking-tight opacity-90">
                                Workflow <span className="text-primary/70">&</span> Ecosystem
                            </h3>
                        </div>

                        <div className="w-full grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
                            {/* Figma */}
                            <MagneticElement
                                className="tech-switch p-4 sm:px-8 sm:py-5 flex items-center gap-3 md:gap-4 md:cursor-pointer group md:hover:bg-white/10"
                                as="div"
                                data-tech-name="Figma Design"
                            >
                                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center">
                                    <TechLogo alt="Figma" className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" width={40} height={40} />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-base sm:text-lg text-text-primary font-display tracking-tight">Figma</h5>
                                </div>
                            </MagneticElement>

                            {/* GitHub */}
                            <MagneticElement
                                className="tech-switch p-4 sm:px-8 sm:py-5 flex items-center gap-3 md:gap-4 md:cursor-pointer group md:hover:bg-white/10"
                                as="div"
                                data-tech-name="GitHub Versioning"
                            >
                                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center">
                                    <TechLogo alt="GitHub" className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" src="https://www.vectorlogo.zone/logos/github/github-icon.svg" width={40} height={40} />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-base sm:text-lg text-text-primary font-display tracking-tight">GitHub</h5>
                                </div>
                            </MagneticElement>

                            {/* Postman */}
                            <MagneticElement
                                className="tech-switch p-4 sm:px-8 sm:py-5 flex items-center gap-3 md:gap-4 md:cursor-pointer group md:hover:bg-white/10"
                                as="div"
                                data-tech-name="Postman Testing"
                            >
                                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center">
                                    <TechLogo alt="Postman" className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" width={40} height={40} />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-base sm:text-lg text-text-primary font-display tracking-tight">Postman</h5>
                                </div>
                            </MagneticElement>

                            {/* Git */}
                            <MagneticElement
                                className="tech-switch p-4 sm:px-8 sm:py-5 flex items-center gap-3 md:gap-4 md:cursor-pointer group md:hover:bg-white/10"
                                as="div"
                                data-tech-name="Git SCM"
                            >
                                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center">
                                    <TechLogo alt="Git" className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" width={40} height={40} />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-base sm:text-lg text-text-primary font-display tracking-tight">Git</h5>
                                </div>
                            </MagneticElement>

                            {/* Notion */}
                            <MagneticElement
                                className="tech-switch p-4 sm:px-8 sm:py-5 flex items-center gap-3 md:gap-4 md:cursor-pointer group md:hover:bg-white/10"
                                as="div"
                                data-tech-name="Notion Workspace"
                            >
                                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center">
                                    <TechLogo alt="Notion" className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/notion.svg" width={40} height={40} />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-base sm:text-lg text-text-primary font-display tracking-tight">Notion</h5>
                                </div>
                            </MagneticElement>

                            {/* GPT */}
                            <MagneticElement
                                className="tech-switch p-4 sm:px-8 sm:py-5 flex items-center gap-3 md:gap-4 md:cursor-pointer group md:hover:bg-white/10"
                                as="div"
                                data-tech-name="OpenAI GPT"
                            >
                                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center">
                                    <TechLogo alt="GPT" className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" width={40} height={40} />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-base sm:text-lg text-text-primary font-display tracking-tight">GPT</h5>
                                </div>
                            </MagneticElement>

                            {/* Gemini */}
                            <MagneticElement
                                className="tech-switch p-4 sm:px-8 sm:py-5 flex items-center gap-3 md:gap-4 md:cursor-pointer group md:hover:bg-white/10"
                                as="div"
                                data-tech-name="Google Gemini"
                            >
                                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center">
                                    <TechLogo alt="Gemini" className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity scale-125" src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" width={40} height={40} />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-base sm:text-lg text-text-primary font-display tracking-tight">Gemini</h5>
                                </div>
                            </MagneticElement>

                            {/* Docker */}
                            <MagneticElement
                                className="tech-switch p-4 sm:px-8 sm:py-5 flex items-center gap-3 md:gap-4 md:cursor-pointer group md:hover:bg-white/10"
                                as="div"
                                data-tech-name="Docker Container"
                            >
                                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center">
                                    <TechLogo alt="Docker" className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" src="https://www.vectorlogo.zone/logos/docker/docker-tile.svg" width={40} height={40} />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-base sm:text-lg text-text-primary font-display tracking-tight">Docker</h5>
                                </div>
                            </MagneticElement>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
