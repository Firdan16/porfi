"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLocale, useTranslations } from "next-intl";
import MagneticElement from "./MagneticElement";
import AppIcon from "./AppIcon";
import { Link } from "@/i18n/navigation";
import LocaleToggle from "./LocaleToggle";

export default function Header() {
    const t = useTranslations("nav");
    const locale = useLocale();

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id.replace("#", ""));
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            window.history.pushState(null, "", `/${locale}${id}`);
        }
    };

    const navRef = useRef<HTMLDivElement>(null);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.isModalOpen) {
                if (navRef.current) {
                    gsap.to(navRef.current, { y: -100, opacity: 0, duration: 0.3 });
                }
                return;
            }

            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            if (navRef.current) {
                gsap.to(navRef.current, {
                    y: -100,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power3.out",
                });
            }

            scrollTimeout.current = setTimeout(() => {
                if (window.isModalOpen) return;

                if (navRef.current) {
                    gsap.to(navRef.current, {
                        y: 0,
                        opacity: 1,
                        duration: 0.4,
                        ease: "power3.out",
                    });
                }
            }, 300);
        };

        const handleModalToggle = () => {
            if (window.isModalOpen) {
                gsap.to(navRef.current, { y: -100, opacity: 0, duration: 0.5, ease: "expo.out" });
            } else {
                gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "expo.out" });
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("modalToggle", handleModalToggle);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("modalToggle", handleModalToggle);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, []);

    const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        window.history.pushState(null, "", `/${locale}`);
    };

    return (
        <header
            className="fixed top-6 left-0 z-50 w-full flex justify-center pointer-events-none"
            id="main-header"
        >
            <div className="pointer-events-auto" ref={navRef}>
                <nav className="flex items-center gap-1 sm:gap-1 md:gap-1.5 p-1.5 md:p-1.5 rounded-full glass-nav shadow-skeuo-float border border-white/40">
                    <MagneticElement as="div">
                        <Link
                            className="px-3 sm:px-4 md:px-6 py-2 md:py-2.5 rounded-full text-text-secondary text-xs md:text-base font-bold hover:text-primary transition-all duration-300 hover:bg-white/80 hover:shadow-sm flex items-center gap-1.5 md:gap-2 group"
                            href="/"
                            onClick={handleHomeClick}
                        >
                            <AppIcon name="home" className="h-4 w-4 md:h-5 md:w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <span>{t("home")}</span>
                        </Link>
                    </MagneticElement>

                    <div className="w-[1px] h-6 bg-border-subtle/30 mx-0.5 sm:mx-1"></div>

                    <MagneticElement as="div">
                        <a
                            className="px-3 sm:px-4 md:px-6 py-2 md:py-2.5 rounded-full text-text-secondary text-xs md:text-base font-bold hover:text-primary transition-all duration-300 hover:bg-white/80 hover:shadow-sm flex items-center gap-1.5 md:gap-2 group"
                            href="#stack"
                            onClick={(e) => handleSmoothScroll(e, "#stack")}
                        >
                            <AppIcon name="hub" className="h-4 w-4 md:h-5 md:w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                            {t("stack")}
                        </a>
                    </MagneticElement>

                    <MagneticElement as="div">
                        <a
                            className="px-3 sm:px-4 md:px-6 py-2 md:py-2.5 rounded-full text-text-secondary text-xs md:text-base font-bold hover:text-primary transition-all duration-300 hover:bg-white/80 hover:shadow-sm flex items-center gap-1.5 md:gap-2 group"
                            href="#work"
                            onClick={(e) => handleSmoothScroll(e, "#work")}
                        >
                            <AppIcon name="work" className="h-4 w-4 md:h-5 md:w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                            {t("work")}
                        </a>
                    </MagneticElement>

                    <MagneticElement as="div">
                        <a
                            className="px-3 sm:px-4 md:px-6 py-2 md:py-2.5 rounded-full text-text-secondary text-xs md:text-base font-bold hover:text-primary transition-all duration-300 hover:bg-white/80 hover:shadow-sm flex items-center gap-1.5 md:gap-2 group"
                            href="#contact"
                            onClick={(e) => handleSmoothScroll(e, "#contact")}
                        >
                            <AppIcon name="alternate_email" className="h-4 w-4 md:h-5 md:w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                            {t("contact")}
                        </a>
                    </MagneticElement>

                    <div className="w-[1px] h-6 bg-border-subtle/30 mx-0.5 sm:mx-1"></div>

                    <MagneticElement as="div">
                        <LocaleToggle />
                    </MagneticElement>
                </nav>
            </div>
        </header>
    );
}
