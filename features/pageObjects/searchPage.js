import { expect } from 'chai';

class SearchPage {
    constructor(page) {
        this.page = page;
        this.ordersText = '#navbarBlur';
        this.searchField = '#searchOrderT'
        this.searchOrder = '#searchOrder'
        this.searchPatient = '#searchPatient'
    }

    async typeSearch(searchQuery) {

        await this.page.fill(this.searchField, searchQuery);
    }

    async clickSearch() {

        await this.page.click(this.searchOrder);
    }

    async clickPatientSearch(){

        await this.page.click(this.searchPatient);
    }

    async verifyOrders(expectedText1) {

        console.log('Waiting for the Orders to appear.');
        await this.page.waitForSelector(this.ordersText, { timeout: 30000 });

        const content = await this.page.textContent(this.ordersText);
        expect(content).to.include(expectedText1);

        console.log('Orders verified.');
    }

    async verifySearch(expectedText2) {

        const cell = this.page.getByRole('cell', { name: expectedText2 });

        await expect(cell).toBeVisible({ timeout: 5000 });
    }

    async clickPendingButton() {


        console.log('Waiting for the home page to fully load...');

        await this.page.waitForSelector(this.ordersText, { state: 'visible', timeout: 30000 });
        console.log('Waiting for the Pending button (.card-body) to be visible...');
        await this.page.waitForSelector('.card-body', { state: 'visible', timeout: 20000 });

        const buttonEnabled = await this.page.isEnabled('.card-body');
        console.log(`Pending button enabled: ${buttonEnabled}`);

        if (buttonEnabled) {

            await this.page.locator('.card-body').first().click();
            console.log('Pending button clicked successfully.');

        } else {
            throw new Error('Pending button is not enabled.');
        }
    }

    async clickApprovedButton() {

        console.log('Waiting for the home page to fully load...');

        await this.page.waitForSelector(this.ordersText, { state: 'visible', timeout: 30000 });

        console.log('Waiting for the Approved button (.card-body) to be visible...');
        await this.page.waitForSelector('.card-body', { state: 'visible', timeout: 20000 });

        const buttonEnabled = await this.page.isEnabled('.card-body'); // Check if the button is enabled
        console.log(`Approved button enabled: ${buttonEnabled}`);

        if (buttonEnabled) {
            await this.page.locator('div:nth-child(2) > .card > .card-body').first().click();
            console.log('Approved button clicked successfully.');
        } else {
            throw new Error('Approved button is not enabled.');
        }
    }

    async clickPatientButton() {

        console.log('Waiting for the home page to fully load...');

        await this.page.waitForSelector(this.ordersText, { state: 'visible', timeout: 30000 });

        console.log('Waiting for the Patient button (.card-body) to be visible...');
        await this.page.waitForSelector('.card-body', { state: 'visible', timeout: 20000 });

        const buttonEnabled = await this.page.isEnabled('.card-body'); // Check if the button is enabled
        console.log(`Patient button enabled: ${buttonEnabled}`);

        if (buttonEnabled) {
            await this.page.locator('div:nth-child(3) > .card > .card-body').first().click();
            console.log('Patient button clicked successfully.');
        } else {
            throw new Error('Patient button is not enabled.');
        }
    }

    async performSearch(searchQuery) {

        await this.page.getByPlaceholder('Search by order').click();
        await this.page.getByPlaceholder('Search by order').fill(searchQuery);
    }

    async performPatientSearch(searchQuery) {

        await this.page.getByPlaceholder('Search by first / last name').click();
        await this.page.getByPlaceholder('Search by first / last name').fill(searchQuery);
    }
}

export default SearchPage;