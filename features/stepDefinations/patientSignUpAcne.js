import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import SignupPage from '../pageObjects/patientSignUpPage.js';
import { resolve } from 'path';
import { sign } from 'crypto';
import path from 'path';
import fs from 'fs';



let browser;
let page;
let signupPage;

Before({ tags: "@SignupAcne" }, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    signupPage = new SignupPage(page);
});

After({ tags: "@SignupAcne" }, async function () {
    await browser.close();
});

Given('the user goes to {string} website', { timeout: 20000 }, async function (url) {
    await signupPage.navigate(url);
    await page.waitForTimeout(1000);
});

When('the user clicks on the Get personalized treatment button buttons', { timeout: 50000 }, async function () {
    await signupPage.clickPersonalizedTreatment();
    await page.waitForTimeout(1000);
});

When('the user enters {string} as date of birth births', { timeout: 20000 }, async function (dob) {
    await signupPage.enterDOB(dob);
    await page.waitForTimeout(1000);
});

When('the user accepts the terms and conditions conditions', { timeout: 200000 }, async function () {
    await signupPage.acceptTerms();
    await page.waitForTimeout(1000);
});

When('the user clicks on the Get my prescription buttons', { timeout: 20000 }, async function () {
    await signupPage.clickPrescriptionButton();
    await page.waitForTimeout(1000);
});

When('the user clicks on the continue buttons', { timeout: 20000 }, async function () {  // ✅ FIXED HERE
    await signupPage.clickContinue();
    await page.waitForTimeout(1000);
});

When('the user enters personal detailss:', { timeout: 20000 }, async function (dataTable) {
    const details = dataTable.raw(); // ✅ Use raw() instead of rowsHash()

    const firstName = details[1][0];  // First row after header
    const lastName = details[1][1];
    const email = details[1][2]; When('the user enters personal detailss:', { timeout: 20000 }, async function (dataTable) {
        const details = dataTable.rowsHash();
        await signupPage.enterPersonalDetails(details.firstName, details.lastName, details.email, details.phone);
    });
    const phone = details[1][3];

    await signupPage.enterPersonalDetails(firstName, lastName, email, phone);
    await page.waitForTimeout(1000);
});

When('the user accepts all checkboxess', { timeout: 20000 }, async function () {
    await signupPage.acceptAllCheckboxes();
    await page.waitForTimeout(1000);
});

When('the user clicks on the Get Started buttons', { timeout: 20000 }, async function () {
    await signupPage.clickGetStarted();
    await page.waitForTimeout(1000);
});

When('the user enters the OTP as the last 6 digits of their phone numbers', { timeout: 20000 }, async function () {
    let phone = await signupPage.page.inputValue(signupPage.phoneField);
    phone = phone.replace(/\D/g, ''); // Remove all non-numeric characters
    const otp = phone.slice(-6); // Get last 6 digits
    console.log("The OTP is:", otp);
    await signupPage.page.waitForTimeout(2000);
    await signupPage.enterOTP(otp);
    await page.waitForTimeout(1000);
});



When('the user clicks on the Verify buttons', { timeout: 20000 }, async function () {
    await signupPage.clickVerify();
    await page.waitForTimeout(1000);
});

When('the user selectss {string}', { timeout: 20000 }, async function (optionText) {
    await signupPage.selectTreatmentOption(optionText);
    await page.waitForTimeout(1000);
});

When('the user clicks on the {string} buttons', { timeout: 20000 }, async function (buttonText) {
    await signupPage.clickButtonByText(buttonText);
    await page.waitForTimeout(1000);
});

When('the user clicks on the continue button after preferencess', { timeout: 20000 }, async function () {
    await signupPage.clickContinueBtn();
    await page.waitForTimeout(1000);
});

When('the user enters medical historys:', { timeout: 20000 }, async function (dataTable) {
    const history = dataTable.rowsHash(); // Converts table into key-value pairs

    for (const [fieldId, value] of Object.entries(history)) {
        await signupPage.scrollToElement(`#${fieldId}`); // Scroll before typing
        await signupPage.enterMedicalHistory(fieldId, value);
        await page.waitForTimeout(1000);
    }
});


