import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import SmoothScroller from "./components/SmoothScroller";

export default function Home() {
  return (
    <SmoothScroller>
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
    </SmoothScroller>
  );
}
