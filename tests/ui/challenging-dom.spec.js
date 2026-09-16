// @ts-check
const { test, expect } = require('@playwright/test');
const { ChallengingDomPage } = require('../../pages/challenging-dom.page');

test.describe('Challenging DOM page', () => {
  test('displays the dynamic table and canvas', async ({ page }, testInfo) => {
    const challengingDomPage = new ChallengingDomPage(page);

    await challengingDomPage.open();

    await expect(page).toHaveTitle(/Challenging DOM page for Automation Testing Practice/);
    await expect(challengingDomPage.canvas).toBeVisible();
    await expect(challengingDomPage.table).toBeVisible();
    await expect(challengingDomPage.tableHeaders).toHaveCount(7);
    await expect(challengingDomPage.tableRows).toHaveCount(10);
    await expect(challengingDomPage.editLinks).toHaveCount(10);
    await expect(challengingDomPage.deleteLinks).toHaveCount(10);

    await testInfo.attach('challenging-dom-page', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  test('supports actions on a table row', async ({ page }, testInfo) => {
    const challengingDomPage = new ChallengingDomPage(page);

    await challengingDomPage.open();

    await expect(challengingDomPage.row(0)).toContainText('Iuvaret0');
    await challengingDomPage.row(0).getByRole('link', { name: 'Edit' }).click();
    await expect(page).toHaveURL(/#edit$/);

    await testInfo.attach('challenging-dom-row-action', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});
