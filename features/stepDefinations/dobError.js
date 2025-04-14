import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import SignupPage from '../pageObjects/patientSignUpPage.js';


let browser;
let page;
let signupPage;

Before({ tags: "@dobError" }, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    signupPage = new SignupPage(page);
});

After({ tags: "@dobError" }, async function () {
    await browser.close();
});

Given('the user hits to the url {string}', async function (url) {
    await signupPage.navigate(url);
    await page.waitForLoadState('domcontentloaded');
});

When('the person clicks on the Get personalized treatment button', async function () {
    await signupPage.clickPersonalizedTreatment();
    await page.waitForTimeout(3000);
});

When('the person enters {string} as date of birth', async function (dob) {

    await signupPage.enterDOBforError(dob);
    await page.waitForTimeout(3000);
});

When('the person accepts the terms and conditions', async function () {
    await signupPage.acceptTerms();
    await page.waitForTimeout(3000);
});

When('the person clicks on the Get my prescription button', async function () {
    await signupPage.clickPrescriptionButton();
    await page.waitForTimeout(3000);
});

Then('the user should see an error modal with text {string}', async function (expectedText) {
    await signupPage.isErrorModalVisible(expectedText);
    await page.waitForTimeout(3000);
});
