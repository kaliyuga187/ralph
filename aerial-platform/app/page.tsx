import Hero from "@/components/Hero";
import UrgencyBanner from "@/components/UrgencyBanner";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FeaturedContractors from "@/components/FeaturedContractors";
import PressLogos from "@/components/PressLogos";
import LiveActivityFeed from "@/components/LiveActivityFeed";
import StickyBottomCTA from "@/components/StickyBottomCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";

export default function Home() {
  return (
    <main className="min-h-screen">
      <UrgencyBanner />
      <Hero />
      <PressLogos />
      <SocialProof />
      <HowItWorks />
      <FeaturedContractors />
      <Testimonials />
      <LiveActivityFeed />
      <StickyBottomCTA />
      <ExitIntentPopup />
    </main>
  );
}
