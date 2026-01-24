import Hero from "@/components/Hero";
import UrgencyBanner from "@/components/UrgencyBanner";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen">
      <UrgencyBanner />
      <Hero />
      <SocialProof />
      <HowItWorks />
    </main>
  );
}
