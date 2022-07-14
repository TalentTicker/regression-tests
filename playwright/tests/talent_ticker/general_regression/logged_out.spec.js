const config = require('../../../playwright.config.js');
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test('Logged out checks', async ({ page }) => {
  await page.goto(config.use.baseURL);

  // Click [data-test="newsNavButton"]
  await page.click('[data-test="newsNavButton"]');
  await expect(page).toHaveURL(config.use.baseURL + 'news');

  await page.click('[placeholder="Search"]');
  await page.type('[placeholder="Search"]', "Accounting");
  await page.click('li[role="option"]:has-text("Accounting")');
  await page.click('[data-test="searchSubmit"]');

  await page.click('button:has-text("Book A Demo")');

  await expect(page).toHaveURL('https://www.selligence.com/tt-demo/');

  await page.goto(config.use.baseURL);

  // Click [data-test="vacanciesNavButton"]
  await page.click('[data-test="vacanciesNavButton"]');
  await expect(page).toHaveURL(config.use.baseURL + 'vacancies');

  await page.click('button:has-text("Sign Up")');

  await expect(page).toHaveURL(config.use.baseURL + 'signup-online');

  await page.click('[alt="Talent Ticker"]');
  
  // Click [data-testid="styled-anchor-tag"] div:has-text("Home")
  await Promise.all([
    page.waitForNavigation(/*{ url: config.use.baseURL + 'home' }*/),
    page.click('[data-testid="styled-anchor-tag"] div:has-text("Home")')
  ]);

});