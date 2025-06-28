import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/shared/Navigation";
import ScrollToTop from "@/components/shared/ScrollToTop";
import QueryProvider from "@/components/shared/providers/QueryProvider";
import { ThemeProvider } from "@/components/shared/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Interview Prep"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`antialiased`}
			>
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
