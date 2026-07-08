import * as Sentry from "@sentry/astro";

// Static site → browser-side error + performance tracking only.
// DSN is exposed to the client, so it must be a PUBLIC_ env var.
const dsn = import.meta.env.PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    // Sample 10% of transactions for performance; tune as traffic grows.
    tracesSampleRate: 0.1,
    enableLogs: true,
    integrations: [Sentry.replayIntegration()],
    // Replay: low sample on normal sessions, full capture when an error fires.
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}
