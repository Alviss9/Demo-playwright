// @ts-check
const { CssLocatorComponent } = require('../utils/css-locator.component');

class OtpLoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.css = new CssLocatorComponent(page);
    this.emailInput = page.getByRole('textbox', { name: 'Your Email Address' });
    this.sendOtpButton = page.getByRole('button', { name: 'Send OTP Code' });
    this.otpInput = this.css.get('#otp');
    this.verifyOtpButton = page.getByRole('button', { name: /Verify OTP Code/ });
    this.errorMessage = page.getByText(/provided OTP code is incorrect/i);
  }

  async open() {
    await this.page.goto('https://practice.expandtesting.com/otp-login');
  }

  /**
   * @param {string} email
   */
  async requestOtp(email) {
    await this.emailInput.fill(email);
    await this.sendOtpButton.click();
  }

  /**
   * @param {string} otp
   */
  async verifyOtp(otp) {
    await this.otpInput.fill(otp);
    await this.verifyOtpButton.click();
  }
}

module.exports = { OtpLoginPage };
