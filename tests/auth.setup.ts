import { test as setup, expect } from '../fixtures/pom/test-options';


setup('auth user', async ({ apiRequest, homePage, navPage, page }) => {
    await setup.step('create logged in user session', async () => {
        await homePage.navigateToHomePageUser();

        await navPage.logIn(process.env.EMAIL!, process.env.PASSWORD!);

        await page.context().storageState({ path: '.auth/userSession.json' });
    });
});