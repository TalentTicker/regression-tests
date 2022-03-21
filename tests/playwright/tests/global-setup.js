const config = require('../playwright.config.js');
const { chromium, expect } = require('@playwright/test');
require('dotenv').config();

module.exports = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(config.use.baseURL);

  // Click text=Log In
  await page.click('text=Log In');
  expect(await page.innerText('h1')).toBe("Welcome to Talent Ticker");
  expect(await page.innerText('[class="message"]')).toBe("Please log in to continue.");
  // Fill [placeholder="Your\ email"]
  // await page.fill('input[type="email"]', process.env.LOGIN_USERNAME);
  await page.fill('input[type="email"]', "automation.enterprise@talentticker.ai");
  // Fill [placeholder="Your\ password"]
  await page.fill('input[type="password"]', "password1234");
  // Click button:has-text("Log In")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://dev.talentticker.ai/home' }*/),
    page.click('button:has-text("Log In")')
  ]);

  await expect(page).toHaveURL(config.use.baseURL + 'home');
  expect(await page.innerText('h1')).toContain("Shaun Enterprise");

  await page.context().storageState({ path: 'tests/state.json' });
  await browser.close();  
};