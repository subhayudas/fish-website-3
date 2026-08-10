export type Locale = "en" | "fr";
export type PageKey = "home" | "market" | "menu" | "catering" | "quote" | "story" | "contact" | "privacy";

export const business = {
  name: "Poissonnerie Sherbrooke",
  address: "5121 Sherbrooke Street West, Montréal, Québec H4A 1T2",
  addressFr: "5121, rue Sherbrooke Ouest, Montréal, Québec H4A 1T2",
  telephone: "(514) 486-5246",
  telephoneHref: "tel:+15144865246",
  email: "info@lapoissonneriesherbrooke.com",
  maps: "https://www.google.com/maps/dir/?api=1&destination=Poissonnerie+Sherbrooke%2C+5121+Sherbrooke+Street+West%2C+Montr%C3%A9al%2C+Qu%C3%A9bec+H4A+1T2",
  mapsEmbed: "https://www.google.com/maps?q=Poissonnerie+Sherbrooke%2C+5121+Sherbrooke+Street+West%2C+Montr%C3%A9al%2C+Qu%C3%A9bec+H4A+1T2&hl=en&z=16&output=embed",
  googleReviews: "https://www.google.com/maps/search/?api=1&query=Poissonnerie+Sherbrooke&query_place_id=ChIJ3V6hk6UQyUwRAMbXW2N813k",
  hours: {
    en: [
      "Monday–Wednesday · 8:00 AM–6:00 PM",
      "Thursday–Friday · 8:00 AM–6:30 PM",
      "Saturday · 9:00 AM–6:00 PM",
      "Sunday · 10:00 AM–5:30 PM",
    ],
    fr: [
      "Lundi–mercredi · 8 h–18 h",
      "Jeudi–vendredi · 8 h–18 h 30",
      "Samedi · 9 h–18 h",
      "Dimanche · 10 h–17 h 30",
    ],
  },
};

export const routeMap: Record<Locale, Record<PageKey, string>> = {
  en: { home: "/en", market: "/en/market", menu: "/en/menu", catering: "/en/catering", quote: "/en/catering/request-quote", story: "/en/our-story", contact: "/en/contact", privacy: "/en/privacy" },
  fr: { home: "/fr", market: "/fr/poissonnerie", menu: "/fr/menu", catering: "/fr/traiteur", quote: "/fr/traiteur/demander-un-devis", story: "/fr/notre-histoire", contact: "/fr/contact", privacy: "/fr/confidentialite" },
};

