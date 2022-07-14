import { test, expect } from '@playwright/test';
require('dotenv').config();

test('Logged out checks', async ({ page }) => {
  await page.goto(process.env.BASE_URL);

  // Sign Out
  await page.click("#profileImgWrap");
  await Promise.all([
    page.waitForNavigation(/*{ url: process.env.BASE_URL }*/),
    page.click("text=Sign out"),
  ]);

  // Click [data-test="newsNavButton"]
  await page.click('[data-test="newsNavButton"]');
  await expect(page).toHaveURL(process.env.BASE_URL + 'news');

  await page.click('[placeholder="Search"]');
  await page.type('[placeholder="Search"]', "Accounting");
  await page.click('li[role="option"]:has-text("Accounting")');
  await page.click('[data-test="searchSubmit"]');

  await page.click('button:has-text("Book a demo")');

  await expect(page).toHaveURL('https://www.selligence.com/tt-demo/');

  await page.goto(process.env.BASE_URL);

  // Click [data-test="vacanciesNavButton"]
  await page.click('[data-test="vacanciesNavButton"]');
  await expect(page).toHaveURL(process.env.BASE_URL + 'vacancies');

  await page.click('button:has-text("Sign Up")');

  await expect(page).toHaveURL(process.env.BASE_URL + 'signup-online');

  await page.click('[alt="Talent Ticker"]');
  
  // Click [data-testid="styled-anchor-tag"] div:has-text("Home")
  await Promise.all([
    page.waitForNavigation(/*{ url: process.env.BASE_URL + 'home' }*/),
    page.click('[data-testid="styled-anchor-tag"] div:has-text("Home")')
  ]);

});