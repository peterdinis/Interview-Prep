import { ArrowRight } from "lucide-react";
import type { FC } from "react";
import { Button } from "../ui/button";

const CTASection: FC = () => {
	return (
		<section className="relative py-24 bg-background dark:bg-background overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
			<div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
				<div className="bg-white/80 dark:bg-background backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
					<h2 className="text-4xl md:text-5xl font-bold dark:text-sky-50 text-gray-900 mb-6">
						Ready to Ace Your
						<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
							{" "}
							Next Interview?
						</span>
					</h2>
					<p className="text-xl text-gray-600 dark:text-blue-100 mb-10 leading-relaxed">
						Join over 50,000 developers who have successfully prepared with
						Interview Prep. Start your journey today - completely free, no
						credit card required!
					</p>
					<Button
						size="lg"
						variant={"default"}
						className="text-base rounded-2xl"
					>
						Get Started Now - It&apos;s Free
						<ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
					</Button>
				</div>
			</div>
		</section>
	);
};

export default CTASection;