export const marketCategories = {
  en: [
    { name: "Fresh fish", slug: "fresh-fish", note: "A daily selection chosen for texture, colour and condition.", image: "/sherbrooke/market-counter.webp" },
    { name: "Salmon & tuna", slug: "salmon-tuna", note: "Atlantic salmon and yellowfin tuna, including sushi-grade cuts when available.", image: "/sherbrooke/salmon.webp" },
    { name: "Lobster", slug: "lobster", note: "Live and cooked lobster, prepared to order when available.", image: "/sherbrooke/lobsters.webp" },
    { name: "Oysters", slug: "oysters", note: "Whole and freshly shucked oysters for the counter or your table.", image: "/sherbrooke/oysters.webp" },
    { name: "Shellfish", slug: "shellfish", note: "Scallops, tiger shrimp and a changing shellfish selection.", image: "/sherbrooke/shellfish-platter.webp" },
    { name: "Chef-prepared", slug: "chef-prepared", note: "Soups, bisques, tartares, paella and signature dishes by Chef Paul.", image: "/sherbrooke/seafood-feast.webp" },
    { name: "Fine foods", slug: "fine-foods", note: "Caviar, smoked salmon, oils, vinegars, spices and seacuterie.", image: "/sherbrooke/caviar-selection.webp" },
    { name: "Produce & essentials", slug: "produce-essentials", note: "Fresh produce, pasta, noodles and selected dairy essentials.", image: "/sherbrooke/fine-foods.webp" },
  ],
  fr: [
    { name: "Poissons frais", slug: "fresh-fish", note: "Une sélection quotidienne choisie pour sa texture, sa couleur et sa fraîcheur.", image: "/sherbrooke/market-counter.webp" },
    { name: "Saumon et thon", slug: "salmon-tuna", note: "Saumon de l’Atlantique et thon à nageoires jaunes, qualité sushi selon les arrivages.", image: "/sherbrooke/salmon.webp" },
    { name: "Homard", slug: "lobster", note: "Homard vivant ou cuit, préparé sur demande selon la disponibilité.", image: "/sherbrooke/lobsters.webp" },
    { name: "Huîtres", slug: "oysters", note: "Huîtres entières ou fraîchement ouvertes, pour le comptoir ou votre table.", image: "/sherbrooke/oysters.webp" },
    { name: "Fruits de mer", slug: "shellfish", note: "Pétoncles, crevettes tigrées et sélection variable de coquillages.", image: "/sherbrooke/shellfish-platter.webp" },
    { name: "Prêt-à-manger", slug: "chef-prepared", note: "Soupes, bisques, tartares, paella et plats signatures du chef Paul.", image: "/sherbrooke/seafood-feast.webp" },
    { name: "Épicerie fine", slug: "fine-foods", note: "Caviar, saumon fumé, huiles, vinaigres, épices et charcuteries de la mer.", image: "/sherbrooke/caviar-selection.webp" },
    { name: "Produits et essentiels", slug: "produce-essentials", note: "Produits frais, pâtes, nouilles et produits laitiers sélectionnés.", image: "/sherbrooke/fine-foods.webp" },
  ],
};

/** Home “Shop by category” grid — 7 browse cards + View all. */
export const shopCategorySlugs = ["fresh-fish", "salmon-tuna", "lobster", "shellfish", "chef-prepared", "fine-foods", "produce-essentials"] as const;

/** Market category pages (excludes chef-prepared — that uses the Chef’s Menu route). */
export const marketCategoryPageSlugs = ["fresh-fish", "salmon-tuna", "lobster", "shellfish", "fine-foods", "produce-essentials"] as const;
export type MarketCategorySlug = (typeof marketCategoryPageSlugs)[number];

export function isMarketCategorySlug(slug: string): slug is MarketCategorySlug {
  return (marketCategoryPageSlugs as readonly string[]).includes(slug);
}

export function marketCategoryPath(locale: Locale, slug: MarketCategorySlug): string {
  return `${routeMap[locale].market}/${slug}`;
}

export const shopCategoryImages: Record<(typeof shopCategorySlugs)[number], string> = {
  "fresh-fish": "/sherbrooke/category-fresh-fish.webp",
  "salmon-tuna": "/sherbrooke/category-salmon-tuna.webp",
  lobster: "/sherbrooke/category-lobster.webp",
  shellfish: "/sherbrooke/category-shellfish.webp",
  "chef-prepared": "/sherbrooke/category-chef-prepared.webp",
  "fine-foods": "/sherbrooke/category-fine-foods.webp",
  "produce-essentials": "/sherbrooke/category-produce.webp",
};

