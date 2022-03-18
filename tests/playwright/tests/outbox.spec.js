const config = require('../playwright.config.js');
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test.use({ storageState: 'tests/state.json' });

test("Messaging", async ({ page }) => {
  await page.goto(config.use.baseURL + "home");

  await expect(page).toHaveURL(config.use.baseURL + 'home');
  // Nav To Sourcing - Search
  await page.click('[data-test="talentSourcingNavButton"]');
  await page.click("[data-testid=sourcing-job-title]");
  await page.fill('[placeholder="e\\.g\\.\\ Digital\\ Designer"]', "qa");
  await page.click('li[role="option"]:has-text("qa")');
  await page.click("[data-testid=sourcing-company]");
  await page.fill('[placeholder="e\\.g\\.\\ Monzo\\ Bank"]', "talent ticker");
  await page.click('li[role="option"]:has-text("Talent Ticker")');
  await page.click('[data-testid="search-btn"]');

  // Send Message
  await page.check('[data-testid="checkbox"] input[type="checkbox"]');
  await page.click('text=emailMessage (1)');
  await page.click('text=Send Message');
  await expect(
    page.locator('[class*="RightHandDrawer__DrawerContent"]')
  ).toContainText("Message successfully sent");
  await page.click('div[role="presentation"] button:has-text("close")');

  // Check Contact Page - Total
  await page.click('[data-test="contatcsNavButton"] svg');
  await expect(page).toHaveURL(config.use.baseURL + 'outbox');
  await page.click("text=Sent");

  // Sign Out
  await (await page.waitForSelector("#profile-image-wrapper")).click();
  await page.locator("li:has-text('Sign out')").waitFor();
  await page.click("li:has-text('Sign out')");
});
