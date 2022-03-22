const config = require('../playwright.config.js');
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test.use({ storageState: 'tests/state.json' });

test("Saved Search", async ({ page }) => {
  await page.goto(config.use.baseURL + "home");

  await expect(page).toHaveURL(config.use.baseURL + 'home');
  // Create Saved Search
  await page.click('[data-test="newsNavButton"]');
  await expect(page).toHaveURL(config.use.baseURL + 'news');
  await page.click('[placeholder="Search"]');
  await page.type('[placeholder="Search"]', "Accounting");
  await page.click("text=Accounting");
  await page.click('[data-test="searchSubmit"]');
  await page.click('[data-test="searchSave"]');

  // Delete Saved Search
  await page.click('[data-test="savedSearchesNavButton"]');
  await page.click(
    "text=AccountingeditNEWSVACANCIESBOTHSearch Now >> :nth-match(button, 4)"
  );
  await page.click(
    "text=AccountingeditNEWSVACANCIESBOTHSearch Now >> :nth-match(button, 4)"
  );

  // Sign Out
  await page.click("#profileImgWrap");
  await Promise.all([
    page.waitForNavigation(/*{ url: config.use.baseURL }*/),
    page.click("text=Sign out"),
  ]);
});
