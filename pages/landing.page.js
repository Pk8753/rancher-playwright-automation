class LandingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Banner elements
    this.bannerImage = page.locator('[data-testid="banner-brand__img"]');
    this.bannerTitle = page.locator('[data-testid="banner-title"]');

    // Cluster table
    this.clusterTableRows = page.locator('[data-testid^="sortable-table-"][data-testid$="-row"]');
    this.firstClusterName = page.locator('[data-testid="sortable-table-0-row"] .cluster-name a');
    this.firstClusterState = page.locator('[data-testid="sortable-cell-0-0"] .msg');

    // Side menu
    this.homeMenuLink = page.locator('[aria-label="Home page navigation menu"]');
    this.clusterMenuButton = page.locator('[data-testid="menu-cluster-local"]');

    // Support links
    this.docsLink = page.locator('a[aria-label="Docs"]');
    this.forumsLink = page.locator('a[aria-label="Forums"]');
    this.slackLink = page.locator('a[aria-label="Slack"]');
    this.getStartedLink = page.locator('a[aria-label="Get Started"]');
    this.localClusterLink = page.locator('a[aria-label="local"]');
  }


  localClusterSelector() {
    return this.localClusterLink;
  }

  async validateLandingPageLoaded() {
    // Check banner
    await this.bannerImage.waitFor({ state: 'visible', timeout: 5000 });
    await this.bannerTitle.waitFor({ state: 'visible', timeout: 5000 });
    const titleText = await this.bannerTitle.textContent();
    if (titleText.trim() !== 'Welcome to Rancher') {
      throw new Error(`Expected banner title to be 'Welcome to Rancher', got '${titleText}'`);
    }

    // Validate at least 1 cluster exists
    const rowCount = await this.clusterTableRows.count();
    if (rowCount < 1) {
      throw new Error('Expected at least 1 cluster row in table, found none');
    }

    // Validate first cluster is active
    const state = await this.firstClusterState.textContent();
    if (!['Active', 'Provisioning', 'Updating'].includes(state.trim())) {
      throw new Error(`Unexpected first cluster state: ${state}`);
    }
  }
}

module.exports = { LandingPage };
