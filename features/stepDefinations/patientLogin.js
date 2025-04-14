import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import PatientLoginPage from '../pageObjects/patientLoginPage.js';

let browser;
let page;
let loginPage1;

Before({ tags: "@PatientLogin" }, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage1 = new PatientLoginPage(page);
});

After({ tags: "@PatientLogin" }, async function () {
    await browser.close();
});

Given('the user hits the {string}',  { timeout: 20000 }, async function (url) {
    await loginPage1.navigate(url);
});

When('the user clicks on loggin but', { timeout: 20000 },  async function () {
    await loginPage1.clickLoginViaText();
});

When('the user enters {string} as phone number', { timeout: 20000 }, async function (phoneNumber) {
    await loginPage1.enterPhoneNumber(phoneNumber);
});

When('the user clicks the login button', { timeout: 40000 }, async function () {
    await loginPage1.clickLoginButton();
});

// When('the OTP is retrieved from console logs', { timeout: 40000 }, async function () {
//     this.otpCode = await loginPage1.getOTPFromConsole();
// });

When('the user enters the {string} in the verification field', { timeout: 20000 }, async function (otp) {
    await loginPage1.enterOTP(otp);
});

When('the user clicks the verify button', { timeout: 20000 }, async function () {
    await loginPage1.clickVerifyButton();
    await page.waitForTimeout(3000);

});

// Then('the user should see {string} text', async function (expectedText) {
//     const content = await page.textContent('body');
//     if (!content.includes(expectedText)) {
//         throw new Error(`Expected text "${expectedText}" not found.`);
//     }
// });