/** Placeholder product names for category pages — replace with real inventory later. */
export const categoryPlaceholderProducts: Record<MarketCategorySlug, Record<Locale, string[]>> = {
  "fresh-fish": {
    en: ["Atlantic cod", "Halibut", "Sea bass", "Branzino", "Sole", "Red snapper"],
    fr: ["Morue de l’Atlantique", "Flétan", "Bar", "Bar européen", "Sole", "Vivaneau"],
  },
  "salmon-tuna": {
    en: ["Atlantic salmon fillet", "Sushi-grade salmon", "Yellowfin tuna", "Tuna steak", "Smoked salmon", "Salmon belly"],
    fr: ["Filet de saumon de l’Atlantique", "Saumon qualité sushi", "Thon à nageoires jaunes", "Steak de thon", "Saumon fumé", "Ventre de saumon"],
  },
  lobster: {
    en: ["Live lobster", "Cooked lobster", "Lobster tails", "Lobster meat", "Lobster claws", "Half lobster"],
    fr: ["Homard vivant", "Homard cuit", "Queues de homard", "Chair de homard", "Pinces de homard", "Demi-homard"],
  },
  shellfish: {
    en: ["Sea scallops", "Tiger shrimp", "Mussels", "Clams", "Crab claws", "Calamari"],
    fr: ["Pétoncles", "Crevettes tigrées", "Moules", "Palourdes", "Pinces de crabe", "Calmars"],
  },
  "fine-foods": {
    en: ["Caviar", "Smoked salmon", "Olive oil", "Aged balsamic", "Seacuterie selection", "Specialty spices"],
    fr: ["Caviar", "Saumon fumé", "Huile d’olive", "Vinaigre balsamique vieilli", "Sélection de charcuteries de la mer", "Épices de spécialité"],
  },
  "produce-essentials": {
    en: ["Seasonal produce", "Fresh herbs", "Pasta & noodles", "Dairy essentials", "Lemons & citrus", "Garlic & shallots"],
    fr: ["Produits de saison", "Herbes fraîches", "Pâtes et nouilles", "Produits laitiers", "Citrons et agrumes", "Ail et échalotes"],
  },
};

export const menuGroups = {
  en: [
    { title: "From the raw bar", items: ["Fresh oyster platters", "Tartares", "Sushi-grade salmon when available", "Sushi-grade tuna when available"] },
    { title: "Chef Paul’s kitchen", items: ["Soups and chowders", "Bisques", "Seafood paella", "Pasta preparations", "Fish and chips"] },
    { title: "Signatures", items: ["House lobster roll", "Hot seafood platters", "Cold seafood platters", "Signature seafood preparations"] },
  ],
  fr: [
    { title: "Du bar à cru", items: ["Plateaux d’huîtres fraîches", "Tartares", "Saumon qualité sushi selon les arrivages", "Thon qualité sushi selon les arrivages"] },
    { title: "La cuisine du chef Paul", items: ["Soupes et chaudrées", "Bisques", "Paella aux fruits de mer", "Plats de pâtes", "Fish and chips"] },
    { title: "Les signatures", items: ["Guédille au homard maison", "Plateaux de fruits de mer chauds", "Plateaux de fruits de mer froids", "Créations signatures de fruits de mer"] },
  ],
};

