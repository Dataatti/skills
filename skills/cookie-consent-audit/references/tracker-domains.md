# Common trackers and strictly-necessary cookies

> Not legal advice. A name or domain match is a **lead**, not proof. Confirm the purpose from the site's own configuration and the vendor docs. Cookie names and lifetimes change; recheck the vendor pages linked here.
> Sources checked as of 2026-11-12.

**Scope reminder:** ePD Art. 5(3) covers cookies **and** localStorage/sessionStorage/IndexedDB, pixels, link-decoration IDs and fingerprinting, whether first-party or third-party ([EDPB Gl. 2/2023](https://edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)). A request to a tracking domain before consent is a finding even when no cookie is set.

## 1. Tracking and advertising domains (network requests)

| Domain / endpoint | Vendor | Category | Note |
|---|---|---|---|
| `www.googletagmanager.com` (`/gtm.js`, `/gtag/js`) | Google | Tag loader (fires analytics/ads tags) | The loader itself is not a cookie, but check which tags it fires before consent ([GA4 tagging](https://developers.google.com/analytics/devguides/collection/ga4/tag-options)). |
| `www.google-analytics.com`, `region1.google-analytics.com`, `analytics.google.com` | Google Analytics 4 | Analytics | `/g/collect` hits ([GA4 cookies](https://developers.google.com/analytics/devguides/collection/ga4/cookie-usage)) |
| `*.doubleclick.net` (`stats.g.`, `googleads.g.`, `ad.`) | Google Ads / Marketing Platform | Advertising | Sets `IDE` ([Google cookies](https://policies.google.com/technologies/cookies?hl=en-US)) |
| `googlesyndication.com`, `googleadservices.com`, `adservice.google.com` | Google Ads | Advertising / conversion | same source |
| `connect.facebook.net` (`fbevents.js`), `www.facebook.com/tr` | Meta Pixel | Advertising | Sets `_fbp`/`_fbc` ([Meta docs](https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/fbp-and-fbc)) |
| `*.clarity.ms` | Microsoft Clarity | Analytics / session replay | ([Clarity cookies](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies)) |
| `*.hotjar.com`, `*.hotjar.io` | Hotjar (Contentsquare) | Analytics / session replay / heatmaps | ([Hotjar privacy](https://www.hotjar.com/legal/policies/privacy-v4/)) |
| `snap.licdn.com`, `px.ads.linkedin.com` | LinkedIn Insight Tag | Advertising / analytics | ([LinkedIn cookie table](https://www.linkedin.com/legal/l/cookie-table)) |
| `analytics.tiktok.com` | TikTok Pixel | Advertising | Sets `_ttp`/`ttclid` ([TikTok pixel cookies](https://ads.tiktok.com/help/article/using-cookies-with-tiktok-pixel?lang=en)) |

## 2. Cookie names (non-essential: consent required in the EU)

| Cookie | Set by | Category | Lifetime (vendor default) | Source |
|---|---|---|---|---|
| `_ga` | GA4 (1st-party) | Analytics: distinguishes users | 2 years | [Google GA4](https://developers.google.com/analytics/devguides/collection/ga4/cookie-usage) |
| `_ga_<container-id>` | GA4 | Analytics: session state | 2 years | same |
| `_gid`, `_gat` | Universal Analytics (legacy, sunset) | Analytics | 24h / 1 min | still seen on old setups; [Google cookies](https://policies.google.com/technologies/cookies?hl=en-US) |
| `_gcl_au`, `_gcl_aw` | Google Ads conversion linker | Advertising | ~90 days | [Google cookies](https://policies.google.com/technologies/cookies?hl=en-US) |
| `IDE`, `test_cookie` | doubleclick.net | Advertising | IDE ~13 months | same |
| `NID` | google.com | Advertising / preferences | ~6 months | same |
| `_fbp` | Meta Pixel (1st-party) | Advertising: browser ID | ~90 days | [Meta docs](https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/fbp-and-fbc) |
| `_fbc` | Meta Pixel (from `fbclid`) | Advertising: click ID | 90 days recommended | same |
| `fr` | facebook.com (3rd-party) | Advertising | ~90 days | [Meta cookies policy](https://www.facebook.com/policy/cookies/) |
| `_clck`, `_clsk` | Clarity (1st-party) | Analytics / session replay | 1 year / 1 day | [Clarity](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies) |
| `MUID`, `CLID` | Microsoft (3rd-party) | Advertising / analytics | ~1 year | same |
| `_hjSessionUser_<id>`, `_hjSession_<id>` | Hotjar | Analytics / session replay | ~1 year / 30 min | Hotjar docs (names **not re-verified** in this pass) |
| `li_sugr`, `UserMatchHistory`, `bcookie`, `lidc` | LinkedIn | Advertising | 90d / 30d / 1y / 1d | [LinkedIn cookie table](https://www.linkedin.com/legal/l/cookie-table) |
| `AnalyticsSyncHistory` | LinkedIn | Analytics | 30 days | same |
| `_ttp`, `ttclid` | TikTok Pixel | Advertising | 13 months (help article) vs 1 year (cookies policy) | [TikTok help](https://ads.tiktok.com/help/article/using-cookies-with-tiktok-pixel?lang=en), [TikTok policy](https://www.tiktok.com/legal/page/global/tiktok-website-cookies-policy/en) |

**Vendor sources disagree:** TikTok's own pages give two different `_ttp` lifetimes. LinkedIn's `bcookie` purpose is described differently across versions of its table. Record what you observe on the site.

**"Consent mode" and cookieless pings:** Google Consent Mode can send **cookieless pings** to Google when consent is denied ([Google data collection](https://support.google.com/analytics/answer/11593727?hl=en)). Clarity runs consent mode by default for EEA, UK and CH visitors ([Clarity consent mode](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode)). Under EDPB Gl. 2/2023, sending a request that reads device or JS-generated information can still fall within Art. 5(3). **Flag pre-consent pings as a finding to review**; do not auto-pass them.

## 3. Typically strictly necessary (exempt from consent)

Basis: ePD Art. 5(3) exemption ([EUR-Lex](https://eur-lex.europa.eu/eli/dir/2002/58/oj)), WP29 Opinion 04/2012 ([PDF](https://ec.europa.eu/justice/article-29/documentation/opinion-recommendation/files/2012/wp194_en.pdf)), CNIL's exempt list ([CNIL](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/lignes-directrices-modificatives-et-recommandation)), and Traficom (only for transmitting a message or a service the user explicitly requested) ([Traficom](https://www.kyberturvallisuuskeskus.fi/fi/toimintamme/saantely-ja-valvonta/evasteet)).

| Purpose (regulator category) | Typical names (framework defaults; confirm the purpose) | Condition |
|---|---|---|
| Session / user-input (shopping cart, form state) | `PHPSESSID`, `JSESSIONID`, `ASP.NET_SessionId`, `connect.sid`, `laravel_session`, cart cookies | Session-length or short. Not reused for analytics or ads. |
| Authentication (logged-in session) | `sessionid`, framework auth cookies | Only after the user logs in. Persistent "remember me" needs justification. |
| User-centric security | CSRF tokens (`csrftoken`, `XSRF-TOKEN`, `__RequestVerificationToken`), bot or abuse protection such as Cloudflare `__cf_bm` | Security purpose only. |
| Load balancing | `AWSALB`, `AWSALBCORS`, `SERVERID`, `ARRAffinity` | Session-length routing only. |
| Consent cookie itself | `OptanonConsent`/`OptanonAlertBoxClosed` (OneTrust), `CookieConsent` (Cookiebot), `euconsent-v2` (IAB TCF TC string), `axeptio_*`, `didomi_token`, `cookieyes-consent` | Stores **only** the user's choice. Note: the CJEU held the TCF TC string can be personal data (IAB Europe, C-604/22, 7 Mar 2024, [CURIA](https://curia.europa.eu/juris/liste.jsf?num=C-604/22)), so it must be secured and documented. |
| UI preference explicitly chosen by the user | language or currency selector, accessibility settings | Session-length, or a few hours longer. |
| Multimedia player session (technical playback) | player buffering cookies | Not third-party tracking (YouTube/Vimeo embeds still set tracking storage, so use click-to-load). |

**Not strictly necessary** under EU guidance, even if the CMP labels them so:
- analytics (unless national exemption conditions are met, e.g. the CNIL audience-measurement conditions)
- A/B testing tied to analytics
- session replay or heatmaps
- advertising, retargeting, conversion
- social plugins for non-logged-in users
- fingerprinting

(EDPB Taskforce on misclassification: [PDF](https://www.edpb.europa.eu/system/files/2023-01/edpb_20230118_report_cookie_banner_taskforce_en.pdf).)

**UK only:** first-party statistical analytics and "appearance" storage may be exempt under DUAA 2025, but only with a simple, free way to object ([ICO exceptions](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/)).
