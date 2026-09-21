import Header from "../components/Header";
import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import { getProjects } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-static";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    return null;
  }

  setRequestLocale(locale);
  const projects = await getProjects(locale as Locale);

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col z-10 font-display">
        <div className="fixed inset-0 bg-noise opacity-[0.025] pointer-events-none z-0"></div>
        <Header />
        <main className="flex-grow pt-24 relative z-10">
          <Hero />
          <TechStack />
          {/* Agents is intentionally hidden while Experience is the active work-history section. */}
          {/* <HermesPersonas personas={personas} /> */}
          <Experience />
          <Projects projects={projects} />
          <Footer />
        </main>
      </div>
    </>
  );
}
