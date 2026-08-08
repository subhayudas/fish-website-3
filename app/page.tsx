"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Fish = {
  id: number;
  name: string;
  latin: string;
  price: number;
  image: string;
  category: "Solo" | "Community" | "Statement";
  level: string;
  temp: string;
  size: string;
  accent: string;
};

const fish: Fish[] = [
  {
    id: 1,
    name: "Midnight Betta",
    latin: "Betta splendens",
    price: 1499,
    image: "/fish/betta-fire.jpg",
    category: "Solo",
    level: "Beginner",
    temp: "24–28°C",
    size: "5 cm",
    accent: "#65d9f0",
  },
  {
    id: 2,
    name: "Golden Angel",
    latin: "Pterophyllum scalare",
    price: 899,
    image: "/fish/angel.jpg",
    category: "Statement",
    level: "Intermediate",
    temp: "24–30°C",
    size: "10 cm",
    accent: "#c7eff8",
  },
  {
    id: 3,
    name: "Kohaku Koi",
    latin: "Cyprinus rubrofuscus",
    price: 2199,
    image: "/fish/koi.jpg",
    category: "Statement",
    level: "Keeper",
    temp: "15–25°C",
    size: "15 cm",
    accent: "#ff877b",
  },
  {
    id: 4,
    name: "Golden Koi",
    latin: "Yamabuki ogon",
    price: 1799,
    image: "/fish/koi-school.jpg",
    category: "Community",
    level: "Intermediate",
    temp: "15–25°C",
    size: "14 cm",
    accent: "#ffd451",
  },
];

const filters = ["All", "Solo", "Community", "Statement"] as const;
type Filter = (typeof filters)[number];

