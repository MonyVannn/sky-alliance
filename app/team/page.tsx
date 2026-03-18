import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import TeamPage from "@/components/TeamPage";

function Team() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#f8f4ff] relative">
        <TeamPage />
      </main>
      <Footer />
    </>
  );
}

export default Team;
