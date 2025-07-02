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
	authors: [
		{ name: "Peter Dinis", url: "https://portfolio-peter-dinis.vercel.app/" },
	],
	applicationName: "Interview Prep",
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
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
