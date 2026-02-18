const { test, expect } = require('../fixtures/fixtures');
const { LoginPage } = require('../pages/login.page');
const { LandingPage } = require('../pages/landing.page');

test.describe('Rancher Smoke Tests', () => {

  test('Launch Rancher URL successfully', async ({ page, baseURL }) => {
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    await expect(page).toHaveURL(/dashboard/i);

    const title = await page.title();
    console.log("Page Title:", title);
    expect(title.length).toBeGreaterThan(0);
  });

  test('Login successfully with valid credentials', async ({ page, baseURL, rancherUsername, rancherPassword }) => {
    const loginPage = new LoginPage(page);
    const landingPage = new LandingPage(page);

    await loginPage.navigate(baseURL);
    await loginPage.validateLoginPageLoaded();
    await page.waitForTimeout(1000);

    console.log("Using username:", rancherUsername);

    await loginPage.login(rancherUsername, rancherPassword);
    await page.waitForTimeout(2000);

    // Validate landing page elements after login
    await landingPage.validateLandingPageLoaded();
    console.log("Landing page validation passed!");
  });

  test('Login fails with invalid credentials', async ({ page, baseURL }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate(baseURL);
    await page.waitForTimeout(1000);

    await loginPage.login('wronguser', 'wrongpass');
    await page.waitForTimeout(2000);
  });

});
