"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import LocaleFlag from "./LocaleFlag";

const LOCALE_LABELS: Record<string, string> = {
    en: "English",
    id: "Bahasa Indonesia",
};

const SEGMENT_WIDTH = 36;

export default function LocaleToggle() {
    const locale = useLocale() as Locale;
    const pathname = usePathname();
    const router = useRouter();
    const thumbRef = useRef<HTMLSpanElement>(null);
    const [visualLocale, setVisualLocale] = useState<Locale>(locale);
    const isFirstRender = useRef(true);

    useEffect(() => {
        setVisualLocale(locale);
    }, [locale]);

    useEffect(() => {
        const thumb = thumbRef.current;
        if (!thumb) return;

        const targetX = visualLocale === "id" ? SEGMENT_WIDTH : 0;

        if (isFirstRender.current) {
            isFirstRender.current = false;
            gsap.set(thumb, { x: targetX });
            return;
        }

        gsap.to(thumb, {
            x: targetX,
            duration: 0.6,
            ease: "power4.inOut",
            overwrite: true,
        });
    }, [visualLocale]);

    const handleSelect = (nextLocale: Locale) => {
        if (nextLocale === visualLocale) return;

        setVisualLocale(nextLocale);
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <div
            className="locale-toggle relative flex items-center p-1 rounded-full bg-black/[0.04] border border-white/50 shadow-skeuo-inset"
            role="group"
            aria-label="Language"
        >
            <span
                ref={thumbRef}
                aria-hidden="true"
                className="absolute top-1 left-1 h-8 w-9 rounded-full bg-white shadow-skeuo-btn will-change-transform"
            />

            {routing.locales.map((loc) => {
                const isActive = visualLocale === loc;

                return (
                    <button
                        key={loc}
                        type="button"
                        onClick={() => handleSelect(loc)}
                        aria-label={LOCALE_LABELS[loc]}
                        aria-pressed={isActive}
                        title={LOCALE_LABELS[loc]}
                        className={`relative z-10 flex h-8 w-9 items-center justify-center rounded-full transition-[opacity,transform] duration-500 ease-in-out ${
                            isActive
                                ? "opacity-100 scale-100"
                                : "opacity-40 hover:opacity-70 scale-95"
                        }`}
                    >
                        <LocaleFlag
                            locale={loc}
                            className="h-3.5 w-5 rounded-[2px] shadow-sm overflow-hidden pointer-events-none"
                        />
                    </button>
                );
            })}
        </div>
    );
}
