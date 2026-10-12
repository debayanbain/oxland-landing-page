export const AUTO_DEMO_DELAY_MS = 10_000;
const START_COOKIE = "oxland_demo_started";
const SEEN_COOKIE = "oxland_demo_seen";

type Environment = {
  readCookies: () => string;
  writeCookie: (cookie: string) => void;
  now: () => number;
  arrivalTime: number;
  secure: boolean;
  eligible: () => boolean;
  schedule: (callback: () => void, delay: number) => () => void;
  subscribe: (callback: () => void) => () => void;
  exclusive: (callback: () => void) => Promise<void>;
};

function cookieValue(cookies: string, name: string) {
  return cookies.split(";").map((cookie) => cookie.trim()).find((cookie) => cookie.startsWith(name + "="))?.slice(name.length + 1);
}

export function autoDemoAllowedOnPage(pathname: string) {
  return !/^\/(?:contact|features-preview|404|500)(?:\/|\.html|$)/.test(pathname);
}

export function startAutoDemo(onOpen: () => void, environment: Environment) {
  let stopped = false;
  let cancelTimer = () => {};
  let unsubscribe = () => {};
  const stop = () => {
    stopped = true;
    cancelTimer();
    unsubscribe();
  };
  const seen = () => cookieValue(environment.readCookies(), SEEN_COOKIE) === "1";
  const write = (name: string, value: string) => {
    // No Expires or Max-Age: the marker lasts for this browser session only.
    environment.writeCookie(`${name}=${value}; Path=/; SameSite=Lax${environment.secure ? "; Secure" : ""}`);
  };
  const markShown = () => {
    try { write(SEEN_COOKIE, "1"); } catch { /* Manual opening still works with cookies blocked. */ }
    stop();
  };
  const check = () => {
    cancelTimer();
    if (stopped) return;
    try {
      if (seen()) return stop();
      let started = Number(cookieValue(environment.readCookies(), START_COOKIE));
      if (!Number.isFinite(started) || started <= 0 || started > environment.now()) {
        started = environment.arrivalTime;
        write(START_COOKIE, String(started));
        // Suppress automatic opening if the browser cannot remember the session.
        if (cookieValue(environment.readCookies(), START_COOKIE) !== String(started)) return stop();
      }
      const remaining = started + AUTO_DEMO_DELAY_MS - environment.now();
      if (remaining > 0) {
        cancelTimer = environment.schedule(check, remaining);
        return;
      }
      if (!environment.eligible()) return;
      // Recheck inside a cross-tab lock, so simultaneous timers only open once.
      void environment.exclusive(() => {
        if (stopped) return;
        if (seen()) return stop();
        if (!environment.eligible()) return;
        write(SEEN_COOKIE, "1");
        if (!seen()) return stop();
        stop();
        onOpen();
      }).catch(stop);
    } catch {
      stop();
    }
  };
  unsubscribe = environment.subscribe(check);
  check();
  return { markShown, dispose: stop };
}

export function browserAutoDemo(onOpen: () => void) {
  let formStarted = false;
  return startAutoDemo(onOpen, {
    readCookies: () => document.cookie,
    writeCookie: (cookie) => { document.cookie = cookie; },
    now: () => Date.now(),
    arrivalTime: Math.floor(performance.timeOrigin),
    secure: window.location.protocol === "https:",
    eligible: () => autoDemoAllowedOnPage(window.location.pathname)
      && document.visibilityState === "visible"
      && !formStarted
      && !document.activeElement?.matches("input, textarea, select, [contenteditable='true']")
      && !document.querySelector('[role="dialog"][aria-modal="true"]'),
    schedule: (callback, delay) => {
      const timer = window.setTimeout(callback, delay);
      return () => window.clearTimeout(timer);
    },
    subscribe: (callback) => {
      const onInput = (event: Event) => {
        if ((event.target as Element)?.closest("form")) formStarted = true;
      };
      document.addEventListener("visibilitychange", callback);
      window.addEventListener("focus", callback);
      document.addEventListener("focusout", callback);
      document.addEventListener("input", onInput);
      return () => {
        document.removeEventListener("visibilitychange", callback);
        window.removeEventListener("focus", callback);
        document.removeEventListener("focusout", callback);
        document.removeEventListener("input", onInput);
      };
    },
    exclusive: async (callback) => {
      if (navigator.locks) await navigator.locks.request("oxland:auto-demo", callback);
      else callback();
    },
  });
}
