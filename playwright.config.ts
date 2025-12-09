import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';


// Determine which environment file to load
const environmentPath = process.env.ENVIRONMENT 
    ? `./env/.env.${process.env.ENVIRONMENT}`
    : `./env/.env.dev`; // Default to dev environment

// Load the environment variables
dotenv.config({
    path: environmentPath,
});


export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [['blob'], ['html']] : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
        {
            name: 'setup',
            // use: {
            //     ...devices['Desktop Chrome'],
            //     viewport: { width: 1366, height: 768 },
            // },
            testMatch: /.*\.setup\.ts/,
        },

        {
            name: 'api-tests',
            testMatch: /tests\/API\/.*\.spec\.ts/,
            // No browser context needed for API tests
        },

        {
            name: 'ui-tests',
            use: {
                ...devices['Desktop Chrome'],
                storageState: '.auth/userSession.json',
                viewport: { width: 1366, height: 768 },
            },
            dependencies: ['setup'],
            testMatch: /tests\/e2e-AutomationExercise\/.*\.spec\.ts/,
        },

    ],

});
