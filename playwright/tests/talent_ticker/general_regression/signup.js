const config = require('../../../playwright.config.js');
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test('jobseeker signup', async ({ page }) => {

  await page.goto(config.use.baseURL);
  // Click [data-test="profileWrapper"] >> :nth-match(span, 3)
  await page.click('[data-test="profileWrapper"] >> :nth-match(span, 3)');
  // Click text=Job Seekers
  await page.click('text=Job Seekers');
  await expect(page).toHaveURL(config.use.baseURL + 'job-seeker');
  // Click text=Create Your Profile
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('text=Create Your Profile')
  ]);

  page1.waitForNavigation(/*{ url: 'https://www.talentticker.ai/job-seekers/join-us' }*/),

  // Fill [placeholder="First\ Name\ \*"]
  await page1.fill('#fName', 'Automation');
  // Fill [placeholder="Last\ Name\ \*"]
  await page1.fill('#lName', 'Tester');
  // Fill [placeholder="Where\ do\ you\ live\?"]
  await page1.fill('#city', 'Exeter');
  // Fill [placeholder="Phone\ Number"]
  await page1.fill('#phone', '07912534691');

  // Make up an email address for this test
  const randomString = new Date().getTime();
  const testEmail = randomString + process.env.MAILOSAUR_DOMAIN;

  // Fill [placeholder="Confirm\ Email\ \*"]
  await page1.fill('#email', testEmail);
  // Fill [placeholder="Password\ \*"]
  await page1.fill('#confirmEmail', testEmail);
  // Fill [placeholder="Confirm\ Password\ \*"]
  await page1.fill('#password', process.env.MAILOSAUR_PASSWORD);
  // Fill [placeholder="Confirm\ Password\ \*"]
  await page1.fill('#confirmPassword', process.env.MAILOSAUR_PASSWORD);
  // Fill [placeholder="LinkedIn\ Profile\ Link\ or\ ID\ \*"]
  await page1.fill('#linkedInId', 'blah');
  // Check terms and conditions
  await page1.check('#agreeToTerms',{ force: true });
  // Assert the checked state
  expect(await page1.isChecked('#agreeToTerms')).toBeTruthy();

  // Click text=Sign up Now
  await page1.click('text=Sign up Now');
});