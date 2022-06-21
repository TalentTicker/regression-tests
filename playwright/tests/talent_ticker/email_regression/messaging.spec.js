const config = require('../../../playwright.config.js');
const { test, expect } = require('@playwright/test');
const Mailosaur = require('mailosaur');
const { assert } = require('chai');
require('dotenv').config();

test.use({ storageState: 'tests/state.json' });

test("Contact Messaging From Sourcing Using Outlook Integration", async ({ page }) => {
  test.setTimeout(120000);

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
  await expect(page).toHaveURL('https://staging.talentticker.ai/outbox');

  expect(await page.innerText('h1')).toContain("Outbox");

  await page.click('[data-test="contatcsNavButton"]');
  await expect(page).toHaveURL('https://staging.talentticker.ai/outbox');

  expect(await page.innerText('h1')).toContain("Outbox");

  let i = 0;
  let mailFound = false;
  while (i < 10) {
    if (mailFound == false){
      try {        
          await expect(page.locator(':nth-match(span[class="subject"], 1)')).toContainText(randomName);
          mailFound = true;
      } catch (e) {
          i++;
          await page.click('[data-testid="reload-list-btn"]');
          if (i == 10){
            throw e
          }
      }
    }
    else {
      break;
    } 
  }

  // Search for the email in Mailosaur (Looped to slow this down in case the outbox is so fast that the Mailosaur check happens instantly) 
  const email = await mailosaur.messages.get(serverId, {
    sentTo: process.env.TEST_EMAIL
  });

  let a = 0;
  let mailosaurFound = false;
  while (a < 10) {
    if (mailosaurFound == false){
      try {        
        assert.equal(email.subject, randomName);
          mailosaurFound = true;
      } catch (e) {
          a++;
          await page.click('[data-testid="reload-list-btn"]');
          if (a == 10){
            throw e
          }
      }
    }
    else {
      break;
    } 
  }

});