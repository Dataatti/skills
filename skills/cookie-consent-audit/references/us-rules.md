# US rules: opt-out of sale/sharing/targeted ads, and GPC

> Not legal advice. US laws are mostly **opt-out** (no prior consent needed for most cookies), unlike the EU's opt-in model. Applicability thresholds (revenue, consumer counts) are not covered here.
> Sources checked as of 2026-11-12.

**Precedence rule:** statute text, regulations and the enforcing agency's guidance (CPPA, state AG) beat commentary from CMP vendors or law firms. Where secondary trackers disagree on a date, this file uses the statute or the AG's text.

---

## 1. California: CCPA as amended by CPRA

**Statute and regulations**
- Statute: Cal. Civ. Code §1798.100 et seq. Regulations: Cal. Code Regs. tit. 11, §7000 et seq. ([CPPA regulations](https://cppa.ca.gov/regulations/)). Updated regulations took effect **1 Jan 2026** ([CPPA "things to know"](https://cppa.ca.gov/pdf/things_to_know_before_2026_updates.pdf)).

**Right to opt out (§1798.120, §1798.135)**
- Consumers can opt out of the **sale** *and* the **sharing** of their personal information. "Sharing" means disclosure for **cross-context behavioural advertising**.
- Third-party ad and analytics pixels that build cross-site profiles are typically "sale" or "sharing".

**"Do Not Sell or Share My Personal Information" link (§1798.135(a); regs §7013, §7015)**
- The link must be **conspicuous**, usually in the footer, on every page that collects PI.
- Alternatives:
  - an "Your Privacy Choices" / "Your California Privacy Choices" link with the official icon (§7015)
  - no link at all, but only if the business honours opt-out preference signals in a frictionless way (§1798.135(b))

**Opt-out preference signals: GPC (regs §7025)**
- The business **must** treat a GPC signal as a valid opt-out request for that browser or device, and for the consumer if known (§7025(b), (c)).
- A GPC-based opt-out may **not** be overridden by a banner or require extra steps.
- Since **1 Jan 2026**, the business **must display** whether it processed the opt-out, e.g. "Opt-Out Request Honored" ([§7025(c)(6), CPPA](https://cppa.ca.gov/pdf/things_to_know_before_2026_updates.pdf); [Nelson Mullins summary](https://www.nelsonmullins.com/insights/alerts/fcc-download/all/show-me-that-you-ve-opted-me-out-new-ccpa-rules-require-businesses-to-prove-compliance)).
- GPC technical signals: HTTP header `Sec-GPC: 1` and JS `navigator.globalPrivacyControl === true` ([globalprivacycontrol.org](https://globalprivacycontrol.org/)).

**Dark patterns and symmetry in choice (regs §7004)** ([CPPA regs](https://cppa.ca.gov/regulations/))
- Methods for submitting requests and obtaining consent must be:
  - easy to understand
  - **symmetrical** (the path to opt out must not be longer or harder than the path to opt in; "Accept All" next to "Preferences" only is **not** symmetrical)
  - free of confusing language such as double negatives
  - free of manipulative language or choice architecture
  - easy to execute
- Consent obtained through a dark pattern is **not consent** (Civ. Code §1798.140(h), (l)).

**Browser-level OOPS: AB 566 "Opt Me Out Act"**
- Signed **8 Oct 2025**. From **1 Jan 2027**, browsers must offer a consumer-configurable opt-out preference signal ([CPPA announcement](https://cppa.ca.gov/announcements/2025/20251008_2.html)).
- Expect GPC volume to rise. Sites must already honour it.
- The CPPA board is also working on **proposed** OOPS regulations (Nov 2026 meeting materials, [proposed text](https://cppa.ca.gov/meetings/materials/20261105_06_09_text.pdf)). These are **not adopted** as of 2026-11-12.

### California enforcement (cookie/GPC relevant)

| Date | Matter | Amount | What failed | Source |
|---|---|---|---|---|
| 24 Aug 2022 | **Sephora** (AG) | $1.2M | Did not detect or process **GPC**. Undisclosed "sale" via third-party trackers. | [OAG](https://oag.ca.gov/news/press-releases/attorney-general-bonta-announces-settlement-sephora-part-ongoing-enforcement) |
| 12 Mar 2025 | **American Honda** (CPPA) | $632,500 | Cookie tool: accept in 1 click, opt-out took ≥2 (**asymmetry**). Excessive verification for opt-out. Order: apply GPC to known consumers. | [CPPA](https://cppa.ca.gov/announcements/2025/20250312.html), [order](https://cppa.ca.gov/regulations/pdf/20250307_hmc_order.pdf) |
| 6 May 2025 | **Todd Snyder** (CPPA) | $345,178 | Misconfigured consent banner (opt-out impossible for 40 days). Excessive verification. | [CPPA](https://cppa.ca.gov/announcements/2025/20250506.html) |
| 1 Jul 2025 | **Healthline** (AG) | $1.55M | Opt-out mechanisms misconfigured and **never tested**. Targeted ads continued after opt-out. | [OAG](https://oag.ca.gov/news/press-releases/attorney-general-bonta-announces-largest-ccpa-settlement-date-secures-155) |
| 9 Sep 2025 | **Joint GPC sweep** (CPPA, CA AG, CO AG, CT AG) | n/a | Investigative sweep of businesses **not honouring GPC**. | [CPPA](https://cppa.ca.gov/announcements/2025/20250909.html) |
| 30 Sep 2025 | **Tractor Supply** (CPPA) | $1.35M | Did not honour **GPC** until Jul 2024. The "Do Not Sell" form **did not stop third-party trackers**. Order: scan properties for trackers. | [CPPA](https://cppa.ca.gov/announcements/2025/20250930.html), [order](https://cppa.ca.gov/pdf/20250930_tractor_supply_bd_sfo.pdf) |
| 11 Feb 2026 | **Disney** (AG) | $2.75M | GPC and opt-outs applied only to one device or service, **not the logged-in account**. | [OAG](https://oag.ca.gov/news/press-releases/california-wont-let-it-go-attorney-general-bonta-announces-275-million) |

**Lesson for audits:** test that opt-out (link *and* GPC) **actually stops the network calls** to ad and analytics vendors. A banner state alone is not enough.

## 2. Other states (opt-out model)

**Shared features**
- Most state laws give a right to opt out of **targeted advertising**, **sale**, and certain **profiling**, and require a "clear and conspicuous" opt-out method.
- **Sensitive data** (health, precise geolocation, children's data, etc.) usually needs **opt-in consent**. Several states (e.g. MD, OR for under-16s) ban selling certain data outright.
- UOOM ("universal opt-out mechanism") = an opt-out preference signal such as GPC. Most statutes say it must reflect an **affirmative choice** (not a default setting), so pure-default signals may be rejected.
- The Colorado AG lists **GPC as the only recognised UOOM** so far ([CO AG](https://coag.gov/opt-out/)).

**Table: GPC/UOOM obligation by state (as of 2026-11-12)**

| State | Law | Law effective | GPC/UOOM required? (from) | Source |
|---|---|---|---|---|
| California | CCPA/CPRA | 1 Jan 2020 / 1 Jan 2023 | **Yes**: regs §7025 (OOPS mandatory). Browsers must offer OOPS from 1 Jan 2027. | [CPPA regs](https://cppa.ca.gov/regulations/) |
| Colorado | Colorado Privacy Act | 1 Jul 2023 | **Yes**, from 1 Jul 2024 (C.R.S. §6-1-1306(1)(a)(IV)). GPC is recognised. | [CO AG](https://coag.gov/opt-out/) |
| Connecticut | CTDPA | 1 Jul 2023 | **Yes**, from 1 Jan 2025. The 2025 amendments (PA 25-113) restate the duty. | [CT AG](https://portal.ct.gov/ag/press-releases/2024-press-releases/tong-advises-connecticut-consumers-and-businesses-of-opt-out-rights-and-requirements), [PA 25-113](https://www.cga.ct.gov/2025/act/pa/pdf/2025PA-00113-R00SB-01295-PA.pdf) |
| Texas | TDPSA (Bus. & Com. Code ch. 541) | 1 Jul 2024 | **Yes**, from 1 Jan 2025 (§541.055(e): browser setting, extension, global device setting; no defaults). | [Tex. §541.055](https://texas.public.law/statutes/tex._bus._&_com._code_section_541.055) |
| Oregon | OCPA | 1 Jul 2024 | **Yes**, from 1 Jan 2026. | [OR DOJ FAQ](https://www.doj.state.or.us/consumer-protection/for-businesses/privacy-law-faqs-for-businesses/) |
| Montana | MCDPA | 1 Oct 2024 | **Yes**, from 1 Jan 2025 (MCA 30-14-2809(3)(b)). | [MCA 30-14-2809](https://mca.legmt.gov/bills/mca/title_0300/chapter_0140/part_0280/section_0090/0300-0140-0280-0090.html) |
| New Hampshire | RSA 507-H | 1 Jan 2025 | **Yes**, from 1 Jan 2025 (RSA 507-H:6, V(a)(1)(B)). | [RSA 507-H:6](https://gc.nh.gov/rsa/html/LII/507-H/507-H-6.htm) |
| Nebraska | NDPA (LB 1074) | 1 Jan 2025 | **Yes**, from 1 Jan 2025 (Texas-style signal provision). Some commentators read it as narrower. Verify the statute. | [Baker Donelson summary](https://www.bakerdonelson.com/consumer-data-privacy-law-guide-nebraska) (secondary) |
| Delaware | DPDPA (6 Del. C. ch. 12D) | 1 Jan 2025 | **Yes**, from 1 Jan 2026. | [DE DOJ FAQ](https://attorneygeneral.delaware.gov/fraud/personal-data-privacy-portal/frequently-asked-questions/) |
| New Jersey | NJDPA (P.L.2023 c.266) | 15 Jan 2025 | **Yes**, from 15 Jul 2025. Division of Consumer Affairs UOOM rules (N.J.A.C. 13:45L-5) are proposed; adoption not verified. | [NJ DCA FAQ](https://www.njconsumeraffairs.gov/ocp/Pages/NJ-Data-Privacy-Law-FAQ.aspx) |
| Minnesota | MCDPA (Minn. Stat. ch. 325M) | 31 Jul 2025 | **Yes**, from 31 Jul 2025. | [MN AG](https://www.ag.state.mn.us/Office/Communications/2025/07/28_MCDPA.asp), [325M](https://www.revisor.mn.gov/statutes/cite/325M/pdf) |
| Maryland | MODPA (Com. Law §14-4701 ff.) | 1 Oct 2025 | **Yes**, from 1 Oct 2025. | [Ch. 455 (2024)](https://mgaleg.maryland.gov/2024RS/Chapters_noln/CH_455_sb0541e.pdf) |
| Louisiana | LDPA (SB 386, 2026) | 1 Jan 2027 | **Yes** (UOOM recognition required). Not yet in force. | [LA Legislature](https://www.legis.la.gov/Legis/ViewDocument.aspx?d=1473755); [Troutman](https://www.troutmanprivacy.com/2026/06/louisiana-enacts-consumer-data-privacy-law/) |
| Vermont | VDPOSA (S.71, Act 145 of 2026) | 1 Jan 2028 | **Yes**, from 1 Jan 2028. Not yet in force. | [Hunton](https://www.hunton.com/privacy-and-cybersecurity-law-blog/vermont-becomes-23rd-state-with-comprehensive-consumer-privacy-law) (secondary) |
| Virginia | VCDPA | 1 Jan 2023 | **No** statutory UOOM duty | trackers, e.g. [Koley Jessen](https://www.koleyjessen.com/insights/publications/universal-opt-out-mechanisms-explained) |
| Utah | UCPA | 31 Dec 2023 | **No** | same |
| Iowa | ICDPA | 1 Jan 2025 | **No** | same |
| Tennessee | TIPA | 1 Jul 2025 | **No** | same |
| Indiana / Kentucky / Rhode Island | INCDPA / KCDPA / RIDTPPA | 1 Jan 2026 | **No** (per trackers; verify) | same |
| Oklahoma | SB 546 (2026) | 1 Jan 2027 | **No** | [Mayer Brown](https://www.mayerbrown.com/en/insights/publications/2026/03/oklahoma-enacts-comprehensive-consumer-data-privacy-law) |
| Alabama | HB 351 (2026) | 1 May 2027 | **No** (dropped from the enacted text) | [DLA Piper](https://privacymatters.dlapiper.com/2026/04/u-s-alabama-becomes-21st-state-to-enact-comprehensive-privacy-law/) |

**Practical rule for the audit**
- Honour GPC **nationwide** (or at least for any visitor geolocated to the yes-states above). Most CMPs do this.
- A site that ignores GPC fails in **CA, CO, CT, TX, OR, MT, NH, NE, DE, NJ, MN, MD** today.

## 3. Disagreements and caveats

- **UOOM dates differ between secondary trackers** for NH (2025 vs 2026), NJ (Jul 2025 vs Jan 2026), Nebraska (2025 vs 2026) and Oregon. The table uses the statute or AG text: **NH 1 Jan 2025** (RSA text), **NJ 15 Jul 2025** (DCA FAQ), **OR 1 Jan 2026** (OR DOJ).
- **Connecticut** is sometimes left off UOOM lists because the duty sits inside its list of opt-out methods. The CT AG treats it as mandatory.
- **"Largest settlement" labels** go out of date quickly: Healthline (2025) was followed by Disney ($2.75M, Feb 2026) and GM ($12.75M, May 2026, not cookie-related).
- **Federal:** no comprehensive federal privacy law as of 2026-11-12. A preemptive federal bill (the "SECURE Data Act") was opposed by 19 AGs in Jun 2026 ([MN AG](https://www.ag.state.mn.us/Office/Communications/2026/06/03_SECURE-Data-Act.asp)). Treat it as **pending, not law**.
