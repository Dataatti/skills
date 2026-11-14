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

  var GA_ID = "G-KETTLE01";
  function deleteAnalyticsCookies() {
    document.cookie.split("; ").forEach(function (c) {
      var name = c.split("=")[0];
      if (name === "_ga" || name.indexOf("_ga_") === 0) {
        [location.hostname, "." + location.hostname, ""].forEach(function (d) {
          document.cookie = name + "=; Max-Age=0; Path=/" + (d ? "; Domain=" + d : "");
        });
      }
    });
  }
  function applyConsent(choices) {
    window["ga-disable-" + GA_ID] = !choices.analytics;
    if (!choices.analytics) { deleteAnalyticsCookies(); return; }
    if (!window.__kcAnalyticsLoaded) {
      window.__kcAnalyticsLoaded = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { dataLayer.push(arguments); };
      gtag("js", new Date());
      gtag("config", GA_ID, { cookie_expires: 60 * 60 * 24 * 60 }); // _ga cookies expire after 2 months
      var s = document.createElement("script");
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
      s.async = true;
      document.head.appendChild(s);
    }
    // marketing: no marketing tags are used today; category kept for future use.
  }

  var returnFocusTo = null;
  function showBanner(trigger) {
    var existing = readConsent();
    if (existing) {
      document.getElementById("c-analytics").checked = !!existing.choices.analytics;
      document.getElementById("c-marketing").checked = !!existing.choices.marketing;
    }
    document.getElementById("consent-banner").hidden = false; document.body.classList.add("banner-open");
    if (trigger) { returnFocusTo = trigger; document.getElementById("consent-title").focus(); }
  }
  function hideBanner() {
    document.getElementById("consent-banner").hidden = true; document.body.classList.remove("banner-open");
    if (returnFocusTo) { returnFocusTo.focus(); returnFocusTo = null; }
    else { var m = document.getElementById("main"); if (m) m.focus({ preventScroll: true }); }
  }

  function boot() {
    var gpc = navigator.globalPrivacyControl === true;
    var gpcStatus = document.getElementById("gpc-status");
    if (gpc && gpcStatus) gpcStatus.hidden = false;
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
      this.setAttribute("aria-expanded", "true");
      document.getElementById("c-analytics").focus();
    });
    document.getElementById("consent-save").addEventListener("click", function () {
      saveConsent({
        necessary: true,
        analytics: document.getElementById("c-analytics").checked,
        marketing: document.getElementById("c-marketing").checked
      }, "custom");
    });
    var link = document.getElementById("cookie-settings-link");
    if (link) { link.setAttribute("role", "button"); link.addEventListener("click", function (e) { e.preventDefault(); showBanner(link); }); }
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
