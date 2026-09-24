# Web / Frontend Preferences

- Builds web UIs with Next.js. Confidence: 0.85
- Wants internationalization (i18n) support with English as the default language and Indonesian as the alternate; expects research + a concrete implementation approach before wiring it in. Confidence: 0.8
- Prefers a compact flag-based language selector implemented as an interactive toggle (not a dropdown/list), with a smooth animation between flags. Confidence: 0.75
- Cares about real performance work: asks "how about the performance?" and expects proper optimization, not superficial tweaks. Confidence: 0.75
- Uses Playwright as the project's end-to-end test suite and refers to it by its raw CLI command (`npx playwright test`); expects that suite to be the harness/gate used to find and verify issues. Confidence: 0.8
- Deploys the project to Vercel. Confidence: 0.8
- Optimizations must never reduce functionality: performance work should be done "tanpa mengurangi fungsionalitas sama sekali" — no feature, animation, interaction, or visible behavior may be removed or altered, only how much/how efficiently things load. Confidence: 0.85
- Expects localization audits to go beyond matching locale keys: all visible UI copy should use translated keys, EN/ID placeholders must match, namespaces must be correct at runtime, and missing-message errors should be caught before completion. Confidence: 0.95
