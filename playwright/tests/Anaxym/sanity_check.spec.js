const config = require('../../playwright.config.js');
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test('homepage', async ({ page }) => {

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

  await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + 'home');
  expect(await page.innerText('h1')).toContain("Team Manager");

  // Click [data-test="newsNavButton"]
  await page.click('[data-test="newsNavButton"]');
  await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + 'news');
  // Click [data-test="talentSourcingNavButton"]
  await Promise.all([
    page.waitForNavigation(/*{ url: process.env.ANAXYM_BASE_URL + 'prospecting' }*/),
    page.click('[data-test="talentSourcingNavButton"]')
  ]);

  // Click [data-test="marketMappingNavButton"]
  await page.click('[data-test="marketMappingNavButton"]');
  await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + 'market-mapping');
  // Click [data-test="pipelineNavButton"]
  await page.click('[data-test="pipelineNavButton"]');
  await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + 'projects');
  expect(await page.innerText('h1')).toContain("Projects");
  // Click [data-test="savedSearchesNavButton"]
  await page.click('[data-test="savedSearchesNavButton"]');
  await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + 'saved-searches');
  // Click [data-test="contatcsNavButton"]
  await page.click('[data-test="contatcsNavButton"]');
  await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + 'outbox');
  expect(await page.innerText('h1')).toContain("Outbox");

  // Go to region based url
  await page.goto(process.env.ANAXYM_BASE_URL + "/outbox");
  // Expect the url to be redirected without the region tag
  await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + 'outbox');

   // Click [data-testid="styled-anchor-tag"] div:has-text("Home")
   await Promise.all([
    page.waitForNavigation(/*{ url: process.env.ANAXYM_BASE_URL + 'home' }*/),
    page.click('[data-testid="styled-anchor-tag"] div:has-text("Home")')
  ]);
  // Click #profileImgWrap
  await page.click('#profileImgWrap');
  // Click [data-test="menuItemAccount"]
  await page.click('[data-test="menuItemAccount"]');
  await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + 'account');
  expect(await page.innerText('h2')).toContain("My account");

});