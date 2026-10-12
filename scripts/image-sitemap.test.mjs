import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve, sep } from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";
import imageSitemap, { collectPageImages, isPublicPage } from "./image-sitemap.mjs";

async function fixture(t) {
  const prefix = join(tmpdir(), "oxland-sitemap-");
  const root = await mkdtemp(prefix);
  t.after(async () => {
    assert.ok(resolve(root).startsWith(resolve(prefix)));
    assert.ok(resolve(root).startsWith(resolve(tmpdir()) + sep));
    await rm(root, { recursive: true, force: true });
  });
  const outDir = join(root, "dist");
  await mkdir(join(root, "src", "components"), { recursive: true });
  await mkdir(join(outDir, "blog"), { recursive: true });
  return { root, outDir, pageUrl: "https://oxland.in/blog/example/" };
}

test("excludes previews and error routes without excluding real pages", () => {
  for (const path of ["/features-preview", "/features-preview/", "/404", "/404.html", "/500/"]) {
    assert.equal(isPublicPage("https://oxland.in" + path), false);
  }
  for (const path of ["/", "/features", "/blog/example", "/blog/404-reasons"]) {
    assert.equal(isPublicPage("https://oxland.in" + path), true);
  }
});

test("collects responsive and background images, encodes URLs, deduplicates, and omits missing files", async (t) => {
  const options = await fixture(t);
  for (const name of ["hero.webp", "wide.webp", "background.png", "blog/Land & ROW.jpg"]) {
    await writeFile(join(options.outDir, name), "image fixture");
  }
  const missing = new Set();
  const entry = await collectPageImages({
    ...options,
    missing,
    html: `<head><link rel="canonical" href="https://oxland.in/blog/example"></head>
      <img src="/hero.webp" srcset="/hero.webp 1x, /wide.webp 2x">
      <img src="/hero.webp"><img src="/blog/Land &amp; ROW.jpg">
      <div style="background-image: url('/background.png')"></div>
      <img src="/missing.webp"><img src="data:image/png;base64,ignored">`,
  });
  assert.equal(entry.url, "https://oxland.in/blog/example");
  assert.deepEqual(entry.img.map((image) => image.url), [
    "https://oxland.in/background.png",
    "https://oxland.in/blog/Land%20&%20ROW.jpg",
    "https://oxland.in/hero.webp",
    "https://oxland.in/wide.webp",
  ]);
  assert.deepEqual([...missing], ["https://oxland.in/missing.webp"]);
});

test("follows local imports and lazy components for images absent from initial HTML, including import cycles", async (t) => {
  const options = await fixture(t);
  const sourceFile = join(options.root, "src", "page.astro");
  await writeFile(sourceFile, `import Widget from '@/components/Widget';`);
  await writeFile(join(options.root, "src", "components", "Widget.tsx"), `
    import '../page.astro';
    const Deferred = lazy(() => import('./Deferred'));
    const background = 'url(/background.webp)';
  `);
  await writeFile(join(options.root, "src", "components", "Deferred.tsx"), `const image = '/deferred.png';`);
  for (const name of ["background.webp", "deferred.png"]) await writeFile(join(options.outDir, name), "fixture");
  const entry = await collectPageImages({ ...options, sourceFile, html: "<main>Initial state</main>" });
  assert.deepEqual(entry.img.map((image) => image.url), [
    "https://oxland.in/background.webp", "https://oxland.in/deferred.png",
  ]);
});

test("excludes noindex pages and rejects canonical URLs outside the site", async (t) => {
  const options = await fixture(t);
  assert.equal(await collectPageImages({ ...options, html: '<meta name="robots" content="noindex, follow">' }), undefined);
  await assert.rejects(collectPageImages({ ...options, html: '<link rel="canonical" href="https://other.example/">' }), /Invalid sitemap canonical/);
});

test("Astro integration generates the index and page/image sitemap from resolved routes", async (t) => {
  const { root, outDir } = await fixture(t);
  await writeFile(join(root, "src", "page.astro"), '<img src="/hero.webp">');
  await writeFile(join(outDir, "hero.webp"), "fixture");
  await writeFile(join(outDir, "index.html"), '<link rel="canonical" href="https://oxland.in/"><img src="/hero.webp">');
  await mkdir(join(outDir, "features-preview"));
  await writeFile(join(outDir, "features-preview", "index.html"), "Preview");
  const integration = imageSitemap();
  const logger = { info() {}, warn() {}, error(message) { throw new Error(message); } };
  await integration.hooks["astro:config:done"]({
    config: { root: pathToFileURL(root + sep), site: "https://oxland.in", base: "/", trailingSlash: "ignore", build: { format: "directory" } },
  });
  await integration.hooks["astro:routes:resolved"]({ routes: [{
    type: "page", pathname: "/", pattern: "/", patternRegex: /^\/$/,
    entrypoint: "src/page.astro", generate: () => "/", fallbackRoutes: [],
  }] });
  await integration.hooks["astro:build:done"]({
    dir: pathToFileURL(outDir + sep), pages: [{ pathname: "" }, { pathname: "features-preview/" }], logger,
  });
  const index = await readFile(join(outDir, "sitemap-index.xml"), "utf8");
  const pages = await readFile(join(outDir, "sitemap-0.xml"), "utf8");
  assert.match(index, /https:\/\/oxland\.in\/sitemap-0\.xml/);
  assert.match(pages, /<loc>https:\/\/oxland\.in\/<\/loc>/);
  assert.match(pages, /<image:loc>https:\/\/oxland\.in\/hero\.webp<\/image:loc>/);
  assert.doesNotMatch(pages, /features-preview/);
});
