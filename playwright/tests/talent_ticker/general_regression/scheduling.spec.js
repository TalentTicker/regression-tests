const config = require('../../../playwright.config.js');
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test.use({ storageState: 'tests/state.json' });

test('Add, Edit, Delete Schedule', async ({ page }) => {
  await page.goto(config.use.baseURL + "home");

    // Go to https://staging.talentticker.ai/home
    await page.goto('https://staging.talentticker.ai/home');
  // Click [data-test="contatcsNavButton"] svg
  await page.click('[data-test="contatcsNavButton"] svg');
  await expect(page).toHaveURL('https://staging.talentticker.ai/outbox');
  // Click text=Schedulesbeta
  await page.click('text=Schedulesbeta');
  await expect(page).toHaveURL('https://staging.talentticker.ai/scheduling');
  // Correct Method
  await page.waitForSelector('[class="scheduling"]').then(() => {
    // Click text=Create your first Schedule
    page.click('text=Create your first Schedule');
  }).catch(e => {
    console.log('Failed to find create first schedule button');
    throw (e);
  });
  
  // Click [placeholder="Name\ your\ schedule\.\.\."]
  await page.click('[placeholder="Name\\ your\\ schedule\\.\\.\\."]');
  // Fill [placeholder="Name\ your\ schedule\.\.\."]
  await page.fill('[placeholder="Name\\ your\\ schedule\\.\\.\\."]', 'Test Schedule');
  // Check text=​Use prospects timezone as defaultDefault Timezone​​Exclude UK & US federal holi >> input[type="checkbox"]
  await page.check('text=​Use prospects timezone as defaultDefault Timezone​​Exclude UK & US federal holi >> input[type="checkbox"]');
  // Click [data-testid="submit-btn"]
  await page.click('[data-testid="submit-btn"]');

  // Click [data-testid="edit-schedule-btn"]
  await page.click('[data-testid="edit-schedule-btn"]');
  // Uncheck text=​Use prospects timezone as defaultDefault Timezone​​A default timezone is requir >> input[type="checkbox"]
  await page.uncheck('text=​Use prospects timezone as defaultDefault Timezone​​A default timezone is requir >> input[type="checkbox"]');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click text=(UTC) Western Europe Time, London, Lisbon, Casablanca
  await page.click('text=(UTC) Western Europe Time, London, Lisbon, Casablanca');
  // Click [data-testid="submit-btn"]
  await page.click('[data-testid="submit-btn"]');
  
  // Click [data-testid="edit-schedule-btn"]
  await page.click('[data-testid="edit-schedule-btn"]');
  // Click text=Delete
  await page.click('text=Delete');
  // Click [data-testid="confirm-modal-confirm"]
  await page.click('[data-testid="confirm-modal-confirm"]');

});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
  try {        
    // Click [data-testid="edit-schedule-btn"]
    await page.click('[data-testid="edit-schedule-btn"]');
    // Click text=Delete
    await page.click('text=Delete');
    // Click [data-testid="confirm-modal-confirm"]
    await page.click('[data-testid="confirm-modal-confirm"]');
  } catch (e) {
  }
});