import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { cn } from "~~/lib/utils";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontHeading = localFont({
  variable: "--font-heading",
  src: "./geist.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crypto Jam Space",
  description: "Create. Connect. Collaborate. Earn. - The Future of Music 🚀",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen font-sans antialiased", fontSans.variable, fontHeading.variable)}>
        <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
      </body>
    </html>
  );
}
