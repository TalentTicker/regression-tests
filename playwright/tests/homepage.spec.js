const config = require('../playwright.config.js');
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test.use({ storageState: 'tests/state.json' });

test('homepage', async ({ page }) => {
  await page.goto(config.use.baseURL + "home");

  await expect(page).toHaveURL(config.use.baseURL + 'home');
  expect(await page.innerText('h1')).toContain("Shaun TesterDev");

  // Click [data-test="newsNavButton"]
  await page.click('[data-test="newsNavButton"]');
  await expect(page).toHaveURL(config.use.baseURL + 'news');
  // Click [data-test="talentSourcingNavButton"]
  await Promise.all([
    page.waitForNavigation(/*{ url: config.use.baseURL + 'sourcing' }*/),
    page.click('[data-test="talentSourcingNavButton"]')
  ]);
  expect(await page.innerText('h1')).toContain("Welcome to Talent TickerSourcing");

  // Click [data-test="marketMappingNavButton"]
  await page.click('[data-test="marketMappingNavButton"]');
  await expect(page).toHaveURL(config.use.baseURL + 'market-mapping');
  // Click [data-test="vacanciesNavButton"]
  await page.click('[data-test="vacanciesNavButton"]');
  await expect(page).toHaveURL(config.use.baseURL + 'vacancies');
  // Click [data-test="pipelineNavButton"]
  await page.click('[data-test="pipelineNavButton"]');
  await expect(page).toHaveURL(config.use.baseURL + 'projects');
  expect(await page.innerText('h1')).toContain("Projects");
  // Click [data-test="savedSearchesNavButton"]
  await page.click('[data-test="savedSearchesNavButton"]');
  await expect(page).toHaveURL(config.use.baseURL + 'saved-searches');
  // Click [data-test="contatcsNavButton"]
  await page.click('[data-test="contatcsNavButton"]');
  await expect(page).toHaveURL(config.use.baseURL + 'outbox');
  expect(await page.innerText('h1')).toContain("Outbox");

   // Click [data-testid="styled-anchor-tag"] div:has-text("Home")
   await Promise.all([
    page.waitForNavigation(/*{ url: config.use.baseURL + 'home' }*/),
    page.click('[data-testid="styled-anchor-tag"] div:has-text("Home")')
  ]);
  // Click #profileImgWrap
  await page.click('#profileImgWrap');
  // Click [data-test="menuItemAccount"]
  await page.click('[data-test="menuItemAccount"]');
  await expect(page).toHaveURL(config.use.baseURL + 'account');
  expect(await page.innerText('h2')).toContain("My account");

});
