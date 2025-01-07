import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import SearchPage from '../pageObjects/searchPage.js';
import LoginPage from '../pageObjects/loginPage.js';

let browser;
let page;
let loginPage;
let searchPage;

Before({tags: "@SearchPatient"}, async function () {
    
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ timeout: 15000 });
    page = await context.newPage();
    loginPage = new LoginPage(page);
    searchPage = new SearchPage(page);
});

After({tags: "@SearchPatient"}, async function () {

    await new Promise(resolve => setTimeout(resolve, 4000));
    await browser.close();
});

Given('the user is logged in the app', async function () {
    await page.goto('https://staging.dermtodoor.app/assetsV1/doctors/v2/login.html', { timeout: 20000 });
    await loginPage.login('drlily@dermtodoor.com', 'D2dportal2022!');
    await loginPage.clickLogin();
});

When('the user clicks on Patient button', { timeout: 20000 }, async function () {
    await searchPage.clickPatientButton();
});

When('the user enters {string} as search query', { timeout: 20000 }, async function (searchQuery) {
    await searchPage.performPatientSearch(searchQuery);
});

When('the user clicks on the Search button', { timeout: 20000 }, async function () {
    await searchPage.clickPatientSearch();
});

Then('the user should see the "Search Results" containing {string}', { timeout: 20000 }, async function (expectedText) {
    // const content = await page.textContent('.search-results');  // Adjust based on the actual selector
    // expect(content).to.include(expectedText);
});
