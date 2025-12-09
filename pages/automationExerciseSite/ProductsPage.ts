import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for Products Page functionality.
 * @export
 * @class ProductsPage
 * @typedef {ProductsPage}
 */
export class ProductsPage {
    constructor(private page: Page) {}

    // NEW PROJ LOCATORS HERE
    get productsTitle(): Locator {
        return this.page.getByRole('heading', { name: 'All Products' });
    }
    get searchProductsInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Search Product' });
    }
    get searchButton(): Locator {
        return this.page.locator('#submit_search');
    }
    // Product page categories
    get categoryTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Category' });
    }
    get womenCategoryTab(): Locator {
        return this.page.getByRole('link', { name: ' Women' });
    }
    get dressesCategoryTab(): Locator {
        return this.page.getByRole('link', { name: 'Dress' });
    }
    get womanDressesTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Women - Dress Products' }); // visible after clicking Dresses category
    }
    get viewSearchedCategoryProductButton(): Locator {
        return this.page.getByRole('link', { name: ' View Product' }).first();
    }
    // SEARCHERD PRODUCTS LOCATORS
    get searchedProductsTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Searched Products' });
    }
    get poloShirtProduct(): Locator {
        return this.page.getByText('Rs. 1500 Premium Polo T-').first();
    }
    get viewSearchedProductButton(): Locator {
        return this.page.getByRole('link', { name: ' View Product' });
    }
    get directAddToCartButton(): Locator {
        return this.page.getByRole('link', { name: ' Add to cart' }).first();
    }
    // PRODUCT DETAILS LOCATORS
    get searchedProductDetailsTitle(): Locator {    
        return this.page.getByRole('heading', { name: 'Premium Polo T-Shirts' });
    }
    get productPrice(): Locator {
        return this.page.getByText('Rs.');
    }
    get addToCartButton(): Locator {
        return this.page.getByRole('button', { name: ' Add to cart' });
    }
    get addedToCartPopup(): Locator {
        return this.page.getByRole('heading', { name: 'Added!' });
    }
    get viewCartButton(): Locator {
        return this.page.getByRole('link', { name: 'View Cart' });
    }
    // PRODUCT REVIEW LOCATORS
    get reviewTitle(): Locator {  
        return this.page.getByRole('link', { name: 'Write Your Review' });
    }
    get nameInput(): Locator {  
        return this.page.getByRole('textbox', { name: 'Your Name' });
    }
    get emailInput(): Locator {  
        return this.page.getByRole('textbox', { name: 'Email Address', exact: true });
    }
    get reviewTextAreaInput(): Locator {  
        return this.page.getByRole('textbox', { name: 'Add Review Here!' });
    }
    get submitReviewButton(): Locator {  
        return this.page.getByRole('button', { name: 'Submit' });
    }
    get reviewSuccessMessage(): Locator {  
        return this.page.getByText('Thank you for your review.');
    }



   /**
     * Searches for a polo shirt/product and selects it from the search results.
     * @returns {Promise<void>}
     */
    async searchForProduct(): Promise<void> {
        await this.searchProductsInput.fill('Polo');
        await this.searchButton.click();
        await this.viewSearchedProductButton.click();
  

        await expect(this.searchedProductDetailsTitle).toBeVisible();
    }
    
    async getProductPriceText(): Promise<string> {
    await expect(this.productPrice).toBeVisible();
    return (await this.productPrice.textContent())?.trim() ?? '';
}


    

}
