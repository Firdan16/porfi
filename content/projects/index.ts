import type { Locale } from "@/i18n/routing";
import { projects as enProjects } from "./en";
import type { Project } from "./types";

type ProjectTranslation = Pick<
  Project,
  "id" | "description" | "category" | "version" | "features"
>;

export async function getProjects(locale: Locale): Promise<Project[]> {
  if (locale === "en") {
    return enProjects;
  }

  const { default: idTranslations } = await import("./id.json");
  const translationMap = new Map<number, ProjectTranslation>(
    (idTranslations as ProjectTranslation[]).map((entry) => [entry.id, entry])
  );

  return enProjects.map((project) => {
    const translation = translationMap.get(project.id);
    if (!translation) {
      return project;
    }

    return {
      ...project,
      description: translation.description,
      category: translation.category,
      version: translation.version,
      features: translation.features,
    };
  });
}
