const config = require("../../playwright.config.js");
const { test, expect } = require("@playwright/test");
require("dotenv").config();

test.use({ storageState: "tests/state.json" });

test("Talent Sourcing - Basic Filter Check", async ({ page }) => {
  await page.goto(config.use.baseURL + "home");

  await expect(page).toHaveURL(config.use.baseURL + "home");
  // Nav to Talent Sourcing
  await page.click('[data-test="talentSourcingNavButton"]');
  await expect(page).toHaveURL(config.use.baseURL + "sourcing");

  // Search via Job Title
  await page.click("[data-testid=sourcing-job-title]");
  await page.fill(
    '[placeholder="e\\.g\\.\\ Digital\\ Designer"]',
    "digital designer"
  );
  await page.click("text=digital designer");
  await page.click('[data-testid="search-btn"]');
  await expect(
    page.locator('[class*="styles__ContactControlsWrapper"]')
  ).toContainText("Select All0 /");
  await page.click('[data-test="pageTemplate"] >> text=Clear All');

  // Search via Company Filter
  await page.click("[data-testid=sourcing-company]");
  await page.fill('[placeholder="e\\.g\\.\\ Monzo\\ Bank"]', "talent ticker");
  await page.click('li[role="option"]:has-text("Talent Ticker")');
  await page.click('[data-testid="search-btn"]');
  await expect(
    page.locator('[class*="styles__ContactControlsWrapper"]')
  ).toContainText("Select All0 /");
  await page.click('[data-test="pageTemplate"] >> text=Clear All');

  // Search via Industry Filter
  await page.click("[data-testid=sourcing-company]");
  await page.click('[placeholder="e\\.g\\.\\ Software\\,\\ Biotechnology"]');
  await page.fill(
    '[placeholder="e\\.g\\.\\ Software\\,\\ Biotechnology"]',
    "science"
  );
  await page.click('li[role="option"]:has-text("Science and Engineering")');
  await page.click('[data-testid="search-btn"]');
  await expect(
    page.locator('[class*="styles__ContactControlsWrapper"]')
  ).toContainText("Select All0 /");
  await page.click('[data-test="pageTemplate"] >> text=Clear All');

  // Search via Skills Filter
  await page.click("[data-testid=sourcing-company]");
  await page.click('[placeholder="e\\.g\\.\\ Java\\,\\ Python\\,\\ Tableau"]');
  await page.fill(
    '[placeholder="e\\.g\\.\\ Java\\,\\ Python\\,\\ Tableau"]',
    "react"
  );
  await page.click("text=React");
  await page.click('[data-testid="search-btn"]');
  await expect(
    page.locator('[class*="styles__ContactControlsWrapper"]')
  ).toContainText("Select All0 /");
  await page.click('[data-test="pageTemplate"] >> text=Clear All');

  // Search via Location Filter
  await page.click("[data-testid=sourcing-company]");
  await page.click('[placeholder="e\\.g\\.\\ London\\,\\ Cardiff"]');
  await page.fill('[placeholder="e\\.g\\.\\ London\\,\\ Cardiff"]', "cardiff");
  await page.click('li[role="option"]:has-text("Cardiff")');
  await page.click('[data-testid="search-btn"]');
  await expect(
    page.locator('[class*="styles__ContactControlsWrapper"]')
  ).toContainText("Select All0 /");
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
  await page.click('[data-testid="search-btn"]');
  await expect(
    page.locator('[class*="styles__ContactControlsWrapper"]')
  ).toContainText("Select All0 /");
  await page.click('[data-test="pageTemplate"] >> text=Clear All');
  await (await page.waitForSelector("#profile-image-wrapper")).click();

  // Logout
  await page.locator("li:has-text('Sign out')").waitFor();
  await page.click("li:has-text('Sign out')");
});

test("Talent Sourcing - Advanced Filter Check - Job Title with Company", async ({
  page,
}) => {
  await page.goto(config.use.baseURL + "home");
  await expect(page).toHaveURL(config.use.baseURL + "home");

  // Nav to Talent Sourcing
  await page.click('[data-test="talentSourcingNavButton"]');
  await expect(page).toHaveURL(config.use.baseURL + "sourcing");

  // Search via Job Title and Company
  await page.click("[data-testid=sourcing-job-title]");
  await page.fill('[placeholder="e\\.g\\.\\ Digital\\ Designer"]', "QA");
  await page.click("text=QA");

  await page.click("[data-testid=sourcing-company]");
  await page.fill('[placeholder="e\\.g\\.\\ Monzo\\ Bank"]', "Selligence");
  await page.click('li[role="option"]:has-text("Selligence")');

  await page.click('[data-testid="search-btn"]');

  await page.pause();

  // Assert TT Candidates are returned
  expect(await page.innerText("h2")).toContain("2");
  expect(await page.innerText("h2")).toContain("Results");
  expect(await page.isVisible("text='Shaun Lappin'"));
  expect(await page.isVisible("text='Luke Silver'"));

  // Ensure 'NOT INCLUDING' Filter is working
  await page.click("text=QA");
  await page.click("text=QA");
  expect(await page.isVisible("text='-QA'"));

  await page.click('[data-testid="search-btn"]');
  const count = await page.innerText("h2").toString();
  console.log(count);
  expect(count.not.toContain("2 Results"));
});
