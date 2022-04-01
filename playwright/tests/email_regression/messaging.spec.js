const config = require('../../playwright.config.js');
const { test, expect } = require('@playwright/test');
const assert = require('chai').assert;
const Mailosaur = require('mailosaur');
require('dotenv').config();

test.use({ storageState: 'tests/state.json' });

test("Contact Messaging From Event", async ({ page }) => {
  function Name_Alpha_Numeric() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  const apiKey = process.env.MAILOSAUR_API_KEY;
  const mailosaur = new Mailosaur(apiKey);

  const serverId = process.env.MAILOSAUR_SERVER;

  await page.goto(config.use.baseURL + "home");

  await expect(page).toHaveURL(config.use.baseURL + 'home');
  // Nav to Talent Sourcing
  await page.click('[data-test="talentSourcingNavButton"]');
  await expect(page).toHaveURL(config.use.baseURL + 'sourcing');
  
    // Fill [placeholder="e\.g\.\ Digital\ Designer"]
  await page.fill('[placeholder="e\\.g\\.\\ Digital\\ Designer"]', 'test account');
  // Click text=test account
  await page.click('text=test account');
  // Fill [placeholder="e\.g\.\ Monzo\ Bank"]
  await page.fill('[placeholder="e\\.g\\.\\ Monzo\\ Bank"]', 'selligence');
  // Click li[role="option"]:has-text("Selligence")
  await page.click('li[role="option"]:has-text("Selligence")');
  // Click [data-testid="search-btn"]
  await page.click('[data-testid="search-btn"]');
  // Check input[type="checkbox"]
  await page.check('input[type="checkbox"]');
  // Click text=emailMessage (1)
  await page.click('text=emailMessage (1)');
  const randomName = Name_Alpha_Numeric();
  // Fill [aria-label="subject"]
  await page.fill('[aria-label="subject"]', randomName);
  // Click text=Send Message
  await page.click('text=Send Message');
  // Click button:has-text("close")
  await page.click('button:has-text("close")');

  await page.click('[data-test="pageTemplate"] >> text=Clear All');
  
  // Click [data-test="contatcsNavButton"]
  await page.click('[data-test="contatcsNavButton"]');
  await expect(page).toHaveURL('https://staging.talentticker.ai/en-GB/outbox');

  expect(await page.innerText('h1')).toContain("Outbox");

  await page.reload();

  expect(await page.innerText('h1')).toContain("Outbox");

  await expect(
    page.locator(':nth-match(span[class="subject"], 1)')
  ).toContainText(randomName);

  // Search for the email
  const email = await mailosaur.messages.get(serverId, {
    sentTo: process.env.TEST_EMAIL
  });

  assert.equal(email.subject, randomName);

  });