"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import AppIcon from "./AppIcon";

const ProjectModal = dynamic(() => import("./ProjectModal"));

interface Project {
    id: number;
    title: string;
    description: string;
    category: string;
    version: string;
    mainImage: string;
    images: string[];
    features: { icon: string; text: string; description?: string }[];
    tech: string[];
    layout: "normal" | "reverse";
    color: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
}

const PROJECTS_DATA: Project[] = [
    {
        id: 1,
        title: "Suluk",
        description: "A comprehensive Islamic lifestyle and social platform. Integrates prayer times, Qibla direction, and social features with a robust Supabase backend for real-time synchronization.",
        category: "Mobile App",
        version: "STABLE",
        mainImage: "/assets/suluk/Suluk-main-1.png",
        images: [
            "/assets/suluk/Suluk-main-1.png",
            "/assets/suluk/Suluk-main-2.png",
            "/assets/suluk/Suluk-main-3.png",
            "/assets/suluk/Suluk-main-4.png",
            "/assets/suluk/Suluk-main-5.png"
        ],
        features: [
            { icon: "explore", text: "Qibla Compass Engine", description: "High-precision directional logic using mobile sensors." },
            { icon: "sync", text: "Real-time Sync", description: "Instant data sync across devices with low latency." },
            { icon: "schedule", text: "Prayer Time Algorithm", description: "Accurate calculation based on geolocation coordinates." },
            { icon: "groups", text: "Social Community", description: "Connect with others through shared religious goals." }
        ],
        tech: ["Flutter", "Bloc", "Google Maps API"],
        layout: "normal",
        color: "#0f172a",
        playStoreUrl: "https://play.google.com/store/apps/details?id=id.bapli.idrisiyyah&hl=id",
    },
    {
        id: 2,
        title: "Photo AI",
        description: "AI-powered image generation and editing suite. Leverages Google Gemini via Firebase Cloud Functions to transform text prompts and existing photos into high-quality AI art.",
        category: "Mobile App",
        version: "RELEASED",
        mainImage: "/assets/photo-ai/Photo-ai-main-1.png",
        images: [
            "/assets/photo-ai/Photo-ai-main-1.png",
            "/assets/photo-ai/Photo-ai-main-2.png",
            "/assets/photo-ai/Photo-ai-main-3.png",
            "/assets/photo-ai/Photo-ai-main-4.png",
            "/assets/photo-ai/Photo-ai-main-5.png"
        ],
        features: [
            { icon: "auto_fix_high", text: "Gemini Vision Integration", description: "Advanced prompt engineering for AI image analysis." },
            { icon: "cloud_done", text: "Serverless Architecture", description: "Scalable backend logic using Firebase Cloud Functions." },
            { icon: "brush", text: "AI Style Transfer", description: "Apply artistic styles to any photograph instantly." },
            { icon: "security", text: "Secure Auth Layer", description: "Robust user authentication with Firebase Auth." }
        ],
        tech: ["Flutter", "Firebase", "Vertex AI", "Node.js"],
        layout: "reverse",
        color: "#1e1b4b",
    },
    {
        id: 3,
        title: "Text RPG",
        description: "An interactive story engine where players shape their own adventure. Features AI-generated branching narratives, genre-specific visual styles, and hidden 'glimpses' to unlock.",
        category: "Mobile App",
        version: "ACTIVE",
        mainImage: "/assets/text-rpg/textrpg-main-1.png",
        images: [
            "/assets/text-rpg/textrpg-main-1.png",
            "/assets/text-rpg/textrpg-main-2.png",
            "/assets/text-rpg/textrpg-main-3.png",
            "/assets/text-rpg/textrpg-main-4.png",
            "/assets/text-rpg/textrpg-main-5.png"
        ],
        features: [
            { icon: "menu_book", text: "Branching Narratives", description: "Dynamic story paths generated based on player decisions." },
            { icon: "visibility", text: "Hidden Glimpse System", description: "Special unlockable events hidden throughout the gameplay." },
            { icon: "psychology", text: "AI Narrator Logic", description: "LLM-powered storytelling with consistent world-building." },
            { icon: "palette", text: "Thematic UI Skins", description: "Visual styles that adapt to the current story genre." }
        ],
        tech: ["Flutter", "Vertex AI", "OpenAI", "Python", "Firebase"],
        layout: "normal",
        color: "#27272a"
    }
];

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalClosing, setIsModalClosing] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            if (containerRef.current) {
                const projectSlabs = containerRef.current.querySelectorAll(".project-slab");
                projectSlabs.forEach((slab, index) => {
                    // Entrance anim only
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
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            className="px-4 md:px-10 lg:px-40 py-24 sm:py-32 overflow-visible relative bg-[#F0F2F5]"
            id="work"
        >
            <div className="max-w-[1200px] mx-auto mb-10 lg:mb-16 relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                <h2 className="text-text-primary text-2xl sm:text-3xl font-extrabold leading-tight px-0 lg:px-6 pb-4 border-b-4 lg:border-b-0 border-l-0 lg:border-l-8 border-primary flex flex-col lg:block items-center">
                    Project Stack
                </h2>
            </div>
            <div
                ref={containerRef}
                className="max-w-[1000px] mx-auto flex flex-col gap-16 sm:gap-20 pb-20 relative z-10"
            >
                {PROJECTS_DATA.map((project) => (
                    <article
                        key={project.id}
                        className="project-slab sticky-card overflow-hidden group/card cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsModalClosing(false);
                            setSelectedProject(project);
                        }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 h-full relative z-20">
                            {/* Image Section */}
                            <div
                                className={`relative h-64 sm:h-[400px] lg:h-auto p-4 sm:p-10 md:p-14 flex items-center justify-center overflow-hidden shadow-[inset_-10px_0_20px_rgba(0,0,0,0.1)] lg:shadow-[inset_-10px_0_20px_rgba(0,0,0,0.1)] ${project.layout === 'reverse' ? 'order-1 lg:order-2 shadow-[inset_10px_0_20px_rgba(0,0,0,0.1)]' : ''}`}
                                style={{ backgroundColor: project.color }}
                            >
                                <div className="absolute inset-0 laser-grid opacity-10"></div>
                                <div className="w-full h-full flex items-center justify-center relative">
                                    <Image
                                        alt={`${project.title} interface`}
                                        className="relative z-10 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover/card:scale-[1.02]"
                                        src={project.mainImage}
                                        fill
                                        sizes="(min-width: 1024px) 35vw, (min-width: 640px) 60vw, 90vw"
                                    />
                                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20"></div>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className={`p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#FDFBF7] relative overflow-hidden ${project.layout === 'reverse' ? 'order-2 lg:order-1' : ''}`}>
                                {/* Background Detail */}
                                <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-primary/2 rounded-bl-full pointer-events-none"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-4 sm:mb-6">
                                        <div className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                                            {project.category}
                                        </div>
                                        <div className="h-[1px] flex-grow bg-border-subtle/20"></div>
                                        <span className="text-text-secondary font-mono text-[9px] sm:text-[10px] font-bold tracking-tighter opacity-50">
                                            {project.version}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-text-primary mb-3 sm:mb-4 tracking-tight leading-none raised-text">
                                        {project.title}
                                    </h3>

                                    {/* Tech Stack Chips */}
                                    <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="text-[9px] sm:text-[10px] font-mono font-bold px-2 py-1 rounded bg-[#E2E8F0] text-text-secondary opacity-70">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-sm sm:text-base md:text-lg text-text-secondary mb-8 sm:mb-10 leading-relaxed font-serif italic max-w-xl opacity-80">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-col gap-8 sm:gap-10 mt-Auto sm:mt-12 pb-2 sm:pb-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-8 sm:gap-y-12">
                                            {project.features.slice(0, 2).map((feature, idx) => (
                                                <div key={idx} className="flex gap-4 sm:gap-5 group/feat">
                                                    <div className="flex flex-col items-center">
                                                        <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-xl bg-white shadow-skeuo-btn flex items-center justify-center text-primary group-hover/feat:bg-primary group-hover/feat:text-white transition-all duration-300">
                                                            <AppIcon name={feature.icon} className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                                                        </div>
                                                        <div className="w-[1px] sm:w-[2px] grow bg-primary/5 mt-2 rounded-full"></div>
                                                    </div>
                                                    <div className="flex flex-col pt-0.5 sm:pt-1">
                                                        <h4 className="text-base sm:text-lg text-text-primary font-bold tracking-tight opacity-90 group-hover/feat:text-primary transition-colors mb-1.5 sm:mb-2">
                                                            {feature.text}
                                                        </h4>
                                                        {feature.description && (
                                                            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed opacity-60">
                                                                {feature.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {(project.playStoreUrl || project.appStoreUrl) && (
                                            <div className="mt-4 pt-6 border-t border-black/5 flex flex-col items-start gap-4">
                                                <span className="text-[10px] font-black text-text-secondary opacity-30 uppercase tracking-[0.2em] leading-none">Marketplace</span>
                                                <div className="flex flex-wrap gap-3">
                                                    {project.playStoreUrl && (
                                                        <a
                                                            href={project.playStoreUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white shadow-skeuo-btn border border-black/5 text-text-primary transition-all duration-500 hover:scale-[1.05] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-primary/30 active:scale-[0.95] group/play"
                                                        >
                                                            <div className="h-8 w-8 rounded-lg bg-[#FAFBFD] flex items-center justify-center shadow-inner group-hover/play:bg-primary/5 transition-all duration-500 group-hover/play:scale-110">
                                                                <svg className="w-4 h-4 text-primary transition-transform duration-500 group-hover/play:rotate-[10deg]" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M3.609 1.814L13.792 12 3.609 22.186c-.145.145-.33.226-.525.226-.411 0-.745-.334-.745-.745V2.559c0-.411.334-.745.745-.745.195 0 .38.081.525.226zM14.5 12.707l2.833 2.833L4.475 22.404C10.518 18.916 14.5 12.707 14.5 12.707zM17.333 8.46l-2.833 2.833C14.5 11.293 10.518 5.084 4.475 1.596L17.333 8.46zM18.041 8.837l4.145 2.232c.504.271.504.757 0 1.028l-4.145 2.232L15.207 12l2.834-3.163z" />
                                                                </svg>
                                                            </div>
                                                            <div className="flex flex-col leading-tight">
                                                                <span className="text-[8px] opacity-50 font-bold uppercase tracking-widest group-hover/play:text-primary transition-colors">Available on</span>
                                                                <span className="text-xs sm:text-sm font-black tracking-tight group-hover/play:text-primary transition-colors">Google Play</span>
                                                            </div>
                                                        </a>
                                                    )}
                                                    {project.appStoreUrl && (
                                                        <a
                                                            href={project.appStoreUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white shadow-skeuo-btn border border-black/5 text-text-primary transition-all duration-500 hover:scale-[1.05] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,122,255,0.08)] hover:border-[#007AFF]/30 active:scale-[0.95] group/apple"
                                                        >
                                                            <div className="h-8 w-8 rounded-lg bg-[#FAFBFD] flex items-center justify-center shadow-inner group-hover/apple:bg-[#007AFF]/5 transition-all duration-500 group-hover/apple:scale-110">
                                                                <svg className="w-4 h-4 text-[#007AFF] transition-transform duration-500 group-hover/apple:-rotate-[10deg]" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,21.97C7.81,22 6.85,20.65 6,19.45C4.27,16.92 3,12.31 4.72,9.29C5.58,7.77 7.15,6.81 8.85,6.79C10.13,6.76 11.35,7.65 12.13,7.65C12.91,7.65 14.39,6.57 15.92,6.72C16.57,6.75 18.37,6.98 19.5,8.63C19.42,8.68 17.27,9.93 17.29,12.43C17.3,15.41 19.86,16.39 19.89,16.41C19.87,16.48 19.47,17.81 18.71,19.5M15.1,3C15.5,3 16.4,3.47 16.89,4.14C17.38,4.81 17.2,6.17 16.8,6.83C16.4,7.5 15.5,7.97 15.01,7.3C14.52,6.63 14.7,5.27 15.1,4.61C15.1,4.61 14.8,3.2 15.1,3" />
                                                                </svg>
                                                            </div>
                                                            <div className="flex flex-col leading-tight">
                                                                <span className="text-[8px] opacity-50 font-bold uppercase tracking-widest group-hover/apple:text-[#007AFF] transition-colors">Available on</span>
                                                                <span className="text-xs sm:text-sm font-black tracking-tight group-hover/apple:text-[#007AFF] transition-colors">App Store</span>
                                                            </div>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                isClosing={isModalClosing}
                onClose={() => {
                    setIsModalClosing(true);
                    window.setTimeout(() => {
                        setSelectedProject(null);
                        setIsModalClosing(false);
                    }, 400);
                }}
            />
        </section>
    );
}
