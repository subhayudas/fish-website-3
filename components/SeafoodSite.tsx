"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { business, copy, Locale, marketCategories, menuGroups, PageKey, photographyCredits, routeMap } from "@/lib/content";

const pageHero = {
  market: { image: "/seafood/salmon-ice.jpg", en: ["The market", "Today’s sea, selected by hand."], fr: ["La poissonnerie", "La mer du jour, choisie à la main."] },
  menu: { image: "/seafood/lobster-roll.jpg", en: ["Chef’s menu", "Restaurant craft, ready for home."], fr: ["Menu du chef", "Le savoir-faire du restaurant, à emporter."] },
  catering: { image: "/seafood/platter.jpg", en: ["Catering", "A table built around the sea."], fr: ["Service traiteur", "Une table pensée autour de la mer."] },
  story: { image: "/seafood/fishmonger.jpg", en: ["Our story", "More than 50 years at the counter."], fr: ["Notre histoire", "Plus de 50 ans derrière le comptoir."] },
  contact: { image: "/seafood/oysters.jpg", en: ["Visit us", "The counter is open."], fr: ["Nous visiter", "Le comptoir vous attend."] },
  privacy: { image: "/seafood/caviar.jpg", en: ["Privacy", "Clear, considered, respectful."], fr: ["Confidentialité", "Clair, réfléchi, respectueux."] },
} as const;

const dishGallery = [
  { image: "/seafood/lobster-roll.jpg", en: "Lobster roll", fr: "Guédille au homard" },
  { image: "/seafood/oysters.jpg", en: "Fresh oysters", fr: "Huîtres fraîches" },
  { image: "/seafood/paella.jpg", en: "Seafood paella", fr: "Paella aux fruits de mer" },
  { image: "/seafood/platter.jpg", en: "Mixed platters", fr: "Plateaux assortis" },
];

function Arrow() { return <span className="cta-arrow" aria-hidden="true">↗</span>; }

function Brand() {
  return (
    <span className="ps-brand" aria-label="Poissonnerie Sherbrooke">
      <span className="ps-monogram">PS</span>
      <span className="ps-wordmark">Poissonnerie<br />Sherbrooke</span>
    </span>
  );
}

type Props = { locale: Locale; page: PageKey };

