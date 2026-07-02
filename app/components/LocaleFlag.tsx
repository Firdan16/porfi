type LocaleFlagProps = {
    locale: string;
    className?: string;
};

export default function LocaleFlag({ locale, className = "h-3.5 w-5" }: LocaleFlagProps) {
    if (locale === "id") {
        return (
            <svg className={className} viewBox="0 0 3 2" aria-hidden="true">
                <rect width="3" height="1" fill="#CE1126" />
                <rect y="1" width="3" height="1" fill="#FFFFFF" />
            </svg>
        );
    }

    return (
        <svg className={className} viewBox="0 0 60 30" aria-hidden="true">
            <clipPath id="gb-s">
                <path d="M0,0 v30 h60 v-30 z" />
            </clipPath>
            <clipPath id="gb-t">
                <path d="M30,15 h30 v15 z v15 h-30 z h-30 z v-15 z v-15 h30 z" />
            </clipPath>
            <g clipPath="url(#gb-s)">
                <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
                <path d="M0,0 60,30 M60,0 0,30" clipPath="url(#gb-t)" stroke="#C8102E" strokeWidth="4" />
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
            </g>
        </svg>
    );
}
