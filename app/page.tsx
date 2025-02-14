import { HeroSection } from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import { AgentSection } from "@/components/agent-section";
import { SdkSection } from "@/components/sdk-section";
import { InstallationGuide } from "@/components/installation-guide";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { WhoIsPestoFor } from "@/components/who-is-pesto-for";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AgentSection />
      <SdkSection />
      <InstallationGuide />
      <CapabilitiesSection />
      <WhoIsPestoFor />
      <FaqSection />
      <Footer showCTA={true} />
    </>
  );
}
