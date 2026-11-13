// Consent manager for Kettle & Co.
// - Nothing non-essential loads until the visitor opts in.
// - "Reject all" sits next to "Accept all" on the first layer, same size and style.
// - Categories are opt-in (unticked by default) and can be changed at any time via the
//   "Cookie settings" link in the footer.
// - Global Privacy Control is treated as an opt-out of analytics + marketing.
// - Every decision is recorded (id, timestamp, policy version, choices) and sent to the
//   consent log endpoint so that consent can be demonstrated (GDPR Art. 7(1)).
(function () {
  var POLICY_VERSION = "2026-10-01";
  var COOKIE = "kc_consent";
  var MAX_AGE_DAYS = 180; // re-ask after 6 months (CNIL recommendation)

  function readConsent() {
    var m = document.cookie.match(/(?:^|; )kc_consent=([^;]*)/);
    if (!m) return null;
    try { var c = JSON.parse(decodeURIComponent(m[1])); return c.version === POLICY_VERSION ? c : null; }
    catch (e) { return null; }
  }

  function saveConsent(choices, source) {
    var record = {
      id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
      ts: new Date().toISOString(),
      version: POLICY_VERSION,
      source: source,
      choices: choices
    };
    document.cookie = COOKIE + "=" + encodeURIComponent(JSON.stringify(record)) +
      "; Max-Age=" + (MAX_AGE_DAYS * 86400) + "; Path=/; SameSite=Lax";
    try { navigator.sendBeacon("/api/consent-log", JSON.stringify(record)); } catch (e) {}
    applyConsent(record.choices);
    hideBanner();
  }

  function applyConsent(choices) {
    if (choices.analytics && !window.__kcAnalyticsLoaded) {
      window.__kcAnalyticsLoaded = true;
      var s = document.createElement("script");
      s.src = "https://www.googletagmanager.com/gtag/js?id=G-KETTLE01";
      s.async = true;
      document.head.appendChild(s);
    }
    // marketing: no marketing tags are used today; category kept for future use.
  }

  function showBanner(focus) {
    document.getElementById("consent-banner").hidden = false; document.body.classList.add("banner-open");
    if (focus) document.getElementById("consent-title").focus();
  }
  function hideBanner() { document.getElementById("consent-banner").hidden = true; document.body.classList.remove("banner-open"); }

  function boot() {
    var gpc = navigator.globalPrivacyControl === true;
    var existing = readConsent();
    if (existing) {
      if (gpc) { existing.choices.marketing = false; existing.choices.analytics = false; }
      applyConsent(existing.choices);
    } else if (gpc) {
      saveConsent({ necessary: true, analytics: false, marketing: false }, "gpc");
    } else {
      showBanner();
    }

    document.getElementById("consent-accept").addEventListener("click", function () {
      saveConsent({ necessary: true, analytics: true, marketing: true }, "accept-all");
    });
    document.getElementById("consent-reject").addEventListener("click", function () {
      saveConsent({ necessary: true, analytics: false, marketing: false }, "reject-all");
    });
    document.getElementById("consent-customise").addEventListener("click", function () {
      document.getElementById("consent-prefs").hidden = false;
    });
    document.getElementById("consent-save").addEventListener("click", function () {
      saveConsent({
        necessary: true,
        analytics: document.getElementById("c-analytics").checked,
        marketing: document.getElementById("c-marketing").checked
      }, "custom");
    });
    var link = document.getElementById("cookie-settings-link");
    if (link) link.addEventListener("click", function (e) { e.preventDefault(); showBanner(true); });
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
