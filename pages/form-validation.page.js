// @ts-check
const { CssLocatorComponent } = require('../utils/css-locator.component');

class FormValidationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.css = new CssLocatorComponent(page);
    this.contactNameInput = this.css.get('#validationCustom01');
    this.contactNumberInput = this.css.get('[name="contactnumber"]');
    this.pickupDateInput = this.css.get('[name="pickupdate"]');
    this.paymentMethodSelect = page.getByRole('combobox', { name: 'Payment Method' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async open() {
    await this.page.goto('https://practice.expandtesting.com/form-validation');
  }

  /**
   * @param {{ contactName: string, contactNumber: string, pickupDate: string, paymentMethod: string }} formData
   */
  async fillForm({ contactName, contactNumber, pickupDate, paymentMethod }) {
    await this.contactNameInput.fill(contactName);
    await this.contactNumberInput.fill(contactNumber);
    await this.pickupDateInput.fill(pickupDate);
    await this.paymentMethodSelect.selectOption(paymentMethod);
  }

  async register() {
    await this.registerButton.click();
  }
}

module.exports = { FormValidationPage };
