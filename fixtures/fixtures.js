const base = require('@playwright/test');

exports.test = base.test.extend({
  rancherUsername: async ({}, use) => {
    const username = process.env.RANCHER_USERNAME;
    if (!username) throw new Error('RANCHER_USERNAME must be set in .env');
    await use(username);
  },

  rancherPassword: async ({}, use) => {
    const password = process.env.RANCHER_PASSWORD;
    if (!password) throw new Error('RANCHER_PASSWORD must be set in .env');
    await use(password);
  }
});

exports.expect = base.expect;
