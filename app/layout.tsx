import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Poissonnerie Sherbrooke",
  description: "Fresh fish, seafood, chef-prepared specialties and catering in Montréal.",
  icons: { icon: "/fish/logo.png", shortcut: "/fish/logo.png", apple: "/fish/logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${manrope.variable} ${bodoni.variable}`}>{children}</body></html>;
}
