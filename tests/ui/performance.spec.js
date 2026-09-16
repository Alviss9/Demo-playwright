// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Performance smoke test', () => {
  test('loads the Challenging DOM page within the expected time', async ({ page }, testInfo) => {
    await page.goto('https://practice.expandtesting.com/challenging-dom', {
      waitUntil: 'load',
    });

    const navigationTiming = await page.evaluate(() => {
      const navigation = /** @type {PerformanceNavigationTiming} */ (
        performance.getEntriesByType('navigation')[0]
      );

      return {
        domContentLoaded: navigation.domContentLoadedEventEnd,
        loadEventEnd: navigation.loadEventEnd,
      };
    });

    expect(navigationTiming.domContentLoaded).toBeGreaterThan(0);
    expect(navigationTiming.loadEventEnd).toBeGreaterThan(0);
    expect(navigationTiming.domContentLoaded).toBeLessThan(5000);
    expect(navigationTiming.loadEventEnd).toBeLessThan(10000);

    await testInfo.attach('navigation-timing', {
      body: JSON.stringify(navigationTiming, null, 2),
      contentType: 'application/json',
    });
  });
});
