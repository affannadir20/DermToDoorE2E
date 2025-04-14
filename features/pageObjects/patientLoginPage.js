class PatientLoginPage {
    constructor(page) {
        this.page = page;
        this.loginViaTextButton = 'text=login';
        this.phoneNumberField = '#phoneNumber';
        this.loginButton = '#loginButton';
        this.verifyCodeField = '#verifyCode';
        this.verifyButton = '#verifyButton';
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async clickLoginViaText() {
        await this.page.click(this.loginViaTextButton);
    }

    async enterPhoneNumber(phoneNumber) {
        await this.page.fill(this.phoneNumberField, phoneNumber);
    }

    async clickLoginButton() {
        await this.page.click(this.loginButton);
    }

    async getOTPFromConsole() {
        return new Promise((resolve, reject) => {
            let otpCode = null;

            this.page.on('console', msg => {
                const text = msg.text();
                const otpMatch = text.match(/\b\d{4,6}\b/);
                if (otpMatch) {
                    otpCode = otpMatch[0];
                    console.log('Extracted OTP:', otpCode);
                    resolve(otpCode);
                }
            });

            setTimeout(() => {
                if (!otpCode) {
                    reject(new Error('OTP not found in console logs'));
                }
            }, 5000);
        });
    }

    async enterOTP(otp) {
        await this.page.fill(this.verifyCodeField, otp);
    }

    async clickVerifyButton() {
        await this.page.click(this.verifyButton);
    }
}

export default PatientLoginPage;