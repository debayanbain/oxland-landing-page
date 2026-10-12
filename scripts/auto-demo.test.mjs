import assert from "node:assert/strict";
import test from "node:test";
import { AUTO_DEMO_DELAY_MS, autoDemoAllowedOnPage, startAutoDemo } from "../src/lib/autoDemo.ts";

function browserSession() {
  let now = 100_000;
  let sequence = 0;
  let lockQueue = Promise.resolve();
  const cookies = new Map();
  const writes = [];
  const timers = new Map();
  const newTab = () => {
    const listeners = new Set();
    let eligible = true;
    const environment = {
      arrivalTime: now,
      secure: true,
      now: () => now,
      readCookies: () => [...cookies].map(([name, value]) => `${name}=${value}`).join("; "),
      writeCookie: (cookie) => {
        writes.push(cookie);
        const [name, value] = cookie.split(";")[0].split("=");
        cookies.set(name, value);
      },
      eligible: () => eligible,
      schedule: (callback, delay) => {
        const id = ++sequence;
        timers.set(id, { at: now + delay, callback });
        return () => timers.delete(id);
      },
      subscribe: (callback) => {
        listeners.add(callback);
        return () => listeners.delete(callback);
      },
      exclusive: (callback) => {
        const result = lockQueue.then(callback);
        lockQueue = result.catch(() => {});
        return result;
      },
    };
    return { environment, setEligible: (value) => { eligible = value; }, activate: () => listeners.forEach((callback) => callback()) };
  };
  const advance = async (milliseconds) => {
    now += milliseconds;
    for (const [id, timer] of [...timers]) {
      if (timer.at <= now) {
        timers.delete(id);
        timer.callback();
      }
    }
    await lockQueue;
  };
  return { newTab, advance, cookies, writes };
}

test("opens after 10 seconds and records a session-only cookie", async () => {
  const session = browserSession();
  let opened = 0;
  startAutoDemo(() => opened++, session.newTab().environment);
  await session.advance(AUTO_DEMO_DELAY_MS - 1);
  assert.equal(opened, 0);
  await session.advance(1);
  assert.equal(opened, 1);
  assert.equal(session.cookies.get("oxland_demo_seen"), "1");
  for (const cookie of session.writes) {
    assert.match(cookie, /Path=\/; SameSite=Lax; Secure$/);
    assert.doesNotMatch(cookie, /Expires|Max-Age/i);
  }
});

test("navigation preserves the first arrival countdown rather than restarting it", async () => {
  const session = browserSession();
  let opened = 0;
  const firstPage = startAutoDemo(() => opened++, session.newTab().environment);
  await session.advance(4_000);
  firstPage.dispose();
  startAutoDemo(() => opened++, session.newTab().environment);
  await session.advance(5_999);
  assert.equal(opened, 0);
  await session.advance(1);
  assert.equal(opened, 1);
});

test("simultaneous tabs only open one popup, and subsequent tabs remain suppressed", async () => {
  const session = browserSession();
  let opened = 0;
  startAutoDemo(() => opened++, session.newTab().environment);
  startAutoDemo(() => opened++, session.newTab().environment);
  await session.advance(10_000);
  assert.equal(opened, 1);
  startAutoDemo(() => opened++, session.newTab().environment);
  await session.advance(20_000);
  assert.equal(opened, 1);
  const freshSession = browserSession();
  startAutoDemo(() => opened++, freshSession.newTab().environment);
  await freshSession.advance(10_000);
  assert.equal(opened, 2);
});

test("waits for an eligible active page instead of consuming the invitation in a background tab", async () => {
  const session = browserSession();
  const tab = session.newTab();
  tab.setEligible(false);
  let opened = 0;
  startAutoDemo(() => opened++, tab.environment);
  await session.advance(10_000);
  assert.equal(opened, 0);
  assert.equal(session.cookies.has("oxland_demo_seen"), false);
  tab.setEligible(true);
  tab.activate();
  await session.advance(0);
  assert.equal(opened, 1);
});

test("manual opening or successful contact submission prevents a later automatic popup", async () => {
  const session = browserSession();
  let opened = 0;
  const controller = startAutoDemo(() => opened++, session.newTab().environment);
  startAutoDemo(() => opened++, session.newTab().environment);
  await session.advance(2_000);
  controller.markShown();
  await session.advance(20_000);
  assert.equal(opened, 0);
  assert.equal(session.cookies.get("oxland_demo_seen"), "1");
});

test("blocked cookies and disposed controllers never auto-open", async () => {
  const session = browserSession();
  const tab = session.newTab();
  tab.environment.writeCookie = () => {};
  let opened = 0;
  const blocked = startAutoDemo(() => opened++, tab.environment);
  blocked.markShown(); // Must not prevent a manual CTA from working.
  const disposed = startAutoDemo(() => opened++, session.newTab().environment);
  disposed.dispose();
  await session.advance(20_000);
  assert.equal(opened, 0);
});

test("automatic opening skips contact, preview, and error pages", () => {
  for (const path of ["/contact", "/contact/", "/features-preview", "/404", "/404.html", "/500/"]) {
    assert.equal(autoDemoAllowedOnPage(path), false);
  }
  for (const path of ["/", "/features", "/pricing", "/blog/example", "/about"]) {
    assert.equal(autoDemoAllowedOnPage(path), true);
  }
});
