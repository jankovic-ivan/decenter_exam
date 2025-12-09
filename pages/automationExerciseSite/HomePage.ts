import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for the Home Page.
 * @export
 * @class HomePage
 * @typedef {HomePage}
 */
export class HomePage {
    constructor(private page: Page) {}

    get homeBanner(): Locator {
        return this.page.getByRole('link', { name: 'Website for automation' });
    }
    get testCasesBtn(): Locator {
        return this.page.getByRole('button', { name: 'Test Cases' });
    }
    get apiListBtn(): Locator {
        return this.page.getByRole('button', { name: 'APIs list for practice' });
    }

    get noArticlesMessage(): Locator {
        return this.page.getByText('No articles are here... yet.');
    }

    /**
     * @returns {Promise<void>} Resolves when the navigation is complete.
     */
    async navigateToHomePageUser(): Promise<void> {
        await this.page.goto(process.env.URL as string);

        await expect(this.testCasesBtn).toBeVisible();
        await expect(this.apiListBtn).toBeVisible();
    }
}