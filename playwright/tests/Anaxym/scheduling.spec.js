const config = require('../../playwright.config.js');
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test('Add, Edit, Delete Schedule', async ({ page }) => {
  await page.goto(process.env.ANAXYM_BASE_URL);

   // Click text=Log In
   await page.click('text=Log In');
   await expect(page).toHaveURL(new RegExp('https://auth.talentticker.ai'));
   expect(await page.innerText('[class="message"]')).toBe("Please log in to continue.");
   // Fill [placeholder="Your\ email"]
   await page.fill('input[type="email"]', process.env.LOGIN_USERNAME);
   // Fill [placeholder="Your\ password"]
   await page.fill('input[type="password"]', process.env.LOGIN_PASSWORD);
   // Click button:has-text("Log In")
   await Promise.all([
     page.waitForNavigation(/*{ url: process.env.ANAXYM_BASE_URL + 'home' }*/),
     page.click('button:has-text("Log In")')
   ]);
 
   await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + 'home');
   expect(await page.innerText('h1')).toContain("Team Manager");
  // Click [data-test="contatcsNavButton"] svg
  await page.click('[data-test="contatcsNavButton"]');
  await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + 'outbox');
  // Click text=Schedulesbeta
  await page.click('text=Schedulesbeta');
  await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + 'scheduling');
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