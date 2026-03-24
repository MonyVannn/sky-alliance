import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CareerPage from "@/components/CareerPage";

export const metadata = {
  title: "Career — Sky Alliance",
  description:
    "Join our team and help us build a future where humanity is exploring the stars.",
};

export default function Career() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#f8f4ff]">
        <CareerPage />
      </main>
      <Footer />
    </>
  );
}
