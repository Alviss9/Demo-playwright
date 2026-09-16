// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/login.page');

test.describe('Login page', () => {
  test('logs in with valid credentials', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await expect(page).toHaveTitle(/Login Page/);

    await loginPage.login('practice', 'SuperSecretPassword!');

    await expect(page).toHaveURL(/\/secure/);
    await expect(
      page.getByRole('heading', { name: 'Secure Area page for Automation Testing Practice' }),
    ).toBeVisible();
    await testInfo.attach('login-success', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  test('shows an error for invalid credentials', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('practice', 'wrong-password');

    await expect(loginPage.errorMessage).toContainText(/invalid|incorrect/i);
    await testInfo.attach('login-error', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});