// @ts-check

class InputsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.numberInput = page.getByRole('spinbutton', { name: 'Input: Number' });
    this.textInput = page.getByRole('textbox', { name: 'Input: Text' });
    this.passwordInput = page.getByRole('textbox', { name: 'Input: Password' });
    this.dateInput = page.getByRole('textbox', { name: 'Input: Date' });
  }

  async open() {
    await this.page.goto('https://practice.expandtesting.com/inputs');
  }
}

module.exports = { InputsPage };
