import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LineFloat } from "@/components/layout/line-float";
import { Hero } from "@/components/home/hero";
import { PainPoints } from "@/components/home/pain-points";
import { WhyAthena } from "@/components/home/why-athena";
import { ServiceTimeline } from "@/components/home/service-timeline";
import { Treatments } from "@/components/home/treatments";
import { DoctorTeam } from "@/components/home/doctor-team";
import { FAQ } from "@/components/home/faq";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Divider: Hero -> PainPoints */}
        <div className="section-divider" />

        <PainPoints />

        {/* Divider with diamond accent */}
        <div className="relative">
          <div className="section-divider" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
            <div className="w-1 h-1 bg-gold/20 rotate-45" />
          </div>
        </div>

        <div className="relative">
          {/* Subtle gold radial overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.02)_0%,transparent_50%)] pointer-events-none" />
          <WhyAthena />
        </div>

        {/* Divider */}
        <div className="section-divider" />

        <ServiceTimeline />

        {/* Divider with triple diamond */}
        <div className="relative py-2">
          <div className="section-divider" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
            <div className="w-0.5 h-0.5 bg-gold/15 rotate-45" />
            <div className="w-1 h-1 bg-gold/25 rotate-45" />
            <div className="w-0.5 h-0.5 bg-gold/15 rotate-45" />
          </div>
        </div>

        <div className="relative">
          {/* Alternating subtle gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(212,175,55,0.015)_0%,transparent_50%)] pointer-events-none" />
          <Treatments />
        </div>

        {/* Divider */}
        <div className="section-divider" />

        <DoctorTeam />

        {/* Divider with diamond */}
        <div className="relative py-2">
          <div className="section-divider" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
            <div className="w-1 h-1 bg-gold/20 rotate-45" />
          </div>
        </div>

        <div className="relative">
          {/* Alternating subtle gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(212,175,55,0.015)_0%,transparent_50%)] pointer-events-none" />
          <FAQ />
        </div>

        {/* Divider */}
        <div className="section-divider" />

        <CTASection />
      </main>
      <Footer />
      <LineFloat />
    </>
  );
}
