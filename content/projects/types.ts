export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  version: string;
  mainImage: string;
  images: string[];
  features: { icon: string; text: string; description?: string }[];
  tech: string[];
  layout: "normal" | "reverse";
  color: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
}