export const trustSection = {
  en: {
    title: ["Trusted by Montréal", "for over 50 years."],
    body: "Real reviews from real customers.",
    googleBadge: "4.5★ · 258 reviews on Google",
    stats: [
      { value: "258", label: "Reviews" },
      // Hardcoded from Google Business Profile (4.5★ / 258 reviews). Update periodically, or replace with live Places API later.
      { value: "4.5★", label: "Average rating" },
      { value: "50+", label: "Years in business" },
      { value: "Daily", label: "Fresh deliveries" },
    ],
    reviews: [
      { name: "Bluma Litner", quote: "I have been shopping at Poisonnerie Sherbrooke for years. They have a great selection of fish and seafood, and the staff is very welcoming. At the back of the store, I discovered Chef Paul. He prepares terrific food from fish and seafood to soups, salads and vegetables. Paul uses only the freshest of ingredients and everything is made with great care. His lobster rolls are the best." },
      { name: "Louis Rail", quote: "Chef Paul prepared a feast for our guests: delicious lobster and fresh asparagus sautéed with garlic. The fishmonger’s products are always fresh. We love the organic salmon and the cod. A true gem in our neighborhood." },
      { name: "Thibaut Andre", quote: "Great fish place. Fish and seafood always fresh :)" },
      { name: "Suzanne Tokarsky", quote: "The seafood is always fresh and beautifully presented. Prices are fair and the staff is helpful. Eat well and enjoy!" },
      { name: "Claude Blanchet", quote: "Once again Chef Paul outdid himself. The seafood bouillabaisse was delicious with huge shrimp and lots of salmon. The lobster thermidor was to die for with huge chunks of lobster." },
      { name: "Monte Snow", quote: "Being a fishmonger myself I can honestly say I was impressed with the quality, variety, service, friendly staff and welcoming owners. Well done." },
      { name: "Lydia Mamane", quote: "Best fish and seafood in the ’hood. Quality, value, service and free parking in the back! Love the cooked lobster, seafood platters, and yummy homemade dishes incl lobster rolls." },
      { name: "Andrew Cherna", quote: "Fantastic fish, great service!!! Can’t wait to go back!" },
      { name: "Dominique Patry", quote: "I bought $111 worth of U8 scallops. A success! The fishmonger, in 15 seconds flat, gave us a thousand and one recipes to do justice to the product. Freshness is guaranteed at this charming little fish shop." },
      { name: "Erinn Wattie", quote: "We ordered a family-style paella for holiday meal and everyone was thrilled. Delicious and flavourful, lots of seafood, prepared very well." },
      { name: "Marina Joubeily Harfouche", quote: "A lovely fish market/delicatessen in Westmount. They have everything, especially their fresh seafood, which is perfect for a seafood platter or for making sushi. The staff was kind and friendly." },
      { name: "Jacob Cohen", quote: "Fantastic quality, reasonable price, friendly staff. Highly recommend." },
      { name: "Dante Monchez Galvez", quote: "Nice staff, food quality is good, always had a good service." },
    ],
  },
  fr: {
    title: ["La confiance de Montréal", "depuis plus de 50 ans."],
    body: "De vrais avis de vrais clients.",
    googleBadge: "4.5★ · 258 avis sur Google",
    stats: [
      { value: "258", label: "Avis" },
      // Valeur codée en dur depuis Google (4.5★ / 258 avis). À mettre à jour périodiquement, ou via Places API plus tard.
      { value: "4.5★", label: "Note moyenne" },
      { value: "50+", label: "Ans d’existence" },
      { value: "Quotidien", label: "Arrivages frais" },
    ],
    reviews: [
      { name: "Bluma Litner", quote: "I have been shopping at Poisonnerie Sherbrooke for years. They have a great selection of fish and seafood, and the staff is very welcoming. At the back of the store, I discovered Chef Paul. He prepares terrific food from fish and seafood to soups, salads and vegetables. Paul uses only the freshest of ingredients and everything is made with great care. His lobster rolls are the best." },
      { name: "Louis Rail", quote: "Chef Paul prepared a feast for our guests: delicious lobster and fresh asparagus sautéed with garlic. The fishmonger’s products are always fresh. We love the organic salmon and the cod. A true gem in our neighborhood." },
      { name: "Thibaut Andre", quote: "Great fish place. Fish and seafood always fresh :)" },
      { name: "Suzanne Tokarsky", quote: "The seafood is always fresh and beautifully presented. Prices are fair and the staff is helpful. Eat well and enjoy!" },
      { name: "Claude Blanchet", quote: "Once again Chef Paul outdid himself. The seafood bouillabaisse was delicious with huge shrimp and lots of salmon. The lobster thermidor was to die for with huge chunks of lobster." },
      { name: "Monte Snow", quote: "Being a fishmonger myself I can honestly say I was impressed with the quality, variety, service, friendly staff and welcoming owners. Well done." },
      { name: "Lydia Mamane", quote: "Best fish and seafood in the ’hood. Quality, value, service and free parking in the back! Love the cooked lobster, seafood platters, and yummy homemade dishes incl lobster rolls." },
      { name: "Andrew Cherna", quote: "Fantastic fish, great service!!! Can’t wait to go back!" },
      { name: "Dominique Patry", quote: "I bought $111 worth of U8 scallops. A success! The fishmonger, in 15 seconds flat, gave us a thousand and one recipes to do justice to the product. Freshness is guaranteed at this charming little fish shop." },
      { name: "Erinn Wattie", quote: "We ordered a family-style paella for holiday meal and everyone was thrilled. Delicious and flavourful, lots of seafood, prepared very well." },
      { name: "Marina Joubeily Harfouche", quote: "A lovely fish market/delicatessen in Westmount. They have everything, especially their fresh seafood, which is perfect for a seafood platter or for making sushi. The staff was kind and friendly." },
      { name: "Jacob Cohen", quote: "Fantastic quality, reasonable price, friendly staff. Highly recommend." },
      { name: "Dante Monchez Galvez", quote: "Nice staff, food quality is good, always had a good service." },
    ],
  },
};

