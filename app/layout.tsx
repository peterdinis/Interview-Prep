import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/shared/Navigation";
import ScrollToTop from "@/components/shared/ScrollToTop";
import QueryProvider from "@/components/shared/providers/QueryProvider";
import { ThemeProvider } from "@/components/shared/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Interview Prep",
	description:
		"Prepare for job interviews efficiently and effectively with our all-in-one platform.",
	keywords: [
		"interview",
		"job prep",
		"career",
		"interview questions",
		"practice",
	],
	authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
	applicationName: "Interview Prep",
	viewport: "width=device-width, initial-scale=1",
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
	openGraph: {
		title: "Interview Prep",
		description:
			"Ace your job interviews with our structured preparation tools.",
		url: "https://interviewprep.example.com",
		siteName: "Interview Prep",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				<QueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Navigation />
						{children}
						<ScrollToTop />
						<Toaster />
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
