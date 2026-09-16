// @ts-check
const { CssLocatorComponent } = require('../utils/css-locator.component');

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.css = new CssLocatorComponent(page);
    this.usernameInput = this.css.get('#username');
    this.passwordInput = this.css.get('#password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = this.css.get('#flash');
  }

  async open() {
    await this.page.goto('https://practice.expandtesting.com/login');
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
