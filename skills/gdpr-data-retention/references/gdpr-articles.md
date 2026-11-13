# GDPR articles relevant to data retention

> **Not legal advice.** Sources checked as of 2026-11-12.
> Primary source for every article below: Regulation (EU) 2016/679 (GDPR), official text on EUR-Lex:
> https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679
> (EUR-Lex has no stable per-article anchors; search the page for "Article N".)
> Quoted fragments were checked against the EUR-Lex HTML text on the date above.

Pending reform: the Commission's "Digital Omnibus" proposal (Nov 2025) would amend parts of the GDPR. As of this check it is **not adopted** (Parliament had not set its position; Council reportedly kept the Art. 4(1) definition unchanged). Re-check before relying on any article below. Secondary reports: https://www.lovguiden.dk/en/det-offentlige/raadet-for-den-europaeiske-union/2026-10-21-raadet-vil-beholde-gdprs-definition-af-personoplysninger-i-digital-omnibus , EDPB/EDPS joint opinion coverage: https://www.insideprivacy.com/eu-data-protection/eu-regulators-issue-opinion-on-revisions-of-gdpr-and-other-data-laws/

---

## Art. 4(1) – Personal data
"Any information relating to an identified or identifiable natural person". Identifiable includes indirect identification via "a name, an identification number, location data, an online identifier" etc. For an audit this means user IDs, IP addresses, device IDs, cookie IDs and email hashes in logs or analytics are in scope, not just names and emails. Pseudonymised data is still personal data (Recital 26); only truly anonymised data falls outside.
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

## Art. 5(1)(b) – Purpose limitation
Data must be collected for "specified, explicit and legitimate purposes" and not further processed incompatibly. The retention period is measured against the purpose, so every stored data item needs a documented purpose.
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

## Art. 5(1)(c) – Data minimisation
Data must be "adequate, relevant and limited to what is necessary". Applies to which fields you collect and to how much history you keep.
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

## Art. 5(1)(e) – Storage limitation (the core retention rule)
Data must be "kept in a form which permits identification of data subjects for no longer than is necessary for the purposes". Longer storage is allowed only for archiving in the public interest, scientific/historical research or statistics, with Art. 89(1) safeguards. Recital 39 adds: "time limits should be established by the controller for erasure or for a periodic review". Anonymisation is an alternative to deletion (the data must then truly be non-identifiable).
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

## Art. 5(2) – Accountability
The controller "shall be responsible for, and be able to demonstrate compliance with" Art. 5(1). In practice: a written retention schedule plus evidence that deletion jobs run (logs, metrics). "We delete things" without evidence fails accountability.
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

## Art. 6(1) – Lawful bases (the six)
(a) consent; (b) contract performance or pre-contract steps; (c) legal obligation; (d) vital interests; (e) public task / official authority; (f) legitimate interests (not for public authorities' tasks). The basis drives retention: (b) usually ends at contract end plus claim period; (c) is fixed by the law in question (see `legal-minimums.md`); (a) ends on withdrawal; (f) needs a balancing test that covers duration.
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

## Art. 9 – Special categories
Processing data "revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, or trade union membership", genetic data, biometric data for unique identification, health data, and data on sex life or sexual orientation is prohibited unless an Art. 9(2) exception applies (e.g. explicit consent, employment/social security law, legal claims). Flag these fields; they need shorter retention, tighter access and usually a DPIA. Criminal-offence data is separately restricted by Art. 10.
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

## Art. 13(2)(a) (and 14(2)(a), 15(1)(d)) – Telling people the retention period
At collection the controller must provide "the period for which the personal data will be stored, or if that is not possible, the criteria used to determine that period". Art. 14(2)(a) is the same for data not collected from the person; Art. 15(1)(d) repeats it for access requests. EDPB: a bare "deleted after statutory periods expire" is **not** sufficient (see `retention-guidance.md`).
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

## Art. 17 – Right to erasure
The data subject can obtain erasure "without undue delay" when, among other grounds, data are no longer necessary for the purpose (17(1)(a)), consent is withdrawn and no other basis exists (b), an objection succeeds (c), processing is unlawful (d), or a legal obligation requires erasure (e). If data were made public, 17(2) requires reasonable steps to inform other controllers.
**17(3) exceptions** – erasure does not apply to the extent processing is necessary: (a) for freedom of expression; (b) "for compliance with a legal obligation which requires processing by Union or Member State law" or a public task; (c) public health; (d) archiving/research/statistics where erasure would seriously impair it; (e) "for the establishment, exercise or defence of legal claims". So bookkeeping records can be kept despite an erasure request, but only the minimum, and other data about the person must still go.
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

## Art. 19 – Notify recipients
The controller "shall communicate any rectification or erasure ... to each recipient to whom the personal data have been disclosed, unless this proves impossible or involves disproportionate effort", and tell the data subject about those recipients on request. Code implication: an erasure flow must fan out to processors and third parties (email, CRM, analytics, payment, support desk).
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

## Art. 12(3) – One-month deadline
Information on action taken on a request under Arts. 15–22 must be given "without undue delay and in any event within one month of receipt"; extendable by two further months for complex/numerous requests, with notice of the extension within the first month. An erasure pipeline that only runs quarterly cannot meet this.
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

## Art. 25 – Data protection by design and by default
25(1): implement measures such as pseudonymisation and data-minimisation at design time. 25(2): by default only data "necessary for each specific purpose" are processed, an obligation that "applies to the amount of personal data collected, the extent of their processing, the period of their storage and their accessibility". Retention is therefore a design requirement: TTLs and purge jobs should exist from day one, not be bolted on.
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

## Art. 28 – Processors
Processing by a processor needs a contract (DPA) that, under 28(3)(g), requires the processor, at the controller's choice, to delete or return all personal data at the end of the service "and deletes existing copies unless Union or Member State law requires storage". Check each SaaS (hosting, email, analytics, error tracking) for a DPA and for its own retention setting.
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

## Art. 30 – Records of processing activities (RoPA)
Controllers must keep a written (electronic OK) record with: controller/DPO contact; purposes; categories of data subjects and data; categories of recipients; third-country transfers; **30(1)(f) "where possible, the envisaged time limits for erasure of the different categories of data"**; and (g) a general description of Art. 32 security measures. Processors keep a parallel record (30(2)). 30(5) exempts organisations under 250 staff **only if** processing is occasional, low-risk and involves no special-category/criminal data, which rarely holds for an app with a user database.
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

## Art. 32 – Security of processing
Measures appropriate to the risk, "including inter alia as appropriate: (a) the pseudonymisation and encryption of personal data", plus confidentiality/integrity/availability, ability to restore after incidents (backups), and regular testing. Retention link: data you no longer hold cannot leak; data kept longer should be pseudonymised/encrypted and access-restricted (e.g. archived invoices separated from the live DB).
Link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679
