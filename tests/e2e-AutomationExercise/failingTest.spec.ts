import { test, expect } from '../../fixtures/pom/test-options';

test('TC01 - Failing Sanity Test', { tag: '@UI' }, async ({ homePage }) => {
    await homePage.navigateToHomePageUser();
    expect(2).toEqual(3);
});