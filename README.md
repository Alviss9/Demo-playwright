# Demo-playwright
Playwright API and UI test automation project.

## Requirements

- Node.js `24.19.0`
- npm

## Install

```powershell
npm ci
npx playwright install
```

For Ubuntu CI runners, install browser dependencies with:

```bash
npx playwright install --with-deps
```

## Run tests

Run all tests:

```powershell
npm test
```

Run API tests:

```powershell
npm run test:api
```

Run UI tests with Chromium:

```powershell
npx playwright test --project=chromium
```

Run a specific test group:

```powershell
npm run test:api-register
npm run test:api-profile
npm run test:api-profile-update
npm run test:api-performance
npm run test:performance
```

Run tests in parallel:

```powershell
npm run test:parallel
```

## Reports

Open the latest HTML report with:

```powershell
npm run show-report
```

Test reports and results are generated in `playwright-report/` and `test-results/`.

## CI/CD

GitHub Actions is configured in `.github/workflows/playwright.yml` and runs on pushes or pull requests targeting `main` or `master`.

The workflow runs two jobs:

- API tests with Node.js `24.19.0`
- Chromium UI tests with Node.js `24.19.0`

The workflow uses `actions/checkout@v5`, `actions/setup-node@v5`, and `actions/upload-artifact@v6`. API and UI reports are uploaded as workflow artifacts.

## Git workflow

Check the current status:

```powershell
git status
```

Commit and push changes:

```powershell
git add .
git commit -m "Describe your change"
git push origin main
```

GitHub Actions starts automatically after a push to `main` or `master`.