export const copy = {
  en: {
    localeName: "FR",
    navigation: { market: "The Market", menu: "Chef’s Menu", catering: "Catering", story: "Our Story", contact: "Visit Us", call: "Call to order", open: "Open menu", close: "Close menu" },
    hero: { title: "Montréal’s fresh fish market since 1975.", body: "Hand-selected daily by our fishmongers. Trusted by Montréal families and top chefs for over 50 years.", primary: "Order online" },
    trust: ["Fresh daily", "Fully traceable", "Expert fishmongers", "Fast delivery", "Sourced with care"],
    counter: { title: "Shop by category", body: "Our selection changes with every delivery.", order: "Order online", viewAll: "View all" },
    chef: { eyebrow: "Meet Chef Paul", title: "Four decades of experience, served fresh every day.", body: "With more than 40 years of experience in Montréal restaurants, Chef Paul brings restaurant-level craft to the neighbourhood fish market.", specialties: ["Chowders", "Bisques", "Tartares", "Paella", "Lobster rolls", "Fish and chips"] },
    dishes: { eyebrow: "Chef-prepared", title: "Made here. Ready for your table.", body: "Fresh lobster meat shelled in-house, blended with house-seasoned mayonnaise, and served on a locally sourced brioche bun." },
    catering: {
      eyebrow: "Catering & gatherings",
      title: "Let us cater your next event.",
      body: "Custom seafood platters for family gatherings, celebrations, and corporate events, prepared by our chefs and ready when you need them.",
      primary: "Plan my event",
      secondaryPrefix: "Or call us at",
    },
    visit: { eyebrow: "Visit the market", title: "Your neighbourhood fishmonger, on Sherbrooke West.", directions: "Get directions", call: "Call the store", email: "Send a request" },
    homeVisit: { eyebrow: "Visit us", title: "Come see us in person.", directions: "Get directions" },
    faq: {
      title: "Common questions",
      bodyPrefix: "Can’t find what you’re looking for? Call us at",
    },
    footerLine: "Fresh fish, experienced hands, personal service.",
  },
  fr: {
    localeName: "EN",
    navigation: { market: "La poissonnerie", menu: "Menu du chef", catering: "Service traiteur", story: "Notre histoire", contact: "Nous visiter", call: "Commander par téléphone", open: "Ouvrir le menu", close: "Fermer le menu" },
    hero: { title: ["Le marché de poissons frais", "de Montréal depuis 1975."], body: ["Sélectionné chaque jour à la main par nos poissonniers.", "La confiance des familles montréalaises et des grands chefs depuis plus de 50 ans."], primary: "Commander en ligne" },
    trust: ["Frais chaque jour", "Pleinement traçable", "Poissonniers d’expérience", "Livraison rapide", "Sélectionné avec soin"],
    counter: { title: "Magasiner par catégorie", body: "Notre sélection change à chaque arrivage.", order: "Commander en ligne", viewAll: "Tout voir" },
    chef: { eyebrow: "Rencontrez le chef Paul", title: "Quatre décennies d’expérience, servies fraîches chaque jour.", body: "Fort de plus de 40 ans dans les restaurants montréalais, le chef Paul apporte un savoir-faire de niveau restaurant à la poissonnerie de quartier.", specialties: ["Chaudrées", "Bisques", "Tartares", "Paella", "Guédilles au homard", "Fish and chips"] },
    dishes: { eyebrow: "Préparé par le chef", title: "Cuisiné ici. Prêt pour votre table.", body: "Chair de homard fraîche décortiquée sur place, mayonnaise assaisonnée maison et brioche provenant d’un fournisseur local." },
    catering: {
      eyebrow: "Traiteur et réceptions",
      title: "Confiez-nous votre prochain événement.",
      body: "Plateaux de fruits de mer sur mesure pour réunions de famille, célébrations et événements corporatifs, préparés par nos chefs et prêts au moment voulu.",
      primary: "Planifier mon événement",
      secondaryPrefix: "Ou appelez-nous au",
    },
    visit: { eyebrow: "Visitez la poissonnerie", title: "Votre poissonnier de quartier, sur Sherbrooke Ouest.", directions: "Itinéraire", call: "Appeler la poissonnerie", email: "Envoyer une demande" },
    homeVisit: { eyebrow: "Nous visiter", title: "Venez nous voir en personne.", directions: "Obtenir l’itinéraire" },
    faq: {
      title: "Questions fréquentes",
      bodyPrefix: "Vous ne trouvez pas votre réponse? Appelez-nous au",
    },
    footerLine: "Poissons frais, mains expertes, service attentionné.",
  },
};

