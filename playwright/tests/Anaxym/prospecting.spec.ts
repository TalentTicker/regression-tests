import { test, expect } from '@playwright/test';
require("dotenv").config();

test("Talent Prospecting - Basic Filter Check", async ({ page }) => {
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
  // Nav to Talent Prospecting
  await page.click('[data-test="talentSourcingNavButton"]');
  await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + "prospecting");

  // Search via Job Title
  await page.click("[data-testid=sourcing-job-title]");
  await page.fill(
    '[placeholder="e\\.g\\.\\ Digital\\ Designer"]',
    "digital designer"
  );
  await page.click("text=digital designer");
  await page.click('[data-testid="search-btn"]');
  await page.click('[data-test="pageTemplate"] >> text=Clear All');

  // Search via Company Filter
  await page.click("[data-testid=sourcing-company]");
  await page.fill('[placeholder="e\\.g\\.\\ Monzo\\ Bank"]', "talent ticker");
  await page.click('li[role="option"]:has-text("Talent Ticker")');

  await page.click('[data-testid="search-btn"]');
  await page.click('[data-test="pageTemplate"] >> text=Clear All');

  // Search via Industry Filter
  await page.click("[data-testid=sourcing-company]");
  await page.click('[placeholder="e\\.g\\.\\ Software\\,\\ Biotechnology"]');
  await page.fill(
    '[placeholder="e\\.g\\.\\ Software\\,\\ Biotechnology"]',
    "science"
  );
  await page.click('li[role="option"]:has-text("Science and Engineering")');
  await Promise.all([
    page.waitForResponse(
      (resp) =>
        resp.url().includes("/v5-powersearch/people-search") &&
        resp.status() === 200
    ),
    page.click('[data-testid="search-btn"]'),
  ]);
  await page.click('[data-test="pageTemplate"] >> text=Clear All');

  // Search via Skills Filter
  await page.click("[data-testid=sourcing-company]");
  await page.click('[placeholder="e\\.g\\.\\ Java\\,\\ Python\\,\\ Tableau"]');
  await page.fill(
    '[placeholder="e\\.g\\.\\ Java\\,\\ Python\\,\\ Tableau"]',
    "react"
  );
  await page.click("text=React");
  await Promise.all([
    page.waitForResponse(
      (resp) =>
        resp.url().includes("/v5-powersearch/people-search") &&
        resp.status() === 200
    ),
    page.click('[data-testid="search-btn"]'),
  ]);
  await page.click('[data-test="pageTemplate"] >> text=Clear All');

  // Search via Location Filter
  await page.click("[data-testid=sourcing-company]");
  await page.click('[placeholder="e\\.g\\.\\ London\\,\\ Cardiff"]');
  await page.fill('[placeholder="e\\.g\\.\\ London\\,\\ Cardiff"]', "cardiff");
  await page.click('li[role="option"]:has-text("Cardiff")');
  await Promise.all([
    page.waitForResponse(
      (resp) =>
        resp.url().includes("/v5-powersearch/people-search") &&
        resp.status() === 200
    ),
    page.click('[data-testid="search-btn"]'),
  ]);
  await page.click('[data-test="pageTemplate"] >> text=Clear All');

  // Checks Company Size Chips
  await page.click('[data-testid="company-size-chip-0"]');
  await page.click('[data-testid="company-size-chip-1"]');
  await page.click('[data-testid="company-size-chip-2"]');
  await page.click('[data-testid="company-size-chip-3"]');
  await page.click('[data-testid="company-size-chip-4"]');
  await page.click('[data-testid="company-size-chip-5"]');
  await page.click('[data-testid="company-size-chip-6"]');
  await page.click('[data-testid="company-size-chip-7"]');
  await Promise.all([
    page.waitForResponse(
      (resp) =>
        resp.url().includes("/v5-powersearch/people-search") &&
        resp.status() === 200
    ),
    page.click('[data-testid="search-btn"]'),
  ]);
  await page.click('[data-test="pageTemplate"] >> text=Clear All');
  await (await page.waitForSelector("#profile-image-wrapper")).click();

  // Logout
  await page.locator("li:has-text('Sign out')").waitFor();
  await page.click("li:has-text('Sign out')");
});

test("Talent Prospecting - Advanced Filter Check - Job Title with Company", async ({
  page,
}) => {
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

  // Nav to Talent Prospecting
  await page.click('[data-test="talentSourcingNavButton"]');
  await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + "prospecting");

  // Search via Job Title and Company
  await page.click("[data-testid=sourcing-job-title]");
  await page.fill('[placeholder="e\\.g\\.\\ Digital\\ Designer"]', "QA");
  await page.click("text=QA");

  await page.click("[data-testid=sourcing-company]");
  await page.fill('[placeholder="e\\.g\\.\\ Monzo\\ Bank"]', "Selligence");
  await page.click('li[role="option"]:has-text("Selligence")');
  await page.click('[data-testid="search-btn"]');

  // Assert TT Candidates are returned
  expect(await page.isVisible("text='Shaun Lappin'"));
  expect(await page.isVisible("text='Luke Silver'"));
  await expect(
    page.locator('[class*="styles__StyledResultHeader"]')
  ).toContainText("2");
  await expect(
    page.locator('[class*="styles__StyledResultHeader"]')
  ).toContainText("Results");

  // Ensure 'NOT INCLUDING' Filter is working
  await page.click("text=QA");
  await page.click("text=QA");
  expect(await page.isVisible("text='-QA'"));

  // Check API Response after search
  await Promise.all([
    page.waitForResponse(
      (resp) =>
        resp.url().includes("/v5-powersearch/people-search") &&
        resp.status() === 200
    ),
    page.click('[data-testid="search-btn"]'),
  ]);
  await expect(page).not.toContain("Shaun Lappin");
});

test("Talent Prospecting - Advanced Filter Check - Job Title with Company and Location", async ({
  page,
}) => {
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
  await page.click('[data-test="talentSourcingNavButton"]');
  await expect(page).toHaveURL(process.env.ANAXYM_BASE_URL + "prospecting");
  await page.click("[data-testid=sourcing-job-title]");
  await page.fill('[placeholder="e\\.g\\.\\ Digital\\ Designer"]', "QA");
  await page.click("text=QA");
  await page.click("[data-testid=sourcing-company]");
  await page.fill('[placeholder="e\\.g\\.\\ Monzo\\ Bank"]', "Selligence");
  await page.click('li[role="option"]:has-text("Selligence")');
  await page.click("[data-testid=sourcing-location]");
  await page.fill('[placeholder="e\\.g\\.\\ London\\,\\ Cardiff"]', "cardiff");
  await page.click('li[role="option"]:has-text("Cardiff")');
  await Promise.all([
    page.waitForResponse(
      (resp) =>
        resp.url().includes("/v5-powersearch/people-search") &&
        resp.status() === 200
    ),
    page.click('[data-testid="search-btn"]'),
  ]);
  await page.click('[data-test="pageTemplate"] >> text=Clear All');
});
