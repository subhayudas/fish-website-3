export type Locale = "en" | "fr";
export type PageKey = "home" | "market" | "menu" | "catering" | "story" | "contact" | "privacy";

export const business = {
  name: "Poissonnerie Sherbrooke",
  address: "5121 Sherbrooke Street West, Montréal, Québec H4A 1T2",
  addressFr: "5121, rue Sherbrooke Ouest, Montréal, Québec H4A 1T2",
  telephone: "(514) 486-5246",
  telephoneHref: "tel:+15144865246",
  email: "info@lapoissonneriesherbrooke.com",
  maps: "https://maps.google.com/?q=5121+Sherbrooke+Street+West+Montreal+QC+H4A+1T2",
  hours: {
    en: ["Monday–Friday · 8:00 AM–6:30 PM", "Saturday · 9:00 AM–6:00 PM", "Sunday · 10:00 AM–5:30 PM"],
    fr: ["Lundi–vendredi · 8 h–18 h 30", "Samedi · 9 h–18 h", "Dimanche · 10 h–17 h 30"],
  },
};

export const routeMap: Record<Locale, Record<PageKey, string>> = {
  en: { home: "/en", market: "/en/market", menu: "/en/menu", catering: "/en/catering", story: "/en/our-story", contact: "/en/contact", privacy: "/en/privacy" },
  fr: { home: "/fr", market: "/fr/poissonnerie", menu: "/fr/menu", catering: "/fr/traiteur", story: "/fr/notre-histoire", contact: "/fr/contact", privacy: "/fr/confidentialite" },
};

