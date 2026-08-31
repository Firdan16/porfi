export type PersonaId = "default" | "dev" | "research";
export type PersonaAccent = "indigo" | "emerald" | "amber";

export interface HermesPersona {
  id: PersonaId;
  name: string;
  role: string;
  personalityTag: string;
  voiceHook: string;
  voiceQuote: string;
  specialties: string[];
  accent: PersonaAccent;
  channel: string;
  frequency: number;
  avatar: string;
}

export type PersonaTranslation = Pick<
  HermesPersona,
  "id" | "role" | "personalityTag" | "voiceHook" | "voiceQuote" | "specialties"
>;
