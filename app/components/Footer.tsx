"use client";
import React from "react";
import MagneticElement from "./MagneticElement";

export default function Footer() {
    return (
        <footer
            className="bg-[#E2E8F0] py-24 px-4 md:px-20 lg:px-40 relative z-10 border-t border-white shadow-[inset_0_10px_30px_rgba(0,0,0,0.05)]"
            id="contact"
        >
            <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                    <div className="flex flex-col gap-8 max-w-2xl">
                        <div className="flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full bg-[#3388FF] shadow-led-glow animate-pulse"></span>
                            <span className="text-primary font-mono text-sm uppercase tracking-widest font-bold opacity-80">
                                System Operational
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-text-primary leading-tight tracking-tight raised-text">
                            Connect with the <br />{" "}
                            <span className="text-primary font-serif italic font-light drop-shadow-sm">
                                Firdan Umar.
                            </span>
                        </h2>
                        <p className="text-text-secondary text-xl max-w-lg font-serif engraved-text">
                            Currently available for select contract work and technical consultation. Let&apos;s
                            build something robust.
                        </p>
                    </div>
                    <div className="flex flex-col gap-5">
                        <MagneticElement
                            className="group tactile-btn flex items-center justify-between w-full md:w-[340px] rounded-full h-20 px-10"
                            as="a"
                            // @ts-ignore
                            href="mailto:firdan@example.com"
                        >
                            <span className="text-text-primary font-bold text-lg">firdan@example.com</span>
                            <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">
                                send
                            </span>
                        </MagneticElement>
                        <MagneticElement
                            className="tactile-btn-primary flex items-center justify-center w-full md:w-[340px] rounded-full h-20 px-10 font-bold text-lg shrink-0"
                            as="button"
                        >
                            Download Resume
                        </MagneticElement>
                    </div>
                </div>
                <div className="h-[2px] w-full bg-[#CBD5E1] shadow-[0_1px_0_rgba(255,255,255,0.8)] mt-8"></div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[#64748B] font-bold">
                    <p className="engraved-text">© 2024 Firdan Umar. All systems go.</p>
                    <div className="flex items-center gap-4">
                        <MagneticElement
                            className="tactile-btn h-10 w-10 flex items-center justify-center rounded-full hover:text-primary transition-colors"
                            as="a"
                            // @ts-ignore
                            href="#"
                        >
                            <span className="material-symbols-outlined text-sm">code</span>
                        </MagneticElement>
                        <MagneticElement
                            className="tactile-btn h-10 w-10 flex items-center justify-center rounded-full hover:text-primary transition-colors"
                            as="a"
                            // @ts-ignore
                            href="#"
                        >
                            <span className="material-symbols-outlined text-sm">work</span>
                        </MagneticElement>
                        <MagneticElement
                            className="tactile-btn h-10 w-10 flex items-center justify-center rounded-full hover:text-primary transition-colors"
                            as="a"
                            // @ts-ignore
                            href="#"
                        >
                            <span className="material-symbols-outlined text-sm">hub</span>
                        </MagneticElement>
                    </div>
                </div>
            </div>
        </footer>
    );
}
