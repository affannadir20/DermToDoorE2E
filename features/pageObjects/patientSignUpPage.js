import { expect } from '@playwright/test';

class SignupPage {
    constructor(page) {
        this.page = page;
        this.personalizedTreatmentButton = '#nextFrom1';
        this.dobField = '#dobcheck';
        this.acceptCheckbox = '.radioAccept';
        this.prescriptionButton = '#nextFrom2';
        this.continueButton = '#nextFrom3';
        this.firstNameField = '#fname';
        this.lastNameField = '#lname';
        this.emailField = '#email';
        this.phoneField = '#phone';
        this.getStartedButton = '#nextFrom4';
        this.otpField = '.selectInput4';
        this.verifyButton = '#verifyNumber';
        this.letsGoButton = '#nextFrom6';
        this.continueBtn = '#nextFrom7'
        this.submitSensitivity = '#nextFrom8';
        this.submitDocNotes = '#nextFrom9'
        this.finalContinueButton = '#nextFrom10';
        this.doctorNotes = '#doctornotes';
        this.medCondition = '#cmedicalc';
        this.pastTreatment = '#pmedicalc';
        this.fileUpload = "#nextFrom11";
        this.yesLooksGoodButton = '#nextFrom15';
        this.confirmContinueButtons = '#nextFrom12';
        this.agreeCheckbox = "input[value='agreeTotal']";
        this.finalContinuesButton = '#nextFrom13';
        this.checkoutTermsCheckbox = '.radioAcceptCheckout';
        this.checkoutButton = 'text=Checkout';
        this.noNoteField = '#notesfornophotos';
        this.dialogText = ".dialog-text";
        this.cardDetailsField = "#payment-element";
        this.shipAddress = "#address1";
        this.shipAddress2 = "#address2";
        this.city = "#city";
        this.zip = "#zip";
        this.shipName = 'input[placeholder="First name(legal)"]';
        this.shipLname = 'input[placeholder="Last name(legal)"]';
        this.phoneStripe = "#phoneStripe";
        this.checkboxes = [
            '.radioAcceptSecond',
            '.radioAcceptSecond1',
            '.radioAcceptSecond2'
        ];
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async enterShipmentDetails(firstNames, lastNames, address1, address2, city, zip, phoneStr) {
        await this.page.fill(this.shipName, firstNames);
        await this.page.fill(this.shipLname, lastNames);
        await this.page.fill(this.shipAddress, address1);
        await this.page.fill(this.shipAddress2, address2);
        await this.page.fill(this.city, city);
        await this.page.fill(this.zip, zip);
        await this.page.fill(this.phoneStripe, phoneStr);


    }

    async completeFileUpload() {

        await this.page.click(this.fileUpload);

    }

    async paymentDetails(cardDetail) {
        await this.page.fill(this.cardDetailsField, cardDetail);
    }

    async secLastContinue() {
        await this.page.click(this.confirmContinueButtons);
    }

    async clickYesLooksGood() {
        await this.page.click(this.yesLooksGoodButton);
    }

    async isErrorModalVisible(expectedText) {
        const dialog = await this.page.locator(this.dialogText);
        await expect(dialog).toBeVisible();
        await expect(dialog).toHaveText(expectedText);
    }

    async isErrorModalVisibleForTerms(expectedText) {
        const dialog = await this.page.locator(this.dialogText);
        await expect(dialog).toBeVisible();
        await expect(dialog).toHaveText(expectedText);
    }



    async clickConfirmContinue() {
        await this.page.click(this.confirmContinueButton);
    }

    async agreeToTerms() {
        await this.page.evaluate(selector => {
            document.querySelector(selector)?.click();
        }, this.agreeCheckbox);
    }

    async FinalContinue() {
        await this.page.click(this.finalContinuesButton);
    }

    async agreeToCheckoutTerms() {
        await this.page.evaluate(selector => {
            document.querySelector(selector)?.click();
        }, this.checkoutTermsCheckbox);
    }

    async clickCheckout() {
        await this.page.click(this.checkoutButton);
    }

    async enterCardDetails(cardNumber, expiry, cvc, zip) {
         // Get all iframes on the page that match Stripe's pattern
    const allIframes = await this.page.locator('iframe[name^="__privateStripeFrame"]').all();

    let cardIframe;
    
    // Loop through iframes and find the one containing the card number input
    for (const iframeElement of allIframes) {
        const frame = await iframeElement.contentFrame();
        if (frame && await frame.locator('input[name="cardnumber"]').count()) {
            cardIframe = frame;
            break;
        }
    }

    if (!cardIframe) {
        throw new Error('Could not find the correct Stripe iframe containing the card fields.');
    }

    // Enter Card Number
    await cardIframe.locator('input[name="cardnumber"]').fill(cardNumber);

    // Enter Expiry Date
    await cardIframe.locator('input[name="exp-date"]').fill(expiry);

    // Enter CVC
    await cardIframe.locator('input[name="cvc"]').fill(cvc);

    // Enter ZIP Code
    await cardIframe.locator('input[name="postal"]').fill(zip);
    }



    async continueSensitivity() {
        await this.page.click(this.submitSensitivity);
    }

    async clickPersonalizedTreatment() {
        await this.page.click(this.personalizedTreatmentButton);
    }

    async enterDOB(dob) {
        const formattedDOB = '1998-01-08'; // Convert "01081998" to "YYYY-MM-DD"
        await this.page.fill(this.dobField, formattedDOB);
    }

    async enterDOBforError(dob) {
        const formattedDOB = '2009-01-08'; // Convert "01081998" to "YYYY-MM-DD"
        await this.page.fill(this.dobField, formattedDOB);
    }

    async acceptTerms() {
        await this.page.evaluate(selector => {
            document.querySelector(selector)?.click();
        }, this.acceptCheckbox);
    }

    async clickPrescriptionButton() {
        await this.page.click(this.prescriptionButton);
    }

    async clickContinue() {
        await this.page.click(this.continueButton);
    }

    async enterPersonalDetails(firstName, lastName, email, phone) {
        await this.page.fill(this.firstNameField, firstName);
        await this.page.fill(this.lastNameField, lastName);
        await this.page.fill(this.emailField, email);
        await this.page.fill(this.phoneField, phone);
    }

    async acceptAllCheckboxes() {
        for (const checkbox of this.checkboxes) {
            await this.page.evaluate(selector => {
                document.querySelector(selector)?.click();
            }, checkbox);
        }
    }


    async clickGetStarted() {
        await this.page.click(this.getStartedButton);
    }

    async enterOTP(otp) {
        // Select all OTP input fields
        const otpFields = await this.page.$$('.selectInput4'); // Use the common class

        for (let i = 0; i < otp.length; i++) {
            await otpFields[i].fill(otp[i]); // Type each digit in its respective box
        }
    }

    async clickContinueBtn() {
        await this.page.click(this.continueBtn);
    }


    async clickVerify() {
        await this.page.click(this.verifyButton);
    }

    async clickButtonByText(buttonText) {
        await this.page.locator(`text=${buttonText}`).click();
    }


    async clickFinalContinue() {
        await this.page.click(this.finalContinueButton);
    }

    async selectTreatmentOption(optionText) {
        await this.page.locator(`text=${optionText}`).click();
    }

    async verifyTextExists(expectedText) {
        await expect(this.page.locator(`text=${expectedText}`)).toBeVisible();
    }

    async enterMedicalHistory(cmedicalc, pmedicalc) {
        await this.page.fill(this.medCondition, cmedicalc);
        await this.page.fill(this.pastTreatment, pmedicalc)
    }

    async enterNotesForDoctor(notes) {
        await this.page.fill(this.doctorNotes, notes);
    }

    async scrollToElement(selector) {
        await this.page.evaluate((sel) => {
            document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, selector);
    }

    async submitDoctorNotes() {
        await this.page.click(this.submitDocNotes);
    }

    async clickUploadOption() {
        await this.page.locator('h2.headerC', { hasText: 'Face' }).click();
    }

    async uploadPicture(filePath) {
        // const fileInputSelector = 'input[type="file"]';
        // await this.page.waitForSelector(fileInputSelector, { state: 'attached' }); // Ensure input is available
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // console.log("File uploaded:", filePath);

        await page.getByRole('heading', { name: 'Face' }).click();
        await page.locator('body').setInputFiles('image.png');
        await this.page.waitForTimeout(2000); // Wait for upload to complete
    }


    async clickContinueAfterUpload() {
        await this.page.click(this.fileUpload);
    }

    async clickSkipPhotoOption() {
        await this.page.locator('text=I prefer not to send a photo at this time.').click();
    }

    async enterWhyNoNotes(nonotes) {
        await this.page.fill(this.noNoteField, nonotes)

    }


    async clickContinueButton99() {
        await page.getByRole('button', { name: 'Continue' }).click();
    }


    async clickUnderstandWartsCheckbox() {
        await this.page.evaluate(() => {
            document.querySelector('#understandWarts')?.click();
        });
    }


}

export default SignupPage;