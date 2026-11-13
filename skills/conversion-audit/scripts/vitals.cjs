#!/usr/bin/env node
// Lab measurement of load speed for CV-09, identical for every reviewer so their numbers compare.
//   node vitals.cjs <url> [<url> ...] [--desktop]
// Default profile: 375x667 mobile viewport, Chrome DevTools "Slow 4G" network
// (1.44 Mbit/s down, 675 kbit/s up, 562.5 ms RTT) and 4x CPU slowdown, fresh context per URL.
// Prints JSON per URL: ttfbMs, fcpMs, lcpMs, cls, loadMs, transferKB, requests, thirdPartyHosts.
// These are lab values from one run: report them as "lab, Slow 4G", not as field (CrUX) data.
const { launch } = require("./pw.cjs");

const args = process.argv.slice(2);
const desktop = args.includes("--desktop");
const urls = args.filter((a) => !a.startsWith("--"));
if (!urls.length) { console.error("usage: node vitals.cjs <url> [<url> ...] [--desktop]"); process.exit(1); }

(async () => {
  const browser = await launch();
  const out = [];
  for (const url of urls) {
    const context = await browser.newContext(desktop ? { viewport: { width: 1366, height: 768 } }
      : { viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const page = await context.newPage();
    if (!desktop) {
      const cdp = await context.newCDPSession(page);
      await cdp.send("Network.enable");
      await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 562.5,
        downloadThroughput: (1.44 * 1024 * 1024) / 8, uploadThroughput: (675 * 1024) / 8 });
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    }
    await page.addInitScript(() => {
      window.__v = { lcp: 0, cls: 0 };
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__v.lcp = e.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__v.cls += e.value; }).observe({ type: "layout-shift", buffered: true });
    });
    const host = new URL(url).hostname; const thirdParty = new Set(); let requests = 0;
    page.on("request", (r) => { requests++; const h = new URL(r.url()).hostname; if (h !== host) thirdParty.add(h); });
    let error = null;
    try { await page.goto(url, { waitUntil: "load", timeout: 60000 }); await page.waitForTimeout(1500); }
    catch (e) { error = String(e).split("\n")[0]; }
    const m = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0] || {};
      const fcp = performance.getEntriesByName("first-contentful-paint")[0];
      const kb = performance.getEntriesByType("resource").reduce((s, r) => s + (r.transferSize || 0), nav.transferSize || 0) / 1024;
      return { ttfbMs: Math.round(nav.responseStart || 0), fcpMs: fcp ? Math.round(fcp.startTime) : null,
        lcpMs: Math.round(window.__v.lcp) || null, cls: Math.round(window.__v.cls * 1000) / 1000,
        loadMs: Math.round(nav.loadEventEnd || 0), transferKB: Math.round(kb) };
    }).catch(() => ({}));
    out.push({ url, profile: desktop ? "desktop, unthrottled" : "mobile 375x667, Slow 4G, 4x CPU", ...m, requests, thirdPartyHosts: [...thirdParty], error });
    await context.close();
  }
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})();
