// pages/localCluster.page.js
const { expect } = require('@playwright/test');

class LocalClusterPage {
  constructor(page) {
    this.page = page;

    // Cluster overview locators
    this.clusterTitle = page.locator('header .title h1');
    this.provider = page.locator('[data-testid="clusterProvider__label"] span');
    this.kubernetesVersion = page.locator('[data-testid="kubernetesVersion__label"] span');
    this.architecture = page.locator('[data-testid="architecture__label"] span');
    this.created = page.locator('[data-testid="created__label"] .live-date');

    // Resource overview
    this.totalResources = page.locator('div.simple-box.container h1:has-text("Total Resources")');
    this.nodes = page.locator('div.simple-box.container h3:has-text("Node")');
    this.deployments = page.locator('div.simple-box.container h3:has-text("Deployments")');

    // Hardware gauges
    this.podsUsed = page.locator('.hardware-resource-gauge h3:has-text("Pods") ~ .numbers span.values');
    this.cpuUsed = page.locator('.hardware-resource-gauge h3:has-text("CPU") ~ .numbers span.values');
    this.memUsed = page.locator('.hardware-resource-gauge h3:has-text("Memory") ~ .numbers span.values');

    // Services
    this.services = {
      etcd: page.locator('[data-testid="k8s-service-etcd"]'),
      scheduler: page.locator('[data-testid="k8s-service-scheduler"]'),
      controllerManager: page.locator('[data-testid="k8s-service-controller-manager"]'),
      fleet: page.locator('[data-testid="k8s-service-fleet"]'),
    };

    // Events table
    this.eventsTable = page.locator('[data-testid="sortable-table-list-container"] table');
    this.firstEventReason = page.locator('[data-testid="sortable-cell-0-0"]');
    this.firstEventObject = page.locator('[data-testid="sortable-cell-0-1"] a');
  }

  async validateClusterDashboardLoaded() {
    await expect(this.clusterTitle).toHaveText(/Cluster Dashboard/i);
    await expect(this.provider).toBeVisible();
    await expect(this.kubernetesVersion).toBeVisible();
    await expect(this.architecture).toBeVisible();
    await expect(this.created).toBeVisible();
  }

  async validateServicesHealthy() {
    for (const [name, locator] of Object.entries(this.services)) {
      const statusClass = await locator.getAttribute('class');
      expect(statusClass).toContain('healthy', `${name} service should be healthy`);
    }
  }

  async validateEventsTable() {
    await expect(this.eventsTable).toBeVisible();

    const firstReason = await this.firstEventReason.textContent();
    const firstObject = await this.firstEventObject.textContent();
    console.log(`First Event: ${firstReason} on ${firstObject}`);

    expect(firstReason.length).toBeGreaterThan(0);
    expect(firstObject.length).toBeGreaterThan(0);
  }
}

module.exports = { LocalClusterPage };
