"use client";
import React from "react";
import MagneticElement from "./MagneticElement";

export default function Header() {
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id.replace("#", ""));
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            // Update URL hash without jumping
            window.history.pushState(null, "", id);
        }
    };

    return (
        <header
            className="fixed top-0 z-40 w-full flex items-center justify-between glass-nav px-6 py-4 md:px-10 transition-all duration-300"
            id="main-header"
        >
            <div className="flex items-center gap-4 text-text-primary z-10">
                <MagneticElement
                    className="tactile-btn flex h-12 w-12 items-center justify-center rounded-full text-primary relative z-10 group shrink-0"
                    as="div"
                >
                    <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform duration-300">
                        architecture
                    </span>
                </MagneticElement>
                <h2 className="text-text-primary text-xl font-bold leading-tight tracking-tight raised-text">
                    The Architect
                </h2>
            </div>
            <div className="hidden md:flex flex-1 justify-end gap-8 items-center z-10">
                <nav className="flex items-center gap-2 ml-4 p-1 rounded-full bg-[#E9ECEF] shadow-inner border border-white/50">
                    <a
                        className="px-5 py-2 rounded-full text-text-secondary text-sm font-bold hover:text-primary transition-all duration-200 hover:bg-white hover:shadow-sm"
                        href="#work"
                        onClick={(e) => handleSmoothScroll(e, "#work")}
                    >
                        Work
                    </a>
                    <a
                        className="px-5 py-2 rounded-full text-text-secondary text-sm font-bold hover:text-primary transition-all duration-200 hover:bg-white hover:shadow-sm"
                        href="#stack"
                        onClick={(e) => handleSmoothScroll(e, "#stack")}
                    >
                        Stack
                    </a>
                    <a
                        className="px-5 py-2 rounded-full text-text-secondary text-sm font-bold hover:text-primary transition-all duration-200 hover:bg-white hover:shadow-sm"
                        href="#contact"
                        onClick={(e) => handleSmoothScroll(e, "#contact")}
                    >
                        Contact
                    </a>
                </nav>
                <MagneticElement
                    className="tactile-btn-primary rounded-full h-11 px-6 flex items-center justify-center text-sm font-bold tracking-wide shrink-0"
                    as="button"
                >
                    <span className="relative z-10 drop-shadow-md">TERMINAL ACCESS</span>
                </MagneticElement>
            </div>
            <div className="md:hidden z-10">
                <MagneticElement
                    className="tactile-btn rounded-full h-12 w-12 flex items-center justify-center text-text-primary"
                    as="button"
                >
                    <span className="material-symbols-outlined">menu</span>
                </MagneticElement>
            </div>
        </header>
    );
}
