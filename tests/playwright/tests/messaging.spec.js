const config = require('../playwright.config.js');
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test.use({ storageState: 'tests/state.json' });

test("Contact Messaging From Event", async ({ page }) => {
  await page.goto(config.use.baseURL + "home");

  await expect(page).toHaveURL(config.use.baseURL + 'home');
    // Nav to Event
    await page.click("text=News");
  await page.fill('[placeholder="Search"]', 'Talent Ticker');
  await page.click('[data-test="pageTemplate"] >> text=Talent Ticker');
    await page.click('[data-test="searchSubmit"]');
    await page.click(
      "text=Talent Ticker nominated for Digital and Cardiff Start-Up of the Year 2021"
    );
  
    // Search for User
    await page.click("text=Clear all");
    await page.fill(
      '[placeholder="Search\\ by\\ name\\,\\ role\\ or\\ location"]',
      "qa"
    );
    await page.click("text=workQA/Testing");
    await page.click('div[role="combobox"] button:has-text("search")');
  
    // Send Message
    await page.check('input[type="checkbox"]');
    await page.click("text=emailMessage (1)");
    await page.click('text=Send Message');
    await expect(
      page.locator('[class*="RightHandDrawer__DrawerContent"]')
    ).toContainText("Message successfully sent");
    await page.click('div[role="presentation"] button:has-text("close")');
  
    // Sign Out
    await (await page.waitForSelector("#profile-image-wrapper")).click();
    await page.locator("li:has-text('Sign out')").waitFor();
    await page.click("li:has-text('Sign out')");
  });