// Playwright loader that survives sandboxes and non-standard installs.
//   const { chromium, launch } = require("<skill-dir>/scripts/pw.cjs");
//   const browser = await launch();            // headless Chromium
//   node <skill-dir>/scripts/pw.cjs --check    // prints {"ok":true,...} or the reason it can't launch
// It (1) finds Playwright in the project, the global npm root or NODE_PATH, (2) points
// TMPDIR at a writable folder when the default temp dir is read-only, and (3) finds the
// installed browsers when $HOME has been redirected.
const fs = require("fs"), os = require("os"), path = require("path");

for (const dir of [process.env.TMPDIR, os.tmpdir(), "/tmp", path.join(process.cwd(), ".pw-tmp")].filter(Boolean)) {
  try { fs.mkdirSync(dir, { recursive: true }); fs.rmSync(fs.mkdtempSync(path.join(dir, "w-")), { recursive: true }); process.env.TMPDIR = dir; break; } catch (e) {}
}
if (!process.env.PLAYWRIGHT_BROWSERS_PATH) {
  let realHome = ""; try { realHome = os.userInfo().homedir; } catch (e) {}
  for (const c of [path.join(os.homedir(), ".cache/ms-playwright"), realHome && path.join(realHome, ".cache/ms-playwright"), "/opt/pw-browsers", "/ms-playwright"]) {
    try { if (c && fs.readdirSync(c).some((d) => d.startsWith("chromium"))) { process.env.PLAYWRIGHT_BROWSERS_PATH = c; break; } } catch (e) {}
  }
}
function load() {
  const paths = [process.cwd(), ...(process.env.NODE_PATH || "").split(":").filter(Boolean)];
  try { paths.push(require("child_process").execSync("npm root -g", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim()); } catch (e) {}
  try { return require("playwright"); } catch (e) {}
  for (const p of paths) { try { return require(require.resolve("playwright", { paths: [p] })); } catch (e) {} }
  return null;
}
const pw = load();
async function launch(opts = {}) {
  if (!pw) throw new Error("playwright-not-installed: npm i -D playwright && npx playwright install chromium");
  try { return await pw.chromium.launch(opts); }
  catch (e) { return await pw.chromium.launch({ ...opts, args: [...(opts.args || []), "--no-sandbox", "--disable-dev-shm-usage"] }); }
}
module.exports = { ...(pw || {}), launch };

if (require.main === module && process.argv.includes("--check")) {
  launch().then(async (b) => { console.log(JSON.stringify({ ok: true, version: b.version(), tmp: process.env.TMPDIR, browsers: process.env.PLAYWRIGHT_BROWSERS_PATH || "default" })); await b.close(); })
    .catch((e) => { console.log(JSON.stringify({ ok: false, error: String(e).split("\n")[0] })); process.exit(2); });
}
