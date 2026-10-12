import { readFile, readdir, rm, stat } from "node:fs/promises";
import { dirname, extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "parse5";
import sitemap from "@astrojs/sitemap";

const IMAGE_EXTENSION = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i;
const SOURCE_EXTENSIONS = [".astro", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".css"];
const pathKey = (pathname) => pathname.replace(/\/$/, "") || "/";

export function isPublicPage(url) {
  return !/^\/(?:features-preview|404|500)(?:\/|\.html|$)/.test(new URL(url).pathname);
}

function walk(node, visit) {
  visit(node);
  for (const child of node.childNodes ?? []) walk(child, visit);
  if (node.content) walk(node.content, visit);
}

function literalImages(text) {
  // Includes quoted image paths in data arrays and CSS url(...) backgrounds.
  return [...text.matchAll(/["'`(]((?:https?:\/\/|\/)[^"'`<>\r\n]*?\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#][^"'`<>\s]*)?)(?=["'`)])/gi)]
    .map((match) => match[1]);
}

async function htmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(path));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(path);
  }
  return files;
}

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") return false;
    throw error;
  }
}

async function sourceImages(sourceFile, root, cache, visited = new Set()) {
  if (!sourceFile || visited.has(sourceFile)) return [];
  visited.add(sourceFile);
  if (!cache.has(sourceFile)) cache.set(sourceFile, readFile(sourceFile, "utf8"));
  const source = await cache.get(sourceFile);
  const images = literalImages(source);
  // Follow static imports, side-effect imports, and lazy import(...) calls.
  for (const match of source.matchAll(/\b(?:from\s*|import\s*(?:\(\s*)?)["']([^"']+)["']/g)) {
    const specifier = match[1];
    if (!specifier.startsWith("@/") && !specifier.startsWith(".")) continue;
    const base = specifier.startsWith("@/")
      ? resolve(root, "src", specifier.slice(2))
      : resolve(dirname(sourceFile), specifier);
    const candidates = extname(base)
      ? [base]
      : [...SOURCE_EXTENSIONS.map((ext) => base + ext), ...SOURCE_EXTENSIONS.map((ext) => resolve(base, "index" + ext))];
    for (const candidate of candidates) {
      if (SOURCE_EXTENSIONS.includes(extname(candidate)) && await isFile(candidate)) {
        images.push(...await sourceImages(candidate, root, cache, visited));
        break;
      }
    }
  }
  return images;
}

export async function collectPageImages({ html, pageUrl, sourceFile, root, outDir, cache = new Map(), missing = new Set() }) {
  const document = parse(html);
  const candidates = [];
  let canonical = pageUrl;
  let noindex = false;
  walk(document, (node) => {
    const attrs = Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
    if (node.tagName === "link" && attrs.rel?.split(/\s+/).includes("canonical") && attrs.href) {
      canonical = new URL(attrs.href, pageUrl).href;
    }
    if (node.tagName === "meta" && /^(?:robots|googlebot)$/i.test(attrs.name ?? "") && /\bnoindex\b/i.test(attrs.content ?? "")) {
      noindex = true;
    }
    if (["img", "source", "image"].includes(node.tagName)) {
      for (const name of ["src", "href", "xlink:href", "data-src"]) {
        if (attrs[name]) candidates.push(attrs[name]);
      }
      for (const name of ["srcset", "data-srcset"]) {
        if (attrs[name]) candidates.push(...attrs[name].split(",").map((entry) => entry.trim().split(/\s+/)[0]));
      }
    }
    if (attrs.style) candidates.push(...literalImages(attrs.style));
    if (node.tagName === "style") {
      for (const child of node.childNodes ?? []) candidates.push(...literalImages(child.value ?? ""));
    }
  });
  if (noindex) return undefined;
  const canonicalUrl = new URL(canonical);
  if (canonicalUrl.origin !== new URL(pageUrl).origin || canonicalUrl.search || canonicalUrl.hash) {
    throw new Error(`Invalid sitemap canonical URL: ${canonical}`);
  }
  candidates.push(...await sourceImages(sourceFile, root, cache));
  const images = new Set();
  for (const candidate of candidates) {
    if (!candidate || /^(?:data:|blob:|#)/i.test(candidate)) continue;
    const url = new URL(candidate, canonical);
    if (!/^https?:$/.test(url.protocol) || !IMAGE_EXTENSION.test(url.pathname)) continue;
    url.hash = "";
    if (url.origin === canonicalUrl.origin) {
      const imageFile = resolve(outDir, "." + decodeURIComponent(url.pathname));
      const localPath = relative(outDir, imageFile);
      if (localPath === ".." || localPath.startsWith(".." + sep) || isAbsolute(localPath)) {
        throw new Error(`Image path outside build output: ${url.href}`);
      }
      if (!await isFile(imageFile)) {
        missing.add(url.href);
        continue;
      }
    }
    images.add(url.href);
  }
  if (images.size > 1000) throw new Error(`Too many sitemap images on ${canonical}`);
  return { url: canonical, img: [...images].sort().map((url) => ({ url })) };
}

export default function imageSitemap() {
  const entries = new Map();
  let config;
  let routes;
  const integration = sitemap({
    filter: isPublicPage,
    namespaces: { image: true, news: false, video: false, xhtml: false },
    serialize: (item) => entries.get(pathKey(new URL(item.url).pathname)),
  });
  return {
    ...integration,
    name: "oxland:image-sitemap",
    hooks: {
      ...integration.hooks,
      "astro:config:done": async (context) => {
        config = context.config;
        await integration.hooks["astro:config:done"](context);
      },
      "astro:routes:resolved": async (context) => {
        routes = context.routes;
        await integration.hooks["astro:routes:resolved"](context);
      },
      "astro:build:done": async (context) => {
        entries.clear();
        const root = fileURLToPath(config.root);
        const outDir = fileURLToPath(context.dir);
        const cache = new Map();
        const missing = new Set();
        for (const file of await htmlFiles(outDir)) {
          const outputPath = relative(outDir, file).split(sep).join("/");
          const pathname = "/" + outputPath.replace(/(?:^|\/)index\.html$/, "").replace(/\.html$/, "");
          const pageUrl = new URL(pathname, config.site).href;
          if (!isPublicPage(pageUrl)) continue;
          const route = routes.find((route) => route.type === "page" && route.patternRegex.test(pathname));
          if (!route) throw new Error(`No source route found for ${pathname}`);
          const sourceFile = route.entrypoint.startsWith("file:") ? fileURLToPath(route.entrypoint) : resolve(root, route.entrypoint);
          const entry = await collectPageImages({ html: await readFile(file, "utf8"), pageUrl, sourceFile, root, outDir, cache, missing });
          if (entry) entries.set(pathKey(new URL(pageUrl).pathname), entry);
        }
        for (const url of missing) context.logger.warn(`Missing image omitted from sitemap: ${url}`);
        await rm(resolve(outDir, "sitemap-index.xml"), { force: true });
        await integration.hooks["astro:build:done"](context);
        // Fail instead of silently deploying an absent sitemap.
        if (!await isFile(resolve(outDir, "sitemap-index.xml"))) throw new Error("Sitemap generation failed");
        const imageCount = [...entries.values()].reduce((total, entry) => total + entry.img.length, 0);
        context.logger.info(`Validated ${entries.size} public pages and ${imageCount} page/image entries.`);
      },
    },
  };
}
