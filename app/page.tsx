import dynamic from "next/dynamic";
import CustomCursor from "./components/CustomCursor";

const Header = dynamic(() => import("./components/Header"));
const Hero = dynamic(() => import("./components/Hero"));
const TechStack = dynamic(() => import("./components/TechStack"));
const Projects = dynamic(() => import("./components/Projects"));
const Footer = dynamic(() => import("./components/Footer"));

export default function Home() {
  return (
    <>
      <CustomCursor />
      <div className="relative flex min-h-screen w-full flex-col z-10 font-display">
        <div className="fixed inset-0 bg-noise opacity-[0.05] pointer-events-none z-0"></div>
        <Header />
        <main className="flex-grow pt-24 relative z-10">
          <Hero />
          <TechStack />
          <Projects />
          <Footer />
        </main>
      </div>
    </>
  );
}
