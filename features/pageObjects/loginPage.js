import { expect } from 'chai';

class LoginPage {
    constructor(page) {
        this.page = page; 
        this.emailInput = 'input[type="email"]';
        this.passwordInput = 'input[type="password"]';
        this.loginButton = '#login';
        this.dashBoardText = '#navbarFixed';
        this.ordersText = '#navbarBlur';
        this.searchField = '#searchOrderT'
        this.searchOrder = '#searchOrder'
    }

    async login(email, password) {
        console.log(`Entering email: ${email}, password: ${password}`);
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
    }

    async clickLogin(buttonText) {
        console.log(`Button text received: ${buttonText}`);
        console.log('Waiting for the login button...');
        await this.page.waitForSelector(this.loginButton, { state: 'visible', timeout: 10000 });

        const buttonEnabled = await this.page.isEnabled(this.loginButton);
        console.log(`Login button enabled: ${buttonEnabled}`);

        if (buttonEnabled) {
            await this.page.click(this.loginButton);
            console.log('Login button clicked.');
        } else {
            throw new Error('Login button is not enabled.');
        }

    }

    async verifyDashboard(expectedText) {
        console.log('Waiting for the dashboard to appear.');
        await this.page.waitForSelector(this.dashBoardText, { timeout: 15000 });

        const content = await this.page.textContent(this.dashBoardText);
        expect(content).to.include(expectedText);

        console.log('Dashboard verified.');
    }

}

export default LoginPage;