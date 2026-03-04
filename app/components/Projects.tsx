"use client";
import React, { useEffect, useRef } from "react";
import MagneticElement from "./MagneticElement";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (containerRef.current) {
            const projectSlabs = containerRef.current.querySelectorAll(".project-slab");
            projectSlabs.forEach((slab, index) => {
                // Entrance anim
                gsap.fromTo(
                    slab,
                    { y: 100, opacity: 0, scale: 0.95 },
                    {
                        scrollTrigger: {
                            trigger: slab,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        delay: index * 0.1,
                        ease: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }
                );

                // Tilt effect
                const handleSlabMouseMove = (e: MouseEvent) => {
                    const rect = slab.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;

                    gsap.to(slab, {
                        rotationY: x * 2,
                        rotationX: -y * 2,
                        transformPerspective: 1000,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                };

                const handleSlabMouseLeave = () => {
                    gsap.to(slab, {
                        rotationY: 0,
                        rotationX: 0,
                        duration: 0.8,
                        ease: "elastic.out(1, 0.3)"
                    });
                };

                slab.addEventListener("mousemove", handleSlabMouseMove as EventListener);
                slab.addEventListener("mouseleave", handleSlabMouseLeave);
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section
            className="px-4 md:px-10 lg:px-40 py-32 overflow-visible relative bg-[#F0F2F5]"
            id="work"
        >
            <div className="max-w-[1200px] mx-auto mb-24 relative z-10">
                <h2 className="text-text-primary text-4xl font-extrabold leading-tight px-6 pb-6 border-l-8 border-primary shadow-[-4px_0_0_rgba(255,255,255,0.8)]">
                    Project Stack{" "}
                    <span className="text-text-secondary font-normal ml-3 text-2xl font-serif italic engraved-text">
            // Functional Artifacts
                    </span>
                </h2>
            </div>
            <div
                ref={containerRef}
                className="max-w-[1000px] mx-auto flex flex-col gap-24 pb-20 relative z-10"
            >
                <article className="project-slab sticky-card overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[550px] relative z-20">
                        <div className="relative p-8 flex items-center justify-center overflow-hidden bg-[#eef1f5] shadow-[inset_-10px_0_20px_rgba(0,0,0,0.03)] lg:shadow-[inset_-10px_0_20px_rgba(0,0,0,0.03)]">
                            <div className="absolute inset-0 laser-grid opacity-20"></div>
                            <div className="screen-inset p-4 w-full h-full flex items-center justify-center bg-[#F8FAFC]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="FinTech Dashboard interface showing graphs and data"
                                    className="relative z-10 w-full rounded-lg shadow-lg transform rotate-1 transition-all duration-500 hover:rotate-0 hover:scale-[1.02]"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5OLGUAMo7Bzk-suTSncK1EfA59BLrmCwiUcnHpzg6O5oyVkkawwIHQdG366gJweOksk1s0D1sdUW3dhGEOCeO1pAuufM7J3B3lrZmdSWIBIasvA05Gd-Uf8bflyyUSzSpKvRGyjdgECRAJgVsOebANI7FZijr6p3V8xmnVwI3D9gNKa71qAVJpij9UPepxai4JLf2PopBZiCdKvF8soyApv0cKZwrdAqvJHeXRqylodeoP750ap_hl0nO1NMVPS2sWYvMjZ-UUSo"
                                />
                                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20"></div>
                            </div>
                        </div>
                        <div className="p-10 lg:p-14 flex flex-col justify-between bg-gradient-to-br from-[#F0F2F5] to-[#E9ECEF]">
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="px-4 py-1.5 rounded-full bg-[#E2E8F0] shadow-inner border border-white text-primary text-xs font-mono font-bold uppercase tracking-wider">
                                        FinTech
                                    </div>
                                    <span className="text-text-secondary font-mono text-xs font-bold engraved-text">
                                        BUILD v1.0.4
                                    </span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight raised-text">
                                    TradeFlow Pro
                                </h3>
                                <p className="text-text-secondary text-xl mb-10 leading-relaxed font-serif engraved-text">
                                    A high-frequency trading dashboard with real-time sockets. Optimized for 60 FPS
                                    performance on mobile devices using Flutter&apos;s Impeller engine.
                                </p>
                                <div className="flex flex-col gap-4 mb-10">
                                    <div className="flex items-center gap-4 text-sm text-text-primary font-mono font-bold">
                                        <div className="h-8 w-8 rounded-full bg-[#E2E8F0] shadow-skeuo-btn flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-sm">bolt</span>
                                        </div>
                                        <span className="opacity-70">WebSockets Integration</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-text-primary font-mono font-bold">
                                        <div className="h-8 w-8 rounded-full bg-[#E2E8F0] shadow-skeuo-btn flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-sm">speed</span>
                                        </div>
                                        <span className="opacity-70">&lt; 16ms Frame Time</span>
                                    </div>
                                </div>
                            </div>
                            <MagneticElement
                                className="tactile-btn rounded-xl px-8 py-4 w-fit flex items-center gap-3 text-primary font-extrabold group text-lg tracking-wide shrink-0"
                                as="button"
                            >
                                <span>Initialize Case Study</span>
                                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 font-bold">
                                    arrow_forward
                                </span>
                            </MagneticElement>
                        </div>
                    </div>
                </article>

                <article className="project-slab sticky-card overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[550px] relative z-20">
                        <div className="p-10 lg:p-14 flex flex-col justify-between order-2 lg:order-1 bg-gradient-to-bl from-[#F0F2F5] to-[#E9ECEF]">
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="px-4 py-1.5 rounded-full bg-[#E2E8F0] shadow-inner border border-white text-primary text-xs font-mono font-bold uppercase tracking-wider">
                                        MedTech
                                    </div>
                                    <span className="text-text-secondary font-mono text-xs font-bold engraved-text">
                                        BLE CONNECTED
                                    </span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight raised-text">
                                    Vitals Monitor
                                </h3>
                                <p className="text-text-secondary text-xl mb-10 leading-relaxed font-serif engraved-text">
                                    Bluetooth Low Energy (BLE) integration for real-time heart rate and oxygen
                                    monitoring. Custom chart rendering engine for precise medical data visualization.
                                </p>
                                <div className="flex flex-col gap-4 mb-10">
                                    <div className="flex items-center gap-4 text-sm text-text-primary font-mono font-bold">
                                        <div className="h-8 w-8 rounded-full bg-[#E2E8F0] shadow-skeuo-btn flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-sm">bluetooth</span>
                                        </div>
                                        <span className="opacity-70">Native FFI Bridge</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-text-primary font-mono font-bold">
                                        <div className="h-8 w-8 rounded-full bg-[#E2E8F0] shadow-skeuo-btn flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-sm">monitor_heart</span>
                                        </div>
                                        <span className="opacity-70">Live Telemetry Feed</span>
                                    </div>
                                </div>
                            </div>
                            <MagneticElement
                                className="tactile-btn rounded-xl px-8 py-4 w-fit flex items-center gap-3 text-primary font-extrabold group text-lg tracking-wide shrink-0"
                                as="button"
                            >
                                <span>Initialize Case Study</span>
                                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 font-bold">
                                    arrow_forward
                                </span>
                            </MagneticElement>
                        </div>
                        <div className="relative p-8 flex items-center justify-center overflow-hidden bg-[#eef1f5] shadow-[inset_10px_0_20px_rgba(0,0,0,0.03)] lg:shadow-[inset_10px_0_20px_rgba(0,0,0,0.03)] order-1 lg:order-2">
                            <div className="absolute inset-0 laser-grid opacity-20"></div>
                            <div className="screen-inset p-4 w-full h-full flex items-center justify-center bg-[#F8FAFC]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="Medical health monitoring app interface on a light background"
                                    className="relative z-10 w-full rounded-lg shadow-lg transform -rotate-1 transition-all duration-500 hover:rotate-0 hover:scale-[1.02]"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD-6kFQR0MRmYl8O75Yef8XF3d1AOn9bQVM-5f_4OWfs-18xWt26vb5RrI1iSrplzCRHYFbK1oFHr8fOhn_Jd0jmmgiT_aqZuUD7MZ3IipTtsJjvUPkFce_jHsOLgKYI_-zGq-um2SL_4hxNBfy1-AMBcxRcSjvuykke0WyLFCodxGtse95yYktgJUhxMgagSlTrD3Rf96FZe90J7E6ADYUoHSoUUudfgiDa9iZeh_2liG1QAAdBQ0ASze7BuK9E-91gFQO7PIVNw"
                                />
                                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20"></div>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="project-slab sticky-card overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[550px] relative z-20">
                        <div className="relative p-8 flex items-center justify-center overflow-hidden bg-[#eef1f5] shadow-[inset_-10px_0_20px_rgba(0,0,0,0.03)] lg:shadow-[inset_-10px_0_20px_rgba(0,0,0,0.03)]">
                            <div className="absolute inset-0 laser-grid opacity-20"></div>
                            <div className="screen-inset p-4 w-full h-full flex items-center justify-center bg-[#F8FAFC]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="Social network graph visualization interface"
                                    className="relative z-10 w-full rounded-lg shadow-lg transform rotate-1 transition-all duration-500 hover:rotate-0 hover:scale-[1.02]"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA4j6mrlCG2o6NeYcnNFKlBdW6UtMDVJd6BGceIdlFKLi1rXmvWlgl1zofumkdgM7_pMCFO6BY4MFVh0pRDxTxSQ763mtwvUcAQ6FFLlE_MyYlHU2MLbA_xYnr-RCRzdT-FC2kU2GkX8dSOYJ6yg6zphwCmZE0Xpm-2rGWDO9kQq7fAFZQ7Adno3WfSqVDfwrPoZj1G8n1SZDwdjaWFtxROfrUtRhFJhWhO7iQthTMiflptEO7M3OxOsck2qJD4nxt5Vakt0VIsaY"
                                />
                                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20"></div>
                            </div>
                        </div>
                        <div className="p-10 lg:p-14 flex flex-col justify-between bg-gradient-to-br from-[#F0F2F5] to-[#E9ECEF]">
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="px-4 py-1.5 rounded-full bg-[#E2E8F0] shadow-inner border border-white text-primary text-xs font-mono font-bold uppercase tracking-wider">
                                        Social
                                    </div>
                                    <span className="text-text-secondary font-mono text-xs font-bold engraved-text">
                                        NODES: 1M+
                                    </span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight raised-text">
                                    Nexus Graph
                                </h3>
                                <p className="text-text-secondary text-xl mb-10 leading-relaxed font-serif engraved-text">
                                    A visual social graph explorer capable of rendering 10,000+ interactive nodes on
                                    canvas. Utilizes custom RenderObjects for maximum efficiency.
                                </p>
                                <div className="flex flex-col gap-4 mb-10">
                                    <div className="flex items-center gap-4 text-sm text-text-primary font-mono font-bold">
                                        <div className="h-8 w-8 rounded-full bg-[#E2E8F0] shadow-skeuo-btn flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-sm">hub</span>
                                        </div>
                                        <span className="opacity-70">Custom RenderObjects</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-text-primary font-mono font-bold">
                                        <div className="h-8 w-8 rounded-full bg-[#E2E8F0] shadow-skeuo-btn flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-sm">polyline</span>
                                        </div>
                                        <span className="opacity-70">Graph Theory Algo</span>
                                    </div>
                                </div>
                            </div>
                            <MagneticElement
                                className="tactile-btn rounded-xl px-8 py-4 w-fit flex items-center gap-3 text-primary font-extrabold group text-lg tracking-wide shrink-0"
                                as="button"
                            >
                                <span>Initialize Case Study</span>
                                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 font-bold">
                                    arrow_forward
                                </span>
                            </MagneticElement>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
