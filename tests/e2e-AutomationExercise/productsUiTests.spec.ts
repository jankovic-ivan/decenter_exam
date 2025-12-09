
import { test, expect } from '../../fixtures/pom/test-options';

test.describe('e2e-AutomationExercise', () => {

    let productPriceText: string;

    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToHomePageUser();
    });

    test('TC01 - Verify Search/Selection/Checkout of product',
        { tag: '@UI' }, 
        async ({ navPage, productsPage, cartPage, testData }) => {

            await test.step('Verify Product search', async () => {
                await navPage.productsButton.click();
                await productsPage.searchForProduct();
                productPriceText = await productsPage.getProductPriceText();
            });

            await test.step('Adding product to cart', async () => {
                await productsPage.addToCartButton.click();
                await expect(productsPage.addedToCartPopup).toBeVisible();
                await productsPage.viewCartButton.click();
                await expect(cartPage.cartTitle).toBeVisible();
            });
            await test.step('Verify total price in cart', async () => {
                await expect(cartPage.totalPriceText).toBeVisible();
                await cartPage.assertTotalMatchesProduct(productPriceText);
            });
            await test.step('Proceeding to Checkout and placing order', async () => {
                await cartPage.proceedToCheckoutButton.click();
                await expect(cartPage.checkoutTitle).toBeVisible();
                await cartPage.checkoutCommentInput.fill(testData.randomReviewText);
                await cartPage.placeOrderButton.click();
            });
            await test.step('Payment and Confirmation', async () => {
                await cartPage.performPayment(
                    testData.randomName, 
                    testData.cardNumber, 
                    testData.randomCVC, 
                    testData.randomExpiryMonth, 
                    testData.randomExpiryYear
                );
                await cartPage.continueButton.click();
                await expect(navPage.homePageHeading).toBeVisible();
            });
        }
    );

    test('TC02 - Verify Category navigation and add review to the product',
        { tag: '@UI' }, 
        async ({ navPage, productsPage, homePage, testData }) => {
        await test.step('Navigating to product category', async () => {
            await navPage.productsButton.click();
            await productsPage.womenCategoryTab.click();
            await productsPage.dressesCategoryTab.click();
            await expect(productsPage.womanDressesTitle).toBeVisible();
        });
        await test.step('Selecting a product and adding review', async () => {
            await productsPage.viewSearchedCategoryProductButton.click();
            await expect(productsPage.reviewTitle).toBeVisible();
            await productsPage.nameInput.fill(testData.randomName);
            await productsPage.emailInput.fill(testData.randomEmail);
            await productsPage.reviewTextAreaInput.fill(testData.randomReviewText);
            await productsPage.submitReviewButton.click();
            await expect(productsPage.reviewSuccessMessage).toBeVisible();
        });
        await test.step('Returning to home page', async () => {
            await homePage.navigateToHomePageUser();
        });

    }); 
    
    test('TC03 - Contact Us form submission from Home Page',
        { tag: '@UI' }, 
        async ({ contactUsPage, navPage, testData }) => {
        await test.step('Filling Contact Us form and submitting', async () => {
            await navPage.contactUsButton.click();
            await contactUsPage.scrollToSubmitBtn();
            await contactUsPage.fillContactUsFormAndSubmit(
                testData.randomName, 
                testData.randomEmail, 
                testData.randomSubject, 
                testData.randomReviewText
            );
            await expect(contactUsPage.formSubmissionSuccessMessage).toBeVisible();
            await contactUsPage.homeButton.click();
            await expect(navPage.homePageHeading).toBeVisible();
        });
    });

    // test.afterEach(async ({ page }, testInfo) => {
    //     // Capture screenshot on test failure
    //     if (testInfo.status !== testInfo.expectedStatus) {
    //         const screenshot = await page.screenshot({ 
    //             fullPage: true 
    //         });
    //         await testInfo.attach('screenshot-on-failure', { 
    //             body: screenshot, 
    //             contentType: 'image/png' 
    //         });
    //     }
    // });

});