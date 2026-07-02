import nextDynamic from "next/dynamic";
import CustomCursorLoader from "../components/CustomCursorLoader";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { getProjects } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-static";

const TechStack = nextDynamic(() => import("../components/TechStack"), {
  loading: () => <section className="min-h-[40vh]" aria-hidden />,
});

const Projects = nextDynamic(() => import("../components/Projects"), {
  loading: () => <section className="min-h-[60vh]" aria-hidden />,
});

const Footer = nextDynamic(() => import("../components/Footer"), {
  loading: () => <footer className="min-h-[24rem]" aria-hidden />,
});

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
      <CustomCursorLoader />
      <div className="relative flex min-h-screen w-full flex-col z-10 font-display">
        <div className="fixed inset-0 bg-noise opacity-[0.05] pointer-events-none z-0"></div>
        <Header />
        <main className="flex-grow pt-24 relative z-10">
          <Hero />
          <TechStack />
          <Projects projects={projects} />
          <Footer />
        </main>
      </div>
    </>
  );
}
