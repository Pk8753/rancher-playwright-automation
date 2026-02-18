const { test, expect } = require('../fixtures/fixtures');
const { LoginPage } = require('../pages/login.page');
const { LandingPage } = require('../pages/landing.page');
const { LocalClusterPage } = require('../pages/localCluster.page');

test.describe.serial('Local Cluster Validation', () => {
  test('Validate Local Cluster Dashboard', async ({ page, baseURL, rancherUsername, rancherPassword }) => {
    const loginPage = new LoginPage(page);
    const landingPage = new LandingPage(page);
    const localClusterPage = new LocalClusterPage(page);

    // Login
    await loginPage.navigate(baseURL);
    await loginPage.validateLoginPageLoaded();
    await loginPage.login(rancherUsername, rancherPassword);
    await page.waitForTimeout(2000);
    await landingPage.validateLandingPageLoaded();

    // Navigate to Local Cluster
    await landingPage.localClusterSelector().click();
    await page.waitForURL(/\/dashboard\/c\/local/);

    // Cluster Dashboard Validations
    await localClusterPage.validateClusterDashboardLoaded();                
    await localClusterPage.validateServicesHealthy();
    await localClusterPage.validateEventsTable();
  });
});
