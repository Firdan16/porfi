"use client";

import Image from "next/image";
import type { PersonaAccent } from "@/content/hermes-personas/types";
import { PERSONA_THEME } from "@/app/lib/persona-theme";

interface PersonaAvatarFrameProps {
  src: string;
  alt: string;
  accent: PersonaAccent;
  size: number;
  active?: boolean;
}

export default function PersonaAvatarFrame({
  src,
  alt,
  accent,
  size,
  active = false,
}: PersonaAvatarFrameProps) {
  const theme = PERSONA_THEME[accent];

  return (
    <div
      className="relative shrink-0 rounded-full overflow-hidden bg-white border-2 border-white/80 transition-shadow duration-300"
      style={{
        width: size,
        height: size,
        boxShadow: active
          ? `10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff, 0 0 24px ${theme.glow}`
          : `8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff, 0 0 0 1px ${theme.soft}`,
      }}
    >
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${theme.glow}, transparent 70%)`,
          transform: "scale(1.4)",
        }}
        aria-hidden
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover relative z-10"
      />
    </div>
  );
}
