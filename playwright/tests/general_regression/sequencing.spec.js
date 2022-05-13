const config = require('../../playwright.config.js');
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test.use({ storageState: 'tests/state.json' });

test('Add, edit and remove a Sequence', async ({ page }) => {
  await page.goto(config.use.baseURL + "home");

  // Go to https://staging.talentticker.ai/en-GB/home
  await page.goto('https://staging.talentticker.ai/en-GB/home');
  // Click [data-test="contatcsNavButton"] svg
  await page.click('[data-test="contatcsNavButton"] svg');
  await expect(page).toHaveURL('https://staging.talentticker.ai/en-GB/outbox');
  // Click text=Schedulesbeta
  await page.click('text=Schedulesbeta');
  await expect(page).toHaveURL('https://staging.talentticker.ai/scheduling');
  // Click text=Create your first Schedule
  await page.click('text=Create your first Schedule');
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
  
  // Click text=Sequencingbeta
  await page.click('text=Sequencingbeta');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing');

  expect(await page.innerText('[class="scheduling"]')).toContain("Sequencing");
  
  // Click text=Create your first Sequence
  await page.click('text=Create your first Sequence');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing/create');
  // Click [data-testid="sequence-name-input"]
  await page.click('[data-testid="sequence-name-input"]');
  // Fill [data-testid="sequence-name-input"]
  await page.fill('[data-testid="sequence-name-input"]', 'Test Sequence');
  // Click [data-testid="add-step-nav-btn"]
  await page.click('[data-testid="add-step-nav-btn"]');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click text=Teststar
  await page.click('text=Teststar');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click li[role="option"]:has-text("Test")
  await page.click('li[role="option"]:has-text("Test")');
  // Click input[name="daysAfter"]
  await page.click('input[name="daysAfter"]');
  // Click input[name="daysAfter"]
  await page.click('input[name="daysAfter"]');
  // Click input[name="daysAfter"]
  await page.click('input[name="daysAfter"]');
  // Click input[name="daysAfter"]
  await page.click('input[name="daysAfter"]');
  // Click button:has-text("Save")
  await page.click('button:has-text("Save")');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing/create');
  // Uncheck input[type="checkbox"]
  await page.uncheck('input[type="checkbox"]');
  // Click [data-testid="add-step-btn"]
  await page.click('[data-testid="add-step-btn"]');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click text=Staging test
  await page.click('text=Staging test');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click li[role="option"]:has-text("Test")
  await page.click('li[role="option"]:has-text("Test")');
  // Click button:has-text("Save")
  await page.click('button:has-text("Save")');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing/create');
  // Click [data-testid="sequence-step-edit"]
  await page.click('[data-testid="sequence-step-edit"]');
  // Click button:has-text("Save")
  await page.click('button:has-text("Save")');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing/create');
  // Click [data-testid="sequence-step-delete"]
  await page.click('[data-testid="sequence-step-delete"]');
  // Click [data-testid="confirm-modal-confirm"]
  await page.click('[data-testid="confirm-modal-confirm"]');
  // Click :nth-match(:text("Save"), 3)
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://staging.talentticker.ai/sequencing' }*/),
    page.click(':nth-match(:text("Save"), 3)')
  ]);
  // Check input[type="checkbox"]
  await page.check('input[type="checkbox"]');
  // Uncheck input[type="checkbox"]
  await page.uncheck('input[type="checkbox"]');
  // Click [data-testid="edit-sequence-button"]
  await page.click('[data-testid="edit-sequence-button"]');
  // Click [data-testid="add-step-nav-btn"]
  await page.click('[data-testid="add-step-nav-btn"]');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click text=Teststar
  await page.click('text=Teststar');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click li[role="option"]:has-text("Test")
  await page.click('li[role="option"]:has-text("Test")');
  // Click button:has-text("Save")
  await page.click('button:has-text("Save")');
  // Click button:has-text("Save")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://staging.talentticker.ai/sequencing' }*/),
    page.click('button:has-text("Save")')
  ]);
  // Click [data-testid="delete-sequence-button"]
  await page.click('[data-testid="delete-sequence-button"]');
  // Click [data-testid="confirm-modal-confirm"]
  await page.click('[data-testid="confirm-modal-confirm"]');
  // Click text=Schedulesbeta
  await page.click('text=Schedulesbeta');
  await expect(page).toHaveURL('https://staging.talentticker.ai/scheduling');
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
    // Click text=Sequencingbeta
    await page.click('text=Sequencingbeta');
    await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing');
    // Click [data-testid="delete-sequence-button"]
    await page.click('[data-testid="delete-sequence-button"]');
    // Click [data-testid="confirm-modal-confirm"]
    await page.click('[data-testid="confirm-modal-confirm"]');
  } catch (e) {
  }
  
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
  try {        
    // Click text=Schedulesbeta
    await page.click('text=Schedulesbeta');
    await expect(page).toHaveURL('https://staging.talentticker.ai/scheduling');
    // Click [data-testid="edit-schedule-btn"]
    await page.click('[data-testid="edit-schedule-btn"]');
    // Click text=Delete
    await page.click('text=Delete');
    // Click [data-testid="confirm-modal-confirm"]
    await page.click('[data-testid="confirm-modal-confirm"]');
  } catch (e) {
  }

});
