import Image from "next/image";
import { useTranslations } from "next-intl";
import MagneticElement from "./MagneticElement";
import AppIcon from "./AppIcon";
import BrandIcon from "./BrandIcon";
import mark from "@/public/assets/logo-nonbg.png";

export default function Footer() {
    const t = useTranslations("footer");

    return (
        <footer id="contact" className="relative overflow-hidden border-t border-white/15 bg-[var(--navy)] px-4 py-20 text-[var(--paper-light)] sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <Image src={mark} alt="" aria-hidden="true" sizes="(min-width: 1200px) 620px, 52vw" className="pointer-events-none absolute -bottom-24 -right-20 w-[min(52vw,620px)] opacity-[0.08] brightness-0 invert sm:-bottom-32 sm:-right-10" />
            <div className="relative z-10 mx-auto max-w-[1200px]">
                <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] lg:gap-24">
                    <div>
                        <p className="archive-caption mb-7 text-[var(--identity-soft)]">{t("eyebrow")}</p>
                        <h2 className="max-w-[720px] font-serif text-6xl font-semibold leading-[0.82] tracking-[-0.06em] text-[var(--paper-light)] sm:text-8xl">{t("headingLine1")} <em className="font-normal text-[var(--identity-soft)]">{t("headingName")}</em></h2>
                        <p className="mt-8 max-w-lg text-sm leading-[1.75] text-[var(--paper-light)]/80 sm:text-base">{t("availability")}</p>
                    </div>

                    <div className="flex flex-col justify-end gap-8 lg:pb-2">
                        <div className="border-t border-white/25 pt-4">
                            <p className="archive-caption text-[var(--paper-light)]/65">{t("emailLabel")}</p>
                            <MagneticElement as="a" href="mailto:firdanmaru@gmail.com" className="mt-2 block break-all font-serif text-2xl text-[var(--paper-light)] transition-colors hover:text-[var(--identity-soft)] sm:text-3xl">firdanmaru@gmail.com</MagneticElement>
                        </div>
                        <div className="border-t border-white/25 pt-4">
                            <p className="archive-caption mb-4 text-[var(--paper-light)]/65">{t("elsewhereLabel")}</p>
                            <div className="flex flex-wrap gap-x-6 gap-y-4">
                                <MagneticElement as="a" href={t("resumePath")} target="_blank" rel="noopener noreferrer" className="footer-link"><AppIcon name="download" className="h-4 w-4 shrink-0" />{t("downloadResume")}</MagneticElement>
                                <MagneticElement as="a" href="https://github.com/Firdan16" target="_blank" rel="noopener noreferrer" className="footer-link"><BrandIcon name="github" className="h-4 w-4 shrink-0" />GitHub</MagneticElement>
                                <MagneticElement as="a" href="https://www.linkedin.com/in/firdan-umar-arisyawal-132b11282" target="_blank" rel="noopener noreferrer" className="footer-link"><BrandIcon name="linkedin" className="h-4 w-4 shrink-0" />LinkedIn</MagneticElement>
                                <MagneticElement as="a" href="https://instagram.com/firdanumaras" target="_blank" rel="noopener noreferrer" className="footer-link"><BrandIcon name="instagram" className="h-4 w-4 shrink-0" />Instagram</MagneticElement>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col gap-3 border-t border-white/25 pt-5 text-xs text-[var(--paper-light)]/70 sm:flex-row sm:items-center sm:justify-between">
                    <p>{t("copyright")}</p>
                    <p className="text-[var(--paper-light)]/60">{t("closingLine")}</p>
                </div>
            </div>
        </footer>
    );
}
