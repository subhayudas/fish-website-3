import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3001";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "FIN — Living Colour, Delivered",
    description: "Healthy, hand-selected freshwater fish paired to your tank and delivered with care.",
    icons: {
      icon: "/fish/logo.png",
      shortcut: "/fish/logo.png",
      apple: "/fish/logo.png",
    },
    openGraph: {
      title: "FIN — Living Colour, Delivered",
      description: "Curated live freshwater fish, responsibly delivered.",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1536, height: 896, alt: "FIN — Living Colour, Delivered" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "FIN — Living Colour, Delivered",
      description: "Curated live freshwater fish, responsibly delivered.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${instrument.variable}`}>{children}</body>
    </html>
  );
}
