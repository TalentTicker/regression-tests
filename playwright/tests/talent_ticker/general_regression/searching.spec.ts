import { test, expect } from '@playwright/test';
require('dotenv').config();

test.use({ storageState: 'tests/state.json' });

test("Saved Search", async ({ page }) => {
  await page.goto(process.env.BASE_URL + "home");

  await expect(page).toHaveURL(process.env.BASE_URL + 'home');
  // Create Saved Search
  await page.click('[data-test="newsNavButton"]');
  await expect(page).toHaveURL(process.env.BASE_URL + 'news');
  await page.click('[placeholder="Search"]');
  await page.type('[placeholder="Search"]', "Accounting");
  await page.click('li[role="option"]:has-text("Accounting")');
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
    page.waitForNavigation(/*{ url: process.env.BASE_URL }*/),
    page.click("text=Sign out"),
  ]);
});
