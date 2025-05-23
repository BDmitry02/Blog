import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Blog",
    description: "Created by Dmytro Bandurov",
};

export default function RootLayout({
    auth,
    children,
}: Readonly<{
    auth: React.ReactNode;
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
                <Providers>
                    {auth}
                    {children}
                </Providers>
            </body>
        </html>
    );
}
