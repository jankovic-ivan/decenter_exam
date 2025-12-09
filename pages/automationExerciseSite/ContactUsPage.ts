import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for Cart Page functionality.
 * @export
 * @class ContactUsPage
 * @typedef {ContactUsPage}
 */
export class ContactUsPage {
    constructor(private page: Page) {}

    // Contact Us Page LOCATORS HERE
    get contactUsHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Contact Us' });
    }

    // Submission form LOCATORS HERE
    get submissionHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Get In Touch' });
    }
    get nameInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Name' });
    }
    get emailInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Email', exact: true });
    }
    get subjectInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Subject' });
    }
    get messageTextArea(): Locator {
        return this.page.getByRole('textbox', { name: 'Your Message Here' });
    }
    get submitButton(): Locator {
        return this.page.getByRole('button', { name: 'Submit' });
    }
    get formSubmissionSuccessMessage(): Locator {
        return this.page.locator('#contact-page').getByText('Success! Your details have');
    }
    get homeButton(): Locator {
        return this.page.getByRole('link', { name: ' Home' });
    }



    async scrollToSubmitBtn(): Promise<void> {
    await this.submitButton.scrollIntoViewIfNeeded();
    await expect(this.submitButton).toBeVisible();
    }

    /**
     * Performs payment by filling in card details and confirming the order.
     * @param {string} name - Name of the person
     * @param {string} email - Email address
     * @param {string} subject - Subject of the message
     * @param {string} contactMessage - Message content
     * @returns {Promise<void>}
     */ 
    async fillContactUsFormAndSubmit(
        name: string,
        email: string,
        subject: string,
        contactMessage: string
    ): Promise<void> {
        await expect(this.submissionHeading).toBeVisible();
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageTextArea.fill(contactMessage);
        this.page.once('dialog', async (dialog) => {
            await dialog.accept();
        });
          // Wait 2 seconds before clicking submit due to potential ad banner interference
        await this.page.waitForTimeout(2000);
  
        await this.submitButton.click();

    }

}
