import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-vertical-timeline-component/style.min.css';
import Navbar from './_components/shared/Navbar';
import ChakraUiProvider from './_components/shared/providers/ChakraUiProvider';
import SassUiProvider from './_components/shared/providers/SassUiProvider';
import LayoutWrapper from './_components/shared/LayoutWrapper';
import SessionAppProvider from './_components/shared/providers/SessionProvider';
import QueryProvider from './_components/shared/providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Interview Prep',
    description: 'Use us before your next coding interview',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <ChakraUiProvider>
                    <SassUiProvider>
                        <SessionAppProvider>
                            <Navbar />
                            <LayoutWrapper>
                                <QueryProvider>{children}</QueryProvider>
                            </LayoutWrapper>
                        </SessionAppProvider>
                    </SassUiProvider>
                </ChakraUiProvider>
            </body>
        </html>
    );
}
