const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld {
    constructor() {
        this.browser = null;
        this.context = null;
        this.page = null;
    }

    async launchBrowser() {
        if (!this.browser) {
            this.browser = await chromium.launch({ headless: false }); // Use headless: true in CI
        }
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
        
        // Set full-screen window size
        await this.page.setViewportSize({ width: 1920, height: 1080 });
    }

    async closeBrowser() {
        if (this.page) {
            await this.page.close();
        }
        if (this.context) {
            await this.context.close();
        }
        if (this.browser) {
            await this.browser.close();
        }
    }
}

setWorldConstructor(CustomWorld);
