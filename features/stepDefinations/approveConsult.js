import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import SearchPage from '../pageObjects/searchPage.js';
import LoginPage from '../pageObjects/loginPage.js';
import PendingOrders from '../pageObjects/pendingOrders.js';

let browser;
let page;
let loginPage;
let searchPage;
let pendingOrders;


Before({tags: "@approveConsult"}, async function () {
    
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ timeout: 15000 });
    page = await context.newPage();
    loginPage = new LoginPage(page);
    searchPage = new SearchPage(page);
    pendingOrders = new PendingOrders(page)
});

After({tags: "@approveConsult"}, async function () {

    await new Promise(resolve => setTimeout(resolve, 10000));
    await browser.close();
});

Given('the user is loged', async function () {
    await page.goto('https://staging.dermtodoor.app/assetsV1/doctors/v2/login.html', { timeout: 20000 });
    await loginPage.login('drlily@dermtodoor.com', 'D2dportal2022!');
    await loginPage.clickLogin();
});

When('the user clicks the Pending button', { timeout: 20000 }, async function () {
    await searchPage.clickPendingButton();
});

When('the user enters {string} as search value', { timeout: 20000 }, async function (searchQuery) {
    await searchPage.performSearch(searchQuery);
});

When('the user hits on the Search button', { timeout: 20000 }, async function () {
    await searchPage.clickSearch();
});

When('the user clicks on the order with ID {string}', { timeout: 20000 }, async function (orderId) {
    await pendingOrders.navigateToOrderPage(orderId);

    const button = page.locator('text="Approve Consultation Only"'); // Replace with the correct selector for the button
    await button.scrollIntoViewIfNeeded();
});

When('the user clicks on the Approve Consultation button', { timeout: 20000 }, async function () {
    await pendingOrders.clickApproveOrder();
});


Then('the order should be Approved', { timeout: 20000 }, async function (expectedText) {
    // const content = await page.textContent('.search-results');  // Adjust based on the actual selector
    // expect(content).to.include(expectedText);
});