export const faqItems = {
  en: [
    {
      id: "delivery",
      question: "Do you deliver, and how much does it cost?",
      // TODO: confirm exact delivery zones/pricing before launch.
      answer: "Yes, we deliver across Montreal. Delivery cost and minimum order depend on your address. Check at checkout for exact pricing.",
    },
    {
      id: "freshness",
      question: "How is my order kept fresh during delivery?",
      answer: "We pack your order in thermo bags that keep food cool from our counter to your door.",
    },
    {
      id: "pickup",
      question: "Can I place an order and pick it up in-store?",
      answer: "Yes, place your order ahead and pick it up at the market when it’s ready.",
    },
    {
      id: "catering",
      question: "Do you offer custom catering platters?",
      answerBefore: "Yes, for corporate events, celebrations, and family gatherings. ",
      quoteLabel: "Request a quote",
      answerAfter: " or call us to discuss your event.",
    },
    {
      id: "payment",
      question: "What payment methods do you accept?",
      answer: "For online orders, we accept all major credit cards. In store, we accept credit, debit, and cash.",
    },
  ],
  fr: [
    {
      id: "delivery",
      question: "Livrez-vous, et combien cela coûte-t-il?",
      // TODO: confirmer les zones et tarifs de livraison avant le lancement.
      answer: "Oui, nous livrons partout à Montréal. Le coût et le minimum dépendent de votre adresse. Vérifiez au moment de la commande.",
    },
    {
      id: "freshness",
      question: "Comment ma commande reste-t-elle fraîche pendant la livraison?",
      answer: "Nous emballons votre commande dans des sacs isothermes qui gardent les aliments au frais, du comptoir jusqu’à votre porte.",
    },
    {
      id: "pickup",
      question: "Puis-je commander et récupérer en magasin?",
      answer: "Oui, passez votre commande à l’avance et récupérez-la à la poissonnerie lorsqu’elle est prête.",
    },
    {
      id: "catering",
      question: "Offrez-vous des plateaux traiteur sur mesure?",
      answerBefore: "Oui, pour les événements corporatifs, les célébrations et les réunions de famille. ",
      quoteLabel: "Demandez un devis",
      answerAfter: " ou appelez-nous pour en discuter.",
    },
    {
      id: "payment",
      question: "Quels modes de paiement acceptez-vous?",
      answer: "Pour les commandes en ligne, nous acceptons toutes les cartes de crédit principales. En magasin, nous acceptons le crédit, le débit et l’argent comptant.",
    },
  ],
} as const;

export const photographyCredits = [
  "Poissonnerie Sherbrooke archive",
];
