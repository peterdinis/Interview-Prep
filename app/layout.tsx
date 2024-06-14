import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ChakraUiProvider from './component/shared/ChakraUiProvider';
import Navbar from './component/shared/Navbar';

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
                    <Navbar />
                    {children}
                </ChakraUiProvider>
            </body>
        </html>
    );
}
