import type { PersonaAccent } from "@/content/hermes-personas/types";

export interface PersonaThemeConfig {
  accent: string;
  glow: string;
  soft: string;
  ambient: string;
  border: string;
  pillBg: string;
  pillText: string;
  activeRing: string;
}

const electricBlueTheme: PersonaThemeConfig = {
  accent: "#3388FF",
  glow: "rgba(51, 136, 255, 0.16)",
  soft: "rgba(51, 136, 255, 0.09)",
  ambient: "rgba(51, 136, 255, 0.04)",
  border: "rgba(51, 136, 255, 0.28)",
  pillBg: "rgba(51, 136, 255, 0.06)",
  pillText: "#1d4ed8",
  activeRing: "rgba(51, 136, 255, 0.35)",
};

export const PERSONA_THEME: Record<PersonaAccent, PersonaThemeConfig> = {
  blue: electricBlueTheme,
  indigo: electricBlueTheme,
  emerald: {
    accent: "#10b981",
    glow: "rgba(16, 185, 129, 0.16)",
    soft: "rgba(16, 185, 129, 0.09)",
    ambient: "rgba(16, 185, 129, 0.04)",
    border: "rgba(16, 185, 129, 0.28)",
    pillBg: "rgba(16, 185, 129, 0.06)",
    pillText: "#047857",
    activeRing: "rgba(16, 185, 129, 0.35)",
  },
  amber: {
    accent: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.16)",
    soft: "rgba(245, 158, 11, 0.09)",
    ambient: "rgba(245, 158, 11, 0.04)",
    border: "rgba(245, 158, 11, 0.28)",
    pillBg: "rgba(245, 158, 11, 0.06)",
    pillText: "#b45309",
    activeRing: "rgba(245, 158, 11, 0.35)",
  },
};
