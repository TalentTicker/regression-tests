const config = require('../../playwright.config.js');
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test.use({ storageState: 'tests/state.json' });

test('Add, edit and remove a Sequence', async ({ page }) => {
  await page.goto(config.use.baseURL + "home");

  // Go to https://staging.talentticker.ai/en-GB/home
  await page.goto('https://staging.talentticker.ai/en-GB/home');

  // Click [data-test="contatcsNavButton"]
  await page.click('[data-test="contatcsNavButton"]');
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
  // Check text=Default Timezone​​Exclude UK & US federal holidays from schedule >> input[type="checkbox"]
  await page.check('text=Default Timezone​​Exclude UK & US federal holidays from schedule >> input[type="checkbox"]');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click text=(UTC) Western Europe Time, London, Lisbon, Casablanca
  await page.click('text=(UTC) Western Europe Time, London, Lisbon, Casablanca');
  // Click [data-testid="submit-btn"]
  await page.click('[data-testid="submit-btn"]');
  // Click text=Sequencingbeta
  await page.click('text=Sequencingbeta');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing');
  // Click text=Create your first Sequence
  await page.click('text=Create your first Sequence');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing/create');
  // Click [data-testid="sequence-name-input"]
  await page.click('[data-testid="sequence-name-input"]');
  // Fill [data-testid="sequence-name-input"]
  await page.fill('[data-testid="sequence-name-input"]', 'TTest Sequence');
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
  // Click text=Test Schedule
  await page.click('text=Test Schedule');
  // Click button:has-text("Save")
  await page.click('button:has-text("Save")');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing/create');
  // Click [data-testid="add-step-nav-btn"]
  await page.click('[data-testid="add-step-nav-btn"]');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click text=Staging test
  await page.click('text=Staging test');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click text=Test Schedule
  await page.click('text=Test Schedule');
  // Click button:has-text("Save")
  await page.click('button:has-text("Save")');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing/create');
  // Uncheck input[type="checkbox"]
  await page.uncheck('input[type="checkbox"]');
  // Check input[type="checkbox"]
  await page.check('input[type="checkbox"]');
  // Click [data-testid="sequence-step-edit"]
  await page.click('[data-testid="sequence-step-edit"]');
  // Click text=Teststar
  await page.click('text=Teststar');
  // Click text=Regression Tests
  await page.click('text=Regression Tests');
  // Click button:has-text("Save")
  await page.click('button:has-text("Save")');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing/create');
  // Click text=Auto Email • Step 2Staging test Test email - please ignoreHi $firstname $lastnam >> [data-testid="sequence-step-delete"]
  await page.click('text=Auto Email • Step 2Staging test Test email - please ignoreHi $firstname $lastnam >> [data-testid="sequence-step-delete"]');
  // Click text=Auto Email • Step 2Staging test Test email - please ignoreHi $firstname $lastnam >> [data-testid="confirm-modal-confirm"]
  await page.click('text=Auto Email • Step 2Staging test Test email - please ignoreHi $firstname $lastnam >> [data-testid="confirm-modal-confirm"]');
  // Click button:has-text("Save")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://staging.talentticker.ai/sequencing/templates' }*/),
    page.click('button:has-text("Save")')
  ]);
  // Click [data-testid="edit-sequence-button"]
  await page.click('[data-testid="edit-sequence-button"]');
  // Click button:has-text("Save")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://staging.talentticker.ai/sequencing/templates' }*/),
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