When('the user clicks on the continue button after medical historys', { timeout: 20000 }, async function () {
    await signupPage.continueSensitivity();
    await page.waitForTimeout(1000);
});

When('the user enters {string} in the doctor notes fields', { timeout: 20000 }, async function (notes) {
    await signupPage.enterNotesForDoctor(notes);
    await page.waitForTimeout(1000);
});

When('the user clicks on the continue button after doctor notess', { timeout: 20000 }, async function () {
    await signupPage.submitDoctorNotes();
    await page.waitForTimeout(1000);
});

When('the user clicks on the final continue buttons', { timeout: 20000 }, async function () {
    await signupPage.clickFinalContinue();
    await page.waitForTimeout(1000);
});

// When('the user uploads the picture from {string}', async function (filePath) {
//     await page.getByRole('heading', { name: 'Face' }).click();
//     await page.locator('body').setInputFiles(filePath);
//     await page.waitForTimeout(10000); // Wait for upload to complete
// });

///home/dev/dermtodoorE2E/tests/uploads/l1.jpeg

// When('the user uploads the picture from {string}', async function (filePath) {
//     const absolutePath = path.resolve('/home/dev/dermtodoorE2E/tests/uploads/', filePath);

//     // Check if file exists before uploading
//     if (!fs.existsSync(absolutePath)) {
//         throw new Error(`File not found at path: ${absolutePath}`);
//     }

//     await page.getByRole('heading', { name: 'Face' }).click();
//     await page.locator('input[type="file"]').setInputFiles(absolutePath);
//     await page.waitForTimeout(5000); // Wait for upload to complete
// });

When('the user uploads the picture from {string}',  { timeout: 20000 }, async function (filePath) {
    const absolutePath = path.resolve('/home/dev/dermtodoorE2E/tests/uploads/', filePath);

    // Check if the file exists
    if (!fs.existsSync(absolutePath)) {
        throw new Error(`File not found at path: ${absolutePath}`);
    }

    // Select the correct input field for face image upload
    const fileInput = page.locator('#faceArea').first();

    // Ensure only one matching input field is found
    if ((await fileInput.count()) !== 1) {
        throw new Error(`Expected a single file input field but found ${await fileInput.count()}`);
    }

    await fileInput.setInputFiles(absolutePath);
    await page.waitForTimeout(5000); // Wait for upload to complete
});

When('the user clicks the file submit continue',  { timeout: 20000 }, async function () {
    await signupPage.completeFileUpload();
    await page.waitForTimeout(2000);

});

When('the user clicks the yes looks buttond', {timeout: 20000}, async function () {

    await signupPage.clickYesLooksGood();
    await page.waitForTimeout(2000);
});

When('the user clicks the sec last continue buttonds', {timeout: 20000}, async function () {

    await signupPage.secLastContinue();
    await page.waitForTimeout(2000);
});

When('the user accepts the last terms', {timeout: 20000}, async function () {

    await signupPage.agreeToTerms();
    await page.waitForTimeout(2000);
});

When('the user clicks the cross continue button', {timeout: 20000}, async function () {

    await signupPage.FinalContinue();
    await page.waitForTimeout(2000);
});

When('the user enters card details {string}, {string}, {string}, {string}', 
    { timeout: 20000 }, 
    async function (cardNumber, expiry, cvc, zip) {
        await signupPage.enterCardDetails(cardNumber, expiry, cvc, zip);
        await page.waitForTimeout(5000);

});

When('the user enters shipment details:', { timeout: 20000 }, async function (dataTable) {
    const data1 = dataTable.rowsHash(); // Converts the table into an object
    console.log("Extracted Data:", data1); // Debugging step

    await signupPage.enterShipmentDetails(
        data1.firstNames,
        data1.lastNames,
        data1.address1,
        data1.address2,
        data1.city,
        data1.zip,
        data1.phoneStr
    );
    await page.waitForTimeout(2000);

});

When('the user agrees to the checkout termss', {timeout: 20000}, async function () {

    await signupPage.agreeToCheckoutTerms();
    await page.waitForTimeout(10000);
});

When('the user clicks on the {string} bbuttons', {timeout: 20000}, async function (checkoutBtn) {

    await signupPage.clickCheckout(checkoutBtn);
    await page.waitForTimeout(10000);
});