import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import SignupPage from '../pageObjects/patientSignUpPage.js';
import { resolve } from 'path';
import { sign } from 'crypto';


let browser;
let page;
let signupPage;

Before({ tags: "@Signup" }, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    signupPage = new SignupPage(page);
});

After({ tags: "@Signup" }, async function () {
    await browser.close();
});

Given('the user goes to {string}', { timeout: 20000 }, async function (url) {
    await signupPage.navigate(url);
    await page.waitForTimeout(3000);
});

When('the user clicks on the Get personalized treatment button', { timeout: 50000 }, async function () {
    await signupPage.clickPersonalizedTreatment();
    await page.waitForTimeout(3000);
});

When('the user enters {string} as date of birth', { timeout: 20000 }, async function (dob) {
    await signupPage.enterDOB(dob);
    await page.waitForTimeout(3000);
});

When('the user accepts the terms and conditions', { timeout: 200000 }, async function () {
    await signupPage.acceptTerms();
    await page.waitForTimeout(3000);
});

When('the user clicks on the Get my prescription button', { timeout: 20000 }, async function () {
    await signupPage.clickPrescriptionButton();
    await page.waitForTimeout(3000);
});

When('the user clicks on the continue button', { timeout: 20000 }, async function () {  // ✅ FIXED HERE
    await signupPage.clickContinue();
    await page.waitForTimeout(3000);
});

When('the user enters personal details:', { timeout: 20000 }, async function (dataTable) {
    const details = dataTable.raw(); // ✅ Use raw() instead of rowsHash()

    const firstName = details[1][0];  // First row after header
    const lastName = details[1][1];
    const email = details[1][2]; When('the user enters personal details:', { timeout: 20000 }, async function (dataTable) {
        const details = dataTable.rowsHash();
        await signupPage.enterPersonalDetails(details.firstName, details.lastName, details.email, details.phone);
    });
    const phone = details[1][3];

    await signupPage.enterPersonalDetails(firstName, lastName, email, phone);
    await page.waitForTimeout(3000);
});

When('the user accepts all checkboxes', { timeout: 20000 }, async function () {
    await signupPage.acceptAllCheckboxes();
    await page.waitForTimeout(3000);
});

When('the user clicks on the Get Started button', { timeout: 20000 }, async function () {
    await signupPage.clickGetStarted();
    await page.waitForTimeout(3000);
});

When('the user enters the OTP as the last 6 digits of their phone number', { timeout: 20000 }, async function () {
    let phone = await signupPage.page.inputValue(signupPage.phoneField);
    phone = phone.replace(/\D/g, ''); // Remove all non-numeric characters
    const otp = phone.slice(-6); // Get last 6 digits
    console.log("The OTP is:", otp);
    await signupPage.page.waitForTimeout(5000);
    await signupPage.enterOTP(otp);
    await page.waitForTimeout(3000);
});



When('the user clicks on the Verify button', { timeout: 20000 }, async function () {
    await signupPage.clickVerify();
    await page.waitForTimeout(3000);
});

When('the user selects {string}', { timeout: 20000 }, async function (optionText) {
    await signupPage.selectTreatmentOption(optionText);
    await page.waitForTimeout(3000);
});

When('the user clicks on the {string} button', { timeout: 20000 }, async function (buttonText) {
    await signupPage.clickButtonByText(buttonText);
    await page.waitForTimeout(3000);
});

When('the user clicks on the continue button after preferences', { timeout: 20000 }, async function () {
    await signupPage.clickContinueBtn();
    await page.waitForTimeout(3000);
});

When('the user enters medical history:', { timeout: 20000 }, async function (dataTable) {
    const history = dataTable.rowsHash(); // Converts table into key-value pairs

    for (const [fieldId, value] of Object.entries(history)) {
        await signupPage.scrollToElement(`#${fieldId}`); // Scroll before typing
        await signupPage.enterMedicalHistory(fieldId, value);
        await page.waitForTimeout(3000);
    }
});


When('the user clicks on the continue button after medical history', { timeout: 20000 }, async function () {
    await signupPage.continueSensitivity();
    await page.waitForTimeout(3000);
});

When('the user enters {string} in the doctor notes field', { timeout: 20000 }, async function (notes) {
    await signupPage.enterNotesForDoctor(notes);
    await page.waitForTimeout(3000);
});

When('the user clicks on the continue button after doctor notes', { timeout: 20000 }, async function () {
    await signupPage.submitDoctorNotes();
    await page.waitForTimeout(3000);
});

When('the user clicks on the final continue button', { timeout: 20000 }, async function () {
    await signupPage.clickFinalContinue();
    await page.waitForTimeout(3000);
});

// When('the user selects Face as the upload option', { timeout: 20000 }, async function () {
//     await signupPage.clickUploadOption();
// });

// When('the user uploads a picture from {string}', async function (filePath) {

//     const absolutePath = require('path').resolve(filePath);
//     await signupPage.uploadPicture(absolutePath);
// });

When('the user clicks on I prefer not to send a photo at this time', { timeout: 20000 }, async function () {
    await signupPage.clickSkipPhotoOption();
    await page.waitForTimeout(3000);

});

When('the user enters {string} in the text field', { timeout: 20000 }, async function (nonotes) {
    await signupPage.enterWhyNoNotes(nonotes);
    await page.waitForTimeout(3000);

});

When('the user checks the "I understand warts" checkbox', async function () {
    await signupPage.clickUnderstandWartsCheckbox();
    await page.waitForTimeout(3000);
});

When('the user clicks on the continue button to submit', async function () {
    console.log('done')

    await signupPage.clickContinueButton99();
    await page.waitForTimeout(3000);
});


// When('the user clicks on the finals continue button', { timeout: 20000 }, async function () {
//     await signupPage.clickContinueAfterUpload();
//     await signupPage.page.waitForTimeout(10000);

// });

// When('the user clicks on the Yes, looks good buttons', async function () {
//     await signupPage.clickYesLooksGood();
// });

When('the user clicks on the continue button on the confirmation screen', async function () {
    await signupPage.clickConfirmContinue();
    await page.waitForTimeout(3000);

});

When('the user scrolls to the element with selector {string}', async function (selector) {
    await signupPage.scrollToElement(selector);
    await page.waitForTimeout(3000);

});


When('the user agrees to the terms and conditions', async function () {
    await signupPage.agreeToTerms();
    await page.waitForTimeout(3000);

});

When('the user clicks on the final continue button before payment', async function () {
    await signupPage.FinalContinue();
    await page.waitForTimeout(3000);

});


When('the user enters card details:', { timeout: 20000 }, async function (dataTable) {
    const cardDetails = dataTable.rowsHash(); // Convert table to key-value pairs

    const cardNumber = cardDetails['cardNumber'];
    const expiry = cardDetails['expiry'];
    const cvc = cardDetails['cvc'];
    const zip = cardDetails['zip'];

    await signupPage.enterCardDetails(cardNumber, expiry, cvc, zip);
    await page.waitForTimeout(3000);

});

When('the user enters the shipping details:', async function (dataTable) {
    const details = dataTable.rowsHash();
    await signupPage.enterShippingDetails(details);
    await page.waitForTimeout(3000);

});

When('the user agrees to the checkout terms', async function () {
    await signupPage.agreeToCheckoutTerms();
    await page.waitForTimeout(3000);

});

When('the user clicks on the "Checkout" bbutton', async function () {
    await signupPage.clickCheckout();
    await page.waitForTimeout(3000);

});

