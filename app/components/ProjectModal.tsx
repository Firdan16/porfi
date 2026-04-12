"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import AppIcon from "./AppIcon";

interface Project {
    title: string;
    description: string;
    category: string;
    version: string;
    images: string[];
    features: { icon: string; text: string; description?: string }[];
    color: string;
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    isClosing: boolean;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, isClosing, onClose }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);

    const handleClose = () => {
        if (isClosing) return;

        onClose();
    };

    useLayoutEffect(() => {
        if (project) {
            setActiveIdx(0);
        }
    }, [project]);

    useEffect(() => {
        if (isOpen && !isClosing) {
            // Kill any existing animations first
            gsap.killTweensOf([overlayRef.current, modalRef.current]);
            
            // Ensure initial state is set
            gsap.set(overlayRef.current, { autoAlpha: 0 });
            gsap.set(modalRef.current, { scale: 0.9, y: 20, autoAlpha: 0 });
            
            window.isModalOpen = true;
            window.lenis?.stop();
            document.body.style.overflow = "hidden";
            
            gsap.to(overlayRef.current, {
                autoAlpha: 1,
                duration: 0.4,
                ease: "power2.out"
            });
            gsap.to(modalRef.current, {
                scale: 1,
                y: 0,
                autoAlpha: 1,
                duration: 0.6,
                ease: "expo.out"
            });
            window.dispatchEvent(new Event('modalToggle'));
        }
        return () => {
            if (window.isModalOpen) {
                document.body.style.overflow = "";
            }
        };
    }, [isOpen, isClosing]);

    useEffect(() => {
        if (!isClosing || !project) return;

        gsap.killTweensOf([overlayRef.current, modalRef.current]);

        gsap.to(modalRef.current, {
            scale: 0.95,
            y: 10,
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                window.isModalOpen = false;
                document.body.style.overflow = "";
                window.dispatchEvent(new Event('modalToggle'));
                window.lenis?.start();
            },
        });

        gsap.to(overlayRef.current, {
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.inOut",
        });
    }, [isClosing, project]);

    if (!project) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 backdrop-blur-md bg-black/60"
            onClick={(e) => e.target === overlayRef.current && handleClose()}
            style={{ opacity: 0 }}
        >
            <div
                ref={modalRef}
                className="relative w-full max-w-7xl h-[98vh] md:h-auto md:max-h-[85vh] bg-white rounded-t-[2.5rem] md:rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-y-auto lg:overflow-hidden flex flex-col mt-auto md:mt-0 custom-scrollbar"
                style={{ opacity: 0 }}
            >
                {/* Pull Indicator for Mobile */}
                <div className="md:hidden w-12 h-1.5 bg-black/10 rounded-full mx-auto mt-4 mb-2 absolute top-0 left-1/2 -translate-x-1/2 z-[60]"></div>

                {/* Floating Close Button */}
                <button
                    onClick={handleClose}
                    className="fixed md:absolute top-4 right-4 md:top-8 md:right-8 z-[60] group h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/90 md:bg-white/20 backdrop-blur-xl border border-black/5 md:border-white/40 flex items-center justify-center transition-all hover:scale-110 shadow-xl active:scale-95 text-text-primary"
                >
                    <AppIcon name="close" className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:rotate-90" />
                </button>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-visible lg:overflow-hidden">
                    {/* Left Section: Info */}
                    <div className="lg:col-span-12 xl:col-span-5 px-6 md:px-14 pt-12 md:pt-16 pb-12 md:pb-16 space-y-6 md:space-y-10 lg:overflow-y-auto custom-scrollbar bg-white relative z-20 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary font-mono text-[9px] md:text-xs font-black uppercase tracking-widest w-fit">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                            </span>
                            {project.category}
                        </div>
                        
                        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-text-primary tracking-tighter leading-[0.85] raised-text -mt-2">
                            {project.title}
                        </h2>

                        <p className="text-sm md:text-lg lg:text-xl text-text-secondary/80 leading-relaxed font-serif italic max-w-2xl border-l-0 md:border-l-[3px] border-primary px-4 md:pl-6 opacity-90">
                            &ldquo;{project.description}&rdquo;
                        </p>

                        <div className="w-full pt-8 grid grid-cols-2 gap-y-8 gap-x-8 border-t border-black/5">
                            {project.features.map((feature, idx) => (
                                <div key={idx} className="flex flex-col items-center md:items-start gap-4 group">
                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-[#F8FAFC] shadow-skeuo-btn flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                                        <AppIcon name={feature.icon} className="h-5 w-5 md:h-6 md:w-6" />
                                    </div>
                                    <div className="flex flex-col items-center md:items-start space-y-1 w-full px-1">
                                        <h4 className="font-bold text-xs md:text-base tracking-tight text-text-primary leading-tight text-center md:text-left balance-text">
                                            {feature.text}
                                        </h4>
                                        <p className="hidden md:block text-[11px] md:text-xs text-text-secondary opacity-60 leading-relaxed max-w-[200px]">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Section: Imagery */}
                    <div 
                        className="lg:col-span-12 xl:col-span-7 relative flex items-center justify-center min-h-[450px] md:min-h-[600px] xl:min-h-0 overflow-hidden"
                        style={{ backgroundColor: project.color }}
                    >
                        {/* DEEP 3D RECESSED EFFECT (DEKOK) */}
                        <div className="absolute inset-0 flex items-center justify-center p-6 lg:p-10 xl:p-14">
                            <div className="w-full h-full rounded-[4rem] relative overflow-hidden shadow-[inset_0_30px_100px_rgba(0,0,0,0.4),_inset_0_-15px_40px_rgba(255,255,255,0.05)] border-t border-white/5 border-l border-white/5">
                                {/* Concave Gradient Shading */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white/5 opacity-50"></div>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.3)_0%,transparent_70%)] opacity-80"></div>
                                
                                {/* Micro-detail: Inner Rim Highlight */}
                                <div className="absolute inset-[2px] rounded-[3.9rem] border-b border-white/10 opacity-30 pointer-events-none"></div>
                                
                                <div className="absolute inset-0 laser-grid opacity-5 mix-blend-overlay"></div>
                            </div>
                        </div>

                        <div 
                            className="relative z-10 w-full h-full flex items-center justify-center p-8 lg:p-12 xl:p-24 overflow-hidden cursor-pointer"
                            onClick={() => setActiveIdx((prev) => (prev < project.images.length - 1 ? prev + 1 : 0))}
                        >
                            {project.images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                                        activeIdx === idx 
                                        ? 'opacity-100 scale-100 translate-x-0' 
                                        : idx < activeIdx ? 'opacity-0 scale-90 -translate-x-full' : 'opacity-0 scale-90 translate-x-full'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`${project.title} slide ${idx + 1}`}
                                        className="max-w-[75%] max-h-[75%] xl:max-w-[70%] xl:max-h-[70%] object-contain filter drop-shadow-[0_50px_120px_rgba(0,0,0,0.7)] pointer-events-none transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            ))}

                            {/* Minimalist SINGLE Navigation Button */}
                            <div className="absolute bottom-10 right-10 z-30 pointer-events-none">
                                <div className="h-14 w-14 lg:h-16 lg:w-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-center text-white/50 transition-all active:scale-95 group/btn">
                                    <AppIcon name="arrow_forward_ios" className="h-6 w-6 lg:h-7 lg:w-7" />
                                </div>
                            </div>

                            {/* Image Counter (Pill Style) */}
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-30 px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/5 shadow-lg">
                                {project.images.map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`h-1.5 rounded-full bg-white transition-all duration-500 ${activeIdx === i ? 'w-8 opacity-100' : 'w-2 opacity-10'}`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0,0,0,0.1);
                    border-radius: 10px;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default ProjectModal;
