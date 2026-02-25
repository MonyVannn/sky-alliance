import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import CareersSection from "@/components/CareersSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <Hero />
        <Intro />
        <AboutSection />
        <ServicesSection />
        <CareersSection />
      </main>
      <Footer />
    </>
  );
}
