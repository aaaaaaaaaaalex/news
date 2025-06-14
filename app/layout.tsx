import type { Metadata } from "next";
import { Lato } from "next/font/google";

import { ContentLayout } from "@/modules/layout";

import "./globals.css";
import ReduxProvider from "./store/redux-provider";

const lato = Lato({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-lato',
});

export const metadata: Metadata = {
    title: "News",
    description: "Amazing news",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <html lang="en">
                <body
                    className={`${lato.className} antialiased`}
                >
                    <ReduxProvider>
                        <ContentLayout>
                            {children}
                        </ContentLayout>                        
                    </ReduxProvider>
                </body>
            </html>
    );
}
