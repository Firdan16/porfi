import type { PersonaAccent } from "@/content/hermes-personas/types";

export const PERSONA_THEME: Record<
  PersonaAccent,
  { accent: string; glow: string; soft: string; ambient: string }
> = {
  indigo: {
    accent: "#6366f1",
    glow: "rgba(99, 102, 241, 0.18)",
    soft: "rgba(99, 102, 241, 0.12)",
    ambient: "rgba(99, 102, 241, 0.08)",
  },
  emerald: {
    accent: "#10b981",
    glow: "rgba(16, 185, 129, 0.18)",
    soft: "rgba(16, 185, 129, 0.12)",
    ambient: "rgba(16, 185, 129, 0.08)",
  },
  amber: {
    accent: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.18)",
    soft: "rgba(245, 158, 11, 0.12)",
    ambient: "rgba(245, 158, 11, 0.08)",
  },
};
