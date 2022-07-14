import { test, expect } from '@playwright/test';
require('dotenv').config();

test.use({ storageState: 'tests/state.json' });

test('homepage', async ({ page }) => {
  await page.goto(process.env.BASE_URL + "home");

  await expect(page).toHaveURL(process.env.BASE_URL + 'home');
  expect(await page.innerText('h1')).toContain("Team Manager");

  expect(await page.title()).toContain("Talent Ticker - Predictive Market Intelligence");

  // Click [data-test="newsNavButton"]
  await page.click('[data-test="newsNavButton"]');
  await expect(page).toHaveURL(process.env.BASE_URL + 'news');
  // Click [data-test="talentSourcingNavButton"]
  await Promise.all([
    page.waitForNavigation(/*{ url: process.env.BASE_URL + 'sourcing' }*/),
    page.click('[data-test="talentSourcingNavButton"]')
  ]);
  expect(await page.innerText('h1')).toContain("Welcome to Talent TickerSourcing");

  // Click [data-test="marketMappingNavButton"]
  await page.click('[data-test="marketMappingNavButton"]');
  await expect(page).toHaveURL(process.env.BASE_URL + 'market-mapping');
  // Click [data-test="vacanciesNavButton"]
  await page.click('[data-test="vacanciesNavButton"]');
  await expect(page).toHaveURL(process.env.BASE_URL + 'vacancies');
  // Click [data-test="pipelineNavButton"]
  await page.click('[data-test="pipelineNavButton"]');
  await expect(page).toHaveURL(process.env.BASE_URL + 'projects');
  expect(await page.innerText('h1')).toContain("Projects");
  // Click [data-test="savedSearchesNavButton"]
  await page.click('[data-test="savedSearchesNavButton"]');
  await expect(page).toHaveURL(process.env.BASE_URL + 'saved-searches');
  // Click [data-test="contatcsNavButton"]
  await page.click('[data-test="contatcsNavButton"]');
  await expect(page).toHaveURL(process.env.BASE_URL + 'outbox');
  expect(await page.innerText('h1')).toContain("Outbox");

  // Go to region based url
  await page.goto(process.env.BASE_URL + "/outbox");
  // Expect the url to be redirected without the region tag
  await expect(page).toHaveURL(process.env.BASE_URL + 'outbox');

   // Click [data-testid="styled-anchor-tag"] div:has-text("Home")
   await Promise.all([
    page.waitForNavigation(/*{ url: process.env.BASE_URL + 'home' }*/),
    page.click('[data-testid="styled-anchor-tag"] div:has-text("Home")')
  ]);
  // Click #profileImgWrap
  await page.click('#profileImgWrap');
  // Click [data-test="menuItemAccount"]
  await page.click('[data-test="menuItemAccount"]');
  await expect(page).toHaveURL(process.env.BASE_URL + 'account');
  expect(await page.innerText('h2')).toContain("My account");

});