"use client";
import React, { useEffect, useRef } from "react";
import MagneticElement from "./MagneticElement";
import { gsap } from "gsap";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const heroContainer = containerRef.current;
        if (!heroContainer) return;

        const heroInnerLayer = heroContainer.querySelector(".hero-frame-inner");
        const heroImg = heroContainer.querySelector("img");

        const handleMouseMove = (e: MouseEvent) => {
            const rect = heroContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            if (heroInnerLayer) {
                gsap.to(heroInnerLayer, {
                    rotationY: x * 5,
                    rotationX: -y * 5,
                    duration: 0.5,
                    ease: "power1.out",
                });
            }

            if (heroImg) {
                gsap.to(heroImg, {
                    scale: 1.05,
                    x: x * 10,
                    y: y * 10,
                    duration: 0.5,
                    ease: "power1.out",
                });
            }
        };

        const handleMouseLeave = () => {
            const targets = [];
            if (heroInnerLayer) targets.push(heroInnerLayer);
            if (heroImg) targets.push(heroImg);

            if (targets.length > 0) {
                gsap.to(targets, {
                    rotationY: 0,
                    rotationX: 0,
                    scale: 1,
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)",
                });
            }
        };

        heroContainer.addEventListener("mousemove", handleMouseMove as EventListener);
        heroContainer.addEventListener("mouseleave", handleMouseLeave);

        // Entrance animation
        const ctx = gsap.context(() => {
            gsap.from(".hero-frame", {
                x: -50,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out"
            });

            gsap.from(".hero-text-animate", {
                y: 30,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.3
            });

            gsap.from(".hero-line-animate", {
                width: 0,
                duration: 1,
                ease: "power2.inOut",
                delay: 0.8
            });
        }, heroContainer);

        return () => {
            heroContainer.removeEventListener("mousemove", handleMouseMove as EventListener);
            heroContainer.removeEventListener("mouseleave", handleMouseLeave);
            ctx.revert();
        };
    }, []);

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center px-4 py-10 md:px-20 lg:px-40">
            <div className="layout-content-container flex flex-col max-w-[1300px] w-full mx-auto gap-16 lg:flex-row items-center">
                <div
                    ref={containerRef}
                    className="relative w-full max-w-[420px] lg:w-1/3 aspect-[3/4] group transition-all duration-500 hero-frame"
                    id="hero-portrait-container"
                >
                    <div className="hero-frame-inner h-full w-full relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/60 via-transparent to-transparent z-10"></div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            alt="Portrait of a male developer looking forward with confidence"
                            className="h-full w-full object-cover filter grayscale contrast-125 brightness-110"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEVFoiHHAEFcKnziA3OwniLf9hdsyYseQO1sjy0uzc-AaKccSHIMQpqmAzKgxKbxRLclNnr7_Ox2ZusiutOAG_pQDIhIPdcvgwnhbut46Xh1dJjt_pTI3a-vKbnqCL0bIuvslUEqdyv6c0xHD6LTpYoxdvtkAL_yctq_aHcUxilwL0KjyW54lF3R2Ld5K5O8dd3BeYPTq0nFQU2izMntlFSGvR3ObW9_oBbh4j3b3rr0lMqtX25VM6hbbxUSptifr3tlqR7mTXmuA"
                        />
                        <div className="absolute bottom-8 left-8 z-20 flex flex-col">
                            <div className="flex items-center gap-3 mb-2 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 w-fit">
                                <span className="h-2 w-2 rounded-full bg-[#3388FF] shadow-[0_0_10px_#3388FF] animate-pulse mx-1"></span>
                                <span className="text-[10px] font-mono text-white uppercase tracking-widest font-bold pr-2">
                                    System Online
                                </span>
                            </div>
                            <p className="text-white font-mono font-bold text-xs opacity-60 tracking-[0.3em] uppercase">
                                ARCH_ID // 001
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 w-1/3 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-tr-[2.5rem] pointer-events-none z-30 opacity-50"></div>
                </div>
                <div className="flex flex-col gap-10 lg:w-2/3 lg:pl-10 relative z-10">
                    <div className="flex flex-col gap-4">
                        <h1 className="hero-text-animate text-text-primary text-6xl md:text-7xl lg:text-9xl font-black leading-[0.8] tracking-tighter raised-text">
                            Firdan Umar
                        </h1>
                        <div className="hero-text-animate flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mt-4">
                            <span className="text-primary font-serif italic font-light text-3xl md:text-5xl tracking-tight drop-shadow-sm">
                                Flutter Developer
                            </span>
                            <div className="flex gap-4 p-2 bg-white/40 backdrop-blur-md rounded-full border border-white/40 shadow-skeuo-inset w-fit">
                                <MagneticElement
                                    className="h-10 w-10 flex items-center justify-center rounded-full text-text-secondary hover:text-primary transition-all hover:bg-white hover:shadow-skeuo-btn"
                                    as="a"
                                    // @ts-ignore
                                    href="mailto:firdan@example.com"
                                    title="Gmail"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-10 7L2 7" /><rect width="20" height="14" x="2" y="5" rx="2" /></svg>
                                </MagneticElement>
                                <MagneticElement
                                    className="h-10 w-10 flex items-center justify-center rounded-full text-text-secondary hover:text-primary transition-all hover:bg-white hover:shadow-skeuo-btn"
                                    as="a"
                                    // @ts-ignore
                                    href="https://github.com/firdanumar"
                                    target="_blank"
                                    title="GitHub"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                </MagneticElement>
                                <MagneticElement
                                    className="h-10 w-10 flex items-center justify-center rounded-full text-text-secondary hover:text-primary transition-all hover:bg-white hover:shadow-skeuo-btn"
                                    as="a"
                                    // @ts-ignore
                                    href="https://linkedin.com/in/firdanumar"
                                    target="_blank"
                                    title="LinkedIn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </MagneticElement>
                            </div>
                        </div>
                    </div>

                    <h2 className="hero-text-animate text-text-secondary text-xl md:text-2xl font-medium leading-relaxed max-w-xl font-serif engraved-text">
                        Creative Technologist constructing high-performance digital artifacts with precision and structural intent.
                    </h2>

                    <div className="hero-text-animate flex flex-wrap gap-6 mt-4">
                        <MagneticElement
                            className="tactile-btn rounded-full h-16 px-10 text-text-primary text-lg font-bold flex items-center justify-center gap-3 group"
                            as="button"
                        >
                            <span>Explore Systems</span>
                            <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </MagneticElement>
                        <MagneticElement
                            className="tactile-btn rounded-full h-16 px-10 text-text-secondary text-lg font-semibold bg-transparent"
                            as="button"
                        >
                            Core Logs
                        </MagneticElement>
                    </div>
                </div>
            </div>
        </section>
    );
}
