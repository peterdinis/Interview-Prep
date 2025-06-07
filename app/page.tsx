import CTASeciton from "@/components/hero/CTASection";
import FeaturesSection from "@/components/hero/FeaturesSection";
import HeroSection from "@/components/hero/HeroSection";
import StatsSection from "@/components/hero/StatsSection";
import { NextPage } from "next";

const LandingPage: NextPage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASeciton />
    </>
  )
}

export default LandingPage