export type ProjectKind = "app" | "package";

export interface ProjectPackageMeta {
  publisher: string;
  install: string;
  snippet: string[];
  platforms: string[];
  license: string;
  dependencies: string;
  likes?: number;
  downloads?: number;
}

export interface Project {
  id: number;
  kind: ProjectKind;
  title: string;
  description: string;
  category: string;
  version: string;
  mainImage?: string;
  demoVideo?: string;
  images?: string[];
  features: { icon: string; text: string; description?: string }[];
  tech: string[];
  layout: "normal" | "reverse";
  color: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  pubDevUrl?: string;
  repositoryUrl?: string;
  packageMeta?: ProjectPackageMeta;
}
