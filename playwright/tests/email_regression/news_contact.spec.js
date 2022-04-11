const config = require('../../playwright.config.js');
const { test, expect } = require('@playwright/test');
const assert = require('chai').assert;
// const Mailosaur = require('mailosaur');
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

  // const apiKey = process.env.MAILOSAUR_API_KEY;
  // const mailosaur = new Mailosaur(apiKey);

  // const serverId = process.env.MAILOSAUR_SERVER;

  await page.goto(config.use.baseURL + "home");

  await expect(page).toHaveURL(config.use.baseURL + 'home');
  // Click [data-test="newsNavButton"]
  await page.click('[data-test="newsNavButton"]');
  await expect(page).toHaveURL('https://staging.talentticker.ai/news');
  // Click [placeholder="Search"]
  await page.click('[placeholder="Search"]');
  // Fill [placeholder="Search"]
  await page.fill('[placeholder="Search"]', 'Talent Ticker');
  // Click text=Talent Ticker
  await page.click('text=Talent Ticker');
  // Click [data-test="searchSubmit"]
  await page.click('[data-test="searchSubmit"]');
  // Click text=Talent Ticker expands with opening of New York officeTalent TickerNew York, NYPr
  await page.click('text=Talent Ticker expands with opening of New York officeTalent TickerNew York, NYPr');

  // Click [data-testid="news-page"] >> text=Clear all
  await page.click('[data-testid="news-page"] >> text=Clear all');

  // Fill [placeholder="Search\ by\ name\,\ role\ or\ location"]
  await page.fill('[placeholder="Search\\ by\\ name\\,\\ role\\ or\\ location"]', 'Tom Jones');
  // Click text=“Tom Jones”
  await page.click('text=“Tom Jones”');
  // Check input[type="checkbox"]
  await page.check('input[type="checkbox"]');
  // Click text=emailMessage (1)
  await page.click('text=emailMessage (1)');

  const randomName = Name_Alpha_Numeric();
  // Fill [aria-label="subject"]
  await page.fill('[aria-label="subject"]', randomName);
  // Click text=Send Message
  await page.click('text=Send Message');

  await expect(
    page.locator('[data-testid="message-send-success"]')
  ).toContainText("Message successfully sent");

  // Click button:has-text("close")
  await page.click('[data-testid="close-drawer-button"]');

  await page.click('[aria-label="Close"]');
  
  // Click [data-test="contatcsNavButton"]
  await page.click('[data-test="contatcsNavButton"]');
  await expect(page).toHaveURL('https://staging.talentticker.ai/outbox');

  expect(await page.innerText('h1')).toContain("Outbox");

  await page.reload();

  expect(await page.innerText('h1')).toContain("Outbox");

  await expect(
    page.locator(':nth-match(span[class="subject"], 1)')
  ).toContainText(randomName);

  // // Search for the email
  // const email = await mailosaur.messages.get(serverId, {
  //   sentTo: process.env.TEST_EMAIL
  // });

  // assert.equal(email.subject, randomName);

  });