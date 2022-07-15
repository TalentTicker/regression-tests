// global-setup.ts
import { chromium, FullConfig, expect } from '@playwright/test';
require('dotenv').config();

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(baseURL);

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
    page.waitForNavigation(/*{ url: baseURL + 'home' }*/),
    page.click('button:has-text("Log In")')
  ]);

  await expect(page).toHaveURL(baseURL + 'home');
  expect(await page.innerText('h1')).toContain("Team Manager");

  await page.context().storageState({ path: storageState as string });
  await browser.close();  
}

export default globalSetup;