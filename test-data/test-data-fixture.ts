import { test as base } from '@playwright/test';
import { faker } from '@faker-js/faker';

export type TestDataFixtures = {
  testData: {
    randomReviewText: string;
    randomName: string;
    cardNumber: string;
    randomCVC: string;
    randomExpiryMonth: string;
    randomExpiryYear: string;
    randomEmail: string;
    randomSubject: string;
  };
};

export const test = base.extend<TestDataFixtures>({
  testData: async ({}, use) => {
    // Generate test data once per test
    const data = {
      randomReviewText: faker.lorem.sentences(2),
      randomName: faker.person.fullName(),
      cardNumber: faker.finance.creditCardNumber('################'),
      randomCVC: faker.finance.creditCardCVV(),
      randomExpiryMonth: (faker.date.future().getMonth() + 1).toString(),
      randomExpiryYear: faker.date.future().getFullYear().toString(),
      randomEmail: faker.internet.email(),
      randomSubject: faker.lorem.words(3),
    };
    
    await use(data);
  },
});