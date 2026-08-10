"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { business, categoryPlaceholderProducts, copy, faqItems, isMarketCategorySlug, Locale, marketCategories, marketCategoryPath, MarketCategorySlug, menuGroups, PageKey, photographyCredits, routeMap, shopCategoryImages, shopCategorySlugs, trustSection } from "@/lib/content";
import { readStoredLocale, restoreStashedScrollPosition, stashScrollPosition, writeStoredLocale } from "@/lib/locale";

const pageHero = {
  market: { image: "/sherbrooke/salmon.webp", en: ["The market", "Today’s sea, selected by hand."], fr: ["La poissonnerie", "La mer du jour, choisie à la main."] },
  menu: { image: "/sherbrooke/lobster-roll.webp", en: ["Chef’s menu", "Restaurant craft, ready for home."], fr: ["Menu du chef", "Le savoir-faire du restaurant, à emporter."] },
  catering: { image: "/sherbrooke/shellfish-platter.webp", en: ["Catering", "A table built around the sea."], fr: ["Service traiteur", "Une table pensée autour de la mer."] },
  quote: { image: "/sherbrooke/shellfish-platter.webp", en: ["Request a quote", "Tell us about your event."], fr: ["Demander un devis", "Parlez-nous de votre événement."] },
  story: { image: "/sherbrooke/chef-paul.webp", en: ["Our story", "More than 50 years at the counter."], fr: ["Notre histoire", "Plus de 50 ans derrière le comptoir."] },
  contact: { image: "/sherbrooke/oysters.webp", en: ["Visit us", "The counter is open."], fr: ["Nous visiter", "Le comptoir vous attend."] },
  privacy: { image: "/sherbrooke/atlantic-water.webp", en: ["Privacy", "Clear, considered, respectful."], fr: ["Confidentialité", "Clair, réfléchi, respectueux."] },
} as const;

const archiveGallery = [
  { image: "/sherbrooke/archive-feature.webp", en: "A Montréal seafood story", fr: "Une histoire montréalaise de fruits de mer" },
  { image: "/sherbrooke/archive-anniversary.webp", en: "A half-century at the counter", fr: "Un demi-siècle derrière le comptoir" },
  { image: "/sherbrooke/archive-newspaper-ad.webp", en: "Market selections through the years", fr: "Les sélections de la poissonnerie au fil des ans" },
  { image: "/sherbrooke/archive-best-montreal.webp", en: "Best of Montréal archive", fr: "Archive Best of Montréal" },
  { image: "/sherbrooke/archive-greek-products.webp", en: "Fine-food discoveries", fr: "Découvertes d’épicerie fine" },
  { image: "/sherbrooke/archive-seasonal.webp", en: "Seafood season at Sherbrooke", fr: "La saison des fruits de mer chez Sherbrooke" },
  { image: "/sherbrooke/archive-holiday.webp", en: "Chef Paul’s holiday table", fr: "La table des Fêtes du chef Paul" },
  { image: "/sherbrooke/archive-lobsters.webp", en: "Lobster arrivals", fr: "Arrivages de homard" },
  { image: "/sherbrooke/archive-hiring.webp", en: "Team archive", fr: "Archives de l’équipe" },
];

function Arrow() { return <span className="cta-arrow" aria-hidden="true">↗</span>; }

function IconMapPin() {
  return (
    <svg className="visit-us-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg className="visit-us-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg className="visit-us-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
    </svg>
  );
}

