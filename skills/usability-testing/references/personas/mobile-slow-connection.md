# Persona: Mobile user on a slow connection

Sources checked as of 2026-11-12.

## Bio
Diego, 23, uses a mid-range Android phone on a prepaid data plan, often on a bus with patchy coverage, one-handed.
Represents mobile-first users and anyone on constrained networks or devices (Core Web Vitals are assessed separately for mobile: https://web.dev/articles/vitals).

## Goals
- Finish a short task (find info, sign up, pay) in a few minutes on a small screen.
- Not lose progress when the connection drops or is slow.

## Behaviours and constraints the agent must simulate
- **Viewport**: 375x667 CSS px (iPhone SE/8 class), `isMobile: true`, `hasTouch: true`, deviceScaleFactor 2; also rotate to 667x375 to check orientation (WCAG 1.3.4). Playwright emulation: https://playwright.dev/docs/emulation
- **Touch only**: use tap (`locator.tap()` / touchscreen: https://playwright.dev/docs/api/class-touchscreen); no hover, no keyboard shortcuts, no right-click. Hover-only content is a finding.
- **Measure target sizes**: bounding box of every tappable element; flag under 24x24 CSS px (WCAG 2.5.8 AA) and note under 44x44 pt (Apple) / 48x48 dp (Material) as usability findings (sources in `../patterns.md`).
- **Network throttling** via CDP `Network.emulateNetworkConditions` (throughput in bytes/s, latency in ms: https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-emulateNetworkConditions). Use Chrome DevTools preset values, as defined in DevTools source `front_end/core/sdk/NetworkManager.ts` (https://github.com/ChromeDevTools/devtools-frontend/blob/main/front_end/core/sdk/NetworkManager.ts):

| DevTools preset (Chrome 127+) | Former name | Download | Upload | Latency | CDP values |
|---|---|---|---|---|---|
| 3G | Slow 3G | 400 kbit/s | 400 kbit/s | 2000 ms | `downloadThroughput: 50000, uploadThroughput: 50000, latency: 2000` |
| Slow 4G | Fast 3G | 1.44 Mbit/s | 675 kbit/s | 562.5 ms | `downloadThroughput: 180000, uploadThroughput: 84375, latency: 562.5` |
| Fast 4G | (new) | 8.1 Mbit/s | 1.35 Mbit/s | 165 ms | `downloadThroughput: 1012500, uploadThroughput: 168750, latency: 165` |

  Rename source: "What's new in DevTools, Chrome 127": https://developer.chrome.com/blog/new-in-devtools-127 . Default to **Slow 4G**; use **3G** for a worst-case pass. Optionally add CPU throttling 4x (DevTools device mode: https://developer.chrome.com/docs/devtools/device-mode).
- Record time from navigation/tap to first useful content and to visible feedback. Over 1 s with no feedback, or over 10 s without progress, is a finding (https://www.nngroup.com/articles/response-times-3-important-limits/).
- **Interruptions**: go offline mid-form (`offline: true`) then back online and submit; reload a half-filled form; check whether input survives and the error is understandable.
- Watch for layout shift: tap targets moving as images/ads load (CLS, https://web.dev/articles/cls).
- Gives up if the main content has not appeared after 10 s with no progress indicator.

## What this persona typically surfaces
- Small or crowded tap targets.
- Horizontal scrolling, fixed-width elements, text too small, zoom disabled (`user-scalable=no`).
- Wrong mobile keyboards (missing `type=email`/`tel`/`inputmode`), no autofill.
- Blank screens or spinners with no progress on slow networks; heavy images/JS; no skeletons.
- Layout shift causing mis-taps; sticky banners eating the viewport; modals that cannot be dismissed on small screens.
- Lost form data after a network error or reload; double charges from retries.

## Maps to
- WCAG: 2.5.8 Target Size (Minimum), 2.5.7 Dragging Movements, 1.3.4 Orientation, 1.4.10 Reflow, 1.3.5 Identify Input Purpose, 3.3.7 Redundant Entry (see `../wcag-22-aa.md`).
- Heuristics: H1 Visibility of system status, H3 User control and freedom, H5 Error prevention, H8 Aesthetic and minimalist design; Fitts's law (see `../heuristics.md`).
- Performance: LCP at most 2.5 s, INP at most 200 ms, CLS at most 0.1 (https://web.dev/articles/vitals). A throttled agent run is lab data, not field data.
