import type { Locale } from "@/i18n/routing";
import { personas as enPersonas } from "./en";
import type { HermesPersona, PersonaTranslation } from "./types";

export type { HermesPersona, PersonaAccent, PersonaId } from "./types";

export async function getPersonas(locale: Locale): Promise<HermesPersona[]> {
  if (locale === "en") {
    return enPersonas;
  }

  const { default: idTranslations } = await import("./id.json");
  const translationMap = new Map<PersonaTranslation["id"], PersonaTranslation>(
    (idTranslations as PersonaTranslation[]).map((entry) => [entry.id, entry])
  );

  return enPersonas.map((persona) => {
    const translation = translationMap.get(persona.id);
    if (!translation) {
      return persona;
    }

    return {
      ...persona,
      role: translation.role,
      personalityTag: translation.personalityTag,
      voiceHook: translation.voiceHook,
      voiceQuote: translation.voiceQuote,
      specialties: translation.specialties,
      directive: translation.directive ?? persona.directive,
      transmissionSample: translation.transmissionSample ?? persona.transmissionSample,
      styleTag: translation.styleTag ?? persona.styleTag,
    };
  });
}

export function getPersonaIndex(id: HermesPersona["id"], personas: HermesPersona[]): number {
  const index = personas.findIndex((persona) => persona.id === id);
  return index === -1 ? 0 : index;
}
