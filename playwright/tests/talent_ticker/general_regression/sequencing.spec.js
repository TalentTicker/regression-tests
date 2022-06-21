const config = require('../../../playwright.config.js');
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test.use({ storageState: 'tests/state.json' });

test('Add, edit and remove a Sequence', async ({ page }) => {
  await page.goto(config.use.baseURL + "home");

  await expect(page).toHaveURL(config.use.baseURL + 'home');

  // Click #profileImgWrap
  await page.click('#profileImgWrap');
  // Click text=Sign out
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://staging.talentticker.ai/logout' }*/),
    page.click('text=Sign out')
  ]);
  // Go to https://staging.talentticker.ai/
  await page.goto('https://staging.talentticker.ai/');

  // Click text=Log In
  await page.click('text=Log In');
  expect(await page.innerText('h1')).toBe("Welcome to Talent Ticker");
  await expect(page).toHaveURL(new RegExp('https://auth.talentticker.ai'));
  expect(await page.innerText('[class="message"]')).toBe("Please log in to continue.");
  // Fill [placeholder="Your\ email"]
  await page.fill('input[type="email"]', process.env.GMAIL_USERNAME);
  // Fill [placeholder="Your\ password"]
  await page.fill('input[type="password"]', process.env.GMAIL_PASSWORD);
  // Click button:has-text("Log In")
  await Promise.all([
    page.waitForNavigation(/*{ url: config.use.baseURL + 'home' }*/),
    page.click('button:has-text("Log In")')
  ]);

  await expect(page).toHaveURL(config.use.baseURL + 'home');

  // Click [data-test="contatcsNavButton"]
  await page.click('[data-test="contatcsNavButton"]');
  await expect(page).toHaveURL('https://staging.talentticker.ai/outbox');
  
  // Click text=Sequencingbeta
  await page.click('text=Sequencingbeta');

  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing');
  // Click text=Create your first Sequence
  await page.click('text=Create your first Sequence');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing/create');
  // Click [data-testid="sequence-name-input"]
  await page.click('[data-testid="sequence-name-input"]');
  // Fill [data-testid="sequence-name-input"]
  await page.fill('[data-testid="sequence-name-input"]', 'Test Sequence');
  // Check input[type="checkbox"]
  await page.check('input[type="checkbox"]');
  // Click [data-testid="add-step-nav-btn"]
  await page.click('[data-testid="add-step-nav-btn"]');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click text=TalentTicker
  await page.click('text=TalentTicker');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click text=Test Schedule
  await page.click('text=Test Schedule');
  // Click button:has-text("Save")
  await page.click('button:has-text("Save")');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing/create');
  // Uncheck [data-testid="sequence-step-item"] input[type="checkbox"]
  await page.uncheck('[data-testid="sequence-step-item"] input[type="checkbox"]');
  // Check [data-testid="sequence-step-item"] input[type="checkbox"]
  await page.check('[data-testid="sequence-step-item"] input[type="checkbox"]');
  // Click [data-testid="sequence-step-edit"]
  await page.click('[data-testid="sequence-step-edit"]');
  // Click button:has-text("Save")
  await page.click('button:has-text("Save")');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing/create');
  // Click [data-testid="add-step-btn"]
  await page.click('[data-testid="add-step-btn"]');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click text=TalentTicker
  await page.click('text=TalentTicker');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click text=Test Schedule
  await page.click('text=Test Schedule');
  // Click button:has-text("Save")
  await page.click('button:has-text("Save")');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing/create');
  // Click [data-testid="sequence-step-delete"]
  await page.click('[data-testid="sequence-step-delete"]');
  // Click [data-testid="confirm-modal-confirm"]
  await page.click('[data-testid="confirm-modal-confirm"]');
  // Click button:has-text("Save")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://staging.talentticker.ai/sequencing/templates' }*/),
    page.click('button:has-text("Save")')
  ]);
  // Click [data-testid="edit-sequence-button"]
  await page.click('[data-testid="edit-sequence-button"]');
  // Click [data-testid="add-step-nav-btn"]
  await page.click('[data-testid="add-step-nav-btn"]');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click text=TalentTicker
  await page.click('text=TalentTicker');
  // Click div[role="button"]:has-text("​")
  await page.click('div[role="button"]:has-text("​")');
  // Click text=Test Schedule
  await page.click('text=Test Schedule');
  // Click button:has-text("Save")
  await page.click('button:has-text("Save")');
  // Click button:has-text("Save")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://staging.talentticker.ai/sequencing/templates' }*/),
    page.click('button:has-text("Save")')
  ]);

  // Click button:has-text("Active Sequences")
  await page.click('button:has-text("Active Sequences")');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing/active');

  // Expect Overall Stats
  expect(await page.innerText('[data-testid="overall-stats"]')).toContain("Active");

  // Expect Assigned
  expect(await page.innerText('[data-testid="overall-stats"]')).toContain("Contacts Assigned");

  // Expect Delivered
  expect(await page.innerText('[data-testid="overall-stats"]')).toContain("Delivered");

  // Expect Read
  expect(await page.innerText('[data-testid="overall-stats"]')).toContain("Read");

  // Click button:has-text("Sequence Templates")
  await page.click('button:has-text("Sequence Templates")');
  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing/templates');

  // Click [data-testid="delete-sequence-button"]
  await page.click('[data-testid="delete-sequence-button"]');
  // Click [data-testid="confirm-modal-confirm"]
  await page.click('[data-testid="confirm-modal-confirm"]');
  // Click text=Schedulesbeta
  await page.click('text=Schedulesbeta');
  
  // Click text=Sequencingbeta
  await page.click('text=Sequencingbeta');

  await expect(page).toHaveURL('https://staging.talentticker.ai/sequencing');
  // Expect button with text=Create your first Sequence
  expect (await page.locator('button', { hasText: 'Create your first Sequence' }));
  
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
