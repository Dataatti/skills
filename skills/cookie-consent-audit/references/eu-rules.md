# EU / EEA (+ UK) cookie and consent rules

> Not legal advice. Use this file to decide which checks apply and which source backs each one.
> Sources checked as of 2026-11-12.

**Precedence rule for the audit:** where EDPB or national guidance is stricter or more specific than general commentary (CMP vendors, blogs), **the regulator's guidance wins**. For a site aimed at one Member State, that **national regulator** (e.g. CNIL, Traficom) has the final say on ePrivacy points. EDPB guidance sets the EU-wide floor.

---

## 1. Primary law

| Rule | What it says (summary) | Audit consequence |
|---|---|---|
| **ePrivacy Directive 2002/58/EC Art. 5(3)** ([EUR-Lex](https://eur-lex.europa.eu/eli/dir/2002/58/oj)) | Storing information, or gaining access to information already stored, in a user's terminal equipment needs **prior consent** with clear and comprehensive information. There are only two exemptions: (a) **sole purpose of transmitting** a communication; (b) **strictly necessary** for an information society service **explicitly requested** by the user. | Applies to *any* storage or access (cookies, localStorage, sessionStorage, IndexedDB, pixels, fingerprinting), whether or not the data is personal. |
| **GDPR Art. 4(11)** ([EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj)) | Consent must be **freely given, specific, informed and unambiguous**, given by a statement or a **clear affirmative action**. | ePrivacy consent takes its meaning from the GDPR (ePD Art. 2(f) as read with GDPR Art. 94). |
| **GDPR Art. 7(1)** | The controller must be able to **demonstrate** that consent was given. | Proof of consent (consent logs) is required. |
| **GDPR Art. 7(2)** | A consent request must be clearly distinguishable from other matters, in clear and plain language. | No consent hidden in the T&Cs or the privacy policy. |
| **GDPR Art. 7(3)** | The right to withdraw at any time; **withdrawing must be as easy as giving consent**. | A persistent and easy route back to the consent settings. |
| **GDPR Art. 7(4)** | Consent is not freely given if a service is made conditional on consent that is not necessary for it. | This is the basis for treating cookie walls as a risk. |
| **GDPR Recital 32** ([EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj)) | "**Silence, pre-ticked boxes or inactivity** should not … constitute consent." Consent must cover all purposes. | No pre-ticked boxes, no implied consent from scrolling or browsing. |
| **GDPR Recital 42** | To be informed, the user must know at least the **controller's identity and the purposes**. | Name the purposes and the third parties before consent is given. |

## 2. CJEU case law

- **Planet49, C-673/17 (1 Oct 2019)** ([CURIA](https://curia.europa.eu/juris/liste.jsf?num=C-673/17)):
  - A **pre-ticked checkbox** is not valid consent under Art. 5(3) ePD.
  - Art. 5(3) applies **whether or not** the stored or accessed information is personal data.
  - The user must be told the **cookie lifetime** and **whether third parties can access** the cookies.
- **Fashion ID, C-40/17 (29 Jul 2019)** ([CURIA](https://curia.europa.eu/juris/liste.jsf?num=C-40/17)): a website that embeds a third-party plugin (the Facebook "Like" button) is a **joint controller** for collecting and transmitting the data. The site operator must obtain consent for that stage.
  - → An audit must treat embedded third-party scripts as the site's own responsibility.

## 3. EDPB guidance (EU-wide)

**Guidelines 05/2020 on consent v1.1 (adopted 4 May 2020)** ([EDPB](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en)):
- **Cookie walls** (access only if the user accepts cookies) do not produce valid consent ("Example 6a" and the related paragraphs on conditionality).
- **Scrolling, swiping or continuing to browse** is not a clear affirmative action.
- Withdrawal must be possible through the same interface used to give consent, with no detriment to the user.
- Proof of consent: the controller keeps records showing *when*, *how*, and *what information* the user was given.

**Cookie Banner Taskforce report (adopted 17 Jan 2023)** ([EDPB page](https://www.edpb.europa.eu/our-work-tools/our-documents/other/report-work-undertaken-cookie-banner-taskforce_en), [PDF](https://www.edpb.europa.eu/system/files/2023-01/edpb_20230118_report_cookie_banner_taskforce_en.pdf)). These are the common positions of the supervisory authorities (SAs), reached on the noyb complaints:
- **No reject option on the layer that has "Accept"** → a "vast majority" of SAs consider this non-compliant.
- **Pre-ticked boxes** on the second layer → invalid consent.
- **Deceptive link design** (reject offered as a plain text link outside the banner, or hidden) → non-compliant.
- **Deceptive button colours or contrast** → assessed case by case. A reject option whose contrast makes it effectively unreadable is "manifestly misleading".
- **Legitimate interest** cannot be relied on for storage or access under Art. 5(3). Later processing under legitimate interest still needs the GDPR assessment.
- **Inaccurately classifying cookies as "essential"** → non-compliant. The controller must be able to justify each one.
- **Withdrawal:** must be easy at any time. SAs did not make a floating icon mandatory, but the withdrawal route must be easily accessible. Assessed case by case.

**Guidelines 2/2023 on the technical scope of Art. 5(3) ePD, v2.0 (adopted 7 Oct 2024)** ([PDF](https://edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)):
- Art. 5(3) covers more than cookies: **tracking pixels and URL/link tracking**, **local processing** (JS reading device data), **IP-based tracking** in some cases, **unique identifiers**, **IoT reporting**, and **localStorage-type APIs**.
- This applies whether the operation is **first-party or third-party**, and even if the information is generated on the device by JS the site sends.
- The guidelines do **not** cover exemptions or how to collect consent.
- → The audit inventory must include storage APIs and network beacons, not only `document.cookie`.

**Strictly-necessary exemption: WP29 Opinion 04/2012 (WP194)** ([PDF](https://ec.europa.eu/justice/article-29/documentation/opinion-recommendation/files/2012/wp194_en.pdf)). Typically exempt:
- user-input/session cookies (e.g. the shopping cart)
- authentication session cookies
- user-centric security cookies (e.g. login-abuse detection, CSRF)
- multimedia player session cookies
- load-balancing session cookies
- UI customisation (e.g. language)
- the consent cookie storing the user's choice

**Not exempt:** analytics (by default), advertising, and third-party social plugin tracking of non-members.

## 4. National guidance

### France: CNIL
- **Guidelines + Recommendation of 17 Sep 2020** (délib. 2020-091 and 2020-092), with a compliance deadline at the end of March 2021 ([CNIL](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/lignes-directrices-modificatives-et-recommandation)). A **consolidated recommendation was published in Jan 2026** ([PDF](https://www.cnil.fr/sites/default/files/2026-01/recommandation_cookies_consolidee.pdf)).
- **Refusing must be as easy as accepting.** The CNIL recommends a "**Tout refuser**" button next to "Tout accepter", at the same level and in the same format. Continuing to browse = **refusal**, not consent ([CNIL FAQ](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ)).
- **Choice lifetime:** keeping the user's choice (both consent and refusal) for **6 months** is "good practice", assessed case by case. A refusal should be kept at least as long as a consent ([CNIL FAQ](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ); [CNIL Q&A](https://www.cnil.fr/fr/cnil-direct/question/cookies-si-jai-refuse-ses-cookies-un-site-web-peut-il-me-redemander-de-les)).
- **Proof of consent:** the site must be able to prove valid consent at any time ([CNIL](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/lignes-directrices-modificatives-et-recommandation)).
- **Exempt audience measurement:** only under strict conditions:
  - first-party, anonymous statistics only, no cross-site tracking
  - cookie lifetime of **13 months** max, data retained **25 months** max

  ([CNIL](https://cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience)).
- **Cookie walls:** the Conseil d'État (19 Jun 2020) held that a *general* ban was not lawful, so the CNIL assesses them **case by case** (is there a real and fair alternative, e.g. a reasonably priced paid option?) ([CNIL criteria](https://www.cnil.fr/fr/cookie-walls-la-cnil-publie-des-premiers-criteres-devaluation)).
- **Enforcement (Sep 2025):**
  - **SHEIN, €150M:** advertising cookies set **before any interaction**, and new cookies placed **after "Refuse all"** ([CNIL](https://www.cnil.fr/en/cookies-placed-without-consent-shein-fined-150-million-euros-cnil)).
  - **Google, €325M:** among other findings, account creation steered users to ad cookies without valid consent ([CNIL](https://www.cnil.fr/en/cookies-and-advertisements-inserted-between-emails-google-fined-325-million-euros-cnil)).

### United Kingdom: ICO (PECR + UK GDPR; not EU law, often audited alongside it)
- **Final Storage and Access Technologies (SATs) guidance, 29 Apr 2026.** It reflects the Data (Use and Access) Act 2025 ([ICO news](https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/04/final-storage-and-access-technologies-guidance-published/); [guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/)).
- **Reject must be as easy as accept.** The ICO treats a banner with no "reject all" as non-compliant and shows equally prominent accept and reject options as the compliant example ([ICO: managing consent](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-we-manage-consent-in-practice/)).
- **UK-only exceptions (DUAA 2025)** ([ICO: exceptions](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/)):
  - The **statistical purposes** and **appearance** exceptions require a **simple, free way to object**.
  - Each exception applies only if the technology is used *solely* for that purpose.
  - Advertising never qualifies.
- **⚠ Divergence:** the UK statistical-analytics exception is **wider than the EU position**. In the EU, analytics needs consent unless it meets national exemptions such as the CNIL's narrow audience-measurement conditions. **Do not apply UK exceptions to EU visitors.**

### Finland: Traficom (NCSC-FI) and the Data Protection Ombudsman
- **Law:** Act on Electronic Communications Services 917/2014, **§205** (the national transposition of Art. 5(3)). **Traficom** supervises cookie consent and can issue a reprimand or a correction order. It **cannot impose administrative fines** for cookie violations ([Traficom/NCSC-FI cookies page, updated 12 Oct 2026](https://www.kyberturvallisuuskeskus.fi/fi/toimintamme/saantely-ja-valvonta/evasteet)).
- **Guidance:** "Evästeohjeistus palveluntarjoajille" (in force from 13 Sep 2021). It is not binding in itself but is the regulator's view ([PDF](https://kyberturvallisuuskeskus.fi/sites/default/files/media/file/Ev%C3%A4steohjeistus_palveluntarjoajille.pdf); [overview](https://www.kyberturvallisuuskeskus.fi/fi/toimintamme/saantely-ja-valvonta/evasteet)). Key points:
  - Legitimate interest does **not** justify storing cookies.
  - No pre-selected non-essential cookies.
  - Continued use, or a pointer to browser settings, ≠ consent.
  - Withdrawal must be as easy as consent, with the banner re-openable via an **icon or link**.
  - Withdrawal must actually **delete or overwrite** the stored data.
- **Decisions** ([decision list](https://www.kyberturvallisuuskeskus.fi/fi/toimintamme/saantely-ja-valvonta/evasteet)):
  - **Telia Finland (21 Nov 2023):** reject was only on the second layer → refusing was harder than accepting ([PDF](https://www.kyberturvallisuuskeskus.fi/files/media/file/Telia%20Finland%20Oyj.pdf)).
  - Similar "accept easier than reject" findings: **Foreca (12 Jun 2024)** ([PDF](https://www.kyberturvallisuuskeskus.fi/files/media/file/Foreca%20Oy.pdf)) and **Kekkilä-BVB** ([PDF](https://kyberturvallisuuskeskus.fi/sites/default/files/media/regulation/Kekkil%C3%A4-BVB%20Oy.pdf)).
  - **Lippupiste (28 May 2024):** the user's choices were overridden ([PDF](https://kyberturvallisuuskeskus.fi/files/media/file/Lippupiste%20Oy.pdf)).
  - The latest listed decision is **Silmäasema Oy (16 Oct 2025)**.
- **Data Protection Ombudsman (tietosuojavaltuutettu):**
  - Transferred **cookie-consent** matters to Traficom. It remains competent for other cookie issues that involve personal data processing ([tietosuoja.fi](https://tietosuoja.fi/-/tietosuojavaltuutetun-toimisto-on-siirtanyt-evastesuostumusta-koskevat-asiat-traficomille-traficomilta-uutta-ohjeistusta-evastekaytantoihin)).
  - An administrative court held that **consent through browser settings is not valid** ([tietosuoja.fi](https://tietosuoja.fi/-/hallinto-oikeus-internetselaimen-asetusten-kautta-annettava-suostumus-evasteiden-kaytolle-ei-tayta-yleisessa-tietosuoja-asetuksessa-saadettyja-suostumuksen-vaatimuksia)).
  - **Mindemo Oy (Oct 2026), €33,000 fine (Sanctions Board):** a booking service passed health-related booking data via trackers to Google, Meta and Microsoft. Breaches of GDPR Art. 5(1)(f), 25 and 32 ([tietosuoja.fi](https://tietosuoja.fi/-/mindemo-oy-lle-seuraamusmaksu-verkkosivuevasteiden-tietosuojapuutteista)). Secondary sources disagree on the date (2 Oct vs 8 Oct 2026).
  - → Pixels on sensitive pages (health, booking) are a GDPR security issue *in addition to* the consent issue.

## 5. 2025–2026 developments: PROPOSALS, NOT LAW

- **Digital Omnibus (data part): COM(2025) 837, procedure 2025/0360(COD), 19 Nov 2025** ([EUR-Lex procedure](https://eur-lex.europa.eu/procedure/EN/2025_360); [Dutch Senate summary](https://www.eerstekamer.nl/nonav/europeesvoorstel/com_2025_837_voorstel_voor_een)):
  - The Commission proposed moving cookie rules for personal data into **new GDPR Art. 88a**, and adding **Art. 88b** on machine-readable browser consent signals.
  - It also proposed new consent-free purposes, **single-click refusal**, and a **6-month** ban on re-asking after a refusal.
- **Council mandate (COREPER, 21 Oct 2026, doc. 14756/26)**, as reported by commentary ([analysis](https://euinternetpolicy.wordpress.com/2026/10/23/the-councils-digital-omnibus-mandate-what-it-would-change-in-the-gdpr/); see also [EDRi analysis](https://edri.org/wp-content/uploads/2026/03/EDRi-Data-Omnibus-Analysis-Council-Compromise-text.pdf)):
  - **Deletes** Art. 88a and 88b and keeps cookies in a **rewritten ePD Art. 5(3)**.
  - Makes the exemptions a closed list, including contextual-ad measurement without profiling.
  - Keeps the **single-click refusal**, with a **4-month** re-ask ban.
  - Makes GDPR SAs the enforcers.
  - Sets a 24-month transposition period.
  - Not yet verified against the Council's primary text.
- **Status as of 2026-11-12:** trilogues had **not started**, and nothing has been adopted. **Audit against current law.** You may flag "would also fail the proposed single-click refusal" as informational only.
- **⚠ Sources disagree** on which Council draft dropped Art. 88a or 88b, and when (June, September and October 2026 texts are all cited). Rely on the Council register or EUR-Lex, not blogs.

## 6. Known disagreements (resolve in favour of the regulator)

| Topic | Disagreement | Use |
|---|---|---|
| Reject on first layer | Taskforce: "vast majority" of SAs require it, not unanimous. CNIL, Traficom (Telia) and ICO require it in practice. | Treat a missing first-layer reject as **critical**. |
| Persistent withdrawal icon | EDPB: not mandatory per se. Traficom: icon or link expected. | Require *some* always-reachable link or icon. An icon is best practice. |
| Analytics without consent | UK DUAA allows it with an opt-out. CNIL allows it only under strict conditions. Other EU states: consent. | EU visitors: consent unless the CNIL-style conditions are met **and** the national DPA accepts that. |
| Cookie walls | EDPB 05/2020: invalid. CNIL / Conseil d'État: case by case (pay-or-consent possible). | Flag as **high**. Escalate to legal; do not auto-pass. |
| Consent lifetime | No binding EU maximum. CNIL: 6 months as good practice. Omnibus proposals: 6 months (Commission) or 4 months (Council) before re-asking. | Recommend ≤ 6–13 months before re-prompting. Re-prompt when the purposes or vendors change. |
| Vendor or blog summaries | Often overstate the Omnibus as "banners abolished". | Ignore these. Current law applies. |
