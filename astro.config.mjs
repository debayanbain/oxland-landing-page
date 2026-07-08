import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";

// astro.config runs in Node; loadEnv pulls .env values into this scope (Astro
// does not auto-populate process.env here). CI can also supply them as real env.
const env = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");
const { SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN } = env;

// https://astro.build/config
export default defineConfig({
  site: "https://oxland.in",
  integrations: [
    // Sentry first so it can instrument the rest of the build.
    sentry({
      // DSN + client options live in sentry.client.config.js.
      // Source maps are only uploaded when an auth token is present (CI/build),
      // so local builds without the token still succeed.
      sourceMapsUploadOptions: {
        org: SENTRY_ORG,
        project: SENTRY_PROJECT,
        authToken: SENTRY_AUTH_TOKEN,
      },
    }),
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !page.includes("/features-preview"),
    }),
  ],
  vite: {
    server: {
      allowedHosts: [".ngrok-free.dev"],
    },
  },
});
