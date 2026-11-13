# What counts as a worthwhile sweep job

Sources checked as of 2026-11-12.

## Categories, with the principle behind each

| Category | Signal to look for | Why it matters (source) |
|---|---|---|
| Vulnerable dependency | `npm audit`, `pip-audit`, `osv-scanner`, or a pinned version with a known CVE (e.g. lodash < 4.17.21: [CVE-2021-23337](https://nvd.nist.gov/vuln/detail/CVE-2021-23337), [CVE-2020-8203](https://nvd.nist.gov/vuln/detail/CVE-2020-8203)) | [OWASP Top 10 2025 A03 Software Supply Chain Failures](https://owasp.org/Top10/2025/A03_2025-Software_Supply_Chain_Failures/) (successor to A06:2021 Vulnerable and Outdated Components) |
| Outdated dependency (no CVE) | `npm outdated`, `pip list --outdated`; major versions behind | Patch/minor bumps are meant to be backward compatible under [Semantic Versioning 2.0.0](https://semver.org/) §7–8, so they are cheap; majors are not – suggest, don't do |
| Likely bug | Wrong maths/units, unchecked errors, off-by-one, inverted conditions, TODO/FIXME describing a defect | A defect found before release is far cheaper than one found in production ([NIST Planning Report 02-3, 2002](https://www.nist.gov/system/files/documents/director/planning/report02-3.pdf)) |
| Missing tests | Modules with logic but no tests; `"test": "echo Error..."` placeholder | Tests should cover business logic first; small, fast unit tests give the most value per effort ([Google Testing Blog – Test Sizes](https://testing.googleblog.com/2010/12/test-sizes.html); [Fowler – Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)) |
| Docs gap | README without install, run, test steps; undocumented env vars | A README should tell a newcomer what the project does and how to use it ([GitHub Docs – About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)) |
| Lint / type errors | Existing linter or `tsc --noEmit` failing | Cheap to fix when the tooling already exists |
| Compliance / UX | Findings from the audit skills | Each audit skill cites its own sources |

## Estimating

- **Effort**: S ≤ 30 min (one file, obvious fix, test included) · M ≤ half day · L > half day or needs a decision.
- **Impact**: High = security, data loss, legal exposure, money or a broken main flow · Med = noticeable to users or developers · Low = hygiene.
- Rank by impact ÷ effort; at a tie, security and data-loss items first. This is a plain impact/effort (value vs. complexity) prioritisation, as in [ICE / RICE-style scoring](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/).

## Safe to do on the sweep branch

- Bug fix with a failing-then-passing test.
- Patch/minor dependency bump when tests pass (lockfile updated).
- Add a test file for untested pure logic; replace a placeholder test script.
- README install/run/test section.

## Suggest only (never do in a sweep)

- Major version upgrades, framework migrations, schema migrations.
- Anything touching deploy config, secrets, CI permissions, or production data.
- Deleting code or files the user may still need.
- Anything needing network push, publish, release or deploy.
