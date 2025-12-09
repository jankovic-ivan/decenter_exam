import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/automationExerciseSite/HomePage';
import { NavPage } from '../../pages/automationExerciseSite/NavPage';
import { ProductsPage } from '../../pages/automationExerciseSite/ProductsPage';
import { CartPage } from '../../pages/automationExerciseSite/CartPage';
import { ContactUsPage } from '../../pages/automationExerciseSite/ContactUsPage';


export type FrameworkFixtures = {
    homePage: HomePage;

    navPage: NavPage;

    productsPage: ProductsPage;

    cartPage: CartPage;

    contactUsPage: ContactUsPage;
};

export const test = base.extend<FrameworkFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    navPage: async ({ page }, use) => {
        await use(new NavPage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    contactUsPage: async ({ page }, use) => {
        await use(new ContactUsPage(page));
    }
});

export { expect } from '@playwright/test';