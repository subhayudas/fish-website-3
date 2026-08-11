import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeafoodSite from "@/components/SeafoodSite";
import {
  isMarketCategorySlug,
  Locale,
  marketCategories,
  marketCategoryPageSlugs,
  marketCategoryPath,
  PageKey,
  routeMap,
  type MarketCategorySlug,
} from "@/lib/content";

const pageTitles: Record<Locale, Record<PageKey, string>> = {
  en: {
    home: "Poissonnerie Sherbrooke | Fresh Fish, Seafood & Prepared Foods in Montréal",
    market: "Fresh Fish & Seafood Market in Montréal | Poissonnerie Sherbrooke",
    menu: "Chef Paul’s Seafood Menu | Poissonnerie Sherbrooke",
    catering: "Seafood Catering in Montréal | Poissonnerie Sherbrooke",
    quote: "Request a Catering Quote | Poissonnerie Sherbrooke",
    story: "Our Story | Poissonnerie Sherbrooke Montréal",
    contact: "Visit & Contact | Poissonnerie Sherbrooke",
    privacy: "Privacy | Poissonnerie Sherbrooke",
  },
  fr: {
    home: "Poissonnerie Sherbrooke | Poissons frais, fruits de mer et prêt-à-manger à Montréal",
    market: "Poissons frais et fruits de mer à Montréal | Poissonnerie Sherbrooke",
    menu: "Menu de fruits de mer du chef Paul | Poissonnerie Sherbrooke",
    catering: "Service traiteur de fruits de mer à Montréal | Poissonnerie Sherbrooke",
    quote: "Demander un devis traiteur | Poissonnerie Sherbrooke",
    story: "Notre histoire | Poissonnerie Sherbrooke Montréal",
    contact: "Nous visiter et nous joindre | Poissonnerie Sherbrooke",
    privacy: "Confidentialité | Poissonnerie Sherbrooke",
  },
};

const descriptions: Record<Locale, string> = {
  en: "Discover fresh fish, seafood, oysters, lobster, chef-prepared specialties and catering from Poissonnerie Sherbrooke, serving Montréal for more than 50 years.",
  fr: "Découvrez poissons frais, fruits de mer, huîtres, homard, spécialités du chef et service traiteur de la Poissonnerie Sherbrooke, au service de Montréal depuis plus de 50 ans.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  ?? "https://fin-living-colour.subhayu435824.chatgpt.site";

type ResolvedRoute = { locale: Locale; page: PageKey; category?: MarketCategorySlug };

const routeLookup = new Map<string, ResolvedRoute>();
for (const locale of ["en", "fr"] as Locale[]) {
  for (const [page, path] of Object.entries(routeMap[locale]) as [PageKey, string][]) {
    routeLookup.set(path.slice(1), { locale, page });
  }
  for (const category of marketCategoryPageSlugs) {
    routeLookup.set(marketCategoryPath(locale, category).slice(1), { locale, page: "market", category });
  }
}

function resolveRoute(slug: string[]): ResolvedRoute | undefined {
  const exact = routeLookup.get(slug.join("/"));
  if (exact) return exact;
  if (slug.length === 3) {
    const [localeSeg, marketSeg, categorySlug] = slug;
    if ((localeSeg === "en" || localeSeg === "fr") && isMarketCategorySlug(categorySlug)) {
      const expected = routeMap[localeSeg].market.slice(1).split("/");
      if (expected[0] === localeSeg && expected[1] === marketSeg) {
        return { locale: localeSeg, page: "market", category: categorySlug };
      }
    }
  }
  return undefined;
}

function categoryTitle(locale: Locale, category: MarketCategorySlug) {
  const name = marketCategories[locale].find((item) => item.slug === category)?.name ?? category;
  return `${name} | Poissonnerie Sherbrooke`;
}

function categoryDescription(locale: Locale, category: MarketCategorySlug) {
  const item = marketCategories[locale].find((entry) => entry.slug === category);
  if (!item) return descriptions[locale];
  return locale === "en"
    ? `${item.note} Shop ${item.name.toLowerCase()} at Poissonnerie Sherbrooke in Montréal.`
    : `${item.note} Découvrez ${item.name.toLowerCase()} à la Poissonnerie Sherbrooke à Montréal.`;
}

export function generateStaticParams() {
  return [...routeLookup.keys()].map((route) => ({ slug: route.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const route = resolveRoute(slug);
  if (!route) return {};
  const title = route.category ? categoryTitle(route.locale, route.category) : pageTitles[route.locale][route.page];
  const description = route.category ? categoryDescription(route.locale, route.category) : descriptions[route.locale];
  const canonicalPath = route.category ? marketCategoryPath(route.locale, route.category) : routeMap[route.locale][route.page];
  const enPath = route.category ? marketCategoryPath("en", route.category) : routeMap.en[route.page];
  const frPath = route.category ? marketCategoryPath("fr", route.category) : routeMap.fr[route.page];
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${canonicalPath}`, languages: { "en-CA": `${siteUrl}${enPath}`, "fr-CA": `${siteUrl}${frPath}`, "x-default": `${siteUrl}/en` } },
    openGraph: { title, description, url: `${siteUrl}${canonicalPath}`, siteName: "Poissonnerie Sherbrooke", locale: route.locale === "en" ? "en_CA" : "fr_CA", type: "website", images: [{ url: `${siteUrl}/og.jpg`, width: 1200, height: 630, alt: "Poissonnerie Sherbrooke" }] },
    twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/og.jpg`] },
  };
}

export default async function LocalizedPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const route = resolveRoute(slug);
  if (!route) notFound();
  return <SeafoodSite locale={route.locale} page={route.page} category={route.category} />;
}
