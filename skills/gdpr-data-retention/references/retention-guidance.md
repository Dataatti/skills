# Regulator guidance on setting retention periods

> **Not legal advice.** Sources checked as of 2026-11-12.
> Some regulator pages block automated fetching (tietosuoja.fi via Cloudflare); where noted, content was verified only through search-engine snippets of the official page.

## Shared baseline (all regulators below agree)
- The GDPR sets **no fixed periods**; the controller sets them per purpose and must be able to justify them (Art. 5(1)(e), 5(2)). ICO: "The UK GDPR does not set specific time limits for different types of data." [ICO storage limitation](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/)
- At the end of the period: **erase or anonymise**. Keeping "just in case" is not a purpose.
- A sector law that sets a minimum (see `legal-minimums.md`) is a legal obligation and overrides deletion only for the data that law covers.

---

## UK – ICO
Source: [Principle (e): Storage limitation](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/) (page states it is under review following the Data (Use and Access) Act 2025).
- "You need a policy setting standard retention periods wherever possible, to comply with documentation requirements."
- "You should also periodically review the data you hold, and erase or anonymise it when you no longer need it."
- "You need to think about – and be able to justify – how long you keep personal data."
- "You should consider whether you need to keep information to defend possible future legal claims."
- Small organisations doing occasional low-risk processing may not need a documented policy but must still review and delete.
- Audit expectation: each category of information has a documented period, justification and end-of-period action. [ICO audit toolkit – Retention](https://ico.org.uk/for-organisations/advice-and-services/audits/data-protection-audit-framework/toolkits/records-management/retention/)
- Backups and erasure: "The key issue is to put the backup data 'beyond use', even if it cannot be immediately overwritten"; be clear with individuals about backup overwrite cycles. Recipients must be told of erasure unless impossible/disproportionate. [ICO right to erasure](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-erasure/)
- CCTV: shortest period needed; device storage capacity must not decide the period. [ICO video surveillance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/cctv-and-video-surveillance/guidance-on-video-surveillance-including-cctv/how-can-we-comply-with-the-data-protection-principles-when-using-surveillance-systems/)
- The ICO publishes **no** standard numeric periods.

## France – CNIL
Main page: [Les durées de conservation des données](https://www.cnil.fr/fr/les-durees-de-conservation-des-donnees) · [Guide pratique (PDF)](https://www.cnil.fr/sites/cnil/files/atoms/files/guide_durees_de_conservation.pdf)

**Three-phase life cycle** (useful model for app design):
1. *Base active* – data in everyday use for the purpose.
2. *Archivage intermédiaire* – no longer used for the purpose but still needed (legal obligation, litigation); separate physically or logically from the active base, access restricted to authorised staff.
3. *Archivage définitif* – permanent archive of data with lasting value (rare for apps).

**How to set a period:** a text sets it, else the controller does; CNIL *référentiels* give recommended periods that carry a presumption of conformity. "Les référentiels ne sont pas contraignants" – deviation is allowed if justified and documented. [CNIL Q&A on commercial référentiels](https://www.cnil.fr/fr/questions-reponses-sur-les-referentiels-relatifs-la-gestion-des-activites-commerciales-et-des)

**Concrete CNIL periods**
| Data | CNIL period | Source |
|---|---|---|
| Customer data used for marketing | During relationship + **3 years** after its end | [CNIL Q&A référentiels commerciaux](https://www.cnil.fr/fr/questions-reponses-sur-les-referentiels-relatifs-la-gestion-des-activites-commerciales-et-des) |
| Prospects (non-customers) | **3 years** from collection or last contact *from* the prospect (a click counts; an email open does not), then re-ask or delete | same |
| Inactive user accounts | **2 years** from the person's last action, with prior warning | same |
| Opt-out / objection list | at least **3 years** (only for honouring the objection) | same |
| Rejected job candidates | **2 years** max (unless erasure requested) | [CNIL durées de conservation](https://www.cnil.fr/fr/les-durees-de-conservation-des-donnees); [référentiel RH](https://www.cnil.fr/fr/referentiel-durees-conservation-donnees-rh) |
| Billing data | **10 years** (Code de commerce) even after the customer relationship ends, in intermediate archive | [CNIL durées de conservation](https://www.cnil.fr/fr/les-durees-de-conservation-des-donnees) |
| Payslip copies | **5 years** (Code du travail L3243-4) | same |
| Access/activity logs | **6 months – 1 year** normally; up to **3 years** only if documented risk justifies it; the criminal limitation period alone does not justify longer retention | [CNIL recommandation journalisation](https://www.cnil.fr/fr/la-cnil-publie-une-recommandation-relative-aux-mesures-de-journalisation) · [PDF](https://www.cnil.fr/sites/cnil/files/atoms/files/recommandation_-_journalisation.pdf) |
| CCTV / video | max **1 month** (a few days usually enough); extract footage if proceedings start | [CNIL vidéoprotection](https://www.cnil.fr/fr/la-videoprotection) · [vidéosurveillance au travail](https://www.cnil.fr/fr/la-videosurveillance-videoprotection-au-travail) |

Sector référentiels (health, social, HR, rental) are linked from the main CNIL page above.

## EDPB (EU level)
**Guidelines 01/2022 on the right of access** (final v2.1, adopted 28 March 2023; page lists 17 April 2023). [EDPB page](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-012022-data-subject-rights-right-access_en) · [PDF](https://www.edpb.europa.eu/system/files/2023-04/edpb_guidelines_202201_data_subject_rights_access_v2_en.pdf)
- Assessment reflects the moment the request is received; data already deleted under a retention policy need not be produced, but "any retention of data must be objectively justifiable" (para. 37).
- With short retention periods, controllers must have measures so a pending request is answered before scheduled deletion (paras. 38, and §2.3).
- Example 6: data found to be kept past its retention period must be **disclosed first, then deleted** – never delete to dodge a request.
- Backups (para. 110): backup data is "in principle similar to the data in the live system"; if the backup holds more/different data than live, be transparent and, where technically feasible, give access to it. A log of deletions helps.
- Retention info (para. 118): must be precise enough for the person to know how long *their* data is kept; give the start trigger (e.g. contract end, warranty expiry). "The mere reference ... to 'deletion after expiry of the statutory storage periods' is not sufficient." State periods per processing operation/data category.

**CEF 2025 report on the right to erasure** (adopted 18 Feb 2026). [News](https://www.edpb.europa.eu/news/edpb-identifies-challenges-hindering-the-full-implementation-of-the-right-to-erasure_en) · [Report PDF](https://www.edpb.europa.eu/system/files/2026-02/edpb_cef-report_2025_right-to-erasure_en.pdf)
32 DPAs, 764 controllers. Recurring problems: missing internal procedures; poor information to individuals; **"inefficient anonymisation techniques ... as an alternative to deletion"**; **difficulty determining retention periods**; **deletion in back-ups**; misapplying Art. 17 conditions. CEF 2026 moved on to transparency/information duties (Arts. 12–14). [CEF 2026](https://www.edpb.europa.eu/news/news/2026/cef-2026-edpb-launches-coordinated-enforcement-action-transparency-and-information_en)

## Finland – Data Protection Ombudsman (Tietosuojavaltuutettu)
Source: [Storage limitation (tietosuoja.fi)](https://tietosuoja.fi/en/storage-limitation) – verified via search snippet only (site blocks automated fetch).
- The controller "must plan and be able to justify the storage time" and storage times "must also be documented".
- "The GDPR does not specify precise storage times"; assess per purpose; other legislation may affect the period.
- Data no longer necessary "must be either anonymised or erased".
- Periods may be set by criteria (e.g. tied to the customer relationship).
- Enforcement: May 2023 order to Kesko to delete loyalty-programme purchase data and set purpose-specific periods – retaining purchase data for the whole customer relationship was **not** considered necessary. [Ombudsman news item](https://tietosuoja.fi/-/tietosuojavaltuutettu-ostotietojen-sailyttamista-koko-asiakassuhteen-ajan-ei-voida-pitaa-tarpeellisena) (snippet-verified)

---

## Disagreements and tensions found
1. **Numbers vs. no numbers.** CNIL publishes concrete (non-binding) periods; ICO, the Finnish Ombudsman and the EDPB do not. A CNIL figure is a reasonable default elsewhere but is not a safe harbour outside France.
2. **"Duration of the relationship".** CNIL accepts keeping customer data for the relationship + 3 years (for marketing). The Finnish Ombudsman (Kesko, 2023) held that keeping detailed *purchase history* for the entire relationship was not necessary. Resolution: period must be set per purpose and data category, not per customer record.
3. **Logs vs. legal claims.** ICO says consider keeping data to defend future claims; CNIL says log retention cannot be justified by the criminal limitation period alone and caps normal logs at 6–12 months. Keep only what a specific, documented claim risk needs.
4. **Anonymisation as erasure.** Regulators accept true anonymisation (ICO, Finnish DPA, CNIL), but the EDPB 2026 report flags weak "anonymisation" used instead of deletion as a common failure. Hashing an email or nulling only the name is pseudonymisation, not anonymisation.
5. **Backups.** ICO: "beyond use" until overwritten is acceptable. EDPB: backup data can still fall within access requests. Both: tell people about backup cycles.
6. **Common misconception – "UK: 6 years for all records":** UK Companies Act s.388 requires 3 years (private) / 6 years (public), not 6 years for all; HMRC requires 6 years for company tax records. See `legal-minimums.md`.

## Rule of precedence for the skill
Statute that **requires** retention > the competent supervisory authority's guidance/decisions (lead authority for the controller's main establishment, plus the authority where affected users are) > EDPB guidance > other regulators' examples > industry practice. **When a regulator and a blog/vendor disagree, the regulator wins**; when two regulators differ, apply the one competent for the controller and note the stricter one.
