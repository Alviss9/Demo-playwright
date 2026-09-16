// @ts-check
const { test, expect } = require('@playwright/test');
const { FormValidationPage } = require('../../pages/form-validation.page');

test.describe('Form Validation page', () => {
  test('submits the form with valid values', async ({ page }, testInfo) => {
    const formValidationPage = new FormValidationPage(page);

    await formValidationPage.open();
    await expect(page).toHaveTitle(/Form Validation page for Automation Testing Practice/);

    await formValidationPage.fillForm({
      contactName: 'Playwright User',
      contactNumber: '012-3456789',
      pickupDate: '2026-09-20',
      paymentMethod: 'card',
    });
    await formValidationPage.register();

    await expect(page).toHaveURL(/\/form-confirmation/);
    await expect(
      page.getByRole('heading', { name: 'Form Confirmation page for Automation Testing Practice' }),
    ).toBeVisible();
    await expect(page.getByRole('alert')).toContainText('Thank you for validating your ticket');
    await testInfo.attach('form-validation-success', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  test('requires all fields before registration', async ({ page }, testInfo) => {
    const formValidationPage = new FormValidationPage(page);

    await formValidationPage.open();
    await formValidationPage.register();

    await expect(page).toHaveURL(/\/form-validation/);
    await expect
      .poll(() =>
        formValidationPage.contactNumberInput.evaluate((input) => {
          const inputElement = /** @type {HTMLInputElement} */ (input);
          return inputElement.validity.valid;
        }),
      )
      .toBe(false);
    await testInfo.attach('form-validation-required-fields', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});
