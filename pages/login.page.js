const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators (update if needed after inspecting real login form)
    this.usernameInput = page.locator('input[type="text"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.dashboardHeader = page.locator('text=Cluster Dashboard'); // adjust after login
    this.errorMessage = page.locator('.alert, .error'); // adjust if needed
  }

  async navigate(baseURL) {
    await this.page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  }

  async validateLoginPageLoaded() {
    await expect(this.page).toHaveTitle(/Rancher/i);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }


  async validateLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }
}

module.exports = { LoginPage };
