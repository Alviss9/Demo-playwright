// @ts-check
const { test, expect } = require('@playwright/test');
const { OtpLoginPage } = require('../../pages/otp-login.page');

const testEmail = 'practice@expandtesting.com';
const validOtp = '214365';

test.describe('OTP Login page', () => {
  test('logs in with a valid OTP', async ({ page }, testInfo) => {
    const otpLoginPage = new OtpLoginPage(page);

    await otpLoginPage.open();
    await expect(page).toHaveTitle(/OTP Login page for Automation Testing Practice/);

    await otpLoginPage.requestOtp(testEmail);
    await expect(page).toHaveTitle(/OTP Verification page for Automation Testing Practice/);
    await expect(otpLoginPage.otpInput).toBeVisible();

    await otpLoginPage.verifyOtp(validOtp);

    await expect(page).toHaveURL(/\/secure/);
    await expect(
      page.getByRole('heading', { name: 'Secure Area page for Automation Testing Practice' }),
    ).toBeVisible();
    await testInfo.attach('otp-login-success', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  test('shows an error for an invalid OTP', async ({ page }, testInfo) => {
    const otpLoginPage = new OtpLoginPage(page);

    await otpLoginPage.open();
    await otpLoginPage.requestOtp(testEmail);
    await otpLoginPage.verifyOtp('000000');

    await expect(page).toHaveURL(/\/otp-verification/);
    await expect(otpLoginPage.errorMessage).toContainText(/invalid|incorrect/i);
    await testInfo.attach('otp-login-error', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});
