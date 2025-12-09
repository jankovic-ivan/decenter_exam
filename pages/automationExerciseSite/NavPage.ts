import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for the Navigation functionality.
 * @export
 * @class NavPage
 * @typedef {NavPage}
 */
export class NavPage {
    constructor(private page: Page) {}

    // NEW PROJ LOCATORS HERE
        get homePageHeading(): Locator {
        return this.page.getByRole('link', { name: 'Website for automation' });
    }
    get homeButton(): Locator {
        return this.page.getByRole('link', { name: ' Home' });
    }
    get productsButton(): Locator {
        return this.page.getByRole('link', { name: ' Products' });
    }
    get cartButton(): Locator {
        return this.page.getByRole('link', { name: ' Cart' });
    }
    get contactUsButton(): Locator {
        return this.page.getByRole('link', { name: ' Contact us' });
    }

    // NEW PROJ METHODS HERE

    // DELETE BElOW IF NOT NEEDED
    get navBar(): Locator {
        return this.page.getByRole('navigation');
    }
    get homePageLink(): Locator {
        return this.page.getByRole('link', {
            name: 'Home',
            exact: true,
        });
    }
    get logoutButton(): Locator {
        return this.page.getByRole('link', { name: ' Logout' });
    }

    get signInNavigationLink(): Locator {
        return this.page.getByRole('link', { name: ' Signup / Login' });
    }
    get signInPageTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Login to your account' });
    }
    get emailInput(): Locator {
        return this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address'); // Locator should be improved
    }
    get passwordInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Password' });
    }
    get signInButton(): Locator {
        return this.page.getByRole('button', { name: 'Login' });
    }


    /**
     * Navigates to the Home page using the Home link.
     * @returns {Promise<void>} Resolves when navigation is complete.
     */
    async navigateToHomePage(): Promise<void> {
        await this.homePageLink.click();

        await expect(this.homePageHeading).toBeVisible();
    }



    /**
     * Navigates to the Sign In page.
     * @returns {Promise<void>} Resolves when navigation is complete.
     */
    async navigateToSignInPage(): Promise<void> {
        await this.signInNavigationLink.click();

        await expect(this.signInPageTitle).toBeVisible();
    }


    /**
     * Logs in the user using the provided email and password.
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<void>} Resolves when the login process is complete.
     */
    async logIn(email: string, password: string): Promise<void> {
        await this.navigateToSignInPage();

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
        // await this.page.waitForResponse(`${process.env.API_URL}api/tags`);

        await expect(
            this.page.getByText(process.env.DISPLAY_NAME!)
        ).toBeVisible();
    }


}