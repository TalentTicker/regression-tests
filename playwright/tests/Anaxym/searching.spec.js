const config = require('../../playwright.config.js');
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test("Saved Search", async ({ page }) => {
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
  // Create Saved Search
  await page.click('[data-test="newsNavButton"]');
  await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + 'news');
  await page.click('[placeholder="Search"]');
  await page.type('[placeholder="Search"]', "Accounting");
  await page.click('li[role="option"]:has-text("Accounting")');
  await page.click('[data-test="searchSubmit"]');
  // Expect text=Accounting
  expect (await page.innerText('[data-testid="search-results-container"]')).toContain("Accounting");
  await page.click('[data-test="searchSave"]');

  // Delete Saved Search
  await page.click('[data-test="savedSearchesNavButton"]');
  // Click text=AccountingeditSearch Now >> :nth-match(button, 4)
  await page.click('text=AccountingeditSearch Now >> :nth-match(button, 4)');

  // Sign Out
  await page.click("#profileImgWrap");
  await Promise.all([
    page.waitForNavigation(/*{ url: process.env.ANAXYM_BASE_URL }*/),
    page.click("text=Sign out"),
  ]);
});
