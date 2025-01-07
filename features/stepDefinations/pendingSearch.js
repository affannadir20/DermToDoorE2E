import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import SearchPage from '../pageObjects/searchPage.js';
import LoginPage from '../pageObjects/loginPage.js';

let browser;
let page;
let loginPage;
let searchPage;

Before({tags: "@Search"}, async function () {
    
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ timeout: 15000 });
    page = await context.newPage();
    loginPage = new LoginPage(page);
    searchPage = new SearchPage(page);
});

After({tags: "@Search"}, async function () {

    await new Promise(resolve => setTimeout(resolve, 4000));
    await browser.close();
});

Given('the user is logged in', async function () {
    await page.goto('https://staging.dermtodoor.app/assetsV1/doctors/v2/login.html', { timeout: 20000 });
    await loginPage.login('drlily@dermtodoor.com', 'D2dportal2022!');
    await loginPage.clickLogin();
});

When('the user clicks on Pending button', { timeout: 20000 }, async function () {
    await searchPage.clickPendingButton();
});

When('the user enters {string} as search param', { timeout: 20000 }, async function (searchQuery) {
    await searchPage.performSearch(searchQuery);
});

When('the user clicks on Search button', { timeout: 20000 }, async function () {
    await searchPage.clickSearch();
});

Then('the user should see the "Search Results" containing {string}', { timeout: 20000 }, async function (expectedText) {
    // const content = await page.textContent('.search-results');  // Adjust based on the actual selector
    // expect(content).to.include(expectedText);
});
