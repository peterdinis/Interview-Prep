"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);

	// Show button after scrolling down 300px
	useEffect(() => {
		const toggleVisibility = () => {
			setIsVisible(window.scrollY > 300);
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	if (!isVisible) return null;

	return (
		<Button
			onClick={scrollToTop}
			className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg"
			variant="secondary"
			size="icon"
		>
			<ArrowUp className="h-5 w-5" />
		</Button>
	);
}