const tankRecommendations: Record<string, Fish> = {
  "Small-Calm": fish[0],
  "Small-Lively": fish[0],
  "Medium-Calm": fish[1],
  "Medium-Lively": fish[1],
  "Large-Calm": fish[2],
  "Large-Lively": fish[3],
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className="button-arrow" aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [cart, setCart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tankSize, setTankSize] = useState("Medium");
  const [tankMood, setTankMood] = useState("Calm");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const heroVisual = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, menuOpen]);

  const visibleFish = useMemo(() => {
    return fish.filter((item) => {
      const categoryMatch = activeFilter === "All" || item.category === activeFilter;
      const searchMatch = `${item.name} ${item.latin}`.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [activeFilter, query]);

  const cartItems = cart.map((id) => fish.find((item) => item.id === id)!).filter(Boolean);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const recommendation = tankRecommendations[`${tankSize}-${tankMood}`];

  function addToCart(id: number) {
    setCart((items) => [...items, id]);
    setCartOpen(true);
  }

  function handleHeroMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!heroVisual.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = heroVisual.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroVisual.current.style.setProperty("--tilt-x", `${y * -5}deg`);
    heroVisual.current.style.setProperty("--tilt-y", `${x * 7}deg`);
    heroVisual.current.style.setProperty("--shift-x", `${x * 16}px`);
    heroVisual.current.style.setProperty("--shift-y", `${y * 12}px`);
  }

  function resetHero() {
    heroVisual.current?.style.setProperty("--tilt-x", "0deg");
    heroVisual.current?.style.setProperty("--tilt-y", "0deg");
    heroVisual.current?.style.setProperty("--shift-x", "0px");
    heroVisual.current?.style.setProperty("--shift-y", "0px");
  }

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewsletterDone(true);
  }

  return (
    <main>
      <div className="grain" aria-hidden="true" />

      <header className="floating-nav">
        <a className="brand" href="#top" aria-label="Fin home">
          <span className="brand-mark"><img src="/fish/logo.png" alt="" /></span>
          <span>FIN</span>
        </a>
        <nav className="desktop-links" aria-label="Primary navigation">
          <a href="#collection">The drop</a>
          <a href="#match">Tank match</a>
          <a href="#promise">Our promise</a>
        </nav>
        <div className="nav-actions">
          <button className="nav-icon search-trigger" onClick={() => setSearchOpen((value) => !value)} aria-expanded={searchOpen} aria-label="Search fish">
            <span className="search-shape" aria-hidden="true" />
          </button>
          <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cart.length} items`}>
            Bag <span>{String(cart.length).padStart(2, "0")}</span>
          </button>
          <button className={`menu-trigger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen((value) => !value)} aria-label="Open menu" aria-expanded={menuOpen}>
            <span /><span />
          </button>
        </div>
        {searchOpen && (
          <div className="search-popover">
            <label htmlFor="fish-search">Find your fish</label>
            <input id="fish-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “Betta”" />
            <a href="#collection" onClick={() => setSearchOpen(false)}>View results <span>↓</span></a>
          </div>
        )}
      </header>

      <div className={`menu-overlay ${menuOpen ? "show" : ""}`} aria-hidden={!menuOpen}>
        <div className="menu-links">
          {["The drop", "Tank match", "Our promise"].map((label, index) => (
            <a key={label} style={{ "--delay": `${100 + index * 70}ms` } as React.CSSProperties} href={index === 0 ? "#collection" : index === 1 ? "#match" : "#promise"} onClick={() => setMenuOpen(false)}>
              <small>0{index + 1}</small>{label}<span>↘</span>
            </a>
          ))}
        </div>
        <p>Living colour, responsibly delivered.</p>
      </div>

      <section className="hero" id="top">
        <div className="hero-copy reveal">
          <span className="eyebrow"><i /> Curated live fish · India-wide</span>
          <h1>Bring home<br /><em>living colour.</em></h1>
          <p>Healthy, hand-selected freshwater fish—paired to your tank and delivered with care.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#collection">Explore the drop <Arrow /></a>
            <a className="text-link" href="#match">Match my tank <span>↘</span></a>
          </div>
          <div className="social-proof">
            <div className="avatar-stack" aria-hidden="true"><span>R</span><span>A</span><span>K</span></div>
            <p><strong>4.9/5</strong><br />from 600+ aquarists</p>
          </div>
        </div>

        <div className="hero-visual-shell reveal" onPointerMove={handleHeroMove} onPointerLeave={resetHero}>
          <div className="hero-visual" ref={heroVisual}>
            <img src="/fish/koi-school.jpg" alt="A vivid school of ornamental koi swimming in deep blue water" />
            <div className="hero-wash" />
            <div className="species-card">
              <span>Current arrival</span>
              <strong>Yamabuki<br />Ogon</strong>
              <small>Golden koi · Grade A</small>
            </div>
            <div className="orbit-label"><span>100%</span> live arrival<br />guarantee</div>
            <div className="bubble bubble-one" /><div className="bubble bubble-two" /><div className="bubble bubble-three" />
          </div>
        </div>

        <div className="scroll-cue"><span /> Scroll to meet the school</div>
      </section>

      <section className="collection section" id="collection">
        <div className="section-heading reveal">
          <div>
            <span className="eyebrow dark"><i /> This week’s drop</span>
            <h2>Rare finds.<br /><em>Ready to thrive.</em></h2>
          </div>
          <p>Each fish is quarantined, observed, and cleared by our aquatic team before it enters the collection.</p>
        </div>

        <div className="filter-row reveal" role="group" aria-label="Filter fish by type">
          {filters.map((filter) => (
            <button key={filter} className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>
              {filter}<span>{filter === "All" ? fish.length : fish.filter((item) => item.category === filter).length}</span>
            </button>
          ))}
        </div>

        <div className="product-rail">
          {visibleFish.map((item, index) => (
            <article className="product-shell reveal" key={item.id} style={{ "--product-accent": item.accent, "--delay": `${index * 90}ms` } as React.CSSProperties}>
              <div className="product-card">
                <div className="product-image">
                  <img src={item.image} alt={item.name} />
                  <span className="stock-dot"><i /> In stock</span>
                  <button className="quick-add" onClick={() => addToCart(item.id)} aria-label={`Add ${item.name} to bag`}><span>+</span></button>
                  <div className="image-index">0{index + 1}</div>
                </div>
                <div className="product-info">
                  <span className="product-category">{item.category} · {item.level}</span>
                  <div className="product-title-row">
                    <div><h3>{item.name}</h3><p>{item.latin}</p></div>
                    <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="product-meta"><span>{item.temp}</span><span>Up to {item.size}</span><span>Care guide</span></div>
                </div>
              </div>
            </article>
          ))}
        </div>
        {visibleFish.length === 0 && <p className="empty-state">No fish found. Try another name or category.</p>}
      </section>

      <section className="match section" id="match">
        <div className="match-shell reveal">
          <div className="match-inner">
            <div className="match-copy">
              <span className="eyebrow"><i /> Tank match · 30 seconds</span>
              <h2>Not sure who<br /><em>belongs?</em></h2>
              <p>Tell us about your water world. We’ll suggest a fish that fits—not just one that looks good.</p>
              <div className="quiz-block">
                <label>01 / Tank size</label>
                <div className="segmented">
                  {["Small", "Medium", "Large"].map((size) => <button key={size} className={tankSize === size ? "active" : ""} onClick={() => setTankSize(size)}>{size}</button>)}
                </div>
              </div>
              <div className="quiz-block">
                <label>02 / Tank energy</label>
                <div className="segmented">
                  {["Calm", "Lively"].map((mood) => <button key={mood} className={tankMood === mood ? "active" : ""} onClick={() => setTankMood(mood)}>{mood}</button>)}
                </div>
              </div>
            </div>

            <div className="recommendation" style={{ "--product-accent": recommendation.accent } as React.CSSProperties}>
              <div className="recommendation-image" key={recommendation.id}>
                <img src={recommendation.image} alt={recommendation.name} />
                <span>Your match</span>
              </div>
              <div className="recommendation-info">
                <div><small>We recommend</small><h3>{recommendation.name}</h3><p>{recommendation.latin}</p></div>
                <button className="primary-button light" onClick={() => addToCart(recommendation.id)}>Add · ₹{recommendation.price.toLocaleString("en-IN")} <Arrow /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="promise section" id="promise">
        <div className="promise-heading reveal">
          <span className="eyebrow dark"><i /> The FIN standard</span>
          <h2>From our water<br /><em>to yours.</em></h2>
        </div>
        <div className="journey-grid reveal">
          <div className="journey-visual">
            <img src="/fish/betta-blue.jpg" alt="Blue betta in a carefully prepared home aquarium" />
            <div className="care-stamp"><span>24/7</span> arrival<br />support</div>
          </div>
          <div className="journey-steps">
            {[
              ["01", "14-day quarantine", "Every fish is observed for appetite, movement, colour and condition."],
              ["02", "Climate-safe packing", "Oxygenated double bags and insulated boxes tuned to the route."],
              ["03", "Live arrival promise", "Send us an arrival video within two hours and you’re completely covered."],
            ].map(([number, title, copy]) => (
              <div className="journey-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><i>↗</i></div>
            ))}
          </div>
        </div>
      </section>

      <section className="closing section">
        <div className="closing-shell reveal">
          <img src="/fish/koi.jpg" alt="Red and white koi gliding through clear water" />
          <div className="closing-overlay" />
          <div className="closing-content">
            <span className="eyebrow"><i /> Join the school</span>
            <h2>A calmer room<br />starts <em>here.</em></h2>
            <p>Get first access to weekly fish drops and practical care notes.</p>
            {newsletterDone ? (
              <div className="success-message">You’re in the school. Watch your inbox. <span>✓</span></div>
            ) : (
              <form onSubmit={submitNewsletter} className="email-form">
                <label className="sr-only" htmlFor="email">Email address</label>
                <input id="email" type="email" placeholder="Your email address" required />
                <button aria-label="Join the newsletter">Join <Arrow /></button>
              </form>
            )}
          </div>
        </div>
        <footer>
          <a className="brand footer-brand" href="#top"><span className="brand-mark"><img src="/fish/logo.png" alt="" /></span><span>FIN</span></a>
          <p>Living colour, responsibly delivered.</p>
          <div><a href="#collection">Shop</a><a href="#promise">Care</a><a href="mailto:hello@fin.fish">hello@fin.fish</a></div>
          <small>© 2026 FIN Aquatics</small>
        </footer>
      </section>

      <div className={`drawer-backdrop ${cartOpen ? "show" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-label="Shopping bag" aria-hidden={!cartOpen}>
        <div className="cart-head"><div><span>Your living collection</span><h2>Bag <sup>{cart.length}</sup></h2></div><button onClick={() => setCartOpen(false)} aria-label="Close cart">×</button></div>
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-bag"><span>◌</span><h3>Your school is empty</h3><p>Explore this week’s healthiest arrivals.</p><button className="primary-button" onClick={() => { setCartOpen(false); document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the drop <Arrow /></button></div>
          ) : cartItems.map((item, index) => (
            <div className="cart-item" key={`${item.id}-${index}`}><img src={item.image} alt="" /><div><small>{item.category}</small><h3>{item.name}</h3><p>₹{item.price.toLocaleString("en-IN")}</p></div><button onClick={() => setCart((items) => items.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove ${item.name}`}>×</button></div>
          ))}
        </div>
        {cartItems.length > 0 && <div className="cart-footer"><div><span>Subtotal</span><strong>₹{total.toLocaleString("en-IN")}</strong></div><p>Climate-safe shipping calculated at checkout</p><button className="checkout-button" onClick={() => alert("Checkout connected — your fish are reserved for 10 minutes.")}>Secure checkout <Arrow diagonal /></button></div>}
      </aside>
    </main>
  );
}
