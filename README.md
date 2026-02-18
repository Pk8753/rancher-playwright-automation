# Rancher Playwright Automation

Automated end-to-end testing for Rancher using [Playwright](https://playwright.dev/).  
This project validates Rancher login flows, dashboard availability, and local cluster operations in a robust, maintainable, and professional way.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Configuration](#configuration)  

---

## Overview

This repository contains automated test scripts for Rancher using Playwright. It covers:

- Launching Rancher URL and validating page load  
- Login with valid credentials  
- Login with invalid credentials  
- Validating local cluster dashboard  

The tests are written in **JavaScript**, using Playwright test framework with modular **Page Object Model (POM)** for maintainability and scalability.


## Demo

Below is a demo of the Rancher Playwright Automation in action:

<video src="rancher-playwright-automation/demo/Demo.mov" controls width="600" autoplay loop muted>
Your browser does not support the video tag.
</video>

---

## Features

- Cross-browser testing (Chromium, Firefox, WebKit)  
- Page Object Model for clean code  
- Environment variable support using `.env`  
- Generates HTML reports for test runs  
- Screenshots and video recording for failed tests  

---

## Prerequisites

Before running the tests, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)  
- [npm](https://www.npmjs.com/)  
- [Git](https://git-scm.com/)  
- Access to Rancher instance  

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Pk8753/rancher-playwright-automation.git
cd rancher-playwright-automation


Install dependencies:

npm install


Install Playwright browsers:

npx playwright install
```
## Configuration

Create a `.env` file in the root directory and define the following variables:

```env
BASE_URL=https://your-rancher-url.com
RANCHER_USERNAME=your_username
RANCHER_PASSWORD=your_password
