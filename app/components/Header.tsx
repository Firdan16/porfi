"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useLocale, useTranslations } from "next-intl";
import MagneticElement from "./MagneticElement";
import LocaleToggle from "./LocaleToggle";
import { Link } from "@/i18n/navigation";
import mark from "@/public/assets/logo-nonbg.png";

export default function Header() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const headerRef = useRef<HTMLElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { id: "stack", label: t("stack") },
        { id: "experience", label: t("experience") },
        { id: "projects", label: t("projects") },
        { id: "contact", label: t("contact") },
    ];

    const handleScroll = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        event.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `/${locale}#${id}`);
        setMenuOpen(false);
    };

    const handleHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", `/${locale}`);
        setMenuOpen(false);
    };

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;
        const handleModalToggle = () => {
            gsap.to(header, { y: window.isModalOpen ? -120 : 0, opacity: window.isModalOpen ? 0 : 1, duration: 0.25, ease: "power2.out", overwrite: true });
        };
        window.addEventListener("modalToggle", handleModalToggle);
        return () => window.removeEventListener("modalToggle", handleModalToggle);
    }, []);

    return (
        <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5" id="main-header">
            <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 border border-[var(--line)] bg-[var(--paper)] px-3 py-2 shadow-[0_10px_30px_rgba(23,25,29,0.08)] sm:px-4">
                <Link href="/" onClick={handleHome} className="group flex shrink-0 items-center gap-2.5" aria-label={t("home")}>
                    <span className="flex h-8 w-8 items-center justify-center overflow-hidden bg-[var(--ink)]"><Image src={mark} alt="" width={45} height={26} className="h-5 w-auto brightness-0 invert" /></span>
                    <span className="hidden text-[10px] font-black uppercase tracking-[0.14em] text-[var(--ink)] sm:block">Firdan / 26</span>
                </Link>

                <nav className="hidden items-center gap-1 md:flex" aria-label={t("primaryNavigation")}>
                    <Link href="/" onClick={handleHome} className="rounded-full px-3 py-2 text-xs font-bold text-[var(--ink-soft)] transition-colors hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]">{t("home")}</Link>
                    {links.map((link) => <a key={link.id} href={`#${link.id}`} onClick={(event) => handleScroll(event, link.id)} className="rounded-full px-3 py-2 text-xs font-bold text-[var(--ink-soft)] transition-colors hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]">{link.label}</a>)}
                </nav>

                <div className="flex items-center gap-2">
                    <LocaleToggle />
                    <MagneticElement as="button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" className="flex h-9 w-9 items-center justify-center border border-[var(--ink)] text-[var(--ink)] md:hidden">
                        <span className="sr-only">{t("menu")}</span>
                        <span className="flex flex-col gap-1.5" aria-hidden="true"><span className="h-px w-4 bg-current" /><span className="h-px w-4 bg-current" /></span>
                    </MagneticElement>
                </div>
            </div>

            {menuOpen && <nav id="mobile-navigation" className="mx-auto mt-2 max-w-[1120px] border border-[var(--line)] bg-[var(--paper)] p-2 shadow-[0_10px_30px_rgba(23,25,29,0.08)] md:hidden" aria-label="Mobile navigation"><Link href="/" onClick={handleHome} className="flex min-h-11 items-center border-b border-[var(--line)] px-3 text-sm font-bold">{t("home")}</Link>{links.map((link) => <a key={link.id} href={`#${link.id}`} onClick={(event) => handleScroll(event, link.id)} className="flex min-h-11 items-center border-b border-[var(--line)] px-3 text-sm font-bold last:border-b-0">{link.label}</a>)}</nav>}
        </header>
    );
}
