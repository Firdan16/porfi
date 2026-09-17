export type PersonaId = "default" | "dev" | "research";
export type PersonaAccent = "blue" | "indigo" | "emerald" | "amber";

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
  directive?: string;
  transmissionSample?: {
    prompt: string;
    response: string;
  };
  styleTag?: string;
}

export type PersonaTranslation = Pick<
  HermesPersona,
  | "id"
  | "role"
  | "personalityTag"
  | "voiceHook"
  | "voiceQuote"
  | "specialties"
  | "directive"
  | "transmissionSample"
  | "styleTag"
>;