export const marketCategories = {
  en: [
    { name: "Fresh fish", note: "A daily selection chosen for texture, colour and condition.", image: "/seafood/market-ice.jpg" },
    { name: "Salmon & tuna", note: "Atlantic salmon and yellowfin tuna, including sushi-grade cuts when available.", image: "/seafood/salmon-ice.jpg" },
    { name: "Lobster", note: "Live and cooked lobster, prepared to order when available.", image: "/seafood/platter.jpg" },
    { name: "Oysters", note: "Whole and freshly shucked oysters for the counter or your table.", image: "/seafood/oysters.jpg" },
    { name: "Shellfish", note: "Scallops, tiger shrimp and a changing shellfish selection.", image: "/seafood/platter.jpg" },
    { name: "Chef-prepared", note: "Soups, bisques, tartares, paella and signature dishes by Chef Paul.", image: "/seafood/paella.jpg" },
    { name: "Fine foods", note: "Caviar, smoked salmon, oils, vinegars, spices and seacuterie.", image: "/seafood/caviar.jpg" },
    { name: "Produce & essentials", note: "Fresh produce, pasta, noodles and selected dairy essentials.", image: "/seafood/fishmonger.jpg" },
  ],
  fr: [
    { name: "Poissons frais", note: "Une sélection quotidienne choisie pour sa texture, sa couleur et sa fraîcheur.", image: "/seafood/market-ice.jpg" },
    { name: "Saumon et thon", note: "Saumon de l’Atlantique et thon à nageoires jaunes, qualité sushi selon les arrivages.", image: "/seafood/salmon-ice.jpg" },
    { name: "Homard", note: "Homard vivant ou cuit, préparé sur demande selon la disponibilité.", image: "/seafood/platter.jpg" },
    { name: "Huîtres", note: "Huîtres entières ou fraîchement ouvertes, pour le comptoir ou votre table.", image: "/seafood/oysters.jpg" },
    { name: "Fruits de mer", note: "Pétoncles, crevettes tigrées et sélection variable de coquillages.", image: "/seafood/platter.jpg" },
    { name: "Prêt-à-manger", note: "Soupes, bisques, tartares, paella et plats signatures du chef Paul.", image: "/seafood/paella.jpg" },
    { name: "Épicerie fine", note: "Caviar, saumon fumé, huiles, vinaigres, épices et charcuteries de la mer.", image: "/seafood/caviar.jpg" },
    { name: "Produits et essentiels", note: "Produits frais, pâtes, nouilles et produits laitiers sélectionnés.", image: "/seafood/fishmonger.jpg" },
  ],
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

export const copy = {
  en: {
    localeName: "FR",
    navigation: { market: "The Market", menu: "Chef’s Menu", catering: "Catering", story: "Our Story", contact: "Visit Us", call: "Call to order", open: "Open menu", close: "Close menu" },
    hero: { eyebrow: "Montréal’s seafood destination", title: ["Fresh from the sea.", "Prepared with experience."], body: "For more than 50 years, Poissonnerie Sherbrooke has brought exceptional fish, seafood and chef-prepared specialties to Montréal.", primary: "Explore the market", secondary: "View Chef Paul’s menu" },
    trust: ["Fresh deliveries daily", "Traceable products", "Expert fishmongers", "Montréal delivery"],
    announcement: "Today at the counter", announcementBody: "Our selection changes with every delivery. Call us for today’s fish, shellfish and chef-prepared specials.",
    counter: { eyebrow: "At the counter today", title: "A daily edit of the sea.", body: "Local and international arrivals, chosen with an experienced eye and prepared around the way you cook." },
    promise: ["Selected daily.", "Prepared precisely.", "Served personally."],
    trace: { eyebrow: "The Sherbrooke standard", title: "Quality you can see. Freshness you can trace.", body: "We select with care, identify origin and guide every customer toward the right fish, cut and preparation.", labels: ["Received daily", "Carefully selected", "Traceable to origin", "Recommended by experts"] },
    chef: { eyebrow: "Meet Chef Paul", title: "Four decades of experience, served fresh every day.", body: "With more than 40 years of experience in Montréal restaurants, Chef Paul brings restaurant-level craft to the neighbourhood fish market.", specialties: ["Chowders", "Bisques", "Tartares", "Paella", "Lobster rolls", "Fish and chips"] },
    dishes: { eyebrow: "Chef-prepared", title: "Made here. Ready for your table.", body: "Fresh lobster meat shelled in-house, blended with house-seasoned mayonnaise, and served on a locally sourced brioche bun." },
    catering: { eyebrow: "Catering & gatherings", title: "Make the table unforgettable.", body: "From corporate lunches and cocktail receptions to family gatherings, we prepare customized proposals with oysters, tartares, paella and hot or cold seafood platters.", labels: ["Corporate", "Celebrations", "Gatherings"], primary: "Plan an event", secondary: "Call for a custom proposal" },
    visit: { eyebrow: "Visit the market", title: "Your neighbourhood fishmonger, on Sherbrooke West.", directions: "Get directions", call: "Call the store", email: "Send a request" },
    footerLine: "Fresh fish, experienced hands, personal service.",
  },
  fr: {
    localeName: "EN",
    navigation: { market: "La poissonnerie", menu: "Menu du chef", catering: "Service traiteur", story: "Notre histoire", contact: "Nous visiter", call: "Commander par téléphone", open: "Ouvrir le menu", close: "Fermer le menu" },
    hero: { eyebrow: "La destination fruits de mer à Montréal", title: ["La mer, au plus frais.", "Préparée avec expérience."], body: "Depuis plus de 50 ans, la Poissonnerie Sherbrooke propose aux Montréalais poissons frais, fruits de mer et spécialités préparées par le chef.", primary: "Découvrir la poissonnerie", secondary: "Voir le menu du chef Paul" },
    trust: ["Arrivages frais chaque jour", "Produits traçables", "Poissonniers d’expérience", "Livraison à Montréal"],
    announcement: "Aujourd’hui au comptoir", announcementBody: "Notre sélection évolue au fil des arrivages. Appelez-nous pour connaître les poissons, fruits de mer et plats du chef offerts aujourd’hui.",
    counter: { eyebrow: "Au comptoir aujourd’hui", title: "La mer, sélectionnée chaque jour.", body: "Des arrivages locaux et internationaux choisis avec soin, puis préparés selon votre façon de cuisiner." },
    promise: ["Choisi chaque jour.", "Préparé avec précision.", "Servi personnellement."],
    trace: { eyebrow: "Le standard Sherbrooke", title: "Une qualité visible. Une fraîcheur traçable.", body: "Nous sélectionnons avec soin, indiquons la provenance et vous guidons vers le bon poisson, la bonne coupe et la bonne préparation.", labels: ["Reçu chaque jour", "Sélectionné avec soin", "Provenance traçable", "Recommandé par nos experts"] },
    chef: { eyebrow: "Rencontrez le chef Paul", title: "Quatre décennies d’expérience, servies fraîches chaque jour.", body: "Fort de plus de 40 ans dans les restaurants montréalais, le chef Paul apporte un savoir-faire de niveau restaurant à la poissonnerie de quartier.", specialties: ["Chaudrées", "Bisques", "Tartares", "Paella", "Guédilles au homard", "Fish and chips"] },
    dishes: { eyebrow: "Préparé par le chef", title: "Cuisiné ici. Prêt pour votre table.", body: "Chair de homard fraîche décortiquée sur place, mayonnaise assaisonnée maison et brioche provenant d’un fournisseur local." },
    catering: { eyebrow: "Traiteur et réceptions", title: "Une table dont on se souvient.", body: "D’un dîner d’affaires à un cocktail ou une réunion de famille, nous préparons une proposition sur mesure avec huîtres, tartares, paella et plateaux de fruits de mer chauds ou froids.", labels: ["Corporatif", "Célébrations", "Réunions"], primary: "Planifier un événement", secondary: "Demander une proposition" },
    visit: { eyebrow: "Visitez la poissonnerie", title: "Votre poissonnier de quartier, sur Sherbrooke Ouest.", directions: "Itinéraire", call: "Appeler la poissonnerie", email: "Envoyer une demande" },
    footerLine: "Poissons frais, mains expertes, service attentionné.",
  },
};

export const photographyCredits = [
  "Georg Eiermann", "Jason Leung", "Jesse", "MChe Lee", "Annie Hatuanh", "Kevin Torres", "Vitalii Kyktov", "Madeline Liu",
];
