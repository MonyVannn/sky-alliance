import Navigation from "@/components/Navigation";
import ContactPage from "@/components/ContactPage";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact — Sky Alliance",
  description:
    "Get in touch with Sky Alliance. We'd love to hear about your project.",
};

export default function Contact() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
