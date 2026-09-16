// @ts-check

class CssLocatorComponent {
  /**
   * @param {import('@playwright/test').Page | import('@playwright/test').Locator} parent
   */
  constructor(parent) {
    this.parent = parent;
  }

  /**
   * Return a locator for all elements matching a CSS selector.
   * @param {string} selector
   */
  get(selector) {
    return this.parent.locator(selector);
  }

  /**
   * @param {string} selector
   */
  first(selector) {
    return this.get(selector).first();
  }

  /**
   * @param {string} selector
   */
  last(selector) {
    return this.get(selector).last();
  }

  /**
   * @param {string} selector
   * @param {number} index
   */
  nth(selector, index) {
    return this.get(selector).nth(index);
  }
}

module.exports = { CssLocatorComponent };
