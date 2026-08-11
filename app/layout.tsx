import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Poissonnerie Sherbrooke",
  description: "Fresh fish, seafood, chef-prepared specialties and catering in Montréal.",
  applicationName: "Poissonnerie Sherbrooke",
  formatDetection: { telephone: false, address: false, email: false },
  icons: { icon: "/fish/logo.png", shortcut: "/fish/logo.png", apple: "/fish/logo.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#031923",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>{children}</body>
    </html>
  );
}
