import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for Cart Page functionality.
 * @export
 * @class CartPage
 * @typedef {CartPage}
 */
export class CartPage {
    constructor(private page: Page) {}

    // Cart Page LOCATORS HERE
    get cartTitle(): Locator {
        return this.page.getByText('Shopping Cart');
    }
    get totalPriceText(): Locator {
        return this.page.getByText('Rs.').nth(1);
    }
    get proceedToCheckoutButton(): Locator {
        return this.page.getByText('Proceed To Checkout');
    }
    get orderedProductName(): Locator {
        return this.page.getByRole('link', { name: 'Premium Polo T-Shirts' });
    }

    // Checkout Page LOCATORS HERE
    get checkoutTitle(): Locator {
        return this.page.getByText('Checkout');
    }
    get checkoutCommentInput(): Locator {
        return this.page.locator('textarea[name="message"]');
    }
    get placeOrderButton(): Locator {
        return this.page.getByRole('link', { name: 'Place Order' });
    }

    // Payment Page LOCATORS HERE
    get paymentTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Payment' });
    }
    get nameOnCardInput(): Locator {
        return this.page.locator('input[name="name_on_card"]');
    }
    get cardNumberInput(): Locator {
        return this.page.locator('input[name="card_number"]');
    }
    get cvcNumberInput(): Locator {
        return this.page.getByRole('textbox', { name: 'ex.' });
    }
    get expiryMonthInput(): Locator {
        return this.page.getByRole('textbox', { name: 'MM' });
    }
    get expiryYearInput(): Locator {
        return this.page.getByRole('textbox', { name: 'YYYY' });
    }
    get payAndConfirmOrderButton(): Locator {
        return this.page.getByRole('button', { name: 'Pay and Confirm Order' });
    }

    // Order Confirmation LOCATORS HERE
    get orderPlacedSuccessfullyMessage(): Locator {
        return this.page.getByText('Congratulations! Your order');
    }
    get continueButton(): Locator {
        return this.page.getByRole('link', { name: 'Continue' });
    }



    /**
     * Performs payment by filling in card details and confirming the order.
     * @param {string} cardName - Name on the card
     * @param {string} cardNumber - Card number
     * @param {string} cvcNumber - CVC number
     * @param {string} expiryMonth - Expiry month (MM)
     * @param {string} expiryYear - Expiry year (YYYY)
     * @returns {Promise<void>}
     */
    async performPayment(
        cardName: string,
        cardNumber: string,
        cvcNumber: string,
        expiryMonth: string,
        expiryYear: string
    ): Promise<void> {
        await expect(this.paymentTitle).toBeVisible();
        await this.nameOnCardInput.fill(cardName);
        await this.cardNumberInput.fill(cardNumber);
        await this.cvcNumberInput.fill(cvcNumber);
        await this.expiryMonthInput.fill(expiryMonth);
        await this.expiryYearInput.fill(expiryYear);
        await this.payAndConfirmOrderButton.click();
        await expect(this.orderPlacedSuccessfullyMessage).toBeVisible();
    }

    
    async getTotalPriceText(): Promise<string> {
        await expect(this.totalPriceText).toBeVisible();
        return (await this.totalPriceText.textContent())?.trim() ?? '';
    }

    async assertTotalMatchesProduct(productPriceText: string): Promise<void> {
        const totalPriceText = await this.getTotalPriceText();
        expect(totalPriceText).toBe(productPriceText);
    }
}
