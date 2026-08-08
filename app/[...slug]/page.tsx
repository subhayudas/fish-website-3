import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import SeafoodSite from "@/components/SeafoodSite";
import { Locale, PageKey, routeMap } from "@/lib/content";

const pageTitles: Record<Locale, Record<PageKey, string>> = {
  en: {
    home: "Poissonnerie Sherbrooke | Fresh Fish, Seafood & Prepared Foods in Montréal",
    market: "Fresh Fish & Seafood Market in Montréal | Poissonnerie Sherbrooke",
    menu: "Chef Paul’s Seafood Menu | Poissonnerie Sherbrooke",
    catering: "Seafood Catering in Montréal | Poissonnerie Sherbrooke",
    story: "Our Story | Poissonnerie Sherbrooke Montréal",
    contact: "Visit & Contact | Poissonnerie Sherbrooke",
    privacy: "Privacy | Poissonnerie Sherbrooke",
  },
  fr: {
    home: "Poissonnerie Sherbrooke | Poissons frais, fruits de mer et prêt-à-manger à Montréal",
    market: "Poissons frais et fruits de mer à Montréal | Poissonnerie Sherbrooke",
    menu: "Menu de fruits de mer du chef Paul | Poissonnerie Sherbrooke",
    catering: "Service traiteur de fruits de mer à Montréal | Poissonnerie Sherbrooke",
    story: "Notre histoire | Poissonnerie Sherbrooke Montréal",
    contact: "Nous visiter et nous joindre | Poissonnerie Sherbrooke",
    privacy: "Confidentialité | Poissonnerie Sherbrooke",
  },
};

const descriptions: Record<Locale, string> = {
  en: "Discover fresh fish, seafood, oysters, lobster, chef-prepared specialties and catering from Poissonnerie Sherbrooke, serving Montréal for more than 50 years.",
  fr: "Découvrez poissons frais, fruits de mer, huîtres, homard, spécialités du chef et service traiteur de la Poissonnerie Sherbrooke, au service de Montréal depuis plus de 50 ans.",
};

const routeLookup = new Map<string, { locale: Locale; page: PageKey }>();
for (const locale of ["en", "fr"] as Locale[]) {
  for (const [page, path] of Object.entries(routeMap[locale]) as [PageKey, string][]) routeLookup.set(path.slice(1), { locale, page });
}

function resolveRoute(slug: string[]) {
  return routeLookup.get(slug.join("/"));
}

export function generateStaticParams() {
  return [...routeLookup.keys()].map((route) => ({ slug: route.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const route = resolveRoute(slug);
  if (!route) return {};
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3002";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    title: pageTitles[route.locale][route.page],
    description: descriptions[route.locale],
    alternates: { canonical: `${origin}${routeMap[route.locale][route.page]}`, languages: { "en-CA": `${origin}${routeMap.en[route.page]}`, "fr-CA": `${origin}${routeMap.fr[route.page]}` } },
    openGraph: { title: pageTitles[route.locale][route.page], description: descriptions[route.locale], locale: route.locale === "en" ? "en_CA" : "fr_CA", type: "website", images: [{ url: `${origin}/og.png`, width: 1536, height: 896, alt: "Poissonnerie Sherbrooke" }] },
    twitter: { card: "summary_large_image", title: pageTitles[route.locale][route.page], description: descriptions[route.locale], images: [`${origin}/og.png`] },
  };
}

export default async function LocalizedPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const route = resolveRoute(slug);
  if (!route) notFound();
  return <SeafoodSite locale={route.locale} page={route.page} />;
}
