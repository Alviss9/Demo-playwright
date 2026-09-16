// @ts-check
const { test, expect } = require('@playwright/test');
const { InputsPage } = require('../../pages/inputs.page');

test.describe('Inputs page', () => {
  test('fills and validates input values', async ({ page }, testInfo) => {
    const inputsPage = new InputsPage(page);

    await inputsPage.open();

    await expect(page).toHaveTitle(/Web inputs page for Automation Testing Practice/);

    await inputsPage.textInput.fill('Playwright');
    await inputsPage.numberInput.fill('123');
    await inputsPage.passwordInput.fill('InputPassword123!');
    await inputsPage.dateInput.fill('2026-09-14');

    await expect(inputsPage.textInput).toHaveValue('Playwright');
    await expect(inputsPage.numberInput).toHaveValue('123');
    await expect(inputsPage.passwordInput).toHaveValue('InputPassword123!');
    await expect(inputsPage.dateInput).toHaveValue('2026-09-14');

    await testInfo.attach('inputs-page', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});
