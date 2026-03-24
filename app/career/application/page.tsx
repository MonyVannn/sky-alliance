import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CareerHero from "@/components/CareerHero";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { JOB_DETAILS } from "@/data/career";

export const metadata = {
  title: "Apply - Career — Sky Alliance",
  description: "Apply for a position at Sky Alliance.",
};

export default function CareerApplicationPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#f8f4ff]">
        <CareerHero />

        <section className="bg-white py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 ">
            <div className="w-full">
              <div className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-sm">
                <div className="mb-8 border-b border-neutral-200 pb-6">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#ff6f00" }}
                  >
                    {JOB_DETAILS.company}
                  </span>
                  <h2
                    className="mt-2 text-2xl sm:text-3xl font-bold text-[#171717] leading-tight"
                    style={{ fontFamily: "var(--font-sora), sans-serif" }}
                  >
                    {JOB_DETAILS.title}
                  </h2>
                  {JOB_DETAILS.metaLine ? (
                    <p className="mt-1 text-sm text-neutral-500">
                      {JOB_DETAILS.metaLine}
                    </p>
                  ) : null}
                  {JOB_DETAILS.salary ? (
                    <p className="mt-1 text-sm text-neutral-600">
                      {JOB_DETAILS.salary}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm text-neutral-500">
                    Apply for this position
                  </p>
                </div>

                <CareerApplicationForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
