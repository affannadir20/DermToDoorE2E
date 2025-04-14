import { expect } from 'chai';

class PendingOrders {
    constructor(page) {
        this.page = page;
        this.approveOrderBtn = this.page.locator('text="Approve Consultation Only"'); // Updated to use locator
        this.naviagteToOrder = '#orderClick177';
    }

    async clickApproveOrder(){

        await this.approveOrderBtn.click(); // Click using the locator

    }

    async navigateToOrderPage(){

        await this.page.click(this.naviagteToOrder);
    }
    
}

export default PendingOrders;