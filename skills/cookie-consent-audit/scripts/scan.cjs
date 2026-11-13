#!/usr/bin/env node
// Fresh-profile cookie/storage/request inventory for cookie-consent-audit.
// Usage:
//   node scan.cjs <url> [--gpc] [--click "<button text>"] [--wait 3000] [--block-third-party]
// Prints JSON: { before: {...}, after: {...} | null } where each phase lists
// cookies, localStorage, sessionStorage and third-party requests.
// --gpc               send Sec-GPC: 1 and set navigator.globalPrivacyControl = true
// --click "<text>"    after the "before" snapshot, click the first button/link with this text
//                     (e.g. "Reject all") and take a second snapshot
// --block-third-party abort third-party requests after recording them (offline / fast runs)
// Requires Playwright (`npm i -D playwright && npx playwright install chromium`).
function loadPlaywright() {
  const paths = [process.cwd()];
  try { paths.push(require("child_process").execSync("npm root -g", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim()); } catch (e) {}
  for (const p of (process.env.NODE_PATH || "").split(":").filter(Boolean)) paths.push(p);
  try { return require("playwright"); } catch (e) {}
  for (const p of paths) { try { return require(require.resolve("playwright", { paths: [p] })); } catch (e) {} }
  console.error(JSON.stringify({ error: "playwright-not-installed",
    hint: "Install with: npm i -D playwright && npx playwright install chromium — or use another browser tool, or fall back to code review." }));
  process.exit(2);
}
// Some sandboxes make the default temp dir read-only; Playwright needs a writable one.
(function ensureWritableTmp() {
  const fs = require("fs"), os = require("os"), path = require("path");
  for (const dir of [os.tmpdir(), "/tmp", path.join(process.cwd(), ".scan-tmp")]) {
    try { fs.mkdirSync(dir, { recursive: true }); fs.rmSync(fs.mkdtempSync(path.join(dir, "w-")), { recursive: true }); process.env.TMPDIR = dir; return; } catch (e) {}
  }
})();
// Sandboxes may redirect $HOME, hiding the installed browsers; look in the usual places.
(function findBrowsers() {
  if (process.env.PLAYWRIGHT_BROWSERS_PATH) return;
  const fs = require("fs"), os = require("os"), path = require("path");
  let realHome = ""; try { realHome = os.userInfo().homedir; } catch (e) {}
  const candidates = [path.join(os.homedir(), ".cache/ms-playwright"), realHome && path.join(realHome, ".cache/ms-playwright"), "/opt/pw-browsers", "/ms-playwright"];
  for (const c of candidates) { if (c && fs.existsSync(c) && fs.readdirSync(c).some((d) => d.startsWith("chromium"))) { process.env.PLAYWRIGHT_BROWSERS_PATH = c; return; } }
})();
const { chromium } = loadPlaywright();

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith("--") && !isValueOf(a));
function opt(name) { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; }
function isValueOf(a) { const i = args.indexOf(a); return i > 0 && ["--click", "--wait"].includes(args[i - 1]); }
if (!url) { console.error("usage: node scan.cjs <url> [--gpc] [--click text] [--wait ms] [--block-third-party]"); process.exit(1); }
const gpc = args.includes("--gpc");
const block = args.includes("--block-third-party");
const clickText = opt("--click");
const wait = Number(opt("--wait") || 3000);

function site(host) {
  const parts = host.replace(/^\[|\]$/g, "").split(".");
  return /^\d+$/.test(parts[parts.length - 1]) || parts.length < 2 ? host : parts.slice(-2).join(".");
}

(async () => {
  const browser = await chromium.launch(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {});
  const context = await browser.newContext(gpc ? { extraHTTPHeaders: { "Sec-GPC": "1" } } : {});
  if (gpc) await context.addInitScript(() => Object.defineProperty(Navigator.prototype, "globalPrivacyControl", { get: () => true }));
  const firstParty = site(new URL(url).hostname);
  let phase = "before";
  const requests = { before: [], after: [] };
  await context.route("**/*", (route) => {
    const u = new URL(route.request().url());
    const third = !["localhost", "127.0.0.1"].includes(u.hostname) && site(u.hostname) !== firstParty;
    if (third) requests[phase].push({ url: u.origin + u.pathname, host: u.hostname, type: route.request().resourceType() });
    if (third && block) return route.abort();
    return route.continue();
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(String(e)));
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 }).catch((e) => consoleErrors.push(String(e)));
  await page.waitForTimeout(wait);

  async function snapshot(p) {
    const cookies = (await context.cookies()).map((c) => ({ name: c.name, domain: c.domain,
      expiresDays: c.expires > 0 ? Math.round((c.expires * 1000 - Date.now()) / 864e5) : "session" }));
    const storage = await page.evaluate(() => ({ localStorage: Object.keys(localStorage), sessionStorage: Object.keys(sessionStorage) })).catch(() => ({}));
    const dedup = [...new Map(requests[p].map((r) => [r.url, r])).values()];
    return { cookies, ...storage, thirdPartyRequests: dedup };
  }

  const out = { url, gpc, before: await snapshot("before"), after: null, clicked: null, consoleErrors };
  if (clickText) {
    phase = "after";
    const target = page.getByRole("button", { name: clickText }).or(page.getByRole("link", { name: clickText })).first();
    try {
      await target.click({ timeout: 3000 });
      out.clicked = clickText;
    } catch (e) { out.clicked = `NOT FOUND or not clickable on first layer: "${clickText}"`; }
    await page.waitForTimeout(wait);
    await page.reload({ waitUntil: "domcontentloaded" }).catch(() => {});
    await page.waitForTimeout(wait);
    out.after = await snapshot("after");
  }
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})();