export default function SeafoodSite({ locale, page }: Props) {
  const t = copy[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en-CA" : "fr-CA";
  }, [locale]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("visible", entry.isIntersecting)),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [page, locale]);

  useEffect(() => {
    const hero = document.querySelector(".site-hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setHeaderSolid(!entry.isIntersecting), { threshold: 0.1 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [page]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const panel = menuPanel.current;
    const focusables = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusables?.[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab" && focusables?.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [menuOpen]);

  const nav = [
    ["market", t.navigation.market], ["menu", t.navigation.menu], ["catering", t.navigation.catering],
    ["story", t.navigation.story], ["contact", t.navigation.contact],
  ] as [PageKey, string][];
  const alternate: Locale = locale === "en" ? "fr" : "en";

  const structuredData = {
    "@context": "https://schema.org", "@type": "FishAndChipsRestaurant", name: business.name,
    address: { "@type": "PostalAddress", streetAddress: "5121 Sherbrooke Street West", addressLocality: "Montréal", addressRegion: "QC", postalCode: "H4A 1T2", addressCountry: "CA" },
    telephone: business.telephone, email: business.email,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "17:30" },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">{locale === "en" ? "Skip to content" : "Aller au contenu"}</a>
      <div className="grain" aria-hidden="true" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className={`nav-island ${headerSolid ? "nav-solid" : ""}`}>
        <Link className="brand-link" href={routeMap[locale].home}><Brand /></Link>
        <nav className="desktop-nav" aria-label={locale === "en" ? "Main navigation" : "Navigation principale"}>
          {nav.map(([key, label]) => <Link className={page === key ? "active" : ""} key={key} href={routeMap[locale][key]}>{label}</Link>)}
        </nav>
        <div className="nav-tools">
          <Link className="language-link" href={routeMap[alternate][page]} hrefLang={alternate}>{t.localeName}</Link>
          <a className="call-link" href={business.telephoneHref}>{t.navigation.call}<Arrow /></a>
          <button ref={menuButton} className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? t.navigation.close : t.navigation.open}><span /><span /></button>
        </div>
      </header>

      <div ref={menuPanel} className={`mobile-menu ${menuOpen ? "open" : ""}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <nav aria-label={locale === "en" ? "Mobile navigation" : "Navigation mobile"}>
          {nav.map(([key, label], index) => <Link style={{ "--menu-delay": `${index * 70 + 100}ms` } as React.CSSProperties} key={key} href={routeMap[locale][key]} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small><span>{label}</span><i>↘</i></Link>)}
        </nav>
        <div className="mobile-menu-footer">
          <p>{locale === "en" ? business.address : business.addressFr}</p>
          <a href={business.telephoneHref}>{business.telephone}</a>
          <Link href={routeMap[alternate][page]}>{t.localeName}</Link>
        </div>
      </div>

      <main id="main-content">
        {page === "home" ? <Home locale={locale} /> : <InnerPage locale={locale} page={page} />}
      </main>
      <Footer locale={locale} />
    </>
  );
}

function Home({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const categories = marketCategories[locale];
  const [activeCategory, setActiveCategory] = useState(0);
  const gallery = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: number) => gallery.current?.scrollBy({ left: direction * 520, behavior: "smooth" });

  return (
    <>
      <section className="site-hero home-hero">
        <img className="hero-background" src="/seafood/market-ice.jpg" alt={locale === "en" ? "Fresh seafood displayed over crushed ice at a fish market" : "Fruits de mer frais présentés sur glace concassée à la poissonnerie"} width="2400" height="1600" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="ice-light" aria-hidden="true" />
        <div className="hero-content">
          <span className="eyebrow hero-eyebrow">{t.hero.eyebrow}</span>
          <h1><span><i>{t.hero.title[0]}</i></span><span><i>{t.hero.title[1]}</i></span></h1>
          <p>{t.hero.body}</p>
          <div className="hero-actions">
            <Link className="primary-cta" href={routeMap[locale].market}>{t.hero.primary}<Arrow /></Link>
            <Link className="secondary-cta" href={routeMap[locale].menu}>{t.hero.secondary}<span>→</span></Link>
          </div>
        </div>
        <div className="hero-trust liquid-panel">
          {t.trust.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
        </div>
        <a className="scroll-marker" href="#announcement"><span />{locale === "en" ? "Discover" : "Découvrir"}</a>
      </section>

      <section className="announcement" id="announcement">
        <span>{t.announcement}</span><p>{t.announcementBody}</p><a href={business.telephoneHref}>{business.telephone} <i>↗</i></a>
      </section>

      <section className="counter section-light">
        <div className="section-intro reveal">
          <span className="section-number">01</span>
          <div><span className="eyebrow dark">{t.counter.eyebrow}</span><h2>{t.counter.title}</h2></div>
          <p>{t.counter.body}</p>
        </div>
        <div className="counter-layout reveal">
          <div className="counter-image-plane">
            <img key={categories[activeCategory].image} src={categories[activeCategory].image} alt={categories[activeCategory].name} width="2000" height="1333" />
            <span className="vertical-caption">{locale === "en" ? "Selection varies with daily deliveries" : "La sélection varie selon les arrivages"}</span>
            <div className="image-caption liquid-panel"><small>0{activeCategory + 1} / 08</small><strong>{categories[activeCategory].name}</strong><p>{categories[activeCategory].note}</p></div>
          </div>
          <div className="category-index" role="tablist" aria-label={t.counter.eyebrow}>
            {categories.map((category, index) => <button role="tab" aria-selected={activeCategory === index} className={activeCategory === index ? "active" : ""} onMouseEnter={() => setActiveCategory(index)} onFocus={() => setActiveCategory(index)} onClick={() => setActiveCategory(index)} key={category.name}><span>0{index + 1}</span>{category.name}<i>↗</i></button>)}
            <p>{locale === "en" ? "Our selection changes with daily deliveries. Call us for today’s availability." : "Notre sélection change selon les arrivages. Appelez-nous pour connaître les disponibilités du jour."}</p>
          </div>
        </div>
      </section>

      <section className="promise-section">
        <img src="/seafood/oysters.jpg" alt="" aria-hidden="true" width="1800" height="2700" loading="lazy" />
        <div className="promise-shade" />
        <div className="promise-lines reveal">{t.promise.map((line, index) => <p style={{ "--line-delay": `${index * 100}ms` } as React.CSSProperties} key={line}>{line}</p>)}</div>
      </section>

      <section className="traceability section-dark">
        <div className="trace-heading reveal"><span className="eyebrow">{t.trace.eyebrow}</span><h2>{t.trace.title}</h2><p>{t.trace.body}</p></div>
        <div className="trace-stage reveal">
          <img src="/seafood/salmon-ice.jpg" alt={locale === "en" ? "Fresh salmon and fish fillets at a market counter" : "Saumon et filets de poisson frais au comptoir"} width="2000" height="1333" loading="lazy" />
          {t.trace.labels.map((label, index) => <div className={`trace-label trace-${index + 1}`} key={label}><i /><span>{label}</span></div>)}
        </div>
      </section>

      <section className="chef-section section-cream">
        <div className="chef-image reveal"><img src="/seafood/fishmonger.jpg" alt={locale === "en" ? "An experienced fishmonger working behind a seafood counter" : "Un poissonnier d’expérience derrière un comptoir de fruits de mer"} width="1800" height="2700" loading="lazy" /><span>40+</span></div>
        <div className="chef-copy reveal">
          <span className="eyebrow dark">{t.chef.eyebrow}</span><h2>{t.chef.title}</h2><p>{t.chef.body}</p>
          <div className="chef-actions"><Link className="primary-cta dark-cta" href={routeMap[locale].menu}>{locale === "en" ? "Discover the menu" : "Découvrir le menu"}<Arrow /></Link><a href={business.telephoneHref}>{locale === "en" ? "Call to order" : "Commander par téléphone"} <span>→</span></a></div>
        </div>
        <div className="specialty-list reveal">{t.chef.specialties.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div>
      </section>

      <section className="dishes section-light">
        <div className="dishes-heading reveal"><div><span className="eyebrow dark">{t.dishes.eyebrow}</span><h2>{t.dishes.title}</h2></div><p>{t.dishes.body}</p><div className="gallery-controls"><button onClick={() => scrollGallery(-1)} aria-label={locale === "en" ? "Previous dishes" : "Plats précédents"}>←</button><button onClick={() => scrollGallery(1)} aria-label={locale === "en" ? "Next dishes" : "Plats suivants"}>→</button></div></div>
        <div className="dish-gallery reveal" ref={gallery} tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowRight") scrollGallery(1); if (event.key === "ArrowLeft") scrollGallery(-1); }}>
          {dishGallery.map((dish, index) => <article className="dish-slide" key={dish.en}><img src={dish.image} alt={locale === "en" ? dish.en : dish.fr} width="1800" height="1200" loading="lazy" /><div><small>0{index + 1}</small><h3>{locale === "en" ? dish.en : dish.fr}</h3></div></article>)}
        </div>
      </section>

      <section className="catering-feature">
        <img src="/seafood/platter.jpg" alt={locale === "en" ? "A generous seafood platter prepared for sharing" : "Un généreux plateau de fruits de mer à partager"} width="2000" height="1334" loading="lazy" />
        <div className="catering-panel liquid-panel reveal"><span className="eyebrow">{t.catering.eyebrow}</span><h2>{t.catering.title}</h2><p>{t.catering.body}</p><div className="event-labels">{t.catering.labels.map((label) => <span key={label}>{label}</span>)}</div><div className="catering-actions"><Link className="primary-cta coral-cta" href={routeMap[locale].catering}>{t.catering.primary}<Arrow /></Link><a href={business.telephoneHref}>{t.catering.secondary} <span>→</span></a></div></div>
      </section>

      <Visit locale={locale} />
    </>
  );
}

function InnerPage({ locale, page }: Props) {
  const hero = pageHero[page as Exclude<PageKey, "home">];
  const heroCopy = hero[locale];
  return (
    <>
      <section className={`site-hero inner-hero hero-${page}`}>
        <img className="hero-background" src={hero.image} alt="" aria-hidden="true" width="2000" height="1333" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="inner-hero-content"><span className="eyebrow">Poissonnerie Sherbrooke · Montréal</span><h1><small>{heroCopy[0]}</small>{heroCopy[1]}</h1><p>{pageIntro(locale, page)}</p></div>
      </section>
      {page === "market" && <MarketPage locale={locale} />}
      {page === "menu" && <MenuPage locale={locale} />}
      {page === "catering" && <CateringPage locale={locale} />}
      {page === "story" && <StoryPage locale={locale} />}
      {page === "contact" && <ContactPage locale={locale} />}
      {page === "privacy" && <PrivacyPage locale={locale} />}
    </>
  );
}

function pageIntro(locale: Locale, page: PageKey) {
  const texts = {
    en: { market: "Fresh arrivals, traceable origins and experienced guidance at the counter.", menu: "Soups, chowders, tartares, paella and signature seafood preparations by Chef Paul.", catering: "Customized seafood menus for corporate lunches, cocktails and family gatherings.", story: "A Montréal fish market built on daily freshness, supplier relationships and personal service.", contact: "Find today’s hours, directions, delivery notes and the best way to reach our team.", privacy: "How we handle information submitted through this website." },
    fr: { market: "Arrivages frais, provenances traçables et conseils d’expérience au comptoir.", menu: "Soupes, chaudrées, tartares, paella et créations de fruits de mer du chef Paul.", catering: "Menus de fruits de mer sur mesure pour affaires, cocktails et réunions de famille.", story: "Une poissonnerie montréalaise fondée sur la fraîcheur quotidienne, les fournisseurs et le service personnel.", contact: "Heures du jour, itinéraire, livraison et meilleures façons de joindre notre équipe.", privacy: "Notre façon de traiter les renseignements transmis par ce site." },
  };
  return texts[locale][page as Exclude<PageKey, "home">];
}

function MarketPage({ locale }: { locale: Locale }) {
  const items = marketCategories[locale];
  return (
    <section className="editorial-page section-light">
      <div className="page-lead reveal"><span>01 / {locale === "en" ? "Daily selection" : "Sélection quotidienne"}</span><h2>{locale === "en" ? "The counter changes. The standard doesn’t." : "Le comptoir change. Le standard demeure."}</h2><p>{locale === "en" ? "Fresh fish and seafood arrive daily from local and international sources. Availability changes—call the market for today’s selection." : "Poissons frais et fruits de mer arrivent chaque jour de sources locales et internationales. Les disponibilités changent—appelez-nous pour la sélection du jour."}</p></div>
      <div className="market-catalogue">
        {items.map((item, index) => <article className={`catalogue-item reveal item-${index + 1}`} key={item.name}><img src={item.image} alt={item.name} width="1800" height="1200" loading="lazy" /><div><small>0{index + 1}</small><h3>{item.name}</h3><p>{item.note}</p><a href={business.telephoneHref}>{locale === "en" ? "Call for today’s selection" : "Demander la sélection du jour"} <span>↗</span></a></div></article>)}
      </div>
      <FineFoods locale={locale} />
    </section>
  );
}

function FineFoods({ locale }: { locale: Locale }) {
  const foods = locale === "en" ? ["Caviar", "Olive oils & vinegars", "Smoked salmon", "Spices", "Pasta & noodles", "Seacuterie", "Fresh produce", "Dairy essentials", "Gift certificates"] : ["Caviar", "Huiles et vinaigres", "Saumon fumé", "Épices", "Pâtes et nouilles", "Charcuteries de la mer", "Produits frais", "Produits laitiers", "Certificats-cadeaux"];
  return <div className="fine-foods reveal"><div><span className="eyebrow dark">{locale === "en" ? "Beyond the counter" : "Au-delà du comptoir"}</span><h2>{locale === "en" ? "A considered pantry." : "Un garde-manger choisi."}</h2></div><ol>{foods.map((food, index) => <li key={food}><span>0{index + 1}</span>{food}</li>)}</ol></div>;
}

function MenuPage({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const groups = menuGroups[locale];
  const filtered = useMemo(() => groups.map((group) => ({ ...group, items: group.items.filter((item) => item.toLowerCase().includes(query.toLowerCase())) })).filter((group) => group.items.length), [groups, query]);
  return (
    <section className="editorial-page section-cream">
      <div className="menu-intro reveal"><div><span className="eyebrow dark">{locale === "en" ? "Prepared in house" : "Préparé sur place"}</span><h2>{locale === "en" ? "Chef Paul’s kitchen." : "La cuisine du chef Paul."}</h2><p>{locale === "en" ? "More than 40 years of Montréal restaurant experience, now prepared fresh at the market. Availability changes daily; no fixed prices are shown online." : "Plus de 40 ans d’expérience dans les restaurants montréalais, maintenant au service de la poissonnerie. Les plats varient chaque jour; aucun prix fixe n’est affiché en ligne."}</p></div><div className="menu-search liquid-light"><label htmlFor="menu-search">{locale === "en" ? "Search the menu" : "Rechercher au menu"}</label><input id="menu-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={locale === "en" ? "Try “oysters”" : "Essayez « huîtres »"} /></div></div>
      <div className="menu-groups reveal">
        {filtered.length ? filtered.map((group, index) => <section key={group.title}><header><span>0{index + 1}</span><h3>{group.title}</h3></header><ul>{group.items.map((item) => <li key={item}>{item}<span>{locale === "en" ? "Ask about today" : "Selon les arrivages"}</span></li>)}</ul></section>) : <p className="no-results">{locale === "en" ? "No menu items match that search." : "Aucun plat ne correspond à cette recherche."}</p>}
      </div>
      <div className="lobster-feature reveal"><img src="/seafood/lobster-roll.jpg" alt={locale === "en" ? "Lobster roll served on a brioche bun" : "Guédille au homard servie sur brioche"} width="1800" height="1200" loading="lazy" /><div className="liquid-panel"><span className="eyebrow">{locale === "en" ? "The signature" : "La signature"}</span><h2>{locale === "en" ? "The lobster roll." : "La guédille au homard."}</h2><p>{copy[locale].dishes.body}</p><a className="primary-cta coral-cta" href={business.telephoneHref}>{locale === "en" ? "Call to order" : "Commander par téléphone"}<Arrow /></a></div></div>
    </section>
  );
}

function CateringPage({ locale }: { locale: Locale }) {
  const t = copy[locale].catering;
  return (
    <section className="editorial-page section-light">
      <div className="catering-overview reveal"><span className="section-number">01</span><div><span className="eyebrow dark">{t.eyebrow}</span><h2>{t.title}</h2></div><p>{t.body}</p></div>
      <div className="catering-types reveal">{(locale === "en" ? [["Corporate lunches", "Fresh, composed menus that travel well."], ["Cocktail receptions", "Oysters, tartares and seafood bites."], ["Family gatherings", "Hot or cold platters sized for the table."]] : [["Dîners corporatifs", "Des menus frais et soignés qui voyagent bien."], ["Cocktails", "Huîtres, tartares et bouchées de la mer."], ["Réunions de famille", "Plateaux chauds ou froids pour toute la table."]]).map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      <InquiryForm locale={locale} type="catering" />
    </section>
  );
}

function StoryPage({ locale }: { locale: Locale }) {
  const rows = locale === "en" ? [["More than 50 years", "A longstanding neighbourhood market serving generations of Montréal customers."], ["Daily freshness", "Fish and seafood received daily, selected for condition and prepared with care."], ["Traceable origins", "Local and international products with origin information available at the counter."], ["Experienced hands", "Fishmongers who cut, clean, recommend and answer the practical questions."], ["Chef-led preparation", "Chef Paul brings over 40 years of Montréal restaurant experience to the market."]] : [["Plus de 50 ans", "Une poissonnerie de quartier qui sert plusieurs générations de Montréalais."], ["Fraîcheur quotidienne", "Poissons et fruits de mer reçus chaque jour, choisis et préparés avec soin."], ["Provenance traçable", "Produits locaux et internationaux dont la provenance est disponible au comptoir."], ["Des mains d’expérience", "Des poissonniers qui coupent, nettoient, conseillent et répondent aux questions pratiques."], ["Une cuisine dirigée par le chef", "Le chef Paul apporte plus de 40 ans d’expérience dans les restaurants montréalais."]];
  return <section className="editorial-page story-page section-cream"><div className="story-statement reveal"><span>01 / {locale === "en" ? "The institution" : "L’institution"}</span><h2>{locale === "en" ? "Established by time. Kept current by the day’s catch." : "Établie par le temps. Renouvelée par les arrivages du jour."}</h2></div><div className="story-rows">{rows.map(([title, body], index) => <article className="reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p><i>—</i></article>)}</div><div className="story-image reveal"><img src="/seafood/fishmonger.jpg" alt={locale === "en" ? "Fishmonger working at a busy seafood counter" : "Poissonnier au travail derrière un comptoir animé"} width="1800" height="2700" loading="lazy" /><div className="liquid-panel">{locale === "en" ? "Personal service is still the point." : "Le service personnel reste essentiel."}</div></div></section>;
}

function ContactPage({ locale }: { locale: Locale }) {
  return <section className="editorial-page section-light"><Visit locale={locale} compact /><InquiryForm locale={locale} type="general" /></section>;
}

function PrivacyPage({ locale }: { locale: Locale }) {
  const en = locale === "en";
  return <section className="editorial-page privacy-page section-cream"><div className="page-lead reveal"><span>01 / {en ? "Privacy" : "Confidentialité"}</span><h2>{en ? "Information used only to answer your request." : "Des renseignements utilisés uniquement pour répondre à votre demande."}</h2><p>{en ? "This draft policy explains the website’s intended handling of inquiry information. It should be reviewed before public launch." : "Cette politique provisoire explique le traitement prévu des renseignements transmis. Elle doit être révisée avant le lancement public."}</p></div><div className="privacy-sections reveal">{(en ? [["What we collect", "Contact details and the information you choose to include in a general or catering inquiry."], ["Why we collect it", "To answer questions, discuss orders and prepare event proposals."], ["How long we keep it", "Only as long as reasonably necessary to respond and maintain business records."], ["Your choices", `Contact ${business.email} to ask about your submitted information.`]] : [["Ce que nous recueillons", "Vos coordonnées et les renseignements que vous choisissez d’inclure dans une demande générale ou de service traiteur."], ["Pourquoi", "Pour répondre aux questions, discuter des commandes et préparer des propositions d’événement."], ["Durée de conservation", "Seulement le temps raisonnablement nécessaire pour répondre et tenir les dossiers d’affaires."], ["Vos choix", `Écrivez à ${business.email} pour toute question sur vos renseignements.`]]).map(([title, body]) => <section key={title}><h3>{title}</h3><p>{body}</p></section>)}</div></section>;
}

function Visit({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = copy[locale].visit;
  return (
    <section className={`visit-section ${compact ? "compact" : ""}`}>
      <div className="map-plane reveal"><div className="map-grid" aria-hidden="true" /><span className="map-water">SAINT-LAURENT</span><i className="map-pin">PS</i><a href={business.maps} target="_blank" rel="noreferrer">{t.directions} <Arrow /></a></div>
      <div className="visit-panel reveal"><span className="eyebrow dark">{t.eyebrow}</span><h2>{t.title}</h2><address>{locale === "en" ? business.address : business.addressFr}</address><a href={business.telephoneHref}>{business.telephone}</a><a href={`mailto:${business.email}`}>{business.email}</a><div className="hours">{business.hours[locale].map((row) => <p key={row}>{row}</p>)}</div><div className="visit-actions"><a className="primary-cta dark-cta" href={business.maps} target="_blank" rel="noreferrer">{t.directions}<Arrow /></a><a href={business.telephoneHref}>{t.call} <span>→</span></a></div></div>
    </section>
  );
}

function InquiryForm({ locale, type }: { locale: Locale; type: "general" | "catering" }) {
  const en = locale === "en";
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/inquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...body, type, locale }) });
      const data = await response.json() as { message?: string };
      if (!response.ok) throw new Error(data.message || "Request failed");
      setStatus("success");
      setMessage(en ? "Your request was sent. Our team will reply directly." : "Votre demande a été envoyée. Notre équipe vous répondra directement.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(en ? `Online sending is not connected yet. Please call ${business.telephone} or email ${business.email}.` : `L’envoi en ligne n’est pas encore connecté. Appelez au ${business.telephone} ou écrivez à ${business.email}.`);
    }
  }

  return (
    <section className="inquiry-section reveal">
      <div className="inquiry-heading"><span className="eyebrow">{type === "catering" ? (en ? "Plan an event" : "Planifier un événement") : (en ? "Send a request" : "Envoyer une demande")}</span><h2>{type === "catering" ? (en ? "Tell us about the table." : "Parlez-nous de votre table.") : (en ? "How can we help?" : "Comment pouvons-nous vous aider?")}</h2><p>{en ? "For same-day availability or an immediate order, calling the market is best." : "Pour les disponibilités du jour ou une commande immédiate, il vaut mieux nous appeler."}</p></div>
      <form onSubmit={submit} className="inquiry-form" aria-describedby="form-status">
        <div className="form-field"><label htmlFor={`${type}-name`}>{en ? "Full name" : "Nom complet"}</label><input id={`${type}-name`} name="name" required autoComplete="name" /></div>
        <div className="form-field"><label htmlFor={`${type}-email`}>{en ? "Email" : "Courriel"}</label><input id={`${type}-email`} name="email" type="email" required autoComplete="email" /></div>
        <div className="form-field"><label htmlFor={`${type}-phone`}>{en ? "Telephone" : "Téléphone"}</label><input id={`${type}-phone`} name="phone" type="tel" autoComplete="tel" /></div>
        {type === "catering" && <><div className="form-field"><label htmlFor="event-date">{en ? "Event date" : "Date de l’événement"}</label><input id="event-date" name="eventDate" type="date" required /></div><div className="form-field"><label htmlFor="guest-count">{en ? "Guest count" : "Nombre d’invités"}</label><input id="guest-count" name="guestCount" type="number" min="1" inputMode="numeric" required /></div><div className="form-field"><label htmlFor="event-type">{en ? "Event type" : "Type d’événement"}</label><select id="event-type" name="eventType" required defaultValue=""><option value="" disabled>{en ? "Select one" : "Choisir"}</option><option>{en ? "Corporate" : "Corporatif"}</option><option>{en ? "Celebration" : "Célébration"}</option><option>{en ? "Family gathering" : "Réunion de famille"}</option></select></div></>}
        <div className="form-field full"><label htmlFor={`${type}-message`}>{type === "catering" ? (en ? "Menu interests, dietary needs and delivery location" : "Menu souhaité, restrictions et lieu de livraison") : (en ? "Message" : "Message")}</label><textarea id={`${type}-message`} name="message" rows={5} required /></div>
        <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label className="consent full"><input name="consent" type="checkbox" required /><span>{en ? "I consent to being contacted about this request." : "J’accepte d’être contacté au sujet de cette demande."}</span></label>
        <div className="form-submit full"><button className="primary-cta coral-cta" type="submit" disabled={status === "sending"}>{status === "sending" ? (en ? "Sending…" : "Envoi…") : (en ? "Send request" : "Envoyer la demande")}<Arrow /></button><p id="form-status" className={`form-status ${status}`} aria-live="polite">{message}</p></div>
      </form>
    </section>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <footer className="site-footer">
      <div className="footer-top"><Link href={routeMap[locale].home}><Brand /></Link><h2>{t.footerLine}</h2><a className="primary-cta coral-cta" href={business.telephoneHref}>{t.navigation.call}<Arrow /></a></div>
      <div className="footer-grid">
        <div><small>{locale === "en" ? "Visit" : "Visiter"}</small><p>{locale === "en" ? business.address : business.addressFr}</p><a href={business.maps} target="_blank" rel="noreferrer">{t.visit.directions} ↗</a></div>
        <div><small>{locale === "en" ? "Contact" : "Coordonnées"}</small><a href={business.telephoneHref}>{business.telephone}</a><a href={`mailto:${business.email}`}>{business.email}</a></div>
        <div><small>{locale === "en" ? "Hours" : "Heures"}</small>{business.hours[locale].map((row) => <p key={row}>{row}</p>)}</div>
        <div><small>{locale === "en" ? "Navigate" : "Navigation"}</small><Link href={routeMap[locale].market}>{t.navigation.market}</Link><Link href={routeMap[locale].menu}>{t.navigation.menu}</Link><Link href={routeMap[locale].catering}>{t.navigation.catering}</Link><Link href={routeMap[locale].privacy}>{locale === "en" ? "Privacy" : "Confidentialité"}</Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Poissonnerie Sherbrooke</span><span>{locale === "en" ? "Photography:" : "Photographie :"} {photographyCredits.join(", ")}</span><Link href={routeMap[locale === "en" ? "fr" : "en"].home}>{t.localeName}</Link></div>
    </footer>
  );
}
