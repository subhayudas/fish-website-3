import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

let workerPromise;

function getWorker() {
  workerPromise ??= import(new URL("../dist/server/index.js", import.meta.url)).then(
    ({ default: worker }) => worker,
  );
  return workerPromise;
}

async function render(path, headers = {}) {
  const worker = await getWorker();
  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html", ...headers },
      redirect: "manual",
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the localized homepage with optimized discovery hints", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="en"/);
  assert.match(html, /Montréal’s fresh fish market since 1968\./);
  assert.match(html, /hero-counter-768\.webp 768w/);
  assert.match(html, /hero-counter-1280\.webp 1280w/);
  assert.match(html, /fetchPriority="high"/);
  assert.match(html, /viewport-fit=cover/);
  assert.match(html, /rel="canonical" href="https:\/\/fin-living-colour\.subhayu435824\.chatgpt\.site\/en"/);
  assert.match(html, /og\.jpg/);
  assert.doesNotMatch(html, /language-gate/);
  assert.doesNotMatch(response.headers.get("link") ?? "", /as=font/);
});

test("bare-domain entry redirects before hydration using the request language", async () => {
  const french = await render("/", { "accept-language": "fr-CA,fr;q=0.9,en;q=0.8" });
  assert.equal(french.status, 307);
  assert.equal(new URL(french.headers.get("location")).pathname, "/fr");

  const english = await render("/", { "accept-language": "en-CA,en;q=0.9" });
  assert.equal(english.status, 307);
  assert.equal(new URL(english.headers.get("location")).pathname, "/en");
});

test("ships compact mobile and social-preview assets with cache rules", async () => {
  const [hero, wordmark, social, headers] = await Promise.all([
    stat(new URL("../public/sherbrooke/hero-counter-768.webp", import.meta.url)),
    stat(new URL("../public/sherbrooke/wordmark-640.webp", import.meta.url)),
    stat(new URL("../public/og.jpg", import.meta.url)),
    readFile(new URL("../public/_headers", import.meta.url), "utf8"),
  ]);

  assert.ok(hero.size < 120_000);
  assert.ok(wordmark.size < 25_000);
  assert.ok(social.size < 300_000);
  assert.match(headers, /\/assets\/\*/);
  assert.match(headers, /max-age=31536000, immutable/);
  assert.match(headers, /\/sherbrooke\/\*/);
  assert.match(headers, /stale-while-revalidate/);
});
