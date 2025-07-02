import CTASeciton from "@/components/hero/CTASection";
import FeaturesSection from "@/components/hero/FeaturesSection";
import HeroSection from "@/components/hero/HeroSection";
import PaymentInfo from "@/components/hero/PaymentInfo";
import StatsSection from "@/components/hero/StatsSection";
import Footer from "@/components/shared/Footer";
import type { NextPage } from "next";

const LandingPage: NextPage = () => {
	return (
		<>
			<HeroSection />
			<FeaturesSection />
			<div className="mt-10 mb-10">
				<StatsSection />
			</div>
			<CTASeciton />
			<PaymentInfo />
			<Footer />
		</>
	);
};

export default LandingPage;
