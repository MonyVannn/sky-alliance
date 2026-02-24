import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Intro />
      <AboutSection />
    </main>
  );
}