function VisitUsSection({ locale }: { locale: Locale }) {
  const t = copy[locale].homeVisit;
  const address = locale === "en" ? business.address : business.addressFr;

  return (
    <section id="visit-us" className="visit-us" aria-label={t.eyebrow}>
      <div className="visit-us-panel">
        <span className="visit-us-eyebrow">{t.eyebrow}</span>
        <h2>{t.title}</h2>
        <ul className="visit-us-details">
          <li>
            <IconMapPin />
            <div>
              <strong>{locale === "en" ? "Address" : "Adresse"}</strong>
              <address>{address}</address>
            </div>
          </li>
          <li>
            <IconClock />
            <div>
              <strong>{locale === "en" ? "Hours" : "Heures"}</strong>
              <div className="visit-us-hours">
                {business.hours[locale].map((row) => <p key={row}>{row}</p>)}
              </div>
            </div>
          </li>
          <li>
            <IconPhone />
            <div>
              <strong>{locale === "en" ? "Phone" : "Téléphone"}</strong>
              <a href={business.telephoneHref}>{business.telephone}</a>
            </div>
          </li>
        </ul>
        <a className="visit-us-directions" href={business.maps} target="_blank" rel="noreferrer">
          {t.directions}
        </a>
      </div>
      <div className="visit-us-map">
        <iframe
          title={locale === "en" ? "Map of Poissonnerie Sherbrooke" : "Carte de la Poissonnerie Sherbrooke"}
          src={business.mapsEmbed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {open ? <path d="M6 15l6 -6l6 6" /> : <path d="M6 9l6 6l6 -6" />}
    </svg>
  );
}

function FaqSection({ locale }: { locale: Locale }) {
  const t = copy[locale].faq;
  const items = faqItems[locale];
  const defaultOpenId = items[0].id;
  const [openId, setOpenId] = useState<string>(defaultOpenId);

  return (
    <section className="faq-section" id="faq" aria-label={t.title}>
      <div className="faq-intro">
        <span className="faq-eyebrow">FAQ</span>
        <h2>{t.title}</h2>
        <p>
          {t.bodyPrefix}{" "}
          <a href={business.telephoneHref}>{business.telephone}</a>
          .
        </p>
      </div>
      <div className="faq-list">
        {items.map((item) => {
          const open = openId === item.id;
          const panelId = `faq-panel-${item.id}`;
          const buttonId = `faq-button-${item.id}`;
          return (
            <details className="faq-item" key={item.id} open={open}>
              <summary
                id={buttonId}
                className="faq-trigger"
                aria-controls={panelId}
                onClick={(event) => {
                  event.preventDefault();
                  setOpenId(open ? "" : item.id);
                }}
              >
                <span>{item.question}</span>
                <IconChevron open={open} />
              </summary>
              <div id={panelId} className="faq-panel-inner" role="region" aria-labelledby={buttonId}>
                {"quoteLabel" in item ? (
                  <p>
                    {item.answerBefore}
                    <Link href={routeMap[locale].quote}>{item.quoteLabel}</Link>
                    {item.answerAfter}
                  </p>
                ) : (
                  <p>{item.answer}</p>
                )}
              </div>
            </details>
          );
        })}
      </div>
      <div className="faq-closing">
        <a className="order-online-cta" href={business.telephoneHref}>
          {locale === "en" ? "Order online" : "Commander en ligne"}
          <Arrow />
        </a>
      </div>
    </section>
  );
}

function TrustMarquee({ locale }: { locale: Locale }) {
  const phrases = copy[locale].trust;

  return (
    <section
      className="trust-marquee"
      aria-label={locale === "en" ? "Sherbrooke highlights" : "Faits saillants Sherbrooke"}
    >
      <ul className="visually-hidden">
        {phrases.map((phrase) => <li key={phrase}>{phrase}</li>)}
      </ul>
      <div className="trust-marquee-viewport" aria-hidden="true">
        <div className="trust-marquee-rail">
          {[0, 1].map((copyIndex) => (
            <ul className="trust-marquee-group" key={copyIndex}>
              {phrases.map((phrase) => (
                <li key={`${copyIndex}-${phrase}`}>
                  <span className="trust-marquee-phrase">{phrase}</span>
                  <span className="trust-marquee-sep">•</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection({ locale }: { locale: Locale }) {
  const t = trustSection[locale];

  return (
    <section id="reviews" className="trust-section" aria-label={locale === "en" ? "Customer trust" : "Confiance des clients"}>
      <div className="trust-section-intro reveal">
        <h2>
          {Array.isArray(t.title) ? (
            <>
              <span className="trust-title-line">{t.title[0]}</span>
              <br />
              <span className="trust-title-line">{t.title[1]}</span>
            </>
          ) : t.title}
        </h2>
        <p>{t.body}</p>
      </div>
      <a
        className="trust-google-badge reveal"
        href={business.googleReviews}
        target="_blank"
        rel="noreferrer"
        aria-label={locale === "en" ? "See Poissonnerie Sherbrooke reviews on Google" : "Voir les avis de la Poissonnerie Sherbrooke sur Google"}
      >
        <img src="/icons/google-logo.svg" alt="" width="20" height="20" />
        <span>{t.googleBadge}</span>
      </a>
      <div className="trust-stats reveal">
        {t.stats.map((stat) => (
          <div className="trust-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
      <ul className="visually-hidden">
        {t.reviews.map((review) => (
          <li key={review.name}>{review.name}: {review.quote}</li>
        ))}
      </ul>
      <div className="review-carousel" tabIndex={0} aria-hidden="true">
        <div className="review-carousel-rail">
          {[0, 1].map((copyIndex) => (
            <div className="review-carousel-group" key={copyIndex}>
              {t.reviews.map((review) => (
                <article className="review-card" key={`${copyIndex}-${review.name}`}>
                  <div className="review-stars" aria-hidden="true">★★★★★</div>
                  <p>{review.quote}</p>
                  <cite>{review.name}</cite>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="category-shop-actions reveal">
        <a className="order-online-cta" href={business.telephoneHref}>
          {copy[locale].counter.order}
          <Arrow />
        </a>
      </div>
    </section>
  );
}

function Brand() {
  return (
    <span className="ps-brand">
      <img src="/sherbrooke/wordmark.webp" alt="Poissonnerie Sherbrooke" width="2940" height="881" />
    </span>
  );
}

function LanguageGate({
  onChoose,
}: {
  onChoose: (locale: Locale) => void;
}) {
  return (
    <div className="language-gate" role="dialog" aria-modal="true" aria-labelledby="language-gate-title">
      <div className="language-gate-card">
        <Brand />
        <p className="language-gate-eyebrow">Poissonnerie Sherbrooke · Montréal</p>
        <h2 id="language-gate-title">
          Choose your language
          <span>Choisissez votre langue</span>
        </h2>
        <div className="language-gate-actions">
          <button type="button" className="language-gate-option" onClick={() => onChoose("en")}>
            English
          </button>
          <button type="button" className="language-gate-option" onClick={() => onChoose("fr")}>
            Français
          </button>
        </div>
      </div>
    </div>
  );
}

type Props = { locale: Locale; page: PageKey; category?: MarketCategorySlug };

export default function SeafoodSite({ locale, page, category }: Props) {
  const t = copy[locale];
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(page === "quote");
  const [showLanguageGate, setShowLanguageGate] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);
  const localePath = (target: Locale) => (category ? marketCategoryPath(target, category) : routeMap[target][page]);

  function switchLocale(target: Locale) {
    if (target === locale) return;
    writeStoredLocale(target);
    stashScrollPosition();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.push(`${localePath(target)}${hash}`, { scroll: false });
  }

  function chooseInitialLocale(target: Locale) {
    writeStoredLocale(target);
    setShowLanguageGate(false);
    if (target === locale) return;
    router.replace(localePath(target), { scroll: false });
  }

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en-CA" : "fr-CA";
  }, [locale]);

  useEffect(() => {
    const stored = readStoredLocale();
    if (!stored) {
      setShowLanguageGate(true);
      return;
    }
    if (stored === locale) return;
    router.replace(`${localePath(stored)}${window.location.hash}`, { scroll: false });
    // Intentionally keyed to route identity so preference redirects once per mismatched page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, page, category, router]);

  useEffect(() => {
    let cancelled = false;
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (!cancelled) restoreStashedScrollPosition();
      });
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(id);
    };
  }, [locale, page, category]);

  useEffect(() => {
    document.body.style.overflow = showLanguageGate || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showLanguageGate, menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("visible", entry.isIntersecting)),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [page, locale, category]);

  useEffect(() => {
    const hero = document.querySelector(".site-hero");
    if (!hero) {
      setHeaderSolid(true);
      return;
    }
    setHeaderSolid(false);
    const observer = new IntersectionObserver(([entry]) => setHeaderSolid(!entry.isIntersecting), { threshold: 0.1 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [page, category]);

  useEffect(() => {
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
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const homePath = routeMap[locale].home;
  const nav = [
    { id: "shop", label: t.navigation.market, href: `${homePath}#shop` },
    { id: "reviews", label: locale === "en" ? "Reviews" : "Avis", href: `${homePath}#reviews` },
    { id: "visit-us", label: t.navigation.contact, href: `${homePath}#visit-us` },
    { id: "catering", label: t.navigation.catering, href: `${homePath}#catering` },
    { id: "faq", label: "FAQ", href: `${homePath}#faq` },
  ];
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
      {showLanguageGate && <LanguageGate onChoose={chooseInitialLocale} />}
      <header className={`nav-island ${headerSolid ? "nav-solid" : ""}`}>
        <Link className="brand-link" href={routeMap[locale].home}><Brand /></Link>
        <nav className="desktop-nav" aria-label={locale === "en" ? "Main navigation" : "Navigation principale"}>
          {nav.map((item) => <a key={item.id} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="nav-tools">
          <div className="language-toggle" role="group" aria-label={locale === "en" ? "Language" : "Langue"}>
            <button
              type="button"
              className={locale === "en" ? "active" : ""}
              aria-pressed={locale === "en"}
              onClick={() => switchLocale("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={locale === "fr" ? "active" : ""}
              aria-pressed={locale === "fr"}
              onClick={() => switchLocale("fr")}
            >
              FR
            </button>
          </div>
          <a className="call-link" href={business.telephoneHref}>{locale === "en" ? "Order Online" : "Commander en ligne"}<Arrow /></a>
          <button ref={menuButton} className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? t.navigation.close : t.navigation.open}><span /><span /></button>
        </div>
      </header>

      <div ref={menuPanel} className={`mobile-menu ${menuOpen ? "open" : ""}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <nav aria-label={locale === "en" ? "Mobile navigation" : "Navigation mobile"}>
          {nav.map((item, index) => (
            <a
              style={{ "--menu-delay": `${index * 70 + 100}ms` } as React.CSSProperties}
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              <small>0{index + 1}</small>
              <span>{item.label}</span>
              <i>↘</i>
            </a>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <p>{locale === "en" ? business.address : business.addressFr}</p>
          <a href={business.telephoneHref}>{business.telephone}</a>
          <button type="button" onClick={() => { setMenuOpen(false); switchLocale(alternate); }}>
            {t.localeName}
          </button>
        </div>
      </div>

      <main id="main-content">
        {page === "home" ? <Home locale={locale} /> : <InnerPage locale={locale} page={page} category={category} />}
      </main>
      <Footer locale={locale} />
    </>
  );
}

function Home({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const shopCategories = shopCategorySlugs
    .map((slug) => marketCategories[locale].find((item) => item.slug === slug))
    .filter((item): item is (typeof marketCategories)[Locale][number] => Boolean(item));

  const categoryHref = (slug: string) => {
    if (slug === "chef-prepared") return routeMap[locale].menu;
    if (isMarketCategorySlug(slug)) return marketCategoryPath(locale, slug);
    return routeMap[locale].market;
  };

  return (
    <>
      <section className="site-hero home-hero">
        <img className="hero-background" src="/sherbrooke/hero-counter.webp" alt={locale === "en" ? "The fresh seafood counter at Poissonnerie Sherbrooke" : "Le comptoir de fruits de mer frais de la Poissonnerie Sherbrooke"} width="2400" height="2633" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="ice-light" aria-hidden="true" />
        <div className="hero-content">
          <h1>
            {Array.isArray(t.hero.title)
              ? t.hero.title.map((line) => <span className="hero-line" key={line}>{line}</span>)
              : t.hero.title}
          </h1>
          <p>
            {Array.isArray(t.hero.body)
              ? t.hero.body.map((line) => <span className="hero-line" key={line}>{line}</span>)
              : t.hero.body}
          </p>
          <div className="hero-actions">
            <a className="primary-cta" href={business.telephoneHref}>{t.hero.primary}<Arrow /></a>
          </div>
        </div>
        <a className="scroll-marker" href="#shop"><span />{locale === "en" ? "Discover" : "Découvrir"}</a>
      </section>

      <TrustMarquee locale={locale} />

      <section className="category-shop section-light" id="shop">
        <div className="category-shop-intro reveal">
          <h2>{t.counter.title}</h2>
          <p>{t.counter.body}</p>
        </div>
        <div className="category-shop-grid reveal">
          {shopCategories.map((category) => (
            <Link className="category-card" href={categoryHref(category.slug)} key={category.slug}>
              <img src={shopCategoryImages[category.slug as keyof typeof shopCategoryImages]} alt="" aria-hidden="true" width="1200" height="1200" loading="lazy" />
              <span className="category-card-label">{category.name}</span>
            </Link>
          ))}
          <Link className="category-card category-card-all" href={routeMap[locale].market}>
            <span className="category-card-label">{t.counter.viewAll} <i aria-hidden="true">→</i></span>
          </Link>
        </div>
        <div className="category-shop-actions reveal">
          <a className="order-online-cta" href={business.telephoneHref}>{t.counter.order}<Arrow /></a>
        </div>
      </section>

      <TrustSection locale={locale} />

      <VisitUsSection locale={locale} />

      <section id="catering" className="catering-feature">
        <img src="/sherbrooke/shellfish-platter.webp" alt={locale === "en" ? "A generous lobster and shellfish platter prepared by Poissonnerie Sherbrooke" : "Un généreux plateau de homard et fruits de mer préparé par la Poissonnerie Sherbrooke"} width="2991" height="1994" loading="lazy" />
        <div className="catering-panel liquid-panel reveal">
          <span className="eyebrow">{t.catering.eyebrow}</span>
          <h2>{t.catering.title}</h2>
          <p>{t.catering.body}</p>
          <div className="catering-actions">
            <Link className="primary-cta coral-cta" href={routeMap[locale].quote}>{t.catering.primary}<Arrow /></Link>
            <a className="catering-call-link" href={business.telephoneHref}>
              {t.catering.secondaryPrefix} {business.telephone}
            </a>
          </div>
        </div>
      </section>

      <FaqSection locale={locale} />
    </>
  );
}

function InnerPage({ locale, page, category }: Props) {
  const hero = pageHero[page as Exclude<PageKey, "home">];
  const heroCopy = hero[locale];
  const categoryItem = category ? marketCategories[locale].find((item) => item.slug === category) : undefined;
  const heroImage = category && category in shopCategoryImages
    ? shopCategoryImages[category as keyof typeof shopCategoryImages]
    : hero.image;

  return (
    <>
      {page !== "quote" && (
        <section className={`site-hero inner-hero hero-${page}`}>
          <img className="hero-background" src={heroImage} alt="" aria-hidden="true" width="2000" height="1333" fetchPriority="high" />
          <div className="hero-shade" />
          <div className="inner-hero-content">
            <span className="eyebrow">Poissonnerie Sherbrooke · Montréal</span>
            <h1>
              <small>{categoryItem ? (locale === "en" ? "The Market" : "La poissonnerie") : heroCopy[0]}</small>
              {categoryItem ? categoryItem.name : heroCopy[1]}
            </h1>
            <p>{categoryItem ? categoryItem.note : pageIntro(locale, page)}</p>
          </div>
        </section>
      )}
      {page === "market" && category && <MarketCategoryPage locale={locale} category={category} />}
      {page === "market" && !category && <MarketPage locale={locale} />}
      {page === "menu" && <MenuPage locale={locale} />}
      {page === "catering" && <CateringPage locale={locale} />}
      {page === "quote" && <QuotePage locale={locale} />}
      {page === "story" && <StoryPage locale={locale} />}
      {page === "contact" && <ContactPage locale={locale} />}
      {page === "privacy" && <PrivacyPage locale={locale} />}
    </>
  );
}

function pageIntro(locale: Locale, page: PageKey) {
  const texts = {
    en: { market: "Fresh arrivals, traceable origins and experienced guidance at the counter.", menu: "Soups, chowders, tartares, paella and signature seafood preparations by Chef Paul.", catering: "Customized seafood menus for corporate lunches, cocktails and family gatherings.", quote: "Share a few details about your event and we’ll prepare a catering proposal.", story: "A Montréal fish market built on daily freshness, supplier relationships and personal service.", contact: "Find today’s hours, directions, delivery notes and the best way to reach our team.", privacy: "How we handle information submitted through this website." },
    fr: { market: "Arrivages frais, provenances traçables et conseils d’expérience au comptoir.", menu: "Soupes, chaudrées, tartares, paella et créations de fruits de mer du chef Paul.", catering: "Menus de fruits de mer sur mesure pour affaires, cocktails et réunions de famille.", quote: "Partagez quelques détails sur votre événement et nous préparerons une proposition traiteur.", story: "Une poissonnerie montréalaise fondée sur la fraîcheur quotidienne, les fournisseurs et le service personnel.", contact: "Heures du jour, itinéraire, livraison et meilleures façons de joindre notre équipe.", privacy: "Notre façon de traiter les renseignements transmis par ce site." },
  };
  return texts[locale][page as Exclude<PageKey, "home">];
}

function MarketPage({ locale }: { locale: Locale }) {
  const items = marketCategories[locale];
  return (
    <section className="editorial-page section-light">
      <div className="page-lead reveal"><span>01 / {locale === "en" ? "Daily selection" : "Sélection quotidienne"}</span><h2>{locale === "en" ? "The counter changes. The standard doesn’t." : "Le comptoir change. Le standard demeure."}</h2><p>{locale === "en" ? "Fresh fish and seafood arrive daily from local and international sources. Availability changes—call the market for today’s selection." : "Poissons frais et fruits de mer arrivent chaque jour de sources locales et internationales. Les disponibilités changent—appelez-nous pour la sélection du jour."}</p></div>
      <div className="market-catalogue">
        {items.map((item, index) => {
          const href = item.slug === "chef-prepared"
            ? routeMap[locale].menu
            : isMarketCategorySlug(item.slug)
              ? marketCategoryPath(locale, item.slug)
              : undefined;
          return (
            <article id={item.slug} className={`catalogue-item reveal item-${index + 1}`} key={item.name}>
              <img src={item.image} alt={item.name} width="1800" height="1200" loading="lazy" />
              <div>
                <small>0{index + 1}</small>
                <h3>{href ? <Link href={href}>{item.name}</Link> : item.name}</h3>
                <p>{item.note}</p>
                <a href={business.telephoneHref}>{locale === "en" ? "Call for today’s selection" : "Demander la sélection du jour"} <span>↗</span></a>
              </div>
            </article>
          );
        })}
      </div>
      <FineFoods locale={locale} />
    </section>
  );
}

function MarketCategoryPage({ locale, category }: { locale: Locale; category: MarketCategorySlug }) {
  const item = marketCategories[locale].find((entry) => entry.slug === category);
  const products = categoryPlaceholderProducts[category][locale];
  if (!item) return null;

  return (
    <section className="editorial-page section-light category-page">
      <nav className="category-breadcrumb reveal" aria-label={locale === "en" ? "Breadcrumb" : "Fil d’Ariane"}>
        <Link href={routeMap[locale].market}>{locale === "en" ? "← Back to the market" : "← Retour à la poissonnerie"}</Link>
      </nav>
      <div className="page-lead reveal">
        <span>01 / {locale === "en" ? "Category" : "Catégorie"}</span>
        <h2>{item.name}</h2>
        <p>{item.note}</p>
      </div>
      <div className="product-grid reveal" aria-label={locale === "en" ? `${item.name} selection` : `Sélection ${item.name}`}>
        {products.map((product, index) => (
          <article className="product-card" key={product}>
            <div className="product-card-media" aria-hidden="true">
              <img
                src={shopCategoryImages[category]}
                alt=""
                width="600"
                height="600"
                loading="lazy"
              />
            </div>
            <div className="product-card-body">
              <small>0{index + 1}</small>
              <h3>{product}</h3>
              <p>{locale === "en" ? "Ask about today’s availability" : "Demandez la disponibilité du jour"}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="category-page-cta reveal">
        <a className="order-online-cta" href={business.telephoneHref}>{locale === "en" ? "Order online" : "Commander en ligne"}<Arrow /></a>
      </div>
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
      <div className="lobster-feature reveal"><img src="/sherbrooke/lobster-roll.webp" alt={locale === "en" ? "Poissonnerie Sherbrooke lobster roll served on a brioche bun" : "Guédille au homard de la Poissonnerie Sherbrooke servie sur brioche"} width="2400" height="1586" loading="lazy" /><div className="liquid-panel"><span className="eyebrow">{locale === "en" ? "The signature" : "La signature"}</span><h2>{locale === "en" ? "The lobster roll." : "La guédille au homard."}</h2><p>{copy[locale].dishes.body}</p><a className="primary-cta coral-cta" href={business.telephoneHref}>{locale === "en" ? "Call to order" : "Commander par téléphone"}<Arrow /></a></div></div>
    </section>
  );
}

function CateringPage({ locale }: { locale: Locale }) {
  const t = copy[locale].catering;
  return (
    <section className="editorial-page section-light">
      <div className="catering-overview reveal"><span className="section-number">01</span><div><span className="eyebrow dark">{t.eyebrow}</span><h2>{t.title}</h2></div><p>{t.body}</p></div>
      <div className="catering-types reveal">{(locale === "en" ? [["Corporate lunches", "Fresh, composed menus that travel well."], ["Cocktail receptions", "Oysters, tartares and seafood bites."], ["Family gatherings", "Hot or cold platters sized for the table."]] : [["Dîners corporatifs", "Des menus frais et soignés qui voyagent bien."], ["Cocktails", "Huîtres, tartares et bouchées de la mer."], ["Réunions de famille", "Plateaux chauds ou froids pour toute la table."]]).map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      <div className="category-shop-actions reveal" style={{ marginBottom: "80px" }}>
        <Link className="order-online-cta" href={routeMap[locale].quote}>{t.primary}<Arrow /></Link>
      </div>
    </section>
  );
}

function QuotePage({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...body, type: "catering", locale }),
      });
      const data = await response.json() as { message?: string };
      if (!response.ok) throw new Error(data.message || "Request failed");
      setStatus("success");
      setMessage(en
        ? "Your request was sent. Our team will reply directly."
        : "Votre demande a été envoyée. Notre équipe vous répondra directement.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(en
        ? `Online sending is not connected yet. Please call ${business.telephone} or email ${business.email}.`
        : `L’envoi en ligne n’est pas encore connecté. Appelez au ${business.telephone} ou écrivez à ${business.email}.`);
    }
  }

  return (
    <section className="quote-page" aria-label={en ? "Request a quote" : "Demander un devis"}>
      <div className="quote-inner">
        <header className="quote-intro">
          <span className="quote-eyebrow">{en ? "Request a quote" : "Demander un devis"}</span>
          <h1>{en ? "Plan your event" : "Planifiez votre événement"}</h1>
          <p>
            {en
              ? "Tell us about your event and we’ll put together a custom seafood proposal. Fill out the details below and we’ll get back to you shortly."
              : "Parlez-nous de votre événement et nous préparerons une proposition de fruits de mer sur mesure. Remplissez les détails ci-dessous et nous vous répondrons sous peu."}
          </p>
          <p className="quote-phone">
            {en ? "Prefer to talk it through? Call us at " : "Vous préférez en parler? Appelez-nous au "}
            <a href={business.telephoneHref}>{business.telephone}</a>
          </p>
        </header>

        <form onSubmit={submit} className="quote-form inquiry-form" aria-describedby="quote-form-status">
          <div className="form-field">
            <label htmlFor="quote-name">{en ? "Full name" : "Nom complet"}</label>
            <input id="quote-name" name="name" required autoComplete="name" />
          </div>
          <div className="form-field">
            <label htmlFor="quote-email">{en ? "Email" : "Courriel"}</label>
            <input id="quote-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="form-field">
            <label htmlFor="quote-phone">{en ? "Telephone" : "Téléphone"}</label>
            <input id="quote-phone" name="phone" type="tel" autoComplete="tel" required />
          </div>
          <div className="form-field">
            <label htmlFor="event-date">{en ? "Event date" : "Date de l’événement"}</label>
            <input id="event-date" name="eventDate" type="date" required />
          </div>
          <div className="form-field">
            <label htmlFor="guest-count">{en ? "Estimated guest count" : "Nombre d’invités estimé"}</label>
            <input id="guest-count" name="guestCount" type="number" min="1" inputMode="numeric" required />
          </div>
          <div className="form-field">
            <label htmlFor="event-type">{en ? "Event type" : "Type d’événement"}</label>
            <select id="event-type" name="eventType" required defaultValue="">
              <option value="" disabled>{en ? "Select one" : "Choisir"}</option>
              <option value="corporate">{en ? "Corporate" : "Corporatif"}</option>
              <option value="celebration">{en ? "Celebration" : "Célébration"}</option>
              <option value="family">{en ? "Family gathering" : "Réunion de famille"}</option>
              <option value="other">{en ? "Other" : "Autre"}</option>
            </select>
          </div>
          <div className="form-field full">
            <label htmlFor="quote-message">{en ? "Message / event details" : "Message / détails de l’événement"}</label>
            <textarea id="quote-message" name="message" rows={5} required />
          </div>
          <div className="honeypot" aria-hidden="true">
            <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <label className="consent full">
            <input name="consent" type="checkbox" required />
            <span>{en ? "I consent to being contacted about this request." : "J’accepte d’être contacté au sujet de cette demande."}</span>
          </label>
          <div className="form-submit full">
            <button className="inquiry-submit" type="submit" disabled={status === "sending"}>
              {status === "sending"
                ? (en ? "Sending…" : "Envoi…")
                : (en ? "Request a quote" : "Demander un devis")}
            </button>
            <p id="quote-form-status" className={`form-status ${status}`} aria-live="polite">{message}</p>
          </div>
        </form>
      </div>
    </section>
  );
}

function StoryPage({ locale }: { locale: Locale }) {
  const rows = locale === "en" ? [["More than 50 years", "A longstanding neighbourhood market serving generations of Montréal customers."], ["Daily freshness", "Fish and seafood received daily, selected for condition and prepared with care."], ["Traceable origins", "Local and international products with origin information available at the counter."], ["Experienced hands", "Fishmongers who cut, clean, recommend and answer the practical questions."], ["Chef-led preparation", "Chef Paul brings over 40 years of Montréal restaurant experience to the market."]] : [["Plus de 50 ans", "Une poissonnerie de quartier qui sert plusieurs générations de Montréalais."], ["Fraîcheur quotidienne", "Poissons et fruits de mer reçus chaque jour, choisis et préparés avec soin."], ["Provenance traçable", "Produits locaux et internationaux dont la provenance est disponible au comptoir."], ["Des mains d’expérience", "Des poissonniers qui coupent, nettoient, conseillent et répondent aux questions pratiques."], ["Une cuisine dirigée par le chef", "Le chef Paul apporte plus de 40 ans d’expérience dans les restaurants montréalais."]];
  return (
    <section className="editorial-page story-page section-cream">
      <div className="story-statement reveal"><span>01 / {locale === "en" ? "The institution" : "L’institution"}</span><h2>{locale === "en" ? "Established by time. Kept current by the day’s catch." : "Établie par le temps. Renouvelée par les arrivages du jour."}</h2></div>
      <div className="story-rows">{rows.map(([title, body], index) => <article className="reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p><i>—</i></article>)}</div>
      <div className="story-image reveal"><img src="/sherbrooke/chef-paul.webp" alt={locale === "en" ? "Chef Paul at the neighbourhood market" : "Le chef Paul à la poissonnerie de quartier"} width="1818" height="2424" loading="lazy" /><div className="liquid-panel">{locale === "en" ? "Personal service is still the point." : "Le service personnel reste essentiel."}</div></div>
      <div className="archive-section reveal">
        <div className="archive-heading"><span>02 / {locale === "en" ? "From the archive" : "Dans les archives"}</span><h2>{locale === "en" ? "A neighbourhood institution, documented." : "Une institution de quartier, en images."}</h2><p>{locale === "en" ? "Press, seasonal menus and market moments preserved from the Poissonnerie Sherbrooke archive. Historical material is shown as part of our story, not as a current offer." : "Presse, menus saisonniers et moments de la poissonnerie conservés dans les archives de la Poissonnerie Sherbrooke. Ces documents historiques ne représentent pas des offres actuelles."}</p></div>
        <div className="archive-strip" tabIndex={0} aria-label={locale === "en" ? "Poissonnerie Sherbrooke historical archive" : "Archives historiques de la Poissonnerie Sherbrooke"}>
          {archiveGallery.map((item, index) => <figure className="archive-card" key={item.image}><img src={item.image} alt={locale === "en" ? item.en : item.fr} loading="lazy" /><figcaption><span>{String(index + 1).padStart(2, "0")}</span>{locale === "en" ? item.en : item.fr}</figcaption></figure>)}
        </div>
      </div>
    </section>
  );
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
    <section className="inquiry-section">
      <div className="inquiry-heading">
        <span className="eyebrow">{en ? "Send a request" : "Envoyer une demande"}</span>
        <h2>{en ? "How can we help?" : "Comment pouvons-nous vous aider?"}</h2>
        <p className="inquiry-lead">
          {en
            ? "For same-day availability or an immediate order, calling the market is best."
            : "Pour les disponibilités du jour ou une commande immédiate, il vaut mieux nous appeler."}
        </p>
        <p className="inquiry-phone-fallback">
          {en ? "Prefer to talk it through? Call us at " : "Vous préférez en parler? Appelez-nous au "}
          <a href={business.telephoneHref}>{business.telephone}</a>
        </p>
      </div>
      <form onSubmit={submit} className="inquiry-form" aria-describedby="form-status">
        <div className="form-field">
          <label htmlFor={`${type}-name`}>{en ? "Full name" : "Nom complet"}</label>
          <input id={`${type}-name`} name="name" required autoComplete="name" />
        </div>
        <div className="form-field">
          <label htmlFor={`${type}-email`}>{en ? "Email" : "Courriel"}</label>
          <input id={`${type}-email`} name="email" type="email" required autoComplete="email" />
        </div>
        <div className="form-field">
          <label htmlFor={`${type}-phone`}>{en ? "Telephone" : "Téléphone"}</label>
          <input id={`${type}-phone`} name="phone" type="tel" autoComplete="tel" required />
        </div>
        <div className="form-field full">
          <label htmlFor={`${type}-message`}>{en ? "Message" : "Message"}</label>
          <textarea id={`${type}-message`} name="message" rows={5} required />
        </div>
        <div className="honeypot" aria-hidden="true">
          <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <label className="consent full">
          <input name="consent" type="checkbox" required />
          <span>{en ? "I consent to being contacted about this request." : "J’accepte d’être contacté au sujet de cette demande."}</span>
        </label>
        <div className="form-submit full">
          <button className="inquiry-submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? (en ? "Sending…" : "Envoi…") : (en ? "Send request" : "Envoyer la demande")}
          </button>
          <p id="form-status" className={`form-status ${status}`} aria-live="polite">{message}</p>
        </div>
      </form>
    </section>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link href={routeMap[locale].home}><Brand /></Link>
      </div>
      <div className="footer-grid">
        <div>
          <small>{locale === "en" ? "Visit" : "Visiter"}</small>
          <p>{locale === "en" ? business.address : business.addressFr}</p>
          <a href={business.maps} target="_blank" rel="noreferrer">{t.visit.directions} ↗</a>
        </div>
        <div>
          <small>{locale === "en" ? "Contact" : "Coordonnées"}</small>
          <a href={business.telephoneHref}>{business.telephone}</a>
          <a href={`mailto:${business.email}`}>{business.email}</a>
        </div>
        <div>
          <small>{locale === "en" ? "Hours" : "Heures"}</small>
          {business.hours[locale].map((row) => <p key={row}>{row}</p>)}
        </div>
        <div>
          <small>{locale === "en" ? "Navigate" : "Navigation"}</small>
          <a href={`${routeMap[locale].home}#shop`}>{t.navigation.market}</a>
          <a href={`${routeMap[locale].home}#reviews`}>{locale === "en" ? "Reviews" : "Avis"}</a>
          <a href={`${routeMap[locale].home}#visit-us`}>{t.navigation.contact}</a>
          <a href={`${routeMap[locale].home}#catering`}>{t.navigation.catering}</a>
          <a href={`${routeMap[locale].home}#faq`}>FAQ</a>
          <Link href={routeMap[locale].privacy}>{locale === "en" ? "Privacy" : "Confidentialité"}</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Poissonnerie Sherbrooke
          <span aria-hidden="true"> · </span>
          {locale === "en" ? "Site by" : "Site par"}{" "}
          <a href="https://vantic.ca" target="_blank" rel="noopener noreferrer">Vantic</a>
        </span>
        <span>{locale === "en" ? "Photography:" : "Photographie :"} {photographyCredits.join(", ")}</span>
      </div>
    </footer>
  );
}
