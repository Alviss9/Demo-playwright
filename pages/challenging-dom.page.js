// @ts-check

class ChallengingDomPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.table = page.getByRole('table');
    this.tableHeaders = this.table.getByRole('columnheader');
    this.tableRows = this.table.locator('tbody tr');
    this.canvas = page.locator('canvas');
    this.actionLinks = page.getByRole('link', { name: /^(baz|qux|foo)$/ });
    this.editLinks = page.getByRole('link', { name: 'Edit' });
    this.deleteLinks = page.getByRole('link', { name: 'Delete' });
  }

  async open() {
    await this.page.goto('https://practice.expandtesting.com/challenging-dom');
  }

  /**
   * @param {number} rowIndex
   */
  row(rowIndex) {
    return this.table.getByRole('row').nth(rowIndex + 1);
  }
}

module.exports = { ChallengingDomPage };
