// @ts-check
const { test, expect } = require('@playwright/test');

const healthEndpoint = 'https://practice.expandtesting.com/notes/api/health-check';
const sampleSize = 5;
const maxResponseTime = 2000;

test.describe('API performance smoke test', () => {
  test('health-check responds within the expected time', async ({ request }, testInfo) => {
    const responseTimes = [];

    for (let requestNumber = 0; requestNumber < sampleSize; requestNumber += 1) {
      const startedAt = Date.now();
      const response = await request.get(healthEndpoint);
      const responseTime = Date.now() - startedAt;

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
      expect(responseTime).toBeLessThan(maxResponseTime);
      responseTimes.push(responseTime);
    }

    const sortedResponseTimes = [...responseTimes].sort((first, second) => first - second);
    const average = responseTimes.reduce((total, time) => total + time, 0) / responseTimes.length;
    const p95 = sortedResponseTimes[Math.ceil(sortedResponseTimes.length * 0.95) - 1];
    const metrics = {
      endpoint: healthEndpoint,
      requests: sampleSize,
      min: sortedResponseTimes[0],
      max: sortedResponseTimes[sortedResponseTimes.length - 1],
      average,
      p95,
      unit: 'ms',
    };

    await testInfo.attach('api-performance-metrics', {
      body: JSON.stringify(metrics, null, 2),
      contentType: 'application/json',
    });
  });
});
