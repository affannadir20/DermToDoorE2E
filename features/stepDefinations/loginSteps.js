import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import LoginPage from '../pageObjects/loginPage.js';

let browser;
let page;
let loginPage;

Before({tags: "@Login"}, async function () {

    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ timeout: 20000 });
    page = await context.newPage();
    loginPage = new LoginPage(page);
});

After({tags: "@Login"}, async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));
    await browser.close();
});

Given('the user navigates to {string}', { timeout: 20000 }, async function (url) {
    await page.goto(url, { timeout: 20000 });
});


When('the user enters {string} as email and {string} as password', { timeout: 20000 }, async function (email, password) {
    await loginPage.login(email, password, { timeout: 20000 });
});

When('the user clicks the {string} button', { timeout: 20000 }, async function (buttonName) {
    await loginPage.clickLogin({ timeout: 20000 });
});

Then('the user should see {string} text', { timeout: 200000 }, async function (expectedText) {
    // const dashboardVisible = await page.locator('#navbarFixed').isVisible();
    // const ordersVisible = await page.locator('#navbarBlur').isVisible();

    // if (dashboardVisible) {
    //     const content = await page.textContent('#navbarFixed');
    //     expect(content).to.include(expectedText);
    // } else if (ordersVisible) {
    //     const content = await page.textContent('#navbarBlur');
    //     expect(content).to.include(expectedText);
    // } else {
    //     throw new Error(`Expected text "${expectedText}" not found.`);
    // }
});
